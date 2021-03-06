import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { CSS_HELPER } from '../../constants/helper';
import dropDownIcon from '../../assets/icons/dropdown.svg';
import { useOnClickOutside } from '../core/outsideClick';

export default function CustomDropdown({
  index = 0,
  notOnRender = false,
  options = [{ name: 'Сонголт' }, { name: 'удаах сонголт' }],
  defaultValue,
  onChange = () => {},
}) {
  const classes = useStyles();
  const [value, setValue] = useState(!defaultValue ? options[index]?.name : defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const changeRef = useRef(onChange);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const handleValue = (item) => {
    onChange(item);
    setValue(item?.name);
  };

  const handleState = () => {
    setOpen(open ? false : true);
  };

  useEffect(() => {
    if (!notOnRender) {
      changeRef.current(options[index]);
    }
    if (!defaultValue) {
      setValue(options[index]?.name);
    }
  }, [options, notOnRender, defaultValue, index]);

  return (
    <div className={classes.root} onClick={() => handleState()}>
      <div className={classes.trigger}>
        <h1 className={classes.triggerTitle}>{value}</h1>
        <img
          src={dropDownIcon}
          style={{ transform: open ? 'rotate(60deg)' : 'rotate(0deg)' }}
          alt='dropdown'
        />
      </div>
      <div
        className={classes.options}
        style={open ? { opacity: 1, display: 'unset' } : null}
        ref={ref}
      >
        {options?.map((item, indx) => (
          <h1
            className={classes.optionItem}
            style={{ backgroundColor: value === item ? 'rgba(0,0,0,0.05)' : null }}
            onClick={() => handleValue(item)}
            key={'plus' + indx}
          >
            {item?.name}
          </h1>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    height: 48,
    width: '100%',
    borderRadius: '11px',
    position: 'relative',
    border: '1px solid lightgray',
    '&:focus': {
      overflow: 'unset',
    },
    '& *': {
      userSelect: 'none',
    },
  },
  trigger: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
    borderRadius: '11px',
    alignItems: 'center',
    padding: '0 17px',
    backgroundColor: 'rgba(0,0,0,0.03)',
    '& img': {
      width: 10,
      height: 'auto',
      transition: 'all 0.3s',
    },
  },
  triggerTitle: {
    ...CSS_HELPER.initializeFont,
    fontWeight: 500,
    opacity: 1,
  },
  options: {
    boxSizing: 'border-box',
    display: 'none',
    transition: 'all 1s',
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    width: '100%',
    zIndex: 100,
    borderRadius: '11px',
    padding: '10px 0',
    opacity: 0,
    boxShadow: ' 0 0px 3px 2px rgba(0,0,0,0.1)',
    maxHeight: 100,
    overflow: 'auto',
  },
  optionItem: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    ...CSS_HELPER.initializeFont,
    transition: 'all 0.1s',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    height: 28,
    width: '100%',
    // borderRadius: "11px",
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.07)',
    },
    // backgroundColor: "rgba(0,0,0,0.03)",
    padding: '0 17px',
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
}));
