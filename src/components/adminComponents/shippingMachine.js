import React, { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import ModalCore from '../core/modalCore';
import PageAbout from './pageAbout';
import add from '../../assets/icons/plus.svg';
import check from '../../assets/icons/check.svg';
import dropdown2 from '../../assets/icons/dropdown2.svg';
import dropdownUp from '../../assets/icons/dropdownUp.svg';
import user from '../../assets/icons/user.svg';

export default function ShippingMachine({
  outSideClick,
  data = [
    {
      driverImage: user,
      driverName: 'Жолоочийн Нэр',
      driverOrders: 'Нийт захиалга',
      state: 'Боломжтой',
      addOnclick: () => {},
      checkOnclick: () => {},
      detail: [
        {
          category: 'Үхэр, Ясгүй',
          size: '100',
          address: 'ХУД 15-р хороо',
          price: '1,500,000,00',
        },
      ],
    },
    {
      driverImage: user,
      driverName: 'Жолоочийн Нэр',
      driverOrders: 'Нийт захиалга',
      state: 'Боломжтой',
      addOnclick: () => {},
      checkOnclick: () => {},
      detail: [
        {
          category: 'Үхэр, Ясгүй',
          size: '100',
          address: 'ХУД 15-р хороо',
          price: '500,000,00',
        },
        {
          category: 'Үхэр, Ясгүй',
          size: '100',
          address: 'ХУД 15-р хороо',
          price: '500,000,00',
        },
      ],
    },
    {
      driverImage: user,
      driverName: 'Жолоочийн Нэр',
      driverOrders: 'Нийт захиалга',
      state: 'Боломжтой',
      addOnclick: () => {},
      checkOnclick: () => {},
      detail: [
        {
          category: 'Үхэр, Ясгүй',
          size: '100',
          address: 'ХУД 15-р хороо',
          price: '500,000,00',
        },
      ],
    },
  ],
}) {
  const classes = useStyles();
  const [showDetail, setShowDetail] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <ModalCore outSideClick={outSideClick}>
      <Container className={classes.root}>
        <PageAbout
          title={'Хүргэлтийн машин сонгох'}
          desc={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
          }
          descWidth='310px'
          marginTop={'30px'}
        />
        <div className={classes.labelContainer}>
          <Typography className={classes.label}>Нэр</Typography>
          <Typography className={classes.label}>Төлөв</Typography>
        </div>
        {data.map((item, index) => (
          <>
            <Container className={classes.driverContainer}>
              <div className={classes.driver}>
                <img
                  className={classes.driverImage}
                  src={item.driverImage}
                  alt={'driverImage'}
                />
                <div className={classes.driverText}>
                  <Typography className={classes.driverName}>
                    {item.driverName}
                  </Typography>
                  <Typography className={classes.driverOrders}>
                    {item.driverOrders}
                  </Typography>
                </div>
              </div>
              <Typography className={classes.state}>{item.state}</Typography>
              <div className={classes.buttons}>
                <Typography className={classes.button} onClick={item.addOnClick}>
                  <img src={add} alt={'icon'} className={classes.buttonIcon} />
                </Typography>
                <Typography className={classes.buttonPurple} onClick={item.checkOnClick}>
                  <img src={check} alt={'icon'} className={classes.buttonIcon} />
                </Typography>
                {showDetail && index === openDetail ? (
                  <Typography
                    className={classes.buttonGrey}
                    onClick={() => {
                      setShowDetail(false);
                    }}
                  >
                    <img src={dropdownUp} alt={'icon'} className={classes.buttonIcon} />
                  </Typography>
                ) : (
                  <Typography
                    className={classes.buttonGrey}
                    onClick={() => {
                      setShowDetail(true);
                      setOpenDetail(index);
                    }}
                  >
                    <img src={dropdown2} alt={'icon'} className={classes.buttonIcon} />
                  </Typography>
                )}
              </div>
            </Container>
            <>
              {showDetail && index === openDetail ? (
                <>
                  {item.detail.map((item) => (
                    <>
                      <Divider />
                      <Container className={classes.deliveryDetail}>
                        <div className={classes.productText}>
                          <Typography className={classes.productCategory}>
                            {item.category}
                          </Typography>
                          <Typography className={classes.productSize}>
                            {item.size}кг
                          </Typography>
                        </div>
                        <Typography className={classes.productAddress}>
                          {item.address}
                        </Typography>
                        <Typography className={classes.productPrice}>
                          {item.price}₮
                        </Typography>
                      </Container>
                      <Divider />
                    </>
                  ))}
                </>
              ) : (
                ''
              )}
            </>
          </>
        ))}
      </Container>
    </ModalCore>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: 610,
    height: 620,
    overflowY: 'scroll',
    backgroundColor: '#fff',
    borderRadius: 21,
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 35,
    paddingLeft: 35,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 36,
  },
  label: {
    width: 500,
    display: 'flex',
    justifyContent: 'start',
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    opacity: 0.5,
  },
  driverContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 0,
    marginBottom: 30,
    marginTop: 30,
  },
  driver: {
    display: 'flex',
    flexDirection: 'row',
    width: 280,
    height: 46,
  },
  driverImage: {
    width: 46,
    height: 46,
    borderRadius: '50%',
    marginRight: 10,
  },
  driverText: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textAlign: 'start',
    marginRight: 20,
  },
  driverName: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  driverOrders: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
    whiteSpace: 'nowrap',
  },
  state: {
    borderRadius: 11,
    backgroundColor: '#f7f7fd',
    color: '#6A67D3',
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    padding: '11px 15px',
    marginRight: 36,
    height: 38,
    width: 110,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 14,
    height: 14,
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#F95A48',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    cursor: 'pointer',
  },
  buttonPurple: {
    width: 38,
    height: 38,
    borderRadius: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#6A67D3',
    cursor: 'pointer',
  },
  buttonGrey: {
    width: 38,
    height: 38,
    borderRadius: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    cursor: 'pointer',
  },
  deliveryDetail: {
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
  },
  productText: {
    display: 'flex',
    flexDirection: 'column',
    width: 160,
    textAlign: 'start',
  },
  productCategory: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
  },
  productSize: {
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    opacity: 0.5,
  },
  productAddress: {
    width: 170,
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
  },
  productPrice: {
    width: 100,
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
  },
}));
