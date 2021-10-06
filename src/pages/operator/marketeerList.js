import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/core/optionsCore';
import CustomTable from '../../components/operator/marketeerList/customTable';
import Shop from '../../components/adminComponents/shop.js';
import star from '../../assets/icons/star.svg';
import starWhite from '../../assets/icons/starWhite.svg';
import TheContext from '../../context/context';
import addBox from '../../assets/icons/addBox.svg';
import pen from '../../assets/icons/pen.svg';
import trash from '../../assets/icons/trash.svg';
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import {
  Backdrop,
  Fade,
  Modal,
  Container,
  Snackbar,
  TextField,
  Typography,
  Button,
  Popper,
  Paper,
  Divider,
  Slide,
} from '@mui/material';
import { Alert } from '@mui/lab';
import colors from '../../constants/colors';
import {
  GET_LIST_OF_MARKETEERS,
  CREATE_MARKETEER,
  UPDATE_MARKETEER,
  DELETE_MARKETEER,
} from '../../graphql/gql/operator/marketeerList';
import CircularProgressLoader from '../../components/loader/circularProgress';
import timeIcon from '../../assets/icons/time2.svg';

// Marketeer uudig uusgeh, udirdah
export default function OperatorMarketeerOrderList() {
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook.account;
  const classes = useStyles();
  const [menu, setMenu] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [moreInfoModal, setMoreInfoModal] = useState(false);
  const [updateFormModal, setUpdateFormModal] = useState(false);
  const [deleteFormModal, setDeleteFormModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [popper, setPopper] = useState(false);

  const [formData, setFormData] = useState({});
  let form = useRef(null);

  const {
    data: marketeerList,
    loading: marketeerListLoading,
    refetch,
  } = useQuery(GET_LIST_OF_MARKETEERS, {
    variables: {
      status:
        menu === 0 ? 'all' : menu === 1 ? 'regular' : menu === 2 ? 'special' : 'archived',
    },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error?.message);
    },
  });

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const handlePopper = (event, item) => {
    setFormData(item);
    setAnchorEl(event.currentTarget);
    setPopper(!popper);
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

  const formikValidator = (values, update) => {
    // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    const errors = {};
    if (!values.name) {
      errors.name = 'Заавал оруулна';
    } else if (values.name.length < 2) {
      errors.name = 'Хамгийн багадаа 2 үсэг орсон байна';
    }
    if (!values.username) {
      errors.username = 'Заавал оруулна';
    } else if (values.username.length < 2) {
      errors.username = 'Хамгийн багадаа 2 үсэг орсон байна';
    }
    if (!update) {
      if (!values.password) {
        errors.password = 'Заавал оруулна';
      } else if (values.password.length < 8) {
        errors.password = 'Хамгийн багадаа 8 үсэг орсон байна';
      }
    }
    if (!values.phone) {
      errors.phone = 'Заавал оруулна';
    } else if (values.phone.toString().length !== 8) {
      errors.phone = 'Дугаарын орон буруу';
    }
    if (!values.address) {
      errors.address = 'Заавал оруулна';
    } else if (values.address.length < 10) {
      errors.address = 'Хамгийн багадаа 10 үсэг орсон байна';
    }
    if (!values.openHours) {
      errors.openHours = 'Заавал оруулна';
    } else if (values.openHours.length < 1) {
      errors.openHours = 'Заавал сонгоно';
    }
    if (!values.closeHours) {
      errors.closeHours = 'Заавал оруулна';
    } else if (values.closeHours.length < 1) {
      errors.closeHours = 'Заавал сонгоно';
    }
    if (!values.description) {
      errors.description = 'Заавал оруулна';
    }
    return errors;
  };

  const [submitCreateMarketeer, { loading: createLoading }] = useMutation(
    CREATE_MARKETEER,
    {
      onCompleted(data) {
        console.log(data);
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай үүсгэлээ',
          type: 'success',
        });
        refetch();
      },
      onError(error) {
        console.log(error);
        handleSnackOpen({
          state: true,
          msg: error.message,
          type: 'error',
        });
      },
    }
  );

  const [submitUpdateMarketeer, { loading: updateLoading }] = useMutation(
    UPDATE_MARKETEER,
    {
      onCompleted(data) {
        console.log(data);
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай шинэчлэлээ',
          severity: 'success',
        });
        refetch();
      },
      onError(error) {
        console.log(error);
        handleSnackOpen({
          state: true,
          msg: error.message,
          severity: 'error',
        });
      },
    }
  );

  const [submitDeleteMarketeer, { loading: deleteLoading }] = useMutation(
    DELETE_MARKETEER,
    {
      onCompleted(data) {
        console.log(data);
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай устгалаа',
          severity: 'success',
        });
        refetch();
      },
      onError(error) {
        console.log(error);
        handleSnackOpen({
          state: true,
          msg: error.message,
          severity: 'error',
        });
      },
    }
  );

  const handleFormSubmit = (values, setSubmitting) => {
    console.log(values);
    setSubmitting(false);
    setModalState(false);
    submitCreateMarketeer({
      variables: {
        username: values.username,
        password: values.password,
        operatorId: account._id,
        name: values.name,
        description: values.description,
        phone: values.phone.toString(),
        openHours: values.openHours + '-' + values.closeHours + 'цаг',
        address: values.address,
        shipping: values.shipping,
      },
    });
  };

  const handleFormUpdate = (values, setSubmitting) => {
    console.log(values);
    setSubmitting(false);
    setUpdateFormModal(false);
    submitUpdateMarketeer({
      variables: {
        _id: formData?._id,
        username: values.username,
        password: values.password,
        operatorId: account._id,
        name: values.name,
        description: values.description,
        phone: values.phone.toString(),
        openHours: values.openHours + '-' + values.closeHours + 'цаг',
        address: values.address,
        shipping: values.shipping,
      },
    });
  };

  const handleShopStatusUpdate = (status) => {
    submitUpdateMarketeer({
      variables: {
        _id: formData?._id,
        status: status,
      },
    });
    setPopper(false);
  };

  const handleFormDelete = () => {
    setDeleteFormModal(false);
    submitDeleteMarketeer({
      variables: {
        _id: formData?._id,
      },
    });
  };

  const handleSingleFormUpdate = (item) => {
    setFormData(item);
    setTimeout(() => {
      setUpdateFormModal(true);
    }, 100);
  };

  const handleSingleShopDelete = (item) => {
    setFormData(item);
    setTimeout(() => {
      setDeleteFormModal(true);
    }, 100);
  };

  const handleMoreInfoModal = (item, bool) => {
    setFormData(item);
    setTimeout(() => {
      setMoreInfoModal(bool);
    }, 100);
  };

  return (
    <>
      <AppBar />
      {/* Body */}
      <Container className={classes.root}>
        {/* Table item popper */}
        <Popper
          transition
          open={popper}
          anchorEl={anchorEl}
          placement={'bottom-end'}
          className={classes.popper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              {menu === 3 ? (
                <>
                  <Paper className={classes.popperPaper}>
                    <Typography
                      onClick={() => handleShopStatusUpdate('regular')}
                      className={classes.popperOption}
                    >
                      Энгийн болгох
                    </Typography>
                    <Typography
                      onClick={() => handleShopStatusUpdate('special')}
                      className={classes.popperOption}
                    >
                      Онцлох
                    </Typography>
                  </Paper>
                </>
              ) : (
                <Paper className={classes.popperPaper}>
                  {formData.status === 'regular' ? (
                    <Typography
                      onClick={() => handleShopStatusUpdate('special')}
                      className={classes.popperOption}
                    >
                      Онцлох
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() => handleShopStatusUpdate('regular')}
                      className={classes.popperOption}
                    >
                      Энгийн болгох
                    </Typography>
                  )}
                  {formData.status === 'archived' ? (
                    <Typography
                      onClick={() => handleShopStatusUpdate('regular')}
                      className={classes.popperOption}
                    >
                      Энгийн болгох
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() => handleShopStatusUpdate('archived')}
                      className={classes.popperOption}
                    >
                      Архивлах
                    </Typography>
                  )}
                </Paper>
              )}
            </Fade>
          )}
        </Popper>
        {/* Snackbar notification */}
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
        {/* Backdrop loading */}
        <Backdrop
          className={classes.backdrop}
          open={createLoading || updateLoading || deleteLoading}
        >
          <CircularProgressLoader />
        </Backdrop>
        {/* Create shop or edit shop */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={modalState}
          onClose={() => setModalState(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalState}>
            <div className={classes.paper}>
              <PageAbout
                title={contextText.operator.marketeerList.title}
                desc={contextText.operator.marketeerList.marketeerAddDesc}
                marginLeft={20}
                marginTop={20}
              />
              <Formik
                innerRef={form}
                className={classes.formik}
                initialValues={{
                  name: '',
                  username: '',
                  password: '',
                  phone: '',
                  address: '',
                  shipping: '',
                  openHours: '08:30',
                  closeHours: '22:00',
                  description: '',
                }}
                validate={(values) => formikValidator(values)}
                onSubmit={(values, { setSubmitting }) =>
                  handleFormSubmit(values, setSubmitting)
                }
              >
                {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.formBody}>
                      {/* Shop name and phone */}
                      <div className={classes.textFieldRow}>
                        {/* name */}
                        <div style={{ width: '50%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.name}
                          </Typography>
                          <TextField
                            name={'name'}
                            label={contextText.operator.marketeerList.form.name}
                            variant={'outlined'}
                            type={'text'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'Сансар супермаркет'}
                            className={classes.textField}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                            value={values.name}
                          />
                        </div>
                        {/* phone */}
                        <div style={{ width: '50%' }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.phone}
                          </Typography>
                          <TextField
                            name={'phone'}
                            label={contextText.operator.marketeerList.form.phone}
                            variant={'outlined'}
                            type={'number'}
                            placeholder={'8866****'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.phone ? true : false}
                            helperText={errors.phone}
                            value={values.phone}
                          />
                        </div>
                      </div>
                      {/* Operator username and password */}
                      <div className={classes.textFieldRow}>
                        {/* username */}
                        <div style={{ width: '50%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.username}
                          </Typography>
                          <TextField
                            name={'username'}
                            label={contextText.operator.marketeerList.form.username}
                            variant={'outlined'}
                            type={'text'}
                            placeholder={'sansarShopOperator'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            value={values.username}
                          />
                        </div>
                        {/* password */}
                        <div style={{ width: '50%' }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.password}
                          </Typography>
                          <TextField
                            name={'password'}
                            label={contextText.operator.marketeerList.form.password}
                            variant={'outlined'}
                            type={'password'}
                            placeholder={'P@ssW0rDz_s@Ns@R'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            value={values.password}
                          />
                        </div>
                      </div>
                      {/* Address */}
                      <div style={{ width: '100%' }}>
                        <Typography className={classes.label}>
                          {contextText.operator.marketeerList.form.address}
                        </Typography>
                        <TextField
                          name={'address'}
                          label={contextText.operator.marketeerList.form.address}
                          variant={'outlined'}
                          type={'text'}
                          placeholder={'БЗД, Сансарын үйлчилгээний төвийн баруун...'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={3}
                          className={classes.textField}
                          error={errors.address ? true : false}
                          helperText={errors.address}
                          value={values.address}
                        />
                      </div>
                      {/* Shop description */}
                      <div style={{ width: '100%' }}>
                        <Typography className={classes.label}>
                          {contextText.operator.marketeerList.form.description}
                        </Typography>
                        <TextField
                          name={'description'}
                          label={contextText.operator.marketeerList.form.description}
                          variant={'outlined'}
                          type={'text'}
                          placeholder={
                            '“Сансар” сүлжээ дэлгүүр нь 2013 оноос үйлчлүүлэгчийн тав тухыг...'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={3}
                          className={classes.textField}
                          error={errors.description ? true : false}
                          helperText={errors.description}
                          value={values.description}
                        />
                      </div>
                      {/* Shipping and OpenHours */}
                      <div className={classes.textFieldRow}>
                        {/* Shipping */}
                        <div style={{ width: '50%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.shipping}
                          </Typography>
                          <TextField
                            name={'shipping'}
                            label={contextText.operator.marketeerList.form.shipping}
                            variant={'outlined'}
                            type={'text'}
                            placeholder={'Хотын төвөөр хүргэнэ'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.shipping ? true : false}
                            helperText={errors.shipping}
                            value={values.shipping}
                          />
                        </div>
                        {/* Openhours */}
                        <div style={{ width: '50%' }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.openHours}
                          </Typography>
                          <div className={classes.textFieldRow}>
                            {/* Openhours */}
                            <TextField
                              style={{ marginRight: 20 }}
                              name={'openHours'}
                              variant={'outlined'}
                              type={'time'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.textField}
                              error={errors.openHours ? true : false}
                              helperText={errors.openHours}
                              value={values.openHours}
                            />
                            {/* Closehours */}
                            <TextField
                              name={'closeHours'}
                              variant={'outlined'}
                              type={'time'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.textField}
                              error={errors.closeHours ? true : false}
                              helperText={errors.closeHours}
                              value={values.closeHours}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.modalButtonContainer}>
                      <Button
                        type={'button'}
                        onClick={() => setModalState(false)}
                        className={classes.cancelButton}
                      >
                        Цуцлах
                      </Button>
                      <Button type='submit' className={classes.submitButton}>
                        Хадгалах
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Fade>
        </Modal>
        {/* Update the shop */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={updateFormModal}
          onClose={() => setUpdateFormModal(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={updateFormModal}>
            <div className={classes.paper}>
              <PageAbout
                title={contextText.operator.marketeerList.marketeerUpdateTitle}
                desc={contextText.operator.marketeerList.marketeerUpdateDesc}
                marginLeft={20}
                marginTop={20}
              />
              {/* Update method Formik */}
              <Formik
                innerRef={form}
                className={classes.formik}
                initialValues={{
                  name: formData?.name,
                  username: formData?.username,
                  phone: formData?.phone,
                  address: formData?.address,
                  shipping: formData?.shipping,
                  openHours: formData?.openHours?.substring(0, 5),
                  closeHours: formData?.openHours?.substring(6, 11),
                  description: formData?.description,
                }}
                validate={(values) => formikValidator(values, true)}
                onSubmit={(values, { setSubmitting }) =>
                  handleFormUpdate(values, setSubmitting)
                }
              >
                {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.formBody}>
                      {/* Shop name and phone */}
                      <div className={classes.textFieldRow}>
                        {/* name */}
                        <div style={{ width: '50%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.name}
                          </Typography>
                          <TextField
                            name={'name'}
                            label={contextText.operator.marketeerList.form.name}
                            variant={'outlined'}
                            type={'text'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'Сансар супермаркет'}
                            className={classes.textField}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                            value={values.name}
                          />
                        </div>
                        {/* phone */}
                        <div style={{ width: '50%' }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.phone}
                          </Typography>
                          <TextField
                            name={'phone'}
                            label={contextText.operator.marketeerList.form.phone}
                            variant={'outlined'}
                            type={'number'}
                            placeholder={'8866****'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.phone ? true : false}
                            helperText={errors.phone}
                            value={values.phone}
                          />
                        </div>
                      </div>
                      {/* Operator username and password */}
                      <div className={classes.textFieldRow}>
                        {/* username */}
                        <div style={{ width: '100%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.username}
                          </Typography>
                          <TextField
                            name={'username'}
                            label={contextText.operator.marketeerList.form.username}
                            variant={'outlined'}
                            type={'text'}
                            placeholder={'sansarShopOperator'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            value={values.username}
                          />
                        </div>
                      </div>
                      {/* Address */}
                      <div style={{ width: '100%' }}>
                        <Typography className={classes.label}>
                          {contextText.operator.marketeerList.form.address}
                        </Typography>
                        <TextField
                          name={'address'}
                          label={contextText.operator.marketeerList.form.address}
                          variant={'outlined'}
                          type={'text'}
                          placeholder={'БЗД, Сансарын үйлчилгээний төвийн баруун...'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={3}
                          className={classes.textField}
                          error={errors.address ? true : false}
                          helperText={errors.address}
                          value={values.address}
                        />
                      </div>
                      {/* Shop description */}
                      <div style={{ width: '100%' }}>
                        <Typography className={classes.label}>
                          {contextText.operator.marketeerList.form.description}
                        </Typography>
                        <TextField
                          name={'description'}
                          label={contextText.operator.marketeerList.form.description}
                          variant={'outlined'}
                          type={'text'}
                          placeholder={
                            '“Сансар” сүлжээ дэлгүүр нь 2013 оноос үйлчлүүлэгчийн тав тухыг...'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={3}
                          className={classes.textField}
                          error={errors.description ? true : false}
                          helperText={errors.description}
                          value={values.description}
                        />
                      </div>
                      {/* Shipping and OpenHours */}
                      <div className={classes.textFieldRow}>
                        {/* Shipping */}
                        <div style={{ width: '50%', paddingRight: 15 }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.shipping}
                          </Typography>
                          <TextField
                            name={'shipping'}
                            label={contextText.operator.marketeerList.form.shipping}
                            variant={'outlined'}
                            type={'text'}
                            placeholder={'Хотын төвөөр хүргэнэ'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                            error={errors.shipping ? true : false}
                            helperText={errors.shipping}
                            value={values.shipping}
                          />
                        </div>
                        {/* Openhours */}
                        <div style={{ width: '50%' }}>
                          <Typography className={classes.label}>
                            {contextText.operator.marketeerList.form.openHours}
                          </Typography>
                          <div className={classes.textFieldRow}>
                            {/* Openhours */}
                            <TextField
                              style={{ marginRight: 20 }}
                              name={'openHours'}
                              variant={'outlined'}
                              type={'time'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.textField}
                              error={errors.openHours ? true : false}
                              helperText={errors.openHours}
                              value={values.openHours}
                            />
                            {/* Closehours */}
                            <TextField
                              name={'closeHours'}
                              variant={'outlined'}
                              type={'time'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.textField}
                              error={errors.closeHours ? true : false}
                              helperText={errors.closeHours}
                              value={values.closeHours}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.modalButtonContainer}>
                      <Button
                        type={'button'}
                        onClick={() => setUpdateFormModal(false)}
                        className={classes.cancelButton}
                      >
                        Цуцлах
                      </Button>
                      <Button type='submit' className={classes.submitButton}>
                        Хадгалах
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Fade>
        </Modal>
        {/* Delete shop */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={deleteFormModal}
          onClose={() => setDeleteFormModal(false)}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={deleteFormModal}>
            <div className={classes.paper}>
              <PageAbout
                title={'Та устгахдаа итгэлтэй байна уу?'}
                desc={'Та устгах үйлдэл хийснээр дахин сэргээх боломжгүйг анхаарна уу.'}
                marginLeft={20}
                marginTop={20}
                marginBottom={40}
              />
              <div className={classes.modalButtonContainer}>
                <Button
                  onClick={() => setDeleteFormModal(false)}
                  className={classes.cancelButton}
                >
                  Цуцлах
                </Button>
                <Button
                  onClick={() => handleFormDelete()}
                  className={classes.submitButton}
                >
                  Устгах
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
        {/* More info Modal */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.moreInfoModal}
          open={moreInfoModal}
          onClose={() => setMoreInfoModal(false)}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Slide in={moreInfoModal} direction={'left'}>
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
                  <img
                    src={timeIcon}
                    alt={'clock'}
                    className={classes.moreInfoClockIcon}
                  />
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
            </div>
          </Slide>
        </Modal>
        {/* Page title and description */}
        <PageAbout
          title={contextText.operator.marketeerList.title}
          desc={contextText.operator.marketeerList.description}
        />
        {/* Category */}
        <OptionsCore
          marginTop={'36px'}
          marginBottom={'46px'}
          options={contextText.operator.marketeerList.categories}
          acceptValue={menu}
          onChange={setMenu}
          endButton={true}
          endButtonText={contextText.operator.marketeerList.addShop}
          endIcon={addBox}
          endButtonFunction={() => setModalState(true)}
        />
        <>
          {/* Table header */}
          <CustomTable
            stopHover
            items={[
              { item: 'Нэр', width: '260px' },
              { item: 'Ажиллах цаг', width: '150px' },
              { item: 'Утас', width: '120px' },
              { item: 'Хүргэлт', width: '200px' },
              { item: 'Хаяг', width: '130px' },
              { item: '', width: '250px' },
            ]}
            backgroundColor={'#f7f7f7'}
            height={'50px'}
            opacity={'0.7'}
          />
          {/* Table Items */}
          {marketeerListLoading ? (
            <CircularProgressLoader />
          ) : marketeerList?.getListOfMarketeers?.length === 0 ? (
            <div>
              <Typography>Илэрц байхгүй байна.</Typography>
            </div>
          ) : (
            marketeerList?.getListOfMarketeers?.map((item, index) => (
              <CustomTable
                onClick={() => handleMoreInfoModal(item, true)}
                key={'table core' + index}
                items={[
                  {
                    item: (
                      <Shop
                        data={{
                          name: item.name,
                          image: item.coverImg,
                          rating: item.star,
                        }}
                        starIcon={star}
                      />
                    ),
                    width: '260px',
                  },
                  {
                    item: (
                      <div className={classes.openHourDiv}>
                        <img src={timeIcon} alt={'clock'} className={classes.clockIcon} />
                        <p className={classes.openHourText}>{item.openHours}</p>
                      </div>
                    ),
                    width: '150px',
                  },
                  { item: `${item.phone}`, width: '120px' },
                  { item: `${item.shipping}`, width: '200px' },
                  { item: `${item.address}`, width: '230px' },
                  {
                    item: (
                      <Menu
                        penclick={() => handleSingleFormUpdate(item)}
                        trashclick={() => handleSingleShopDelete(item)}
                        dotsclick={(e) => handlePopper(e, item)}
                      />
                    ),
                    width: '150px',
                  },
                ]}
                height={'70px'}
              />
            ))
          )}
        </>
      </Container>
    </>
  );
}

const Menu = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.menuContainer}>
      <div
        className={classes.menuItem}
        onClick={() => (props.penclick ? props.penclick() : {})}
      >
        <img src={pen} alt={'pen'} />
      </div>
      <div
        className={classes.menuItem}
        onClick={() => (props.trashclick ? props.trashclick() : {})}
      >
        <img src={trash} alt={'trash'} />
      </div>
      <div
        className={classes.menuItem}
        onClick={(e) => (props.dotsclick ? props.dotsclick(e) : {})}
      >
        <p className={classes.dotsIcon}>...</p>
      </div>
    </Container>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
  },
  form: {
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  backdrop: {
    zIndex: 1200 + 100,
    color: '#fff',
  },
  popper: {
    zIndex: 10,
  },
  popperPaper: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  popperOption: {
    cursor: 'pointer',
    '&:hover': {
      color: colors.lightPurple,
    },
  },
  moreInfoOpenHoursContainer: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreInfoOpenHours: {
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    color: colors.gray70,
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
  moreInfoClockIcon: {
    width: 13,
    height: 13,
    paddingBottom: 2,
    paddingRight: 5,
  },
  moreInfoTitleContainer: {
    maxWidth: '220px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    height: 25,
    paddingBottom: 6,
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
  moreInfoTitle: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  moreInfoPhoneContainer: {
    marginLeft: 10,
  },
  moreInfoPhone: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginRight: 10,
  },
  verticalDivider: {
    backgroundColor: colors.gray30,
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
  moreInfoPaper: {
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
  formik: {},
  textFieldRow: {
    display: 'flex',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
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
  paper: {
    maxHeight: '70%',
    width: '100%',
    maxWidth: '700px',
    backgroundColor: 'white',
    border: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    borderRadius: 10,
    overflow: 'auto',
    outline: 'none',
  },
  formBody: {
    padding: 20,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItem: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    backgroundColor: 'tranparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  },
  dotsIcon: {
    color: '#848485',
    marginTop: 14,
    fontWeight: 'lighter',
  },
  clockIcon: {
    width: 20,
    height: 20,
    paddingRight: 10,
  },
  openHourText: {
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'SF Pro Display',
  },
  openHourDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
}));
