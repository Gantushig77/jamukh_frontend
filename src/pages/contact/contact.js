import React, { useState, useContext } from 'react';
import Appbar from '../components/appbar/appbar';
import Footer from '../components/footer/footer';
import {
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Modal,
  Fade,
  Box,
  Backdrop,
  CircularProgress,
  Button,
} from '@mui/material';
import theContext from '../context/context';
import { url } from '../constants/constants';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import mapImg from '../assets/mapImg.jpg';

export default function Contact() {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [critics, setCritics] = useState('');
  const [modalState, setModalState] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  // Context
  const contextHook = useContext(theContext);
  const contextVal = contextHook.contextVal;
  const contextText = contextVal.contextText;

  let mail = {
    to: 'sgantushig@gmail.com',
    subject: `Хэрэглэгчээс санал хүсэлт ирлээ!`,
    fullname: `${fullname}`,
    email: email,
    from: `libravrstudio@gmail.com`,
    critics: `${critics}`,
    phone: `${phone}`,
  };

  // Handlers
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

  const handleModalClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setModalState(false);
  };

  const sendEmail = () => {
    if (fullname.length < 1) {
      return handleSnackOpen({
        state: true,
        msg: 'Бүтэн нэрээ оруулна уу.',
        type: 'warning',
      });
    } else if (phone.length < 1) {
      return handleSnackOpen({
        state: true,
        msg: 'Утасны дугаараа оруулна уу.',
        type: 'warning',
      });
    } else if (email.length < 1) {
      return handleSnackOpen({
        state: true,
        msg: 'Имэйл хаягаа оруулна уу.',
        type: 'warning',
      });
    } else if (critics.length < 1) {
      return handleSnackOpen({
        state: true,
        msg: 'Санал хүсэлтээ оруулна уу.',
        type: 'warning',
      });
    } else {
      setModalState(true);
      axios
        .post(url.base + 'email/send-email', mail)
        .then((res) => {
          console.log(res);
          setModalState(false);
          handleSnackOpen({
            state: true,
            msg: 'Амжилттай илгээлээ.',
            type: 'success',
          });
        })
        .catch((e) => {
          console.log(e);
          setModalState(false);
          handleSnackOpen({
            state: true,
            msg: 'Алдаа гарлаа.',
            type: 'error',
          });
        });
    }
  };

  return (
    <div>
      <Appbar />
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarState?.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackbarState?.severity}
          sx={{ width: '100%' }}
        >
          <Typography style={{ fontFamily: 'Helvetica' }}>
            {snackbarState?.message}
          </Typography>
        </Alert>
      </Snackbar>
      {/* Modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={modalState}
        onClose={handleModalClose}
        closeAfterTransition
        disableEscapeKeyDown
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <Box
            sx={{
              outline: 'none',
              borderRadius: '10px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CircularProgress sx={{ mr: 2 }} />
              <div>
                <Typography id='transition-modal-title' variant='h6' component='h2'>
                  Уншиж байна.
                </Typography>
                <Typography id='transition-modal-title'>
                  Уншиж дуустал хүлээнэ үү.
                </Typography>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* Body */}
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
          marginBottom: '40px',
          maxWidth: '1440px',
        }}
      >
        <div style={{ width: '50%', marginRight: 20 }}>
          <Typography
            sx={{
              paddingBottom: '10px',
              marginBottom: '20px',
              borderBottom: '1px solid black',
              color: '#C8A457',
            }}
          >
            {contextText?.contactUs?.title}
          </Typography>
          <div style={{ backgroundColor: 'transparent', height: 420, width: '100%' }}>
            <div>
              <img
                onClick={() =>
                  window.open(
                    'https://www.google.com/maps/place/Orange+Plaza/@47.9239781,106.9051597,296m/data=!3m1!1e3!4m5!3m4!1s0x5d96927de52a3f39:0xe7081ccfed425970!8m2!3d47.9239186!4d106.9050301',
                    '_blank'
                  )
                }
                src={mapImg}
                alt='map'
                style={{
                  cursor: 'pointer',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 50 }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: 500,
                marginTop: '20px',
              }}
            >
              <LocationOnIcon sx={{ marginRight: '10px' }} />
              {contextText?.contactUs?.address}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <EmailIcon sx={{ marginRight: '10px' }} />
              {'info@erkhetmongol.mn'}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <CallIcon sx={{ marginRight: '10px' }} />
              {'7610 9080'}
            </Typography>
          </div>
        </div>
        <div style={{ width: '50%', marginLeft: 20 }}>
          <Typography
            sx={{
              paddingBottom: '10px',
              marginBottom: '20px',
              borderBottom: '1px solid black',
              color: '#C8A457',
            }}
          >
            {contextText?.contactUs?.title2}
          </Typography>
          <div
            style={{
              borderRadius: 10,
              border: '1px solid black',
              backgroundColor: 'white',
            }}
          >
            <Typography
              sx={{
                backgroundColor: '#031544',
                color: 'white',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              {contextText?.contactUs?.subtitle}
            </Typography>
            <Typography
              sx={{
                padding: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
                fontSize: '14px',
              }}
            >
              {contextText?.contactUs?.subtitle2}
            </Typography>
            <div style={{ paddingRight: 20, paddingLeft: 20, padding: 20 }}>
              {/* Full name */}
              <TextField
                sx={{ mb: 2, width: '100%' }}
                id='outlined-basic'
                label={contextText?.contactUs?.name}
                variant='outlined'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {/* Phone number */}
              <TextField
                sx={{ mb: 2, width: '100%' }}
                id='outlined-basic'
                label={contextText?.contactUs?.phone}
                variant='outlined'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* Email */}
              <TextField
                sx={{ mb: 2, width: '100%' }}
                id='outlined-basic'
                label={contextText?.contactUs?.email}
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Critics */}
              <TextField
                multiline
                maxRows={4}
                rows={4}
                sx={{ mb: 2, width: '100%' }}
                id='outlined-basic'
                label={contextText?.contactUs?.message}
                variant='outlined'
                value={critics}
                onChange={(e) => setCritics(e.target.value)}
              />
              <Button
                onClick={() => sendEmail()}
                fullWidth
                variant='contained'
                sx={{ backgroundColor: '#031544' }}
              >
                {contextText?.contactUs?.submit}
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}