import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../../assets/logo/jamukh_black.png';
import Background from '../../assets/images/home.png';
import Apartment from '../../assets/background/apartment.jpg';
import AboutUs from '../../assets/background/about_us.png';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

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
    <div className={classes.root}>
      <Appbar phone={phoneSize} tablet={tabletSize} linkColor={'#000000'} />
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
      <div style={{ position: 'absolute', zIndex: 4 }}>
        <img src={logo} alt={'jamukh logo'} style={{ maxWidth: 250 }} />
      </div>
      <AutoplaySlider bullets={false} fillParent infinite play interval={5000}>
        <div className={classes.background}>1</div>
        <div className={classes.background2}>2</div>
        <div className={classes.background3}>3</div>
      </AutoplaySlider>
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} linkColor={'#FFFFFF'} />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'transparent',
  },
  background2: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Apartment})`,
    backgroundPosition: 'center',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'transparent',
  },
  background3: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${AboutUs})`,
    backgroundPosition: 'center',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'transparent',
  },
  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 60px )',
    width: '100%',
    zIndex: 2,
  },
});
