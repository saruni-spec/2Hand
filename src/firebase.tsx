// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAKH8_LIHDVXpjrFOrG1iugA9QLmYgyTE",

  authDomain: "smarttravel-393108.firebaseapp.com",

  projectId: "smarttravel-393108",

  storageBucket: "smarttravel-393108.appspot.com",

  messagingSenderId: "383391503149",

  appId: "1:383391503149:web:9a04a4d492f2af1781b9a4",

  measurementId: "G-6VRJ1XEFJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
