import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Background from '../../assets/images/home.png'

export default function Home(props) {
  const classes = useStyles(props);
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

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState({ ...snackbarState, open: false });
  };



  return (
    <div className={classes.background}>
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
    
      <div className={classes.footer}>
         <Footer phone={phoneSize} tablet={tabletSize}  />
      </div>
    </div>
  );


}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  background:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    position:'relative',
    backgroundImage:`url(${Background})`,
    backgroundPosition:"center",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    height:"100vh"
  },
  footer:{
    position:"sticky",
    top: "calc( 100vh - 60px )",
    width:"100%",
  }
})