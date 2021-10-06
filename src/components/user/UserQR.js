import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import colors from '../../constants/colors.js';
import QRCode from 'qrcode.react';

export default function UserQR({ userID = '12345678' }) {
  const classes = useStyles();

  return (
    <Container className={classes.root} disableGutters>
      <Container className={classes.modal}>
        <Typography className={classes.title}>Таны Хөнгөлөлтийн QR</Typography>
        <Typography className={classes.description}>
          Та qr код юмуу бар код руу камераа чиглүүлнэ үү!
        </Typography>
        <QRCode
          value={userID}
          size={128}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
          renderAs={'svg'}
          onError={(e) => console.log(e)}
          imageSettings={{
            src: 'https://static.zpao.com/favicon.png',
            x: null,
            y: null,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 380,
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 470,
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: 30,
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 11,
  },
  description: {
    maxWidth: 270,
    margin: 'auto',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    textAlign: 'center',
    color: colors.gray,
  },
  qr: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    marginBottom: 16,
  },
  barcode: {
    width: 200,
    height: 80,
    objectFit: 'cover',
  },
});
