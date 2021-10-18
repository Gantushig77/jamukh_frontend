import React, { useState, useContext } from 'react';
import {
  Modal,
  Container,
  Typography,
  Divider,
  CircularProgress,
  Slide,
  useMediaQuery,
  Button,
  Snackbar,
  Fade,
  TextField,
  ButtonGroup,
} from '@mui/material';
import json2mq from 'json2mq';
import { Alert } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import Market from '../../components/user/market';
import starWhite from '../../assets/icons/starWhite.svg';
import Filter from '../marketeer/filter';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import TheContext from '../../context/context';
import timeIcon from '../../assets/icons/time2.svg';
import { GET_LIST_OF_MARKETEERS } from '../../graphql/gql/operator/marketeerList';
import CustomDropdown from '../../components/customDropdown/customDropdown';
import {
  CREATE_USER_ORDER,
  GET_LIST_OF_GOODS,
} from '../../graphql/gql/marketeer/userPurchaseList';
import { CHECK_USER } from '../../graphql/gql/marketeer/checkUser';
import colors from '../../constants/colors';

export default function MarketList() {
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook.account;

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const classes = useStyles();
  const [marketDetail, setMarketDetail] = useState(false);
  const [formData, setFormData] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [meatAmount, setMeatAmount] = useState(0);

  const [listOfMeat, setListOfMeat] = useState([]);
  const [chosenGoods, setChosenGoods] = useState({});

  const [listOfType, setListOfType] = useState([]);
  const [goodsType, setGoodsType] = useState({});

  const history = useHistory();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const {
    data: marketeerList,
    loading: marketeerListLoading,
    refetch,
  } = useQuery(GET_LIST_OF_MARKETEERS, {
    variables: { status: 'all' },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error?.message);
    },
  });

  const [createUserOrder] = useMutation(CREATE_USER_ORDER, {
    onCompleted(data) {
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай худалдан авалт хийлээ',
        type: 'success',
      });
      setTimeout(() => {
        refetch();
        setMarketDetail(false);
        handleOrderModalQuit();
      }, 100);
      setTimeout(() => {
        // history.push(`/user/payment-order?id=${data?.createUserOrder?._id}`)
        history.push('/user/basket');
      }, 1000);
      console.log(data);
    },
    onError(e) {
      handleSnackOpen({
        state: true,
        msg: e.message,
        type: 'error',
      });
      console.log(e.message);
    },
  });

  const { loading: listOfGoodsLoading, refetch: listOfGoodsRefetch } = useQuery(
    GET_LIST_OF_GOODS,
    {
      variables: { userId: formData?._id },
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        console.log(data);
        const parentGoods = data.getListOfMarketeerGoods.map((item, index) => {
          return {
            index: index,
            name: item.parent.name,
          };
        });

        const childrenGoods = data.getListOfMarketeerGoods.map((item) => {
          return item.children;
        });

        setListOfMeat(parentGoods);
        setTimeout(() => {
          setListOfType(childrenGoods);
        }, 100);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const [checkUser, { data: userData, loading: checkUserLoading }] = useMutation(
    CHECK_USER,
    {
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e.message);
      },
    }
  );

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

  const handleAddMeat = (num, type) => {
    const meat = userData?.checkUser?.service?.meatAmount;
    const serviceType = 'regular';
    const marketMeat = parseInt(goodsType?.value);

    if (serviceType === 'regular') {
      if (type === 'field') {
        if (num <= marketMeat) setMeatAmount(num);
      } else {
        if (meatAmount < marketMeat)
          setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num);
      }
    } else {
      if (type === 'field') {
        if (num <= marketMeat && num <= meat) setMeatAmount(num);
      } else {
        if (meatAmount < meat && meatAmount < marketMeat)
          setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num);
      }
    }
  };

  const handleMarketDetailModal = (item, bool) => {
    setFormData(item);

    console.log('some data info');
    console.log(formData);
    listOfGoodsRefetch({ variables: { userId: formData.userId } });

    setTimeout(() => {
      setMarketDetail(bool);
    }, 100);
  };

  const handleOrderModalOpen = () => {
    setOrderModal(true);
    checkUser({
      variables: {
        _id: account._id,
      },
    });
  };

  const handleOrderModalQuit = () => {
    setOrderModal(false);
  };

  const handleCreateUserOrder = () => {
    meatAmount > 0
      ? createUserOrder({
          variables: {
            status: 'init',
            userId: account?._id,
            goodsId: goodsType?._id,
            amountkg: parseInt(meatAmount),
            marketeerId: formData?._id,
            goodsName: chosenGoods?.name,
            goodsType: goodsType?.name,
            initDate: Date.now(),
            price: parseInt(meatAmount) * parseInt(goodsType?.marketeerPrice),
          },
        })
      : handleSnackOpen({
          state: true,
          msg: 'Махны хэмжээгээ сонгоно уу.',
          type: 'warning',
        });
  };

  let saveFunc = 'SomeText';

  return (
    <>
      <AppBar phone={phoneSize} tablet={tabletSize} />
      {/* Order modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={orderModal}
        onClose={() => handleOrderModalQuit()}
        closeAfterTransition
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={orderModal}>
          {listOfGoodsLoading || checkUserLoading ? (
            <div style={{ minHeight: 300 }}>
              <CircularProgress />
            </div>
          ) : (
            <Container disableGutters className={classes.qrScannerContainer}>
              <div className={classes.orderRegisterModalBody}>
                <PageAbout
                  marginTop={0}
                  marginBottom={20}
                  title={'Худалдан авалт бүртгэх'}
                  descWidth={'100%'}
                  desc={`Энд худалдан авагчийн түүх харагдаж байна.Мөн хэрэглэгчийг мах авахад хэрэглэгчийн 
                    мэдээллийг авах болон шалгах хэсэг буюу qr код болон карт уншуулах хэсэг байрлаж байна.`}
                />
                {/* Meat type */}
                <Typography className={classes.addOrderUsername}>
                  Мал амьтны төрөл
                </Typography>
                <CustomDropdown
                  onChange={(e) => setChosenGoods(e)}
                  options={listOfMeat}
                />
                {/* Meat category */}
                <Typography className={classes.addOrderUsername}>Махны төрөл</Typography>
                <CustomDropdown
                  onChange={(e) => setGoodsType(e)}
                  options={listOfType[chosenGoods?.index ? chosenGoods?.index : 0]}
                />
                {/* Amount */}
                <Typography className={classes.addOrderUsername}>
                  Хэмжээ (кг/ш)
                </Typography>
                {/* Add meat kilo */}
                <div className={classes.kilCounterContainer}>
                  <ButtonGroup
                    variant='contained'
                    aria-label='contained primary button group'
                    style={{ maxWidth: 170 }}
                  >
                    <Button
                      onClick={() => meatAmount > 0 && setMeatAmount(meatAmount - 1)}
                    >
                      -
                    </Button>
                    <Button>
                      <TextField
                        size={'small'}
                        type={'number'}
                        onChange={(e) => handleAddMeat(e.target.value, 'field')}
                        value={meatAmount}
                      />
                    </Button>
                    <Button onClick={() => handleAddMeat(1)}>+</Button>
                  </ButtonGroup>
                  {userData?.checkUser?.serviceType !== 'regular' && (
                    <div>
                      <Typography className={classes.shopMeatText}>
                        Хэрэглэгч :
                      </Typography>
                      <Typography className={classes.possibleKilo}>
                        {userData?.checkUser?.service?.meatAmount + 'кг'}
                      </Typography>
                    </div>
                  )}
                  <div>
                    <Typography className={classes.shopMeatText}>Дэлгүүр :</Typography>
                    <Typography className={classes.possibleKilo}>
                      {goodsType?.value + (goodsType?.isUnit ? ' ширхэг ' : ' кг ')}
                    </Typography>
                  </div>
                </div>
              </div>
              {/* Submit order or cancel order */}
              <div className={classes.modalButtonContainer}>
                <Button
                  onClick={() => handleOrderModalQuit()}
                  className={classes.cancelButton}
                >
                  Цуцлах
                </Button>
                <Button
                  onClick={() => handleCreateUserOrder()}
                  className={classes.submitButton}
                >
                  Нэмэх
                </Button>
              </div>
            </Container>
          )}
        </Fade>
      </Modal>
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      {/* More info modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.moreInfoModal}
        open={marketDetail}
        onClose={() => setMarketDetail(false)}
        closeAfterTransition
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={marketDetail} direction={'left'}>
          <div className={classes.moreInfoPaper}>
            {/* IMAGE */}
            {formData?.coverImg ? (
              <img
                src={formData?.coverImg}
                alt={'coverImg'}
                className={classes.moreInfoImgPlaceholder}
              />
            ) : (
              <div className={classes.moreInfoImgPlaceholder}>
                <Typography>IMAGE PLACEHOLDER</Typography>
              </div>
            )}
            {/* Title and star */}
            <div className={classes.titleAndStar}>
              <div className={classes.moreInfoTitleContainer}>
                <Typography className={classes.moreInfoTitle}>
                  {formData?.name}
                </Typography>
              </div>
              <div className={classes.starContainer}>
                <Typography className={classes.starCount}>{formData?.star}</Typography>
                <img src={starWhite} alt={'star'} className={classes.starIcon} />
              </div>
            </div>
            {/* Description */}
            <div className={classes.moreInfoDescContainer}>
              <Typography className={classes.moreInfoDescription}>
                {formData?.description}
              </Typography>
            </div>
            {/* Phone and Time */}
            <div className={classes.phoneAndOpenhours}>
              <div className={classes.moreInfoPhoneContainer}>
                <Typography className={classes.moreInfoPhone}>
                  {formData?.phone}
                </Typography>
              </div>
              <Divider
                orientation='vertical'
                flexItem
                className={classes.verticalDivider}
              />
              <div className={classes.moreInfoOpenHoursContainer}>
                <img src={timeIcon} alt={'clock'} className={classes.moreInfoClockIcon} />
                <Typography className={classes.moreInfoOpenHours}>
                  {formData?.openHours}
                </Typography>
              </div>
            </div>
            {/* Address title */}
            <div className={classes.moreInfoTitleContainer}>
              <Typography className={classes.moreInfoTitle} style={{ fontSize: 17 }}>
                {contextText.operator.marketeerList.form.address}
              </Typography>
            </div>
            {/* Address description */}
            <div className={classes.moreInfoDescContainer}>
              <Typography className={classes.moreInfoDescription}>
                {formData?.address}
              </Typography>
            </div>
            {/* Shipping title */}
            <div className={classes.moreInfoTitleContainer} style={{ marginTop: 20 }}>
              <Typography className={classes.moreInfoTitle} style={{ fontSize: 17 }}>
                {contextText.operator.marketeerList.form.shipping}
              </Typography>
            </div>
            {/* Shipping description */}
            <div className={classes.moreInfoDescContainer}>
              <Typography className={classes.moreInfoDescription}>
                {formData?.shipping}
              </Typography>
            </div>
            {/* Order button */}
            <div className={classes.orderButtonContainer}>
              <Button
                className={classes.orderButton}
                style={{
                  backgroundColor:
                    listOfMeat.length < 1 ? colors.gray30 : colors.lightPurple,
                }}
                disabled={listOfMeat.length < 1}
                onClick={() =>
                  saveFunc === 'saveFunc'
                    ? handleOrderModalOpen()
                    : history.push(`/user/market-goods-list?id=${formData?._id}`)
                }
              >
                {listOfMeat.length < 1 ? 'Бараа дууссан байна.' : 'Зочлох'}
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarState.open}
        autoHideDuration={3000}
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
      <Container>
        <div className={classes.header}>
          <PageAbout
            title={'Дэлгүүрийн Жагсаалт'}
            desc={`Салбар дэлгүүрүүд дээрх манай мах махан бүтээгдэхүүнүүдийн мэдээллийг харах боломжтой боллоо. Та өөрт ойр байрлах дэлгүүрээс очиж худалдан авалт хийгээрэй.`}
          />
          <div className={classes.buttons}></div>
        </div>
        <Container disableGutters maxWidth={false} className={classes.container}>
          {marketeerListLoading ? (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            marketeerList?.getListOfMarketeers?.map((item, index) => (
              <Market
                data={item}
                key={index}
                showDetail={() => handleMarketDetailModal(item, true)}
              />
            ))
          )}
        </Container>
      </Container>
    </>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    marginTop: 56,
    padding: 0,
    margin: 0,
    justifyContent: 'start',
    alignItems: 'start',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
  },
  addOrderUsername: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 17,
    marginTop: 25,
  },
  kilCounterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  shopMeatText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    paddingLeft: 20,
    color: 'black',
    opacity: '0.5',
  },
  possibleKilo: {
    fontStyle: 'italic',
    textAlign: 'left',
    color: 'black',
    opacity: '0.5',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'SF Pro Display',
    fontSize: 14,
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
  qrScannerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 21,
    padding: 0,
    backgroundColor: 'white',
    maxWidth: 450,
    width: '100%',
    maxHeight: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
  },
  orderRegisterModalBody: {
    height: '100%',
    textAlign: 'left',
    padding: '30px',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderButtonContainer: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    color: 'white !important',
  },
  orderButton: {
    backgroundColor: colors.lightPurple,
    width: '100%',
    borderRadius: '11px',
    height: 45,
    color: 'white !important',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0px 7px 4px #00000029',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 20,
  },
  icon: {
    width: 15,
    height: 15,
  },
  moreInfoModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '50px',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
  },
  moreInfoPaper: {
    position: 'relative',
    maxHeight: '70%',
    width: '100%',
    maxWidth: '350px',
    backgroundColor: 'white',
    border: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    borderRadius: 21,
    overflow: 'auto',
    outline: 'none',
    padding: 20,
  },
  moreInfoImgPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    maxHeight: 200,
    width: '100%',
    height: 200,
    borderRadius: '17px',
    backgroundColor: 'lightGray',
  },
  moreInfoPhoneContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  moreInfoClockIcon: {
    width: 13,
    height: 13,
    paddingBottom: 2,
    paddingRight: 5,
  },
  verticalDivider: {
    backgroundColor: colors.gray30,
  },
  moreInfoOpenHoursContainer: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colors.orange,
    width: 51,
    height: 25,
    marginLeft: 15,
  },
  titleAndStar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  starCount: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    color: 'white',
  },
  starIcon: {
    width: 13,
    height: 13,
    paddingBottom: 2,
    paddingLeft: 5,
  },
  moreInfoTitleContainer: {
    maxWidth: '220px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    height: 25,
    paddingBottom: 6,
  },
  moreInfoTitle: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  moreInfoDescContainer: {
    overflow: 'auto',
    display: 'block',
    maxHeight: 60,
  },
  moreInfoDescription: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    textAlign: 'left',
    color: colors.black70,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  phoneAndOpenhours: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTop: '1px solid #D5D5D5',
    borderBottom: '1px solid #D5D5D5',
  },
}));
