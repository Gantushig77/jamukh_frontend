import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../constants/colors';
import './section.css';
import Background from '../../../assets/background/background.png';
import Title from '../../../components/title/title';
import Car from '../../../assets/images/cars.png';
import Car1 from '../../../assets/images/Rectangle 61.png'



export default function Section2(props) {
  const classes = useStyles(props);
  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <Title name="Lexus 600 нээлт монголд" phone={props.phone} tablet={props.tablet}/>
      <Container disableGutters maxWidth={false} className={classes.container}>
        
        <img src={Car} className={classes.coverImage}/>
        <div className={classes.containerNews}>
          <div className={classes.newsText}>
            Remember the all-new Toyota Land Cruiser 300 that launched earlier this year? Well, time to meet its posh step-sibling that was sent to private school – the new Lexus LX600. 
            And would you look at that face. Here we were thinking BMW designers were about to snatch the award for largest automotive snout of the 21st century. Lexus says the LX “pursues a blend of athletic performance, accessible functionality and striking beauty” and that the grille is “a three-dimensional shape comprised of seven sets of floating bars that create a seamless and frame-free structure". Sure, why not.
            Anyway, like the new Land Cruiser 300, the LX won’t be sold in the UK. Unlike its Toyota relation, though, it will land on US soil in early 2022. It’s based on the same new GA-F platform as the Land Cruiser too, which means it’s 20 per cent stiffer than the previous gen LX but 200kg lighter. It is still a body-on-frame build, mind. 
            It also deploys the same 409bhp 3.5-litre twin-turbo V6 petrol engine and 10spd automatic gearbox as the Toyota, but it’s the interior (as well as that grille) where the differences are most striking. In the new and confidently titled Ultra Luxury trim, Lexus has gone for a four-seat layout with proper reclining armchairs in the back. Nice.
          </div>
          <img src={Car1} className={classes.coverImage} alt=""/>
          <div className={classes.newsText}>
            You also get many, many screens including two separate touchscreens up front for the infotainment. The upper is a 12.3-inch unit while the one just below measures 7-inches. That’s a whole lot of screen.
            Lexus is at pains to point out that there’ll be an F Sport version too. That gets revised suspension and a Torsen limited slip diff on the rear axle to help it through on-road corners. It also gets a vast black hole in place of any front bumper or head-on styling. Did someone leave the Large Hadron Collider lying around the Lexus factory again?
          </div>
        </div>
      </Container>

    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: '100%',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    fontWeight:100,
    marginTop:'120px',
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
  rec: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#252525',
    flexDirection: 'column',
    padding: '20px',
    textAlign: 'center',
  },
  recPhoneButton: {
    marginTop: '5px',
    color: 'white',
    width: '100%',
    padding: '8px 5px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
  },
  recPhone: {
    color: 'white',
    fontSize: '15px',
    marginTop: '25px',
  },
  recMkv: {
    color: 'white',
    fontSize: '22px',
    fontWeight: '700',
    marginTop: '5px',
  },
  recSale: {
    color: 'white',
    fontSize: '15px',
    marginTop: '25px',
  },
  recCompany: {
    color: 'white',
    fontSize: '15px',
    marginTop: '5px',
  },
  recImg: {
    height: '150px',
    width: '150px',
  },
  recName: {
    color: '#D38F63',
    fontWeight: 'bold',
    fontSize: '25px',
    marginTop: '10px',
  },
  like: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '20px',
    width: '100%',
  },
  likeTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginTop: '30px',
    color: '#D38F63',
  },
  newsGallery: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  tabContainer: {
    display: 'grid',
    height: '200px',
    gridTemplate: 'repeat(4, 1fr) / repeat(4, 1fr)',
    gap: '20px 5px',
  },
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tab: {
    width: 'auto',
    padding: '10px 30px',
  },
  activeTab: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D38F63',
    color: 'white',
    padding: '10px 30px',
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '50px',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    padding: '5px 10px',
  },

  trBottom: {
    textAlign: 'left',
  },
  trNormal: {
    textAlign: 'left',
    fontWeight: '300!important',
    borderBottom: '1px solid #F0F0F0',
  },
  tr: {
    color: '#D38F63',
    textAlign: 'left',
  },
  newsText: {
    textAlign: 'justify',
    fontWeight: '300',
    lineHeight: '25px',
    margin:'10px 0'
  },
  containerRec: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoTitle: {
    color: '#D38F63',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '2px',
    marginBottom: '10px',
    padding: '5px',
  },
  containerNews: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop:'20px',
    color:'#C19D65'
  },
  container: {
    display: 'flex',
    flexDirection:'column',
    padding:(props) => (props?.phone ? '10px' : '40px'),
    justifyContent: 'flex-start',
    backgroundImage:(props) =>`url(${Background})`,
    width: (props) => (props?.phone ? '100%' : '1300px'),
    height:"100%",
    marginTop:'20px'
  },
  titleNews: {
    fontFamily: 'normal',
    fontWeight: 'bold',
    fontSize: '35px',
    lineHeight: '70px',
    color: '#D38F63',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20px',
  },
  calendar: {
    fontWeight: '400',
    fontSize: '12px',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '70px',
    color: '#D38F63',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: '250px',
    paddingTop: '20px',
    marginBottom: '70px',
    paddingLeft: (props) => (props?.phone ? '10%' : '10%'),
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
  coverImage:{
    width:'100%'
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
