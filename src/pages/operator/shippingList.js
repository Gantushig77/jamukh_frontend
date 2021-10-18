import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import AppBar from '../../components/appbar/appbar';
import PageAbout from '../../components/adminComponents/pageAbout';
import OptionsCore from '../../components/core/optionsCore';
import user from '../../assets/icons/user.svg';
import sansar from '../../assets/images/sansar.png';
import DriverCard from '../../components/operator/driverCard';
import UnavailableDrivers from '../../components/operator/unavailableDrivers';

export default function ShippingList({
  driversData = [
    {
      driverImage: user,
      driverName: 'Жолооч 1',
      phone: '9933 8421',
      carType: 'Mazda Бүхээгтэй',
      shopData: [
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
      ],
    },
    {
      driverImage: user,
      driverName: 'Жолооч 2',
      phone: '9933 8421',
      carType: 'Mazda Бүхээгтэй',
      shopData: [
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
      ],
    },
    {
      driverImage: user,
      driverName: 'Жолооч 3',
      phone: '9933 8421',
      carType: 'Mazda Бүхээгтэй',
      shopData: [
        {
          shopImage: sansar,
          shopName: 'Sansar Supermarket',
          shopRating: '4.7',
          date: '2021.6.12',
          shopAddress:
            'БЗД, Сансарын үйлчилгээний төвийн баруун талд Altan Joloo Group Office 11000, Ulaanbaatar',
          size: '12',
          price: '108,000,00',
          onClose: () => alert('Card deleted'),
        },
      ],
    },
    {
      driverImage: user,
      driverName: 'Жолооч 4',
      phone: '9933 8421',
      carType: 'Mazda Бүхээгтэй',
      shopData: [],
    },
  ],
}) {
  const classes = useStyles();
  const [hoverCard, setHoverCard] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [menu, setMenu] = useState(0);
  const [showDrivers, setShowDrivers] = useState(false);

  return (
    <>
      <AppBar />
      <Container maxWidth={false} disableGutters className={classes.root}>
        <Container>
          <PageAbout
            title={'Хүргэлт'}
            desc={
              'Энд худалдан авагчийн түүх харагдаж байна.Мөн хэрэглэгчийг мах авахад хэрэглэгчийн мэдээллийг авах болон шалгах хэсэг буюу qr код болон карт уншуулах хэсэг байрлаж байна.'
            }
            descWidth={'505px'}
          />
          <OptionsCore
            acceptValue={menu}
            onChange={setMenu}
            marginTop='35px'
            marginBottom='45px'
            options={['Боломжтой', 'Боломжгүй', 'Хүргэлтэнд Гарсан']}
          />
        </Container>
        {menu === 0 && (
          <Container className={classes.cardContainer} maxWidth={false} disableGutters>
            {driversData.map((item, index) => (
              <DriverCard
                item={item}
                index={index}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                onClickHoverButton={setShowDrivers}
                showDrivers={showDrivers}
              />
            ))}
          </Container>
        )}
        {menu === 1 && <UnavailableDrivers />}
        {menu === 2 && (
          <Container className={classes.cardContainer} maxWidth={false} disableGutters>
            {driversData.map((item, index) => (
              <DriverCard
                tracking
                hoverButtonText={'Tracking'}
                item={item}
                index={index}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                onClickHoverButton={() => alert('Tracking')}
              />
            ))}
          </Container>
        )}
      </Container>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 0,
    overflowX: 'scroll',
    paddingLeft: 50,
  },
});
