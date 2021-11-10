import React, { useRef } from 'react';
import { Container, Typography, Card } from '@mui/material';
import colors from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import Test from '../../../assets/images/1.png';
import './section.css';

export default function Section3(props) {
  const classes = useStyles(props);
  let slider = useRef(null);

  const settings = {
    centerPadding: '180px',
    centerMode: true,
    className: classes.center,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: props.phone ? 2 : props.tablet ? 1 : 1,
    slidesToScroll: 1,
    dots: true,
    autoPlay: true,
  };

  return (
    <Container className={classes.root}>
      {props?.parentId ? (
        <>
          <Typography className={classes.titleWithParentId}>
            Ижил төстэй бараанууд
          </Typography>
          <Typography className={classes.descriptionWithParentId}>
            Эх орны хөрсөнд ургасан үржил шимт тэжээлээр тэжээгдэн, малчны хотхоноос
            бэлтгэн нийлүүлж буй гарал үүслийн гэрчилгээтэй, чанар стандартын дагуу
            лабораторийн шинжилгээнд хамрагдсан үйлдвэрийн аргаар бэлтгэн боловсруулсан
            шинэ мах махан бүтээгдэхүүнийг ТАНАЙ ГЭРТ.
          </Typography>
        </>
      ) : (
        <>
          <div className={classes.title}>NEWS</div>
          <Typography className={classes.description}></Typography>
        </>
      )}
      <Container className={classes.sliderContainer}>
        <Slider ref={slider} {...settings} className={classes.slider}>
          <CardItem dots={1} sliderRef={slider} />
          <CardItem dots={2} sliderRef={slider} />
          <CardItem dots={3} sliderRef={slider} />
          <CardItem dots={4} sliderRef={slider} />
          <CardItem dots={5} sliderRef={slider} />
          <CardItem dots={6} sliderRef={slider} />
        </Slider>
      </Container>
    </Container>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <Card className={classes.cardRoot}>
        <img alt={'test img'} src={Test} className={classes.cardImage} />
        <div className={classes.cardColumn}>
          <div className={classes.cardTitle}>MONGOLIAN TOP ARCHITECTURE DESIGN</div>
          <div className={classes.cardDate}>1min</div>
          <div className={classes.cardDesc}>
            “Гранд Маршал” дөрвөн улирлын цогцолбор хотхон 2-3 өрөө МУЛЬТИ ХАУСНЫ 1
            м.кв-ын үнийг …
          </div>

          <div className={classes.cardButtonContent}>
            <div className={classes.cardButton}>
              SEE ALL
              <ArrowForwardIosIcon style={{ height: '16px' }} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: '1300px!important',
    overflow: 'hidden',
    backgroundColor: '#252525',
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  dots_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dot_active: {
    height: 15,
    width: 30,
    backgroundColor: colors.brandTextColor,
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator_active: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  cardRoot: {
    display: 'flex',
    width: '90%',
    marginBottom: 20,
    margin: '20px',
    backgroundColor: '#171717',
    padding: '15px',
  },
  cardColumn: {
    fontSize: '10px',
  },
  cardImage: {
    height: '200px',
    marginRight: '10px',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDate: {
    padding: '10px 0px',
    fontSize: 14,
    color: 'lightgray',
  },

  cardDesc: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
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
    maxWidth: '1300px',
    overflow: (props) => (props.phone ? 'hidden' : 'visible'),
    paddingRight: (props) => (props.phone ? 0 : 24),
    paddingLeft: (props) => (props.phone ? 0 : 24),
    width: '100%',
  },
  slider: {},
  title: {
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 22,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 'bold',
    color: colors.brandTextColor,
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
  center: {
    width: '200px',
    height: '200px',
  },
});
