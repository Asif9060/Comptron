import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/images/Comptron Logo.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
            }}>
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

CenteredToast.propTypes = {
   visible: PropTypes.bool.isRequired,
   setVisible: PropTypes.func.isRequired,
   message: PropTypes.string.isRequired,
   type: PropTypes.oneOf(["success", "error", "loading"]).isRequired,
};

const CommitteeSettings = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [user, setUser] = useState({
      name: "",
      skills: "",
      email: "",
      phone: "",
      socials: {
         linkedin: "",
         github: "",
         portfolio: "",
         cv: "",
      },
   });
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(true);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [upImg, setUpImg] = useState(null);
   const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 });
   const [completedCrop, setCompletedCrop] = useState(null);
   const [showCropDialog, setShowCropDialog] = useState(false);
   const imgRef = useRef(null);

   // Toast notifications
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

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/members/${id}`)
         .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
            return res.json();
         })
         .then((data) => {
            setUser({
               name: data.name || "",
               skills: data.skills || "",
               email: data.email || "",
               phone: data.phone || "",
               socials: {
                  linkedin: data.socials?.linkedin || "",
                  github: data.socials?.github || "",
                  portfolio: data.socials?.portfolio || "",
                  cv: data.socials?.cv || "",
               },
            });
            setImage(data.image || null);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Fetch error:", err);
            setToastMessage("Failed to load profile. Please check the user ID.");
            setErrorToast(true);
            setLoading(false);
         });
   }, [id]);
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         if (file.size > 10 * 1024 * 1024) {
            setToastMessage("Image size must be less than 10MB");
            setErrorToast(true);
            return;
         }
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            setUpImg(reader.result);
            setShowCropDialog(true);
         });
         reader.readAsDataURL(file);
      }
   };

   const onLoad = (img) => {
      imgRef.current = img;
   };

   const generateCroppedImage = async (crop) => {
      if (!imgRef.current || !crop.width || !crop.height) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = imgRef.current;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
         image,
         crop.x * scaleX,
         crop.y * scaleY,
         crop.width * scaleX,
         crop.height * scaleY,
         0,
         0,
         crop.width * scaleX,
         crop.height * scaleY
      );

      canvas.toBlob(
         (blob) => {
            if (blob) {
               const reader = new FileReader();
               reader.onloadend = () => {
                  setImage(reader.result);
                  setShowCropDialog(false);
               };
               reader.readAsDataURL(blob);
            }
         },
         "image/jpeg",
         1
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoadingToast(true);
      setToastMessage("Updating profile...");

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("skills", user.skills);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      console.log("Sending socials:", user.socials); // Debug log
      formData.append("socials", JSON.stringify(user.socials));
      if (image && image.startsWith("data:image")) {
         const blob = await (await fetch(image)).blob(); // convert base64 to blob
         formData.append("image", blob, "profile.jpg");
      }

      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/members/${id}`,
            {
               method: "PUT",
               body: formData,
            }
         );

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
               errorData.message || `HTTP error! Status: ${response.status}`
            );
         }

         const data = await response.json();
         setUser({
            name: data.name || "",
            skills: data.skills || "",
            email: data.email || "",
            phone: data.phone || "",
            socials: data.socials || {
               linkedin: "",
               github: "",
               portfolio: "",
               cv: "",
            },
         });
         setImage(data.image || null);
         setLoadingToast(false);
         setSuccessToast(true);
         setToastMessage("Profile updated successfully!");
      } catch (err) {
         console.error("Update error:", err);
         setLoadingToast(false);
         setErrorToast(true);
         setToastMessage(
            err.message.includes("User not found")
               ? "User not found. Please verify the profile ID."
               : err.message || "Failed to update profile"
         );
      }
   };

   // Compare with the route param

   const handleCancel = () => {
      navigate(`/profile/${id}`);
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-[#111] text-white text-2xl">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );
   }
   //   if (customId !== id) {
   //     return (
   //       <div className="flex justify-center items-center min-h-screen text-white bg-[#111]">
   //         <p className="text-xl font-semibold">Unauthorized access</p>
   //       </div>
   //     );
   //   }

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Sidebar - keeping existing structure as requested */}
         <div
            className={`fixed inset-y-0 left-0 w-64 bg-[#1c1c1e] text-white transform ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-xl`}>
            <div className="p-4">
               <h2 className="text-2xl font-bold mb-6">Menu</h2>
               <nav className="space-y-2">
                  <NavLink
                     to={`/`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Home
                  </NavLink>
                  <NavLink
                     to={`/members/CommitteeProfile/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Profile
                  </NavLink>
                  <NavLink
                     to={`/GMembers`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     All Members
                  </NavLink>
                  <NavLink
                     to={`/CommitteeSettings/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Settings
                  </NavLink>
               </nav>
            </div>
         </div>

         {/* Mobile Sidebar Toggle */}
         <button
            className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "✕" : "☰"}
         </button>

         {/* Image Crop Dialog */}
         {showCropDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
                  <div className="p-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Crop Profile Picture
                     </h3>
                     <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <ReactCrop
                           crop={crop}
                           onChange={(c) => setCrop(c)}
                           onComplete={(c) => setCompletedCrop(c)}
                           aspect={1}
                           className="max-h-[60vh] mx-auto">
                           <img
                              ref={imgRef}
                              alt="Crop me"
                              src={upImg}
                              onLoad={(e) => onLoad(e.target)}
                              className="max-w-full h-auto"
                           />
                        </ReactCrop>
                     </div>
                     <div className="flex justify-end gap-3 mt-6">
                        <button
                           className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                           onClick={() => setShowCropDialog(false)}>
                           Cancel
                        </button>
                        <button
                           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           onClick={() => generateCroppedImage(completedCrop)}>
                           Apply Crop
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Main Content */}
         <div className="md:ml-64 transition-all duration-300 p-4 lg:p-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-6">
               <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                     Committee Settings
                  </h1>
                  <p className="text-gray-600">
                     Manage your committee profile information and preferences
                  </p>
               </div>
            </div>

            {/* Toast Notifications */}
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

            {/* Settings Form */}
            <div className="max-w-4xl mx-auto">
               <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Personal Information
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Full Name <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              value={user.name}
                              onChange={(e) => setUser({ ...user, name: e.target.value })}
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="Enter your full name"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Skills & Expertise
                           </label>
                           <input
                              type="text"
                              value={user.skills}
                              onChange={(e) =>
                                 setUser({ ...user, skills: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="e.g., React, Python, Machine Learning"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Email Address <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="email"
                              value={user.email}
                              onChange={(e) =>
                                 setUser({ ...user, email: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="Enter your email address"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Phone Number
                           </label>
                           <input
                              type="tel"
                              value={user.phone}
                              onChange={(e) =>
                                 setUser({ ...user, phone: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="Enter your phone number"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Social Links Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Social Links & Portfolio
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              LinkedIn Profile
                           </label>
                           <input
                              type="url"
                              value={user.socials?.linkedin || ""}
                              onChange={(e) =>
                                 setUser({
                                    ...user,
                                    socials: {
                                       ...user.socials,
                                       linkedin: e.target.value,
                                    },
                                 })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://linkedin.com/in/yourusername"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              GitHub Profile
                           </label>
                           <input
                              type="url"
                              value={user.socials?.github || ""}
                              onChange={(e) =>
                                 setUser({
                                    ...user,
                                    socials: { ...user.socials, github: e.target.value },
                                 })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://github.com/yourusername"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Portfolio Website
                           </label>
                           <input
                              type="url"
                              value={user.socials?.portfolio || ""}
                              onChange={(e) =>
                                 setUser({
                                    ...user,
                                    socials: {
                                       ...user.socials,
                                       portfolio: e.target.value,
                                    },
                                 })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://yourportfolio.com"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              CV/Resume Link
                           </label>
                           <input
                              type="url"
                              value={user.socials?.cv || ""}
                              onChange={(e) =>
                                 setUser({
                                    ...user,
                                    socials: { ...user.socials, cv: e.target.value },
                                 })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="Link to your CV (Google Drive, Dropbox etc.)"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Profile Image Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Profile Picture
                     </h2>
                     <div className="space-y-4">
                        <div className="flex items-center space-x-6">
                           {image && (
                              <div className="flex-shrink-0">
                                 <img
                                    src={image}
                                    alt="Profile preview"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                                 />
                              </div>
                           )}
                           <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Upload New Picture
                              </label>
                              <input
                                 type="file"
                                 accept="image/*"
                                 onChange={handleImageChange}
                                 className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                 Recommended: Square image, at least 200x200 pixels
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                           type="submit"
                           className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                           Save Changes
                        </button>
                        <button
                           type="button"
                           onClick={handleCancel}
                           className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-gray-300">
                           Cancel
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default CommitteeSettings;
