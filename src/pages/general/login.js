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
import jamuh_logo from '../../assets/icons/Jamuh_logo.png';
import jamuh_text from '../../assets/icons/Jamuh_text.png';
import { makeStyles } from '@mui/styles';
import json2mq from 'json2mq';
import grayBlob from '../../assets/background/grayBlob.svg';
import colors from '../../constants/colors';
import TheContext from '../../context/context';
import { Alert } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../../api/account';

export default function LoginPage() {
  let history = useHistory();

  const [renderLoading, setRenderLoading] = useState(true);
  const [checked, setChecked] = useState(1);
  const [usernameState, setUsenameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
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

  const sendLogin = () => {
    if (!usernameState || !passwordState) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбарын утга хоосон байна',
        type: 'warning',
      });
    } else if (passwordState.length < 4) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг хамгийн багадаа 4 оронтой байна.',
        type: 'warning',
      });
    } else {
      login(usernameState, passwordState)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('jamukh_token', res?.data?.token);
            localStorage.setItem('jamukh_auth', 'true');
            handleSnackOpen({
              state: true,
              msg: 'Амжилттай нэвтэрлээ.',
              type: 'success',
            });
            setTimeout(() => {
              window.location.replace('/');
            }, 1000);
          } else {
            handleSnackOpen({
              state: true,
              msg: 'Нэвтрэх хаяг буруу байна',
              type: 'error',
            });
          }
        })
        .catch((e) => {
          console.log(e);
          handleSnackOpen({
            state: true,
            msg:
              e.message === 'user.not.found'
                ? 'Хэрэглэгч олдсонгүй'
                : 'Нэр үг эсвэл нууц үг буруу байна.',
            type: 'error',
          });
        });
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

  useEffect(() => {
    setRenderLoading(false);
  }, []);

  return (
    <div className={classes.container}>
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
          {renderLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 1} mountOnEnter unmountOnExit>
              <div className={classes.inputItem1}>
                {/* Logo */}
                <div className={classes.logo}>
                  <img src={jamuh_logo} alt={'jamukh_png'} />
                  <img
                    src={jamuh_text}
                    className={classes.jamuhLogo}
                    alt={'jamukh_text'}
                  />
                </div>
                {/* Input */}
                <InputBase
                  className={classes.textfield}
                  type={'text'}
                  value={usernameState}
                  onChange={(e) => handleUsernameState(e.target.value)}
                  placeholder={'PHONE & EMAIL'}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendLogin();
                    }
                  }}
                />
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
                  placeholder={'PASSWORD'}
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
  jamuhLogo: {
    marginTop: '10px',
    height: '20px',
  },
  root: {
    height: '100%',
    padding: '100px',
    backgroundColor: '#252525',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#252525',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '60px',
  },
  icon: {
    position: 'absolute',
    zIndex: 10,
    top: '35px',
    left: '100px',
    cursor: 'pointer',
  },
  blobContainer: {
    height: '100%',
  },
  inputContainer: {
    width: '100%',
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
    backgroundColor: '#ffffff30',
    outlineColor: 'transparent !important',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    color: '#FFFFFF80',
    fontWeight: '700',
  },
  textfieldSlide3: {
    backgroundColor: '#ffffff30',
    color: '#FFFFFF80',
    outlineColor: 'transparent !important',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    height: 52,
    fontWeight: '700',
  },
  button: {
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    height: 45,
    borderRadius: 10,
    marginTop: 30,
    '&:hover': {
      background:
        'linear-gradient(198.42deg, #F8D4A0 -50.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
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
      backgroundColor: 'lightgray',
      color: 'black',
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
