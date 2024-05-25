// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4HARD1loGCCXusjfpXiu3WdwD9we5k2Q",

  authDomain: "nuriaa-657e3.firebaseapp.com",

  projectId: "nuriaa-657e3",

  storageBucket: "nuriaa-657e3.appspot.com",

  messagingSenderId: "567633922043",

  appId: "1:567633922043:web:00c7d6832a6d3741fdad5e",

  measurementId: "G-PE6ZDB30VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
