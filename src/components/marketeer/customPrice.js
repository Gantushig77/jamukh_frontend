import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

export default function CustomPrice({ data }) {
  const classes = useStyles();
  return (
    <Typography
      className={
        data.status === false || data.status === 'false'
          ? classes.priceNotConfirmed
          : classes.priceConfirmed
      }
    >
      ₮{data.value}
    </Typography>
  );
}

const useStyles = makeStyles({
  priceConfirmed: {
    color: '#6A67D3',

    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'start',
  },
  priceNotConfirmed: {
    color: '#F95A48',
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    textAlign: 'start',
  },
});
