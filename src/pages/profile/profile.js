import React, { useState, useContext, useEffect } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import {
  Container,
  Typography,
  Button,
  Avatar,
  Backdrop,
  Box,
  Modal,
  Fade,
  TextField,
  MenuItem,
  Checkbox,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import TruncateMarkup from 'react-truncate-markup';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import TheContext from '../../context/context';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { countries, provinces, discricts } from '../../constants/countryInfo';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { emailValidator } from '../../helpers/helperFunctions';
import { img_url } from '../../constants/url';
import { formDataUpdateProfile, getListOfAccounts } from '../../api/account';
import { getListOfMembershipTypes } from '../../api/membership';
import Title from '../../components/title/title';
import Footer from '../../components/footer/footer';
import Background1 from '../../assets/background/background.png';
import ArrowL from '../../assets/arrow/arrowL.png';
import ArrowR from '../../assets/arrow/arrowR.png';
import screen2 from '../../assets/images/background.png';
import Slider from 'react-slick';
import { getads, getliked } from '../../api/ads';
import '../../App.css';
import { useHistory } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

//Slider arrow
function NextArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: 'block' }} onClick={onClick}>
      <img src={ArrowR} className={classes.arrow} alt='' />
    </div>
  );
}

function PrevArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: 'block', cursor: 'pointer' }} onClick={onClick}>
      <img className={classes.arrow} src={ArrowL} alt='' />
    </div>
  );
}

export default function Profile() {
  const history = useHistory();
  const page = 1;
  const limit = 50;
  const [liked, setLiked] = useState([]);
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;
  const authenticated = localStorage.getItem('jamukh_auth') === 'true' ? true : false;
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const classes = useStyles({
    phone: phoneSize,
    tablet: tabletSize,
    backgroundImg: img_url + account?.avatar?.url,
  });

  // States
  const [open, setOpen] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [memberModalType, setMemberModalType] = useState(0);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });
  const [fieldState, setFieldState] = useState({
    familyname: account?.familyname || '',
    firstname: account?.firstname || '',
    lastname: account?.lastname || '',
    address: account?.address || '',
    email: account?.email || '',
    avatar: account?.avatar || '',
    member_type_str: account?.member_type_str || '',
    bio: account?.bio || '',
    gender: account?.gender || 'male',
    country: account?.country || countries[0].value,
    countryIndex: 0,
    city: account?.city || provinces[0].value,
    cityIndex: 0,
    district: account?.district || discricts[0][0],
    tel: account?.tel || '',
    highschool: account?.highschool || '',
    university: account?.university || '',
    vocation: account?.vocation || '',
    currentjob: account?.currentjob || '',
    jobtitle: account?.jobtitle || '',
    annualincome: account?.annualincome || 1000000,
    imgUpdated: false,
    error: {
      familyname: false,
      firstname: false,
      lastname: false,
      address: false,
      email: false,
      bio: false,
      country: false,
      city: false,
      district: false,
      birthdate: false,
      tel: false,
      highschool: false,
      university: false,
      vocation: false,
      currentjob: false,
      jobtitle: false,
      annualincome: false,
      profileImg: false,
    },
  });
  const [birthdate, setDate] = useState(new Date('2018-01-01T00:00:00.000Z'));
  const [profileImg, setImg] = useState(
    account?.avatar?.url ? [img_url + account?.avatar?.url] : []
  );
  const [imgReplacer, setImgReplacer] = useState([]);
  const [listOfAccounts, setListOfAccounts] = useState([]);
  const [accListLoading, setAccListLoading] = useState(false);
  const [accListPage, setAccListPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Functions
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  const handleModalOpen = () => setOpen(true);

  const handleModalClose = () => {
    setOpen(false);
    setFieldState({
      familyname: account?.familyname || '',
      firstname: account?.firstname || '',
      lastname: account?.lastname || '',
      address: account?.address || '',
      email: account?.email || '',
      bio: account?.bio || '',
      gender: account?.gender || 'male',
      country: account?.country || countries[0].value,
      countryIndex: 0,
      city: account?.city || provinces[0].value,
      cityIndex: 0,
      district: account?.district || discricts[0][0],
      tel: account?.tel || '',
      highschool: account?.highschool || '',
      university: account?.university || '',
      vocation: account?.vocation || '',
      currentjob: account?.currentjob || '',
      jobtitle: account?.jobtitle || '',
      annualincome: account?.annualincome || '',
      imgUpdated: false,
      error: {
        familyname: false,
        firstname: false,
        lastname: false,
        address: false,
        email: false,
        bio: false,
        country: false,
        city: false,
        district: false,
        birthdate: false,
        tel: false,
        highschool: false,
        university: false,
        vocation: false,
        currentjob: false,
        jobtitle: false,
        annualincome: false,
        profileImg: false,
      },
    });
    setImg([account?.avatar?.path] || []);
    setImgReplacer([]);
  };

  const handleMemberModalClose = () => {
    setMemberModal(false);
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    handleValidation(name, value);
    if (index !== undefined) {
      if (name === 'city') {
        setFieldState({
          ...fieldState,
          [name]: value,
          cityIndex: index,
          district: discricts[index][0],
        });
      }
    } else {
      setFieldState({ ...fieldState, [name]: value });
    }
  };

  const handleValidation = (name, value) => {
    let error = fieldState.error;
    switch (name) {
      case 'firstname':
        error.firstname = value.length < 1 ? true : false;
        break;
      case 'lastname':
        error.lastname = value.length < 1 ? true : false;
        break;
      case 'email':
        error.email = emailValidator(value) ? false : true;
        error.email = value.length < 3 ? true : false;
        break;
      case 'bio':
        error.bio = value.length < 3 ? true : false;
        break;
      default:
        break;
    }
    setFieldState({ ...fieldState, error });
  };

  const onImgAdd = ({ target: { validity, files } }) => {
    if (validity.valid) {
      console.log(files[0].size);
      if (files[0].size < 5000000) {
        let _URL = window.URL ? window.URL : window.webkitURL;
        let urlAddress = _URL.createObjectURL(files[0]);
        setImgReplacer([{ file: files[0], url: urlAddress }]);
        setImg([files[0]]);
        setFieldState({
          ...fieldState,
          imgUpdated: true,
          error: { ...fieldState.error, profileImg: false },
        });
      } else {
        handleSnackOpen({
          state: true,
          msg: 'Файлын багтаамж 5mb ээс ихгүй байна.',
          type: 'warning',
        });
      }
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Файлын төрөл буруу байна.',
        type: 'warning',
      });
    }
  };

  const onImgDelete = () => {
    setImg([]);
    setImgReplacer([]);
    setFieldState({
      ...fieldState,
      imgUpdated: false,
      error: { ...fieldState.error, profileImg: false },
    });
  };

  const handleSubmit = () => {
    for (const prop in fieldState.error) {
      if (fieldState.error[prop]) {
        return handleSnackOpen({
          state: true,
          msg: 'Талбаруудыг бүрэн бөглөнө үү.',
          type: 'warning',
        });
      }
    }

    formDataUpdateProfile(profileImg[0], {
      id: account.id,
      familyname: fieldState.familyname,
      firstname: fieldState.firstname,
      lastname: fieldState.lastname,
      address: fieldState.address,
      email: fieldState.email,
      bio: fieldState.bio,
      gender: fieldState.gender,
      highschool: fieldState.highschool,
      university: fieldState.university,
      vocation: fieldState.vocation,
      currentjob: fieldState.currentjob,
      jobtitle: fieldState.jobtitle,
      annualincome: parseInt(fieldState.annualincome),
      country: fieldState.country,
      city: fieldState.city,
      district: fieldState.district,
      imgUpdated: fieldState.imgUpdated,
      ...(fieldState.tel.length > 7 && { tel: parseInt(fieldState.tel) }),
      birthdate: birthdate,
    })
      .then((res) => {
        console.log(res);
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай хадгаллаа.',
          type: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        handleSnackOpen({
          state: true,
          msg: 'Алдаа гарлаа.',
          type: 'error',
        });
      });
  };

  const handlePagination = (event, value) => {
    setAccListPage(value);
  };

  useEffect(() => {
    getads(page, limit)
      .then((res) => {
        setLiked(res.data.ads);
      })
      .catch((e) => {
        handleSnackOpen({
          state: true,
          msg:
            e.message === 'user.not.found'
              ? 'Хэрэглэгч олдсонгүй'
              : 'Нэр үг эсвэл нууц үг буруу байна.',
          type: 'error',
        });
      });
  }, [page]);

  useEffect(() => {
    getliked()
      .then((res) => {
        setLiked(res.data.ads);
      })
      .catch((e) => {
        handleSnackOpen({
          state: true,
          msg:
            e.message === 'user.not.found'
              ? 'Хэрэглэгч олдсонгүй'
              : 'Нэр үг эсвэл нууц үг буруу байна.',
          type: 'error',
        });
      });
  }, []);

  useEffect(() => {
    if (account) {
      setFieldState((state) => ({
        ...state,
        familyname: account?.familyname || '',
        firstname: account?.firstname || '',
        lastname: account?.lastname || '',
        address: account?.address || '',
        email: account?.email || '',
        bio: account?.bio || '',
        gender: account?.gender || 'male',
        country: account?.country || countries[0].value,
        countryIndex: 0,
        city: account?.city || provinces[0].value,
        cityIndex: 0,
        district: account?.district || discricts[0][0],
        tel: account?.tel || '',
        highschool: account?.highschool || '',
        university: account?.university || '',
        vocation: account?.vocation || '',
        currentjob: account?.currentjob || '',
        jobtitle: account?.jobtitle || '',
        annualincome: account?.annualincome || 1000000,
        imgUpdated: false,
      }));
    }
  }, [account]);

  useEffect(() => {
    setAccListLoading(true);
    getListOfAccounts('DESC', accListPage, 10)
      .then((res) => {
        console.log(res);
        setAccListLoading(false);
        setListOfAccounts(res?.data?.account_list);
        setPageCount(res?.data?.pageCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accListPage]);

  useEffect(() => {
    getListOfMembershipTypes()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
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
      {/* Backdrop */}
      <Backdrop sx={{ color: '#fff' }} open={false}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {/* Modal Update profile */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.modalBox1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {imgReplacer.length > 0 ? (
                <Avatar
                  sx={{ height: 100, width: 100 }}
                  onClick={() => onImgDelete()}
                  src={imgReplacer[0].url}
                  className={classes.profileImg}
                />
              ) : (
                <label htmlFor='icon-button-file'>
                  <input
                    onChange={onImgAdd}
                    style={{ display: 'none' }}
                    accept='image/*'
                    id='icon-button-file'
                    type='file'
                  />
                  <IconButton
                    sx={{ height: 100, width: 100, backgroundColor: 'lightgray' }}
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                  >
                    <PhotoCamera sx={{ fontSize: 50, color: 'black' }} />
                  </IconButton>
                </label>
              )}
              <Typography
                id='transition-modal-title'
                fontSize={25}
                fontWeight='bold'
                sx={{ marginLeft: 3 }}
              >
                Update profile info
              </Typography>
            </div>
            <div className={classes.updateModalDiv}>
              {/* Country, city, district */}
              <div className={classes.modalRow}>
                <div className={classes.fieldDiv}>
                  <TextField
                    select
                    fullWidth
                    value={fieldState.country}
                    error={fieldState.error.country}
                    name={'country'}
                    id='country-textfield'
                    label='Country'
                    helperText={fieldState.error.country ? 'Incorrect entry.' : ' '}
                    className={classes.textFieldSquare}
                  >
                    {countries?.map((option, index) => (
                      <MenuItem
                        onClick={() =>
                          handleFieldChange(
                            { target: { name: 'country', value: option.value } },
                            index
                          )
                        }
                        key={option.label + index}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    select
                    fullWidth
                    value={fieldState.city}
                    error={fieldState.error.city}
                    name={'city'}
                    id='city-textfield'
                    label='City'
                    helperText={fieldState.error.city ? 'Incorrect entry.' : ' '}
                    className={classes.textFieldSquare}
                  >
                    {provinces?.map((option, index) => (
                      <MenuItem
                        onClick={() =>
                          handleFieldChange(
                            { target: { name: 'city', value: option.value } },
                            index
                          )
                        }
                        key={option.label + index}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    select
                    fullWidth
                    value={fieldState.district}
                    error={fieldState.error.district}
                    name={'district'}
                    id='district-textfield'
                    label='District'
                    helperText={fieldState.error.district ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  >
                    {discricts[fieldState?.cityIndex]?.map((option, index) => (
                      <MenuItem key={index + 'i op'} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              {/* Names */}
              <div className={classes.modalRow}>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.firstname}
                    error={fieldState.error.firstname}
                    name={'firstname'}
                    id='firstname-textfield'
                    label='Firstname'
                    helperText={fieldState.error.firstname ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.lastname}
                    error={fieldState.error.lastname}
                    name={'lastname'}
                    id='lastname-textfield'
                    label='Lastname'
                    helperText={fieldState.error.lastname ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.familyname}
                    error={fieldState.error.familyname}
                    name={'familyname'}
                    id='familyname-textfield'
                    label='Familyname'
                    helperText={fieldState.error.familyname ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
              </div>
              {/* Birthdate, email, phone */}
              <div className={classes.modalRow}>
                <div className={classes.fieldDiv}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {phoneSize ? (
                      <MobileDateTimePicker
                        sx={{ width: '100%' }}
                        value={birthdate}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    ) : (
                      <DateTimePicker
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} />}
                        value={birthdate}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                      />
                    )}
                  </LocalizationProvider>
                </div>
                <div className={classes.fieldDiv} style={{ marginTop: '30px' }}>
                  <TextField
                    fullWidth
                    value={fieldState.tel}
                    error={fieldState.error.tel}
                    name={'tel'}
                    id='tel-textfield'
                    label='Phone'
                    type='number'
                    helperText={fieldState.error.tel ? 'Incorrect entry.' : ' '}
                    onChange={(e) => {
                      if (e.target.value.length < 9) {
                        handleFieldChange(e);
                      }
                    }}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.email}
                    error={fieldState.error.email}
                    name={'email'}
                    id='email-textfield'
                    label='Email'
                    type='email'
                    helperText={fieldState.error.email ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
              </div>
              {/* Gender */}
              <div className={classes.checkboxRow}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    sx={{
                      color: 'orange',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                    }}
                    checked={fieldState.gender === 'male' ? true : false}
                    onClick={() => setFieldState({ ...fieldState, gender: 'male' })}
                  />
                  <Typography style={{ color: 'black' }}>Эрэгтэй</Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={fieldState.gender === 'female' ? true : false}
                    onClick={() => setFieldState({ ...fieldState, gender: 'female' })}
                    sx={{
                      color: 'orange',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                    }}
                  />
                  <Typography style={{ color: 'black' }}>Эмэгтэй</Typography>
                </div>
              </div>
              {/* High school, university, profession */}
              <div className={classes.modalRow}>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.highschool}
                    error={fieldState.error.highschool}
                    name={'highschool'}
                    id='highschool-textfield'
                    label='Highschool'
                    helperText={fieldState.error.highschool ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.university}
                    error={fieldState.error.university}
                    name={'university'}
                    id='university-textfield'
                    label='University'
                    helperText={fieldState.error.university ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.vocation}
                    error={fieldState.error.vocation}
                    name={'vocation'}
                    id='vocation-textfield'
                    label='Profession'
                    helperText={fieldState.error.vocation ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
              </div>
              {/* Working job, job title, annual income */}
              <div className={classes.modalRow}>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.currentjob}
                    error={fieldState.error.currentjob}
                    name={'currentjob'}
                    id='currentjob-textfield'
                    label='Current job'
                    helperText={fieldState.error.currentjob ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.jobtitle}
                    error={fieldState.error.jobtitle}
                    name={'jobtitle'}
                    id='jobtitle-textfield'
                    label='Job title'
                    helperText={fieldState.error.jobtitle ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.annualincome}
                    error={fieldState.error.annualincome}
                    name={'annualincome'}
                    id='annualincome-textfield'
                    type={'number'}
                    label='Annual income'
                    helperText={fieldState.error.annualincome ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
              </div>
              {/* Bio */}
              <div className={classes.fieldDiv}>
                <TextField
                  fullWidth
                  value={fieldState.bio}
                  error={fieldState.error.bio}
                  name={'bio'}
                  id='bio-textfield'
                  label='Bio'
                  multiline={true}
                  rows={3}
                  helperText={fieldState.error.bio ? 'Incorrect entry.' : ' '}
                  onChange={(e) => handleFieldChange(e)}
                  className={classes.textFieldSquare}
                />
              </div>
            </div>
            <Divider />
            {/* Submit */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: 20,
              }}
            >
              <Button
                onClick={() => handleSubmit()}
                style={{
                  marginRight: '1rem',
                  backgroundColor: 'orange',
                  color: 'white',
                }}
              >
                Шинэчлэх
              </Button>
              <Button onClick={handleModalClose}>Цуцлах</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* Modal see all members */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={memberModal}
        onClose={handleMemberModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={memberModal}>
          <Box className={classes.modalBox}>
            <Typography
              textAlign={'center'}
              sx={{ mt: 2, mb: 2 }}
              className={classes.memberTitle}
            >
              Риалторууд
            </Typography>
            <div className={classes.membersModalContainer}>
              <div className={classes.mmButtonContainer}>
                {account?.member_type > 5 && (
                  <>
                    <Button
                      onClick={() => setMemberModalType(0)}
                      className={
                        memberModalType === 0
                          ? classes.updateButton
                          : classes.inactiveUpdateButton
                      }
                    >
                      {account?.member_type_str}
                    </Button>
                    <Button
                      onClick={() => setMemberModalType(1)}
                      className={
                        memberModalType === 1
                          ? classes.updateButton
                          : classes.inactiveUpdateButton
                      }
                    >
                      Member Requests
                    </Button>
                  </>
                )}
              </div>
              {memberModalType === 0 ? (
                <div className={classes.innerMembersModalContainer}>
                  {accListLoading ? (
                    <div>
                      <Typography>Loading...</Typography>
                    </div>
                  ) : (
                    listOfAccounts?.length > 0 &&
                    listOfAccounts?.map((item, index) => {
                      return (
                        <div key={index + 'member'} className={classes.memberModalItem}>
                          <div className={classes.mmAvatar}>
                            {item?.avatar?.url ? (
                              <img
                                alt={'avatar 3'}
                                src={item?.avatar?.url}
                                className={classes.avatarImage}
                              />
                            ) : (
                              <Avatar sx={{ width: 80, height: 80 }}>
                                <Typography
                                  fontSize={35}
                                  color={'white'}
                                  fontWeight={'bolder'}
                                >
                                  {item?.firstname
                                    ? item?.firstname?.charAt(0).toUpperCase()
                                    : item?.username?.charAt(0).toUpperCase()}
                                </Typography>
                              </Avatar>
                            )}
                          </div>
                          <div className={classes.mmInfo}>
                            <Typography
                              noWrap
                              textAlign={'center'}
                              sx={{ pl: 1, pr: 1 }}
                              className={classes.mmAccountName}
                            >
                              {item?.firstname && item?.lastname
                                ? item?.firstname + ' ' + item?.lastname
                                : item?.username
                                ? item?.username
                                : 'No name'}
                            </Typography>
                            <div className={classes.smallProfileRank}>
                              <StarIcon
                                sx={{ color: 'yellow' }}
                                className={classes.starRank}
                              />
                              <Typography
                                color={'black'}
                                sx={{
                                  paddingTop: '2px',
                                  paddingLeft: '2px',
                                  color: 'white',
                                }}
                                textAlign={'center'}
                              >
                                {item?.rating || 0}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className={classes.memberSmallProfiles}>
                  <Typography>Member requests</Typography>
                </div>
              )}
              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  page={accListPage}
                  count={pageCount}
                  onChange={handlePagination}
                  className='rowProfilePage'
                />
              </Container>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* Body */}
      <Container disableGutters maxWidth={false} className={classes.root}>
        <div className={classes.rootRow}>
          <div className={classes.sliderItemContainer}>
            <div className={classes.row1}>
              {/* Profile  */}
              <div className={classes.textContainer}>
                {/* Avatar */}
                <div className={classes.avatar}>
                  {authenticated === true ? (
                    <Avatar alt='Profile Avatar' className={classes.avatarImageBig}>
                      {account?.avatar?.url ? (
                        <img
                          alt={'profile'}
                          className={classes.avatar}
                          src={account?.avatar?.url}
                        />
                      ) : (
                        <p style={{ fontWeight: 'bold', fontSize: '32px' }}>
                          {fieldState.firstname[0]?.toUpperCase()}
                        </p>
                      )}
                    </Avatar>
                  ) : (
                    ''
                  )}
                  <div className={classes.profile_badge}></div>
                </div>
                {/* Name */}
                <div className={classes.profile_name}>
                  <Typography noWrap className={classes.profile_name_firstname}>
                    {fieldState.firstname}
                  </Typography>
                  <Typography noWrap sx={{ textAlign: 'center' }}>
                    {account?.lastname}
                  </Typography>
                </div>
                {/* Membership */}
                <div className={classes.membership}>
                  <div className={classes.member_type_str}>
                    {account?.member_type_str}
                  </div>
                  <div>member</div>
                </div>
                {/* Tel */}
                <div className={classes.membership}>
                  <div>{account?.tel}</div>
                </div>
                {/* Update profile */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Button className={classes.updateButton}>
                    <Link to='/members' style={{ color: 'white' }}>
                      Зэрэглэл
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleModalOpen()}
                    className={classes.updateButton}
                  >
                    Засах
                  </Button>
                </div>
              </div>
              {/* MEMBERS */}
              <div className={classes.memberContainer}>
                <div className={classes.memberTop}>
                  <div className={classes.memberTitle}>Реалторууд</div>
                  <Button
                    onClick={() => history.push('/realtor')}
                    className={classes.memberTitleSEE}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    Бүгдийг үзэх
                  </Button>
                </div>
                <div className={classes.memberSmallProfiles}>
                  <ScrollContainer horizontal style={{ display: 'flex' }}>
                    {accListLoading ? (
                      <div>
                        <Typography sx={{ color: 'white' }}>Loading...</Typography>
                      </div>
                    ) : (
                      listOfAccounts?.length > 0 &&
                      listOfAccounts?.map((item, index) => {
                        return (
                          <div key={index + 'shit'} className={classes.smallProfile}>
                            <div className={classes.smallProfileAvatar}>
                              {item?.avatar?.url ? (
                                <img
                                  alt={'avatar 3'}
                                  src={item?.avatar?.url}
                                  className={classes.avatarImage}
                                />
                              ) : (
                                <Avatar sx={{ width: 80, height: 80 }}>
                                  <Typography
                                    fontSize={35}
                                    color={'white'}
                                    fontWeight={'bolder'}
                                  >
                                    {item?.firstname
                                      ? item?.firstname?.charAt(0).toUpperCase()
                                      : item?.username?.charAt(0).toUpperCase()}
                                  </Typography>
                                </Avatar>
                              )}
                              <div style={{ maxWidth: 120 }}>
                                <Typography noWrap className={classes.smallProfileTitle}>
                                  {item?.firstname && item?.lastname
                                    ? item?.firstname + ' ' + item?.lastname
                                    : item?.username
                                    ? item?.username
                                    : 'No name'}
                                </Typography>
                              </div>
                              <div className={classes.smallProfileRank}>
                                <StarIcon className={classes.starRank} />
                                <Typography sx={{ pt: '4px', pl: '5px' }}>
                                  {item?.rating || 0}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </ScrollContainer>
                </div>
              </div>
            </div>
          </div>
          {/* SALES */}
          <div className={classes.saleBackground}>
            <div>
              <Title name='Таалагдсан зар' />
              {liked.length === 0 ? (
                <div className={classes.empty}>Зар олдсонгүй</div>
              ) : (
                <Slider
                  {...{
                    infinite: true,
                    speed: 500,
                    arrows: true,
                    slidesToShow: liked.length > 3 ? 3 : liked.length,
                    slidesToScroll: 1,
                    nextArrow: <NextArrow />,
                    prevArrow: <PrevArrow />,
                    responsive: [
                      {
                        breakpoint: 1310,
                        settings: {
                          slidesToShow: liked.length > 1 ? 2 : 1,
                          slidesToScroll: 1,
                          initialSlide: 1,
                          arrows: true,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          initialSlide: 1,
                          arrows: true,
                        },
                      },
                    ],
                  }}
                  className={classes.slider1}
                >
                  {liked?.map((item, i) => (
                    <Link
                      key={i + 'key is here'}
                      to={`/adsDetail/${item.ads_id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <SliderItem
                        dots={1}
                        item={item}
                        phone={phoneSize}
                        backgroundImg={screen2}
                        link={account ? '/user/services' : '/sign-up'}
                      />
                    </Link>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </Container>
      <div style={{ marginTop: '-50px' }}>
        <Footer phone={phoneSize} tablet={tabletSize} />
      </div>
    </div>
  );
}

const SliderItem = (props) => {
  const classes = useStyles(props);
  const item = props.item;

  return (
    <Container disableGutters maxWidth={false}>
      <div className={classes.sliderItemBackImg1}>
        <img src={item.ad_imgs[0]?.url} className={classes.boxImage} alt='' />
        <TruncateMarkup
          lines={1}
          ellipsis={() => {
            /* renders "+X more users" */
          }}
        >
          <div className={classes.boxTitle}>{item?.title}</div>
        </TruncateMarkup>
        <div className={classes.bottomBox}>
          <div className={classes.brand}>{item?.price + item?.currency_symbol}</div>
          <div className={classes.price}>
            <BiTimeFive />
            {moment(item.created_date).format('YYYY.MM.DD')}
          </div>
        </div>
      </div>
    </Container>
  );
};

const useStyles = makeStyles({
  memberTypItemButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  container: {
    backgroundImage: `url(${Background1})`,
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: '300px 250px',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
  },
  profile_name: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '20px',
    color: '#C19D65',
    fontSize: '25px',
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    color: '#C6824D',
    fontSize: '60px',
    borderRadius: '20px',
    backgroundColor: 'rgba(21,21,22,0.9)',
    height: '300px',
    width: '100%',
    fontFamily: "'Lobster', cursive",
  },
  profile_name_firstname: {
    marginRight: (props) => (props?.phone ? '0px' : '5px'),
    textAlign: 'center',
  },
  member_type_str: {
    marginRight: (props) => (props?.phone ? '0px' : '5px'),
  },
  membership: {
    display: 'flex',
    color: '#C19D65',
    fontSize: '18px',
    marginTop: '10px',
    justifyContent: 'center',
  },
  memberTypeMonthlyPay: {
    color: 'darkgray',
    fontSize: '21px',
    fontWeight: 'bold',
  },
  saleBackground: {
    backgroundImage: `url(${Background1})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: '300px 250px',
    backgroundAttachment: 'fixed',
    minHeight: '650px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: window.screen.availHeight - 600,
  },
  memberTypeLoading: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingTop: '20%',
    paddingBottom: '20%',
  },
  memberTypeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid lightgray',
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    paddingTop: 15,
    maxWidth: 240,
  },
  memberTypeImg: {
    maxWidth: 180,
  },
  memberTypeTitle: {
    color: colors.orange,
    fontSize: '1.5rem',
  },
  membershipModalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  membersModalContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  innerMembersModalContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  mmAccountName: {
    marginTop: '15px',
    color: colors.orange,
    fontSize: '20px',
    fontWeight: '700',
  },
  mmAvatar: {
    position: 'absolute',
    bottom: '75%',
  },
  mmInfo: {
    width: '150px',
    marginTop: 50,
    marginBottom: 10,
  },
  mmDeleteButton: {
    border: '1px solid #D3D3D3',
    color: 'orange',
    fontWeight: '700',
    borderRadius: '0',
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
  },
  memberModalItem: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    marginTop: 10,
    width: '150px',
    border: '1px solid #D3D3D3',
    textAlign: 'center',
  },
  mmButtonContainer: {
    marginBottom: 50,
    marginLeft: 30,
  },
  inactiveUpdateButton: {
    marginTop: 20,
    borderRadius: 0,
    color: 'gray',
    fontWeight: '700',
  },
  profileImg: {
    '&:hover': {
      filter: 'blur(1px)',
      cursor: 'pointer',
    },
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: '100%',
    boxShadow: 24,
    padding: 30,
    overflow: 'auto',
    maxHeight: '90%',
    backgroundImage: `url(${Background1})`,
    color: 'white!important',
  },
  modalBox1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: '100%',
    boxShadow: 24,
    padding: 30,
    overflow: 'auto',
    maxHeight: '90%',
    backgroundColor: 'white',
    color: 'white!important',
  },
  memberModalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1200,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 30,
    overflow: 'auto',
    maxHeight: '90%',
  },
  updateModalDiv: {
    marginTop: 30,
    outline: 'none',
  },
  updateButton: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    color: 'white',
    fontWeight: '300',
    fontSize: '12px',
    border: '1px solid #d390636c',
    borderRadius: '8px',
  },
  profile_badge: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    width: 100,
    bottom: '-60px',
    right: '10px',
    zIndex: '3',
  },
  root: {
    width: '100%',
    height: '100%',
  },
  rootRow: {
    height: 'auto',
  },
  starRank: {
    fontSize: '18px',
  },
  membersTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
  },
  membersAdvantageContaint: {
    margin: '40px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '30px',
  },
  membersLogo: {
    height: '200px',
    marginRight: '30px',
  },
  membersTitle: {
    color: colors.brandTextColor,
    fontSize: '34px',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  membersDescription: {
    color: 'black',
    fontSize: '20px',
  },
  myDiv: {
    display: 'flex',
    padding: '40px',
    justifyContent: 'space-between',
  },
  mySales: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 50px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: colors.brandTextColor,
  },
  smallProfile: {
    marginRight: 20,
    maxWidth: 130,
  },
  memberSmallProfiles: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px',
    overflow: 'hidden',
    paddingRight: 10,
    paddingLeft: 10,
  },
  smallProfileAvatar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallProfileRank: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5px',
    color: 'white',
    fontSize: '16px',
  },
  smallProfileTitle: {
    marginTop: '15px',
    color: colors.orange,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  memberContainer: {
    display: 'flex',
    minWidth: (props) => (props.phone ? '100%' : '60%'),
    flexDirection: 'column',
    maxWidth: '100%',
    // overflow: 'auto',
  },
  avatarImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '100%',
    objectFit: 'cover',
  },
  avatarImageBig: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '100%',
    objectFit: 'cover',
    marginTop: '10px',
  },
  memberTop: {
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: (props) => (props?.phone ? '0px' : '10px'),
  },
  memberTitle: {
    color: colors.orange,
    fontSize: '28px',
    fontWeight: '700',
  },
  memberTitleSEE: {
    color: 'white',
    fontSize: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icons: {
    height: '25px',
    width: '25px',
  },
  avatarImg: {
    height: '150px',
    width: '150px',
    borderRadius: '100%',
  },
  row1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: (props) => (props?.phone ? 'column' : 'row'),
    height: (props) => (props?.phone ? '800px' : '100%'),
    width: '100%',
    maxWidth: '1600px',
    margin: 'auto',
  },
  faceIcon: {
    fontSize: '80px',
    border: `1px dashed ${colors.brandTextColor}`,
    borderRadius: '100%',
    marginBottom: '10px',
  },
  slider: {
    width: '100%',
  },
  path: {
    background: '#D38F63',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    height: '100px',
  },
  slideBottomBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20px',
  },
  saleText: {
    fontSize: '12px',
    color: 'white',
    marginTop: '5px',
  },
  saleCount: {
    fontSize: '22px',
    color: '#D38F63',
    marginTop: '5px',
    fontWeight: 'bold',
  },
  sliderItemContainer: {
    dislay: 'flex',
    alignItems: 'center',
    boxShadow:
      ' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5),rgba(37,37,37,1) 100%), url(${props?.backgroundImg})`,
    backgroundColor: 'lightgray',
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: (props) => (props?.phone ? '900px' : '640px'),
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    backgroundColor: '#171717',
    width: '220px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '360px',
    margin: (props) => (props?.phone ? '90px' : '45px'),
    padding: (props) => (props?.phone ? '10px' : '10px'),
    borderRadius: '5px',
  },
  avatar: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#AA7654',
    width: 120,
    marginLeft: '15%',
  },
  avatarColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '700',
    fontSize: (props) => (props?.phone ? 8 : 18),
    marginLeft: 8,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  area: {
    display: 'flex',
    alignItems: 'center',
    color: colors.brandTextColor,
    fontWeight: '700',
    marginRight: '10px',
    fontSize: (props) => (props?.phone ? 8 : 18),
  },
  avatarColumnTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '300',
    color: 'white',
    fontSize: (props) => (props?.phone ? 4 : 12),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: (props) => (props?.phone ? 18 : 18),
    fontWeight: '700',
    justifyContent: 'center',
    textAlign: 'center',
    color: colors.brandTextColor,
    maxWidth: '300px',
    minHeight: 30,
    marginTop: 5,
  },
  email: {
    color: 'white',
    minHeight: 64,
    fontSize: '12px',
  },
  email1: {
    color: 'black',
    minHeight: 64,
    fontSize: '12px',
  },
  button: {
    backgroundColor: colors.brandTextColor,
    width: 100,
    '&:hover': {
      backgroundColor: colors.brandTextColor,
      color: 'white',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
  saleLine: {
    backgroundColor: 'white',
    height: 3,
    width: 45,
  },
  saleLineLong: {
    marginTop: 8,
    backgroundColor: 'white',
    height: 3,
    width: 60,
  },

  slider1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sliderItemBackImg1: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: colors.lightGray,
    backgroundImage: (props) => `url(${props.backgroundImg})`,
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // height: (props) => (props?.phone ? 'auto' : '300px'),
    margin: '10px',
    borderRadius: '10px',
    border: '1px solid #C19D65',
  },
  boxImage: {
    width: (props) => (props?.phone ? '80%' : '300px'),
    height: (props) => (props?.phone ? '150px' : '210px'),
  },
  bottomBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    fontWeight: '300',
  },
  brand: {
    color: '#C19D65',
    fontWeight: '400',
  },
  arrow: {
    height: (props) => (props?.phone ? '65px' : '100px'),
    width: 'auto',
  },
  boxTitle: {
    fontSize: '32px',
    fontWeight: '300',
    color: 'white',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
});
