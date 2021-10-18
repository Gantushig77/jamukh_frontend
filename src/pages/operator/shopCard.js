import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import star from '../../assets/icons/star.svg';
import close from '../../assets/icons/close.svg';
import sansar from '../../assets/images/sansar.png';

export default function ShopCard({
  item = {
    shopImage: sansar,
    shopName: 'Sansar Supermarket',
    shopRating: '4.7',
    date: '2021.6.12',
    shopAddress:
      'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
    size: '12',
    price: '108,000,00',
  },
  noCloseButton,
  onClick = () => {},
  onClose = () => {},
}) {
  const classes = useStyles();

  return (
    <Container
      className={classes.shopCard}
      onClick={onClick}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <Container className={classes.shopContainer}>
        <img className={classes.shopImage} alt={'shopImage'} src={item.shopImage} />
        <div className={classes.shopInfo}>
          <Typography className={classes.shopName}>{item.shopName}</Typography>
          <div className={classes.shopInfoContent}>
            <img alt={'icon'} className={classes.icon} src={star} />
            <Typography className={classes.shopInfoText}>
              {item.shopRating} · {item.date}
            </Typography>
          </div>
        </div>
        {noCloseButton ? (
          ''
        ) : (
          <img
            src={close}
            alt={'close'}
            className={classes.shopClose}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        )}
      </Container>
      <Typography className={classes.shopAddress}>{item.shopAddress}</Typography>
      <Typography className={classes.productInfo}>
        {item.size}кг · {item.price}₮
      </Typography>
    </Container>
  );
}

const useStyles = makeStyles({
  shopCard: {
    width: 300,
    backgroundColor: '#fff',
    height: 'fit-content',
    borderRadius: 17,
    display: 'flex',
    flexDirection: 'column',
    padding: 17,
    marginBottom: 27,
    boxShadow: '0px 7px 11px #0A0A0B1A',
    cursor: 'pointer',
  },
  shopContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    marginBottom: 14,
  },
  shopImage: {
    width: 42,
    height: 42,
    borderRadius: 11,
    marginRight: 11,
  },
  shopName: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
  },
  shopInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 160,
    marginRight: 30,
  },
  icon: {
    opacity: 1,
    marginRight: 7,
  },
  shopInfoContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopInfoText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
  },
  shopClose: {
    width: 24,
    height: 24,
    cursor: 'pointer',
  },
  shopAddress: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
    textAlign: 'start',
    marginBottom: 17,
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'row',
    color: '#6A67D3',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
