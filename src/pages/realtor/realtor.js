import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Background from '../../assets/background/news.png';
import { makeStyles } from '@mui/styles';
import Footer from '../../components/footer/footer';
import { getRealtor } from '../../api/ads';
import Section2 from './section2/Section2';

export default function Detailnews(props) {
  const classes = useStyles(props);
  // const [page, setPage] = useState(1);
  const [posts, setPosts] = useState({});
  const [isLoading, setLoading] = useState(true);
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  useEffect(() => {
    getRealtor(1)
      .then((res) => {
        console.log(res, 'res.data');
        setPosts(res.data);
        setLoading(false);
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
  }, []);

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };
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
      <Section2
        phone={phoneSize}
        tablet={tabletSize}
        posts={posts}
        isLoading={isLoading}
      />
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
  },
  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 60px )',
    width: '100%',
  },
});
