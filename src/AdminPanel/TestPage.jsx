import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email);
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("userEmail", userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("userEmail", userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      setUser(null);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError("Sign-out failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.email}!</h2>
            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSignIn}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>

            <button
              onClick={handleSignUp}
              className="mt-2 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
export { auth };
