import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCPbuYMie4GZcZdpTNBLGiAIOs2TEcdW2E',
  authDomain: 'resources-list-cdcc1.firebaseapp.com',
  databaseURL: 'https://resources-list-cdcc1.firebaseio.com',
  projectId: 'resources-list-cdcc1',
  storageBucket: 'resources-list-cdcc1.appspot.com',
  messagingSenderId: '110668222898',
  appId: '1:110668222898:web:44a887a3e34b43195554ab',
  measurementId: 'G-X3GCL5JFCL',
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
