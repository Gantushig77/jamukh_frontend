import React, { useContext, useEffect, useRef, useState } from 'react';
import Appbar from '../../components/appbar/appbar';
import TheContext from '../../context/context';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import {
  Container,
  Typography,
  Grid,
  Button,
  Modal,
  Fade,
  CircularProgress,
  Snackbar,
  TextField,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { API_ORIGIN } from '../../constants/url';
import { useQuery, useSubscription, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { PAYMENT_SUBSCRIPTION } from '../../graphql/gql/payment/payment';
import { UPDATE_ME } from '../../graphql/gql/user/user';
import { GET_SERVICE_OPTION_DETAIL } from '../../graphql/gql/serviceOptions/serviceOptions';
import { useHistory } from 'react-router';

// Tulbutuu toloh huudas
export default function PaymentService() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  const id = useRef(queryParams.get('id'));
  const [paymentData, setPaymentData] = useState(false);
  const [qpayImage, setQpayImage] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [submitDisable, setSubmitDisable] = useState(false);
  const [emailState, setEmailState] = useState({
    email: '',
    error: false,
  });

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const { data: selectedService, loading: selectedServiceLoading } = useQuery(
    GET_SERVICE_OPTION_DETAIL,
    {
      variables: { _id: id.current },
      onCompleted(data) {
        console.log('selected service data');
        console.log(data);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  // const history = useHistory();
  const classes = useStyles({ phone: phoneSize, tablet: tabletSize });
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook?.account;
  const accountRef = useRef(account);

  const [modalState, setModalState] = useState(false);
  // const [chosenPayment, setChosenPayment] = useState(1);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const handleModalState = (bool) => {
    setModalState(bool);
  };

  // const handlePaymentChoose = (num) => {
  //   setChosenPayment(num);
  // };

  // const submitPay = () => {
  //   if (chosenPayment === 1) {
  //     if (errorMsg) {
  //       handleSnackOpen({
  //         state: true,
  //         msg: errorMsg,
  //         type: "warning",
  //       });
  //     } else if (paymentData?.qPay_shortUrl && phoneSize) {
  //       window.open(paymentData?.qPay_shortUrl, "_self");
  //     } else {
  //       handleModalState(true);
  //     }
  //   } else if (chosenPayment === 2 || chosenPayment === 3) {
  //     handleSnackOpen({
  //       state: true,
  //       msg: "Тун удахгүй.",
  //       type: "warning",
  //     });
  //   } else {
  //     handleSnackOpen({
  //       state: true,
  //       msg: "Таны төлбөрийн нөхцөлөө сонгоно уу.",
  //       type: "warning",
  //     });
  //   }
  // };

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const [updateUserEmail, { loading: userUpdateLoading }] = useMutation(UPDATE_ME, {
    onCompleted(data) {
      console.log(data);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай шинэчлэгдлээ. Худалдан авалтаа баталгаажуулна уу.',
        type: 'success',
      });
      setTimeout(() => {
        handleModalState(false);
      }, 1000);
    },
    onError(error) {
      console.log(error);
      handleSnackOpen({
        state: true,
        msg: error.message,
        type: 'error',
      });
    },
  });

  const emailValidator = (email) => {
    const err = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    return err;
  };

  const handleAddEmail = (email) => {
    setEmailState({
      email: email,
      error: emailValidator(email),
    });
  };

  const updateEmail = () => {
    if (emailState.email.length > 0 && !emailState.error) {
      updateUserEmail({
        variables: { email: emailState.email },
      });
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Имэйл ээ оруулна уу.',
        type: 'warning',
      });
    }
  };

  useSubscription(PAYMENT_SUBSCRIPTION, {
    variables: { billNo: id.current },
    onSubscriptionComplete(data) {
      console.log('onSubscriptionComplete');
      console.log(data);
    },
    onSubscriptionData({ client, subscriptionData: { data } }) {
      console.log('____________________________');
      console.log(data);
      console.log(data?.payment?.paid);
      handleModalState(false);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай төлөгдлөө',
        type: 'success',
      });
      setTimeout(() => {
        history.push('/');
      }, 1500);
    },
    onError(e) {
      console.log('SUBS ERROR');
      console.log(e);
    },
  });

  useEffect(() => {
    if (modalState === false) {
      setTimeout(() => {
        setModalState(true);
      }, 300);
    }
    const getPayMentData = (onFinish = () => {}) => {
      axios
        .post(
          API_ORIGIN + '/payment/auth',
          { order: id.current, type: 'service', multi: false },
          { headers: { token: window.localStorage.getItem('token') } }
        )
        .then((data) => {
          console.log(data?.data);
          onFinish(data?.data);
          setPaymentLoading(false);
        })
        .catch((e) => {
          console.error('PAYMENT INFO ERROR IN SERVICE');
          console.error(e.response);

          if (emailValidator(accountRef.current.email)) {
            handleSnackOpen({
              state: true,
              msg: 'Имэйл ээ оруулаагүй байна. Имэйл уу оруулна уу.',
              type: 'warning',
            });
            handleModalState(true);
          }
          setPaymentLoading(false);
          // else {
          //   setErrorMsg(e.response.data.name);
          // }

          // if (e.response.data.name === "") {
          //   setSubmitDisable(true);
          // }
        });
    };

    if (selectedServiceLoading === false && modalState === true)
      getPayMentData(setPaymentData);
  }, [selectedServiceLoading, modalState]);

  useEffect(() => {
    if (paymentData) {
      setQpayImage(paymentData.qr_text);
    }
  }, [paymentData, phoneSize]);

  return (
    <Container maxWidth={false} disableGutters>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <Grid container direction={'row'} className={classes.root}>
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={snackbarState.open}
          autoHideDuration={30000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity={snackbarState.severity}
            sx={{ width: '100%' }}
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
        {/* Modal */}
        <Modal
          className={classes.modal}
          open={modalState}
          onClose={() => history.push('/')}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalState}>
            {emailValidator(account.email) ? (
              userUpdateLoading ? (
                <div className={classes.paymentLoading}>
                  <CircularProgress color='inherit' />
                </div>
              ) : (
                <div className={classes.paper}>
                  <Typography className={classes.modalTitle}>
                    Та төлбөрийн баримт хүлээж авах имэйлээ хадгалаагүй байна.
                  </Typography>
                  <Typography className={classes.modalDesc}>
                    Таны имэйл-рүү төлбөрийн баримт явуулахын тулд та хаяг дээрээ имэйл ээ
                    хадгалсан байх шаардлагатай. Имэйл ээ хадгална уу.
                  </Typography>
                  {/* EMAIL */}
                  <Container
                    disableGutters
                    className={classes.modalBankText}
                    style={{ marginTop: 30 }}
                  >
                    {/* borderBottomLeftRadius: 10, borderBottomRightRadius: 10,  */}
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                      <Typography className={classes.label}>
                         Имэйл ээ оруулна уу.
                      </Typography>
                      <TextField
                        name={'email'}
                        label={'Имэйл хаяг'}
                        variant={'outlined'}
                        type={'text'}
                        onChange={(e) => handleAddEmail(e.target.value)}
                        onBlur={(e) => handleAddEmail(e.target.value)}
                        placeholder={'jhonnycash@gmail.com'}
                        className={classes.textField}
                        error={emailState.error}
                        helperText={'Имэйлийн форматаа зөв оруулана уу.'}
                        value={emailState.email}
                      />
                    </div>
                  </Container>
                  {/* Submit order or cancel order */}
                  <div
                    className={classes.modalButtonContainer}
                    style={{
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Button
                      onClick={() => handleModalState(false)}
                      className={classes.cancelButton}
                    >
                      Цуцлах
                    </Button>
                    <Button
                      onClick={() => updateEmail()}
                      className={classes.submitButton}
                    >
                      Батлах
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className={classes.paper}>
                {phoneSize ? (
                  // If it's mobile app
                  <>
                    <div className={classes.qpayPaymentMethods}>
                      {paymentLoading ? (
                        <div className={classes.paymentLoading}>
                          <CircularProgress color='inherit' />
                        </div>
                      ) : paymentData ? (
                        <>
                          <Typography
                            style={{
                              width: '100%',
                              fontFamily: 'SF Pro Display',
                              fontWeight: 'bold',
                              fontSize: 20,
                              paddingBottom: 30,
                            }}
                          >
                            Төлбөр хийх банкаа сонгоно уу.
                          </Typography>
                          {paymentData?.urls.map((item, index) => {
                            return (
                              <Container
                                onClick={() => window.open(item.link)}
                                className={classes.qpayBankItem}
                                key={'qpay' + index}
                              >
                                <img
                                  src={item.logo}
                                  alt={item.description}
                                  className={classes.qpayBankLogo}
                                />
                                <Typography className={classes.qpayBankName}>
                                  {item.description === 'Үндэсний хөрөнгө оруулалтын банк'
                                    ? 'ҮХО Банк'
                                    : item.description}
                                </Typography>
                              </Container>
                            );
                          })}
                        </>
                      ) : (
                        <Typography>Төлбөрийн хүсэлтээ дахин илгээнэ үү.</Typography>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Typography className={classes.modalTitle}>
                      {contextText.payment.modal.title}
                    </Typography>
                    <Typography className={classes.modalDesc}>
                      {contextText.payment.modal.description}
                    </Typography>
                    <Typography className={classes.modalPriceText}>
                      {contextText.payment.modal.price}
                    </Typography>
                    <Typography className={classes.modalPrice}>
                      {numberWithCommas(selectedService?.getServiceOption?.price)}₮
                    </Typography>
                    <Typography className={classes.modalDesc}>
                      {contextText.payment.modal.paymentMethod}
                    </Typography>
                    <Typography className={classes.modalTitle}>
                      {contextText.payment.modal.bankTransaction}
                    </Typography>
                    <Container disableGutters className={classes.modalBankText}>
                      <div className={classes.modalTextRow}>
                        <div>
                          <p className={classes.lineTextRight}>
                            {contextText.payment.modal.receiver}
                          </p>
                          <p className={classes.lineTextRight}>
                            {contextText.payment.modal.bankName}
                          </p>
                        </div>
                        <div>
                          <p className={classes.lineTextLeft}>Хүрээ Маркет</p>
                          <p className={classes.lineTextLeft}>511 511 3747</p>
                        </div>
                      </div>
                    </Container>
                    <div style={{ paddingTop: 25 }}>
                      <QRCode
                        value={qpayImage ? qpayImage : 'https://khureemarket.mn'}
                        size={180}
                        bgColor={'#ffffff'}
                        fgColor={'#000000'}
                        level={'L'}
                        includeMargin={false}
                        renderAs={'svg'}
                        onError={(e) => console.log(e)}
                        imageSettings={{
                          src: 'https://play-lh.googleusercontent.com/Co013STj7SVPILdcI9aDzeRDqGMwXgJi9MJXKjdcxjgLX2_k2VDjdbvZBHfSpaW_7g',
                          x: null,
                          y: null,
                          height: 30,
                          width: 30,
                          excavate: true,
                        }}
                      />
                    </div>
                    <p className={classes.modalDesc}>
                      {contextText.payment.modal.qrBottom}
                    </p>
                  </>
                )}
              </div>
            )}
          </Fade>
        </Modal>
        {/* Payment method section */}
        {/* <Grid item>
          <Container className={classes.pmOptionsContainer}>
            <Typography className={classes.title}>{contextText.payment.title}</Typography>
            <Typography className={classes.description}>
              {contextText.payment.description}
            </Typography>
            <Container disableGutters className={classes.methodContainer}>
              <Grid container direction={"row"}>
                {paymentMethods.map((data, index) => (
                  <Grid
                    item
                    key={"payment method item" + index}
                    className={classes.pmGridItem}
                  >
                    <PaymentMethodItem
                      name={data.name}
                      img={data.img}
                      description={data.desc}
                      handlePress={() => handlePaymentChoose(index + 1)}
                      chosen={chosenPayment}
                      index={index + 1}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Container>
        </Grid> */}
        {/* Payment calculator */}
        {/* <Grid item> */}
        {/* <Container className={classes.paymentCalcContainer}> */}
        {/* <Typography className={classes.title}>
              {contextText.payment.calculator.title}
            </Typography>
            <Typography className={classes.description}>
              {contextText.payment.calculator.description}
            </Typography> */}
        {/* SErvice */}
        {/* <Container disableGutters className={classes.calcItemContainer}>
              <Container disableGutters className={classes.calcTextContainer}>
                <Typography className={classes.itemName}>
                  {selectedService?.getServiceOption?.title}
                </Typography>
                <Typography className={classes.itemDesc}>
                  {contextText.payment.calculator.time}
                </Typography>
              </Container>
              <Typography className={classes.itemName}>
                {numberWithCommas(selectedService?.getServiceOption?.price)}₮
              </Typography>
            </Container> */}
        {/* <Divider className={classes.divider} /> */}
        {/* Amount */}
        {/* <Container disableGutters className={classes.calcItemContainer}>
              <Container disableGutters className={classes.calcTextContainer}>
                <Typography className={classes.itemName}>
                  {contextText.payment.calculator.amount}
                </Typography>
                <Typography className={classes.itemDesc}>
                  {contextText.payment.calculator.amountTime}
                </Typography>
              </Container>
              <Typography className={classes.itemName}>
                {numberWithCommas(selectedService?.getServiceOption?.price)}₮
              </Typography>
            </Container> */}
        {/* To pay */}
        {/* <Button
              disabled={submitDisable}
              onClick={() => submitPay()}
              className={classes.proceedToPay}
            >
              {contextText.payment.toPay}
            </Button> */}
        {/* </Container>
        </Grid> */}
      </Grid>
    </Container>
  );
}

// const PaymentMethodItem = (props) => {
//   const classes = useStyles(props);
//   return (
//     <Container
//       onClick={() => props?.handlePress()}
//       className={
//         props?.index === props?.chosen
//           ? classes.itemContainerActive
//           : classes.itemContainer
//       }
//     >
//       <img src={props.img} alt={"payment method qpay"} />
//       <Container className={classes.itemTextContainer}>
//         <Typography className={classes.itemDesc}>{props.description}</Typography>
//         <Typography className={classes.itemName}>{props.name}</Typography>
//       </Container>
//     </Container>
//   );
// };

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
    textAlign: 'left',
  },
  paymentLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: 400,
  },
  qpayPaymentMethods: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  qpayBankItem: {
    maxWidth: 130,
    paddingBottom: 20,
  },
  qpayBankName: {
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 150,
  },
  qpayBankLogo: {
    height: 50,
    width: 50,
  },
  backdrop: {
    zIndex: 1200 + 1,
    color: '#fff',
  },
  label: {
    paddingBottom: 17,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'white',
    boxShadow: '0px -10px 5px #ededed',
    paddingTop: 20,
    paddingBottom: 20,
  },
  textField: {
    width: '100%',
    marginBottom: '20px',
  },
  cancelButton: {
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  submitButton: {
    backgroundColor: colors.lightPurple,
    marginRight: 20,
    marginLeft: 10,
    color: 'white',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  pmOptionsContainer: {
    maxWidth: 750,
    textAlign: 'left',
    marginLeft: (props) => (props.phone ? 0 : 50),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  modalTitle: {
    ...modalTitle,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalTextRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  modalBankText: {
    backgroundColor: '#F7F7FD',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPriceText: {
    ...desc,
    paddingTop: 25,
  },
  modalPrice: {
    ...modalTitle,
    paddingBottom: 20,
  },
  lineTextRight: {
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    fontSize: '17px',
    color: 'black',
  },
  lineTextLeft: {
    textAlign: 'Left',
    marginLeft: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    fontSize: '17px',
    color: 'black',
  },
  paper: {
    backgroundColor: 'white',
    borderRadius: 11,
    maxWidth: 540,
    width: '100%',
    outline: 'none',
    textAlign: 'center',
  },
  title: {
    fontSize: 27,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginBottom: 15,
  },
  description: {
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    fontWeightl: 'normal',
    textAlign: 'left',
    maxWidth: 500,
    color: colors.black70,
    marginBottom: 35,
  },
  modalDesc: {
    ...desc,
  },
  pmGridItem: {
    margin: 15,
  },
  methodContainer: {
    marginLeft: -15,
  },
  itemContainer: {
    border: '1px solid lightgray',
    ...itemContainer,
  },
  itemContainerActive: {
    backgroundColor: '#F7F7FD',
    border: '1px solid transparent',
    ...itemContainer,
  },
  itemTextContainer: {},
  itemDesc: {
    color: colors.gray,
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    fontWeight: 'normal',
  },
  itemName: {
    color: colors.black,
    fontFamily: 'SF Pro Display',
    fontSize: 17,
    fontWeight: '600',
  },
  calcItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  calcTextContainer: {
    paddingBottom: 15,
  },
  divider: {
    marginBottom: 15,
  },
  paymentCalcContainer: {
    marginTop: (props) => (props.phone || props.tablet ? 0 : -50),
    paddingTop: 50,
    backgroundColor: '#F7F7F7',
    maxWidth: 400,
    position: 'absolute',
    right: 0,
  },
  proceedToPay: {
    backgroundColor: colors.lightPurple,
    color: 'white',
    width: '100%',
    borderRadius: 11,
    height: 45,
    marginBottom: 50,
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
}));

const desc = {
  fontFamily: 'SF Pro Display',
  fontSize: 14,
  fontWeightl: 'normal',
  textAlign: 'center',
  color: colors.black70,
  marginLeft: 30,
  marginRight: 30,
};

const modalTitle = {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'SF Pro Display',
  color: 'black',
};

const itemContainer = {
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F7F7FD',
    border: '1px solid transparent',
  },
};

// const paymentMethods = [
// {
//   img: qpay,
//   name: "QPay",
//   desc: "Данс эсвэл QR код",
// },
// {
//   img: khanbank,
//   name: "Хаан банк",
//   desc: "Картаар",
// },
// {
//   img: lendmn,
//   name: "LendMN",
//   desc: "Цахим хэтэвч",
// },
// {
//     img: golomt,
//     name: 'Golomt Bank',
//     desc: 'Quiere la boca exhausta'
// },
// {
//     img: TDBbank,
//     name: 'TDB',
//     desc: 'Quiere la boca exhausta'
// },
// {
//     img: pocket,
//     name: 'Pocket',
//     desc: 'Quiere la boca exhausta'
// },
// {
//     img: mongolchat,
//     name: 'Mongol Chat',
//     desc: 'Quiere la boca exhausta'
// },
// ];

export const numberWithCommas = (x) => {
  return x ? x.toString().replace(/\B(?=([\dA-Z]{3})+(?![\dA-Z]))/g, ',') : 0;
};
