import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function CountInputCore({
  acceptValue = 0,
  onChange,
  minValue = 0,
  maxValue,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(acceptValue);
  useEffect(() => {
    if (onChange) onChange(value);
    // eslint-disable-next-line
  }, [value]);
  useEffect(() => {
    setValue(acceptValue);
  }, [acceptValue]);
  function add() {
    setValue(maxValue < Number(value) + 1 ? Number(value) : Number(value) + 1);
  }
  function sub() {
    setValue(minValue > Number(value) - 1 ? Number(value) : Number(value) - 1);
  }
  return (
    <div className={classes.root}>
      <ButtonGroup
        variant='text'
        // color="primary"
        aria-label='text primary button group'
      >
        <Button onClick={sub}>-</Button>
        <div className={classes.inputContainer}>
          <input
            value={value}
            onChange={(e) => {
              if (parseInt(e.target.value) === 0) e.target.value = 0;
              setValue(
                maxValue < parseInt(e.target.value)
                  ? maxValue
                  : minValue > parseInt(e.target.value)
                  ? minValue
                  : parseInt(e.target.value)
              );
            }}
            className={classes.input}
            type='number'
          />
        </div>
        <Button onClick={add}>+</Button>
      </ButtonGroup>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.03)',
    maxWidth: 'max-content',
    borderRadius: '11px',
    height: '48px',
    maxHeight: '48px',

    '& > *': {
      height: '30px',
    },
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    ...CSS_HELPER.initializeFont,
    // padding: "14px 0px",
    margin: '0 5px',
    border: 'none',
    width: '60px',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    fontSize: '17px',
    fontWeight: '700',
    '&:focus ': {
      border: '0px solid rgba(0,0,0,0)',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0.02)',
    },
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
}));
