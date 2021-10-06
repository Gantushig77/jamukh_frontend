import React from 'react';
import { Divider, Typography, CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';
import phone from '../../assets/icons/phone.svg';
import time2 from '../../assets/icons/time2.svg';
import { stringEllipser } from '../../helpers/helperFunctions';

export default function Market({ data, showDetail = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.container} onClick={showDetail}>
      {data.coverImg ? (
        <img alt={'marketImage'} className={classes.image} src={data.coverImg} />
      ) : (
        <div className={classes.imgPlaceholderContainer}>
          <h1>SHOP IMAGE</h1>
        </div>
      )}
      <CardActionArea className={classes.content}>
        <Typography className={classes.marketName}>{data.name}</Typography>
        <Typography className={classes.address}>
          {stringEllipser(data.address, 89)}
        </Typography>
        <Divider />
        <div className={classes.label}>
          <img alt={'icon'} className={classes.icon} src={phone} />
          <Typography>{stringEllipser(data.phone, 8)}</Typography>
        </div>
        <div className={classes.label}>
          <img alt={'icon'} className={classes.icon} src={time2} />
          <Typography>{data.openHours}</Typography>
        </div>
      </CardActionArea>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    width: 245,
    height: 380,
    backgroundColor: '#fff',
    borderRadius: 17,
    border: '1px solid #edeced',
    padding: 0,
    marginBottom: 36,
    marginRight: 36,
    alignItems: 'start',
    '& .MuiDivider-root': {
      backgroundColor: 'lightgray',
      width: '100%',
      height: 1,
    },
  },
  imgPlaceholderContainer: {
    height: '133px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    color: 'white',
    backgroundImage: `url(https://images.unsplash.com/photo-1614853035986-b230d7d5679c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
    background:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,64,1) 35%, rgba(0,212,255,1) 100%)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: ' flex-start',
    textAlign: 'start',
    padding: 15,
    width: '100%',
    maxHeight: 250,
    height: '100%',
  },
  image: {
    width: 245,
    maxHeight: 133,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    objectFit: 'cover',
  },
  marketName: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#000',
  },
  address: {
    height: 80,
    overflow: 'hidden',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    color: '#868686',
    marginBottom: 14,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    marginTop: 14,
    color: '#868686',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
