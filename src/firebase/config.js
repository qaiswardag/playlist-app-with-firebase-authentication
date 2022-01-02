import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDe8dVl1DkLBRYrz0Hms2y4FIHL2_gjGGY',
  authDomain: 'playlist-app-40934.firebaseapp.com',
  projectId: 'playlist-app-40934',
  storageBucket: 'playlist-app-40934.appspot.com',
  messagingSenderId: '479642398001',
  appId: '1:479642398001:web:cd7d12c3fe86a455ed1410',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
