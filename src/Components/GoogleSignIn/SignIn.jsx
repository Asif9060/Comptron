import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

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
const provider = new GoogleAuthProvider();

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if a user is already signed in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const storedEmail = localStorage.getItem("userEmail");

      const result = await signInWithPopup(auth, provider);
      const signedInEmail = result.user.email;

      if (storedEmail && storedEmail !== signedInEmail) {
        setError("You are already signed in with a different account. Please sign out first.");
        return;
      }

      setUser(result.user);
      localStorage.setItem("userEmail", signedInEmail);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Sign-in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      setUser(null);
      navigate("/News");
    } catch (error) {
      console.error("Error during sign-out:", error);
      setError("Sign-out failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <img
            src={user.photoURL}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%", margin: "10px" }}
          />
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut} style={{ padding: "10px", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h2>Sign in with Google</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleSignIn} style={{ padding: "10px", cursor: "pointer" }}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
export { auth, provider };
