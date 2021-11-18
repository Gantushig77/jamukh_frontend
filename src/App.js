import './styles/css/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TheContext from './context/context';
import mnText from './constants/mnText';
import enText from './constants/enText';
import { useQuery } from '@apollo/client';
import { ACCOUNT } from './graphql/gql/user/user';
import { CircularProgress } from '@mui/material';
import { isAuthenticated } from './helpers/helperFunctions';
import PrivateRoute from './components/privateRoute/privateRoute';
import useAppStyles from './styles/js/classes';
import { logout } from './helpers/logout';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
// Routes
import Home from './pages/general/home';
import Detailnews from './pages/Detailnews/Detailnews';
import NotFound from './pages/general/notFound';
// import SignUp from "./pages/general/signUp";
import Login from './pages/general/jamukhLogin';
import TermsAndConditions from './pages/general/termsAndConditions';
import Members from './pages/members/members';
import Profile from './pages/profile/profile';
import Property from './pages/property/property';
import Antiquest from './pages/antiquest/antiquest';
import Cars from './pages/cars/cars';
import Estate from './pages/estate/estate';
import News from './pages/news/news';
import jamuh_logo from './assets/icons/Jamuh_logo.png';

export default function App() {
  const classes = useAppStyles();

  const { data: accountData, loading } = useQuery(ACCOUNT, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
      if (data?.getAccount) {
        localStorage.setItem('jamukh_auth', 'true');
      } else {
        localStorage.setItem('jamukh_auth', 'false');
      }
    },
    onError(e) {
      console.log(e);
      // console.log(e.errors);
      // console.log(e.extraInfo);
      console.log(e.message);
      // console.log(e.graphQLErrors);
      // console.log(e.networkError);
      // console.log(e.clientErrors);
      if (e.message.includes('Token Expired')) {
        logout();
      }
    },
  });

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
      <TheContext.Provider
        value={{ contextValue, langChange, account: accountData?.getAccount }}
      >
        <Router forceRefresh={true}>
          <Switch>
            <Route exact path={'/'}>
              <Home />
            </Route>
            <Route path={'/sign-up'}>
              <Login />
            </Route>
            <Route path={'/login'}>
              <Login />
            </Route>
            <Route path={'/news'}>
              <News />
            </Route>
            <Route path={'/estate'}>
              <Estate />
            </Route>
            <Route path={'/detailnews/:id'}>
              <Detailnews />
            </Route>
            <Route path={'/terms-and-conditions'}>
              <TermsAndConditions />
            </Route>
            <PrivateRoute path={'/property'} authenticated={isAuthenticated()}>
              <Property />
            </PrivateRoute>
            <PrivateRoute path={'/antiquest'} authenticated={isAuthenticated()}>
              <Antiquest />
            </PrivateRoute>
            <PrivateRoute path={'/cars'} authenticated={isAuthenticated()}>
              <Cars />
            </PrivateRoute>
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
          {/* <div className={classes.chatContainer}>
            <MessengerCustomerChat pageId='' appId='' />
          </div> */}
        </Router>
      </TheContext.Provider>
    </div>
  );
}
