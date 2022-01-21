import React, { useRef, useContext } from "react";
import { makeStyles } from "@mui/styles";
import colors from "../../../constants/colors";
import screen2 from "../../../assets/images/background.png";
import Slider from "react-slick";
import TheContext from "../../../context/context";
import { Container } from "@mui/material";
import Input from '@mui/material/Input';
import DemoImage from '../../../assets/images/demoImage.png';
import ArrowL from '../../../assets/arrow/arrowL.png'
import ArrowR from '../../../assets/arrow/arrowR.png'
import TopArrow from '../../../assets/arrow/topArrow.png'
import './Section.css'




function NextArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div  style={{ ...style, display: "block" }} onClick={onClick} >
        <img src={ArrowR} className={classes.arrow} alt=""/>
    </div>
  );
}

function PrevArrow(props) {
  const classes = useStyles(props);
  const { style, onClick } = props;
  return (
    <div  style={{ ...style, display: "block" ,cursor:"pointer"}} onClick={onClick}>
    <img className={classes.arrow} src={ArrowL} alt=""/>
</div>
  );
}

export default function Section(props) {
  
  const classes = useStyles(props);
  let slider = useRef(null);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <div className={classes.titleSlider}>
          
          <div className={classes.textSlide}>{props?.title}</div>
          <img src={TopArrow} alt=""/>
      </div>
      <div className={classes.search}>
        <Input id="standard-basic" label="Standard" variant="standard" className={classes.textField} placeholder="Хайх" />
      </div>
      <Slider  {...sliderConfig} className={classes.slider}>
        <SliderItem
          dots={1}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          backgroundImg={screen2}
          link={account ? "/user/services" : "/sign-up"}
        />

      </Slider>
    </Container>
  );
}

const SliderItem = (props) => {

  const classes = useStyles(props);

  return (
    <Container disableGutters maxWidth={false}>
      <div className={classes.sliderItemBackImg} >
        <img src={DemoImage} className={classes.boxImage} alt=""/>
        <div className={classes.boxTitle}>
          Алмазан бөгж
        </div>
        <div className={classes.bottomBox}>
          <div className={classes.price}>$ 9000</div>
          <div className={classes.brand}>GUCCI</div>
        </div>
      </div>
    </Container>
  );
};

const sliderConfig = {
  // dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 3,
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
      }
    }
  ]
};


const useStyles = makeStyles({
  arrow:{
    height: (props) => (props?.phone ? '65px' : '100px'),
    width:'auto'
  },
  firstWord: {
    color: "white",
    fontWeight: 100
  },
  textSlide:{
    borderBottom:'2px solid #C6824D',
    marginBottom:'10px',
    paddingBottom:'5px'
  },
  titleSlider: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    fontSize: (props) => (props?.phone ? '42px' : '65px'),
  },
  boxImage: {
    width: (props) => (props?.phone ? '80%' : '300px'),
    height: (props) => (props?.phone ? '150px' : '210px')
  },
  bottomBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    fontWeight: '300'
  },
  brand: {
    color: '#C19D65',
    fontWeight: '400'
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
    borderBottom: '1px solid white'
  },
  input: {
    color: 'white'
  },
  boxTitle: {
    fontSize: '32px',
    fontWeight: '300'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    flexDirection: 'column ',
    fontWeight: '100',
    marginTop:(props) => (props?.phone ? '90px' : '200px'),
    fontFamily: 'Roboto, sans-serif',
    color: 'white'
  },

  search: {
    border: 'none',
    fontWeight: '300'
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },

  slideBottomBackground: {
    position: "absolute",
    bottom: 0,
    width: "30%",
    height: "20px",
  },

  sliderItemBackImg: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: colors.lightGray,
    backgroundImage: (props) => `url(${props.backgroundImg})`,
    backgroundPosition: "center",
    filter: "blur(0px)",
    "-webkit9-filter": "blur(0px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: (props) => (props?.phone ? "auto" : "300px"),
    margin: '10px',
    borderRadius: '10px',
    border: '1px solid #C19D65'
  },

  sliderItemContainer: {
    position: "relative",
    zIndex: 99,
    transform: "translate(0px, -100%)",
    marginBottom: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },


  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#AA7654",
    fontFamily: "'Roboto Condensed', sans-serif",
    marginTop: (props) => (props?.phone ? "10px" : "80px  "),
  },

  avatarColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 8,
  },

  column: {
    display: "flex",
    alignItems: "center",
  },

  area: {
    display: "flex",
    alignItems: "center",
    color: colors.brandTextColor,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "700",
    marginRight: "10px",
    fontSize: (props) => (props?.phone ? 18 : 18),
  },

  avatarColumnTime: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "300",
    fontFamily: "'Roboto Condensed', sans-serif",
    color: "white",
    fontSize: (props) => (props?.phone ? 12 : 12),
  },

  title: {
    display: "flex",
    alignItems: "flex-end",
    fontSize: (props) => (props?.phone ? 20 : 30),
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "700",
    textAlign: "left",
    color: "white",
    maxWidth: "300px",
    minHeight: 30,
  },

  description: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "300",
    textAlign: "left",
    maxWidth: "350px",
    color: "white",
    minHeight: 64,
  },

  button: {
    fontFamily: "'Roboto Condensed', sans-serif",
    backgroundColor: colors.brandTextColor,
    width: 100,
    "&:hover": {
      backgroundColor: colors.brandTextColor,
      color: "white",
    },
  },

  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "white",
    },
  },

  thirtyPercentSquare: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    position: "absolute",
    bottom: "-1%",
    right: "25%",
    borderRadius: 27,
    zIndex: 999,
    backgroundColor: colors.orange,
  },

  thirtyPercentRound: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    position: "absolute",
    bottom: "-1%",
    right: "25%",
    borderRadius: 70,
    zIndex: 10,
    backgroundColor: colors.orange,
  },

  saleText: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
  },

  saleLine: {
    backgroundColor: "white",
    height: 3,
    width: 45,
  },

  saleLineLong: {
    marginTop: 8,
    backgroundColor: "white",
    height: 3,
    width: 60,
  },

  dots_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: "white",
    opacity: "30%",
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: "pointer",
  },
  dot_active: {
    height: 15,
    width: 30,
    backgroundColor: colors.brandTextColor,
    opacity: "100%",
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: "pointer",
  },
  dots_seperator: {
    height: 3,
    width: 50,
    backgroundColor: "white",
    opacity: "30%",
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: "pointer",
  },
  dots_seperator_active: {
    height: 3,
    width: 50,
    backgroundColor: "white",
    opacity: "100%",
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: "pointer",
  },
});
