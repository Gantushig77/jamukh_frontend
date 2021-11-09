import 'react-toastify/dist/ReactToastify.css';
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
import MessengerCustomerChat from 'react-messenger-customer-chat';
import SMicon from './assets/icons/SM.svg';
// General
import Home from './pages/general/home';
import Detailnews from './pages/Detailnews/Detailnews';
import NotFound from './pages/general/notFound';
// import SignUp from "./pages/general/signUp";
import Login from './pages/general/jamukhLogin';
import TermsAndConditions from './pages/general/termsAndConditions';
// Member
import Members from './pages/members/members';
import Profile from './pages/profile/profile';
import Property from './pages/property/property';
import Antiquest from './pages/antiquest/antiquest';
import Cars from './pages/cars/cars';
import Estate from './pages/estate/estate';
import News from './pages/news/news';

export default function App() {
  const classes = useAppStyles();

  const { data: accountData, loading } = useQuery(ACCOUNT, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
      if (data?.me) {
        if (data?.me?.role !== 'guest') {
          localStorage.setItem('authenticated', 'true');
        } else {
          localStorage.setItem('authenticated', 'false');
        }
      } else {
        localStorage.setItem('authenticated', 'false');
      }
    },
    onError(e) {
      console.log(e);
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
        <img src={SMicon} alt={'SM icon'} style={{ paddingBottom: 20 }} />
        <CircularProgress />
      </div>
    );

  return (
    <div className='App'>
      <TheContext.Provider value={{ contextValue, langChange, account: accountData?.me }}>
        <Router forceRefresh={true}>
          <Switch>
            {/* General routes */}
            <Route exact path={'/'}>
              <Home />
            </Route>
            <Route path={'/login'}>
              <Login />
            </Route>
            <Route path={'/property'}>
              <Property />
            </Route>
            <Route path={'/antiquest'}>
              <Antiquest />
            </Route>
            <Route path={'/cars'}>
              <Cars />
            </Route>
            <Route path={'/members'}>
              <Members />
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

            <Route path={'/profile'}>
              <Profile />
            </Route>
            <Route path={'/sign-up'}>
              <Login />
            </Route>
            <Route path={'/terms-and-conditions'}>
              <TermsAndConditions />
            </Route>

            {/* Private page. Works only if the user is authenticated and the role is MEMBER */}
            <PrivateRoute path={'/user/profile'} authenticated={isAuthenticated()}>
              <Profile />
            </PrivateRoute>
            {/* 404 page. Must be at the bottom. */}
            <Route path={'*'}>
              <NotFound />
            </Route>
          </Switch>
          <div className={classes.chatContainer}>
            <MessengerCustomerChat pageId='172124671568987' appId='517106409387369' />
          </div>
        </Router>
      </TheContext.Provider>
    </div>
  );
}
