import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const SettingsPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const customId = localStorage.getItem("customId");   const [user, setUser] = useState({
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
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [upImg, setUpImg] = useState(null);
   const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 });
   const [completedCrop, setCompletedCrop] = useState(null);
   const [showCropDialog, setShowCropDialog] = useState(false);
   const imgRef = useRef(null);
   const previewCanvasRef = useRef(null);

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/members/${id}`)
         .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
            return res.json();
         })
         .then((data) => {            setUser({
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
            setError("Failed to load profile. Please check the user ID.");
            setLoading(false);
         });
   }, [id]);
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         if (file.size > 10 * 1024 * 1024) {
            setError("Image size must be less than 5MB");
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

   const generateCroppedImage = async (crop, scale = 1) => {
      if (!imgRef.current || !crop.width || !crop.height) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = imgRef.current;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const pixelRatio = window.devicePixelRatio;
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

      return new Promise((resolve) => {
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
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("skills", user.skills);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      console.log('Sending socials:', user.socials); // Debug log
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

         const data = await response.json();         setUser({
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
         setSuccess("Profile updated successfully!");
      } catch (err) {
         console.error("Update error:", err);
         setError(
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] p-4 lg:p-8">
         <div
            className={`fixed inset-y-0 left-0 w-64 bg-[#1c1c1e] text-white transform ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-4">
               <h2 className="text-2xl font-bold mb-6">Menu</h2>
               <nav className="space-y-2">
                  {/* <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </NavLink> */}

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
                     to={`/members/CommitteeProfile/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     Profile
                  </NavLink>
                  <NavLink
                     to={`/GMembers`}
                     className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg ${
                           isActive ? "bg-blue-600" : "hover:bg-gray-700"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     All Members
                  </NavLink>
                  <NavLink
                     to={`/CommitteeSettings/${id}`}
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
            className="md:hidden fixed top-4 left-4 z-50 text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "✕" : "☰"}
         </button>
         {/* Main Content */} {/* Crop Dialog */}
         {showCropDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-[#1c1c1e] p-6 rounded-xl max-w-2xl w-full">
                  <h3 className="text-xl font-semibold text-white mb-4">Crop Image</h3>
                  <div className="relative">
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
                  <div className="flex justify-end gap-3 mt-4">
                     <button
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        onClick={() => setShowCropDialog(false)}>
                        Cancel
                     </button>
                     <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        onClick={() => generateCroppedImage(completedCrop)}>
                        Apply
                     </button>
                  </div>
               </div>
            </div>
         )}
         <div className="md:ml-64 transition-all duration-300">
            <div className="bg-[#1c1c1e] p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto mt-4 text-white">
               <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
                  Settings
               </h1>
               {error && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
                     {error}
                  </div>
               )}
               {success && (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
                     {success}
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                     <div className="space-y-2">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                           type="text"
                           value={user.name}
                           onChange={(e) => setUser({ ...user, name: e.target.value })}
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your name"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium">Skills</label>
                        <input
                           type="text"
                           value={user.skills}
                           onChange={(e) => setUser({ ...user, skills: e.target.value })}
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your skills"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                           type="email"
                           value={user.email}
                           onChange={(e) => setUser({ ...user, email: e.target.value })}
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your email"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                           type="text"
                           value={user.phone}
                           onChange={(e) => setUser({ ...user, phone: e.target.value })}
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your phone"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium">GitHub URL</label>
                        <input
                           type="url"
                           value={user.socials?.github || ""}
                           onChange={(e) =>
                              setUser({
                                 ...user,
                                 socials: { ...user.socials, github: e.target.value },
                              })
                           }
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="https://github.com/yourusername"
                        />
                     </div>

                       <div className="space-y-2">
                        <label className="block text-sm font-medium">LinkedIn URL</label>
                        <input
                           type="url"
                           value={user.socials?.linkedin || ""}
                           onChange={(e) =>
                              setUser({
                                 ...user,
                                 socials: { ...user.socials, linkedin: e.target.value },
                              })
                           }
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="https://linkedin.com/in/yourusername"
                        />
                     </div>
                     
                     <div className="space-y-2">
                        <label className="block text-sm font-medium">CV Link</label>
                        <input
                           type="url"
                           value={user.socials?.cv || ""}
                           onChange={(e) =>
                              setUser({
                                 ...user,
                                 socials: { ...user.socials, cv: e.target.value },
                              })
                           }
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Link to your CV (Google Drive, Dropbox etc.)"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium">Portfolio URL</label>
                        <input
                           type="url"
                           value={user.socials?.portfolio || ""}
                           onChange={(e) =>
                              setUser({
                                 ...user,
                                 socials: { ...user.socials, portfolio: e.target.value },
                              })
                           }
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="https://yourportfolio.com"
                        />
                     </div>

                     <div className="sm:col-span-2 space-y-2">
                        <label className="block text-sm font-medium">Profile Image</label>
                        <input
                           type="file"
                           accept="image/*"
                           onChange={handleImageChange}
                           className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                        />
                        {image && (
                           <img
                              src={image}
                              alt="Preview"
                              className="mt-2 w-24 h-24 rounded-full object-cover"
                           />
                        )}
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                     <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300">
                        Save Changes
                     </button>
                     <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-auto px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-300">
                        Cancel
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SettingsPage;
