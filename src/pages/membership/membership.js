import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Section2 from './section2/Section2';
import { makeStyles } from '@mui/styles';
import Background from '../../assets/background/news.png'
import Appbar from '../../components/appbar/appbar';


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

  return (
    <div
     className={classes.root}
    >
       <Appbar phone={phoneSize} tablet={tabletSize} />
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
      <Section2 phone={phoneSize} tablet={tabletSize} />
      <Footer phone={phoneSize} tablet={tabletSize} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
    padding: '0px',
    position:'relative',
    backgroundImage:`url(${Background})`,
    backgroundPosition:"center",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    fontFamily: "'Roboto Condensed', sans-serif",
  },
})
