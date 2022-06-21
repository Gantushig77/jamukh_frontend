import React from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import MusicPlayer from '../musicPlayer/musicPlayer';
import music from '../../assets/Mariage_dAmour.mp3';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.address} style={{ fontSize: 16 }}>
          Бүх эрх хуулиар хамгаалагдсан. Jamukha Proporties © {new Date().getFullYear()}
        </div>
        <div style={{ marginRight: '10%' }}>
          <MusicPlayer url={music} />
        </div>
        <div className={classes.contact}>
          <Link
            className={classes.menuListItem}
            to='/contact'
            style={{ marginRight: '10px' }}
          >
            Холбоо барих
          </Link>
          <div className={classes.phoneNumber}>77779080</div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'center',
    color: (props) => props.linkColor || 'white',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    padding: '0 10px',
  },
  flexContainer: {
    display: 'flex',
    width: (props) => '100%',
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
  },
  menuListItem: {
    textDecoration: 'none',
    color: (props) => props.linkColor || 'white',
    cursor: 'position',
    '&:hover': {
      color: '#AA6139',
    },
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
    fontWeight: 300,
    color: (props) => props.linkColor || 'white',
    fontSize: (props) => (props.tablet ? '22px' : props.phone ? '12px' : '20px'),
    textDecoration: 'none',
    textTransform: 'none',
  },
  buttonLegal: {
    marginTop: (props) => (props.phone ? 0 : 30),
    marginBottom: 30,
    backgroundColor: 'transparent',
    color: colors.gray,
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '17px'),
    textAlign: 'justify',
    textTransform: 'none',
    maxWidth: 340,
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  contact: {
    fontWeight: 300,
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
  },
  contactText: {
    fontSize: (props) => (props?.tablet || props?.phone ? '14px' : '18px'),
    color: (props) => props.linkColor || 'white',
    fontWeight: 300,
    marginRight: '40px',
    textDecoration: 'none',
    '&:hover': {
      color: '#AA6139',
    },
  },
  phoneNumber: {
    color: '#C19D65',
    fontWeight: 300,
  },
});
