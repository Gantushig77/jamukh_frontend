import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Test from '../../../assets/images/object.png';
import Title from '../../../components/title/title'
import Background from '../../../assets/background/background.png'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import  './Section.css'


export default function Section2(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Title name="Мэдээ"/>
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <Container className={classes.cardContent}>
          <Link className={classes.menuListItem} to='/detailnews/:id'>
            <CardItem phone={props} />
          </Link>
          <Link className={classes.menuListItem} to='/detailnews/:id'>
            <CardItem phone={props} />
          </Link>  
          <Link className={classes.menuListItem} to='/detailnews/:id'>
            <CardItem phone={props} />
          </Link>    
          <Link className={classes.menuListItem} to='/detailnews/:id'>  
            <CardItem phone={props} />
          </Link>
          <Link className={classes.menuListItem} to='/detailnews/:id'>
            <CardItem phone={props} />
          </Link>
          <Link className={classes.menuListItem} to='/detailnews/:id'>
            <CardItem phone={props} />
          </Link>
          <Link className={classes.menuListItem} to='/detailnews/:id'>  
            <CardItem phone={props} />
          </Link>
          <Link className={classes.menuListItem} to='/detailnews/:id'>  
            <CardItem phone={props} />
           </Link> 
           <Stack spacing={2}>
            <Pagination count={10} variant="outlined" style={{marginTop:"20px"}}  renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  className="pageButton"
                />
              )}/>
        
          </Stack>
          </Container>
      
        </>
      )}
    </div>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props.phone);
  return (
    <div className={classes.cardRoot}>
      <img src={Test} className={classes.imageCard} alt={''} />
      <div className={classes.cardPadding}>
        <div className={classes.cardTitle}>MONGOLIAN TOP ARCHITECTURE DESIGN</div>
      
        <div className={classes.cardDesc}>
        With an all-new platform and a new, more powerful twin-turbo engine, the 2022 LX 600 features five stunning models delivering greater agility
        </div>
        <div className={classes.cardButtonContent}>
          Дэлгэрэнгүй
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:'relative',
    paddingTop:'90px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight:'100'
  },


  menuListItem:{
    textDecoration:'none',
    borderBottom:'1px solid #C19D6580',
    padding:'10px 0',
  },
  cardContent: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    position:'relative',
    backgroundImage:`url(${Background})`,
    padding:"40px",
    marginTop:'20px',
    border:'1px solid #C6824D'
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
    color:'#C19D65',
    fontWeight:'400',
    fontSize:'18px'
  },
  card: {
    width: '100px',
  },
  cardRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-evenly',
    width: '100%',
    textAlign: 'left',
    margin: 5,
   
  },
  imageCard: {
    height: '200px',
    width: '300px',
    borderRadius:'20px',
    border:'1px solid #C6824D'
  },
  cardPadding: {
    padding: '10px',
  },
  cardTitle: {
    fontSize: 30,
    color:'#C19D65',
    fontWeight:'300'
  },
  cardDesc: {
    fontSize: 20,
    fontWeight: '100',
    color:'white',
    marginTop:'10px'
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

});
