import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import JAMUH from '../../assets/icons/Jamuh.svg';
import Facebook from '../../assets/social/facebook-logo.png';
import Google from '../../assets/social/google-browser.png';
import Twitter from '../../assets/social/twitter.png';
import Instagram from '../../assets/social/instagram.png';
import Youtube from '../../assets/social/youtube.png';

export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          disableElevation
          // startIcon={<img src={SM} style={{ height: '30px' }} alt={''} />}
        >
          <img src={JAMUH} style={{ height: '20px' }} alt={''} />
        </Button>
        <div className={classes.address}>
          МОНГОЛ УЛС, Улаанбаатар хот, Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслан “Гранд
          Маршал” Хотхон
        </div>

        <div className={classes.social}>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.buttonLegal}
          >
            <img src={Facebook} className={classes.socialIcon} alt={''} />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.buttonLegal}
          >
            <img src={Twitter} className={classes.socialIcon} alt={''} />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.buttonLegal}
          >
            <img src={Google} className={classes.socialIcon} alt={''} />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.buttonLegal}
          >
            <img src={Instagram} className={classes.socialIcon} alt={''} />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.buttonLegal}
          >
            <img src={Youtube} className={classes.socialIcon} alt={''} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    borderTop: '1px solid gray',
    display: 'flex',
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    width: '100%',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    width: '1300px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    display: 'flex',
    alignItems: 'center',
  },
  socialIcon: {
    height: '15px',
    border: '1px solid white',
    padding: '8px',
    borderRadius: '100%',
    transition: 'border 0.5s',
    '&:hover': {
      border: '1px solid #AA6139',
    },
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: colors.gray,
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '17px'),
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  address: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '14px'),
    fontFamily: 'Roboto Condensed',
    fontWeight: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    width: '320px',
  },
  buttonLegal: {
    marginTop: (props) => (props.phone ? 0 : 30),
    marginBottom: 30,
    backgroundColor: 'transparent',
    color: colors.gray,
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '17px'),
    fontFamily: 'Roboto Condensed',
    textAlign: 'justify',
    fontWeight: 'normal',
    textTransform: 'none',
    maxWidth: 340,
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});
