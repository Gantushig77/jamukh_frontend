import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PageAbout from '../../components/adminComponents/pageAbout';

export default function Filter({
  onClose = () => {},
  options = ['Үхэр', 'Хонь', 'Ямаа', 'Тахиа', 'Гахай', 'Нугас'],
  discrict = [
    'Багануур',
    'Багахангай',
    'Чингэлтэй',
    'Хан-Уул',
    'Сүхбаатар',
    'Налайх',
    'Сонгинохайрхан',
    'Баянгол',
  ],
}) {
  const classes = useStyles();
  const [types, setTypes] = useState(['']);
  const [districts, setDistricts] = useState(['']);

  const SelectTypes = (item) => {
    const index2 = types.findIndex((item2) => item === item2);
    if (index2 === -1) {
      setTypes([...types, item]);
    } else {
      types.splice(index2, 1);
      setTypes([...types]);
    }
  };

  const SelectDistricts = (item) => {
    const index2 = districts.findIndex((item2) => item === item2);
    if (index2 === -1) {
      setDistricts([...districts, item]);
    } else {
      districts.splice(index2, 1);
      setDistricts([...districts]);
    }
  };

  return (
    <Container className={classes.root} onClick={onClose}>
      <Container className={classes.container} onClick={(e) => e.stopPropagation()}>
        <PageAbout
          title={'Төрөл'}
          fontSizeTitle={'21px'}
          desc={
            'Таны худалдан авахаар сонгосон төрлийн махнуудтай нэрийн дэлгүүрийн байршил харагдана'
          }
          descWidth={'320px'}
          marginTop={'15px'}
        />
        <div className={classes.options}>
          {options.map((item, index) => (
            <Typography
              key={index}
              className={types.includes(item) ? classes.optionActive : classes.option}
              onClick={() => SelectTypes(item)}
            >
              {item}
            </Typography>
          ))}
        </div>
        <PageAbout
          title={'Дүүрэг'}
          fontSizeTitle={'21px'}
          desc={
            'Таны худалдан авахаар сонгосон төрлийн махнуудтай нэрийн дэлгүүрийн байршил харагдана'
          }
          descWidth={'320px'}
          marginTop={'15px'}
        />
        <div className={classes.options}>
          {discrict.map((item, index) => (
            <Typography
              key={index}
              className={districts.includes(item) ? classes.optionActive : classes.option}
              onClick={() => SelectDistricts(item)}
            >
              {item}
            </Typography>
          ))}
        </div>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  container: {
    width: 350,
    height: 540,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingLeft: 17,
    textAlign: 'start',
    position: 'fixed',
    top: 100,
    right: 36,
    boxShadow: '0px 7px 4px #00000029',
    zIndex: 200,
    color: '#868686',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    marginTop: 20,
  },
  option: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px 15px',
    boxSizing: 'border-box',
    borderRadius: 15,
    backgroundColor: '#f3f3f3',
    color: '#868686',
    marginRight: 11,
    marginBottom: 14,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
  optionActive: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px 15px',
    boxSizing: 'border-box',
    borderRadius: 15,
    backgroundColor: '#6A67D3',
    color: '#fff',
    marginRight: 11,
    marginBottom: 14,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
});
