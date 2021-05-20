import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAQcS4ur98dkqmSk33_1T2ybAE1Dxel8-o",
    authDomain: "phone-auth-9499f.firebaseapp.com",
    projectId: "phone-auth-9499f",
    storageBucket: "phone-auth-9499f.appspot.com",
    messagingSenderId: "619345510150",
    appId: "1:619345510150:web:cb7ed7036ce7c7459fa887"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

