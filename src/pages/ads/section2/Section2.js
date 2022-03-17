import React, { useRef, useContext } from 'react';
import { Container } from '@mui/material';
import colorss from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
// import Background1 from '../../../assets/background/adsDetail.png';
// import Background from '../../../assets/background/background.png';
import Slider from 'react-slick';
import ArrowL from '../../../assets/arrow/arrowL.png';
import ArrowR from '../../../assets/arrow/arrowR.png';
import TheContext from '../../../context/context';
import Footer from '../../../components/footer/footer';

function NextArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: 'block' }} onClick={onClick}>
      <img src={ArrowR} className={classes.arrow} alt='' />
    </div>
  );
}

function PrevArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: 'block', cursor: 'pointer' }} onClick={onClick}>
      <img className={classes.arrow} src={ArrowL} alt='' />
    </div>
  );
}

export default function Section2(props) {
  const classes = useStyles(props);
  console.log(props, 'props');
  let slider = useRef(null);
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <div className={classes.root}>
      {props?.parentId ? (
        <></>
      ) : (
        <Container className={classes.contentRoot}>
          <Container className={classes.cardContent}>
            {props?.ads_info === undefined || props?.ads_info === null ? (
              <div />
            ) : props?.ads_info.length === 0 ? (
              <div />
            ) : (
              <div className={classes.borderInfo}>
                {props?.ads_info.map((item, i) => (
                  <div className={classes.rowHalf} key={i + 'id'}>
                    <div className={classes.label}>{item?.label}</div>
                    <div className={classes.value}>{item?.value}</div>
                  </div>
                ))}
              </div>
            )}
          </Container>
          <div className={classes.zurag}>ЗУРАГ</div>
          {props.image === undefined || props?.ads_info === null ? (
            <div />
          ) : props.image?.length === 0 ? (
            <div />
          ) : (
            <Slider
              {...{
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow:
                  props?.image.length > 2 ? 3 : props?.image.length > 1 ? 2 : 1,
                slidesToScroll: 1,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
                responsive: [
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      initialSlide: 1,
                      arrows: true,
                    },
                  },
                ],
              }}
              className={classes.slider}
            >
              {props?.image.map((item, i) => (
                <SliderItem
                  dots={1}
                  key={i + 'slider item'}
                  sliderRef={slider}
                  phone={props?.phone}
                  avatar={''}
                  admin={'Grand Marshal'}
                  time={'12min'}
                  area={'MKV 4,500,000$'}
                  title={props?.title}
                  description={`Гран Маршал дөрвөн улирлын цогцолборхотхон 2-3 өрөө МУЛЬТИ ХАУСНЫ 1м.кв-ын үнийг ...`}
                  buttonText={account ? 'Үйлчилгээ харах' : 'SEE ALL >'}
                  backgroundImg={item?.url}
                  link={account ? '/user/services' : '/sign-up'}
                />
              ))}
            </Slider>
          )}
          <div className={classes.zurag}>ДЭЛГЭРЭНГҮЙ</div>
          <Container className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.description}>{props?.description}</div>
            </div>
          </Container>
          <Container className={classes.cardContent}>
            <div className={classes.avatar}>
              <div className={classes.avatarContent}>
                <img
                  src={props.avatar.avatar.url}
                  style={{
                    border: '1px solid white',
                    height: '50px',
                    width: '50px',
                    borderRadius: '100%',
                    marginRight: '10px',
                  }}
                  alt=''
                />
                {props.avatar.firstname}
              </div>
              <div className={classes.price}>
                {props.symbol}
                {props.price}
              </div>
            </div>
          </Container>
        </Container>
      )}
      <Footer phone={props.phone} tablet={props.tablet} />
    </div>
  );
}
const SliderItem = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.box}>
      <img src={props.backgroundImg} className={classes.boxImage} alt='' />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: (props) => (props.phone ? '100%' : '100%'),
    overflow: 'hidden',
    backgroundColor: '#151516',
    fontFamily: "'Roboto', sans-serif",
  },
  zurag: {
    textAlign: 'center',
    margin: '40px 0px',
    padding: '20px',
    width: '100%',
    color: '#C19D65',
    fontWeight: '300',
    fontSize: '30px',
    borderTop: '1px solid #e6e6e6',
    borderBottom: '1px solid #e6e6e6',
  },
  avatarContent: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  price: {
    color: '#C18E44',
    fontSize: '30px',
    fontWeight: '300',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: (props) => (props?.phone ? 'auto' : '50%'),
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '80px',
    width: '100%',
  },
  borderInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid  #C19D65',
    width: '100%',
    borderRadius: '20px',
  },
  content: {
    border: '1px solid #C19D65',
    padding: (props) => (props?.phone ? '10px' : '30px'),
    width: (props) => (props?.phone ? '100%' : '1300px'),
    borderRadius: '20px',
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '40px',
  },
  slideBottomBackground: {
    position: 'absolute',
    bottom: 0,
    width: '30%',
    height: '20px',
  },

  sliderItemBackImg: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: (props) => (props?.phone ? 'auto' : '300px'),
    margin: '10px',
    borderRadius: '10px',
    border: '1px solid #C19D65',
  },

  sliderItemContainer: {
    position: 'relative',
    zIndex: 99,
    transform: 'translate(0px, -100%)',
    marginBottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: '32px',
    fontWeight: '300',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  boxImage: {
    width: (props) => (props?.phone ? '100%' : '900px'),
    height: (props) => (props?.phone ? '150px' : '430px'),
  },
  bottomBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    fontWeight: '300',
  },
  brand: {
    color: '#C19D65',
    fontWeight: '400',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: (props) => (props?.phone ? 'auto' : '50%'),
    marginLeft: '15px',
    color: '#C19D65',
  },
  rowHalf: {
    display: 'flex',
    alignItems: 'center',
    width: (props) => (props?.phone ? '100%' : '50%'),
    color: 'white',
    fontWeight: '300',
    fontSize: '20px',
    padding: '20px',
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    margin: '100px 0px',
  },
  cardContent: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    backgroundColor: '',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    backgroundSize: '300px 250px',
    // boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
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
    marginTop: 30,
    fontSize: 32,
    fontWeight: 100,
    color: colorss.brandTextColor,
    width: '100%',
    textAlign: (props) => (props?.phone ? 'center' : 'left'),
  },
  description: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 100,
    marginTop: '10px',
    textAlign: (props) => (props?.phone ? 'center' : 'left'),
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
  arrow: {
    width: (props) => (props.phone ? '30px' : '50px'),
  },
});
