import React, { useState, useContext } from 'react';
import {
  Avatar,
  Grid,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  IconButton,
  SwipeableDrawer,
  Tooltip,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
import TheContext from '../../context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { url } from '../../constants/url';
import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import Jamukh from '../../assets/icons/Jamuh_logo.png';
import Logo from '../../assets/logo/jamukh.png';
import { logout } from '../../helpers/logout';
import Background from '../../assets/background/background.png';
import { BsFillBookmarkStarFill } from 'react-icons/bs';


export default function Appbar(props) {
  let history = useHistory();
  const location = useLocation();
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const classes = useStyles({ trigger });
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentRoute = location.pathname;
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
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
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1= () => {
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
            Profile
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
              alignItems={'center'}
              className={classes.menuContainer}
            >
              {/* Appbar links */}
              <Grid item xs={4} className={classes.menuPadding}>
                <div className={classes.menuListName}>
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
                     <Button
                      id="basic-button"
                      aria-controls={open1 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open1 ? 'true' : undefined}
                      onClick={handleClick1}
                      className={classes.link}
                    >
                      Үл хөдлөх
                    </Button>
                   <Menu
                      id="basic-menu"
                      anchorEl={anchorEl1}
                      open={open1}
                      onClose={handleClose1}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => history.push('/land')}>Газар</MenuItem>
                      <MenuItem onClick={() => history.push('/house')}>House</MenuItem>
                      <MenuItem onClick={() => history.push('/apartment')}>Apartment</MenuItem>
                    </Menu>
                </div>
              </Grid>
              {/* Logo */}
              <Grid item xs={4} className={classes.menuLogo}>
                <img
                  src={Logo}
                  style={{ width: '40%', cursor: 'pointer' }}
                  onClick={() => history.push('/')}
                  alt='just alt pls'
                />
              </Grid>
              {/* Menu filters and account settings */}
              <Grid item xs={4}>
                <Grid
                  container
                  direction={'row'}
                  alignItems={'center'}
                  className={classes.containerEnd}
                >
              

                  <div className={classes.contact}>
                    <div className={classes.contactText}>Холбоо барих</div>
                    <div className={classes.phoneNumber}>77779999</div>
                  </div>
                  <BsFillBookmarkStarFill size={28} style={{cursor:'pointer',color:'white'}}   onClick={() => history.push('/profile')}/>
                  {/* Profile menu thumbnail */}
                  <Grid item> 
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
                      <Link className={classes.avatarLink} to='/login'>
                        Нэвтрэх
                      </Link>
                    )}
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
              {/* <IconButton size='large' aria-label='search' color='inherit'>
                <FilterAltIcon />
              </IconButton>
              <IconButton size='large' aria-label='search' color='inherit'>
                <NotificationsIcon />
              </IconButton>
              <IconButton size='large' aria-label='search' color='inherit'>
                <SearchIcon />
              </IconButton> */}
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
                  Нүүр
                </Link>
                <Link className={classes.menuListItem} to='/news'>
                  Мэдээ
                </Link>
                <Button
                      id="basic-button"
                      aria-controls={open1 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open1 ? 'true' : undefined}
                      onClick={handleClick1}
                      className={classes.link}
                    >
                      Үл хөдлөх
                    </Button>
                   <Menu
                      id="basic-menu"
                      anchorEl={anchorEl1}
                      open={open1}
                      onClose={handleClose1}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => history.push('/land')}>Газар</MenuItem>
                      <MenuItem onClick={() => history.push('/house')}>House</MenuItem>
                      <MenuItem onClick={() => history.push('/apartment')}>Apartment</MenuItem>
                    </Menu>
                <Link className={classes.menuListItem} to='/cars'>
                  Машин
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
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px 10px',
  },
  menuListName:{
    display:'flex',
    alignItems:'center'
  },
  contact: {
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    justifyContent: 'space-between',
  },
  contactText: {
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
  roleGrid: {
    width: '1300px',
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
    textDecoration: 'none',
    color: 'white',
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
    color: 'white',
    padding:'20px',
    fontWeight: '100',
    fontSize: '18px',
    cursor: 'pointer',
    '&:hover': {
      color: colors.brandTextColor,
    },
  },
  menuPadding: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activeLink: {
    textDecoration: 'none',
    color: colors.brandTextColor,
    cursor: 'pointer',
    borderBottom: `2px solid ${colors.brandTextColor}`,
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
  burgerPadding: {
    padding: '10px',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    backgroundSize: '300px 250px',
    height: '100vh',
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
