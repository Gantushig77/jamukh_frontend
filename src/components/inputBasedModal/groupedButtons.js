import React from 'react';
import { InputBase, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function GroupedButtons({ counter, setCounter = () => {} }) {
  const classes = useStyles();
  return (
    <ButtonGroup
      size='small'
      aria-label='small outlined button group'
      className={classes.container}
    >
      <Button
        disabled={counter <= 0}
        onClick={() => {
          setCounter(parseInt(counter - 1));
        }}
        className={classes.decrease}
      >
        <Typography className={classes.symbol}>-</Typography>
      </Button>

      <InputBase
        inputProps={{ 'aria-label': 'naked' }}
        className={classes.numberInput}
        value={parseInt(counter)}
        onChange={(e) => setCounter(e.target.value)}
        type='number'
        style={{ textAlign: 'center', padding: 'auto' }}
      >
        {counter}
      </InputBase>

      <Button
        className={classes.increase}
        onClick={() => {
          setCounter(parseInt(counter) + 1);
        }}
      >
        <Typography className={classes.symbol}>+</Typography>
      </Button>
    </ButtonGroup>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: '#f7f7f7',
    width: 155,
    height: 48,
    borderRadius: 11,
    border: 'none',
  },
  numberInput: {
    border: 'none',
    outline: 'none',
    width: 60,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    color: '#000',
    align: 'center',
    '& input': {
      textAlign: 'center',
    },
  },
  symbol: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    color: '#000',
  },
  decrease: {
    width: 50,
    border: 'none',
  },
  increase: {
    width: 50,
    border: 'none',
  },
});
