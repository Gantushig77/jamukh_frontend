import React, { useState, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Section2 from './section2/Section2';
import { makeStyles } from '@mui/styles';
import Background from '../../assets/background/news.png';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import TheContext from '../../context/context';

export default function News(props) {
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

  // Context
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <div className={classes.root}>
      <Appbar
        phone={phoneSize}
        tablet={tabletSize}
        className={classes.headerBackground}
      />
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
      <Section2 member_type={account.member_type} phone={phoneSize} tablet={tabletSize} />
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
    padding: '0px',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    height: (props) => (props.phone ? '80vh' : '20%'),
  },

  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 60px )',
    width: '100%',
  },
});
