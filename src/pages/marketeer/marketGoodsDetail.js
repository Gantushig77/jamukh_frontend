import React, { useState, useContext } from 'react';
import {
  useMediaQuery,
  Container,
  CircularProgress,
  Button,
  TextField,
  ButtonGroup,
  Snackbar,
  Backdrop,
  Modal,
  Fade,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/lab';
import { useHistory, useLocation } from 'react-router-dom';
import { GET_SINGLE_MARKETEER_GOODS } from '../../graphql/gql/marketeerGoods/marketeerGoods';
import { CREATE_USER_ORDER } from '../../graphql/gql/marketeer/userPurchaseList';
import { useQuery, useMutation } from '@apollo/client';
import TheContext from '../../context/context';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import json2mq from 'json2mq';
import PageAbout from '../../components/adminComponents/pageAbout';
import colors from '../../constants/colors';
import Section2 from '../../components/home/section2/Section2';

export default function GoodsDetail() {
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const classes = useStyles({ phone: phoneSize, tablet: tabletSize });
  // States
  const [theImg, setTheImg] = useState();
  const [modal, setModal] = useState(false);
  const [meatAmount, setMeatAmount] = useState(1);
  const [listOfImages, setListOfImages] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });
  // Queries and Mutations
  const { data, loading } = useQuery(GET_SINGLE_MARKETEER_GOODS, {
    fetchPolicy: 'cache-and-network',
    variables: { _id: id },
    onCompleted(data) {
      console.log(data);
      data?.getSingleMarketeerGoods?.categoryImg &&
        setTheImg(data?.getSingleMarketeerGoods?.categoryImg?.path);
      let someImgs = [...data?.getSingleMarketeerGoods?.goodsImg];
      someImgs?.unshift(data?.getSingleMarketeerGoods?.categoryImg);
      setListOfImages(someImgs);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [createUserOrder, { loading: createOrderLoading }] = useMutation(
    CREATE_USER_ORDER,
    {
      onCompleted(data) {
        handleSnackOpen({
          state: true,
          msg: 'Захиалгыг амжилттай бүртгэлээ.',
          type: 'success',
        });
        setTimeout(() => {
          history.push('/user/basket');
        }, 1000);
        console.log(data);
      },
      onError(e) {
        console.log(e.message);
      },
    }
  );
  // Helper functions
  const handleThumbHover = (data, index) => {
    setTheImg(data.path);
    setActiveImgIndex(index);
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

  const handleAddMeat = (num, type) => {
    const meat = 999999;
    const serviceType = 999999;
    const marketMeat = 999999;

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

  const handleModalQuit = () => {
    setModal(false);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const sectionTwoFunc = (id, parentId) => {
    history.push(`/goods-detail?id=${id}`);
  };
  // Submit section
  const handleAddBasket = () => {
    if (parseInt(meatAmount) < 1) {
      handleSnackOpen({
        state: true,
        msg: 'Худалдан авах хэмжээгээ сонгоно уу.',
        type: 'warning',
      });
    } else if (!account) {
      history.push('/login');
    } else if (data?.getSingleMarketeerGoods?.total < 1) {
      handleSnackOpen({
        state: true,
        msg: 'Бараа дууссан байна.',
        type: 'warning',
      });
    } else {
      createUserOrder({
        variables: {
          status: 'init',
          userId: account?._id,
          goodsId: id,
          amountkg: parseInt(meatAmount),
          goodsName: data?.getSingleMarketeerGoods?.parentCategory?.name,
          goodsType: data?.getSingleMarketeerGoods?.name,
          marketeerId: data?.getSingleMarketeerGoods?.marketeerId,
          orderedFrom: 'marketeer',
          initDate: Date.now(),
          price: meatAmount * data?.getSingleMarketeerGoods?.price,
        },
      });
    }
  };

  return (
    <Container disableGutters className={classes.root}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarState.open}
        autoHideDuration={5000}
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
      {/* Backdrop for loading */}
      <Backdrop className={classes.backdrop} open={createOrderLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
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
          <Container disableGutters className={classes.qrScannerContainer}>
            <img src={theImg} alt={'main im bigger'} className={classes.biggerMainImg} />
          </Container>
        </Fade>
      </Modal>
      {/* Body */}
      <Container disableGutters className={classes.body}>
        <PageAbout
          title={'Барааны дэлгэрэнгүй'}
          desc={'Энэ хэсгээс та барааны тухай дэлгэрэнгүй мэдээллийг авна уу.'}
          marginLeft={phoneSize ? 25 : 55}
          marginBottom={40}
          descWidth={'80%'}
          // width={'80%'}
        />
        {loading ? (
          <div className={classes.loadingDiv}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.sizeFitter}>
            <Container className={classes.theContainer}>
              {/* Image section */}
              <Container disableGutters className={classes.imgContainerFlex}>
                {/* Image thumbnails */}
                <Container className={classes.verticalThumbs}>
                  {listOfImages.length > 0 &&
                    listOfImages.map((item, index) => (
                      <div
                        key={`thumb ${index}`}
                        className={classes.thumbImgBox}
                        onMouseEnter={() => handleThumbHover(item, index)}
                      >
                        <img
                          src={item.path}
                          alt={`thumb ${index}`}
                          className={
                            activeImgIndex === index
                              ? classes.thumbImgActive
                              : classes.thumbImg
                          }
                        />
                      </div>
                    ))}
                </Container>
                {/* The main image */}
                <Container disableGutters className={classes.mainImageContainer}>
                  <div className={classes.mainImgBox}>
                    {theImg ? (
                      <img
                        src={theImg}
                        alt={'theImg'}
                        onClick={handleModalOpen}
                        className={classes.mainImg}
                      />
                    ) : (
                      <h1>No img</h1>
                    )}
                  </div>
                </Container>
              </Container>
              {/* Info section */}
              <Container className={classes.infoContainer}>
                <h2 className={classes.title}>
                  {data?.getSingleMarketeerGoods?.parentCategory?.name +
                    ' ' +
                    data?.getSingleMarketeerGoods?.name}
                </h2>
                <p className={classes.description}>
                  {data?.getSingleMarketeerGoods?.description}
                </p>
                <div className={classes.statsContainer}>
                  <div className={classes.priceContainer}>
                    <p className={classes.priceLabel}>{`${
                      data?.getSingleMarketeerGoods?.isUnit ? 'Ширхэг' : 'Кг'
                    } тутмын үнэ : `}</p>
                    <p
                      className={classes.price}
                    >{`${data?.getSingleMarketeerGoods?.price} ₮`}</p>
                  </div>
                  <div className={classes.priceContainer}>
                    <p className={classes.priceLabel}>Нийт нөөц : </p>
                    <p className={classes.price}>{`${
                      data?.getSingleMarketeerGoods?.total
                    } ${data?.getSingleMarketeerGoods?.isUnit ? ' ш' : ' кг'}`}</p>
                  </div>
                </div>
              </Container>
            </Container>
            {/* MeatAmount and Add to Basket */}
            <Container className={classes.meatAndButton}>
              <Container className={classes.priceContainer}>
                {/* Meat amount control */}
                <ButtonGroup
                  color='buttonGroup'
                  variant='contained'
                  aria-label='contained primary button group'
                  className={classes.buttonGroup}
                >
                  <Button
                    className={classes.groupButton}
                    onClick={() => meatAmount > 0 && setMeatAmount(meatAmount - 1)}
                  >
                    -
                  </Button>
                  <Button className={classes.groupButton}>
                    <TextField
                      size={'small'}
                      type={'number'}
                      variant={'standard'}
                      onChange={(e) => handleAddMeat(e.target.value, 'field')}
                      value={meatAmount}
                    />
                  </Button>
                  <Button
                    className={classes.groupButton}
                    onClick={() => handleAddMeat(1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
                {/* Add to the basket */}
                <Button onClick={() => handleAddBasket()} className={classes.buyButton}>
                  Сагсанд нэмэх
                </Button>
              </Container>
            </Container>
            {/* Similar Goods */}
            <Section2
              parentId={data?.getSingleMarketeerGoods?.parentCategory?._id}
              onCardSelect={sectionTwoFunc}
              phone={phoneSize}
              tablet={tabletSize}
            />
          </div>
        )}
      </Container>
      <Footer phone={phoneSize} tablet={tabletSize} />
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 0,
    marginRight: 0,
    maxWidth: '100%',
  },
  body: {
    marginBottom: 50,
    maxWidth: 1280,
    fontFamily: 'SF Pro Display',
  },
  backdrop: {
    zIndex: 1200 + 1,
    color: '#fff',
  },
  buttonGroup: {
    color: 'lightgray',
    borderColor: 'black',
    maxWidth: 160,
    marginRight: 20,
    backgroundColor: 'lightgray',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  },
  groupButton: {
    backgroundColor: 'lightgray',
    color: 'black',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
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
  biggerMainImg: {
    width: '100%',
  },
  title: {
    textAlign: 'start',
    margin: 0,
    marginBottom: 20,
  },
  description: {
    textAlign: 'start',
    margin: 0,
    marginBottom: 20,
    fontSize: 14,
  },
  theContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
  },
  infoContainer: {
    width: (props) => (props?.phone ? '100%' : '50%'),
  },
  statsContainer: {
    display: 'flex',
  },
  priceContainer: {
    display: 'flex',
    paddingRight: 20,
    width: '100%',
  },
  priceLabel: {
    paddingRight: 5,
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  meatAndButton: {
    marginLeft: (props) => (props?.tablet ? 0 : props?.phone ? 0 : '50%'),
    marginRight: 50,
    display: 'flex',
    marginBottom: (props) => (props?.phone ? 150 : 0),
    justifyContent: (props) => (props?.tablet || props?.phone ? 'center' : 'flex-start'),
    width: (props) => (props?.tablet || props?.phone ? '100%' : '50%'),
  },
  buyButton: {
    backgroundColor: colors.lightPurple,
    width: '100%',
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  imgContainerFlex: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 30,
    width: (props) => (props?.phone ? '100%' : '50%'),
  },
  verticalThumbs: {
    maxWidth: (props) => (props?.phone ? 85 : 110),
    paddingLeft: (props) => props?.phone && 0,
    paddingRight: 0,
    marginRight: 0,
  },
  thumbImgBox: {
    width: 60,
    height: 60,
    margin: 10,
    marginTop: 0,
    cursor: 'pointer',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    filter: 'grayscale(50%)',
    '&:hover': {
      border: '3px solid black',
      height: 54,
      width: 54,
    },
  },
  thumbImgActive: {
    border: '3px solid black',
    height: 54,
    width: 54,
  },
  mainImageContainer: {
    width: '100%',
  },
  mainImgBox: {
    maxWidth: 500,
  },
  mainImg: {
    maxWidth: '100%',
    cursor: 'pointer',
  },
  loadingDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  sizeFitter: {
    width: '100%',
    overflow: 'hidden',
  },
}));
