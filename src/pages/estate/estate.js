import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Slider from '../../components/slider/slider';
import Section2 from './section2/Section2';

export default function Estate() {
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
      style={{
        backgroundColor: '#252525',
        height: '100%',
        margin: '0px',
        padding: '0px',
      }}
    >
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
      <Slider phone={phoneSize} tablet={tabletSize} />
      <Section2 phone={phoneSize} tablet={tabletSize} />
      <Footer phone={phoneSize} tablet={tabletSize} />
    </div>
  );
}
