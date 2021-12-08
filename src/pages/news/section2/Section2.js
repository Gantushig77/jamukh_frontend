import React from 'react';
import { Container, Card } from '@mui/material';
import colorss from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Slider from 'react-slick';
import Test from '../../../assets/images/object.png';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        backgroundColor: '#6A67D3',
        position: 'absolute',
        right: -30,
        zIndex: 888,
        top: '45%',
        cursor: 'pointer',
        height: 50,
        width: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon htmlColor={'white'} style={{ marginLeft: 3 }} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        backgroundColor: '#6A67D3',
        position: 'absolute',
        zIndex: 888,
        left: -70,
        top: '45%',
        cursor: 'pointer',
        height: 50,
        width: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon
        htmlColor={'white'}
        style={{
          marginLeft: 10,
        }}
      />
    </div>
  );
}

export default function Section2(props) {
  const classes = useStyles(props);

  // const settings = {
  //   infinite: true,
  //   arrows: props.phone ? false : true,
  //   speed: 500,
  //   slidesToShow: props.phone ? 2 : 4,
  //   slidesToScroll: 1,
  //   dots: false,
  //   autoPlay: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  return (
    <Container className={classes.root}>
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <Container className={classes.cardContent}>
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
            <CardItem phone={props} />
          </Container>
        </>
      )}
      {/* <Container className={classes.sliderContainer}>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((item, index) => (
            <CardItem
              id={''}
              parentId={''}
              phone={props?.phone}
              tablet={props?.tablet}
              title={''}
              onSelect={''} 
              description={''}
              img={''}
              price={''}
              isUnit={''}
              soldBy={''}
            />
          ))}
        </Slider>
      </Container> */}
    </Container>
  );
}

const CardItem = (props) => {
  console.log(props,"props")
  const classes = useStyles(props.phone);
  return (
    <Card className={classes.cardRoot}>
      <img src={Test} className={classes.imageCard} alt={''} />
      <div className={classes.cardPadding}>
        <div className={classes.cardTitle}>MONGOLIAN TOP ARCHITECTURE DESIGN</div>
        <div className={classes.cardDate}>1min</div>
        <div className={classes.cardDesc}>
          “Гранд Маршал” дөрвөн улирлын цогцолбор хотхон 2-3 өрөө …
        </div>
        <div className={classes.cardButtonContent}>
          <div className={classes.cardButton}>
            MORE
            <ArrowForwardIosIcon style={{ height: '16px' }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    width: (props) => (props.phone ? '100%' : '1300px!important'),
    overflow: 'hidden',
    backgroundColor: '#252525',
    marginTop: (props) => (props.phone ? 100 : 40),
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  cardContent: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  cardButton: {
    display: 'flex',
    alignItems: 'center',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    color: 'white',
    fontSize: '15px',
    padding: 6,
  },
  cardButtonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  card: {
    width: '100px',
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: (props) => (props.phone ? '100%' : 260),
    width: (props) => (props.phone ? '100%' : 330),
    // maxWidth:260,
    // width:330,
    marginBottom: 20,
    textAlign: 'left',
    margin: 5,
  },
  imageCard: {
    height: '200px',
    width: '100%',
  },
  cardPadding: {
    padding: '10px',
    fontFamily: 'Roboto Condensed',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: 'normal',
    padding: '10px 0px',
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
