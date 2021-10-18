import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import {
  Container,
  Fade,
  Modal,
  Typography,
  TextField,
  ButtonGroup,
  Button,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Alert } from '@mui/lab';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/marketeer/customFilterOption';
import AddButton from '../../components/adminComponents/addButton';
import TableCore from '../../components/core/tableCore';
import arrowRight from '../../assets/icons/arrowRight.svg';
import qrcode from '../../assets/icons/qrcode.svg';
import Price from '../../components/marketeer/customPrice';
import UserAvatarName from '../../components/user/usernameAvatar';
import paymentIcon from '../../assets/icons/payment.svg';
import plusIcon from '../../assets/icons/plusBlue.svg';
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-reader';
import colors from '../../constants/colors';
import Barcode from 'react-barcode';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_USER } from '../../graphql/gql/marketeer/checkUser';
import CustomDropdown from '../../components/customDropdown/customDropdown';
import {
  GET_LIST_OF_USER_ORDER,
  CREATE_USER_ORDER,
  GET_LIST_OF_GOODS,
  UPDATE_USER_ORDER,
} from '../../graphql/gql/marketeer/userPurchaseList';
import TheContext from '../../context/context';

export default function PurchaseList() {
  const classes = useStyles();
  const [showQR, setShowQR] = useState(false);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  const [QRloaded, setQRLoaded] = useState(false);
  const [meatAmount, setMeatAmount] = useState(0);
  const [QRInfoFound, setQRInfoFound] = useState(false);
  const [showQRScanner, setQRScanner] = useState(false);
  const [filterStatus, setFilterStatus] = useState('init');

  const [listOfMeat, setListOfMeat] = useState([]);
  const [chosenGoods, setChosenGoods] = useState({});
  const [updateModal, setUpdateModal] = useState(false);

  const [listOfType, setListOfType] = useState([]);
  const [goodsType, setGoodsType] = useState({});
  const [activeItem, setActiveItem] = useState();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const {
    data: listOfUserOrder,
    loading: listLoading,
    refetch,
  } = useQuery(GET_LIST_OF_USER_ORDER, {
    fetchPolicy: 'cache-and-network',
    variables: { marketeerId: account._id, status: filterStatus },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const { loading: listOfGoodsLoading, refetch: listOfGoodsRefetch } = useQuery(
    GET_LIST_OF_GOODS,
    {
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
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e.message);
      },
    }
  );

  const [createUserOrder, { loading: createOrderLoading }] = useMutation(
    CREATE_USER_ORDER,
    {
      onCompleted(data) {
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай худалдан авалт хийлээ',
          type: 'success',
        });
        setTimeout(() => {
          handleQRScannerModalQuit();
          refetch();
          listOfGoodsRefetch();
        }, 100);
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
    }
  );

  const [updateUserOrder, { loading: updateUserOrderLoading }] = useMutation(
    UPDATE_USER_ORDER,
    {
      onCompleted(data) {
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай худалдан авалтыг шинэчиллээ.',
          type: 'success',
        });
        setTimeout(() => {
          refetch();
          listOfGoodsRefetch();
          handleUpdateModalQuit();
        }, 100);
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
    }
  );

  const handleUpdateUserOrder = () => {
    updateUserOrder({
      variables: {
        _id: activeItem?._id,
        ...(filterStatus === 'init'
          ? { status: 'verified' }
          : filterStatus === 'verified'
          ? { status: 'shipping' }
          : null),
      },
    });
  };

  const handleUpdateWithModal = (e) => {
    setUpdateModal(true);
    setActiveItem(e);
  };

  const handleUpdateModalQuit = () => {
    setUpdateModal(false);
  };

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

  const handleQRScan = (e) => {
    if (e) {
      setQRInfoFound(true);
      setTimeout(() => {
        checkUser({ variables: { _id: e?.toString() } });
      }, 100);
      console.log(e);
    }
  };

  const handleQRError = (e) => {
    if (e) {
      console.log(e);
    }
  };

  const handleQRLoad = (e) => {
    if (e) {
      setQRLoaded(true);
      console.log(e);
    }
  };

  const handleAddMeat = (num, type) => {
    const meat = userData?.checkUser?.service?.meatAmount;
    const marketMeat = parseInt(goodsType?.value);

    if (type === 'field') {
      if (num <= marketMeat && num <= meat) setMeatAmount(num);
    } else {
      if (meatAmount < meat && meatAmount < marketMeat)
        setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num);
    }
  };

  const handleQRScannerModalQuit = () => {
    setQRScanner(false);
    setQRLoaded(false);
    setQRInfoFound(false);
    setShowQR(false);
  };

  const handleFilterStatus = (filter) => {
    filter === 0
      ? setFilterStatus('init')
      : filter === 1
      ? setFilterStatus('verified')
      : filter === 2
      ? setFilterStatus('shipping')
      : filter === 3
      ? setFilterStatus('delivered')
      : filter === 4
      ? setFilterStatus('userCameBy')
      : setFilterStatus('canceled');
  };

  const handleCreateUserOrder = () => {
    console.log('GOODS ID');
    console.log(goodsType._id);
    meatAmount > 0
      ? createUserOrder({
          variables: {
            status: 'userCameBy',
            userId: userData?.checkUser?._id,
            goodsId: goodsType?._id,
            amountkg: meatAmount,
            marketeerId: account._id,
            goodsName: chosenGoods.name,
            goodsType: goodsType.name,
            initDate: Date.now(),
            price: meatAmount * goodsType.price,
          },
        })
      : handleSnackOpen({
          state: true,
          msg: 'Амжилтгүй боллоо',
          severity: 'warning',
        });
  };

  return (
    <>
      <AppBar />
      {/* Body */}
      <Container className={classes.root}>
        {/* Page title and description */}
        <PageAbout
          title={'Худалдан авалтын түүх'}
          desc={`Энд худалдан авагчийн түүх харагдаж байна.Мөн хэрэглэгчийг мах авахад хэрэглэгчийн 
            мэдээллийг авах болон шалгах хэсэг буюу qr код болон карт уншуулах хэсэг байрлаж байна.`}
        />
        {/* Snackbar notification */}
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
        {/* User QR generator */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={showQR}
          onClose={() => setShowQR(false)}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={showQR}>
            <Container className={classes.qrGenContainer}>
              <Typography className={classes.qrGenTitle}>Таны Хөнгөлөлтийн QR</Typography>
              <Typography className={classes.qrGenDescription}>
                Та qr код юмуу бар код руу камераа чиглүүлнэ үү!
              </Typography>
              {/* QR generator */}
              <QRCode
                className={classes.qrGenerator}
                value={'test'}
                size={200}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                renderAs={'svg'}
                onError={(e) => console.log(e)}
                imageSettings={{
                  src: 'https://static.zpao.com/favicon.png',
                  x: null,
                  y: null,
                  height: 30,
                  width: 30,
                  excavate: true,
                }}
              />
              {/* Barcode generator */}
              <Barcode height={50} width={1} value='http://github.com/kciter' />
            </Container>
          </Fade>
        </Modal>
        {/* QR Scanner using webcam */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={showQRScanner}
          onClose={() => handleQRScannerModalQuit()}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={showQRScanner}>
            <Container
              disableGutters
              className={classes.qrScannerContainer}
              style={{ height: QRloaded ? 'auto' : '400px' }}
            >
              {!QRloaded ||
              checkUserLoading ||
              createOrderLoading ||
              listOfGoodsLoading ? (
                <div className={classes.loaderContainer}>
                  <CircularProgress />
                </div>
              ) : null}
              {!QRInfoFound && (
                <>
                  <QrReader
                    delay={200}
                    onLoad={(e) => handleQRLoad(e)}
                    onScan={(e) => handleQRScan(e)}
                    onError={(e) => handleQRError(e)}
                    className={classes.qrScanner}
                    style={{ display: !QRloaded ? 'hidden' : 'block' }}
                    showViewFinder={false}
                  />
                  <Container
                    className={classes.rqScanTextContainer}
                    style={{ display: QRloaded === false ? 'hidden' : 'block' }}
                  >
                    <div className={classes.cameraOverlay} />
                    <Typography
                      className={classes.rqScanText}
                      style={{
                        display: QRloaded === false ? 'hidden' : 'block',
                        color: QRloaded ? 'white' : 'transparent',
                      }}
                    >
                      Худалдан авагчийн QR код руу камераа чиглүүлнэ үү!
                    </Typography>
                  </Container>
                </>
              )}
              {QRInfoFound && (
                <>
                  {userData?.checkUser?.role === 'member' &&
                  userData?.checkUser?.status === 'paid' ? (
                    !createOrderLoading || !listOfGoodsLoading ? (
                      <>
                        <div className={classes.orderRegisterModalBody}>
                          <PageAbout
                            marginTop={0}
                            marginBottom={20}
                            title={'Худалдан авалт бүртгэх'}
                            descWidth={'100%'}
                            desc={`Энд худалдан авагчийн түүх харагдаж байна.Мөн хэрэглэгчийг мах авахад хэрэглэгчийн 
                              мэдээллийг авах болон шалгах хэсэг буюу qr код болон карт уншуулах хэсэг байрлаж байна.`}
                          />
                          {/* User's first and lastname */}
                          <Typography className={classes.addOrderUsername}>
                            Хэрэглэгч
                          </Typography>
                          <TextField
                            label={'Овог нэр'}
                            placeholder={'Наран'}
                            value={
                              (userData?.checkUser?.firstName
                                ? userData?.checkUser?.firstName + ' '
                                : '') +
                              (userData?.checkUser?.lastName
                                ? userData?.checkUser?.lastName
                                : '')
                            }
                            variant={'outlined'}
                            className={classes.addOrderTextfield}
                            disabled
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
                          <Typography className={classes.addOrderUsername}>
                            Махны төрөл
                          </Typography>
                          <CustomDropdown
                            onChange={(e) => setGoodsType(e)}
                            options={
                              listOfType[chosenGoods?.index ? chosenGoods?.index : 0]
                            }
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
                            >
                              <Button
                                onClick={() =>
                                  meatAmount > 0 && setMeatAmount(meatAmount - 1)
                                }
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
                            <Typography className={classes.possibleKilo}>
                              {userData?.checkUser?.service?.meatAmount + 'кг боломжтой.'}
                            </Typography>
                            <Typography className={classes.possibleKilo}>
                              {goodsType?.value + 'кг боломжтой.'}
                            </Typography>
                          </div>
                        </div>
                        {/* Submit order or cancel order */}
                        <div className={classes.modalButtonContainer}>
                          <Button
                            onClick={() => handleQRScannerModalQuit()}
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
                      </>
                    ) : (
                      <div className={classes.loaderContainer}>
                        <CircularProgress />
                      </div>
                    )
                  ) : (
                    <>
                      {/* Couldn't fit to the requirements */}
                      <div className={classes.userNotFound}>
                        <h2>Уучлаарай хэрэглэгч олдсонгүй.</h2>
                      </div>
                    </>
                  )}
                </>
              )}
            </Container>
          </Fade>
        </Modal>
        {/* Modal update order */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={updateModal}
          onClose={() => handleUpdateModalQuit()}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={updateModal}>
            <Container disableGutters className={classes.qrScannerContainer}>
              <PageAbout
                marginTop={30}
                marginBottom={20}
                title={'Захиалгын төлөвийг өөрчлөх'}
                descWidth={350}
                desc={`Та уг захиалгын төлөвийг өөрчлөхдөө итгэлтэй байна уу? 
                  Өөрчилсөн тохиолдолд буцааж болохгүйг анхаарна уу.`}
              />
              {/* Submit order or cancel order */}
              <div className={classes.modalButtonContainer}>
                <Button
                  onClick={() => handleUpdateModalQuit()}
                  className={classes.cancelButton}
                >
                  Болих
                </Button>
                <Button
                  onClick={() => handleUpdateUserOrder(activeItem)}
                  className={classes.submitButton}
                >
                  Өөрчлөх
                </Button>
              </div>
            </Container>
          </Fade>
        </Modal>
        {/* Table filters */}
        <Container className={classes.options}>
          <OptionsCore
            options={[
              'Захиалсан',
              'Баталгаажсан',
              'Хүргэгдэж буй',
              'Хүргэгдсэн',
              'Ирж авсан',
              'Цуцлагдсан',
            ]}
            onChange={(e) => handleFilterStatus(e)}
          />
          <div style={{ display: 'flex' }}>
            <AddButton
              title='QR Код Уншуулах'
              icon={qrcode}
              onClick={() => setQRScanner(true)}
            />
            <AddButton
              color={'#6A67D3'}
              title='Карт уншуулах'
              icon={plusIcon}
              marginLeft={15}
              onClick={() => setShowQR(true)}
            />
          </div>
        </Container>
        {/* Table headers */}
        <TableCore
          stopHover
          items={[
            { item: 'ID', width: '200px' },
            { item: 'Нэр', width: '260px' },
            { item: 'Төрөл', width: '180px' },
            { item: 'Хэмжээ', width: '130px' },
            { item: 'Огноо', width: '110px' },
            { item: 'Үнэ', width: '110px' },
          ]}
          backgroundColor={'#f7f7f7'}
          height={'50px'}
          opacity={'0.7'}
        />
        {/* Table body and data */}
        {listLoading || updateUserOrderLoading ? (
          <div style={{ height: '200px' }}>
            <CircularProgress />
          </div>
        ) : listOfUserOrder?.getListOfUserOrders?.length > 0 ? (
          listOfUserOrder?.getListOfUserOrders?.map((item, index) => (
            <TableCore
              key={'table core item' + index}
              items={[
                { item: `${item?._id}`, width: 200 },
                {
                  item: (
                    <UserAvatarName
                      data={{
                        name: item?.user?.firstName,
                        image: item?.user?.avatar?.path,
                        username: '@' + item?.user?.username,
                      }}
                    />
                  ),
                  width: '260px',
                },
                { item: `${item?.goodsName + ' ' + item?.goodsType}`, width: '180px' },
                { item: `${item?.amountkg + ' кг'}`, width: '110px' },
                {
                  item: `${moment(item?.initDate).format('YYYY-MM-DD')}`,
                  width: '130px',
                },
                {
                  item: <Price data={{ status: item?.paid, value: item?.price }} />,
                  width: '110px',
                },
              ]}
              height={'70px'}
              stopHover={
                filterStatus === 'shipping' ||
                filterStatus === 'userCameBy' ||
                filterStatus === 'canceled'
              }
              imageSrc={item?.price?.status ? paymentIcon : arrowRight}
              buttonColor={item?.price?.status ? '#f95a48' : '#6A67D3'}
              onClickButton={() => handleUpdateWithModal(item)}
            />
          ))
        ) : (
          <div>
            <Typography>Илэрц олдсонгүй</Typography>
          </div>
        )}
      </Container>
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 35,
    padding: 0,
  },
  backdrop: {
    zIndex: 1200 + 100,
    color: '#fff',
  },
  loaderContainer: {
    position: 'absolute',
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
  addOrderUsername: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 17,
    marginTop: 25,
  },
  addOrderTextfield: {
    width: '100%',
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
  userNotFound: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '400px',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  kilCounterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
  qrScanner: {
    width: '100%',
    borderRadius: 21,
    backgroundColor: 'transparent',
  },
  meatAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    textAlign: 'center',
    color: 'black',
  },
  rqScanTextContainer: {
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    margin: 0,
  },
  rqScanText: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  qrGenTitle: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  qrGenDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: colors.black70,
    marginBottom: 20,
  },
  qrGenerator: {
    padding: 20,
    marginBottom: 20,
  },
  qrGenContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
    padding: 30,
    backgroundColor: 'white',
    maxWidth: 380,
    width: '100%',
    maxHeight: 500,
    outline: 'none',
    border: 'none',
  },
  cameraOverlay: {
    margin: 'auto',
    marginTop: 50,
    marginBottom: 50,
    width: '200px',
    height: 200,
    border: '5px solid white',
    borderRadius: '11px',
  },
}));
