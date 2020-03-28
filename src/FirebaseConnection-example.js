import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: '[API-KEY]',
  authDomain: '[APP_NAME].firebaseapp.com',
  databaseURL: 'https://[APP_NAME].firebaseio.com',
  projectId: '[APP_NAME]',
  storageBucket: '[APP_NAME].appspot.com',
  messagingSenderId: '[ID]',
  appId: '[appId]',
  measurementId: '[measurementId]',
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
