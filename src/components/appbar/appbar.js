import React, { useState, useContext } from 'react';
import {
  Avatar,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  IconButton,
  SwipeableDrawer,
  Tooltip,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import json2mq from 'json2mq';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
import TheContext from '../../context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { url } from '../../constants/url';
import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logo from '../../assets/logo/jamukh_black.png';
import { logout } from '../../helpers/logout';
import Background from '../../assets/background/background.png';

export default function Appbar(props) {
  // Navigation
  let history = useHistory();
  const location = useLocation();
  const currentRoute = location.pathname;

  // Styles
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1025,
    })
  );
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const classes = useStyles({
    trigger,
    phone: phoneSize,
    tablet: tabletSize,
    linkColor: props?.linkColor,
  });

  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Anchors
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  // Context
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook.account;
  const authenticated = localStorage.getItem('jamukh_auth') === 'true' ? true : false;

  // Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <AppBar position='sticky' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* Profile menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={paperProps}
        >
          <MenuItem onClick={() => history.push('/profile')}>
            <Avatar alt='Profile Avatar 2'>
              {authenticated ? (
                account?.avatar?.url ? (
                  <img
                    alt={'_test'}
                    className={classes.menuAvatar}
                    src={account?.avatar?.url}
                  />
                ) : (
                  <p style={{ fontWeight: 'bold' }}>
                    {account &&
                      account?.firstname?.length > 1 &&
                      account?.firstname[0]?.toUpperCase()}
                  </p>
                )
              ) : (
                <div />
              )}
            </Avatar>
            Профайл
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              {authenticated ? (
                <Logout fontSize='small' />
              ) : (
                <LoginIcon fontSize='small' />
              )}
            </ListItemIcon>
            {authenticated ? (
              <>
                <Typography variant='body2'>Гарах</Typography>
              </>
            ) : (
              <>
                <Typography variant='body2'>Нэвтрэх</Typography>
              </>
            )}
          </MenuItem>
        </Menu>
        {!props?.phone && !props?.tablet ? (
          <div className={classes.menuContainer}>
            {/* Logo and links */}
            <div className={classes.logoAndLinks}>
              <img
                src={Logo}
                style={{ width: '150px', cursor: 'pointer', margin: '10px 10px' }}
                onClick={() => history.push('/')}
                alt='jamukh black logo'
              />
              <div className={classes.menuListName}>
                {url.general.map((item, index) => (
                  <Link key={item} to={item} style={{ textAlign: 'center' }}>
                    <Typography
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {contextText.appbar.links.general[index]}
                    </Typography>
                  </Link>
                ))}
                <Button
                  id='basic-button'
                  aria-controls={open1 ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                  className={classes.link}
                  style={{ fontSize: 18 }}
                >
                  Үл хөдлөх
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  className={classes.realStateMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => history.push('/land')}>Газар</MenuItem>
                  <MenuItem onClick={() => history.push('/house')}>
                    Амьны орон сууц
                  </MenuItem>
                  <MenuItem onClick={() => history.push('/apartment')}>Байр</MenuItem>
                </Menu>
              </div>
            </div>
            {/* Contact link and login */}
            <div className={classes.contactAndLogin}>
              <div className={classes.contact}>
                <div className={classes.contactText}>Холбоо барих</div>
                <div className={classes.phoneNumber}>77779080</div>
              </div>
              <div style={{ display: 'flex' }}>
                {authenticated ? (
                  <Tooltip title='Account settings'>
                    <Avatar
                      alt='Profile Avatar'
                      className={classes.avatar}
                      onClick={handleClick}
                    >
                      {account?.avatar?.url ? (
                        <img
                          alt={'profile'}
                          className={classes.avatar}
                          src={account?.avatar?.url}
                        />
                      ) : (
                        <p style={{ fontWeight: 'bold' }}>
                          {account &&
                            account?.firstname?.length > 1 &&
                            account?.firstname[0]?.toUpperCase()}
                        </p>
                      )}
                    </Avatar>
                  </Tooltip>
                ) : (
                  // Login
                  <Link className={classes.avatarLink} to='/login'>
                    Нэвтрэх
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.iconButtonContainer}>
            {/* Drawer menu icon */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon style={{ height: '40px', width: '40px' }} />
            </IconButton>
            {/* Brand logo */}
            <div style={{ paddingTop: 20, paddingLeft: 5 }}>
              <img
                src={Logo}
                style={{
                  width: phoneSize ? '100px' : '150px',
                  maxWidth: 150,
                  cursor: 'pointer',
                }}
                onClick={() => history.push('/')}
                alt='just alt pls'
              />
            </div>
            {/* Profile menu avatar */}
            <div>
              {authenticated ? (
                <Tooltip title='Account settings'>
                  <IconButton onClick={handleClick} size='small' sx={{ ml: 2, pt: 2 }}>
                    <Avatar alt='Profile Avatar' className={classes.avatar}>
                      {account?.avatar?.url ? (
                        <img
                          alt={'profile'}
                          className={classes.avatar}
                          src={account?.avatar?.url}
                        />
                      ) : (
                        <p style={{ fontWeight: 'bold' }}>
                          {account &&
                            account?.firstname?.length > 1 &&
                            account?.firstname[0]?.toUpperCase()}
                        </p>
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                // Login
                <Link className={classes.avatarLink} to='/login'>
                  Нэвтрэх
                </Link>
              )}
            </div>
          </div>
        )}
        {/* The burger menu */}
        <SwipeableDrawer
          anchor={'right'}
          open={drawerOpen}
          className={classes.drawer}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <div className={classes.burgerPadding}>
            <div className={classes.burgerLogo}>
              <img
                src={Logo}
                style={{
                  width: '150px',
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                  height: '90%',
                }}
                alt='jamukhLogo'
              />
            </div>
            <div style={{ height: '100%' }} className={classes.menuList}>
              <Link className={classes.menuListItem} to='/'>
                Нүүр
              </Link>
              <Link
                className={classes.menuListItem}
                to='/news'
                style={{ color: currentRoute === '/news' ? '#C19D65' : 'white' }}
              >
                Мэдээ
              </Link>
              <Link
                className={classes.menuListItem}
                to='/about-us'
                style={{ color: currentRoute === '/about-us' ? '#C19D65' : 'white' }}
              >
                Бидний тухай
              </Link>
              <Link
                to={'/antique'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/antique' ? '#C19D65' : 'white' }}
              >
                Үнэт эдлэл
              </Link>
              <Link
                to={'/cars'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/cars' ? '#C19D65' : 'white' }}
              >
                Машин
              </Link>
              <Link
                to={'/painting'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/painting' ? '#C19D65' : 'white' }}
              >
                Уран зураг
              </Link>
              <Link
                to={'/land'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/land' ? '#C19D65' : 'white' }}
              >
                Газар
              </Link>
              <Link
                to={'/house'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/house' ? '#C19D65' : 'white' }}
              >
                House
              </Link>
              <Link
                to={'/apartment'}
                className={classes.menuListItem}
                style={{ color: currentRoute === '/apartment' ? '#C19D65' : 'white' }}
              >
                Apartment
              </Link>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <Typography sx={{ color: 'white', fontWeight: '100' }}>
                Холбоо барих
              </Typography>
              <Typography sx={{ color: '#C19D65' }}>77779080</Typography>
            </div>
          </div>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((props) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (props) => (props?.trigger ? '#252525' : 'transparent'),
    boxShadow: 'none',
    fontWeight: '300',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '18px',
    color: 'white',
    padding: (props) => (props?.trigger ? '0px 10px' : '0px 10px'),
    position: 'fixed',
  },
  realStateMenu: {
    '& .MuiPaper-root': {
      borderRadius: 6,
      color: '#C19D65',
      backgroundColor: 'transparent',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        borderBottom: '1px solid #C19D65',
      },
    },
  },
  contactAndLogin: {
    width: '22%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '10px',
  },
  logoAndLinks: {
    display: 'flex',
  },
  menuContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  menuListName: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    marginTop: '10px',
  },
  contact: {
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    justifyContent: 'space-between',
  },
  contactText: {
    fontSize: (props) => (props?.tablet || props?.phone ? '14px' : '18px'),
    color: (props) => props.linkColor || 'white',
    marginRight: '20px',
  },
  phoneNumber: {
    color: '#C19D65',
  },
  menuAvatar: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  containerEnd: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15px',
  },
  menuListItem: {
    textDecoration: 'none',
    padding: '20px',
    fontSize: '20px',
    textAlign: 'flex-start',
    color: 'white',
    fontWeight: '100',
  },
  burgerLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
  mobileAvatarContainer: {
    marginLeft: 36,
    marginTop: 60,
  },
  menuItemContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  mobileUsernameContainer: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  appbarLinkContainer: {
    width: '100%',
    outline: 'none',
  },
  appbarHomeLinkContainer: {
    width: '100%',
    outline: 'none',
    position: 'relative',
    top: -40,
    left: -2,
    height: 30,
  },
  appbarLinkButton: {
    width: '200px',
    textAlign: 'start',
    borderRadius: 0,
    paddingLeft: 35,
    justifyContent: 'flex-start',
    textTransform: 'none',
    marginTop: 7,
    marginBottom: 7,
  },
  appbarLinkButtonActive: {
    color: colors.lightWhite,
    borderLeft: `2px solid ${colors.lightPurple}`,
    borderRadius: 0,
    width: '200px',
    textAlign: 'start',
    paddingLeft: 35,
    justifyContent: 'flex-start',
    textTransform: 'none',
    marginTop: 7,
    marginBottom: 7,
  },
  iconButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  linkStyle: {
    textDecoration: 'none !important',
    textTransform: 'none',
    color: 'inherit',
  },
  toolbar: {
    maxWidth: '100%',
    width: '100%',
    margin: 'auto',
    color: 'white',
    padding: '0px',
  },
  menuLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    fontFamily: "'Roboto', sans-serif",
  },
  menuButton: {
    marginRight: 30,
  },
  menuButtonMobile: {
    width: '50%',
  },
  title: {
    flexGrow: 1,
  },
  username: {
    fontSize: 17,
    color: colors.black,
    paddingLeft: 15,
  },
  userNameTypo: {
    fontSize: 17,
    color: colors.black,
  },
  profileDivider: {
    marginTop: 15,
    marginBottom: 15,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 32,
    width: 32,
    backgroundColor: 'lightgray',
    objectFit: 'cover',
    color: 'black',
  },
  avatarMobile: {
    height: 75,
    width: 75,
    backgroundColor: 'lightgray',
    objectFit: 'cover',
    color: 'black',
  },
  inlineAvatar: {
    height: 45,
    width: 45,
    backgroundColor: 'lightgray',
    color: 'black',
    objectFit: 'cover',
  },
  popperButton: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    color: colors.black70,
    paddingTop: 5,
    paddingBottom: 5,
  },
  popperLink: {
    textAlign: 'left',
    fontSize: 14,
    color: colors.lightWhite,
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    '&:hover': {
      color: colors.lightPurple,
    },
  },
  avatarLink: {
    color: (props) => props.linkColor || 'white',
    textDecoration: 'none',
    fontWeight: '100',
    '&:hover': {
      color: colors.brandTextColor,
    },
  },
  badgeContainer: {
    display: 'flex',
    paddingRight: 25,
    paddingLeft: 10,
  },
  popperPaper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  link: {
    textDecoration: 'none',
    textTransform: 'none',
    color: (props) => props.linkColor || 'white',
    padding: '20px',
    fontWeight: '100',
    fontSize: (props) => (props?.tablet ? '14px' : '18px'),
    cursor: 'pointer',
    '&:hover': {
      color: colors.brandTextColor,
    },
  },
  activeLink: {
    textDecoration: 'none',
    color: colors.brandTextColor,
    cursor: 'pointer',
    borderBottom: `2px solid ${colors.brandTextColor}`,
    paddingRight: 20,
    paddingLeft: 20,
  },
  menuPadding: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  authLink: {
    textDecoration: 'none',
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    fontSize: 14,
    '&:hover': {
      color: colors.lightPurple,
    },
  },
  drawer: {
    '& .MuiDrawer-paperAnchorRight': {
      backgroundImage: `url(${Background})`,
      backgroundSize: '300px 250px',
      backgroundRepeat: 'repeat',
      height: '100%',
    },
  },
  burgerPadding: {
    padding: '10px',
    position: 'relative',
  },
  authLinkActive: {
    textDecoration: 'none',
    color: colors.lightPurple,
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
  },
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
  },
  qrGenTitle: {
    fontSize: 21,
    color: 'black',
    marginBottom: 15,
  },
  qrGenDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.black70,
    marginBottom: 20,
  },
  qrGenerator: {
    padding: 20,
    marginBottom: 20,
  },
  qrGenContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
    padding: 30,
    backgroundColor: 'white',
    maxWidth: 380,
    width: '100%',
    maxHeight: 500,
    outline: 'none',
    border: 'none',
  },
}));

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
