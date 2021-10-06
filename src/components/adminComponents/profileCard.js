import React from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import ImgCore from '../core/imgCore';
import { CSS_HELPER } from '../../constants/helper';
import MoreMenuCore from '../core/moreMenuCore';
import Time from '../../assets/icons/time.svg';
import { PLACE_HOLDER } from '../../constants/placeholder';

export default function ProfileCard({
  userImage = PLACE_HOLDER.user,
  fullName = '[Хэрэглэгчийн нэр]',
  username = '[Нэвтрэх нэр]',
  marginRight = '36px',
  marginLeft = '',
  marginTop = '',
  marginBottom = '36px',
  options = [
    {
      title: '[сонголт]',
      onClick: () => {
        alert('Функц оруулна уу');
      },
    },
  ],
}) {
  const classes = useStyles();
  const style = {
    marginRight: marginRight,
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  return (
    <div className={classes.root} style={{ ...style }}>
      <div className={classes.about}>
        <ImgCore src={userImage} className={classes.image} />
        <div className={classes.aboutContainer}>
          <h1 className={classes.name}>{fullName}</h1>
          <h2 className={classes.username}>{username}</h2>
        </div>
      </div>
      <div className={classes.menu}>
        <img src={Time} className={classes.time} alt='time' />
        <MoreMenuCore options={options} />
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    padding: '21px',
    borderRadius: '17px',
    paddingTop: '17px',
    width: '384px',
    height: '84px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
    transition: 'all 0.2s',
    '&:nth-child(3n-1)': {
      backgroundColor: '#6A67D30d',
      boxShadow: '0 0 0 rgba(0,0,0,0.15)',
    },
    '&:nth-child(3n)': {
      backgroundColor: '#F95A480d',
      boxShadow: '0 0 0 rgba(0,0,0,0.15)',
    },
    '&:hover': {
      boxShadow: '0px 2px 5px 3px rgba(0,0,0,0.05)',
    },
  },
  about: {
    display: 'flex',
  },
  aboutContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '46px',
    height: '46px',
    borderRadius: '11px',
    objectFit: 'cover',
    marginRight: '17px',
  },
  name: {
    ...CSS_HELPER.initializeFont,

    fontSize: '17px',
    color: 'black',
  },
  username: {
    ...CSS_HELPER.initializeFont,
    marginTop: '4px',
    fontFamily: 'SF Pro Display',
    fontSize: '14px',
    color: colors.gray70,
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55px',
  },
  time: {
    width: '20px',
    height: '20px',
  },
}));
