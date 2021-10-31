import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import Section1 from '../../components/home/section1/Section1';
import Section2 from '../../components/home/section2/Section2';
import Section3 from '../../components/home/section3/Section3';
import Section4 from '../../components/home/section4/Section4';
import { useHistory } from 'react-router';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';

export default function Home() {
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
    <div style={{backgroundColor:"#252525"}}>
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
      <Section1 phone={phoneSize} tablet={tabletSize} />
      <Section2 onCardSelect={handleGoodsDetail} phone={phoneSize} tablet={tabletSize} />
      <Section3 onCardSelect={handleGoodsDetail} phone={phoneSize} tablet={tabletSize} />
      <Footer phone={phoneSize} tablet={tabletSize}  style={{flexShrink:"0"}}/>
    </div>
  );
}
