import { makeStyles } from '@mui/styles';
import React from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function CopyCore() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
});
