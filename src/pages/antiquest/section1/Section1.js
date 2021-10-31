import React, { useRef, useContext } from "react";
import { Container, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import colors from "../../../constants/colors";
import screen1 from "../../../assets/images/antiquest.png";
import screen2 from "../../../assets/images/screen2.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import TheContext from "../../../context/context";
import FaceIcon from "@mui/icons-material/Face";

export default function Section1(props) {
  const classes = useStyles(props);
  let slider = useRef(null);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <Slider ref={slider} {...sliderConfig} className={classes.slider}>
        {/* Item 1 */}
        <SliderItem
          dots={1}
          sliderRef={slider}
          phone={props?.phone}
          avatar={""}
          admin={"Grand Marshal"}
          time={"12min"}
          area={"MKV 4,500,000$"}
          title={"Zanabazar gold buddha"}
          description={`Гран Маршал дөрвөн улирлын цогцолборхотхон 2-3 өрөө МУЛЬТИ ХАУСНЫ 1м.кв-ын үнийг ...`}
          buttonText={account ? "Үйлчилгээ харах" : "SEE ALL >"}
          backgroundImg={screen1}
          link={account ? "/user/services" : "/sign-up"}
        />
        {/* Item 2 */}
        <SliderItem
          dots={2}
          sliderRef={slider}
          phone={props?.phone}
          avatar={""}
          admin={"Grand Marshal"}
          time={"12min"}
          area={"MKV 4,500,000$"}
          title={"GRAND MARSHAL LUXURY VILLAS"}
          description={`Гран Маршал дөрвөн улирлын цогцолборхотхон 2-3 өрөө МУЛЬТИ ХАУСНЫ 1м.кв-ын үнийг ...`}
          buttonText={account ? "Үйлчилгээ харах" : "Бүртгүүлэх"}
          link={account ? "/user/services" : "/sign-up"}
          backgroundImg={screen2}
        />
      </Slider>
    </Container>
  );
}

const SliderItem = (props) => {
  let sliderRef = props.sliderRef;
  const classes = useStyles(props);

return (
    <Container disableGutters maxWidth={false}>
      <div className={classes.sliderItemBackImg} />
      <div className={classes.sliderItemContainer}>
        <Container className={classes.textContainer}>
          <div className={classes.avatar}>
            <FaceIcon />
            <div className={classes.avatarColumn}>
              {props?.admin}
              <div className={classes.avatarColumnTime}>{props?.time}</div>
            </div>
          </div>
          <Typography className={classes.title}>{props?.title}</Typography>
          <Typography className={classes.description}>
            {props?.description}
          </Typography>
          <div className={classes.column}>
            <div className={classes.area}>{props?.area}</div>
            <Button className={classes.button}>
              <Link to={props?.link} className={classes.link}>
                {props?.buttonText}
              </Link>
            </Button>
          </div>
        </Container>
              <div className={classes.dots_container}>
                <div
                  onClick={() => sliderRef.current.slickPrev()}
                  className={props?.dots === 1 ? classes.dot_active : classes.dot}
                />
            
                <div
                  onClick={() => sliderRef.current.slickNext()}
                  className={props?.dots === 2 ? classes.dot_active : classes.dot}
                />
              </div>
              <div className={classes.slideBottomBackground}>
            </div>  
      </div>
    </Container>
  );
};

const sliderConfig = {
  speed: 500,
  infinite: true,
  fade: true,
  slidesToScroll: 1,
  arrows: false,
  draggable: false,
  swipe: true,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3000,
};
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  slider: {
    minHeight: "520px",
    maxHeight: 540,
    width: "100%",
  },
  slideBottomBackground:{
    position: "absolute",
    bottom: 0,
    width:"100%",
    height:"20px",
  },
  sliderItemBackImg: {
    background: colors.lightGray,
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5),rgba(37,37,37,1) 100%), url(${props.backgroundImg})`,
    backgroundPosition: "center",
    filter: "blur(0px)",
    "-webkit9-filter": "blur(0px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: (props) => (props?.phone ? "600px" : "500px"),
    width: "100%",
    justifyContent: "center",
  },
  sliderItemContainer: {
    position: "relative",
    zIndex: 99,
    transform: "translate(0px, -100%)",
    marginBottom: 40,
    width: "100%",
    justifyContent: "center",
  },
  textContainer: {
    width: "1300px",
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    minHeight: "250px",
    paddingTop: "20px",
    marginBottom: "70px",
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
    fontSize: (props) => (props?.phone ? 8 : 18),
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
    fontSize: (props) => (props?.phone ? 8 : 18),
  },
  avatarColumnTime: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "300",
    fontFamily: "'Roboto Condensed', sans-serif",
    color: "white",
    fontSize: (props) => (props?.phone ? 4 : 12),
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
    fontFamily: "SF Pro Display",
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
