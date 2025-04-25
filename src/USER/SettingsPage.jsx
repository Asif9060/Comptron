import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import getCroppedImg from "../utils/cropImage";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
// import BioEditor from "./BioEditor";

const SettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customId = localStorage.getItem("customId");
  const [user, setUser] = useState({
    name: "",
    skills: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    zoom: 1,
    width: 200,
    height: 200,
  });
  const cropperRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    fetch(`https://comptron-server-2.onrender.com/api/users/profile/${id}`)
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
      reader.onloadend = () => {
        setImage(reader.result);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      name: user.name,
      skills: user.skills,
      email: user.email,
      phone: user.phone,
      image: croppedImage || image,
      linkedIn: user.linkedIn,
      github: user.github,
      portfolio: user.portfolio,
      cv: user.cv,
      bio: user.bio,
    };

    try {
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        // Step 1: Delete from your own backend/database
        const response = await fetch(
          `https://comptron-server-2.onrender.com/api/users/delete/${id}`,
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

        setSuccess("Account deleted successfully.");
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        console.error("Delete error:", err);
        setError(err.message || "Failed to delete account");
      }
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${id}`);
  };

  const handleCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage); // base64 string
      setImage(croppedImage);
      setCropperVisible(false);
    } catch (e) {
      console.error(e);
    }
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
  if (customId !== id) {
    return (
      <p className="text-white text-2xl font-bold flex justify-center items-center h-screen">
        Unauthorized
      </p>
    ); // Or redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] p-4 lg:p-8">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#1c1c1e] text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
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
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to={`/profile/${id}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </NavLink>
            <NavLink
              to={`/AllMembers`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              All Members
            </NavLink>
            <NavLink
              to={`/settings/${id}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Main Content */}
      <div className="md:ml-64 transition-all duration-300">
        <div className="bg-[#1c1c1e] p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto mt-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Settings</h1>

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
                <label className="block text-sm font-medium mb-1">Bio</label>
                <input
                  type="text" 
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write something about yourself..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Skills</label>
                <input
                  type="text"
                  value={user.skills}
                  onChange={(e) => setUser({ ...user, skills: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your skills"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={user.linkedIn || ""}
                  onChange={(e) => setUser({ ...user, linkedIn: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={user.github || ""}
                  onChange={(e) => setUser({ ...user, github: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={user.portfolio || ""}
                  onChange={(e) => setUser({ ...user, portfolio: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">CV URL</label>
                <input
                  type="url"
                  value={user.cv || ""}
                  onChange={(e) => setUser({ ...user, cv: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                />
                <div className="flex flex-col">
                  {image && !cropperVisible && (
                    <img
                      src={croppedImage || image}
                      alt="Preview"
                      className="mt-2 w-24 h-24 aspect-square rounded-full object-cover"
                    />
                  )}
                </div>
              
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>

          {cropperVisible && image && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white p-4 rounded-lg w-96 h-96">
                <div className="relative w-full h-64">
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
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleCroppedImage}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                  >
                    Crop Image
                  </button>
                  <button
                    onClick={() => setCropperVisible(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
