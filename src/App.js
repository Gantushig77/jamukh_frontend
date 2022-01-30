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
import NotFound from './pages/general/notFound';
import Login from './pages/general/login';
import TermsAndConditions from './pages/general/termsAndConditions';
import Members from './pages/membership/membership';
import Profile from './pages/profile/profile';
import Category from './pages/category/category';
import Ads from './pages/ads/ads';
import CreateAd from './pages/createAd/createAd';
import jamuh_logo from './assets/icons/Jamuh_logo.png';
import { getProfile } from './api/account';
import Atiquest from './assets/background/aquest.png';
import Property from './assets/background/land.png';
import Cars from './assets/background/cars.png';
import Estate from './assets/background/estate.png';
import Painting from './assets/background/Painting.png';
import List from './pages/listNews/list';
import Detailnews from './pages/Detailnews/Detailnews';
import Membership from './pages/membership/membership';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import './App.css';
// import firebaseConfig from './firebase/firebase';
// import { initializeApp } from 'firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export default function App() {
  // initializeApp(firebaseConfig);
  // const messaging = getMessaging();
  // getToken(messaging, {
  //   vapidKey:
  //     'BNzJiPC9z7KVdpg0XQdqwljbIxe6N4vgUiyMpZ8UQwPXt5MfQ2dvRg6JfSfUsxxJbwesAIShLZiD3KKpcFZ4c64',
  // })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log(currentToken);
  //     } else {
  //       console.log(
  //         'No registration token available. Request permission to generate one.'
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);

  //   });

  // onMessage(messaging, (payload) => {
  //   console.log(payload);
  // });

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
      localStorage.getItem('activeLangRouter') !== null
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
        <Router forceRefresh={true}>
          <Switch>
            <Route exact path={'/'}>
              <Home />
            </Route>
            <PrivateRoute path={'/adsDetail/:id'} authenticated={isAuthenticated()}>
              <Ads />
            </PrivateRoute>
            <PrivateRoute path={'/detailNews/:id'} authenticated={isAuthenticated()}>
              <Detailnews />
            </PrivateRoute>
            <PrivateRoute path={'/news'} authenticated={isAuthenticated()}>
              <List />
            </PrivateRoute>
            <PrivateRoute path={'/profile'} authenticated={isAuthenticated()}>
            <Profile />
            </PrivateRoute>
            <PrivateRoute path={'/antiquest'} authenticated={isAuthenticated()}>
                <Category
                    bg={Atiquest}
                    title='Эртний эдлэл'
                    phone={phoneSize}
                    tablet={tabletSize}
                    id = {2}
                />
            </PrivateRoute>
            <PrivateRoute path={'/property'} authenticated={isAuthenticated()}>
            <Category
                bg={Property}
                title='Газар'
                phone={phoneSize}
                tablet={tabletSize}
                id = {3}
              />
            </PrivateRoute>
            <PrivateRoute path={'/estate'} authenticated={isAuthenticated()}>
                <Category
                    bg={Estate}
                    title='Үл хөдлөх'
                    phone={phoneSize}
                    tablet={tabletSize}
                    id = {5}
                  />
            </PrivateRoute>
            <PrivateRoute path={'/painting'} authenticated={isAuthenticated()}>
            <Category
                bg={Painting}
                title='Уран зураг'
                phone={phoneSize}
                tablet={tabletSize}
                id = {4}
              />
            </PrivateRoute>
            <PrivateRoute path={'/cars'} authenticated={isAuthenticated()}>
             <Category 
              bg={Cars} 
              title='Машин' 
              phone={phoneSize}
              tablet={tabletSize} 
              id={1}
              />
            </PrivateRoute>
            <Route path={'/login'}>
              <Login />
            </Route>
            <Route path={'/logout'}>
              <Members />
            </Route>
            <PrivateRoute path={'/create-ad'} authenticated={isAuthenticated()}>
              <CreateAd />
            </PrivateRoute>
            <PrivateRoute path={'/members'} authenticated={isAuthenticated()}>
              <Members />
            </PrivateRoute>
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
