import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/images/Comptron Logo.png";
import getCroppedImg from "../utils/cropImage";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
import RichTextEditor from "../RichTextStyle/RichTextEditor";

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

const AdvisorySettingsPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const customId = localStorage.getItem("customId");
   const [user, setUser] = useState({
      name: "",
      skills: "",
      email: "",
      phone: "",
      bio: "",
      studentId: "",
      bloodGroup: "",
      department: "",
      dateOfBirth: "",
      linkedIn: "",
      github: "",
      portfolio: "",
      cv: "",
      customId: "",
   });
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(true);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [cropperVisible, setCropperVisible] = useState(false);
   const [croppedImage, setCroppedImage] = useState(null);
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

   const onCropComplete = (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   };

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/advisory/profile/${id}`)
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
               bio: data.bio || "",
               studentId: data.studentId || "",
               bloodGroup: data.bloodGroup || "",
               department: data.department || "",
               dateOfBirth: data.dateOfBirth || "",
               linkedIn: data.linkedIn || "",
               github: data.github || "",
               portfolio: data.portfolio || "",
               cv: data.cv || "",
               customId: data.customId || "",
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
            setToastMessage("Image size must be less than 5MB");
            setErrorToast(true);
            return;
         }
         const reader = new FileReader();
         reader.onloadend = () => {
            setImage(reader.result);
            setCropperVisible(true);
         };
         reader.readAsDataURL(file);
      }
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
      formData.append("linkedIn", user.linkedIn);
      formData.append("github", user.github);
      formData.append("portfolio", user.portfolio);
      formData.append("cv", user.cv);
      formData.append("bio", user.bio);
      formData.append("studentId", user.studentId);
      formData.append("bloodGroup", user.bloodGroup);
      formData.append("department", user.department);
      formData.append("dateOfBirth", user.dateOfBirth);
      formData.append("customId", user.customId);

      // Convert base64 image to blob if it exists
      if (croppedImage || image) {
         const imageData = croppedImage || image;
         const base64Response = await fetch(imageData);
         const blob = await base64Response.blob();
         formData.append("image", blob);
      }

      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/advisory/profile/${id}`,
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
            bio: data.bio || "",
            studentId: data.studentId || "",
            bloodGroup: data.bloodGroup || "",
            department: data.department || "",
            dateOfBirth: data.dateOfBirth || "",
            linkedIn: data.linkedIn || "",
            github: data.github || "",
            portfolio: data.portfolio || "",
            cv: data.cv || "",
            customId: data.customId || "",
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

   const handleDelete = async () => {
      if (
         window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
         )
      ) {
         setLoadingToast(true);
         setToastMessage("Deleting account...");

         try {
            const response = await fetch(
               `https://comptron-server-2.onrender.com/api/advisory/delete/${id}`,
               {
                  method: "DELETE",
               }
            );

            if (!response.ok) {
               const errorData = await response.json();
               throw new Error(
                  errorData.message || `HTTP error! Status: ${response.status}`
               );
            }

            setLoadingToast(false);
            setSuccessToast(true);
            setToastMessage("Account deleted successfully.");
            setTimeout(() => navigate("/"), 2000);
         } catch (err) {
            console.error("Delete error:", err);
            setLoadingToast(false);
            setErrorToast(true);
            setToastMessage(err.message || "Failed to delete account");
         }
      }
   };

   const handleCancel = () => {
      navigate(`/advisory/profile/${id}`);
   };

   const handleCroppedImage = async () => {
      try {
         const croppedImage = await getCroppedImg(image, croppedAreaPixels);
         setCroppedImage(croppedImage); // base64 string
         setImage(croppedImage);
         setCropperVisible(false);
      } catch (e) {
         console.error(e);
         setErrorToast(true);
         setToastMessage("Failed to crop image. Please try again.");
      }
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-white text-white text-2xl">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );
   }

   if (customId !== id) {
      return (
         <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center space-y-6 p-8 rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10 transform hover:scale-105 transition-all duration-300">
               <div className="text-9xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
                  401
               </div>
               <h1 className="text-4xl font-bold text-white">Unauthorized Access</h1>
               <p className="text-gray-300 max-w-md">
                  Sorry, you don&apos;t have permission to access this page. Please make
                  sure you&apos;re logged in with the correct account.
               </p>
               <NavLink
                  to="/"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-300">
                  Return Home
               </NavLink>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-white p-4 lg:p-8">
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

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 w-64 bg-[#1c1c1e] text-white transform ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-4">
               <h2 className="text-2xl font-bold mb-6">Menu</h2>
               <nav className="space-y-2">
                  <NavLink
                     to={`/`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Home
                  </NavLink>
                  <NavLink
                     to={`/advisory/profile/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Profile
                  </NavLink>
                  <NavLink
                     to={`/AllMembers`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     All Members
                  </NavLink>
                  <NavLink
                     to={`/advisory/settings/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
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

         {/* Main Content */}
         <div className="md:ml-64 transition-all duration-300 p-4 lg:p-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-6">
               <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                     Advisory Settings
                  </h1>
                  <p className="text-gray-600">
                     Manage your advisory profile information and preferences
                  </p>
               </div>
            </div>

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
                              Role
                           </label>
                           <input
                              type="text"
                              value={user.studentId}
                              onChange={(e) =>
                                 setUser({ ...user, studentId: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="Enter your role (e.g., Advisor)"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Email Address
                           </label>
                           <input
                              type="email"
                              value={user.email}
                              onChange={(e) =>
                                 setUser({ ...user, email: e.target.value })
                              }
                              className="w-full bg-gray-50 border border-gray-300 text-gray-500 rounded-lg px-4 py-3 cursor-not-allowed"
                              placeholder="Enter your email"
                              disabled
                           />
                           <p className="text-xs text-gray-500">
                              Email cannot be changed
                           </p>
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

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Blood Group
                           </label>
                           <select
                              value={user.bloodGroup}
                              onChange={(e) =>
                                 setUser({ ...user, bloodGroup: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400">
                              <option value="">Select Blood Group</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Department
                           </label>
                           <select
                              value={user.department}
                              onChange={(e) =>
                                 setUser({ ...user, department: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400">
                              <option value="">Select Department</option>
                              <option value="CSE">Computer Science & Engineering</option>
                              <option value="EEE">
                                 Electrical & Electronic Engineering
                              </option>
                              <option value="CIVIL">Civil Engineering</option>
                              <option value="BBA">Business Administration</option>
                              <option value="LAW">Law</option>
                              <option value="EEL">English Language & Literature</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Date of Birth
                           </label>
                           <input
                              type="date"
                              value={user.dateOfBirth}
                              onChange={(e) =>
                                 setUser({ ...user, dateOfBirth: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
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
                     </div>
                  </div>

                  {/* Bio Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Biography
                     </h2>
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                           About Yourself
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-transparent transition-all duration-200">
                           <RichTextEditor
                              initialContent={user.bio}
                              onContentChange={(newContent) =>
                                 setUser({ ...user, bio: newContent })
                              }
                              contentClassName="bg-white text-gray-900 min-h-[120px]"
                           />
                        </div>
                        <p className="text-xs text-gray-500">
                           Tell others about yourself, your interests, and achievements
                        </p>
                     </div>
                  </div>

                  {/* Social Links Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Social Links & Professional Profiles
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              LinkedIn URL
                           </label>
                           <input
                              type="url"
                              value={user.linkedIn || ""}
                              onChange={(e) =>
                                 setUser({ ...user, linkedIn: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://linkedin.com/in/yourname"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              GitHub URL
                           </label>
                           <input
                              type="url"
                              value={user.github || ""}
                              onChange={(e) =>
                                 setUser({ ...user, github: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://github.com/yourusername"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Portfolio URL
                           </label>
                           <input
                              type="url"
                              value={user.portfolio || ""}
                              onChange={(e) =>
                                 setUser({ ...user, portfolio: e.target.value })
                              }
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://yourportfolio.com"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              CV URL
                           </label>
                           <input
                              type="url"
                              value={user.cv || ""}
                              onChange={(e) => setUser({ ...user, cv: e.target.value })}
                              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              placeholder="https://drive.google.com/..."
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Custom ID <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              value={user.customId}
                              onChange={(e) =>
                                 setUser({ ...user, customId: e.target.value })
                              }
                              className="w-full bg-gray-50 border border-gray-300 text-gray-500 rounded-lg px-4 py-3 cursor-not-allowed"
                              placeholder="Enter your unique Custom ID"
                              required
                              disabled
                           />
                           <p className="text-xs text-gray-500">
                              Custom ID cannot be changed
                           </p>
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
                           {(croppedImage || image) && (
                              <div className="flex-shrink-0">
                                 <img
                                    src={croppedImage || image}
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
                        <button
                           type="button"
                           onClick={() => navigate("/Reset")}
                           className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-sm">
                           Change Password
                        </button>
                     </div>
                  </div>
               </form>

               {/* Danger Zone */}
               <div className="max-w-4xl mx-auto mt-8">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                     <h3 className="text-lg font-semibold text-red-900 mb-2">
                        Danger Zone
                     </h3>
                     <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be
                        certain.
                     </p>{" "}
                     <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Delete Account
                     </button>
                  </div>
               </div>
            </div>

            {/* Image Crop Modal */}
            {cropperVisible && image && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
                     <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                           Crop Profile Picture
                        </h3>
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                           <div className="relative w-full h-64 sm:h-96">
                              <Cropper
                                 image={image}
                                 crop={crop}
                                 zoom={zoom}
                                 aspect={1}
                                 cropShape="round"
                                 showGrid={false}
                                 onCropChange={setCrop}
                                 onZoomChange={setZoom}
                                 onCropComplete={onCropComplete}
                              />
                           </div>
                        </div>
                        {/* Zoom Controls */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                           <button
                              type="button"
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-lg font-bold transition-colors duration-200 border border-gray-300"
                              onClick={() => setZoom((z) => Math.max(1, z - 0.1))}>
                              −
                           </button>
                           <input
                              type="range"
                              min={1}
                              max={3}
                              step={0.01}
                              value={zoom}
                              onChange={(e) => setZoom(Number(e.target.value))}
                              className="w-40 accent-blue-600"
                           />
                           <button
                              type="button"
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-lg font-bold transition-colors duration-200 border border-gray-300"
                              onClick={() => setZoom((z) => Math.min(3, z + 0.1))}>
                              +
                           </button>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                           <button
                              onClick={() => setCropperVisible(false)}
                              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                              Cancel
                           </button>
                           <button
                              onClick={handleCroppedImage}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              Apply Crop
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default AdvisorySettingsPage;
