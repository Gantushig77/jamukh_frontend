import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import './section.css';
import Background from '../../../assets/background/background.png';
import Title from '../../../components/title/title';
import StarIcon from '@mui/icons-material/Star';
import HashLoader from 'react-spinners/HashLoader';
import {
  Container,
  Typography,
  Alert,
  Snackbar,
  Pagination,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { getRealtor } from '../../../api/ads';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';

export default function Section2(props) {
  const classes = useStyles(props);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState({});
  const [dialogAvatar, setDialogAvatar] = useState('');
  const [dialogName, setDialogName] = useState('');
  const [dialogEmail, setDialogEmail] = useState('');
  const [dialogPhone, setDialogPhone] = useState('');
  const [isLoading, setLoading] = useState(true);

  const handlePagination = (event, value) => {
    setPage(value);
    setLoading(true);
  };
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

  const dialogClosed = () => {
    setOpen(false);
  };
  const dialogOpen = (img, email, phone, name) => {
    setOpen(true);
    setDialogAvatar(img);
    setDialogName(name);
    setDialogPhone(phone);
    setDialogEmail(email);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  useEffect(() => {
    getRealtor(page)
      .then((res) => {
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
  }, [page]);

  return (
    <div className={classes.container}>
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
      <Title name='Realtor' />
      {isLoading === true ? (
        <div className={classes.root}>
          <Container
            disableGutters
            maxWidth={false}
            className={classes.container}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <HashLoader color='#D38F63' loading={true} size={120} />{' '}
          </Container>
          :
        </div>
      ) : (
        <div className={classes.root}>
          <div className={classes.content}>
            {posts?.account_list?.map((realtor, index) => (
              <div
                key={index}
                className={classes.realtor}
                onClick={() => {
                  dialogOpen(
                    realtor.avatar.url,
                    realtor.email,
                    realtor.tel,
                    realtor.firstname
                  );
                }}
              >
                <img src={realtor.avatar.url} className={classes.avatar} alt='' />
                <div className={classes.nameText}>
                  <Typography noWrap>{realtor?.firstname}</Typography>
                  <Typography noWrap className={classes.lastname}>
                    {realtor?.lastname}
                  </Typography>
                </div>
                <div className={classes.smallProfileRank}>
                  <StarIcon sx={{ color: '#C19D65' }} className={classes.starRank} />
                  <Typography
                    color={'black'}
                    sx={{
                      paddingTop: '2px',
                      paddingLeft: '2px',
                      color: 'white',
                    }}
                    textAlign={'center'}
                  >
                    {realtor?.rating || 0}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.page}>
            <Pagination
              page={posts?.page}
              count={posts?.pageCount}
              onChange={handlePagination}
              className='rowProfilePage'
            />
          </div>
        </div>
      )}
      <Dialog onClose={dialogClosed} open={open} className={classes.dialogContent}>
        <img
          src={dialogAvatar}
          style={{ width: '250px', heigth: 'auto' }}
          alt='dialogue'
        />
        <DialogTitle>{dialogName}</DialogTitle>
        <div className={classes.dialogText}>
          <BsTelephone style={{ marginRight: '5px' }} />
          {dialogPhone}
        </div>
        <div className={classes.dialogText}>
          <MdOutlineMailOutline style={{ marginRight: '5px' }} />
          {dialogEmail}
        </div>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    marginTop: '40px',
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  dialogText: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  root: {
    padding: '20px',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 100,
    marginTop: '20px',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat, repeat',
    backgroundPosition: 'center',
    height: 'auto',
    backgroundSize: 'cover',
    borderRadius: '10px',
  },
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'grid',
    fontSize: '0',
    gridTemplateColumns: (props) => (props?.phone ? '100%' : '25% 25% 25% 25%'),
    width: '100%',
    maxWidth: '1200px',
    zIndex: '1',
  },
  realtor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid white',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      backgroundColor: '#151516',
      borderRadius: '10px',
    },
  },
  avatar: {
    height: '100px',
    width: '100px',
    borderRadius: '100%',
  },
  nameText: {
    display: 'flex',
    fontSize: '18px',
    color: 'white',
    marginTop: '15px',
    maxWidth: 150,
  },
  lastname: {
    marginLeft: '5px',
  },
  smallProfileRank: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5px',
    color: 'white',
    fontSize: '16px',
  },
});
