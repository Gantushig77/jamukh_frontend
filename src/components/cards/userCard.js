import React from 'react';
import { makeStyles } from '@mui/styles';
import { CSS_HELPER } from '../../constants/helper';
import ImgCore from '../core/imgCore';
import MoreMenuCore from '../core/moreMenuCore';
import { PLACE_HOLDER } from '../../constants/placeholder';

export default function UserCard({
  imageUrl = PLACE_HOLDER.user,
  fullName = '[Овог. Нэр]',
  username = '[Хэрэглэгчийн нэр]',
  onChangeImage,
  onChangeTitle,
  options = [
    {
      title: '[сонголт]',
      onClick: () => {
        alert('Функц оруулна уу');
      },
    },
  ],
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImgCore src={imageUrl} className={classes.avatar} />
      <div className={classes.main}>
        <h1 className={classes.name}>{fullName}</h1>
        <h2 className={classes.username}>{username}</h2>
        <div className={classes.buttons}>
          <h1 className={classes.button} onClick={onChangeImage}>
            {onChangeTitle ?? 'Зураг солих'}
          </h1>
          <MoreMenuCore options={options} />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'max-content',
    height: 250,
    // minHeight: "max-content",
    width: 198,
    alignItems: 'center',
    backgroundColor: 'white',
    // border: "1px solid lightGray",
    borderRadius: 7,
  },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    objectFit: 'cover',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...CSS_HELPER.initializeFont,
  },
  name: {
    ...CSS_HELPER.initializeFont,
    marginTop: 17,
    fontSize: 21,
    fontWeight: 'bold',
  },
  username: {
    ...CSS_HELPER.initializeFont,
    marginTop: 17,
    fontSize: 17,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.5)',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 21, // width: "200px",
    cursor: 'pointer',
  },
  button: {
    ...CSS_HELPER.initializeFont,
    padding: '11px 12px',
    color: 'white',
    backgroundColor: '#6A67D3',
    fontWeight: 'normal',
    borderRadius: 7,
    marginRight: 7,
  },
  moreButton: {},
});
