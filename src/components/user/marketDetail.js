import React, { useState } from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import sansarCover from '../../assets/images/sansarCover.png';
import starWhite from '../../assets/icons/starWhite.svg';
import time2 from '../../assets/icons/time2.svg';

export default function MarketDetail({
  data,
  setOrderModal = () => {},
  onClose = () => {},
}) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  return (
    <div className={classes.root} onClick={onClose}>
      <Container
        className={classes.container}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <img alt={'cover'} src={sansarCover} className={classes.image} />
        <div className={classes.row}>
          <Typography className={classes.marketName}>{data.name}</Typography>
          <Typography className={classes.rating}>
            {data.rating}
            <img src={starWhite} alt={'star'} className={classes.icon} />
          </Typography>
        </div>
        <Typography className={classes.description}>{data.description}</Typography>
        <Divider className={classes.divider} />
        <div className={classes.row}>
          <Typography className={classes.label}>{data.phone}</Typography> |
          <div className={classes.row}>
            <img src={time2} className={classes.icon} alt={'time'} />
            <Typography className={classes.workingHour}>
              {data.workingHour} цаг
            </Typography>
          </div>
        </div>
        <Divider className={classes.divider} />
        <Typography className={classes.label}>Хаяг</Typography>
        <Typography className={classes.description}>{data.address}</Typography>
        <Typography className={classes.label}>Хүргэлт</Typography>
        <Typography className={classes.description}>{data.delivery}</Typography>
        {hover && (
          <Typography
            className={classes.button}
            onClick={(e) => {
              e.stopPropagation();
              setOrderModal(true);
            }}
          >
            Захиалах
          </Typography>
        )}
      </Container>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    // backgroundColor: "transparent",
  },
  container: {
    zIndex: 200,
    width: 350,
    height: 580,
    backgroundColor: '#fff',
    padding: 18,
    textAlign: 'start',
    position: 'fixed',
    bottom: 10,
    right: 36,
    boxShadow: '0px 7px 4px #00000029',
    borderRadius: 21,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#6A67D3',
    },
  },
  image: {
    width: 315,
    height: 200,
    borderRadius: 17,
    objectFit: 'cover',
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketName: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    marginRight: 10,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F95A48',
    borderRadius: 4,
    color: '#fff',
    padding: '4px 7px',
    boxSizing: 'border-box',
    maxWidth: 55,
    height: 25,
    maxHeight: 25,
    fontWeight: 600,
  },
  description: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
    maxHeight: 60,
    marginBottom: 20,
    marginTop: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 7,
  },
  divider: {
    margin: '10px 0',
  },
  workingHour: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
    marginLeft: 10,
  },
  label: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    width: 300,
    height: 46,
    backgroundColor: '#6A67D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    color: '#fff',
    position: 'sticky',
    bottom: 10,
    borderRadius: 11,
    fontWeight: 600,
    cursor: 'pointer',
  },
});
