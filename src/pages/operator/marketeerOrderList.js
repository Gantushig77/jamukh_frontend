import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Modal,
  Snackbar,
  Typography,
  TextField,
  Button,
  Fade,
  CircularProgress,
} from '@mui/material';
import colors from '../../constants/colors';
import { Alert } from '@mui/lab';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/core/optionsCore';
import TableCore from '../../components/custom/customTableItem';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import star from '../../assets/icons/star.svg';
import Shop from '../../components/adminComponents/shop.js';
import { stringEllipser } from '../../helpers/helperFunctions';
import {
  GET_LIST_OF_COMBINED_ORDERS, // merged with user orderes too.
  UPDATE_MARKETEER_ORDER,
} from '../../graphql/gql/marketeer/orderList';
import paymentIcon from '../../assets/icons/payment.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';
import Price from '../../components/marketeer/customPrice';

export default function MarketeerOrderList() {
  const classes = useStyles();
  const [filterStatus, setFilterStatus] = useState(0);
  const [updateModal, setUpdateModal] = useState({
    type: 'getInfo',
    state: false,
  });
  const [activeItem, setActiveItem] = useState({});

  const {
    data: listOfMOrder,
    loading: listLoading,
    refetch,
  } = useQuery(GET_LIST_OF_COMBINED_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      archived: filterStatus === 7 ? true : false,
      ...(filterStatus === 0
        ? { status: 'init' }
        : filterStatus === 1
        ? { status: 'verified' }
        : filterStatus === 4
        ? { status: 'shipping' }
        : filterStatus === 5
        ? { status: 'delivered' }
        : filterStatus === 6
        ? { status: 'canceled' }
        : null),
      ...(filterStatus === 2
        ? { status: 'preparing' }
        : filterStatus === 3
        ? { status: 'prepared' }
        : null),
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const [updateMarketeerOrder] = useMutation(UPDATE_MARKETEER_ORDER, {
    onCompleted(data) {
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай шинэчлэлээ.',
        type: 'success',
      });
      setTimeout(() => {
        handleUpdateModalQuit();
        refetch();
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

  const handleUpdateModalQuit = () => {
    setUpdateModal({
      type: updateModal.type,
      state: false,
    });
  };

  const handleUpdateWithModal = (item, type, modalType) => {
    console.log('from the marketeer ordr');
    console.log(modalType);
    setUpdateModal({
      type: modalType,
      state: true,
    });
    setActiveItem({ ...item, type });
  };

  const handleUpdateOrder = (e) => {
    updateMarketeerOrder({
      variables: {
        _id: e._id.toString(),
        orderType: e.type,
        archived: filterStatus === 7 ? true : false,
        ...(filterStatus === 0 && e.paid === false
          ? { paid: true, paidDate: Date.now() }
          : filterStatus === 0 && e.paid
          ? { status: 'verified' }
          : filterStatus === 3
          ? { status: 'shipping' }
          : filterStatus === 4
          ? { status: 'delivered' }
          : filterStatus === 5
          ? { status: 'canceled' }
          : null),
        ...(filterStatus === 1
          ? { status: 'preparing' }
          : filterStatus === 2
          ? { status: 'prepared' }
          : null),
      },
    });
  };

  return (
    <>
      <AppBar />
      <Container maxWidth={false} disableGutters className={classes.root}>
        <PageAbout
          title={'Захиалгууд'}
          desc={`Та энэ хэсгээс захиалгуудын төлөвийг удирдан өөрчлөх боломжтой.`}
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
          open={updateModal?.state}
          onClose={() => handleUpdateModalQuit()}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={updateModal?.state}>
            {updateModal?.type === 'update' ? (
              // Update modal
              <Container disableGutters className={classes.qrScannerContainer}>
                <PageAbout
                  marginTop={30}
                  marginBottom={20}
                  title={'Захиалгын төлөв өөрчлөх'}
                  descWidth={'100%'}
                  desc={`Та уг захиалгын төлөвийг өөрчлөхдөө итгэлтэй байна уу?`}
                />
                {/* Submit order or cancel order */}
                <div className={classes.modalButtonContainer}>
                  <Button
                    onClick={() => handleUpdateModalQuit()}
                    className={classes.cancelButton}
                  >
                    Цуцлах
                  </Button>
                  <Button
                    onClick={() => handleUpdateOrder(activeItem)}
                    className={classes.submitButton}
                  >
                    Шинэчлэх
                  </Button>
                </div>
              </Container>
            ) : (
              // Get info modal
              <Container disableGutters className={classes.getInfoModalBody}>
                <Container>
                  <PageAbout
                    width={'100%'}
                    marginTop={30}
                    marginBottom={20}
                    title={'Захиалгын Дэлгэрэнгүй'}
                    descWidth={'100%'}
                    desc={`Та захиалгын дэлгэрэнгүй мэдээллийг энэ хэсгээс авах боломжтой.`}
                  />
                  {/* name and date */}
                  <div className={classes.textFieldRow}>
                    {/* shop or user name */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>
                        {activeItem?.type === 'marketeer' ? 'Дэлгүүр' : 'Хэрэглэгч'}
                      </Typography>
                      <TextField
                        label={
                          activeItem?.type === 'marketeer'
                            ? 'Дэлгүүрийн нэр'
                            : 'Хэрэглэгчийн нэр'
                        }
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={activeItem?.locationInfo?.fullName || 'Хаяг бүртгэлгүй'}
                      />
                    </div>
                    {/* date */}
                    <div style={{ width: '50%' }}>
                      <Typography className={classes.label}>Огноо</Typography>
                      <TextField
                        label={'Огноо'}
                        variant={'outlined'}
                        className={classes.textField}
                        disabled={true}
                        value={
                          moment(activeItem?.initDate).format('YYYY-MM-DD') || 'Огноо'
                        }
                      />
                    </div>
                  </div>
                  {/* goods name and type */}
                  <div className={classes.textFieldRow}>
                    {/* goods name */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>Мал Амьтны Төрөл</Typography>
                      <TextField
                        label={'Мал Амьтны Төрөл'}
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={activeItem?.goodsName || 'Бүртгэлгүй'}
                      />
                    </div>
                    {/* goods type */}
                    <div style={{ width: '50%' }}>
                      <Typography className={classes.label}>Махны Төрөл</Typography>
                      <TextField
                        label={'Махны Төрөл'}
                        variant={'outlined'}
                        className={classes.textField}
                        disabled={true}
                        value={activeItem?.goodsType || 'Бүртгэлгүй'}
                      />
                    </div>
                  </div>
                  {/* amount and price */}
                  <div className={classes.textFieldRow}>
                    {/* goods amount */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>Хэмжээ</Typography>
                      <TextField
                        label={'Хэмжээ'}
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={
                          `${activeItem?.amountkg} ${
                            activeItem?.isUnit ? ' ш' : ' кг'
                          }` || 'Хэмжээ Бүртгэлгүй'
                        }
                      />
                    </div>
                    {/* goods price */}
                    <div style={{ width: '50%' }}>
                      <Typography className={classes.label}>Үнэ</Typography>
                      <TextField
                        label={'Үнэ'}
                        variant={'outlined'}
                        className={classes.textField}
                        disabled={true}
                        value={activeItem?.price + ' ₮' || 'Үнэ бүртгэлгүй'}
                      />
                    </div>
                  </div>
                  {/* city and district */}
                  <div className={classes.textFieldRow}>
                    {/* city */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>Хот / Аймаг</Typography>
                      <TextField
                        label={'Хот / Аймаг'}
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={activeItem?.locationInfo?.city || 'Хот бүртгэлгүй'}
                      />
                    </div>
                    {/* district */}
                    <div style={{ width: '50%' }}>
                      <Typography className={classes.label}>Дүүрэг / Сум</Typography>
                      <TextField
                        label={'Дүүрэг / Сум'}
                        variant={'outlined'}
                        className={classes.textField}
                        disabled={true}
                        value={activeItem?.locationInfo?.district || 'Аймаг бүртгэлгүй'}
                      />
                    </div>
                  </div>
                  {/* unit */}
                  <div className={classes.textFieldRow}>
                    {/* unit */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>Хороо / Баг</Typography>
                      <TextField
                        label={'Хороо / Баг'}
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={activeItem?.locationInfo?.unit || 'Хороо бүртгэлгүй'}
                      />
                    </div>
                    {/* phone */}
                    <div style={{ width: '50%', paddingRight: 15 }}>
                      <Typography className={classes.label}>Хороо / Баг</Typography>
                      <TextField
                        label={'Хороо / Баг'}
                        variant={'outlined'}
                        disabled={true}
                        className={classes.textField}
                        value={
                          activeItem?.locationInfo?.phone || 'Утасны дугаар бүртгэлгүй'
                        }
                      />
                    </div>
                  </div>
                  {/* address */}
                  <div className={classes.textFieldRow}>
                    {/* address */}
                    <div style={{ width: '100%' }}>
                      <Typography className={classes.label}>Дэлгэрэнгүй хаяг</Typography>
                      <TextField
                        label={'Дэлгэрэнгүй хаяг'}
                        variant={'outlined'}
                        disabled={true}
                        multiline
                        maxRows={3}
                        className={classes.textField}
                        value={activeItem?.locationInfo?.address || 'Хороо бүртгэлгүй'}
                      />
                    </div>
                  </div>
                </Container>
              </Container>
            )}
          </Fade>
        </Modal>
        {/* Body */}
        <div className={classes.optionsContainer}>
          <OptionsCore
            acceptValue={filterStatus}
            onChange={handleFilterStatus}
            options={[
              'Захиалсан',
              'Баталгаажсан',
              'Бэлдэж буй',
              'Бэлдсэн',
              'Хүргэгдэж буй',
              'Хүргэгдсэн',
              'Цуцлагдсан',
              'Архивлагдсан',
            ]}
          />
        </div>
        <>
          <TableCore
            backgroundColor='#f7f7f7'
            stopHover
            height='50px'
            marginTop='36px'
            items={[
              { item: 'ID', width: '120px' },
              { item: 'Дэлгүүр', width: '200px' },
              { item: 'Хаяг', width: '200px' },
              { item: 'Төрөл', width: '130px' },
              { item: 'Хэмжээ', width: '100px' },
              { item: 'Огноо', width: '100px' },
              { item: 'Үнэ', width: '100px' },
            ]}
          />
          {listLoading ? (
            <CircularProgress />
          ) : listOfMOrder?.getListOfCombinedOrders?.length === 0 ? (
            <div>
              <Typography>Илэрц олдсонгүй</Typography>
            </div>
          ) : (
            listOfMOrder?.getListOfCombinedOrders?.map((item, index) => (
              <TableCore
                key={'table core' + index}
                translateValue={-100}
                stopHover={item?.status === 'canceled' || item?.status === 'delivered'}
                onClickBody={() =>
                  handleUpdateWithModal(
                    item,
                    item?.orderedFrom !== null ? 'user' : 'marketeer',
                    'getInfo'
                  )
                }
                items={[
                  {
                    item: `${item?._id}`,
                    width: '120px',
                    ellipsed: true,
                    ellipseVal: 10,
                  },
                  {
                    item: (
                      <Shop
                        data={{
                          name: item?.orderedFrom
                            ? item?.user?.username
                            : item?.marketeer?.name,
                          image: item?.orderedFrom
                            ? item?.user?.avatar?.path
                            : item?.marketeer?.coverImg,
                          rating: item?.orderedFrom
                            ? stringEllipser(item?.user?.email, 15)
                            : item?.marketeer?.star?.toString(),
                        }}
                        starIcon={item?.orderedFrom ? null : star}
                        placeholderStr={item?.marketeer ? 'SHOP' : 'USER'}
                      />
                    ),
                    width: '200px',
                  },
                  {
                    item: `${
                      item?.marketeer?.address
                        ? item.marketeer.address
                        : item?.locationInfo
                        ? item?.locationInfo?.address
                          ? item?.locationInfo?.address
                          : item?.locationInfo?.discrict + ' ' + item?.locationInfo.unit
                        : 'Хаяг бүртгэлгүй'
                    }`,
                    width: '200px',
                  },
                  {
                    item: `${item?.goodsName + ' ' + item?.goodsType}`,
                    width: '130px',
                  },
                  { item: `${item?.amountkg + ' кг'}`, width: '100px' },
                  {
                    item: `${moment(item?.initDate).format('YYYY-MM-DD')}`,
                    width: '100px',
                  },
                  {
                    item: <Price data={{ status: item?.paid, value: item?.price }} />,
                    width: '100px',
                  },
                ]}
                imageSrc={
                  item?.status === 'delivered'
                    ? null
                    : item?.status === 'init' && !item?.paid
                    ? paymentIcon
                    : arrowRight
                }
                buttonColor={item?.paid ? '#6A67D3' : '#f95a48'}
                onClickButton={() =>
                  handleUpdateWithModal(
                    item,
                    item?.orderedFrom !== null ? 'user' : 'marketeer',
                    'update'
                  )
                }
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
    overflow: 'auto',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  getInfoModalBody: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 21,
    backgroundColor: 'white',
    maxWidth: 600,
    maxHeight: '80%',
    width: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'auto',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
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
  label: {
    paddingBottom: 17,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
  },
  textField: {
    width: '100%',
    marginBottom: '20px',
  },
  textFieldRow: {
    display: 'flex',
  },
}));
