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
import colors from '../../constants/colors';
import TheContext from '../../context/context';
import { Alert } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login, signUp ,sendOtpCode , singUpInfo} from '../../api/account';
import Login from '../../assets/background/login.png';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';


export default function LoginPage() {

  const [renderLoading, setRenderLoading] = useState(false);
  const [checked, setChecked] = useState(1);
  const [usernameState, setUsenameState] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState('');
  const [firstnameState, setFirstnameState] = useState('');
  const [lastnameState, setLastnameState] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);
  const [tab, setTab] = useState(false);
  const [otpInput , setOtpInput] = useState(false);
  const [otpCode , setOtpCode] = useState('');
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
  
  const sendSignUp = () => {
    setRenderLoading(true);
    if (!firstnameState || !lastnameState || !passwordState || !checkPassword || !phone || !email || !rank) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбарын утга хоосон байна',
        type: 'warning',
      });
      setRenderLoading(false);
    } 
    else if (passwordState !== checkPassword) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг таарахгүй байна',
        type: 'warning',
      });
      setRenderLoading(false);
    }
    else if (passwordState.length < 4) {
      handleSnackOpen({
        state: true,
        msg: 'Нууц үг хамгийн багадаа 4 оронтой байна.',
        type: 'warning',
      });
      setRenderLoading(false);
    }
    else if (phone.length < 8) {
      handleSnackOpen({
        state: true,
        msg: 'Утасны дугаар буруу байна.',
        type: 'warning',
      });
      setRenderLoading(false);
    } else {
      signUp(phone)
      .then((res) => {
        handleSnackOpen({
          state: true,
          msg:res.data.msg,
          type: 'success',
        });
           if(res.data.msg === "An account with the phone number already exists"||res.data.msg === "The OTP code is incorrect"){
            handleSnackOpen({
              state: true,
              msg:res.data.msg,
              type: 'error',
            });
            setRenderLoading(false);
           }
          else{
            setOtpInput(true);
            setRenderLoading(false);
          }
           
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
    }
  };

  const sendOtp = () => {
    setRenderLoading(true);

    sendOtpCode(phone,parseInt(otpCode))
      .then((res) => {
        if(res.data.msg === "OTP code is correct. Please enter your password."){
          singUpInfo( firstnameState,lastnameState ,passwordState ,rank,phone,email,parseInt(otpCode))
          .then((res) => {
            handleSnackOpen({
              state: true,
              msg:res.data.msg,
              type: 'success',
            });
            localStorage.setItem('jamukh_token', res?.data?.token);
            localStorage.setItem('jamukh_auth', 'true');
            setTimeout(() => {
              window.location.replace('/');
            }, 1000);
          })
          .catch((e) => {
            setRenderLoading(false);
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
        else{
            handleSnackOpen({
              state: true,
              msg:res.data.msg,
              type: 'error',
            });
          }
          
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

  

  return (
    <div className={classes.container}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
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
      <div className={classes.containerEnd}>
        <Container className={classes.inputContainer}>
          {/* Login */}
          {tab === false ? (
            <>
              {renderLoading === true ? (
                <CircularIndeterminate />
              ) : (
                <Fade in={checked === 1} mountOnEnter unmountOnExit>
                  <div className={classes.inputItem1}>
                    {/* Logo */}
                    <div className={classes.tabs}>
                      <div
                        className={tab === true ? classes.tab : classes.activeTab}
                        style={{ borderRight: '1px solid #e6e6e61e' }}
                        onClick={() => {
                          setTab(false);
                        }}
                      >
                        Нэвтрэх
                      </div>
                      <div
                        className={tab === false ? classes.tab : classes.activeTab}
                        onClick={() => {
                          setTab(true);
                        }}
                      >
                        Бүртгүүлэх
                      </div>
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
                  </div>
                </Fade>
              )}
            </>
          ) : (
            <>
              {renderLoading === true ? (
                <CircularIndeterminate />
              ) : (
                <Fade in={checked === 1} mountOnEnter unmountOnExit>
                  <div className={classes.inputItem1}>
                    {/* Logo */}
                    <div className={classes.tabs}>
                      <div
                        className={tab === true ? classes.tab : classes.activeTab}
                        style={{ borderRight: '1px solid #e6e6e61e' }}
                        onClick={() => {
                          setTab(false);
                        }}
                      >
                        Нэвтрэх
                      </div>
                      <div
                        className={tab === false ? classes.tab : classes.activeTab}
                        onClick={() => {
                          setTab(true);
                        }}
                      >
                        Бүртгүүлэх
                      </div>
                    </div>

                  {otpInput === false ?
                        <>
                        {/* InputFirst */}
                        <InputBase
                          className={classes.textfield}
                          type={'text'}
                          value={firstnameState}
                          onChange={(e) => setFirstnameState(e.target.value)}
                          placeholder={'Овог'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />
                        {/* InputLast */}
                        <InputBase
                          className={classes.textfield}
                          type={'text'}
                          value={lastnameState}
                          onChange={(e) => setLastnameState(e.target.value)}
                          placeholder={'Нэр'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />
                        {/* Input phone */}
                        <InputBase
                          className={classes.textfield}
                          type={'number'}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={'Дугаар'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />
                         <InputBase
                          className={classes.textfield}
                          type={'text'}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={'Email'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />    
                        {/* Input level */}
                        <FormControl fullWidth className={classes.level}>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            variant='outlined'
                            value={rank || 'test'}
                            placeholder='test'
                            renderValue={
                              rank !== ''
                                ? undefined
                                : () => <div className={classes.placeHolderLevel}>Зэрэг</div>
                            }
                            onChange={(e) => setRank(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  color: '#C19D65',
                                  fontWeight: '100',
                                },
                              },
                            }}
                            itemProp={{
                              style: {
                                color: 'red',
                              },
                            }}
                          >
                            <MenuItem value={6}>Энгийн</MenuItem>
                            <MenuItem value={5}>Bronze</MenuItem>
                            <MenuItem value={4}>Silver</MenuItem>
                            <MenuItem value={3}>Gold</MenuItem>
                            <MenuItem value={2}>Platinium</MenuItem>
                            <MenuItem value={1}>VIP</MenuItem>
                          </Select>
                        </FormControl>
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
                          placeholder={'Нууц үг'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />
                        {/* Input password */}
                        <InputBase
                          type={passType.pass}
                          value={checkPassword}
                          className={classes.textfieldSlide3}
                          onChange={(e) => setCheckPassword(e.target.value)}
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
                          placeholder={'Баталгаажуулах нууц үг'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendSignUp();
                            }
                          }}
                        />
    
                        {/* Submit to next page */}
                        <Button onClick={() => sendSignUp()} className={classes.button}>
                           Бүртгүүлэх
                        </Button>
                        </>
                        :
                        <>
                        <InputBase
                        className={classes.textfield}
                        type={'number'}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder={'Code'}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            sendOtp();
                          }
                        }}
                      />
                         <Button onClick={() => sendOtp()} className={classes.button}>
                           Илгээх
                        </Button>
                      </>  
                        }
          
                  </div>
                </Fade>
              )}
            </>
          )}
        </Container>
      </div>
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} />
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
  placeHolderLevel: {
    display: 'flex',
    justifyContent: 'center',
    color: '#FFFFFF80',
    fontWeight: '100',
  },
  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 60px )',
    width: '100%',
    backgroundColor: (props) => (props.phone ? 'rgb(37,37,37,1)' : 'rgb(37,37,37,0.7)'),
  },
  jamuhLogo: {
    marginTop: '10px',
    height: '20px',
  },
  root: {
    height: '100%',
    padding: '100px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    fontFamily: 'Roboto, sans-serif',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${Login})`,
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
    padding: '60px 20px',
    width: (props) => (props.phone ? '100%' : '50%'),
    backgroundColor: (props) => (props.phone ? 'rgb(37,37,37,1)' : 'rgb(37,37,37,0.7)'),
    borderRadius: '10px',
    boxShadow: (props) =>
      props.phone ? 'none' : props.trigger ? '0 0 20px #ccc' : 'none',
  },
  containerEnd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    width: (props) => (props.phone ? '100%' : '50%'),
    marginTop: (props) => (props.phone ? '120px' : '0px'),
    height:'100%'
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
    textAlign: 'left',
    color: colors.gray,
    marginTop: 20,
  },
  title: {
    fontSize: '27px',
    textAlign: 'left',
    color: colors.black,
  },
  label: {
    fontSize: '14px',
    textAlign: 'left',
    color: colors.black,
    marginTop: 50,
  },
  labelSlide3: {
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
    fontWeight: '100',
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
    fontWeight: '100',
  },
  button: {
    border: '1px solid #e6e6e61e',
    width: '100%',
    height: 45,
    borderRadius: 5,
    fontSize: '18px',
    fontWeight: 100,
    color: '#D38F36',
    marginTop: '20px',
    '&:hover': {
      background: '#A97045',
      color: 'white',
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
  level: {
    marginTop: '15px',
    backgroundColor: '#454C4C',
    borderRadius: '6px',
    color: '#F6F8FA!important',
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
    marginTop: '20px',
  },
  rememberText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '100',
  },
  forgotText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '100',
    textAlign: 'end',
    '&:hover': {
      color: '#CD864F',
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
  tabs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    color: 'white',
    fontWeight: '100',
    marginBottom: '20px',
  },
  tab: {
    textAlign: 'center',
    padding: '5px 20px',
    '&:hover': {
      color: '#cd864f6c',
      cursor: 'pointer',
    },
  },
  activeTab: {
    padding: '5px 20px',
    color: '#CD864F',
    cursor: 'pointer',
  },
});
