import React, { useState, useContext } from 'react';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/core/optionsCore';
import TableCore from '../../components/custom/customTableItem';
import {
  Container,
  Fade,
  Modal,
  Typography,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/lab';
import { GET_LIST_OF_USER_ORDER } from '../../graphql/gql/marketeer/userPurchaseList';
import TheContext from '../../context/context';
import { useQuery } from '@apollo/client';
import colors from '../../constants/colors';
import Price from '../../components/marketeer/customPrice';
import arrowRight from '../../assets/icons/arrowRight.svg';
import { stringEllipser } from '../../helpers/helperFunctions';
import moment from 'moment';
import QRCode from 'qrcode.react';
import ebarimt_icon from '../../assets/icons/ebarimt.svg';

export default function OrderList() {
  const classes = useStyles();
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;
  const contextText = ContextHook.contextValue.contextText;

  const [activeItem, setActiveItem] = useState();
  const [modal, setModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('init');

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const { data: listOfUserOrder, loading: listLoading } = useQuery(
    GET_LIST_OF_USER_ORDER,
    {
      variables: {
        userId: account._id,
        status: filterStatus,
      },
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const handleModal = (e) => {
    setActiveItem(e);
    setModal(true);
  };

  const handleModalQuit = () => {
    setModal(false);
  };

  // const handleSnackOpen = ({ state, msg, type }) => {
  //   setSnackbarState({
  //     open: state,
  //     message: msg,
  //     severity: type,
  //   });
  // };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
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

  return (
    <>
      <AppBar />
      <Container>
        <PageAbout
          title={'Худалдан авалтууд'}
          desc={`Энд таны худалдан авалтын түүхийг харуулж байна. 
            Мөн одоогийн захиалга болон үйл явцыг харж болно. 
            Таны дэлгүүрээс очиж авсан худалдан авалтууд 
            oчиж авсан дотор бүртгэгдэнэ.`}
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
        {/* Modal */}
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
            <div className={classes.paper}>
              <div>
                <div className={classes.ebarimt_icon_container}>
                  <img src={ebarimt_icon} alt={'ebarimt'} style={{ maxWidth: 50 }} />
                </div>
                <Typography
                  className={classes.modalTitle}
                  style={{
                    paddingTop: 0,
                    marginTop: 0,
                    color: '#0953A7',
                    paddingBottom: 10,
                  }}
                >
                  И-Баримт харах
                </Typography>
                <Typography className={classes.modalDesc} style={{ paddingBottom: 20 }}>
                  {moment(activeItem?.vat?.created_date).format('YYYY-MM-DD HH:MM:SS')}
                </Typography>
                {/* <Typography className={classes.modalDesc} style={{ paddingBottom: 20 }}>
                  Таны худалдан авалтын и-баримтын тухай дэлгэрэнгүй мэдээллийг үзүүлж
                  байна.
                </Typography> */}
                <Typography
                  className={classes.modalDesc}
                  style={{ marginBottom: 0, paddingBottom: 0 }}
                >
                  Сугалааны дугаар
                </Typography>
                <Typography
                  className={classes.modalTitle}
                  style={{ paddingTop: 0, paddingBottom: 30 }}
                >
                  {activeItem?.vat?.ebarimt_lottery}
                </Typography>
                <Container disableGutters className={classes.modalBankText}>
                  <div className={classes.modalTextRow}>
                    <div>
                      <p className={classes.lineTextRight}>Үнийн дүн</p>
                      {/* <p className={classes.lineTextRight}>
                        {numberWithCommas(activeItem?.price)}₮
                      </p> */}
                    </div>
                    <div>
                      <p className={classes.lineTextRight}>
                        {numberWithCommas(activeItem?.price)}₮
                      </p>
                      {/* <Button className={classes.copyButton}>Хуулах</Button> */}
                    </div>
                  </div>
                </Container>
                <div style={{ paddingTop: 25 }}>
                  <QRCode
                    value={
                      activeItem?.vat
                        ? activeItem?.vat?.ebarimt_qr_data
                        : 'https://khureemarket.mn'
                    }
                    size={200}
                    bgColor={'#ffffff'}
                    fgColor={'#000000'}
                    level={'L'}
                    includeMargin={false}
                    renderAs={'svg'}
                    onError={(e) => console.log(e)}
                  />
                </div>
                <p className={classes.modalDesc}>
                  {contextText.payment.modal.ebarimtBottom}
                </p>
              </div>
            </div>
          </Fade>
        </Modal>
        <OptionsCore
          marginTop={'36px'}
          marginBottom={'36px'}
          acceptValue={0}
          onChange={handleFilterStatus}
          options={[
            'Захиалсан',
            'Баталгаажсан',
            'Хүргэгдэж Буй',
            'Хүргэгдсэн',
            'Очиж авсан',
          ]}
        />
        <TableCore
          stopHover
          height={'50px'}
          backgroundColor={'#f7f7f7'}
          items={[
            { item: 'ID', width: '200px' },
            { item: 'Дүүрэг', width: '140px' },
            { item: 'Дэлгүүр', width: '160px' },
            { item: 'Төрөл', width: '140px' },
            { item: 'Хэмжээ', width: '125px' },
            { item: 'Огноо', width: '140px' },
            { item: 'Үнэ', width: '120px' },
          ]}
        />
        {listLoading ? (
          <div style={{ height: '200px' }}>
            <CircularProgress />
          </div>
        ) : listOfUserOrder?.getListOfUserOrders?.length > 0 ? (
          listOfUserOrder?.getListOfUserOrders?.map((item, index) => (
            <TableCore
              key={'table core item' + index}
              items={[
                { item: `${item?._id}`, width: '200px' },
                {
                  item: `${
                    item?.marketeer?.address
                      ? stringEllipser(item.marketeer.address, 30)
                      : '****'
                  }`,
                  width: '140px',
                },
                {
                  item: `${item?.marketeer?.name ? item.marketeer.name : '****'}`,
                  width: '160px',
                },
                { item: `${item?.goodsName}`, width: '140px' },
                { item: `${item?.amountkg + ' кг'}`, width: '125px' },
                {
                  item: `${moment(item?.initDate).format('YYYY-MM-DD')}`,
                  width: '140px',
                },
                {
                  item: <Price data={{ status: item?.paid, value: item?.price }} />,
                  width: '120px',
                },
              ]}
              height={'70px'}
              stopHover={true}
              hoverEffectWithoutTranslate={filterStatus === 'init' ? false : true}
              imageSrc={arrowRight}
              buttonColor={'#6A67D3'}
              onClickBody={() => (filterStatus === 'init' ? null : handleModal(item))}
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
  ebarimt_icon_container: {
    paddingTop: 20,
  },
  paper: {
    backgroundColor: 'white',
    borderRadius: 11,
    maxWidth: 540,
    width: '100%',
    outline: 'none',
    textAlign: 'center',
  },
  modalDesc: {
    ...desc,
  },
  modalTitle: {
    ...modalTitle,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalBankText: {
    backgroundColor: '#F7F7FD',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  lineTextRight: {
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    fontSize: '17px',
    color: 'black',
  },
  // copyButton: {
  //   borderRadius: 10,
  //   backgroundColor: 'gray',
  //   color: 'black',
  // },
  lineTextLeft: {
    textAlign: 'Left',
    marginLeft: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    fontSize: '17px',
    color: 'black',
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
    backgroundColor: 'white',
    maxWidth: 600,
    width: '100%',
    maxHeight: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
    padding: 20,
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

const modalTitle = {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'SF Pro Display',
  color: 'black',
};

const desc = {
  fontFamily: 'SF Pro Display',
  fontSize: 14,
  fontWeightl: 'normal',
  textAlign: 'center',
  color: colors.black70,
  marginLeft: 30,
  marginRight: 30,
};

const numberWithCommas = (x) => {
  return x ? x.toString().replace(/\B(?=([\dA-Z]{3})+(?![\dA-Z]))/g, ',') : 0;
};
