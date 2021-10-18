import React, { useContext, useState, useEffect } from 'react';
import {
  useMediaQuery,
  InputBase,
  Button,
  Typography,
  Container,
  Fade,
  CircularProgress,
  Snackbar,
  IconButton,
  Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import json2mq from 'json2mq';
import blob1 from '../../assets/background/signUpBlob.svg';
import grayBlob from '../../assets/background/grayBlob.svg';
import signUpOverlay1 from '../../assets/images/signUpOverlay1.png';
import signUpOverlay2 from '../../assets/images/signUpOverlay2.png';
import colors from '../../constants/colors';
import TheContext from '../../context/context';
import { useMutation } from '@apollo/client';
import {
  LOGIN,
  LOGIN_WITH_FB,
  RESET_PASSWORD,
  REQUEST_PASSWORD_CHANGE,
  CONFIRM_PASSWORD_CHANGE_REQUEST,
} from '../../graphql/gql/user/user';
import { Alert } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SMwhite from '../../assets/icons/khuree_market_white.svg';
import SMPurple from '../../assets/icons/SM.svg';
import OtpInput from 'react-otp-input';
import FacebookLogin from 'react-facebook-login';
import facebookIcon from '../../assets/icons/facebook.svg';

export default function SignUp() {
  const history = useHistory();
  const [renderLoading, setRenderLoading] = useState(true);
  const [checked, setChecked] = useState(1);
  const [otpState, setOtpState] = useState();
  const [usernameState, setUsenameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [phoneState, setPhoneState] = useState('');
  const [newPasswordState, setNewPasswordState] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);

  const [passType, setPassType] = useState({
    pass: 'password',
    verify: 'password',
  });

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const triggerSize = useMediaQuery('(max-width: 1220px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const classes = useStyles({
    phone: phoneSize,
    tablet: tabletSize,
    trigger: triggerSize,
    checked,
  });
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const handleOtp = (txt) => {
    setOtpState(txt);
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

  const handleUsernameState = (str) => {
    setUsenameState(str);
  };

  const handlePasswordState = (num) => {
    setPasswordState(num);
  };

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted(data) {
      console.log(data.login);
      localStorage.setItem('token', data?.login);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай нэвтэрлээ.',
        type: 'success',
      });
      setTimeout(() => {
        history.push('/');
      }, 1000);
    },
    onError(e) {
      console.log(e);
      console.log(e.message);
      handleSnackOpen({
        state: true,
        msg:
          e?.message === 'user.not.found'
            ? 'Хэрэглэгч олдсонгүй'
            : 'Нэр үг эсвэл нууц үг буруу байна.',
        type: 'error',
      });
    },
  });

  const [loginWithFb] = useMutation(LOGIN_WITH_FB, {
    onCompleted(data) {
      window.localStorage.setItem('token', data.loginWithFb);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай нэвтэрлээ.',
        type: 'success',
      });
      setTimeout(() => {
        history.push('/');
      }, 1000);
    },
    onError(e) {
      handleSnackOpen({
        state: true,
        msg: 'Нэр эсвэл нууц үг буруу байна',
        type: 'error',
      });
      console.log(e);
    },
  });

  const sendLogin = () => {
    if (!usernameState || !passwordState) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбарын утга хоосон байна',
        type: 'warning',
      });
    } else if (passwordState.length < 8) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг хамгийн багадаа 8 оронтой байна.',
        type: 'warning',
      });
    } else {
      login({ variables: { loginUser: usernameState, password: passwordState } });
    }
  };

  const handlePassType = (num) => {
    if (num === 1)
      setPassType({
        ...passType,
        pass: passType.pass === 'password' ? 'text' : 'password',
      });
    if (num === 2)
      setPassType({
        ...passType,
        verify: passType.verify === 'password' ? 'text' : 'password',
      });
  };

  const handleCheckboxState = () => {
    setCheckboxState(!checkboxState);
  };

  const handleCheck = (num) => {
    setChecked(num);
  };

  const [requestPasswordChange, { loading: loadPasswordRequest }] = useMutation(
    REQUEST_PASSWORD_CHANGE,
    {
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e);
        handleSnackOpen({
          state: true,
          msg: 'Дугаар бүртгэлгүй',
          type: 'error',
        });
      },
    }
  );

  const handlePhoneStateChange = (phone) => {
    setPhoneState(phone);
  };

  const handlePhoneSubmit = () => {
    if (phoneState.length < 8) {
      return handleSnackOpen({
        state: true,
        msg: 'Утасны дугаарын орон дутуу байна',
        type: 'warning',
      });
    }
    requestPasswordChange({
      variables: {
        phone: phoneState.toString(),
      },
    })
      .then(() => {
        handleCheck(3);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [confirmPasswordChangeRequest, { loading: otpLoading }] = useMutation(
    CONFIRM_PASSWORD_CHANGE_REQUEST,
    {
      onCompleted(data) {
        console.log(data);
        localStorage.setItem('token', data.confirmPasswordChangeRequest);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const otpConfirm = () => {
    if (otpState.length === 6)
      confirmPasswordChangeRequest({
        variables: {
          phone: phoneState,
          otp: otpState,
        },
      })
        .then(() => {
          handleCheck(4);
        })
        .catch((e) => {
          console.log(e);
        });
    else
      handleSnackOpen({
        state: true,
        msg: 'OTP буруу байна.',
        type: 'error',
      });
  };

  const [resetPassword, { loading: resetPassLoading }] = useMutation(RESET_PASSWORD, {
    onCompleted(data) {
      console.log(data);
      setTimeout(() => {
        history.push('/');
      }, 1000);
    },
    onError(err) {
      console.log(err);
      handleSnackOpen({
        state: true,
        msg: 'Алдаа гарлаа',
        type: 'error',
      });
    },
  });

  const submitRestPassword = () => {
    if (newPasswordState.length > 7 && newPasswordRepeat === newPasswordState) {
      resetPassword({
        variables: {
          password: newPasswordState,
        },
      })
        .then(() => {
          handleSnackOpen({
            state: true,
            msg: 'Амжилттай',
            type: 'success',
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (!newPasswordState || !newPasswordRepeat) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбарын утга хоосон байна',
        type: 'warning',
      });
    } else if (newPasswordState !== newPasswordRepeat) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг зөрж байна',
        type: 'warning',
      });
    } else if (newPasswordState.length < 8) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг доод тал нь 8 урттай байх хэрэгтэй',
        type: 'warning',
      });
    }
  };

  const handleNewPassword = (num) => {
    setNewPasswordState(num);
  };

  const handleNewPasswordRepeat = (num) => {
    setNewPasswordRepeat(num);
  };

  const responseFacebook = (response) => {
    if (response.error) {
      handleSnackOpen({
        state: true,
        msg: 'Холбогдоход алдаа гарлаа.',
        type: 'waning',
      });
      console.log(response.error);
    } else {
      loginWithFb({
        variables: {
          fbId: response?.id,
          password: response?.id,
          email: response?.email,
          firstName: response?.first_name,
          lastName: response?.last_name,
          birthDate: response?.birthday,
          gender: response?.gender,
          ...(response?.picture
            ? {
                picture: {
                  height: response?.picture.data.height,
                  width: response?.picture.data.width,
                  url: response?.picture.data.url,
                },
              }
            : null),
        },
      });
    }
    console.log(response);
  };

  useEffect(() => {
    setRenderLoading(false);
  }, []);

  return (
    <div className={classes.container}>
      {/* Blob and overlay images */}
      <>
        <img src={blob1} alt={'sign up blob 1'} className={classes.blob} />
        <img
          src={signUpOverlay1}
          alt={'sign up overlay 1'}
          className={classes.overlay1}
        />
        <img
          src={signUpOverlay2}
          alt={'sign up overlay 2'}
          className={classes.overlay2}
        />
        <div
          className={classes.icon}
          style={{
            backgroundColor: 'transparent',
            borderRadius: 10,
            padding: 10,
            paddingRight: 15,
            paddingLeft: 15,
            left: phoneSize ? 20 : 25,
          }}
        >
          <img
            src={phoneSize ? SMPurple : SMwhite}
            onClick={() => history.push('/')}
            alt={'brand'}
          />
        </div>
      </>
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
      {/* Input container */}
      <Container className={classes.inputContainer}>
        {/* Login */}
        <>
          {loginLoading || renderLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 1} mountOnEnter unmountOnExit>
              <div className={classes.inputItem1}>
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.login.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.login.description}
                </Typography>
                {/* Phone */}
                <Typography className={classes.label}>
                  {contextText.login.username}
                </Typography>
                {/* Input */}
                <InputBase
                  className={classes.textfield}
                  type={'text'}
                  value={usernameState}
                  onChange={(e) => handleUsernameState(e.target.value)}
                  placeholder={'Хэрэглэгч...'}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendLogin();
                    }
                  }}
                />
                {/* Password */}
                <Typography className={classes.labelSlide3}>
                  {contextText.signUp.password}
                </Typography>
                {/* Input password */}
                <InputBase
                  type={passType.pass}
                  value={passwordState}
                  className={classes.textfieldSlide3}
                  onChange={(e) => handlePasswordState(e.target.value)}
                  endAdornment={
                    <IconButton
                      color='primary'
                      className={classes.endAdornmentIcon}
                      onClick={() => handlePassType(1)}
                      aria-label='see password'
                    >
                      {passType.pass === 'password' ? (
                        <VisibilityIcon htmlColor={'gray'} />
                      ) : (
                        <VisibilityOffIcon htmlColor={'gray'} />
                      )}
                    </IconButton>
                  }
                  placeholder={'********'}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendLogin();
                    }
                  }}
                />
                {/* Remember me & forgot password */}
                <Container disableGutters className={classes.rememberOuterContainer}>
                  <Container disableGutters className={classes.rememberContainer}>
                    <Checkbox
                      checked={checkboxState}
                      onChange={handleCheckboxState}
                      inputProps={{ 'aria-label': 'сануулах' }}
                    />
                    <Typography className={classes.rememberText}>
                      {contextText.login.remember}
                    </Typography>
                  </Container>
                  <Container disableGutters className={classes.forgotContainer}>
                    <Typography
                      onClick={() => handleCheck(2)}
                      className={classes.forgotText}
                    >
                      {contextText.login.forgot}
                    </Typography>
                  </Container>
                </Container>
                {/* Submit to next page */}
                <Button onClick={() => sendLogin()} className={classes.button}>
                  {contextText.login.title}
                </Button>
                <div className={classes.fbFlexDiv}>
                  {/* THE FB LOGIN SECTION !!! */}
                  <FacebookLogin
                    appId={'517106409387369'}
                    fields='first_name,last_name,email,picture'
                    scope='public_profile,email'
                    redirectUri={'https://khureemarket.mn'}
                    disableMobileRedirect
                    callback={(e) => responseFacebook(e)}
                    cssClass={classes.fb_button_mobile}
                    onFailure={(e) => console.log(e)}
                    textButton={'FACEBOOK'}
                    icon={
                      <img
                        src={facebookIcon}
                        alt={'facebook black'}
                        className={classes.fb_logo}
                      />
                    }
                  />
                  {/* THE FB LOGIN SECTION !!! */}
                  <Button
                    onClick={() => history.push('/sign-up')}
                    className={classes.transparentButton}
                  >
                    {contextText.signUp.title}
                  </Button>
                </div>
              </div>
            </Fade>
          )}
        </>
        {/* Phone verify */}
        <>
          {loadPasswordRequest ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 2} mountOnEnter unmountOnExit>
              <div
                className={classes.inputItem2}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePhoneSubmit();
                  }
                }}
              >
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.forgot.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.forgot.description}
                </Typography>
                {/* Phone */}
                <Typography className={classes.label}>
                  {contextText.signUp.phone}
                </Typography>
                {/* Input */}
                <InputBase
                  className={classes.textfield}
                  type={'number'}
                  value={phoneState}
                  onChange={(e) => handlePhoneStateChange(e.target.value)}
                  placeholder={'9981...'}
                />
                {/* Submit to next page */}
                <Button onClick={() => handlePhoneSubmit()} className={classes.button}>
                  {contextText.forgot.send}
                </Button>
              </div>
            </Fade>
          )}
        </>
        {/* Phone verify page */}
        <>
          {otpLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 3} mountOnEnter unmountOnExit>
              <div
                className={classes.inputItem3}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    otpConfirm();
                  }
                }}
              >
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.forgot.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.forgot.description}
                </Typography>
                {/* Otp Input */}
                <OtpInput
                  isInputNum
                  value={otpState}
                  onChange={handleOtp}
                  numInputs={6}
                  containerStyle={classes.otpContainerStyle}
                  inputStyle={phoneSize ? classes.otpInputPhone : classes.otpInputStyle}
                  focusStyle={phoneSize ? classes.otpFocusPhone : classes.otpFocusStyle}
                />
                {/* Submit */}
                <Button onClick={() => otpConfirm()} className={classes.button}>
                  {contextText.signUp.otpButton}
                </Button>
              </div>
            </Fade>
          )}
        </>
        {/* New password submit page */}
        <>
          {resetPassLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 4} mountOnEnter unmountOnExit>
              <div
                className={classes.inputItem4}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    submitRestPassword();
                  }
                }}
              >
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.forgot.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.forgot.passDesc}
                </Typography>
                {/* Password */}
                <Typography className={classes.labelSlide3}>
                  {contextText.signUp.password}
                </Typography>
                {/* Input password */}
                <InputBase
                  type={passType.pass}
                  value={newPasswordState}
                  className={classes.textfieldSlide3}
                  onChange={(e) => handleNewPassword(e.target.value)}
                  endAdornment={
                    <IconButton
                      color='primary'
                      className={classes.endAdornmentIcon}
                      onClick={() => handlePassType(1)}
                      aria-label='see password'
                    >
                      {passType.pass === 'password' ? (
                        <VisibilityIcon htmlColor={'gray'} />
                      ) : (
                        <VisibilityOffIcon htmlColor={'gray'} />
                      )}
                    </IconButton>
                  }
                  placeholder={'********'}
                />
                {/* Password Verify */}
                <Typography className={classes.labelSlide3}>
                  {contextText.signUp.passwordVerify}
                </Typography>
                {/* Input password verify */}
                <InputBase
                  type={passType.verify}
                  value={newPasswordRepeat}
                  className={classes.textfieldSlide3}
                  onChange={(e) => handleNewPasswordRepeat(e.target.value)}
                  placeholder={'********'}
                  endAdornment={
                    <IconButton
                      color='primary'
                      className={classes.endAdornmentIcon}
                      onClick={() => handlePassType(2)}
                      aria-label='see password'
                    >
                      {passType.verify === 'password' ? (
                        <VisibilityIcon htmlColor={'gray'} />
                      ) : (
                        <VisibilityOffIcon htmlColor={'gray'} />
                      )}
                    </IconButton>
                  }
                />
                {/* Submit */}
                <Button onClick={() => submitRestPassword()} className={classes.button}>
                  {contextText.login.otpButton}
                </Button>
              </div>
            </Fade>
          )}
        </>
      </Container>
      <div className={classes.grayBlobContainer}>
        <img src={grayBlob} alt={'mobile blob'} className={classes.grayBlob} />
      </div>
    </div>
  );
}

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}

const otpInputStyle = {
  backgroundColor: colors.lightGray,
  color: 'black',
  outline: 'none',
  borderRadius: 10,
  paddingLeft: 10,
  paddingRight: 10,
  height: 40,
  border: 'none',
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    backgroundColor: colors.lightGray,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    height: '100%',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    zIndex: 10,
    top: '35px',
    left: '100px',
    cursor: 'pointer',
  },
  blobContainer: {
    width: '50%',
    height: '100%',
  },
  inputContainer: {
    width: '100%',
    textAlign: 'start',
    position: 'absolute',
    right: (props) => (props.phone ? 20 : '7%'),
    top: (props) => (props.phone ? '20%' : '20%'),
    zIndex: 10,
    maxWidth: (props) => (props.phone ? '90%' : 400),
    backgroundColor: (props) =>
      props?.phone ? 'transparent' : props.trigger ? 'white' : 'transparent',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: (props) =>
      props.phone ? 'none' : props.trigger ? '0 0 20px #ccc' : 'none',
  },
  otpContainerStyle: {
    marginTop: 20,
    color: 'black',
  },
  otpInputStyle: {
    ...otpInputStyle,
    marginRight: 15,
    width: '26px !important',
    fontSize: 24,
  },
  otpInputPhone: {
    ...otpInputStyle,
    marginRight: 10,
    width: '17px !important',
    fontSize: 17,
  },
  otpFocusStyle: {
    ...otpInputStyle,
    marginRight: 15,
    width: '22px !important',
    fontSize: 24,
    border: '2px solid #6A67D3',
    height: 36,
  },
  otpFocusPhone: {
    ...otpInputStyle,
    marginRight: 10,
    height: 36,
    width: '13px !important',
    fontSize: 17,
    border: '2px solid #6A67D3',
  },
  inputItem1: {
    display: (props) => (props.checked === 1 ? 'block' : 'none'),
  },
  inputItem2: {
    display: (props) => (props.checked === 2 ? 'block' : 'none'),
  },
  inputItem3: {
    display: (props) => (props.checked === 3 ? 'block' : 'none'),
  },
  inputItem4: {
    display: (props) => (props.checked === 4 ? 'block' : 'none'),
  },
  description: {
    maxWidth: '100%',
    fontSize: '14px',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    textAlign: 'left',
    color: colors.gray,
    marginTop: 20,
  },
  title: {
    fontSize: '27px',
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.black,
  },
  label: {
    fontSize: '14px',
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    textAlign: 'left',
    color: colors.black,
    marginTop: 50,
  },
  labelSlide3: {
    fontSize: '14px',
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    textAlign: 'left',
    color: colors.black,
    marginTop: 5,
  },
  textfield: {
    backgroundColor: colors.lightGray,
    outlineColor: 'transparent !important',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  textfieldSlide3: {
    backgroundColor: colors.lightGray,
    outlineColor: 'transparent !important',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    height: 52,
  },
  button: {
    backgroundColor: colors.lightPurple,
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    height: 45,
    borderRadius: 10,
    marginTop: 30,
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  transparentButton: {
    backgroundColor: 'transparent',
    color: 'gray',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: (props) => (props.trigger || props.phone ? 0 : 10),
    width: '100%',
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  overlay1: {
    display: (props) => (props.phone ? 'none' : 'block'),
    maxWidth: 600,
    minWidth: 240,
    height: 'auto',
    width: '60%',
    position: 'absolute',
    zIndex: 10,
    top: 300,
    left: 200,
    overflow: 'hidden',
  },
  overlay2: {
    display: (props) => (props.phone ? 'none' : 'block'),
    maxWidth: 500,
    minWidth: 240,
    height: 'auto',
    width: '100%',
    position: 'absolute',
    zIndex: 6,
    top: 150,
    left: 50,
    overflow: 'hidden',
  },
  blob: {
    maxWidth: 1200,
    minWidth: 250,
    height: 'auto',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    display: (props) => (props.phone ? 'none' : 'block'),
    top: (props) => (props.phone ? '-100px' : '-350px'),
    left: '-30%',
    overflow: 'hidden',
  },
  grayBlobContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    overflow: 'hidden',
  },
  grayBlob: {
    maxWidth: (props) => (props.phone ? '90%' : 1200),
    height: 'auto',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: (props) => (props.phone ? -200 : '-350px'),
    display: (props) => (props.phone ? 'block' : 'none'),
    right: '-35%',
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: '30%',
    marginBottom: '30%',
  },
  rememberContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxWidth: '50%',
  },
  forgotContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxWidth: '50%',
    justifyContent: 'flex-end',
  },
  rememberOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: colors.gray,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: colors.gray,
    textAlign: 'end',
    '&:hover': {
      color: colors.lightPurple,
      cursor: 'pointer',
    },
  },
  fb_button_mobile: {
    borderRadius: 10,
    backgroundColor: 'white',
    border: '1px solid lightgray',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: '10px',
    fontSize: 14,
    marginTop: 20,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'gray',
    fontWeight: '600',
    width: (props) => (props.trigger || props.phone ? '100%' : 'auto'),
  },
  fb_logo: {
    paddingRight: 10,
  },
  fbFlexDiv: {
    display: 'flex',
    flexDirection: (props) => (props.tablet || props.trigger ? 'column' : 'row'),
    justifyContent: 'space-between',
  },
});
