// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdFmIiFloSDwkHyFSlikUlr0kGR3J4kuE",
    authDomain: "palag-webapp.firebaseapp.com",
    projectId: "palag-webapp",
    storageBucket: "palag-webapp.firebasestorage.app",
    messagingSenderId: "187066460329",
    appId: "1:187066460329:web:c0e8bfb4765c7bc53461b8",
    measurementId: "G-JDXVZD6F55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, db, googleProvider }
