import React from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import { CSS_HELPER } from '../../constants/helper';
import MoreMenuCore from '../core/moreMenuCore';

export default function SubCard({
  name = '[Ангилал]',
  desc = '[Дэд ангилал]',
  price,
  marginRight = '',
  marginLeft = '',
  marginTop = '',
  marginBottom = '',
  onClick,
  isProduct,
  options = [
    {
      title: '[сонголт]',
      onClick: () => {
        alert('Функц оруулна уу');
      },
    },
  ],
  type,
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
      <div className={classes.aboutContainer} onClick={onClick}>
        <h1 className={classes.name}>{name}</h1>
        <div style={{ display: 'flex' }}>
          <h2 className={classes.username} style={{ paddingRight: 10 }}>
            {desc}
            {(isProduct ? ' ' : '₮ / ') + (type ? 'Ширхэг' : 'кг')}
          </h2>
          <h2 className={classes.username}>
            {price}
            {price ? '₮' + (type ? '/Ширхэг' : '/кг') : null}
          </h2>
        </div>
      </div>
      <div className={classes.menu}>
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
    paddingRight: 0,
    width: '342px',
    height: '84px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
    transition: 'all 0.2s',
    backgroundColor: '#6A67D30d',
    '&:nth-child(3n-1)': {
      backgroundColor: '#F95A480d',
      boxShadow: '0 0 0 rgba(0,0,0,0.15)',
    },
    '&:nth-child(3n)': {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
    },
    '&:hover': {
      boxShadow: '0px 2px 5px 3px rgba(0,0,0,0.05)',
    },
  },
  about: {
    display: 'flex',
  },
  aboutContainer: {
    cursor: 'pointer',
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
