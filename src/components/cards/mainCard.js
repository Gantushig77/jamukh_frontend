import React from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import { CSS_HELPER } from '../../constants/helper';
import MoreMenuCore from '../core/moreMenuCore';
import { useState } from 'react';

export default function MainCard({
  name = '[Ангилал]',
  desc = '[Дэд ангилал]',
  marginRight = '',
  marginLeft = '',
  marginTop = '',
  marginBottom = '',
  onClick,
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
  const [hover, setHover] = useState(false);
  const style = {
    marginRight: marginRight,
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  return (
    <div
      className={classes.root}
      style={{ ...style }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className={`${classes.aboutContainer} `} onClick={onClick}>
        <h1 className={classes.name}>{name}</h1>
        <h2 className={classes.username}>{desc}</h2>
      </div>

      <div
        className={classes.menu}
        style={hover ? { display: 'flex', opacity: 1 } : { display: 'flex', opacity: 0 }}
      >
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
    width: '154px',
    height: '154px',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'all 0.2s',
    position: 'relative',
    boxShadow: '0 0 0 rgba(0,0,0,0.15)',
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
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '22px 21px',
    paddingTop: '0',
    cursor: 'pointer',
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

    fontSize: '21px',
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
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55px',
    position: 'absolute',
    top: 0,
    transition: 'all 0.5s',
    right: -10,
  },
}));
