import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyBiyCj8JTy7CFG00JxukPESub7ABjpXhzA',
  authDomain: 'kitchenstories-6f501.firebaseapp.com',
  databaseURL: 'https://kitchenstories-6f501.firebaseio.com',
  projectId: 'kitchenstories-6f501',
  storageBucket: 'kitchenstories-6f501.appspot.com',
  messagingSenderId: '134449689769',
  appId: '1:134449689769:web:03d25097205fe4d446e5b8',
  measurementId: 'G-YS5FSLT7QL',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
