import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function ToggleCore({
  acceptValue,
  trueTitle = 'Үнэн',
  falseTitle = 'Худал',
  onChange,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(acceptValue);
  useEffect(() => {
    if (onChange) onChange(value);
    // eslint-disable-next-line
  }, [value]);
  return (
    <div className={classes.root}>
      <div
        className={`${classes.options} ${!value ? classes.activeOption : ''}`}
        onClick={() => setValue(false)}
      >
        {falseTitle}
      </div>
      <div
        className={`${classes.options} ${value ? classes.activeOption : ''}`}
        onClick={() => setValue(true)}
      >
        {trueTitle}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    // flexDirection: "column",
    borderRadius: '10px',
    // backgroundColor: "red",
    overflow: 'hidden',
    border: '1px solid #6A67D3',
  },
  options: {
    ...CSS_HELPER.initializeFont,
    cursor: 'pointer',
    fontSize: 17,
    padding: 10,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '50%',
    transition: 'all 0.3s',
  },
  activeOption: {
    backgroundColor: '#6A67D3',
    color: 'white',
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
}));
