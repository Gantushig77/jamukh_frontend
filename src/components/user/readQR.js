import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QrReader from 'react-qr-reader';

export default function ReadQR({
  setResult = () => {},
  onScan = (data) => {
    if (data) {
      console.log(data);
      setResult(data);
    }
  },
}) {
  const classes = useStyles();

  return (
    <Container className={classes.modal}>
      <QrReader
        delay={300}
        onScan={onScan}
        onError={(e) => console.log(e)}
        showViewFinder={false}
      ></QrReader>
      <Container className={classes.container}>
        <Typography className={classes.text}>
          Худалдан авагчийн QR код юмуу Bar код руу камераа чиглүүлнэ үү!
        </Typography>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  modal: {
    width: 380,
  },
  container: {
    padding: 0,
    width: 335,
    height: 335,
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 100,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  text: {
    padding: 0,
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 250,
  },
});
