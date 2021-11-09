import React, { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Toolbar,
  AppBar,
  Container,
  Typography,
  Divider,
  IconButton,
  SwipeableDrawer,
  Menu,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ListIcon from '@mui/icons-material/List';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SMicon from '../../assets/icons/SM.svg';
import Jamuh from '../../assets/icons/Jamuh.svg';
import TheContext from '../../context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../helpers/logout';
import { url, bmLinks } from '../../constants/url';
import BurgerMenuIcon from '../../assets/icons/burger-menu.svg';
import { stringEllipser } from '../../helpers/helperFunctions';
import shopping_basket from '../../assets/icons/shopping_bag.svg';
import shopping_basket_active from '../../assets/icons/shopping_bag_active.svg';
import home_icon from '../../assets/icons/home.svg';
import home_active_icon from '../../assets/icons/home_active.svg';
import service_icon from '../../assets/icons/service.svg';
import service_active_icon from '../../assets/icons/service_active.svg';
import location_icon from '../../assets/icons/location.svg';
import location_active_icon from '../../assets/icons/location2.svg';
import help_icon from '../../assets/icons/help.svg';
import help_active_icon from '../../assets/icons/help_active.svg';
import terms_icon from '../../assets/icons/terms_icon.svg';
import terms_icon_active from '../../assets/icons/terms_icon_active.svg';
import logout_icon from '../../assets/icons/logout.svg';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const icons = [
  home_icon,
  service_icon,
  location_icon,
  help_icon,
  shopping_basket,
  terms_icon,
  logout_icon,
];

const icons_active = [
  home_active_icon,
  service_active_icon,
  location_active_icon,
  help_active_icon,
  shopping_basket_active,
  terms_icon_active,
  logout_icon,
];

const general_icons = ['', '', home_icon, service_icon, shopping_basket];

const general_active_icons = [
  '',
  '',
  home_active_icon,
  service_active_icon,
  shopping_basket_active,
];

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
  const account = ContextHook?.account;
  const role = ContextHook?.account?.role;
  const authenticated = localStorage.getItem('authenticated') === 'true' ? true : false;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFromAppbar = () => {
    logout()
      .then(() => {
        history.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AppBar position='sticky' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {!props.phone ? (
          <>
            <div className={classes.menu}>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClick}
                PaperProps={paperProps}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: 20 }}>
                    <Container disableGutters className={classes.avatarContainer}>
                      {/* Profile Avatar */}
                      <Avatar alt='Profile Avatar' className={classes.inlineAvatar}>
                        {account?.avatar?.path ? (
                          <img
                            alt={'profile'}
                            className={classes.inlineAvatar}
                            src={account?.avatar?.path}
                          />
                        ) : (
                          <p style={{ fontWeight: 'bold' }}>{'Test'}</p>
                        )}
                      </Avatar>
                      <Typography className={classes.username}>
                        {stringEllipser(
                          account?.username ? account?.username : account?.phone,
                          15
                        )}
                      </Typography>
                    </Container>
                    <Divider className={classes.profileDivider} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Button
                        startIcon={<CreateOutlinedIcon />}
                        className={classes.popperButton}
                      >
                        <Link to={'/user/profile'} className={classes.authLink}>
                          {contextText.appbar.profileChange}
                        </Link>
                      </Button>
                      <Button startIcon={<ListIcon />} className={classes.popperButton}>
                        <Link to={'/user/order-list'} className={classes.authLink}>
                          {contextText.appbar.orderHistory}
                        </Link>
                      </Button>
                    </div>
                    <Divider className={classes.profileDivider} />
                    <Typography
                      onClick={() => history.push('/terms-and-conditions')}
                      className={classes.popperLink}
                    >
                      {contextText.appbar.termsAndConditions}
                    </Typography>
                    <Typography
                      onClick={() => logoutFromAppbar()}
                      className={classes.popperLink}
                    >
                      {contextText.appbar.logout}
                    </Typography>
                  </div>
                </div>

                <div>
                  <MenuItem>
                    <Link to={'/sign-up'} className={classes.authLink}>
                      {contextText.appbar.signUp}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/login'} className={classes.authLink}>
                      {contextText.appbar.login}
                    </Link>
                  </MenuItem>
                </div>
              </Menu>
            </div>

            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => {}}
            >
              <img src={SMicon} alt={'JM icon'} style={{ height: '50px' }} />
              <img
                src={Jamuh}
                alt={'JM icon'}
                style={{ height: '20px', marginLeft: '12px' }}
              />
            </IconButton>
            <Grid
              container
              direction={'row'}
              className={classes.roleGrid}
              alignItems={'center'}
            >
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
                    {/* Profile Avatar */}

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
                            src={account?.avatar?.path}
                          />
                        ) : (
                          <p style={{ fontWeight: 'bold' }}>
                            {account?.username[0]?.toUpperCase()}
                          </p>
                        )
                      ) : (
                        <AccountCircleIcon htmlColor={'#0C0C0D'} />
                      )}
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <div className={classes.iconButtonContainer}>
            <IconButton
              edge='start'
              className={classes.menuButtonMobile}
              color='inherit'
              aria-label='Khuree market'
            >
              <img src={SMicon} alt={'SM icon'} />
            </IconButton>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <img
                src={BurgerMenuIcon}
                className={classes.burgerMenuIcon}
                alt={'burger menu'}
              />
            </IconButton>
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
            <div className={classes.mobileAvatarContainer}>
              <Avatar alt='Profile Avatar' className={classes.avatarMobile}>
                {authenticated ? (
                  account?.avatar?.path ? (
                    <img
                      alt={'profile'}
                      className={classes.avatarMobile}
                      src={account?.avatar?.path}
                    />
                  ) : (
                    <p style={{ fontWeight: 'bold', fontSize: 40 }}>
                      {account?.username[0]?.toUpperCase()}
                    </p>
                  )
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 75 }} htmlColor={'#0C0C0D'} />
                )}
              </Avatar>
              {authenticated ? (
                <div className={classes.mobileUsernameContainer}>
                  <Typography className={classes.userNameTypo}>
                    {account?.username}
                  </Typography>
                  <Link
                    to={'/user/profile'}
                    style={{ paddingLeft: 0, fontWeight: '500' }}
                    className={
                      currentRoute === '/user/profile' ? classes.activeLink : classes.link
                    }
                  >
                    Мэдээлэл засах
                  </Link>
                </div>
              ) : (
                <div style={{ height: 40, width: 1 }} />
              )}
            </div>
            {role === 'operator' ? (
              <>
                {bmLinks.operator.map((item, index) => (
                  <Button key={item?.name + index} className={classes.appbarLinkButton}>
                    <Link
                      to={item?.link}
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {item?.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : role === 'marketeer' ? (
              <>
                {bmLinks.marketeer.map((item, index) => (
                  <Button key={item?.name + index} className={classes.appbarLinkButton}>
                    <Link
                      to={item?.link}
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : role === 'admin' ? (
              <>
                {bmLinks.admin.map((item, index) => (
                  <Button key={item.name + index} className={classes.appbarLinkButton}>
                    <Link
                      to={item.link}
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : role === 'superadmin' ? (
              <>
                {bmLinks.superadmin.map((item, index) => (
                  <Button key={item.name + index} className={classes.appbarLinkButton}>
                    <Link
                      to={item.link}
                      className={
                        currentRoute === item ? classes.activeLink : classes.link
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : role === 'member' ? (
              <>
                {bmLinks.member.map((item, index) => (
                  <Button
                    key={item.name + index}
                    className={
                      currentRoute === item.link
                        ? classes.appbarLinkButtonActive
                        : classes.appbarLinkButton
                    }
                    startIcon={
                      <img
                        src={
                          currentRoute === item.link ? icons_active[index] : icons[index]
                        }
                        alt={'mobile routes'}
                      />
                    }
                  >
                    <Link
                      to={item.link}
                      className={
                        currentRoute === item.link ? classes.activeLink : classes.link
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : (
              <>
                {bmLinks.general.map((item, index) => (
                  <Button
                    key={item.name + index}
                    className={
                      currentRoute === item.link
                        ? classes.appbarLinkButtonActive
                        : classes.appbarLinkButton
                    }
                    startIcon={
                      index === 0 ? (
                        <LockOutlinedIcon
                          htmlColor={currentRoute === item.link ? '#6a67d3' : '#0a0a0b'}
                        />
                      ) : index === 1 ? (
                        <AccountCircleOutlinedIcon
                          htmlColor={currentRoute === item.link ? '#6a67d3' : '#0a0a0b'}
                        />
                      ) : (
                        <img
                          src={
                            currentRoute === item.link
                              ? general_active_icons[index]
                              : general_icons[index]
                          }
                          alt={'mobile routes'}
                        />
                      )
                    }
                  >
                    <Link
                      to={item.link}
                      className={
                        currentRoute === item.link ? classes.activeLink : classes.link
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            )}
            {authenticated === true ? (
              <div className={classes.menuItemContainer}>
                <Divider style={{ marginBottom: 20 }} />
                <Button
                  style={{ marginLeft: -20 }}
                  className={classes.appbarLinkButton}
                  onClick={() => logoutFromAppbar()}
                  startIcon={
                    role === 'member' && <img src={logout_icon} alt={'logout'} />
                  }
                >
                  <Typography className={classes.link}>Гарах</Typography>
                </Button>
              </div>
            ) : null}
          </SwipeableDrawer>
        )}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    backgroundColor: (props) => (props?.trigger ? '#252525' : colors.gray0),
    boxShadow: 'none',
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
    width: '1300px',
    margin: 'auto',
    maxWidth: 1280,
  },
  menuPadding: {
    paddingRight: 30,
  },
  menu: {
    zIndex: 1200,
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
