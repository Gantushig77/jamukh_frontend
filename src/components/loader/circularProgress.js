import React from 'react';
import useAppStyles from '../../styles/js/classes';
import { CircularProgress } from '@mui/material';

export default function CircularProgressLoader() {
  const classes = useAppStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress color={'inherit'} />
    </div>
  );
}
