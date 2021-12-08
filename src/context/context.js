import React from 'react';
import mnText from '../constants/mnText';

const TheContext = React.createContext({
  account: {
    username: '',
    firstname: '',
  },
  contextValue: {
    contextText: mnText,
  },
  activeLang: 'mn',
});

export default TheContext;
