import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const options = ["None", "Atria", "Callisto", "Dione", "Ganymede", "Hangouts Call", "Luna", "Oberon", "Phobos", "Pyxis", "Sedna", "Titania", "Triton", "Umbriel"];

const ITEM_HEIGHT = 20;

export default function MoreMenuCore({
  options = [
    {
      title: '[сонголт]',
      onClick: () => {
        alert('Функц оруулна уу');
      },
    },
  ],
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {options.length ? (
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((item) => (
            <MenuItem
              key={item.title}
              selected={item.title === 'Pyxis'}
              onClick={() => {
                handleClose();
                if (item.onClick) item.onClick();
              }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  );
}
