import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // helper function provided below
import {
  userAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "../USER/FirebaseUser";
import { useNavigate } from "react-router-dom";

// Create a custom centered toast component with blurred backdrop
const CenteredToast = ({ visible, setVisible, message, type }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(
        () => {
          setVisible(false);
        },
        type === "success" ? 3000 : 5000
      );

      return () => clearTimeout(timer);
    }
  }, [visible, setVisible, type]);

  if (!visible) return null;

  const bgColor =
    type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#1F2937";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-300"></div>

      {/* Toast content */}
      <div
        className="relative px-4 sm:px-8 py-4 sm:py-5 rounded-lg shadow-lg text-white text-center w-full max-w-xs sm:max-w-md transition-all duration-300"
        style={{
          background: bgColor,
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        {type === "loading" && (
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-7 sm:w-7 border-b-2 border-white"></div>
          </div>
        )}
        <p className="text-sm sm:text-base md:text-lg font-medium break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

const AdvisoryRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    bloodGroup: "",
    skills: "",
    gender: "",
    image: "",
    password: "",
    customId: "",
  });

  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // Toast visibility states
  const [loadingToast, setLoadingToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Add CSS for animation
  useEffect(() => {
    // Create style element if it doesn't exist
    if (!document.getElementById("toast-animations")) {
      const style = document.createElement("style");
      style.id = "toast-animations";
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

  // Simplified registration handler (no OTP)
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingToast(true);
    setToastMessage("Registering account...");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        userAuth,
        formData.email,
        formData.password
      );
      const registrationData = new FormData();
      registrationData.append('name', formData.name);
      registrationData.append('email', formData.email);
      registrationData.append('phone', formData.phone);
      registrationData.append('studentId', formData.studentId);
      registrationData.append('department', formData.department);
      registrationData.append('bloodGroup', formData.bloodGroup);
      registrationData.append('skills', formData.skills);
      registrationData.append('gender', formData.gender);
      registrationData.append('password', formData.password);
      registrationData.append('firebaseUserId', userCredential.user.uid);
      registrationData.append('customId', formData.customId);
      if (formData.image) {
        const base64Response = await fetch(formData.image);
        const blob = await base64Response.blob();
        registrationData.append('image', blob);
      }
      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/advisory/register",
        {
          method: "POST",
          body: registrationData,
        }
      );
      if (response.ok) {
        await signOut(userAuth);
        setLoadingToast(false);
        setSuccessToast(true);
        setToastMessage(
          `Registration successful`
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          studentId: "",
          department: "",
          bloodGroup: "",
          skills: "",
          gender: "",
          image: "",
          password: "",
          customId: "",
        });
        setTimeout(() => {
          navigate("/");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="p-8 max-w-2xl w-full bg-[#1C1C1C] rounded-xl shadow-2xl text-white border border-gray-800 relative overflow-hidden">
        {/* Tech-inspired background elements */}
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

        <div className="relative">
          <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Join Comptron
          </h2>
          <p className="text-gray-400 text-center mb-8 text-lg">
            Be part of the tech revolution
          </p>

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Student ID</label>
                <input
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="BBA">BBA</option>
                  <option value="LAW">LAW</option>
                  <option value="EEL">EEL</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Skills</label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative group">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Profile Picture</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
                {formData.image && !cropping && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Custom ID <span className="text-red-400">*</span></label>
              <input
                name="customId"
                value={formData.customId}
                onChange={handleChange}
                className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                required
                placeholder="Enter your unique Custom ID"
              />
            </div>

            {cropping && rawImage && (
              <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden">
                <Cropper
                  image={rawImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  className="rounded-lg"
                />

                {/* Zoom Controls */}
                <div className="absolute bottom-4 left-4 flex items-center bg-black/50 rounded-lg p-2 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                    className="text-white hover:text-blue-400 transition-colors p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(e.target.value)}
                    className="mx-2 w-32 accent-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                    className="text-white hover:text-blue-400 transition-colors p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCropDone}
                  className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Done
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] flex items-center justify-center text-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryRegistrationForm;
