import { makeStyles } from '@mui/styles';
import React from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function CustomTable({
  items = [
    { item: "i'm string (^_#)", width: '100px' },
    { item: <h5>i'm component ^_^</h5>, width: '250px' },
  ],
  subMargin = '10px',
  horizontalPadding = '36px',
  muduleStyle,
  marginRight = '',
  marginLeft = '',
  marginTop = '',
  marginBottom = '20px',
  buttonColor = '#F95A48',
  imageSrc,
  backgroundColor,
  height,
  onClick,
  stopHover,
  stopNthChild = true,
  onClickButton,
}) {
  const mainStyle = useStyles({ width: items[0].width, stopNthChild });
  const classes = muduleStyle ?? mainStyle;
  const style = {
    marginRight: marginRight,
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  };

  return (
    <>
      <div className={classes.rootConainer} style={{ ...style }}>
        {!stopHover && (
          <div
            className={classes.iconButton}
            style={{
              boxShadow: `0px 7px 11px ${buttonColor}40`,
              backgroundColor: buttonColor,
              opacity: 0,
              cursor: onClickButton ? 'pointer' : 'default',
            }}
            onClick={onClickButton}
          >
            {imageSrc ? <img src={imageSrc} alt='button icon' /> : <p>X</p>}
          </div>
        )}
        <div
          className={
            classes.root + ((stopHover ? ' table-corp-non-hover' : '') + ' table-corp')
          }
          style={{
            height: height,
            backgroundColor: backgroundColor,
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
          }}
        >
          {items.map((item, index) => {
            if (typeof item.item === 'string') {
              return (
                <div
                  onClick={() => (onClick ? onClick() : {})}
                  key={'string item' + index}
                  className={classes.item}
                  style={{
                    marginRight: subMargin,
                    width: item.width,
                    overflow: 'hidden',
                    maxHeight: 50,
                    textOverflow: 'ellipsis',
                  }}
                >
                  <h1 className={classes.text}>{item.item}</h1>
                </div>
              );
            }
            return (
              <div
                onClick={() =>
                  index !== items.length - 1 ? (onClick ? onClick() : {}) : {}
                }
                key={index}
                className={classes.item}
                style={{
                  marginRight: subMargin,
                  width: item.width,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <h1 style={{ textOverflow: 'ellipsis' }}>{item.item}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((props) => ({
  rootConainer: {
    maxWidth: 'max-content',
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',
    '&:hover .table-corp-non-hover': {
      boxShadow: 'none',
      transform: 'none',
    },
    '& .table-corp-non-hover': {
      boxShadow: 'none',
    },
    '&:nth-child(3n-1) .table-corp': {
      backgroundColor: (props) => (props.stopNthChild ? 'transparent' : '#f7f7fd'),
      boxShadow: (props) => (props.stopNthChild ? 'none' : '0 0 0 rgba(0,0,0,0.15)'),
    },
    '&:nth-child(3n) .table-corp': {
      backgroundColor: (props) => (props.stopNthChild ? 'transparent' : '#fff7f6'),
      boxShadow: (props) => (props.stopNthChild ? 'none' : '0 0 0 rgba(0,0,0,0.15)'),
    },
  },
  iconButton: {
    transition: 'all 0.4s',
    position: 'absolute',
    top: '50%',
    right: '0',
    transform: 'translateY(-50%)',
    height: '36px',
    width: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: '24px',
    '& img': {
      width: '16px',
      height: 'auto',
    },
    zIndex: -1,
    cursor: 'pointer',
  },
  root: {
    display: 'flex',
    zIndex: 3,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    maxWidth: 'max-content',
    height: '73px',
    borderRadius: '35px',
    boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
    transition: 'all 0.2s',
    '&:hover': {
      boxShadow: '0px 2px 5px 3px rgba(0,0,0,0.05)',
    },
  },
  item: {},
  text: {
    ...CSS_HELPER.initializeFont,
    fontWeight: 600,
    color: 'black',
  },
}));
