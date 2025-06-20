// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { userAuth } from "../USER/FirebaseUser";
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

const AdvisoryLogin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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

      // First check if user is pending approval
      const pendingResponse = await fetch(
        `https://comptron-server-2.onrender.com/api/advisory/getByEmail/${email}`
      );
      
      if (pendingResponse.ok) {
        const pendingData = await pendingResponse.json();
        
        if (pendingData.isPending) {
          // User exists in pending collection, so they can't log in yet
          setLoadingToast(false);
          setErrorToast(true);
          setToastMessage("Your account is pending for admin approval. Please wait for approval before logging in.");
          
          // Sign out the user from Firebase since they're not approved yet
          const auth = getAuth();
          await signOut(auth);
          return;
        }
      }

      // Check if user exists in main collection (approved users)
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/advisory/getByEmail/${email}`
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
        // User might have been rejected or doesn't exist
        setLoadingToast(false);
        setErrorToast(true);
        setToastMessage("Account not found. Your registration may have been rejected or is still pending approval.");
        
        // Sign out the user from Firebase
        const auth = getAuth();
        await signOut(auth);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 flex justify-center items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

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

      <div className="bg-[#1c1c1e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-gray-800 relative animate-fadeIn">
        {/* Tech-inspired decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500 animate-pulse"></div>

        <div className="text-center mb-8 animate-slideDown">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue your tech journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all duration-300 group-hover:border-blue-500/50"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 animate-slideUp" style={{ animationDelay: '200ms' }}>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all duration-300 group-hover:border-blue-500/50"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-slideUp"
            style={{ animationDelay: '300ms' }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex justify-center space-x-6 mt-6 animate-slideUp" style={{ animationDelay: '400ms' }}>
            <button
              onClick={() => navigate("/Reset")}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
              type="button"
            >
              <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/Register")}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
              type="button"
            >
              <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </button>
          </div>
        </form>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdvisoryLogin;
