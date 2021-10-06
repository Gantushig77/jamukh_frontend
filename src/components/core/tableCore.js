import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { CSS_HELPER } from '../../constants/helper';

export default function TableCore({
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
  stopHover,
  onClickButton,
  noPosition = false,
  textColor,
}) {
  const mainStyle = useStyles({ noPosition, textColor });
  const classes = muduleStyle ?? mainStyle;
  const style = {
    marginRight: marginRight,
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className={classes.rootContainer}
        style={{ ...style }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {!stopHover && (
          <div
            className={classes.iconButton}
            style={{
              boxShadow: `0px 7px 11px ${buttonColor}40`,
              backgroundColor: buttonColor,
              opacity: hover ? 1 : 0,
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
                  key={'string item' + index}
                  className={classes.item}
                  style={{
                    marginRight: subMargin,
                    width: item.width,
                    overflow: 'hidden',
                  }}
                >
                  <h1 className={classes.text}>{item.item}</h1>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={classes.item}
                style={{ marginRight: subMargin, width: item.width, overflow: 'hidden' }}
              >
                <h1>{item.item}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((props) => ({
  rootContainer: {
    maxWidth: 'max-content',
    position: (props) => (props.noPosition ? 'static' : 'relative'),
    zIndex: 1,
    '&:hover .table-corp': {
      transform: 'translateX(-56px)',
    },
    '&:hover .table-corp-non-hover': {
      boxShadow: 'none',

      transform: 'none',
    },
    '& .table-corp-non-hover': {
      boxShadow: 'none',
    },
    '&:nth-child(3n-1) .table-corp': {
      backgroundColor: '#f7f7fd',
      boxShadow: '0 0 0 rgba(0,0,0,0.15)',
    },

    '&:nth-child(3n) .table-corp': {
      backgroundColor: '#fff7f6',
      boxShadow: '0 0 0 rgba(0,0,0,0.15)',
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
    // position: "absolute",
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
    color: (props) => (props?.textColor ? props.textColor : 'black'),
  },
}));
