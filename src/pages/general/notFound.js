import React from 'react';
import { makeStyles } from '@mui/styles';
import Background from '../../assets/background/notFound.png'
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import { Container } from "@mui/material";


export default function NotFound(props) {
  const classes = useStyles(props);
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  return (
    <div  className={classes.root}>
       <Appbar phone={phoneSize} tablet={tabletSize} className={classes.headerBackground}/>
      <Container className={classes.content}>
        404
      </Container>
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} />
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
    padding:'0px',
    position:'relative',
    backgroundImage:`url(${Background})`,
    backgroundRepeat:'no-repeat',
    height:'100vh',
  },
  content:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    fontSize:'50px',
    color:'white'
  },
  footer:{
    position:"sticky",
    top: "calc( 100% - 90px )",
    width:"100%",
  }
})
