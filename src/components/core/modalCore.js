import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function ModalCore({ children, outSideClick }) {
  const classes = useStyles();
  useEffect(() => {
    window.document.body.classList.add('hide-scroll-bar');
    return () => {
      window.document.body.classList.remove('hide-scroll-bar');
    };
  }, []);
  return (
    <div className={classes.root} onMouseDown={outSideClick}>
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    backdropFilter: 'blur(3px)',
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
}));
