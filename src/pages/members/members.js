import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { useHistory } from 'react-router';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Section1 from './section1/Section1';


export default function Members() {
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const history = useHistory();

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

  const handleGoodsDetail = (id) => {
    history.push(`/goods-detail?id=${id}`);
  };

  return (
    <div style={{backgroundColor:"#252525",paddingBottom:"20px"}}>
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
        <Section1/>
    </div>
  );
}
