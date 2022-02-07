import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';

export default function Footer(props) {
  const classes = useStyles(props);
    
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.address}>
        Jamukha Proporties © 2022 All rights reserved
        </div>

        <div className={classes.social}>
          <Link className={classes.menuListItem} to='/news' style={{marginRight:'10px'}}>
            Мэдээ
          </Link>  
          <Link className={classes.menuListItem} to='/about'>
            Бидний тухай
          </Link>  
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
    color:'white',
    fontWeight:'100',
    fontFamily: "'Roboto', sans-serif",
    fontSize:'16px',
    padding:'0 10px'
  },
  flexContainer: {
    display: 'flex',
    width:  (props) => '100%',
    flexDirection:(props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    display: 'flex',
    alignItems: 'center',
  },
  menuListItem:{
    textDecoration:'none',
    color:'white',
    cursor:'position',
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
    color: 'white',
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
});
