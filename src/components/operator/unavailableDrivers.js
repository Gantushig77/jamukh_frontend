import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProfileCard from '../adminComponents/profileCard';
import sansar from '../../assets/images/sansar.png';

export default function UnavailableDrivers({
  data = [
    {
      userImage: sansar,
      name: 'Жолооч 5',
      phone: '9933 8421',
      carType: 'Mazda бүхээгтэй',
    },
    {
      userImage: sansar,
      name: 'Жолооч 6',
      phone: '9933 8421',
      carType: 'Mazda бүхээгтэй',
    },
    {
      userImage: sansar,
      name: 'Жолооч 7',
      phone: '9933 8421',
      carType: 'Mazda бүхээгтэй',
    },
  ],
}) {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters className={classes.root}>
      {data.map((item) => (
        <ProfileCard
          userImage={item.userImage}
          fullName={item.name}
          username={`${item.phone} · ${item.carType}`}
        />
      ))}
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    padding: 0,
    paddingLeft: 50,
  },
});
