import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import PageAbout from '../adminComponents/pageAbout';
import ShopCard from '../../pages/operator/shopCard';

export default function DriversList({ closeModal = () => {}, onClick = () => {} }) {
  const classes = useStyles();
  useEffect(() => {
    window.document.body.classList.add('hide-scroll-bar');
    return () => {
      window.document.body.classList.remove('hide-scroll-bar');
    };
  }, []);

  return (
    <Container maxWidth={false} disableGutters className={classes.root}>
      <Container
        maxWidth={false}
        disableGutters
        className={classes.shadow}
        onClick={() => closeModal(false)}
      ></Container>
      <Container className={classes.modal}>
        <PageAbout
          title={'Бэлэн болсон'}
          desc={
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inven'
          }
          descWidth={'300px'}
        />
        <Container className={classes.modalContent}>
          <ShopCard noCloseButton onClick={() => alert('OnClick eventee holbono uu')} />
          <ShopCard noCloseButton onClick={onClick} />
          <ShopCard noCloseButton onClick={onClick} />
          <ShopCard noCloseButton onClick={onClick} />
        </Container>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  shadow: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    backdropFilter: 'blur(3px)',
    width: '100vw',
    height: '100vh',
    zIndex: 100,
  },
  modal: {
    width: 370,
    height: '100vh',
    backgroundColor: '#fff',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 200,
  },
  modalContent: {
    height: '100%',
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#6A67D3',
    },
  },
});
