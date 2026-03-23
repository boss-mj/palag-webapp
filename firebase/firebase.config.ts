import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }