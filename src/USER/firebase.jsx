// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjV_5GHK6eJLKDjVemGQWLxfamw1QZrYc",
    authDomain: "comptron-91282.firebaseapp.com",
    projectId: "comptron-91282",
    storageBucket: "comptron-91282.firebasestorage.app",
    messagingSenderId: "590754934222",
    appId: "1:590754934222:web:817091e9e06b44ba39cf9f",
    measurementId: "G-FEEX4ZQKR6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, sendPasswordResetEmail };
