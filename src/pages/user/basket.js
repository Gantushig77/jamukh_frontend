import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import Appbar from '../../components/appbar/appbar';
import TheContext from '../../context/context';
import json2mq from 'json2mq';
import {
  Container,
  Typography,
  Grid,
  Modal,
  Backdrop,
  Button,
  Fade,
  CircularProgress,
  Snackbar,
  Divider,
  useMediaQuery,
  ButtonGroup,
  TextField,
  FormControl,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/lab';
import colors from '../../constants/colors';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import PageAbout from '../../components/adminComponents/pageAbout';
import CustomTableItem from '../../components/custom/customTableCheckBox';
import Price from '../../components/adminComponents/price';
import beef_blue from '../../assets/icons/beef_blue.svg';
import beef_red from '../../assets/icons/beef_red.svg';
import sheep_red from '../../assets/icons/sheep_red.svg';
import sheep_blue from '../../assets/icons/sheep_blue.svg';
import {
  GET_LIST_OF_USER_BASKET,
  CREATE_MULTI_ORDER_BASKET,
} from '../../graphql/gql/user/userBasket';
import { DELETE_USER_ORDER } from '../../graphql/gql/marketeer/userPurchaseList';
import { LOCATION_INFO } from '../../graphql/gql/locationInfo/locationInfo';
import DropdownCore from '../../components/core/dropdownCore';
import InputCore from '../../components/core/inputCore';
import { CSS_HELPER } from '../../constants/helper';
import { stringEllipser } from '../../helpers/helperFunctions';
import ToastifyBody, { toastError } from '../../components/core/toastCore';

// Tulbutuu toloh, sagsan dahi baraagaa harah huudas
export default function ShoppingBasket() {
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const trigger = useMediaQuery('(max-width: 1280px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const [count, setCount] = useState(0);
  const history = useHistory();
  const classes = useStyles({
    phone: phoneSize,
    tablet: tabletSize,
    trigger: trigger,
  });
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = useRef(ContextHook?.account);

  const [listOfGoodsToBuy, setListOfGoodsToBuy] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    id: '',
  });
  const [checked, setChecked] = useState(false);
  const orderType = 'Хүргүүлэх';
  // address data

  const [seeAddress, setSeeAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    city: undefined,
    district: undefined,
    address: undefined,
    email: undefined,
    phone: undefined,
    fullName: undefined,
  });

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const {
    data: listOfUserBasket,
    loading: listLoading,
    refetch: basketRefetch,
  } = useQuery(GET_LIST_OF_USER_BASKET, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const [createMultiOrder, { loading: multiOrderLoading }] = useMutation(
    CREATE_MULTI_ORDER_BASKET,
    {
      onCompleted(data) {
        console.log(data);
        setTimeout(() => {
          history.push(
            `/user/payment-order?multi=true&id=${data.createMultiOrderBasket._id}`
          );
        }, 500);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const [deleteOrder, { loading: deleteLoading }] = useMutation(DELETE_USER_ORDER, {
    onCompleted(data) {
      console.log(data);
      setDeleteModal({
        ...deleteModal,
        state: false,
      });
      basketRefetch();
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай устгалаа',
        type: 'success',
      });
    },
    onError(e) {
      console.log(e);
      setDeleteModal({
        ...deleteModal,
        state: false,
      });
      basketRefetch();
      handleSnackOpen({
        state: true,
        msg: 'Устгахад алдаа гарлаа.',
        type: 'error',
      });
    },
  });

  const handleDeleteOrder = () => {
    if (deleteModal?.id.length > 1)
      deleteOrder({
        variables: {
          _id: deleteModal.id,
        },
      });
    else console.log('delete order id is not found');
  };

  const handleDeleteOrderModal = (id) => {
    setDeleteModal({
      state: true,
      id: id,
    });
  };

  const handleModalState = (bool) => {
    setModalState(bool);
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

  const handleAddGoodsToBuy = (goods) => {
    let arrayGoods = [...listOfGoodsToBuy];
    arrayGoods.push(goods);
    setListOfGoodsToBuy(arrayGoods);
  };

  const handleRemoveGoodsToBuy = (goods) => {
    setListOfGoodsToBuy(listOfGoodsToBuy.filter((item) => item._id !== goods._id));
  };

  const handleAddAllProducts = () => {
    console.log(orderType);
    if (checked) {
      setListOfGoodsToBuy([]);
    } else {
      if (listOfUserBasket?.getListOfUserBasket.length > 0) {
        const mappedData = listOfUserBasket.getListOfUserBasket.map((item, index) => {
          return {
            _id: item?._id,
            name: item?.goodsName + ' ' + item?.goodsType,
            price: item?.price,
            amount: item?.amountkg,
            index: index,
          };
        });
        setListOfGoodsToBuy(mappedData);

        console.log('handle all goods pressed');
        console.log(mappedData);
      }
    }

    setChecked(!checked);
  };

  const calculator = () => {
    let amount = 0;

    listOfGoodsToBuy.forEach((element, index) => {
      amount = amount + element.price;
    });
    return amount;
  };

  const calculateDiscount = () => {
    let discount = 0;
    let discountLimit =
      account?.current?.status === 'paid' ? account?.current?.service?.meatAmount : 0;
    if (discountLimit < 0) {
      discountLimit = 0;
    }
    listOfGoodsToBuy.forEach((element, index) => {
      if (discountLimit - element?.amount > 0) {
        listOfGoodsToBuy[index].discount = element?.price * 0.15;
        discount += element?.price * 0.15;
        discountLimit -= element?.amount;
      } else if (discountLimit) {
        listOfGoodsToBuy[index].discount =
          (element?.price / element?.amount) * discountLimit * 0.15;
        discount += (element?.price / element?.amount) * discountLimit * 0.15;
        discountLimit = 0;
      }
    });

    return discount;
  };

  function moneyFormat(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + '₮';
  }

  const handleMultiOrderCreate = () => {
    if (listOfGoodsToBuy.length > 0) {
      if (!seeAddress) {
        setSeeAddress(true);
      } else {
        console.log(listOfGoodsToBuy);
        createMultiOrder({
          variables: {
            shippingType: orderType === 'Хүргүүлэх' ? 'toBeShipped' : 'userToCome',
            listOfGoods: listOfGoodsToBuy,
            ...addressData,
          },
        });
      }
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Та төлбөр хийх бараагаа сонгоно уу.',
        type: 'warning',
      });
    }
  };

  const handleAmountOfGoodsToBuy = (index, id, diff_price) => {
    let project = listOfGoodsToBuy;
    listOfGoodsToBuy.forEach((item, elixir) => {
      if (item.index === index) {
        project[elixir].price = diff_price;
      }
    });
    setListOfGoodsToBuy(project);
  };

  const handleOnchange = (item, amount, price) => {
    let testArr = [...listOfGoodsToBuy];
    if (listOfGoodsToBuy.length > 0) {
      let index = listOfGoodsToBuy?.findIndex((item2) => item._id === item2._id);
      if (index >= 0) {
        testArr[index].amount = amount;
        testArr[index].price = price;
      }
    }

    setListOfGoodsToBuy([...testArr]);
    setCount(count + 1);
  };

  return (
    <Container maxWidth={false} disableGutters style={{ padding: 0 }}>
      {/* Appbar */}
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <ToastifyBody />
      <Grid
        container
        direction={trigger ? 'column' : 'row-reverse'}
        className={classes.root}
      >
        {/* Backdrop for loading */}
        <Backdrop className={classes.backdrop} open={multiOrderLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
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
        {/* Modal Delete */}
        <Modal
          className={classes.modal}
          open={deleteModal.state}
          onClose={() => setDeleteModal({ ...deleteModal, state: false })}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteModal.state}>
            {deleteLoading ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.paper}>
                <Typography className={classes.title}>
                  Сагсан дахь бараагаа устгах
                </Typography>
                <Typography className={classes.description}>
                  Та сагсан дахь бараагаа устгахдаа итгэлтэй байна уу?
                </Typography>
                <div
                  style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}
                >
                  <Button
                    onClick={() => setDeleteModal({ ...deleteModal, state: false })}
                  >
                    Цуцлах
                  </Button>
                  <Button onClick={handleDeleteOrder}>Устгах</Button>
                </div>
              </div>
            )}
          </Fade>
        </Modal>
        {/* Modal */}
        <Modal
          className={classes.modal}
          open={modalState}
          onClose={() => handleModalState(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalState}>
            <div className={classes.paper}>
              <Container className={classes.paymentCalcModal}>
                <Typography className={classes.title}>
                  {contextText.payment.calculator.title}
                </Typography>
                <Typography className={classes.description}>
                  {contextText.payment.calculator.description}
                </Typography>
                {/* <CustomDropdown options={["Хүргүүлэх", "Очиж авах"]} onChange={setOrderType} /> */}
                <div style={{ paddingTop: 30, width: 1, height: 2 }} />
                {/* SErvice and Order */}
                <Container disableGutters className={classes.calcModalListContainer}>
                  {listOfGoodsToBuy.map((item, index) => {
                    return (
                      <div key={'goods' + index}>
                        <Container
                          disableGutters
                          className={classes.calcModalTextContainer}
                        >
                          <Typography className={classes.modalItemName}>
                            {item?.name}
                          </Typography>
                          <Typography className={classes.modalItemPrice}>
                            {'₮ ' + item?.price}
                          </Typography>
                        </Container>
                        <Divider className={classes.dividerModal} />
                      </div>
                    );
                  })}
                </Container>
                {/* Таны хэмнэлт */}
                <Container disableGutters className={classes.calcItemContainer}>
                  <span />
                </Container>
                {/* Amount */}
                <Container disableGutters className={classes.calcItemContainer}>
                  <Container disableGutters className={classes.calcTextContainer}>
                    <Typography className={classes.itemName}>
                      {'Нийт худалдан авах бараа'}
                    </Typography>
                    <Typography className={classes.itemDesc}>
                      {moneyFormat(calculator() - calculateDiscount())}
                    </Typography>
                    <Typography className={classes.itemName}>
                      {'Таны хөнгөлөлт'}
                    </Typography>
                    <Typography className={classes.itemDesc}>
                      {moneyFormat(calculateDiscount())}
                    </Typography>
                  </Container>
                </Container>
                {/* To pay */}
                <Button
                  onClick={() => {
                    handleMultiOrderCreate();
                  }}
                  className={classes.proceedToPay}
                >
                  {contextText.payment.toPay}
                </Button>
              </Container>
            </div>
          </Fade>
        </Modal>
        {/* Payment calculator */}
        <Grid
          item
          xs={trigger ? 11 : 3}
          style={{ display: phoneSize ? 'none' : 'block' }}
        >
          <Container className={classes.paymentCalcContainer}>
            <Typography className={classes.title}>
              {contextText.payment.calculator.title}
            </Typography>
            <Typography className={classes.description}>
              {contextText.payment.calculator.description}
            </Typography>
            {/* <CustomDropdown options={["Хүргүүлэх", "Очиж авах"]} onChange={setOrderType} /> */}
            <div style={{ paddingTop: 30, width: 1, height: 2 }} />
            {/* SErvice and Order */}
            <Container disableGutters className={classes.calcGoodsListContainer}>
              {listOfGoodsToBuy.map((item, index) => {
                return (
                  <Container
                    key={'goods' + index}
                    disableGutters
                    className={classes.calcTextContainer}
                  >
                    <Typography className={classes.itemName}>{item?.name}</Typography>
                    <Typography className={classes.itemDesc}>
                      {moneyFormat(item?.price)}
                    </Typography>
                    <Divider className={classes.divider} />
                  </Container>
                );
              })}
            </Container>
            {/* Amount */}
            <Container disableGutters className={classes.calcTextContainer}>
              <Typography className={classes.itemName}>{'Таны хэмнэлт'}</Typography>
              <Typography className={classes.itemDesc + ' ' + classes.itemDescGreen}>
                {moneyFormat(calculateDiscount())}
              </Typography>
            </Container>
            <Container disableGutters className={classes.calcItemContainer}>
              <Container disableGutters className={classes.calcTextContainer}>
                <Typography className={classes.itemName}>
                  {'Нийт худалдан авах бараа'}
                </Typography>
                <Typography className={classes.itemDesc}>
                  {moneyFormat(calculator() - calculateDiscount())}
                </Typography>
              </Container>
            </Container>
            {/* To pay */}
            <Button
              onClick={() => {
                if (listOfGoodsToBuy.length === 0) {
                  toastError('Авах бараагаа сонгоно уу');
                } else if (seeAddress) {
                  let {
                    city: city2,
                    district: district2,
                    address: address2,
                    email: email2,
                    phone: phone2,
                    fullName: fullName2,
                  } = addressData;
                  if (city2 && district2 && address2 && email2 && phone2 && fullName2)
                    handleMultiOrderCreate();
                  else {
                    toastError(
                      ` ${fullName2 ? '' : 'Нэр, '}${city2 ? '' : 'Хот, '}${
                        district2 ? '' : 'Дүүрэг/Сум, '
                      }${address2 ? '' : 'Дэлгэрэнгүй хаяг, '}${
                        email2 ? '' : 'И-Мэйл, '
                      }${phone2 ? '' : 'Утас, '}`.slice(
                        0,
                        ` ${fullName2 ? '' : 'Нэр, '}${city2 ? '' : 'Хот, '}${
                          district2 ? '' : 'Дүүрэг/Сум, '
                        }${address2 ? '' : 'Дэлгэрэнгүй хаяг, '}${
                          email2 ? '' : 'И-Мэйл, '
                        }${phone2 ? '' : 'Утас, '}`.length - 2
                      ) + ` ороогүй байна`
                    );
                  }
                } else setSeeAddress(true);
              }}
              className={classes.proceedToPay}
            >
              {contextText.payment.toPay}
            </Button>
          </Container>
        </Grid>
        {/* Payment method section */}
        <Grid item xs={trigger ? 12 : 9}>
          <div component='fieldset' style={{ maxWidth: '100%', height: '100%' }}>
            {seeAddress ? (
              <Address account={account} onChange={setAddressData} />
            ) : (
              <FormControl component='fieldset'>
                <Container className={classes.pmOptionsContainer}>
                  <PageAbout
                    title={'Cагс'}
                    marginLeft={phoneSize ? 10 : 50}
                    marginTop={0}
                    descWidth={'80%'}
                    desc={`Та сагсанд байгаа бараа бүтээгдэхүүнүүдээ бүгдийг нь 
                эсвэл хэсэгчлэн төлбөрөө төлж захиалга хийх боломжтой. `}
                  />
                  <CustomTableItem
                    stopHover
                    noPosition
                    marginTop={50}
                    marginLeft={phoneSize ? 0 : 35}
                    height={'50px'}
                    backgroundColor={'transparent'}
                    horizontalPadding={0}
                    textColor={colors.gray50}
                    items={
                      phoneSize
                        ? [
                            {
                              item: (
                                <Checkbox
                                  checked={checked}
                                  onChange={() => handleAddAllProducts()}
                                />
                              ),
                              width: 50,
                            },
                            { item: 'Бүгдийг сонгох', width: '150px' },
                          ]
                        : [
                            {
                              item: (
                                <Checkbox
                                  checked={checked}
                                  onChange={() => handleAddAllProducts()}
                                />
                              ),
                              width: 100,
                            },
                            { item: 'Бүтээгдэхүүн', width: '200px' },
                            { item: 'Хэмжээ', width: '200px' },
                            { item: 'Үнэ', width: '190px' },
                            { item: 'Нийт', width: '90px' },
                          ]
                    }
                  />
                  {listLoading ? (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : listOfUserBasket.getListOfUserBasket.length < 1 ? (
                    <Typography style={{ paddingLeft: phoneSize ? 10 : 150 }}>
                      Илэрц олдсонгүй
                    </Typography>
                  ) : (
                    listOfUserBasket.getListOfUserBasket.map((item, index) => (
                      <FormGroup key={'table core item' + index}>
                        <ProductItem
                          index={index}
                          data={item}
                          checked={checked}
                          phone={phoneSize}
                          tablet={tabletSize}
                          addGoodsFunc={handleAddGoodsToBuy}
                          changeAmount={handleAmountOfGoodsToBuy}
                          removeGoodsFunc={handleRemoveGoodsToBuy}
                          handleSnackOpen={handleSnackOpen}
                          handleDeleteOrder={handleDeleteOrderModal}
                          userMeatAmount={
                            account?.current?.status === 'paid'
                              ? account?.current?.service?.meatAmount
                              : 99999
                          }
                          marketMeatAmount={item?.goods?.total}
                          onChange={handleOnchange}
                        />
                      </FormGroup>
                    ))
                  )}
                </Container>
              </FormControl>
            )}
          </div>
          {phoneSize && (
            <div className={classes.stickyButtonContainer}>
              <Button
                className={classes.stickyButton}
                onClick={() => {
                  if (listOfGoodsToBuy.length === 0) {
                    toastError('Авах бараагаа сонгоно уу');
                  } else if (seeAddress) {
                    let {
                      city: city2,
                      district: district2,
                      address: address2,
                      email: email2,
                      phone: phone2,
                      fullName: fullName2,
                    } = addressData;
                    if (city2 && district2 && address2 && email2 && phone2 && fullName2)
                      handleModalState(true);
                    else {
                      toastError(
                        ` ${fullName2 ? '' : 'Нэр, '}${city2 ? '' : 'Хот, '}${
                          district2 ? '' : 'Дүүрэг/Сум, '
                        }${address2 ? '' : 'Дэлгэрэнгүй хаяг, '}${
                          email2 ? '' : 'И-Мэйл, '
                        }${phone2 ? '' : 'Утас, '}`.slice(
                          0,
                          ` ${fullName2 ? '' : 'Нэр, '}${city2 ? '' : 'Хот, '}${
                            district2 ? '' : 'Дүүрэг/Сум, '
                          }${address2 ? '' : 'Дэлгэрэнгүй хаяг, '}${
                            email2 ? '' : 'И-Мэйл, '
                          }${phone2 ? '' : 'Утас, '}`.length - 2
                        ) + ` ороогүй байна`
                      );
                    }
                  } else {
                    setSeeAddress(true);
                  }
                }}
              >
                 Төлөх
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

const ProductItem = (props) => {
  const item = props.data;
  const classes = useStyles();
  const [meatAmount, setMeatAmount] = useState(item.amountkg);
  const [checked, setChecked] = useState(false);
  const phone = props.phone;

  useEffect(() => {
    if (props.onChange) {
      if (item.orderedFrom === 'marketeer' || item?.marketeerId || item?.marketeer) {
        props.onChange(item, meatAmount, item?.goods?.marketeerPrice * meatAmount);
      } else {
        props.onChange(item, meatAmount, item?.goods?.price * meatAmount);
      }
    }
    // eslint-disable-next-line
  }, [meatAmount]);

  let dataToSend = () => ({
    _id: item._id,
    price:
      item?.orderedFrom === 'marketeer' || item?.marketeerId
        ? item?.goods?.marketeerPrice * meatAmount
        : item?.goods?.price * meatAmount,
    name: item.goodsName + ' ' + item.goodsType,
    index: props.index,
    amount: meatAmount,
  });

  const ma = useCallback(() => {
    if (typeof meatAmount === 'string') {
      return meatAmount.length === 0 ? 0 : parseInt(meatAmount);
    } else {
      return parseInt(meatAmount);
    }
  }, [meatAmount]);

  const handleAddMeat = (num, type) => {
    const marketMeat = parseInt(props.marketMeatAmount);

    if (type === 'field') {
      if (num <= marketMeat) {
        console.log('meatAmount and meat is less than or equal to num');
        setMeatAmount(num);
      }
    } else {
      if (meatAmount < marketMeat) {
        console.log('meatAmount is less than meat and market meat');
        setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num);
      } else {
        props.handleSnackOpen({
          state: true,
          type: 'warning',
          msg: 'Махны нөөц таны худалдан авалтанд хүрэхгүй байна.',
        });
      }
    }
  };

  const addGoods = (item) => {
    props?.addGoodsFunc(item);
  };

  const removeGoods = (item) => {
    props?.removeGoodsFunc(item);
  };

  const handleCheckState = (item) => {
    if (checked === false) {
      addGoods(item);
    } else {
      removeGoods(item);
    }
    setChecked(!checked);
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  useEffect(() => {
    if (checked === true) {
      props?.changeAmount(
        props?.index,
        item?._id,
        item?.orderedFrom === 'marketeer' || item?.marketeerId
          ? parseInt(item?.goods?.marketeerPrice) * ma()
          : parseInt(item?.goods.price) * ma()
      );
    }
  }, [meatAmount, checked, props, item, ma]);

  return (
    <div className={classes.productContainer}>
      <CustomTableItem
        horizontalPadding={phone ? 0 : 20}
        marginLeft={phone ? 0 : 15}
        items={[
          {
            item: (
              <Checkbox
                checked={checked}
                color='primary'
                onChange={() => handleCheckState(dataToSend())}
              />
            ),
            width: phone ? 50 : 100,
          },
          {
            item: phone ? (
              <ProductIconPhone
                goodsName={item.goodsName}
                goodsType={item.goodsType}
                shopName={item?.marketeer?.name}
                amount={item.amountkg}
                price={
                  item?.orderedFrom === 'marketeer' || item?.marketeerId
                    ? parseInt(item?.goods?.marketeerPrice)
                    : parseInt(item?.goods?.price)
                }
                isUnit={item?.goods?.isUnit}
                type={item.goodsName === 'Үхэр' ? 'beef' : 'sheep'}
              />
            ) : (
              <ProductIcon
                goodsName={item.goodsName}
                goodsType={item.goodsType}
                marketeerName={item?.marketeer?.name}
                handleDelete={() => props.handleDeleteOrder(item?._id)}
                type={item.goodsName === 'Үхэр' ? 'beef' : 'sheep'}
              />
            ),
            width: phone ? '100%' : '200px',
          },
          !props.phone && {
            item: (
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
                <Button className={classes.groupButton} onClick={() => handleAddMeat(1)}>
                  +
                </Button>
              </ButtonGroup>
            ),
            width: '200px',
          },
          !props.phone && {
            item: (
              <Price
                data={{
                  status: item?.paid,
                  value:
                    item?.orderedFrom === 'marketeer' || item?.marketeerId
                      ? parseInt(item?.goods?.marketeerPrice)
                      : parseInt(item?.goods?.price),
                }}
              />
            ),
            width: '190px',
          },
          !props.phone && {
            item: (
              <Price
                data={{
                  status: item?.paid,
                  value:
                    item?.orderedFrom === 'marketeer' || item?.marketeerId
                      ? parseInt(item?.goods?.marketeerPrice) * ma()
                      : parseInt(item?.goods?.price) * ma(),
                }}
              />
            ),
            width: '150px',
          },
        ]}
        height={'100px'}
        stopHover
      />
      {!props.phone && <Divider className={classes.divider} />}
    </div>
  );
};

const ProductIcon = (props) => {
  const classes = useStyles(props.paid);
  const typeChooser = () => {
    let imgsrc;
    if (props.type === 'beef') {
      if (props.paid) imgsrc = beef_blue;
      if (!props.paid) imgsrc = beef_red;
    }
    if (props.type === 'sheep') {
      if (props.paid) imgsrc = sheep_blue;
      if (!props.paid) imgsrc = sheep_red;
    }
    return imgsrc;
  };

  return (
    <Container disableGutters>
      <div className={classes.productFlexContainer}>
        <div>
          <div className={classes.productImgContainer}>
            <img src={typeChooser()} alt={'product'} className={classes.meatIcon} />
          </div>
          {props?.marketeerName && (
            <Typography className={classes.shopName}>
              {stringEllipser(props?.marketeerName, 12)}
            </Typography>
          )}
        </div>
        <div className={classes.productGoodsInfoContainer}>
          <p className={classes.productItemGoodsName}>{props.goodsName}</p>
          <p className={classes.productItemGoodsType}>{props.goodsType}</p>
          <Button onClick={props.handleDelete} className={classes.deleteButton}>
            <Typography className={classes.deleteText}>Устгах</Typography>
          </Button>
        </div>
      </div>
    </Container>
  );
};

const ProductIconPhone = (props) => {
  const classes = useStyles(props.paid);
  const typeChooser = () => {
    let imgsrc;
    if (props.type === 'beef') {
      if (props.paid) imgsrc = beef_blue;
      if (!props.paid) imgsrc = beef_red;
    }
    if (props.type === 'sheep') {
      if (props.paid) imgsrc = sheep_blue;
      if (!props.paid) imgsrc = sheep_red;
    }
    return imgsrc;
  };

  return (
    <Container disableGutters>
      <div className={classes.productFlexContainer}>
        <div>
          <div className={classes.productImgContainerPhone}>
            <img src={typeChooser()} alt={'product'} className={classes.meatIconPhone} />
          </div>
          <Typography className={classes.shopName}>
            {stringEllipser(props?.marketeerName, 12)}
          </Typography>
        </div>
        <div className={classes.productGoodsInfoContainer}>
          <p className={classes.productItemGoodsNamePhone}>
            {stringEllipser(props.goodsName + ' ' + props.goodsType, 50)}
          </p>
          <p className={classes.productItemGoodsTypePhone}>
            {props?.shopName
              ? props?.shopName +
                ` ‧ ${props.amount} ${props?.isUnit === true ? ' ш' : ' кг'}`
              : `${props.amount} ${props?.isUnit === true ? ' ш' : ' кг'}`}
          </p>
          <p className={classes.productItemGoodsTypePhone}>{`₮ ${props?.price}`}</p>
        </div>
      </div>
    </Container>
  );
};

function Address({ account, onChange }) {
  const [address, setAddress] = useState();
  const { data: locations } = useQuery(LOCATION_INFO);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState('Улаанбаатар');
  const [unit, setUnit] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    if (account) {
      setUsername(
        account?.firstName ? `${account?.lastName ?? ''} ${account?.firstName}` : ''
      );
      setEmail(
        account?.email ? (account?.email?.startsWith('^') ? '' : account?.email) : ''
      );
      setPhone(account?.phone);
      setAddress(account?.address);
      setCity(account?.city ?? 'Улаанбаатар');
      setDistrict(account?.district);
      setUnit(account?.unit);
    }
  }, [account]);
  useEffect(() => {
    if (onChange)
      onChange({
        unit: unit,
        city: city,
        district: district,
        address: address,
        email: email,
        phone: phone,
        fullName: username,
      });
  }, [city, district, email, phone, username, unit, address, onChange]);
  const classes = useStyles();

  return (
    <div className={classes.addressContainer}>
      <div style={{ width: '100%' }}>
        <PageAbout
          title='Хүргүүлэх Хаяг'
          descWidth={'100%'}
          desc='Та холбогдох мэдээллүүд болон захиалга хүргүүлэх хаягаа бичиж оруулна уу.'
          marginTop={0}
          marginBottom={16}
          descMaxWidth={'505px'}
        />
      </div>
      <div className={classes.inputContainer}>
        <h1 className={classes.inputContainerTitle}>Хүлээн авагчийн нэр</h1>
        <InputCore acceptValue={username} onChange={setUsername} placeholder='Овог Нэр' />
      </div>
      <div className={classes.inputContainer}>
        <h1 className={classes.inputContainerTitle}>И-Мэйл хаяг</h1>
        <InputCore acceptValue={email} onChange={setEmail} placeholder='И-Мэйл хаяг' />
      </div>
      <div className={classes.inputContainer}>
        <h1 className={classes.inputContainerTitle}>Холбогдох дугаар</h1>
        <InputCore
          acceptValue={phone}
          onChange={setPhone}
          placeholder='Холбогдох дугаар'
        />
      </div>
      {locations && (
        <>
          <div className={classes.inputContainerFull}>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Хот / Аймаг</h1>
              <DropdownCore
                onChange={(e) => {
                  setCity(e);
                }}
                defaultValue={city}
                options={locations.locationInfo[0].cityList}
              />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Дүүрэг / Сум</h1>
              <DropdownCore
                defaultValue={account?.district}
                onChange={setDistrict}
                options={
                  locations.locationInfo[0].districtList[
                    locations.locationInfo[0].cityList.findIndex(
                      (item) => item === city
                    ) === -1
                      ? 0
                      : locations.locationInfo[0].cityList.findIndex(
                          (item) => item === city
                        )
                  ]
                }
              />
            </div>
          </div>
          {/* <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Хороо / Баг</h1>
            <DropdownCore
              defaultValue={account?.unit}
              onChange={setUnit}
              options={
                locations.locationInfo[0].unitList[
                  locations.locationInfo[0].districtList.findIndex((item) => item === district) === -1
                    ? 0
                    : locations.locationInfo[0].districtList.findIndex((item) => item === district)
                ]
              }
            />
          </div> */}
        </>
      )}
      <div
        className={classes.inputContainer + ' ' + classes.inputcontainerData}
        style={{ width: '100%' }}
      >
        <h1 className={classes.inputContainerTitle}>Дэлгэрэнгүй хаяг</h1>
        <InputCore
          acceptValue={address}
          onChange={setAddress}
          placeholder='Хороолол, Байр, Орц г.м'
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
    textAlign: 'left',
    padding: 0,
    height: '100%',
  },
  buttonGroup: {
    color: 'lightgray',
    borderColor: 'black',
    maxWidth: 140,
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
  productContainer: {
    marginBottom: 20,
  },
  backdrop: {
    zIndex: 1200 + 1,
    color: '#fff',
  },
  shopName: {
    textAlign: 'center',
    maxWidth: 90,
    fontWeight: '500',
    fontSize: 14,
    paddingTop: 2,
    backgroundColor: '#FAFAFA',
    borderRadius: 7,
  },
  pmOptionsContainer: {
    textAlign: 'left',
    minHeight: '100vh',
    overflowX: (props) => (props.phone ? 'visible' : 'auto'),
    overflowY: (props) => (props.phone ? 'visible' : 'hidden'),
  },
  stickyButtonContainer: {
    position: 'sticky',
    zIndex: 100,
    bottom: 0,
    height: 50,
    width: '100%',
  },
  stickyButton: {
    backgroundColor: '#6A67D3',
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: '0px',
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue',
    },
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
    backgroundColor: '#F7F7F7',
    borderRadius: 11,
    padding: 20,
    paddingBottom: 0,
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
  itemDescGreen: {
    color: '#2bb63a',
  },
  modalItemPrice: {
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
  modalItemName: {
    color: colors.black,
    fontFamily: 'SF Pro Display',
    fontSize: 17,
    fontWeight: '600',
    paddingRight: 15,
  },
  calcItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  calcTextContainer: {
    paddingBottom: 15,
  },
  calcModalTextContainer: {
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'baseline',
  },
  divider: {
    marginBottom: 15,
    marginLeft: 100,
  },
  dividerModal: {
    marginBottom: 15,
  },
  calcGoodsListContainer: {
    maxHeight: 370,
    overflow: 'auto',
  },
  calcModalListContainer: {
    maxHeight: 200,
    overflow: 'auto',
  },
  paymentCalcContainer: {
    marginTop: -50,
    paddingTop: 50,
    marginLeft: (props) => (props.tablet || props.trigger ? 50 : 0),
    marginBottom: 50,
    backgroundColor: '#F7F7F7',
    width: '95%',
    position: 'relative',
    zIndex: 2,
  },
  paymentCalcModal: {
    backgroundColor: '#F7F7F7',
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
  productFlexContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productImgContainer: {
    borderRadius: 7,
    padding: 25,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: (props) =>
      props.paid ? 'rgba(106, 103, 211, 0.05)' : 'rgba(249, 90, 72, 0.05)',
  },
  productImgContainerPhone: {
    borderRadius: 17,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: (props) =>
      props.paid ? 'rgba(106, 103, 211, 0.05)' : 'rgba(249, 90, 72, 0.05)',
  },
  meatIcon: {
    height: 40,
    width: 40,
  },
  meatIconPhone: {
    height: 30,
    width: 30,
  },
  productItemGoodsName: {
    fontFamily: 'SF Pro Display',
    fontSize: 17,
  },
  productItemGoodsNamePhone: {
    fontFamily: 'SF Pro Display',
    fontSize: 14,
  },
  productItemGoodsType: {
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: 'red',
    fontSize: 14,
    marginBottom: 0,
  },
  productItemGoodsTypePhone: {
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: 'gray',
    fontSize: 14,
    marginBottom: 0,
  },
  deleteButton: {
    color: colors.gray,
    padding: '0px !important',
    margin: 0,
    minWidth: '40px',
  },
  deleteText: {
    fontFamily: 'SF Pro Display',
    fontSize: '14px',
    textTransform: 'none',
    textAlign: 'left',
  },
  addressContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    gap: 50,
    padding: '0 5%',
    maxWidth: '874px',
  },
  inputContainerTitle: {
    ...CSS_HELPER.initializeFont,
    marginBottom: 17,
    // fontSize: "14px !important",
  },
  inputContainer: {
    width: 368,
    marginBottom: 36,
  },
  inputContainerFull: {
    width: '100%',
    display: 'flex',
    gap: 50,
    flexWrap: 'wrap',
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
