// src/firebaseAdmin.js

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjV_5GHK6eJLKDjVemGQWLxfamw1QZrYc",
  authDomain: "comptron-91282.firebaseapp.com",
  projectId: "comptron-91282",
  storageBucket: "comptron-91282.appspot.com",
  messagingSenderId: "590754934222",
  appId: "1:590754934222:web:817091e9e06b44ba39cf9f",
  measurementId: "G-FEEX4ZQKR6",
};

// Initialize Firebase only if it's not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
