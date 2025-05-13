// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAuth } from "./FirebaseUser";
import { useParams } from "react-router-dom"; // Your Firebase initialization file
import toast, { Toaster } from "react-hot-toast"; // Import toast without ToastPosition

// Create a custom toast component for perfect centering
const CenteredToast = ({ visible, setVisible, message, type }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, type === 'success' ? 2000 : 4000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, setVisible, type]);

  if (!visible) return null;

  const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#1F2937';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-300"></div>
      
      {/* Toast content */}
      <div 
        className="relative px-8 py-5 rounded-lg shadow-lg text-white text-center max-w-md transition-all duration-300"
        style={{ 
          background: bgColor,
          minWidth: '300px',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {type === 'loading' && (
          <div className="flex justify-center mb-3">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
          </div>
        )}
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

const UserLogin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Toast visibility states
  const [loadingToast, setLoadingToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Add CSS for animation
  useEffect(() => {
    // Create style element if it doesn't exist
    if (!document.getElementById('toast-animations')) {
      const style = document.createElement('style');
      style.id = 'toast-animations';
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingToast(true);
    setToastMessage("Logging in...");

    try {
      // Firebase login
      await signInWithEmailAndPassword(userAuth, email, password);

      // Fetch user by email from backend
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/getByEmail/${email}`
      );
      const data = await response.json();

      if (response.ok && data.customId) {
        localStorage.setItem("customId", data.customId);
        // Show success toast
        setLoadingToast(false);
        setSuccessToast(true);
        setToastMessage("Welcome back!");
        
        // Wait for 2 seconds before navigating
        setTimeout(() => {
          navigate(`/profile/${data.customId}`);
        }, 2000);
      } else {
        setLoadingToast(false);
        setErrorToast(true);
        setToastMessage("User not found or missing ID.");
      }
    } catch (err) {
      console.error(err);
      setLoadingToast(false);
      setErrorToast(true);
      setToastMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] p-8 flex justify-center items-center">
      {/* Custom Toast Components */}
      <CenteredToast 
        visible={loadingToast} 
        setVisible={setLoadingToast}
        message={toastMessage}
        type="loading"
      />
      <CenteredToast 
        visible={successToast} 
        setVisible={setSuccessToast}
        message={toastMessage}
        type="success"
      />
      <CenteredToast 
        visible={errorToast} 
        setVisible={setErrorToast}
        message={toastMessage}
        type="error"
      />

      <div className="bg-[#1c1c1e] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/Reset")}
              className="text-sm text-blue-400 cursor-pointer hover:underline"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/Register")}
              className="text-sm text-blue-400 ml-5 cursor-pointer hover:underline"
              type="button"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
