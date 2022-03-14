import React, { useRef, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import Slider from 'react-slick';
import TheContext from '../../context/context';
import ArrowL from '../../assets/arrow/arrowL.png';
import ArrowR from '../../assets/arrow/arrowR.png';

function NextArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: 'block',
        cursor: 'pointer',
        position: 'absolute',
        right: '0',
        top: '32%',
      }}
      onClick={onClick}
    >
      <img src={ArrowR} className={classes.arrow} alt='' />
    </div>
  );
}

function PrevArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: 'block',
        cursor: 'pointer',
        position: 'absolute',
        left: '0',
        zIndex: '100',
        top: '32%',
      }}
      onClick={onClick}
    >
      <img className={classes.arrow} src={ArrowL} alt='' />
    </div>
  );
}

export default function SliderCustom(props) {
  let slider = useRef(null);
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return props.data.length === 0 ? (
    <div></div>
  ) : (
    <Slider ref={slider} {...sliderConfig}>
      {props.data.map((item, i) => (
        <SliderItem
          dots={1}
          key={i + 'slider'}
          sliderRef={slider}
          phone={props?.phone}
          avatar={props.avatar}
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
  );
}

const SliderItem = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.sliderItemBackImg} style={{backgroundImage:props.backgroundImg, height:"500px"}}>
      <div className={classes.sliderItemContainer}>
        <div className={classes.textContainer}>{props?.title}</div>
        <div className={classes.textSub}>{props?.avatar?.lastname} {props.avatar?.firstname}</div>
      </div>
    </div>
  );
};

const sliderConfig = {
  speed: 500,
  infinite: true,
  fade: true,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  draggable: false,
  swipe: true,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    zIndex: '-1',
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  sliderItemBackImg: {
    position:'relative',
    background: colors.lightGray,
    backgroundImage: (props) => `url(${props.backgroundImg})`,
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    justifyContent: 'center',
    // height: '600px',
  },
  sliderItemContainer: {
    position: 'absolute',
    bottom:'0px',
    zIndex: 99,
    width: '100%',
    background:
      'linear-gradient(0deg, rgba(21,21,22,0.6615021008403361) 33%, rgba(21,21,22,0.15730042016806722) 45%)',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: (props) => (props?.phone ? '50px' : '100px'),
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    color: 'white',
  },
  textSub: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: '32px',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    color: '#C19D65',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#AA7654',
    fontFamily: "'Roboto', sans-serif",
    marginTop: (props) => (props?.phone ? '10px' : '80px'),
  },
  avatarColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '700',
    fontSize: (props) => (props?.phone ? 8 : 18),
    marginLeft: 8,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  area: {
    display: 'flex',
    alignItems: 'center',
    color: colors.brandTextColor,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: '700',
    marginRight: '10px',
    fontSize: (props) => (props?.phone ? 8 : 18),
  },
  avatarColumnTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '300',
    fontFamily: "'Roboto Condensed', sans-serif",
    color: 'white',
    fontSize: (props) => (props?.phone ? 4 : 12),
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: (props) => (props?.phone ? 30 : 40),
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: '700',
    textAlign: 'left',
    color: 'white',
    maxWidth: '300px',
    minHeight: 30,
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: '300',
    textAlign: 'left',
    maxWidth: '350px',
    color: 'white',
    minHeight: 64,
  },
  button: {
    fontFamily: "'Roboto Condensed', sans-serif",
    backgroundColor: colors.brandTextColor,
    width: 100,
    '&:hover': {
      backgroundColor: colors.brandTextColor,
      color: 'white',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
  thirtyPercentSquare: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 27,
    zIndex: 999,
    backgroundColor: colors.orange,
  },
  thirtyPercentRound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 70,
    zIndex: 10,
    backgroundColor: colors.orange,
  },
  saleText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
  },
  saleLine: {
    backgroundColor: 'white',
    height: 3,
    width: 45,
  },
  saleLineLong: {
    marginTop: 8,
    backgroundColor: 'white',
    height: 3,
    width: 60,
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
    backgroundColor: '#00000073',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dot_active: {
    height: 15,
    width: 35,
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
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator_active: {
    height: 3,
    width: 50,
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  arrow: {
    width: '60px',
  },
});
