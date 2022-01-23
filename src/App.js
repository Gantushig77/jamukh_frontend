import './styles/css/App.css';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto-condensed/700.css';
import '@fontsource/roboto';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TheContext from './context/context';
import mnText from './constants/mnText';
import enText from './constants/enText';
import { CircularProgress } from '@mui/material';
import { isAuthenticated } from './helpers/helperFunctions';
import PrivateRoute from './components/privateRoute/privateRoute';
import useAppStyles from './styles/js/classes';
import { logout } from './helpers/logout';
import Home from './pages/general/home';
import List from './pages/listNews/list';
import NotFound from './pages/general/notFound';
import Login from './pages/general/login';
import TermsAndConditions from './pages/general/termsAndConditions';
import Members from './pages/membership/membership';
import Profile from './pages/profile/profile';
import Category from './pages/category/category';
import News from './pages/news/news';
import CreateAd from './pages/createAd/createAd';
import jamuh_logo from './assets/icons/Jamuh_logo.png';
import { getProfile } from './api/account';
import Atiquest from './assets/background/aquest.png';
import Property from './assets/background/land.png';
import Cars from './assets/background/cars.png';
import Estate from './assets/background/estate.png';
import Painting from './assets/background/Painting.png';
import Membership from './pages/membership/membership';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import './App.css';
// import firebaseConfig from './firebase/firebase';
// import { initializeApp } from 'firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export default function App() {
  // initializeApp(firebaseConfig);
  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      'BNzJiPC9z7KVdpg0XQdqwljbIxe6N4vgUiyMpZ8UQwPXt5MfQ2dvRg6JfSfUsxxJbwesAIShLZiD3KKpcFZ4c64',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  onMessage(messaging, (payload) => {
    console.log(payload);
  });

  let token = localStorage.getItem('jamukh_token');

  const classes = useAppStyles();
  const loading = false;
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const [account, setAccount] = useState({});
  const [contextValue, setContextValue] = useState({
    contextText:
      localStorage.getItem('activeLang') !== null
        ? localStorage.getItem('activeLang') === 'mn'
          ? mnText
          : enText
        : mnText,
    activeLang:
      localStorage.getItem('activeLang') !== null
        ? localStorage.getItem('activeLang')
        : 'mn',
  });

  const langChange = (lang) => {
    setContextValue(
      lang === 'en'
        ? { contextText: enText, activeLang: 'en' }
        : { contextText: mnText, activeLang: 'mn' }
    );
    localStorage.setItem('activeLang', lang);
  };

  useEffect(() => {
    if (token?.length > 0) {
      getProfile()
        .then((res) => {
          console.log(res.data);
          setAccount(res.data);

          if (res.data) {
            localStorage.setItem('jamukh_auth', 'true');
          } else {
            localStorage.setItem('jamukh_auth', 'false');
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.message.includes('Request failed with status code 401')) {
            logout();
          }
        });
    }
  }, [token]);

  if (loading)
    return (
      <div className={classes.loading}>
        <img
          src={jamuh_logo}
          alt={'jamukh logo'}
          style={{ paddingBottom: 20, width: 50 }}
        />
        <CircularProgress sx={{ color: 'orange' }} size={40} thickness={4} />
      </div>
    );

  return (
    <div className='App'>
      <TheContext.Provider value={{ contextValue, langChange, account }}>
        <Router>
          <Switch>
            <Route exact path={'/'}>
              <Home />
            </Route>
            <Route path={'/detailnews/:id'}>
              <News />
            </Route>
            <Route path={'/login'}>
              <Login />
            </Route>
            <Route path={'/logout'}>
              <Members />
            </Route>
            <Route path={'/news'}>
              <News />
            </Route>
            <Route path={'/list'}>
              <List />
            </Route>
            <Route path={'/profile'}>
              <Profile />
            </Route>
            <Route path={'/antiquest'}>
              <Category
                bg={Atiquest}
                title='Эртний эдлэл'
                phone={phoneSize}
                tablet={tabletSize}
              />
            </Route>
            <Route path={'/property'}>
              <Category
                bg={Property}
                title='Газар'
                phone={phoneSize}
                tablet={tabletSize}
              />
            </Route>
            <Route path={'/cars'}>
              <Category bg={Cars} title='Машин' phone={phoneSize} tablet={tabletSize} />
            </Route>
            <Route path={'/estate'}>
              <Category
                bg={Estate}
                title='Үл хөдлөх'
                phone={phoneSize}
                tablet={tabletSize}
              />
            </Route>
            <Route path={'/painting'}>
              <Category
                bg={Painting}
                title='Уран зураг'
                phone={phoneSize}
                tablet={tabletSize}
              />
            </Route>
            <Route path={'/membership'}>
              <Membership />
            </Route>
            <Route path={'/terms-and-conditions'}>
              <TermsAndConditions />
            </Route>
            <PrivateRoute path={'/create-ad'} authenticated={isAuthenticated()}>
              <CreateAd />
            </PrivateRoute>
            {/* <PrivateRoute path={'/property'} authenticated={isAuthenticated()}>
              <Property />
            </PrivateRoute>
            <PrivateRoute path={'/antiquest'} authenticated={isAuthenticated()}>
              <Category />
            </PrivateRoute>
            <PrivateRoute path={'/cars'} authenticated={isAuthenticated()}>
              <Cars />
            </PrivateRoute> */}
            <PrivateRoute path={'/members'} authenticated={isAuthenticated()}>
              <Members />
            </PrivateRoute>
            {/* <PrivateRoute path={'/estate'} authenticated={isAuthenticated()}>
              <Estate />
            </PrivateRoute> */}
            <PrivateRoute path={'/profile'} authenticated={isAuthenticated()}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute path={'/user/profile'} authenticated={isAuthenticated()}>
              <Profile />
            </PrivateRoute>
            {/* 404 page. Must be at the bottom. */}
            <Route path={'*'}>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </TheContext.Provider>
    </div>
  );
}
