import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWJfdiIyyJ0qjwxl4uuy3UxCiZ0FDCOOg",
    authDomain: "sorteojps.firebaseapp.com",
    projectId: "sorteojps",
    storageBucket: "sorteojps.appspot.com",
    messagingSenderId: "158090211413",
    appId: "1:158090211413:web:e3dcfb3d26e21c32cee4dc"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();