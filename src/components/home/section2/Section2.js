import React from 'react';
import { Container, Card } from '@mui/material';
import colorss from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import Test from '../../../assets/images/test.png';

export default function Section2(props) {
  const classes = useStyles(props);

  return (
    <Container className={classes.root}>
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <>
            <div className={classes.title}>CATEGORY</div>
          </>
          <div className={classes.cardContent}>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </div>
        </>
      )}
    </Container>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.cardRoot}>
      <div
        style={{
          backgroundSize: 'cover',
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 5%,rgba(37,37,37,0.9) 85%),url("${Test}")`,
          position: 'relative',
        }}
      >
        <div className={classes.cardProperty}>PROPERTY</div>
      </div>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    width: '1300px!important',
    overflow: 'hidden',
    backgroundColor: '#252525',
    marginTop: (props) => (props.phone ? -90 : 40),
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  cardProperty: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '22px',
    position: 'absolute',
    bottom: '15px',
    left: '15px',
  },
  cardContent: {
    display: 'flex',
    maxWidth: '1300px',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '100px',
  },
  cardRoot: {
    maxWidth: 260,
    width: 330,
    height: 360,
    marginBottom: 20,
    textAlign: 'left',
    margin: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
  },
  cardDesc: {
    height: 100,
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
  },
  cardSold: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
  },
  cardPriceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
    color: '#6A67D3',
    paddingRight: 5,
  },
  cardUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
  },
  media: {
    height: 140,
  },
  sliderContainer: {
    maxWidth: 1000,
    paddingTop: 50,
    paddingBottom: 50,
    overflow: (props) => (props.phone ? 'hidden' : 'visible'),
    minWidth: (props) => (props.phone ? 500 : 0),
    paddingRight: (props) => (props.phone ? 0 : 24),
    paddingLeft: (props) => (props.phone ? 0 : 24),
  },
  title: {
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 22,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 'bold',
    color: colorss.brandTextColor,
  },
  titleWithParentId: {
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: (props) => (props.phone ? 10 : props.tablet ? 40 : 80),
  },
  description: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'black',
    maxWidth: 650,
    marginLeft: (props) => (props.phone ? -8 : 'auto'),
    width: '99%',
  },
  descriptionWithParentId: {
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'black',
    maxWidth: 550,
    marginLeft: (props) => (props.phone ? 10 : props.tablet ? 40 : 80),
    width: '90%',
  },
});
