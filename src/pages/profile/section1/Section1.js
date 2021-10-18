import React, { useRef, useContext } from "react";
import { Container, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import colors from "../../../constants/colors";
import TheContext from "../../../context/context";
import Sale from "../../../assets/icons/sale.png";
import Members from "../../../assets/icons/member.png";
import Rate from "../../../assets/icons/rate.png";
import Heart from "../../../assets/icons/heart.png";
import Avatar from "../../../assets/images/avatar.jpg";
import Test from "../../../assets/images/test.png";
import Plat from "../../../assets/images/plat.png";
import StarIcon from "@mui/icons-material/Star";
export default function Section1(props) {
  const classes = useStyles(props);
  let slider = useRef(null);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <SliderItem
        dots={1}
        sliderRef={slider}
        phone={props?.phone}
        avatar={""}
        admin={"Grand Marshal"}
        time={"12min"}
        area={"MKV 4,500,000$"}
        title={"Gantumur Batmunkh"}
        email={`batmunkh@gmail.com`}
        buttonText={account ? "Үйлчилгээ харах" : "SEE ALL >"}
        backgroundImg={Avatar}
        link={account ? "/user/services" : "/sign-up"}
      />
    </Container>
  );
}

const SliderItem = (props) => {
  let sliderRef = props.sliderRef;
  const classes = useStyles(props);
  const path = (
    <svg
      width="50"
      height="78"
      viewBox="0 0 80 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path d="M4 0H76V100L40.792 82L4 100V0Z" fill="#D38F63" />
        <path
          d="M40.5723 81.5509L4.5 99.1988V0.5H75.5V99.1828L41.0196 81.5548L40.7969 81.441L40.5723 81.5509Z"
          stroke="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="80"
          height="108"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
  return (
    <Container disableGutters maxWidth={false} >
      <div className={classes.rootRow}>
        <div className={classes.sliderItemBackImg} />
        <div className={classes.sliderItemContainer}>
          <div className={classes.row1}>
            <div className={classes.textContainer}>
              {path}
              <div className={classes.avatar}>
                <img alt="JamukhImg" src={Avatar} className={classes.avatarImg} />
              </div>
              <Typography className={classes.title}>{props?.title}</Typography>
              <Typography className={classes.email}>{props?.email}</Typography>
              <div className={classes.row}>
                <div className={classes.column}>
                  <img alt="JamukhImg" src={Sale} className={classes.icons} />
                  <div className={classes.saleText}>My sales</div>
                  <div className={classes.saleCount}>12</div>
                </div>
                <div className={classes.column}>
                  <img alt="JamukhImg" src={Members} className={classes.icons} />
                  <div className={classes.saleText}>Members</div>
                  <div className={classes.saleCount}>12</div>
                </div>
                <div className={classes.column}>
                  <img alt="JamukhImg" src={Rate} className={classes.icons} />
                  <div className={classes.saleText}>My rate</div>
                  <div className={classes.saleCount}>12</div>
                </div>
                <div className={classes.column}>
                  <img alt="JamukhImg" src={Heart} className={classes.icons} />
                  <div className={classes.saleText}>Favorita</div>
                  <div className={classes.saleCount}>12</div>
                </div>
              </div>
            </div>
            <div className={classes.memberContainer}>
              <div className={classes.memberTop}>
                <div className={classes.memberTitle}>MEMBERS</div>
                <div className={classes.memberTitleSEE}>SEE ALL ></div>
              </div>
              <div className={classes.memberSmallProfiles}>
                <div className={classes.smallProfile}>
                  <div className={classes.smallProfileAvatar}>
                    <img
                      alt="JamukhImg"
                      src={Avatar}
                      className={classes.avatarImage}
                    />
                    <div className={classes.smallProfileTitle}>Gantulga</div>
                    <div className={classes.smallProfileRank}>
                      <StarIcon className={classes.starRank} />
                      4.6
                    </div>
                  </div>
                </div>
                <div className={classes.smallProfile}>
                  <div className={classes.smallProfileAvatar}>
                    <img
                      alt="JamukhImg"
                      src={Avatar}
                      className={classes.avatarImage}
                    />
                    <div className={classes.smallProfileTitle}>Gantulga</div>
                    <div className={classes.smallProfileRank}>
                      <StarIcon className={classes.starRank} />
                      4.6
                    </div>
                  </div>
                </div>
                <div className={classes.smallProfile}>
                  <div className={classes.smallProfileAvatar}>
                    <img
                      alt="JamukhImg"
                      src={Avatar}
                      className={classes.avatarImage}
                    />
                    <div className={classes.smallProfileTitle}>Gantulga</div>
                    <div className={classes.smallProfileRank}>
                      <StarIcon className={classes.starRank} />
                      4.6
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.mySales}>MY SALES</div>
          <div className={classes.myDiv}>
            <img src={Test} style={{ height: "300px", width: "200px" }} alt="test"/>
            <img src={Test} style={{ height: "300px", width: "200px" }} alt="test"/>
            <img src={Test} style={{ height: "300px", width: "200px" }} alt="test"/>
            <img src={Test} style={{ height: "300px", width: "200px" }} alt="test"/>
            <img src={Test} style={{ height: "300px", width: "200px" }} alt="test"/>
          </div>

        </div>
        <div className={classes.membersAdvantage}>
          <div className={classes.membersAdvantageContaint}>
            <div>
              <img src={Plat} className={classes.membersLogo} />
            </div>
            <div className={classes.membersTextContainer}>
              <div className={classes.membersTitle}>
                PLATINIUM MEMBERS ADVENTAGE
              </div>
              <div className={classes.membersDescription}>
                Ideally, architects of houses design rooms to meet the needs of the people who will live in the house.
                Feng shui, originally a Chinese method of moving houses according to such factors as rain and micro-
                climates, has recently expanded its scope to address the design of interior spaces, with a view to
                promoting harmonious effects on the people living inside the house, although no actual effect has ever…
              </div>
              <div className={classes.membersButtonContainer}>
                <div className={classes.membersButton}>
                  SEE ALL >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.mySales}>MY SALES</div>
        <div className={classes.myDiv}>
          <img src={Test} style={{ height: "300px", width: "200px" }} />
          <img src={Test} style={{ height: "300px", width: "200px" }} />
          <img src={Test} style={{ height: "300px", width: "200px" }} />
          <img src={Test} style={{ height: "300px", width: "200px" }} />
          <img src={Test} style={{ height: "300px", width: "200px" }} />
        </div>

        <div className={classes.aboutContainers}>
          <div className={classes.aboutContainer}>
              <div className={classes.aboutGenerel}>
                <img src={Avatar} className={classes.aboutGenerelImg}/>
                <Typography className={classes.title}>{props?.title}</Typography>
                <Typography className={classes.email1}>{props?.email}</Typography>
              </div>
              <div className={classes.aboutMe}>
                  <div  className={classes.aboutMeTitle}>
                    ABOUT ME
                  </div>
                  <div  className={classes.aboutMeDescription}>
                      Ideally, architects of houses design rooms to meet the needs of 
                      the people who will live in the house. Feng shui, originally a Chinese 
                      method of moving houses according to such factors as rain and 
                      micro-climates, has recently expanded its scope to address the
                      design of interior spaces, with a view to promoting harmonious 
                      effects on the people living inside the house, although no actual 
                      effect has ever been demonstrated. Feng shui can also mean the 
                      “aura” in or around a dwelling, making it comparable to the real 
                      estate sales concept of “indoor-outdoor flow”.
                  </div>
              </div>
          </div>    
          <div className={classes.aboutCv}>
                   <div  className={classes.aboutMeTitle}>
                    CV
                  </div>
                    <table style={{width:"100%"}}>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Name</td>
                          <td className={classes.td}>Irmuunzaya</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Years</td>
                          <td className={classes.td}>1988.05.06</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Education</td>
                          <td className={classes.td}>USA,Oxford Univercity, 
International Management </td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Work experience</td>
                          <td className={classes.td}>Google Group, Marketing 
Manager</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>References</td>
                          <td className={classes.td}>English, Spanish, Germany</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Career</td>
                          <td className={classes.td}>Mongolian Leader Manager</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Certifications</td>
                          <td className={classes.td}>International TOP 
Manager 2012</td>
                        </tr>
                        <tr className={classes.tableBorder}>
                          <td className={classes.tdF}>Projects</td>
                          <td className={classes.td}>Golomt bank </td>
                        </tr>
                    </table>
          </div>
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
  aboutContainers:{
    display:"flex",
    backgroundColor:"green",
    marginBottom:"100px",
    height:"2000px"
  },
  tableBorder:{
    display:"flex",
    width:"100%",
    padding:"5px",
    borderBottom:"1px solid #F0F0F0"
  },
   
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: "100%",
    fontFamily: "Roboto Condensed",
    backgroundColor: colors.backgroundColor
  },
  tdF:{
    textAlign:"left",
    width:"50%",
    fontWeight:"300"
  },
  td:{
    textAlign:"left",
    width:"50%"
  },
  aboutGenerelImg:{
    width:"150px",
    borderRadius:"100%",
    marginBottom:"20px"
  },
  aboutMeDescription:{
    textAlign:"justify",
    fontWeight:"300",
    fontSize:"26px"
  },
  aboutCv:{
    width:"30%",
    height:"100%",
    backgroundColor:"white",
    padding:"20px",
  },
  aboutMeTitle:{
    display:"flex",
    justifyContent:"flex-start",
    color:colors.brandTextColor,
    fontSize:"32px",
    fontWeight:"bold",
    marginBottom:"30px"
  },
  aboutMe:{
    padding:"20px",
   
  },
  aboutContainer: {
    display: "flex",
    backgroundColor:"white",
      
    width:"70%",
    marginRight:"10px"
  },
  aboutContainers:{
    display:"flex",
    margin: " 0px 40px",
    justifyContent:"space-between"
  },
  aboutGenerel:{
    padding:"40px",
    borderRight:"1px solid #CBCBCB"
  },
  membersButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  membersButton: {
    display: "flex",
    width: "100px",
    justifyContent: "center",
    marginTop: "20px",
    color: "white",
    padding: "5px",
    background: "linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)"
  },
  rootRow: {
    backgroundColor: colors.backgroundColor,
    height: "auto"
  },
  starRank: {
    fontSize: "18px",
  },
  membersTextContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"

  },
  membersAdvantageContaint: {
    margin: "40px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "30px"
  },
  membersLogo: {
    height: "200px",
    marginRight: "30px"
  },
  membersTitle: {
    color: colors.brandTextColor,
    fontSize: "34px",
    marginBottom: "10px"
  },
  membersDescription: {
    color: "black",
    fontSize: "20px"


  },
  membersAdvantage: {


  },
  myDiv: {
    display: "flex",
    padding: "40px",
    justifyContent: "space-between"
  },
  mySales: {
    display: "flex",
    flexDirection: "row",
    padding: "0 50px",
    fontSize: "28px",
    fontWeight: "bold",
    color: colors.brandTextColor
  },
  smallProfile: {},
  memberSmallProfiles: {
    display: "flex",
    alignItems: "flex-start",
    padding: "5px",
  },
  smallProfileAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  smallProfileRank: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5px",
    color: "white",
    fontSize: "16px",
  },
  smallProfileTitle: {
    marginTop: "15px",
    color: colors.brandTextColor,
    fontSize: "16px",
    fontWeight: "bold",
  },
  memberContainer: {
    display: "flex",
    minWidth: (props) => (props.phone ? "100%" : "60%"),
    flexDirection: "column",
  },
  avatarImage: {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
  },
  memberTop: {
    display: "flex",
    minWidth: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  memberTitle: {
    color: colors.brandTextColor,
    fontSize: "28px",
    fontWeight: "bold",
  },
  memberTitleSEE: {
    color: "white",
    fontSize: "16px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  icons: {
    height: "25px",
    width: "25px",
  },
  avatarImg: {
    height: "150px",
    width: "150px",
    borderRadius: "100%",
  },
  row1: {
    display: "flex",
    alignItems: "center",
  },
  faceIcon: {
    fontSize: "80px",
    border: `1px dashed ${colors.brandTextColor}`,
    borderRadius: "100%",
    marginBottom: "10px",
  },
  slider: {
    minHeight: "520px",
    maxHeight: 540,
    width: "100%",
  },
  path: {
    background: "#D38F63",
    border: "1px solid #000000",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: "100px",
  },
  slideBottomBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "20px",
  },
  saleText: {
    fontSize: "12px",
    color: "white",
    marginTop: "5px",
    fontFamily: "Roboto Condensed",
  },
  saleCount: {
    fontSize: "22px",
    color: "#D38F63",
    marginTop: "5px",
    fontWeight: "bold",
    fontFamily: "Roboto Condensed",
  },
  sliderItemBackImg: {
    boxShadow:
      " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5),rgba(37,37,37,1) 100%), url(${props.backgroundImg})`,
    backgroundPosition: "center",
    filter: "blur(0px)",
    "-webkit9-filter": "blur(0px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: (props) => (props?.phone ? "600px" : "500px"),
    marginBottom: 60,
    width: "100%",
    justifyContent: "center",
  },
  sliderItemContainer: {
    dislay: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 99,
    transform: "translate(0px, -100%)",
    height: (props) => (props?.phone ? "600px" : "500px"),
    marginBottom: 10,
    width: "100%",
  },
  textContainer: {
    display: "flex",
    backgroundColor: "#171717",
    width: "220px",
    flexDirection: "column",
    justifyContent: "flex-start",
    minHeight: "100px",
    margin: "90px",
    marginTop: "10px",
    padding: (props) => (props?.phone ? "10px" : "10px"),
    borderRadius: "5px",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#AA7654",
    fontFamily: "'Roboto Condensed', sans-serif",
    marginTop: (props) => (props?.phone ? "10px" : "30px  "),
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
    flexDirection: "column",
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
    alignItems: "center",
    fontSize: (props) => (props?.phone ? 18 : 18),
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "700",
    justifyContent: "center",
    textAlign: "center",
    color: colors.brandTextColor,
    maxWidth: "300px",
    minHeight: 30,
    marginTop: 5,
  },
  email: {
    color: "white",
    minHeight: 64,
    fontSize: "12px",
  },
  email1: {
    color: "black",
    minHeight: 64,
    fontSize: "12px",
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
