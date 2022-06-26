import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../../constants/colors';
import screen2 from '../../../assets/images/background.png';
import Slider from 'react-slick';
import TheContext from '../../../context/context';
import { Container } from '@mui/material';
import Input from '@mui/material/Input';
import ArrowL from '../../../assets/arrow/arrowL.png';
import ArrowR from '../../../assets/arrow/arrowR.png';
import TopArrow from '../../../assets/arrow/topArrow.png';
import './Section.css';
import TruncateMarkup from 'react-truncate-markup';
import { Link } from 'react-router-dom';
import { getSearch } from '../../../api/ads';
import HashLoader from 'react-spinners/HashLoader';
import SearchIcon from '@mui/icons-material/Search';

function NextArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: 'block', cursor: 'pointer' }} onClick={onClick}>
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

export default function Section(props) {
  const classes = useStyles(props);
  const [data, setData] = useState(props.data);
  const [isLoading, setLoading] = useState(false);
  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  const search = (e) => {
    setLoading(true);
    getSearch(e.target.value, props.categoryId, props.subCategory)
      .then((res) => {
        setData(res.data.ads);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // handleSnackOpen({
        //   state: true,
        //   msg:
        //     e.message === 'user.not.found'
        //       ? 'Холболтын алдаа гарлаа'
        //       : 'Холболтын алдаа гарлаа',
        //   type: 'error',
        // });
      });
  };

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <div className={classes.titleSlider}>
        <div className={classes.textSlide}>{props?.title}</div>
        <img src={TopArrow} alt='' />
      </div>

      {isLoading === true ? (
        <div className={classes.Loading}>
          <HashLoader size={52} style={{ color: '#9D8357' }} />
        </div>
      ) : (
        <div className={classes.Container}>
          <div className={classes.search}>
            <Input
              id='standard-basic'
              label='Standard'
              variant='standard'
              className={classes.textField}
              placeholder='Хайх'
              startAdornment={<SearchIcon />}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  search(e);
                }
              }}
            />
          </div>
          {data.length === 0 ? (
            <div className={classes.empty}>Зар олдсонгүй</div>
          ) : (
            <Slider
              {...{
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow: data.length > 3 ? 3 : data.length,
                slidesToScroll: 1,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
                responsive: [
                  {
                    breakpoint: 1310,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      initialSlide: 1,
                      arrows: true,
                    },
                  },
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
              {data?.map((item, i) => (
                <Link
                  key={i + 'i+'}
                  to={`/adsDetail/${item.ads_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <SliderItem
                    dots={1}
                    phone={props?.phone}
                    backgroundImg={screen2}
                    image={item?.ad_imgs[0]?.url}
                    title={item?.title}
                    price={item?.price + item?.currency_symbol}
                    link={account ? '/user/services' : '/sign-up'}
                  />
                </Link>
              ))}
            </Slider>
          )}
        </div>
      )}
    </Container>
  );
}

const SliderItem = (props) => {
  const classes = useStyles(props);

  return (
    <Container
      disableGutters
      maxWidth={false}
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <div className={classes.sliderItemBackImg}>
        <img src={props.image} className={classes.boxImage} alt='' />
        <div className={classes.bgColor}>
          <TruncateMarkup
            lines={1}
            ellipsis={() => {
              /* renders "+X more users" */
            }}
          >
            <div className={classes.boxTitle}>{props?.title}</div>
          </TruncateMarkup>
          <div className={classes.bottomBox}>
            <div className={classes.brand}>{props.price}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const useStyles = makeStyles({
  arrow: {
    height: (props) => (props?.phone ? '15px' : '100px'),
    width: 'auto',
  },
  firstWord: {
    color: 'white',
    fontWeight: 100,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  Container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1300px',
  },
  textSlide: {
    borderBottom: '2px solid #C6824D',
    marginBottom: '10px',
    paddingBottom: '5px',
  },
  Loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(21,21,22,0.9)',
    height: '300px',
  },
  titleSlider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: (props) => (props?.phone ? '42px' : '65px'),
  },
  boxImage: {
    width: (props) => (props?.phone ? '100%' : '100%'),
    height: (props) => (props?.phone ? '150px' : '250px'),
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    objectFit: 'cover',
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
    padding: '10px',
  },
  textField: {
    textAlign: 'center',
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 30,
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100',
    borderBottom: '1px solid white',
  },
  input: {
    color: 'white',
  },
  boxTitle: {
    fontSize: '30px',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    borderBottom: '1px solid #A18659',
    padding: '5px',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '60vh',
    flexDirection: 'column ',
    fontWeight: '100',
    marginTop: (props) => (props?.phone ? '90px' : '200px'),
    fontFamily: 'Roboto, sans-serif',
    color: 'white',
  },
  bgColor: {
    width: '100%',
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
    fontWeight: '300',
    marginBottom: 20,
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 100%, rgba(0,0,0,0.85) 100%)',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    height: (props) => (props?.phone ? 'auto' : 350),
    margin: '10px',
    borderRadius: '10px',
    border: '1px solid #C19D65',
    width: (props) => (props?.phone ? 'auto' : 400),
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    color: '#C6824D',
    fontSize: '60px',
    borderRadius: '20px',
    backgroundColor: 'rgba(21,21,22,0.9)',
    height: '300px',
    width: '100%',
    fontFamily: "'Lobster', cursive",
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#AA7654',
    fontFamily: "'Roboto Condensed', sans-serif",
    marginTop: (props) => (props?.phone ? '10px' : '80px  '),
  },
  avatarColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '700',
    fontSize: 18,
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
    fontSize: (props) => (props?.phone ? 18 : 18),
  },
  avatarColumnTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '300',
    fontFamily: "'Roboto Condensed', sans-serif",
    color: 'white',
    fontSize: (props) => (props?.phone ? 12 : 12),
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: (props) => (props?.phone ? 20 : 30),
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
});
