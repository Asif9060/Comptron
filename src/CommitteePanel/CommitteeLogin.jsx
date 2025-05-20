import { useEffect } from "react";
import "../AdminPanel/Dorja.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
const db = getFirestore(app);


const CommitteeLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email);
        navigate("/Committee");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      localStorage.setItem("userEmail", userCredential.user.email);
      navigate("/Committee");
    } catch (error) {
      setError("Invalid Username or password. Please try again.");
    }
  };

  const handleSignUp = async () => {
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      setUser(userCredential.user);

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email,
        createdAt: new Date(),
      });

      setUser(user);

      localStorage.setItem("userEmail", userCredential.user.email);
      navigate("/CommitteeLogin");
      setSuccess("Signup successful!");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      setTimeout(() => {
        container.classList.add("sign-in");
      }, 200);
    }
  }, []);

  const toggle = () => {
    const container = document.getElementById("container");
    if (container) {
      container.classList.toggle("sign-in");
      container.classList.toggle("sign-up");
    }
  };

  return (
    <div>
      <div id="container" className="container12">
        <div className="row">
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Confirm password" />
                </div>
                <button onClick={handleSignUp}>Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign in here
                  </b>
                </p>
              </div>
            </div>
          </div>

          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
              <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <button onClick={handleSignIn} >Sign in</button>
                <p>
                  <b>Forgot password?</b>
                </p>
                <p>
                  <span>Don't have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign up here
                  </b>
                </p>
              </div>
            </div>
            <div className="form-wrapper"></div>
          </div>
        </div>

        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Welcome</h2>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
            </div>
            <div className="img sign-in"></div>
          </div>

          <div className="col align-items-center flex-col">
            <div className="img sign-up"></div>
            <div className="text sign-up">
              <h2>Join with us</h2>
              {success && <p style={{ color: "green" }}>{success}</p>}
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeLogin;
