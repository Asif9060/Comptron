import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CommitteePanel/CommitteeLogin.css";
import bgImg from "../assets/images/bg-img.jpg";
import google from '../assets/images/icon-google.svg'
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
const Dorja = () => {
  const navigate = useNavigate();
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
        localStorage.setItem("isAdmin", "true"); // Set admin status
        navigate("");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      
      // Store user info in localStorage
      localStorage.setItem("userEmail", userCredential.user.email);
      localStorage.setItem("isAdmin", "true"); // Mark this user as an admin
      
      console.log("Logged in as:", userCredential.user.email);
      setSuccess("Login successful!");
      navigate("/AdminPage");
    } catch (error) {
      setError("Invalid Username or password. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      localStorage.setItem("userEmail", userCredential.user.email);
      localStorage.setItem("isAdmin", "true"); // Mark new user as admin
      
      setSuccess("Account created successfully! Please log in.");
      navigate("/Dorja");
    } catch (error) {
      setError(error.message);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     localStorage.removeItem("userEmail"); // Clear stored user email
  //     setUser(null); // Reset user state
  //     navigate("/Dorja"); // Redirect to login page
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };
  

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("userEmail", currentUser.email);
                localStorage.setItem("isAdmin", "true");
                // Only navigate if we're not already on the login page
                if (window.location.pathname !== "/Dorja") {
                    navigate("/AdminPage");
                }
            }
        });
    });
}, [navigate]);

  useEffect(() => {
    /*=============== SHOW HIDE PASSWORD LOGIN ===============*/
    const passwordAccess = (loginPass, loginEye) => {
      const input = document.getElementById(loginPass);
      const iconEye = document.getElementById(loginEye);

      if (input && iconEye) {
        iconEye.addEventListener("click", () => {
          // Change password to text
          input.type = input.type === "password" ? "text" : "password";

          // Icon change
          iconEye.classList.toggle("ri-eye-fill");
          iconEye.classList.toggle("ri-eye-off-fill");
        });
      }
    };
    passwordAccess("password", "loginPassword");

    /*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*/
    const passwordRegister = (loginPass, loginEye) => {
      const input = document.getElementById(loginPass);
      const iconEye = document.getElementById(loginEye);

      if (input && iconEye) {
        iconEye.addEventListener("click", () => {
          // Change password to text
          input.type = input.type === "password" ? "text" : "password";

          // Icon change
          iconEye.classList.toggle("ri-eye-fill");
          iconEye.classList.toggle("ri-eye-off-fill");
        });
      }
    };
    passwordRegister("passwordCreate", "loginPasswordCreate");

    /*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*/
    const loginAcessRegister = document.getElementById("loginAccessRegister");
    const buttonRegister = document.getElementById("loginButtonRegister");
    const buttonAccess = document.getElementById("loginButtonAccess");

    if (buttonRegister && loginAcessRegister) {
      buttonRegister.addEventListener("click", () => {
        loginAcessRegister.classList.add("active");
      });
    }

    if (buttonAccess && loginAcessRegister) {
      buttonAccess.addEventListener("click", () => {
        loginAcessRegister.classList.remove("active");
      });
    }

    return () => {
      // Cleanup event listeners
      if (buttonRegister) {
        buttonRegister.removeEventListener("click", () =>
          loginAcessRegister.classList.add("active")
        );
      }

      if (buttonAccess) {
        buttonAccess.removeEventListener("click", () =>
          loginAcessRegister.classList.remove("active")
        );
      }
    };
  }, []);
  return (
    <div className="bg-white">
      
      <svg
        className="login__blob"
        viewBox="0 0 566 840"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="mask0" mask-type="alpha">
          <path
            d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
          />
        </mask>

        <g mask="url(#mask0)">
          <path
            d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
          />

          <image className="login__img" href={bgImg} />
        </g>
      </svg>

      <div className="login container32 grid" id="loginAccessRegister">
        <div className="login__access">
          <h1 className="login__title">Log in to your account.</h1>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2 text-center">{success}</p>}

          <div className="login__area ">
            <htmlForm action="" className="login__htmlForm ">
              <div className="login__content grid">
                <div className="login__box ">
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                    className="login__input"
                  />
                  <label htmlFor="email" className="login__label">
                    Email
                  </label>

                  <i className="ri-mail-fill login__icon"></i>
                </div>

                <div className="login__box">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    required
                    placeholder=" "
                    className="login__input"
                  />
                  <label htmlFor="password" className="login__label">
                    Password
                  </label>

                  <i
                    className="ri-eye-off-fill login__icon login__password"
                    id="loginPassword"
                  ></i>
                </div>
              </div>

              
              <button onClick={handleSignIn} type="submit" className="login__button">
                Login
              </button>
            </htmlForm>

            <p className="login__switch">
              Don't have an account?
              <button className="ml-2" id="loginButtonRegister">Create Account</button>
            </p>
          </div>
        </div>

        </div>
      </div>
  );
};

export default Dorja;



{/* <div className="login__register">
  <h1 className="login__title">Create new account.</h1>
  {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
  {success && <p className="text-green-600 text-sm mt-2 text-center">{success}</p>}

  <div className="login__area">
    <htmlForm action="" className="login__htmlForm">
      <div className="login__content grid">
        <div className="login__group grid">
          
        </div>

        <div className="login__box">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="emailCreate"
            required
            placeholder=" "
            className="login__input"
          />
          <label htmlFor="emailCreate" className="login__label">
            Email
          </label>

          <i className="ri-mail-fill login__icon"></i>
        </div>

        <div className="login__box">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordCreate"
            required
            placeholder=" "
            className="login__input"
          />
          <label htmlFor="passwordCreate" className="login__label">
            Password
          </label>

          <i
            className="ri-eye-off-fill login__icon login__password"
            id="loginPasswordCreate"
          ></i>
        </div>
      </div>

      <button onClick={handleSignUp} type="submit" className="login__button">
        Create account
      </button>
    </htmlForm>

    <p className="login__switch">
      Already have an account?
      <button className="ml-2" id="loginButtonAccess">Log In</button>
    </p>
  </div> */}