import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';

export default function UserAvatarName({ data }) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {data?.image ? (
        <img src={data.image} className={classes.image} alt={'shop'} />
      ) : (
        <p className={classes.shopPlaceholder}>AVATAR</p>
      )}
      <div className={classes.Items}>
        <Typography className={classes.name}>{data.name}</Typography>
        <div className={classes.usernameContainer}>
          <Typography className={classes.username}>{data.username}</Typography>
        </div>
      </div>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 210,
    maxHeight: 42,
    padding: 0,
    margin: 0,
  },
  image: {
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
    fontSize: 10,
    marginTop: 0,
    textAlign: 'center',
    backgroundColor: 'lightGray',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  name: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    maxWidth: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  usernameContainer: {
    maxHeight: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  username: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 600,
    opacity: 0.5,
    marginLeft: 8,
  },
});
