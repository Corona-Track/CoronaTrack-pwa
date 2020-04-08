import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDZPOOiLCYFIwNLrDSDLtqla1UkgGiuMIE',
  authDomain: 'coronatrack-2d30e.firebaseapp.com',
  databaseURL: 'https://coronatrack-2d30e.firebaseio.com',
  projectId: 'coronatrack-2d30e',
  storageBucket: 'coronatrack-2d30e.appspot.com',
  messagingSenderId: '222784198996',
  appId: '1:222784198996:web:372d1775ba4315fe1ed0c1',
  measurementId: 'G-MFNS24S8EY',
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
