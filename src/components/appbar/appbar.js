import React, { useState, useContext } from 'react';
import {
  Avatar,
  Grid,
  Toolbar,
  AppBar,
  // Container,
  Typography,
  Divider,
  IconButton,
  SwipeableDrawer,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
// import Jamuh from '../../assets/icons/Jamuh.svg';
import TheContext from '../../context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { url } from '../../constants/url';
import MenuIcon from '@mui/icons-material/Menu';
// import { stringEllipser } from '../../helpers/helperFunctions';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import { base_url } from '../../constants/url';
//logo
import Jamukh from '../../assets/icons/Jamuh_logo.png';

export default function Appbar(props) {
  const history = useHistory();
  const location = useLocation();
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const classes = useStyles({ trigger });
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentRoute = location.pathname;
  const open = Boolean(anchorEl);
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook.account;

  const authenticated = localStorage.getItem('jamukh_auth') === 'true' ? true : false;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='fixed' className={classes.root}>
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
                account?.avatar?.path ? (
                  <img
                    alt={'_test'}
                    className={classes.menuAvatar}
                    src={base_url + '/' + account?.avatar?.path}
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
            Profile settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => history.push(authenticated ? '/logout' : '/login')}>
            <ListItemIcon>
              {authenticated ? (
                <Logout fontSize='small' />
              ) : (
                <LoginIcon fontSize='small' />
              )}
            </ListItemIcon>
            {authenticated ? (
              <>
                <Typography variant='body2'>Logout</Typography>
              </>
            ) : (
              <>
                <Typography variant='body2'>Login</Typography>
              </>
            )}
          </MenuItem>
        </Menu>
        {!props.phone ? (
          <>
            <Grid
              container
              direction={'row'}
              className={classes.roleGrid}
              alignItems={'center'}
            >
              {/* Appbar links */}
              <Grid item className={classes.menuPadding}>
                <>
                  {url.general.map((item, index) => (
                    <Link
                      key={item}
                      to={item}
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {contextText.appbar.links.general[index]}
                    </Link>
                  ))}
                </>
              </Grid>
              {/* Menu filters and account settings */}
              <Grid item>
                <Grid container direction={'row'} alignItems={'center'}>
                  <IconButton size='large' aria-label='search' color='inherit'>
                    <FilterAltIcon />
                  </IconButton>
                  <IconButton size='large' aria-label='search' color='inherit'>
                    <NotificationsIcon />
                  </IconButton>
                  <IconButton size='large' aria-label='search' color='inherit'>
                    <SearchIcon />
                  </IconButton>
                  <Grid item>
                    <Tooltip title='Account settings'>
                      <Avatar
                        alt='Profile Avatar'
                        className={classes.avatar}
                        onClick={handleClick}
                      >
                        {authenticated ? (
                          account?.avatar?.path ? (
                            <img
                              alt={'profile'}
                              className={classes.avatar}
                              src={base_url + '/' + account?.avatar?.path}
                            />
                          ) : (
                            <p style={{ fontWeight: 'bold' }}>
                              {account &&
                                account?.firstname?.length > 1 &&
                                account?.firstname[0]?.toUpperCase()}
                            </p>
                          )
                        ) : (
                          <AccountCircleIcon htmlColor={'#0C0C0D'} />
                        )}
                      </Avatar>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <div className={classes.iconButtonContainer}>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon style={{ height: '40px', width: '40px' }} />
            </IconButton>
            <div>
              <IconButton size='large' aria-label='search' color='inherit'>
                <FilterAltIcon />
              </IconButton>
              <IconButton size='large' aria-label='search' color='inherit'>
                <NotificationsIcon />
              </IconButton>
              <IconButton size='large' aria-label='search' color='inherit'>
                <SearchIcon />
              </IconButton>
              <Tooltip title='Account settings'>
                <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
        {/* The burger menu */}
        {props.phone && (
          <SwipeableDrawer
            sx={{ width: 1 / 2 }}
            anchor={'right'}
            open={drawerOpen}
            className={classes.drawer}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <div className={classes.burgerPadding}>
              <div className={classes.burgerLogo}>
                <img src={Jamukh} style={{ width: '35px' }} alt='jamukhLogo' />
              </div>
              <div className={classes.menuList}>
                <Link className={classes.menuListItem} to='/'>
                  Home
                </Link>
                <Link className={classes.menuListItem} to='/news'>
                  News
                </Link>
                <Link className={classes.menuListItem} to='/property'>
                  Property
                </Link>
                <Link className={classes.menuListItem} to='/antiquest'>
                  Antiquest
                </Link>
                <Link className={classes.menuListItem} to='/cars'>
                  Cars
                </Link>
                <Link className={classes.menuListItem} to='/estate'>
                  Estate
                </Link>
              </div>
            </div>
          </SwipeableDrawer>
        )}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: (props) => (props?.trigger ? '#252525' : colors.gray0),
    boxShadow: 'none',
  },
  menuAvatar: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15px',
  },
  menuListItem: {
    textDecoration: 'none',
    color: 'black',
    padding: '20px',
    fontSize: '20px',
    fontFamily: "'Roboto Condensed', sans-serif",
    textAlign: 'flex-start',
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
    width: '100%',
  },
  linkStyle: {
    textDecoration: 'none !important',
    textTransform: 'none',
    color: 'inherit',
  },
  toolbar: {
    maxWidth: 1280,
    width: '90%',
    margin: 'auto',
    color: 'white',
  },
  menuPadding: {
    paddingRight: 30,
  },
  menu: {
    fontFamily: "'Roboto Condensed', sans-serif",
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
  roleGrid: {
    justifyContent: 'flex-end',
  },
  username: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    color: colors.black,
    paddingLeft: 15,
  },
  userNameTypo: {
    fontSize: 17,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
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
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    color: colors.black70,
    paddingTop: 5,
    paddingBottom: 5,
  },
  popperLink: {
    textAlign: 'left',
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    color: colors.lightWhite,
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    '&:hover': {
      color: colors.lightPurple,
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
    color: colors.lightWhite,
    fontSize: '14px',
    fontFamily: "'Roboto Condensed', sans-serif",
    cursor: 'pointer',
    fontWeight: '400',
    paddingLeft: 15,
    paddingRight: 15,
    '&:hover': {
      color: colors.brandTextColor,
    },
  },
  activeLink: {
    textDecoration: 'none',
    color: colors.brandTextColor,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: '400',
    fontSize: '14px',
    paddingLeft: 15,
    paddingRight: 15,
    cursor: 'pointer',
    paddingBottom: 15,
    borderBottom: `2px solid ${colors.brandTextColor}`,
  },
  authLink: {
    textDecoration: 'none',
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    '&:hover': {
      color: colors.lightPurple,
    },
  },
  burgerPadding: {
    padding: '10px',
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
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  qrGenDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
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
