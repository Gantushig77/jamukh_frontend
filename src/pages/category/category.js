import React, { useState, useEffect } from 'react';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Section from '../../components/listContantainer/section1/Section1';
import { getCategoryAds } from '../../api/ads';
import HashLoader from 'react-spinners/HashLoader';

export default function Category(props) {
  const classes = useStyles(props);
  const [ads, setAds] = useState([]);
  const categoryId = props.id;
  const limit = 100;
  const [isLoading, setLoading] = useState(true);
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

  useEffect(() => {
    getCategoryAds(categoryId, limit)
      .then((res) => {
        console.log(res?.data);
        setAds(res?.data?.ads);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        handleSnackOpen({
          state: true,
          msg:
            e.message === 'user.not.found'
              ? 'Хэрэглэгч олдсонгүй'
              : 'Нэр үг эсвэл нууц үг буруу байна.',
          type: 'error',
        });
      });
  }, [categoryId]);

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  return (
    <div className={classes.background}>
      <Appbar phone={props?.phone} tablet={props?.tablet} />
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
      {isLoading === true ? (
        <div className={classes.isLoading}>
          <HashLoader color='#D38F63' loading={true} size={120} />
        </div>
      ) : (
        <div className={classes.section}>
          <Section
            data={ads}
            bg={props?.bg}
            title={props?.title}
            phone={props?.phone}
            tablet={props?.tablet}
          />
        </div>
      )}

      <div className={classes.footer}>
        <Footer phone={props?.phone} tablet={props?.tablet} />
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  section: {
    width: (props) => (props?.phone ? '100%' : '1300px'),
  },
  isLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
    backgroundImage: (props) => `url(${props?.bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  },
  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 20px )',
    width: '100%',
  },
});
