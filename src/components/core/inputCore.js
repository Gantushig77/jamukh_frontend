import { colors, IconButton, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { CSS_HELPER } from '../../constants/helper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function InputCore({
  acceptValue = '',
  type = 'text',
  placeholder = '********',
  onChange = () => {},
  onPressEnter,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(acceptValue);

  const [passType, setPassType] = useState({
    pass: 'password',
    verify: 'password',
  });

  const handlePasswordState = (num) => {
    setValue(num);
  };

  const handlePassType = (num) => {
    if (num === 1)
      setPassType({
        ...passType,
        pass: passType.pass === 'password' ? 'text' : 'password',
      });
    if (num === 2)
      setPassType({
        ...passType,
        verify: passType.verify === 'password' ? 'text' : 'password',
      });
  };

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    setValue(acceptValue);
  }, [acceptValue]);

  return (
    <div
      className={classes.root}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          if (onPressEnter) onPressEnter();
        }
      }}
    >
      <InputBase
        type={type === 'text' ? 'text' : passType.pass}
        value={value ? value : ''}
        className={classes.textfieldSlide3}
        onChange={(e) => handlePasswordState(e.target.value)}
        endAdornment={
          type === 'password' ? (
            <IconButton
              color='primary'
              className={classes.endAdornmentIcon}
              onClick={() => handlePassType(1)}
              aria-label='see password'
            >
              {passType.pass === 'password' ? (
                <VisibilityIcon htmlColor={'gray'} />
              ) : (
                <VisibilityOffIcon htmlColor={'gray'} />
              )}
            </IconButton>
          ) : undefined
        }
        placeholder={placeholder}
      />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    boxShadow: '0 0 2px 1px rgba(0,0,0,0.1)',
    with: 'max-content',
    borderRadius: 10,
  },
  textfieldSlide3: {
    backgroundColor: colors.lightGray,
    outlineColor: 'transparent !important',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    height: 52,
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
}));
