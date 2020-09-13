import * as firebase from 'firebase/app';
import 'firebase/storage';
// import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const fire = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
// const projectFireStore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export { projectStorage };
