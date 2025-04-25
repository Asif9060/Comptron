import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
const SettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customId = localStorage.getItem("customId");
  const [user, setUser] = useState({
    name: "",
    skills: "",
    email: "",
    phone: "",
    socials: {
      linkedIn: "",
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
            linkedIn: data.socials?.linkedIn || "",
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
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("skills", user.skills);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("socials", JSON.stringify(user.socials)); // this will now be parsed correctly
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
              to={`/members/CommitteeProfile/${id}`}
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
              to={`/GMembers`}
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
              to={`/CommitteeSettings/${id}`}
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
                <label className="block text-sm font-medium">
                  Portfolio URL
                </label>
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
                <label className="block text-sm font-medium">
                  Profile Image
                </label>
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
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
