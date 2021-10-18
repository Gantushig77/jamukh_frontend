import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Modal,
  Snackbar,
  Typography,
  TextField,
  ButtonGroup,
  Button,
  Fade,
  CircularProgress,
} from '@mui/material';
import colors from '../../constants/colors';
import { Alert } from '@mui/lab';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/core/optionsCore';
import AddButton from '../../components/adminComponents/addButton';
import TableCore from '../../components/custom/customTableItem';
import CustomDropdown from '../../components/customDropdown/customDropdown';
import { useMutation, useQuery } from '@apollo/client';
import TheContext from '../../context/context';
import moment from 'moment';
import {
  GET_LIST_OF_MARKETEER_ORDERS,
  GET_LIST_OF_ALL_GOODS,
  CREATE_MARKETEER_ORDER,
  UPDATE_MARKETEER_ORDER,
} from '../../graphql/gql/marketeer/orderList';
import { useHistory } from 'react-router-dom';
import Price from '../../components/marketeer/customPrice';
import check from '../../assets/icons/check.svg';

export default function MarketeerOrderList() {
  const classes = useStyles();
  const [filterStatus, setFilterStatus] = useState(0);
  const [meatAmount, setMeatAmount] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [listOfMeat, setListOfMeat] = useState([]);
  const [chosenGoods, setChosenGoods] = useState({});

  const [listOfType, setListOfType] = useState([]);
  const [goodsType, setGoodsType] = useState({});
  const [activeItem, setActiveItem] = useState();

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;
  const history = useHistory();

  const {
    data: listOfMOrder,
    loading: listLoading,
    refetch,
  } = useQuery(GET_LIST_OF_MARKETEER_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      marketeerId: account._id,
      archived: filterStatus === 7 ? true : false,
      ...(filterStatus === 0
        ? { status: 'init' }
        : filterStatus === 1
        ? { status: 'verified' }
        : filterStatus === 2
        ? { status: 'shipping' }
        : filterStatus === 3
        ? { status: 'delivered' }
        : filterStatus === 4
        ? { status: 'canceled' }
        : filterStatus === 5
        ? { status: 'archived' }
        : null),
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const { loading: allGoodsLoading } = useQuery(GET_LIST_OF_ALL_GOODS, {
    variables: { active: true },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);

      const parentGoods = data.getListOfAllGoods.map((item, index) => {
        return {
          index: index,
          name: item.name,
        };
      });

      const childrenGoods = data.getListOfAllGoods.map((item) => {
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
  });

  const [createMarketeerOrder] = useMutation(CREATE_MARKETEER_ORDER, {
    onCompleted(data) {
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай худалдан авалт хийлээ',
        type: 'success',
      });
      handleModalQuit();
      history.push('/marketeer/order-list');
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

  const [updateMarketeerOrder] = useMutation(UPDATE_MARKETEER_ORDER, {
    onCompleted(data) {
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай шинэчлэлээ.',
        type: 'success',
      });

      refetch();
      handleUpdateModalQuit();

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

  const handleFilterStatus = (filter) => {
    setFilterStatus(filter);
  };

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

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
    const meat = parseInt(goodsType?.total);
    const meatNum = parseInt(num);
    if (type === 'field') {
      if (meatNum <= meat) setMeatAmount(meatNum);
    } else {
      if (num < meat) setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num);
    }
  };

  const handleModalQuit = () => {
    setModal(false);
  };

  const handleUpdateModalQuit = () => {
    setUpdateModal(false);
  };

  const submitTheOrder = () => {
    createMarketeerOrder({
      variables: {
        marketeerId: account._id,
        goodsId: goodsType?._id,
        goodsName: chosenGoods?.name,
        goodsType: goodsType?.name,
        price: meatAmount * goodsType?.price,
        status: 'init',
        amountkg: meatAmount,
      },
    });

    handleSnackOpen({
      state: true,
      msg: 'Амжилттай',
      type: 'success',
    });
  };

  const handleUpdateWithModal = (e) => {
    setUpdateModal(true);
    setActiveItem(e);
  };

  const handleUpdateOrder = (e) => {
    console.log(e);
    updateMarketeerOrder({
      variables: {
        _id: e.toString(),
        status: 'delivered',
        orderType: 'marketeer',
        goodsId: e?.goodsId,
      },
    });
  };

  return (
    <>
      <AppBar />
      <Container maxWidth={false} disableGutters className={classes.root}>
        <PageAbout
          title={'Захиалгын Түүх'}
          desc={`Үйлдвэрээс мах захиалж авсан захиалгын түүхийг харуулж байна. 
            Захиалга өгөх товч дээр дарж шинэ захиалга өгөх боломжтой.`}
        />
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
                  onClick={() => handleUpdateOrder(activeItem)}
                  className={classes.submitButton}
                >
                  Өөрчлөх
                </Button>
              </div>
            </Container>
          </Fade>
        </Modal>
        {/* Modal - order */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={modal}
          onClose={() => handleModalQuit()}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={modal}>
            {allGoodsLoading ? (
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
                  <Typography className={classes.addOrderUsername}>
                    Махны төрөл
                  </Typography>
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
                      style={{ maxWidth: 200 }}
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
                    <Typography className={classes.possibleKilo}>
                      {goodsType?.total +
                        (goodsType?.isUnit ? ' ширхэг ' : ' кг ') +
                        ` боломжтой. `}
                    </Typography>
                  </div>
                </div>
                {/* Submit order or cancel order */}
                <div className={classes.modalButtonContainer}>
                  <Button
                    onClick={() => handleModalQuit()}
                    className={classes.cancelButton}
                  >
                    Цуцлах
                  </Button>
                  <Button
                    onClick={() => submitTheOrder()}
                    className={classes.submitButton}
                  >
                    Нэмэх
                  </Button>
                </div>
              </Container>
            )}
          </Fade>
        </Modal>
        <div className={classes.optionsContainer}>
          <OptionsCore
            acceptValue={filterStatus}
            onChange={handleFilterStatus}
            options={[
              'Захиалсан',
              'Баталгаажсан',
              'Хүргэгдэж буй',
              'Хүргэгдсэн',
              'Цуцлагдсан',
              'Архивлагдсан',
            ]}
          />
          <AddButton
            onClick={() => setModal(true)}
            title={'+ Захиалга өгөх'}
            color={'#F95A48'}
          />
        </div>
        <>
          <TableCore
            backgroundColor='#f7f7f7'
            stopHover
            height='50px'
            marginTop='36px'
            items={[
              { item: 'ID', width: '150px' },
              { item: 'Төрөл', width: '145px' },
              { item: 'Ангилал', width: '160px' },
              { item: 'Хэмжээ', width: '100px' },
              { item: 'Үүсгэсэн', width: '140px' },
              { item: 'Хүргэгдсэн', width: '120px' },
              { item: 'Үнэ', width: '100px' },
            ]}
          />
          {listLoading ? (
            <CircularProgress />
          ) : listOfMOrder?.getListOfMarketeerOrders?.length === 0 ? (
            <div>
              <Typography>Илэрц олдсонгүй</Typography>
            </div>
          ) : (
            listOfMOrder?.getListOfMarketeerOrders?.map((item, index) => (
              <TableCore
                key={'table core' + index}
                stopHover={filterStatus === 2 ? false : true}
                items={[
                  {
                    item: `${item?._id}`,
                    width: '150px',
                    ellipsed: true,
                    ellipseVal: 15,
                  },
                  { item: `${item?.goodsName}`, width: '145px' },
                  { item: `${item?.goodsType}`, width: '160px' },
                  {
                    item: `${item?.amountkg} ${item?.isUnit ? ' ш' : ' кг'}`,
                    width: '100px',
                  },
                  {
                    item: `${moment(item?.initDate).format('YYYY-MM-DD')}`,
                    width: '140px',
                  },
                  {
                    item: `${
                      item.deliveryDate
                        ? moment(item?.deliveryDate).format('YYYY-MM-DD')
                        : 'Хүлээгдэж буй'
                    }`,
                    width: '120px',
                  },
                  {
                    item: <Price data={{ status: item?.paid, value: item?.price }} />,
                    width: '100px',
                  },
                ]}
                buttonColor={colors.lightPurple}
                imageSrc={check}
                onClickButton={(e) => handleUpdateWithModal(e)}
              />
            ))
          )}
        </>
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
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 36,
    width: '85%',
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
