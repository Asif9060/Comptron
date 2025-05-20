import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseUserConfig = {
  apiKey: "AIzaSyDSoMDR1eOn0g2wPR_FnlEPXa3i80RI15g",
  authDomain: "comptron-general-members.firebaseapp.com",
  projectId: "comptron-general-members",
  storageBucket: "comptron-general-members.firebasestorage.app",
  messagingSenderId: "75932954317",
  appId: "1:75932954317:web:2e817a83b70b50a76c4384",
  measurementId: "G-H0RTBM39XP",
};

const userApp = initializeApp(firebaseUserConfig, "userApp");


const userAuth = getAuth(userApp);

export {
  userAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
};
