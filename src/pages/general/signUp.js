import React, { useContext, useState } from 'react';
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
import OtpInput from 'react-otp-input';
import { useMutation } from '@apollo/client';
import {
  CONFIRM_PHONE,
  REGISTER_ACCOUNT,
  REGISTER_WITH_PHONE,
  SEND_PHONE_OTP,
} from '../../graphql/gql/user/user';
import { Alert } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TransitionModal from '../../components/modal/customModal';
import SMwhite from '../../assets/icons/khuree_market_white.svg';
import SMPurple from '../../assets/icons/SM.svg';

export default function SignUp() {
  const history = useHistory();

  const [checked, setChecked] = useState(1);
  const [otpState, setOtpState] = useState();
  const [checkboxState, setCheckboxState] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [phoneState, setPhoneState] = useState('');
  const [usenameState, setUsenameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordVerifyState, setPasswordVerifyState] = useState('');

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
    checked,
    trigger: triggerSize,
  });
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const [registerPhone, { loading: rpLoading }] = useMutation(REGISTER_WITH_PHONE, {
    onCompleted(data) {
      localStorage.setItem('jamukh_token', data.registerWithPhone);
      console.log('submit phone register done.');
      console.log(data);
      sendPhoneOtp();
      handleCheck(2);
    },
    onError(error) {
      console.log('submit phone error occured.');
      console.log(error.message);
      handleSnackOpen({
        state: true,
        msg: error.message,
        type: 'error',
      });
    },
  });

  const handleCheck = (num) => {
    setChecked(num);
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

  const handlePhoneStateChange = (phone) => {
    if (phone.length <= 8) setPhoneState(phone);
  };

  const handlePhoneSubmit = (phone) => {
    if (phoneState.length < 8) {
      return handleSnackOpen({
        state: true,
        msg: 'Утасны дугаар хоосон эсвэл дутуу байна',
        type: 'warning',
      });
    }
    registerPhone({ variables: { phone: phone } });
  };

  const handleOtp = (txt) => {
    setOtpState(txt);
  };

  const [sendPhoneOtp, { loading: otpLoading }] = useMutation(SEND_PHONE_OTP, {
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e.message);
      handleSnackOpen({
        state: true,
        msg: e.message,
        type: 'error',
      });
    },
  });

  const [confirmPhone, { loading: confirmLoading }] = useMutation(CONFIRM_PHONE, {
    onCompleted(data) {
      if (data) {
        console.log(data);
      } else {
        handleSnackOpen({
          state: true,
          msg: 'ОТР таарсангүй',
          type: 'warning',
        });
      }
    },
    onError(e) {
      console.log(e);
      handleSnackOpen({
        state: true,
        msg: 'ОТР таарсангүй',
        type: 'error',
      });
    },
  });

  const handleOtpSubmit = () => {
    confirmPhone({ variables: { otp: otpState.toString() } })
      .then((data) => {
        console.log('sent otp');
        console.log(data);
        handleCheck(3);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUsernameState = (str) => {
    setUsenameState(str.length > 0 ? str.toLowerCase() : str);
  };

  const handlePasswordState = (num) => {
    setPasswordState(num);
  };

  const handlePasswordVerify = (num) => {
    setPasswordVerifyState(num);
  };

  const [registerAccount, { loading: raLoading }] = useMutation(REGISTER_ACCOUNT, {
    onCompleted(data) {
      localStorage.setItem('jamukh_token', data.registerMe.token);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай бүртггүүллээ.',
        type: 'success',
      });
      setTimeout(() => {
        history.push('/');
      }, 1000);
    },
    onError(e) {
      console.log(e);
      handleSnackOpen({
        state: true,
        msg: 'Алдаа гарлаа.',
        type: 'error',
      });
    },
  });

  const submitAccountRegistration = () => {
    if (!checkboxState) {
      handleSnackOpen({
        state: true,
        msg: 'Үйлчилгээний нөхцөлийг зөвшөөрнө үү.',
        type: 'warning',
      });
    } else if (
      usenameState &&
      passwordState.length > 7 &&
      passwordState === passwordVerifyState
    ) {
      registerAccount({
        variables: {
          username: usenameState,
          password: passwordState,
        },
      });
    } else if (!usenameState || !passwordState || !passwordVerifyState) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбарын утга хоосон байна',
        type: 'warning',
      });
    } else if (passwordState !== passwordVerifyState) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг зөрж байна',
        type: 'warning',
      });
    } else if (passwordState.length < 8) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг доод тал нь 8 урттай байх хэрэгтэй',
        type: 'warning',
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

  const handleModalOpen = () => {
    setModalState(true);
  };

  const handleModalClose = () => {
    setModalState(false);
  };

  const handleTermsState = (bool) => {
    setCheckboxState(bool);
  };

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
            left: phoneSize ? 0 : 25,
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
      {/* Modal */}
      <TransitionModal
        open={modalState}
        agreeClick={() => handleTermsState(true)}
        cancelClick={() => handleTermsState(false)}
        handleClose={handleModalClose}
      />
      {/* Input container */}
      <Container className={classes.inputContainer}>
        {/* Phone */}
        <>
          {rpLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 1} mountOnEnter unmountOnExit>
              <div className={classes.inputItem1}>
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.signUp.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.signUp.description}
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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handlePhoneSubmit(phoneState);
                    }
                  }}
                />
                {/* Submit to next page */}
                <Button
                  onClick={() => handlePhoneSubmit(phoneState)}
                  className={classes.button}
                >
                  {contextText.signUp.title}
                </Button>
              </div>
            </Fade>
          )}
        </>
        {/* OTP */}
        <>
          {otpLoading ? (
            // Loading icon
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 2} mountOnEnter unmountOnExit>
              <div className={classes.inputItem2}>
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.signUp.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.signUp.otpDesc}
                </Typography>
                {/* Otp Input */}
                <div
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleOtpSubmit();
                    }
                  }}
                >
                  <OtpInput
                    isInputNum
                    value={otpState}
                    onChange={handleOtp}
                    numInputs={6}
                    containerStyle={classes.otpContainerStyle}
                    inputStyle={phoneSize ? classes.otpInputPhone : classes.otpInputStyle}
                    focusStyle={phoneSize ? classes.otpFocusPhone : classes.otpFocusStyle}
                  />
                </div>
                {/* Submit */}
                <Button onClick={() => handleOtpSubmit()} className={classes.button}>
                  {contextText.signUp.otpButton}
                </Button>
              </div>
            </Fade>
          )}
        </>
        {/* Info */}
        <>
          {confirmLoading || raLoading ? (
            <CircularIndeterminate />
          ) : (
            <Fade in={checked === 3} mountOnEnter unmountOnExit>
              <div
                className={classes.inputItem3}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    submitAccountRegistration();
                  }
                }}
              >
                {/* Title */}
                <Typography className={classes.title}>
                  {contextText.signUp.title}
                </Typography>
                {/* Description */}
                <Typography className={classes.description}>
                  {contextText.signUp.passDesc}
                </Typography>
                {/* Username */}
                <Typography className={classes.labelSlide3}>
                  {contextText.signUp.username}
                </Typography>
                {/* Input username */}
                <InputBase
                  type={'text'}
                  value={usenameState}
                  className={classes.textfieldSlide3}
                  onChange={(e) => handleUsernameState(e.target.value)}
                  placeholder={'Батаа...'}
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
                />
                {/* Password Verify */}
                <Typography className={classes.labelSlide3}>
                  {contextText.signUp.passwordVerify}
                </Typography>
                {/* Input password verify */}
                <InputBase
                  type={passType.verify}
                  value={passwordVerifyState}
                  className={classes.textfieldSlide3}
                  onChange={(e) => handlePasswordVerify(e.target.value)}
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
                {/* Terms and conditions */}
                <Container disableGutters className={classes.termsContainer}>
                  <Checkbox
                    checked={checkboxState}
                    onChange={handleModalOpen}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Typography className={classes.termsText}>
                    {contextText.signUp.termsAndConditions}
                  </Typography>
                </Container>
                {/* Submit */}
                <Button
                  onClick={() => submitAccountRegistration()}
                  className={classes.button}
                >
                  {contextText.signUp.title}
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
  icon: {
    position: 'absolute',
    zIndex: 10,
    top: '35px',
    left: '100px',
    cursor: 'pointer',
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
  blobContainer: {
    width: '50%',
    height: '100%',
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
  inputContainer: {
    width: '100%',
    textAlign: 'start',
    position: 'absolute',
    right: (props) => (props.phone ? 20 : '7%'),
    top: '20%',
    zIndex: 10,
    maxWidth: (props) => (props.phone ? '90%' : 400),
    backgroundColor: (props) =>
      props.phone ? 'transparent' : props.trigger ? 'white' : 'transparent',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: (props) =>
      props?.phone ? 'none' : props.trigger ? '0 0 20px #ccc' : 'none',
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
    top: (props) => (props.phone ? '-100px' : '-350px'),
    display: (props) => (props?.phone ? 'none' : 'block'),
    left: '-30%',
    overflow: 'hidden',
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
  termsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    color: colors.gray,
  },
});
