import { useState, useEffect } from "react";
import { sendPasswordResetEmail, userAuth } from "./FirebaseUser"; // Import the function and auth object

// Create a custom centered toast component with blurred backdrop
const CenteredToast = ({ visible, setVisible, message, type }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, type === 'success' ? 3000 : 5000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, setVisible, type]);

  if (!visible) return null;

  const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#1F2937';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-300"></div>
      
      {/* Toast content */}
      <div 
        className="relative px-4 sm:px-8 py-4 sm:py-5 rounded-lg shadow-lg text-white text-center w-full max-w-xs sm:max-w-md transition-all duration-300"
        style={{ 
          background: bgColor,
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {type === 'loading' && (
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-7 sm:w-7 border-b-2 border-white"></div>
          </div>
        )}
        <p className="text-sm sm:text-base md:text-lg font-medium break-words">{message}</p>
      </div>
    </div>
  );
};

const AdminPasswordResetPage = () => {
  const [email, setEmail] = useState("");
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

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingToast(true);
    setToastMessage("Sending reset email...");

    try {
      await sendPasswordResetEmail(userAuth, email);
      setLoadingToast(false);
      setSuccessToast(true);
      setToastMessage("Password reset email sent successfully.");
      setEmail(""); // Clear the email field after success
    } catch (error) {
      setLoadingToast(false);
      setErrorToast(true);
      setToastMessage(error.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-3 sm:px-4 py-6 sm:py-10 flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-[30rem] p-4 sm:p-6 md:p-9.5 bg-[#1C1C1C] rounded-lg sm:rounded-xl border shadow-md text-white">
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
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Send Password Reset
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Enter User's Email"
            className="p-2 sm:p-3 rounded bg-[#2a2a2a] text-sm sm:text-base md:text-lg"
            value={email}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`mt-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 sm:py-3 text-sm sm:text-base md:text-lg ${loading ? 'opacity-75 cursor-wait' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordResetPage;
