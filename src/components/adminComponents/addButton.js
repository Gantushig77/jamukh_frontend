import React from 'react';
import { makeStyles } from '@mui/styles';
import { CSS_HELPER } from '../../constants/helper';

export default function AddButton({
  title = '+ ямар нэгэн зүйл нэмэх',
  onClick = () => {},
  color = '#F95A48',
  marginRight = '',
  marginLeft = '',
  marginTop = '',
  marginBottom = '',
  borderRadius = '17px',
  padding = '11px 21px',
  icon,
}) {
  const classes = useStyles();
  return (
    <div
      className={`${classes.option}`}
      onClick={onClick}
      style={{
        color: color,
        backgroundColor: color + '25',
        marginRight: marginRight,
        marginLeft: marginLeft,
        marginTop: marginTop,
        marginBottom: marginBottom,
        borderRadius: borderRadius,
        padding: padding,
      }}
    >
      {icon && <img src={icon} className={classes.icon} alt={'icon'} />}
      {title}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  option: {
    ...CSS_HELPER.initializeFont,

    fontSize: '14px',
    fontWeight: '500',
    border: '17px',
    color: 'black',
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: 'max-content',
    height: '38px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'max-content',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 10,
  },
}));
