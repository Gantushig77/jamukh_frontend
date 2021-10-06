import React from 'react';
import IconButton from '@mui/material/IconButton';
import plus_blue from '../../assets/icons/plus_blue.svg';

export default function UploadButton(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#F0EFFB',
        height: 50,
        width: 50,
        margin: 30,
        borderRadius: 12,
      }}
    >
      <input
        accept='image/*'
        id={props?.second ? 'icon-upload' : 'icon-button'}
        type='file'
        onChange={props?.onChange}
        style={{ display: 'none' }}
      />
      <label htmlFor={props?.second ? 'icon-upload' : 'icon-button'}>
        <IconButton color='primary' aria-label='upload picture' component='span'>
          <img
            src={plus_blue}
            alt={'plus_blue'}
            style={{ paddingLeft: 5, paddingTop: 5 }}
          />
        </IconButton>
      </label>
    </div>
  );
}
