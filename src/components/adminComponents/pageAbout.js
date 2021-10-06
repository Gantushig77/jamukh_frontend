import React from 'react';
import { makeStyles } from '@mui/styles';

export default function PageAbout({
  title = '[Гарчиг]',
  desc = `[Энэ хэсэгт "Энэ дүрстэй холбогдолтой" хэсгийн шаардлагыг тайлбарласан тайлбар байршина]`,
  descWidth = '505px',
  descMaxWidth = 'unset',
  marginRight = '',
  marginLeft = '',
  marginTop = '68px',
  marginBottom = '',
  fontSizeTitle = '27px',
  fontSizeDesc = '14px',
  width = 'unset',
  height = 'auto',
}) {
  const classes = useStyles({ height });
  const style = {
    marginRight: marginRight,
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  return (
    <div className={classes.root} style={{ ...style }}>
      <h1 className={classes.title} style={{ width: width, fontSize: fontSizeTitle }}>
        {title}
      </h1>
      <h2
        className={classes.desc}
        style={{
          width: descWidth,
          fontSize: fontSizeDesc,
          maxWidth: descMaxWidth,
        }}
      >
        {desc}
      </h2>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    margin: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: (props) => props?.height || 'auto',
  },
  title: {
    margin: '0',
    fontSize: '27px',
    color: 'rgb(0,0,0)',
    maxWidth: 'max-content',
    fontFamily: 'SF Pro Display',
  },
  desc: {
    margin: '0',
    marginTop: '14px',
    fontWeight: '500',
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'left',
    maxWidth: 'max-content',
    fontFamily: 'SF Pro Display',
    lineHeight: '1.5',
  },
}));
