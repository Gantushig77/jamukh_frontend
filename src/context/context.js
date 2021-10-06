import React from 'react';
import mnText from '../constants/mnText';

const TheContext = React.createContext({
    User : {
        token: ''
    },
    contextText : mnText,
    activeLang : 'mn'
})

export default TheContext