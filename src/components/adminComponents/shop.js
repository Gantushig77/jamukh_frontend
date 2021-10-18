import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';

export default function Shop({ data, starIcon, placeholderStr = 'SHOP' }) {
  const classes = useStyles();

  return (
    <Container className={classes.shopContainer}>
      {data?.image ? (
        <img src={data.image} className={classes.shopImage} alt={'shop'} />
      ) : (
        <p className={classes.shopPlaceholder}>{placeholderStr}</p>
      )}
      <div className={classes.shopItems}>
        <Typography className={classes.shopName}>{data.name}</Typography>
        <div className={classes.shopRatingContainer}>
          {starIcon && <img src={starIcon} alt={'star'} />}
          <Typography className={classes.shopRating}>{data.rating}</Typography>
        </div>
      </div>
    </Container>
  );
}

const useStyles = makeStyles({
  shopContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 210,
    maxHeight: 42,
    padding: 0,
    margin: 0,
  },
  shopImage: {
    width: 42,
    height: 42,
    borderRadius: '11px',
    marginRight: 10,
    fontSize: 14,
    backgroundColor: 'lightGray',
  },
  shopPlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: '11px',
    marginRight: 10,
    fontSize: 14,
    marginTop: 0,
    textAlign: 'center',
    backgroundColor: 'lightGray',
  },
  shopItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  shopName: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    maxWidth: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  shopRatingContainer: {
    maxHeight: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  shopRating: {
    fontSize: 12,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    opacity: 0.5,
    overflow: 'hidden',
  },
});
