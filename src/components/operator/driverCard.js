import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import ShopCard from '../../pages/operator/shopCard';
import DriversList from './driversList';

export default function DriverCard({
  item,
  index,
  hoverCard,
  setHoverCard,
  hoveredCard,
  setHoveredCard,
  hoverButtonText = 'Захиалга оноох',
  onClickHoverButton = () => {},
  tracking,
  showDrivers,
}) {
  const classes = useStyles();

  return (
    <Container
      className={classes.driverDeliveryCard}
      onMouseEnter={() => {
        setHoverCard(true);
        setHoveredCard(index);
      }}
      onMouseLeave={() => setHoverCard(false)}
    >
      {showDrivers && <DriversList closeModal={() => onClickHoverButton(false)} />}

      <Container className={classes.driverContainer}>
        <img alt={'driverImage'} src={item.driverImage} className={classes.driverImage} />
        <div className={classes.driverText}>
          <Typography className={classes.driverName}>{item.driverName}</Typography>
          <Typography className={classes.driverInfo}>
            {item.phone} · {item.carType}
          </Typography>
        </div>
      </Container>
      {item.shopData.map((item) => (
        <ShopCard
          item={item}
          onClose={item.onClose}
          onClick={() => alert('Card pressed')}
        />
      ))}
      {hoverCard && hoveredCard === index && (
        <Container className={classes.buttonContainer}>
          {tracking ? (
            <Typography
              className={classes.trackingButton}
              onClick={() => onClickHoverButton()}
            >
              {hoverButtonText}
            </Typography>
          ) : (
            <>
              <Typography
                className={classes.orderButton}
                onClick={() => onClickHoverButton(true)}
              >
                {hoverButtonText}
              </Typography>
              <Typography className={classes.nextButton}></Typography>
            </>
          )}
        </Container>
      )}
    </Container>
  );
}

const useStyles = makeStyles({
  driverDeliveryCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7fd',
    width: 330,
    minWidth: 330,
    maxHeight: 580,
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 'max-content',
    borderRadius: 21,
    padding: 0,
    marginRight: 27,
    marginLeft: 0,
    boxSizing: 'border-box',
    '&:nth-child(2n)': {
      backgroundColor: '#fef7f6',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  driverContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    position: 'sticky',
    top: 0,
    padding: 17,
    paddingBottom: 10,
    backgroundColor: 'inherit',
    zIndex: 10,
  },
  driverImage: {
    width: 46,
    height: 46,
    borderRadius: 11,
    marginRight: 11,
  },
  driverText: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    textAlign: 'start',
  },
  driverName: {
    fontSize: 21,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
  },
  driverInfo: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    opacity: 0.5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 48,
    width: 263,
    position: 'sticky',
    bottom: '8%',
    padding: 0,
  },
  trackingButton: {
    width: 300,
    height: 48,
    backgroundColor: '#6A67D3',
    borderRadius: 14,
    color: '#fff',
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  orderButton: {
    width: 205,
    height: 48,
    backgroundColor: '#6A67D3',
    borderRadius: 14,
    color: '#fff',
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    cursor: 'pointer',
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: '#F95A48',
    cursor: 'pointer',
  },
});
