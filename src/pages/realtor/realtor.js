import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Background from '../../assets/background/news.png';
import { makeStyles } from '@mui/styles';
import Footer from '../../components/footer/footer';
import Section2 from './section2/Section2';

export default function Detailnews(props) {
  const classes = useStyles(props);
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  return (
    <div className={classes.background}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <Section2 phone={phoneSize} tablet={tabletSize} />
      <div className={classes.footer}>
        <Footer phone={phoneSize} tablet={tabletSize} />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
  },
  footer: {
    position: 'sticky',
    top: 'calc( 100vh - 60px )',
    width: '100%',
  },
});
