import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // helper function provided below
import { userAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./FirebaseUser";
import { useNavigate } from "react-router-dom";

// List of common temporary email domains to block
const TEMP_EMAIL_DOMAINS = [
  "tempmail.com", "temp-mail.org", "temp-mail.io", "tempmail.io", "temp-mail.ru", 
  "tempmail.ru", "10minutemail.com", "mailinator.com", "guerrillamail.com", "sharklasers.com", 
  "guerrillamail.info", "grr.la", "guerrillamail.biz", "guerrillamail.org", "guerrillamail.net", 
  "yopmail.com", "yopmail.fr", "yopmail.net", "cool.fr.nf", "jetable.fr.nf", 
  "nospam.ze.tc", "nomail.xl.cx", "mega.zik.dj", "speed.1s.fr", "courriel.fr.nf", 
  "moncourrier.fr.nf", "monemail.fr.nf", "monmail.fr.nf", "discard.email", "discardmail.com", 
  "spambog.com", "mailnesia.com", "mailinator.net", "mailinator2.com", "trashmail.net", 
  "trashmail.com", "getnada.com", "emailfake.com", "tempr.email", "dispostable.com",
  "1secmail.com", "mohmal.com", "dropmail.me", "tempmail.dev", "maildrop.cc",
  "gettempemail.com", "mailtemp.net", "10minemail.com", "emailondeck.com", "tempmailo.com",
  "disposablemail.com", "throwawaymail.com", "throwmail.com", "hulapla.de", "trash-mail.com"
];

// Function to check if email is from a temporary mail service
const isTemporaryEmail = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  return TEMP_EMAIL_DOMAINS.some(tempDomain => 
    domain.toLowerCase() === tempDomain.toLowerCase() || 
    domain.toLowerCase().endsWith('.' + tempDomain.toLowerCase())
  );
};

// Update the domain validation function
const isValidEmailDomain = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  // Only allow these specific domains
  const allowedDomains = ['gmail.com', 'nwu.ac.bd'];
  return allowedDomains.includes(domain.toLowerCase());
};

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

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    gender: "",
    image: "",
    password: "",
  });

  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear email-related error when email changes
    if (e.target.name === 'email' && errorToast && toastMessage.includes("temporary")) {
      setErrorToast(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setToastMessage("Image size must be less than 10MB");
        setErrorToast(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setRawImage(reader.result);
        setCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropDone = async () => {
    try {
      const croppedImage = await getCroppedImg(rawImage, croppedAreaPixels);
      setFormData({ ...formData, image: croppedImage });
      setCropping(false);
    } catch (e) {
      console.error("Cropping failed", e);
      setToastMessage("Failed to crop image. Please try again.");
      setErrorToast(true);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setToastMessage("Email is required to send OTP.");
      setErrorToast(true);
      return;
    }
    
    // Check if the email domain is allowed
    if (!isValidEmailDomain(formData.email)) {
      setToastMessage("Only Gmail and NWU email addresses are allowed.");
      setErrorToast(true);
      return;
    }
    
    // Check if the email is from a temporary email service
    if (isTemporaryEmail(formData.email)) {
      setToastMessage("Temporary email addresses are not allowed. Please use a permanent email address.");
      setErrorToast(true);
      return;
    }
    
    setLoadingToast(true);
    setToastMessage("Sending OTP...");
    
    try {
      const res = await fetch(
        "https://comptron-server-2.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      const data = await res.json();
      setLoadingToast(false);
      
      if (res.ok) {
        setOtpSent(true);
        setSuccessToast(true);
        setToastMessage("OTP sent successfully to your email.");
      } else {
        setErrorToast(true);
        setToastMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setLoadingToast(false);
      setErrorToast(true);
      setToastMessage("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    
    // Check if the email domain is allowed
    if (!isValidEmailDomain(formData.email)) {
      setToastMessage("Only Gmail and NWU email addresses are allowed.");
      setErrorToast(true);
      return;
    }
    
    // Double-check to ensure a temporary email hasn't been used
    if (isTemporaryEmail(formData.email)) {
      setToastMessage("Temporary email addresses are not allowed. Please use a permanent email address.");
      setErrorToast(true);
      return;
    }
    
    setLoadingToast(true);
    setToastMessage("Verifying OTP & creating account...");
    setLoading(true);

    try {
      const verify = await fetch(
        "https://comptron-server-2.onrender.com/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, code: otp }),
        }
      );
      const result = await verify.json();
      if (!verify.ok) throw new Error(result.message || "OTP verification failed");

      const userCredential = await createUserWithEmailAndPassword(
        userAuth,
        formData.email,
        formData.password
      );

      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/users/pending/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            firebaseUserId: userCredential.user.uid,
            password: formData.password
          }),
        }
      );

      if (response.ok) {
        // Sign out the user to prevent automatic login
        await signOut(userAuth);
        
        // Show success message with clear instructions
        setLoadingToast(false);
        setSuccessToast(true);
        setToastMessage(`Registration successful! Your account requires admin approval before you can log in. You'll receive an email when approved.`);
        
        // Clear form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          gender: "",
          image: "",
          password: "",
        });
        setOtp("");
        setOtpSent(false);
        
        // After 4 seconds, navigate to login page
        setTimeout(() => {
          navigate("/UserLogin");
        }, 4000);
      } else {
        const errData = await response.json();
        setLoadingToast(false);
        setErrorToast(true);
        setToastMessage(errData.error || "Registration failed.");
      }
    } catch (err) {
      setLoadingToast(false);
      setErrorToast(true);
      setToastMessage(err.message || "Registration error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-8 max-w-md w-full bg-[#1C1C1C] rounded-xl shadow-md text-white">
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
        
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleVerifyAndRegister} className="flex flex-col gap-4">
          {/* Other inputs */}
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          />
          <input
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 bg-[#2a2a2a] rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 bg-[#2a2a2a] rounded"
          />

          {cropping && rawImage && (
            <div className="relative w-full h-64 bg-black">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <button
                type="button"
                onClick={handleCropDone}
                className="absolute bottom-2 right-2 bg-green-600 px-3 py-1 rounded text-sm"
              >
                Done
              </button>
            </div>
          )}

          {formData.image && !cropping && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          )}

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loadingToast}
            >
              {loadingToast ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="p-2 bg-[#2a2a2a] rounded"
              />
              <button
                type="submit"
                className="bg-green-600 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                )}
                {loading ? "Registering..." : "Verify & Register"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
