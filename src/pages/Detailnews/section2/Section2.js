import React, { useRef, useContext } from "react";
import { Container, Typography, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import colors from "../../../constants/colors";
import TheContext from "../../../context/context";
import Rec from "../../../assets/images/reclamDemo.png";
import Test from "../../../assets/images/1.png"
import GoogleMapReact from 'google-map-react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./section.css"
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function Section2(props) {
  const classes = useStyles(props);
  let slider = useRef(null);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <div className={classes.titleNews}>GRAND MARSHAL LUXURY VILLAS</div>
      <div className={classes.calendar}>2021 оны 09 сарын 02 ны өдөр 11:23:45 цагт</div>
      <Container disableGutters maxWidth={false} className={classes.container}>
        <div className={classes.containerNews}>
          <div className={classes.subTitle}>INFORMATION</div>
          <div className={classes.newsText}>
            Ideally, architects of houses design rooms to meet the needs of the
            people who will live in the house. Feng shui, originally a Chinese method
            of moving houses according to such factors as rain and micro-climates,
            has recently expanded its scope to address the design of interior spaces,
            with a view to promoting harmonious effects on the people living inside
            the house, although no actual effect has ever been demonstrated. Feng
            shui can also mean the “aura” in or around a dwelling, making it
            comparable to the real estate sales concept of “indoor-outdoor flow”.
            Ideally, architects of houses design rooms to meet the needs of the
            people who will live in the house. Feng shui, originally a Chinese method
            of moving houses according to such factors as rain and micro-climates, 
            </div>
          <div className={classes.newsGallery}>
              <div className={classes.tabs}>
                <div className={classes.activeTab}>PHOTOS</div>
                <div className={classes.tab}>VIDEOS</div>
                <div className={classes.tab}>360 VR</div>
              </div>
              <div className={classes.tabContainer}>
              <img src={Test}/>  
              <img src={Test}/>
              <img src={Test}/>
              <img src={Test}/>
              <img src={Test}/>
              <img src={Test}/>
              </div>
          </div>    
        </div>
        <div style={{ width: "20%" }} className={classes.containerRec}>
          <div className={classes.rec}>
              <img src={Rec} className={classes.recImg}/>
              <div className={classes.recName}>
                 Grand Marshal
              </div>  
              <div className={classes.recCompany}>
                 Construction Company
              </div>  
              <div className={classes.recSale}>
                 Sale
              </div>  
              <div className={classes.recMkv}>
                 MKV 7,500,000₮
              </div>  
              <div className={classes.recPhone}>
                  Phone 
              </div>  
              <div className={classes.recPhoneButton}>
                 7777-3333
              </div> 
              <div className={classes.recPhoneButton}>
              7000-3333
              </div> 
          </div>  
        
          <div className={classes.block} style={{ height: '400px', width: '100%', marginTop: "10px" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDWQs_bQeiRWTon2HDAgvd1_FEXxMqeU-E" }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33
              }}
              defaultZoom={11}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
          <div style={{  marginTop: "20px" ,border:"1px solid #D3D3D3",padding:"5px"}}>
            <div className={classes.infoTitle}>
              UPPER GROUND LEVEL
            </div>
            <table className={classes.table}>
              <tr className={classes.tr}>
                <th>№</th>
                <th>NAME</th>
                <th>M2</th>
              </tr>
              <div/>
              <tr className={classes.trNormal}>
                <td >1</td>
                <td>Entrance, Circulation Spaces, Store & Service</td>
                <td>110.4</td>
              </tr>
              <tr className={classes.trNormal}>
                <td>1</td>
                <td>Entrance, Circulation Spaces, Store & Service</td>
                <td>110.4</td>
              </tr>
              <tr className={classes.trBottom}>
                <td></td>
                <td>Total Net Surface Upper Ground Level</td>
                <td>645.9</td>
              </tr>
            </table>
            <div className={classes.btnContainer}>
              <div className={classes.btn}>
                SEE ALL <ArrowForwardIosIcon style={{fontSize:"16px"}}/>
              </div>  
            </div>
          </div>
        </div>
    
      </Container>
      <Container disableGutters maxWidth={false} className={classes.container}>
      <div className={classes.like}>
        <div className={classes.likeTitle}>
           YOU MAY ALSO LIKE
        </div>
        <div className={classes.row}>
          <div className={classes.img}><img src={Test}/></div>
          <div className={classes.img}><img src={Test}/></div>
          <div className={classes.img}><img src={Test}/></div>
          <div className={classes.img}><img src={Test}/></div>
        </div>  
      </div>
      </Container>
    </Container>
  );
}





const useStyles = makeStyles({
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: "100%",
    zIndex: "1",
    fontFamily: "Roboto Condensed"
  },
  rec:{
    display:"flex",
    alignItems:"center",
    backgroundColor:"#252525",
    flexDirection:"column",
    padding:"20px",
    textAlign:"center"
  },
  recPhoneButton:{
    marginTop:"5px",
    color:"white",
    width:"100%",
    padding:"8px 5px",
    background:"linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)"
  },
  recPhone:{
    color:"white",
    fontSize:"15px",
    marginTop:"25px"
  },
  recMkv:{
    color:"white",
    fontSize:"22px",
    fontWeight:"700",
    marginTop:"5px",
  },
  recSale:{
    color:"white",
    fontSize:"15px",
    marginTop:"25px",
  },
  recCompany:{
    color:"white",
    fontSize:"15px",
    marginTop:"5px",
  },
  recImg:{
    height:"150px",
    width:"150px"
  },
  recName:{
    color:"#D38F63",
    fontWeight:"bold",
    fontSize:"25px",
    marginTop:"10px"
  },
  like:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    marginTop:"20px",
    width:"100%"
  },
  likeTitle:{
    fontSize:"30px",
    fontWeight:"bold",
    marginTop:"30px",
    color:"#D38F63"
  },
  newsGallery:{
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
  },
  tabContainer:{
    display: "grid",
    height: "200px",
    gridTemplate: "repeat(4, 1fr) / repeat(4, 1fr)",
    gap:"20px 5px"
  },
  btnContainer: {
    marginTop:"10px",
    display:"flex",
    alignItems:"flex-end",
    justifyContent:"flex-end"
  },
  tab:{
    width:"auto",
    padding:"10px 30px",
  },
  activeTab:{
    display:"flex",
    alignItems:"center",
    backgroundColor:"#D38F63",
    color:"white",
    padding:"10px 30px",  
  
  },
  tabs:{
    display:"flex",
    alignItems:"center",
    marginTop:"50px",
    justifyContent:"flex-start",
    marginBottom:"10px"
  },
  btn:{
    display:"flex",
    alignItems:"center",
    color:"white",
    fontSize:"16px",
    background: "linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)",
    padding:"5px 10px"
  },

  trBottom:{
    textAlign:"left"
  },
  trNormal:{
    textAlign:"left",
    fontWeight:"300!important",
    borderBottom:"1px solid #F0F0F0",
 
  },
  tr:{
    color:"#D38F63",
    textAlign:"left",
  },
  newsText: {
    textAlign: "justify",
    fontWeight: "300",
    lineHeight: "25px"
  },
  containerRec: {
    display: "flex",
    flexDirection: "column"
  },
  infoTitle: {
    color: "#D38F63",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "2px",
    marginBottom:"10px",
    padding:"5px"
  },
  containerNews: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    height: "100px",
    paddingRight: "30px"
  },
  container: {
    display: "flex",
    width: "1100px",
    justifyContent: "flex-start"
  },
  titleNews: {
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: "35px",
    lineHeight: "70px",
    color: "#D38F63",
    textAlign:"center"
  },
  row:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    width:"100%",
    marginTop:"20px"
  },
  calendar: {
    fontWeight: "400",
    fontSize: "12px",
    textAlign:"center"
  },
  subTitle: {
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: "25px",
    lineHeight: "70px",
    color: "#D38F63"
  },
  textContainer: {
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    minHeight: "250px",
    paddingTop: "20px",
    marginBottom: "70px",
    paddingLeft: (props) => (props?.phone ? "10%" : "10%"),
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
    minHeight: 30
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
