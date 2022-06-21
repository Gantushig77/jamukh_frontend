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
import { logout } from './helpers/logout';
import Home from './pages/general/home';
import NotFound from './pages/general/notFound';
import Login from './pages/general/login';
import Members from './pages/membership/membership';
import Profile from './pages/profile/profile';
import Category from './pages/category/category';
import Ads from './pages/ads/ads';
import { getProfile } from './api/account';
import Antique from './assets/background/jewelry.jpg';
import Cars from './assets/background/cars.png';
import Land from './assets/background/land.png';
import Estate from './assets/background/estate.png';
import Painting from './assets/background/Painting.png';
import List from './pages/listNews/list';
import Detailnews from './pages/Detailnews/Detailnews';
import Realtor from './pages/realtor/realtor';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import apartment_bg from './assets/background/apartment.jpg';
import house_bg from './assets/background/house.jpg';
import AboutUs from './pages/aboutUs';
import './App.css';
import Contact from './pages/contact/contact'

export default function App() {
  const token = localStorage.getItem('jamukh_token');

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
          console.log(res?.data);
          setAccount(res?.data);

          if (res?.data) {
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
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          color: 'white',
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'orange' }} size={40} thickness={4} />
        Loading...
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
            <Route path={'/adsDetail/:id'} authenticated={isAuthenticated()}>
              <Ads />
            </Route>
            <Route path={'/contact'}>
              <Contact />
            </Route>
            <Route path={'/detailNews/:id'}>
              <Detailnews />
            </Route>
            <Route path={'/about-us'}>
              <AboutUs />
            </Route>
            <Route path={'/news'} authenticated={isAuthenticated()}>
              <List />
            </Route>
            <PrivateRoute path={'/profile'} authenticated={isAuthenticated()}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute path={'/antique'} authenticated={isAuthenticated()}>
              <Category
                bg={Antique}
                title='Үнэт эдлэл'
                phone={phoneSize}
                tablet={tabletSize}
                id={2}
                subCategory=''
              />
            </PrivateRoute>
            <PrivateRoute path={'/realtor'} authenticated={isAuthenticated()}>
              <Realtor phone={phoneSize} tablet={tabletSize} subCategory='' />
            </PrivateRoute>
            <PrivateRoute path={'/estate'} authenticated={isAuthenticated()}>
              <Category
                bg={Estate}
                title='Үл хөдлөх'
                phone={phoneSize}
                tablet={tabletSize}
                id={4}
              />
            </PrivateRoute>
            <PrivateRoute path={'/painting'} authenticated={isAuthenticated()}>
              <Category
                bg={Painting}
                title='Уран зураг'
                phone={phoneSize}
                tablet={tabletSize}
                id={3}
                subCategory=''
              />
            </PrivateRoute>
            <Route path={'/cars'}>
              <Category
                bg={Cars}
                title='Машин'
                phone={phoneSize}
                tablet={tabletSize}
                id={1}
                subCategory=''
              />
            </Route>
            <Route path={'/land'}>
              <Category
                bg={Land}
                title='Газар'
                phone={phoneSize}
                tablet={tabletSize}
                id={4}
                subCategory='land'
              />
            </Route>
            <Route path={'/house'}>
              <Category
                bg={house_bg}
                title='House'
                phone={phoneSize}
                tablet={tabletSize}
                id={4}
                subCategory='house'
              />
            </Route>
            <Route path={'/apartment'}>
              <Category
                bg={apartment_bg}
                title='Apartment'
                phone={phoneSize}
                tablet={tabletSize}
                id={4}
                subCategory='apartment'
              />
            </Route>
            <Route path={'/login'}>
              <Login />
            </Route>
            <PrivateRoute path={'/members'} authenticated={isAuthenticated()}>
              <Members />
            </PrivateRoute>
            {/* 404 page. Must be at the bottom. */}
            <Route path={'*'}>
              <NotFound phone={phoneSize} tablet={tabletSize} />
            </Route>
          </Switch>
        </Router>
      </TheContext.Provider>
    </div>
  );
}
