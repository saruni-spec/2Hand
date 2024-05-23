// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBReXeBZhY7IUnHNJxOreIpnXgSKhi3vWg",

  authDomain: "nuriaa-ad2c8.firebaseapp.com",

  projectId: "nuriaa-ad2c8",

  storageBucket: "nuriaa-ad2c8.appspot.com",

  messagingSenderId: "333838247774",

  appId: "1:333838247774:web:6ae80cbcf531d1a23991cf",

  measurementId: "G-HP4ZXN83CJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
