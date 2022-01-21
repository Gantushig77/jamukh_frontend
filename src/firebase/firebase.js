// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiwwNli7S5F-NQH5argkzD2PnVGhy_Ij4',
  authDomain: 'jamukhwebnotificaion.firebaseapp.com',
  projectId: 'jamukhwebnotificaion',
  storageBucket: 'jamukhwebnotificaion.appspot.com',
  messagingSenderId: '642748840025',
  appId: '1:642748840025:web:c3bfad1fa78514062b9948',
  measurementId: 'G-FM6F396E6L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
