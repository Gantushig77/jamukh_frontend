import React, { useState, useContext, useEffect } from 'react';
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
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import TheContext from '../../context/context';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Sale from '../../assets/icons/sale.png';
import Members from '../../assets/icons/member.png';
import Rate from '../../assets/icons/rate.png';
import Heart from '../../assets/icons/heart.png';
import Test from '../../assets/images/test.png';
import Plat from '../../assets/images/plat.png';
import StarIcon from '@mui/icons-material/Star';
import profile_member_badge from '../../assets/icons/profile_member_badge.svg';
import platinum_badge from '../../assets/icons/platinum_badge.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { countries, provinces, discricts } from '../../constants/countryInfo';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { emailValidator } from '../../helpers/helperFunctions';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../graphql/gql/user/user';

export default function Profile() {
  // Constants
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;
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
  });

  // States
  const [open, setOpen] = useState(false);
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
    bio: account?.bio || '',
    gender: account?.gender || 'male',
    country: account?.country || countries[0].value,
    countryIndex: 0,
    city: account?.city || provinces[0].value,
    cityIndex: 0,
    district: account?.district || discricts[0][0],
    phone: account?.phone || '',
    highSchool: account?.highSchool || '',
    university: account?.university || '',
    vocation: account?.vocation || '',
    currentJob: account?.currentJob || '',
    jobTitle: account?.jobTitle || '',
    annualIncome: account?.annualIncome || '',
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
      phone: false,
      highSchool: false,
      university: false,
      vocation: false,
      currentJob: false,
      jobTitle: false,
      annualIncome: false,
      profileImg: false,
    },
  });
  const [birthdate, setDate] = useState(new Date('2018-01-01T00:00:00.000Z'));
  const [profileImg, setImg] = useState([account?.avatar?.path] || []);
  const [imgReplacer, setImgReplacer] = useState([]);

  // Queries and Mutations
  const [updateAccount, { loading: updateLoading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: (data) => {
      console.log(data);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай шинэчлэгдлээ.',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log(error);
      handleSnackOpen({
        state: true,
        msg: 'Алдаа гарлаа.',
        type: 'error',
      });
    },
  });

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
      phone: account?.phone || '',
      highSchool: account?.highSchool || '',
      university: account?.university || '',
      vocation: account?.vocation || '',
      currentJob: account?.currentJob || '',
      jobTitle: account?.jobTitle || '',
      annualIncome: account?.annualIncome || '',
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
        phone: false,
        highSchool: false,
        university: false,
        vocation: false,
        currentJob: false,
        jobTitle: false,
        annualIncome: false,
        profileImg: false,
      },
    });
    setImg([account?.avatar?.path] || []);
    setImgReplacer([]);
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
        setImgReplacer(imgReplacer.concat({ file: files[0], path: urlAddress }));

        let imgs = [...profileImg];
        setImg(imgs.concat(files[0]));
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
      console.log(`obj.${prop} = ${fieldState.error[prop]}`);
      if (fieldState.error[prop]) {
        return handleSnackOpen({
          state: true,
          msg: 'Талбаруудыг бүрэн бөглөнө үү.',
          type: 'warning',
        });
      }
    }

    updateAccount({
      variables: {
        _id: account._id,
        familyname: fieldState.familyname,
        firstname: fieldState.firstname,
        lastname: fieldState.lastname,
        address: fieldState.address,
        email: fieldState.email,
        bio: fieldState.bio,
        gender: fieldState.gender,
        highSchool: fieldState.highSchool,
        university: fieldState.university,
        vocation: fieldState.vocation,
        currentJob: fieldState.currentJob,
        jobTitle: fieldState.jobTitle,
        annualIncome: fieldState.annualIncome,
        country: fieldState.country,
        city: fieldState.city,
        district: fieldState.district,
        phone: fieldState.phone,
        ...(fieldState.imgUpdated && { profileImg: profileImg }),
      },
    });
  };

  useEffect(() => {
    console.log(account);
  }, [account]);

  useEffect(() => {
    console.log(fieldState);
  }, [fieldState]);

  return (
    <div style={{ backgroundColor: '#252525', paddingBottom: '20px' }}>
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
      {/* Backdrop */}
      <Backdrop sx={{ color: '#fff' }} open={updateLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {/* Modal */}
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
          <Box className={classes.modalBox}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {imgReplacer.length > 0 ? (
                <Avatar
                  sx={{ height: 100, width: 100 }}
                  onClick={() => onImgDelete()}
                  src={imgReplacer[0].path}
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
                    {countries.map((option, index) => (
                      <MenuItem
                        onClick={() =>
                          handleFieldChange(
                            { target: { name: 'country', value: option.value } },
                            index
                          )
                        }
                        key={option.label}
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
                    {provinces.map((option, index) => (
                      <MenuItem
                        onClick={() =>
                          handleFieldChange(
                            { target: { name: 'city', value: option.value } },
                            index
                          )
                        }
                        key={option.label}
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
                    {discricts[fieldState.cityIndex].map((option) => (
                      <MenuItem key={option} value={option}>
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
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.phone}
                    error={fieldState.error.phone}
                    name={'phone'}
                    id='phone-textfield'
                    label='Phone'
                    helperText={fieldState.error.phone ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
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
                  <Typography>Эрэгтэй</Typography>
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
                  <Typography>Эмэгтэй</Typography>
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
                    value={fieldState.currentJob}
                    error={fieldState.error.currentJob}
                    name={'currentJob'}
                    id='currentJob-textfield'
                    label='Current job'
                    helperText={fieldState.error.currentJob ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.jobTitle}
                    error={fieldState.error.jobTitle}
                    name={'jobTitle'}
                    id='jobTitle-textfield'
                    label='Job title'
                    helperText={fieldState.error.jobTitle ? 'Incorrect entry.' : ' '}
                    onChange={(e) => handleFieldChange(e)}
                    className={classes.textFieldSquare}
                  />
                </div>
                <div className={classes.fieldDiv}>
                  <TextField
                    fullWidth
                    value={fieldState.annualIncome}
                    error={fieldState.error.annualIncome}
                    name={'annualIncome'}
                    id='annualIncome-textfield'
                    label='Annual income'
                    helperText={fieldState.error.annualIncome ? 'Incorrect entry.' : ' '}
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
      {/* Body */}
      <Container disableGutters maxWidth={false} className={classes.root}>
        <div className={classes.rootRow}>
          <div className={classes.sliderItemBackImg} />
          <div className={classes.sliderItemContainer}>
            <div className={classes.row1}>
              {/* Profile  */}
              <div className={classes.textContainer}>
                <div className={classes.profile_badge}>
                  <img
                    src={platinum_badge}
                    alt={'platinum badge'}
                    style={{ paddingBottom: 20, width: 60 }}
                  />
                </div>
                <div className={classes.avatar}>
                  {account?.avatar ? (
                    <img
                      alt={'avatar 3'}
                      src={account?.avatar?.path}
                      className={classes.avatarImage}
                    />
                  ) : (
                    <Avatar sx={{ width: 100, height: 100 }}>
                      <Typography fontSize={35} color={'white'} fontWeight={'bolder'}>
                        {account?.firstname?.charAt(0)}
                      </Typography>
                    </Avatar>
                  )}
                </div>
                <Typography className={classes.title}>
                  {(account?.firstname || '') + ' ' + (account?.lastname || '')}
                </Typography>
                <Typography align={'center'} className={classes.email}>
                  {account?.email || ''}
                </Typography>
                <div className={classes.row}>
                  {[
                    { name: 'My sales', icon: Sale },
                    { name: 'Members', icon: Members },
                    { name: 'My rate', icon: Rate },
                    { name: 'Favorite', icon: Heart },
                  ].map((item, index) => (
                    <div className={classes.column} key={index + 'shitty'}>
                      <img src={item?.icon} className={classes.icons} alt={'sale'} />
                      <div className={classes.saleText}>{item?.name}</div>
                      <div className={classes.saleCount}>{index}</div>
                    </div>
                  ))}
                </div>
                {/* Update profile */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => handleModalOpen()}
                    className={classes.updateButton}
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
              {/* MEMBERS */}
              <div className={classes.memberContainer}>
                <div className={classes.memberTop}>
                  <div className={classes.memberTitle}>MEMBERS</div>
                  <Button
                    className={classes.memberTitleSEE}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    SEE ALL
                  </Button>
                </div>
                <div className={classes.memberSmallProfiles}>
                  {[1, 2, 3].map((item, index) => {
                    return (
                      <div key={index + 'shit'} className={classes.smallProfile}>
                        <div className={classes.smallProfileAvatar}>
                          {account?.avatar ? (
                            <img
                              alt={'avatar 3'}
                              src={account?.avatar?.path}
                              className={classes.avatarImage}
                            />
                          ) : (
                            <Avatar sx={{ width: 100, height: 100 }}>
                              <Typography
                                fontSize={35}
                                color={'white'}
                                fontWeight={'bolder'}
                              >
                                {item.toString().charAt(0)}
                              </Typography>
                            </Avatar>
                          )}
                          <div className={classes.smallProfileTitle}>Gantulga</div>
                          <div className={classes.smallProfileRank}>
                            <StarIcon className={classes.starRank} />
                            {item}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Fucking SALES */}
            <div className={classes.mySales}>MY SALES</div>
            <div className={classes.myDiv}>
              <img src={Test} style={{ height: '300px', width: '200px' }} alt='test1' />
              <img src={Test} style={{ height: '300px', width: '200px' }} alt='test2' />
              <img src={Test} style={{ height: '300px', width: '200px' }} alt='test3' />
              <img src={Test} style={{ height: '300px', width: '200px' }} alt='test4' />
              <img src={Test} style={{ height: '300px', width: '200px' }} alt='test5' />
            </div>
          </div>
          <div className={classes.membersAdvantage}>
            <div className={classes.membersAdvantageContaint}>
              <div>
                <img src={Plat} className={classes.membersLogo} alt={'plat'} />
              </div>
              <div className={classes.membersTextContainer}>
                <div className={classes.membersTitle}>PLATINIUM MEMBERS ADVENTAGE</div>
                <div className={classes.membersDescription}>
                  Ideally, architects of houses design rooms to meet the needs of the
                  people who will live in the house. Feng shui, originally a Chinese
                  method of moving houses according to such factors as rain and micro-
                  climates, has recently expanded its scope to address the design of
                  interior spaces, with a view to promoting harmonious effects on the
                  people living inside the house, although no actual effect has ever…
                </div>
                <div className={classes.membersButtonContainer}>
                  <Button className={classes.membersButton}>SEE ALL</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.mySales}>MY SALES</div>
          <div className={classes.myDiv}>
            <img src={Test} style={{ height: '300px', width: '200px' }} alt={''} />
            <img src={Test} style={{ height: '300px', width: '200px' }} alt={''} />
            <img src={Test} style={{ height: '300px', width: '200px' }} alt={''} />
            <img src={Test} style={{ height: '300px', width: '200px' }} alt={''} />
            <img src={Test} style={{ height: '300px', width: '200px' }} alt={''} />
          </div>

          <div className={classes.aboutContainers}>
            <div className={classes.aboutContainer}>
              <div className={classes.aboutGenerel}>
                {/* <img src={Avatar} className={classes.aboutGenerelImg} alt={''} /> */}
                <Typography className={classes.title}>{'Gantumur Batmunkh'}</Typography>
                <Typography className={classes.email1}>batmunkh@gmail.com</Typography>
              </div>
              <div className={classes.aboutMe}>
                <div className={classes.aboutMeTitle}>ABOUT ME</div>
                <div className={classes.aboutMeDescription}>
                  Ideally, architects of houses design rooms to meet the needs of the
                  people who will live in the house. Feng shui, originally a Chinese
                  method of moving houses according to such factors as rain and
                  micro-climates, has recently expanded its scope to address the design of
                  interior spaces, with a view to promoting harmonious effects on the
                  people living inside the house, although no actual effect has ever been
                  demonstrated. Feng shui can also mean the “aura” in or around a
                  dwelling, making it comparable to the real estate sales concept of
                  “indoor-outdoor flow”.
                </div>
              </div>
            </div>
            {/* The fucking CV */}
            <div className={classes.aboutCv}>
              <table>
                <thead>
                  <tr>
                    <th className={classes.aboutMeTitle}>CV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Name</td>
                    <td className={classes.td}>Irmuunzaya</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Years</td>
                    <td className={classes.td}>1988.05.06</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Education</td>
                    <td className={classes.td}>
                      USA,Oxford Univercity, International Management{' '}
                    </td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Work experience</td>
                    <td className={classes.td}>Google Group, Marketing Manager</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>References</td>
                    <td className={classes.td}>English, Spanish, Germany</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Career</td>
                    <td className={classes.td}>Mongolian Leader Manager</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Certifications</td>
                    <td className={classes.td}>International TOP Manager 2012</td>
                  </tr>
                  <tr className={classes.tableBorder}>
                    <td className={classes.tdF}>Projects</td>
                    <td className={classes.td}>Golomt bank </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const useStyles = makeStyles({
  profileImg: {
    '&:hover': {
      filter: 'blur(1px)',
      cursor: 'pointer',
    },
  },
  checkboxDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  textFieldSquare: {
    marginRight: 5,
    marginLeft: 5,
  },
  fieldDiv: {
    minHeight: 78,
    width: '100%',
    marginRight: 5,
    marginLeft: 5,
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 30,
    overflow: 'auto',
    maxHeight: '90%',
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  updateModalDiv: {
    marginTop: 30,
    outline: 'none',
  },
  updateButton: {
    marginTop: 20,
    borderRadius: 0,
    color: 'white',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
  },
  profile_badge: {
    backgroundImage: `url(${profile_member_badge})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  tableBorder: {
    display: 'flex',
    width: '100%',
    padding: '5px',
    borderBottom: '1px solid #F0F0F0',
  },
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: '100%',
    fontFamily: 'Roboto Condensed',
    backgroundColor: colors.backgroundColor,
  },
  tdF: {
    textAlign: 'left',
    width: '50%',
    fontWeight: '300',
  },
  td: {
    textAlign: 'left',
    width: '50%',
  },
  aboutGenerelImg: {
    width: '150px',
    borderRadius: '100%',
    marginBottom: '20px',
  },
  aboutMeDescription: {
    textAlign: 'justify',
    fontWeight: '300',
    fontSize: '26px',
  },
  aboutCv: {
    width: '30%',
    height: '100%',
    backgroundColor: 'white',
    padding: '20px',
  },
  aboutMeTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: colors.brandTextColor,
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  aboutMe: {
    padding: '20px',
  },
  aboutContainer: {
    display: 'flex',
    backgroundColor: 'white',

    width: '70%',
    marginRight: '10px',
  },
  aboutContainers: {
    display: 'flex',
    margin: ' 0px 40px',
    justifyContent: 'space-between',
  },
  aboutGenerel: {
    padding: '40px',
    borderRight: '1px solid #CBCBCB',
  },
  membersButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  membersButton: {
    display: 'flex',
    width: '100px',
    borderRadius: 0,
    justifyContent: 'center',
    marginTop: '20px',
    color: 'white',
    padding: '5px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
  },
  rootRow: {
    backgroundColor: colors.backgroundColor,
    height: 'auto',
  },
  starRank: {
    fontSize: '18px',
  },
  membersTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
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
  },
  membersDescription: {
    color: 'black',
    fontSize: '20px',
  },
  membersAdvantage: {},
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
  },
  memberSmallProfiles: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px',
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
    color: colors.brandTextColor,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  memberContainer: {
    display: 'flex',
    minWidth: (props) => (props.phone ? '100%' : '60%'),
    flexDirection: 'column',
  },
  avatarImage: {
    width: '80px',
    height: '80px',
    borderRadius: '100%',
  },
  memberTop: {
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  memberTitle: {
    color: colors.brandTextColor,
    fontSize: '28px',
    fontWeight: 'bold',
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
  },
  faceIcon: {
    fontSize: '80px',
    border: `1px dashed ${colors.brandTextColor}`,
    borderRadius: '100%',
    marginBottom: '10px',
  },
  slider: {
    minHeight: '520px',
    maxHeight: 540,
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
    fontFamily: 'Roboto Condensed',
  },
  saleCount: {
    fontSize: '22px',
    color: '#D38F63',
    marginTop: '5px',
    fontWeight: 'bold',
    fontFamily: 'Roboto Condensed',
  },
  sliderItemBackImg: {
    boxShadow:
      ' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5),rgba(37,37,37,1) 100%), url(${props.backgroundImg})`,
    backgroundColor: 'lightgray',
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: (props) => (props?.phone ? '600px' : '500px'),
    marginBottom: 60,
    width: '100%',
    justifyContent: 'center',
  },
  sliderItemContainer: {
    dislay: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 99,
    transform: 'translate(0px, -100%)',
    height: (props) => (props?.phone ? '600px' : '500px'),
    marginBottom: 10,
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    backgroundColor: '#171717',
    width: '220px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '100px',
    margin: '90px',
    marginTop: '10px',
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
    fontFamily: "'Roboto Condensed', sans-serif",
    marginTop: (props) => (props?.phone ? 10 : 60),
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
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: '700',
    marginRight: '10px',
    fontSize: (props) => (props?.phone ? 8 : 18),
  },
  avatarColumnTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '300',
    fontFamily: "'Roboto Condensed', sans-serif",
    color: 'white',
    fontSize: (props) => (props?.phone ? 4 : 12),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: (props) => (props?.phone ? 18 : 18),
    fontFamily: "'Roboto Condensed', sans-serif",
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
    fontFamily: "'Roboto Condensed', sans-serif",
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
  thirtyPercentSquare: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 27,
    zIndex: 999,
    backgroundColor: colors.orange,
  },
  thirtyPercentRound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 70,
    zIndex: 10,
    backgroundColor: colors.orange,
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
  dots_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dot_active: {
    height: 15,
    width: 30,
    backgroundColor: colors.brandTextColor,
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator_active: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
});
