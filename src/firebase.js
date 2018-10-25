import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBC3b22ZuFv3HPCgEt5bW4KdmDOsQGU8EE',
    authDomain: 'trivia-8cb64.firebaseapp.com',
    databaseURL: 'https://trivia-8cb64.firebaseio.com',
    projectId: 'trivia-8cb64',
    storageBucket: 'trivia-8cb64.appspot.com',
    messagingSenderId: '23458562258',
};
firebase.initializeApp(config);
export default firebase;
