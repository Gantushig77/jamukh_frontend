import React from 'react';
// import { useMediaQuery } from '@mui/material';
// import json2mq from 'json2mq';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';

export default function Friends(props) {
  const classes = useStyles(props);
  // const phoneSize = useMediaQuery('(max-width: 767px)');
  // const tabletSize = useMediaQuery(
  //   json2mq({
  //     minWidth: 768,
  //     maxWidth: 1023,
  //   })
  // );

  return (
    <div className={classes.container}>
      <img src={props.img} className={classes.img} alt={''} />
      <div className={classes.name}>{props.name}</div>
      <div className={classes.rate}>
        <StarIcon className={classes.starRank} />
        {props.rate}
      </div>
      <div className={classes.button}>{props.button}</div>
    </div>
  );
}
const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #D3D3D3',
    width: '150px',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '10px',
    borderRadius: '5px',
  },
  rate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    fontSize: '14px',
  },
  button: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  starRank: {
    fontSize: '16px',
  },
  name: {
    marginTop: '55px',
    fontWeight: '700',
    color: '#D38F63',
    fontSize: '20px',
  },
  img: {
    height: '90px',
    width: '90px',
    borderRadius: '100%',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    top: '-50px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
});
