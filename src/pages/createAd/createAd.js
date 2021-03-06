import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Section2 from './section2/Section2';
import Footer from '../../components/footer/footer';
import Background from '../../assets/background/profile.png'
export default function CreateAd() {

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const classes = useStyles({
    phone: phoneSize,
    tablet: tabletSize,
  });

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <div className={classes.root}>
      {/* Appbar */}
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
      {/* Slider */}
      {/* Body */}
      <Section2 phone={phoneSize} tablet={tabletSize} />
      <div className={classes.footer}>
           <Footer phone={phoneSize} tablet={tabletSize} />
       </div>
    </div>
  );
}

const useStyles = makeStyles({
  footer:{
    position:"sticky",
    top: "calc( 100vh - 20px )",
    width:"100%",
  },
  root: {
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    width: '100%',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    backgroundImage:`url(${Background})`,
    backgroundPosition:"center",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    minHeight:'100vh',
    color:'white',
    fontWeight:'100'
  },

});
