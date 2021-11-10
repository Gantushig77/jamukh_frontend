import React from 'react';
import mnText from '../constants/mnText';

const TheContext = React.createContext({
  account: {},
  contextValue: {
    contextText: mnText,
  },
  activeLang: 'mn',
});

export default TheContext;
