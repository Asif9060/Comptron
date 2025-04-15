import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://comptron-server-2.onrender.com/api/users/profile/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load profile. Please check the user ID.");
      });
  }, [id]);

  if (!user && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111] text-white text-2xl">
        <div className="loader-container">
                  <div className="rotating-circle"></div>
                  <img src={logo} alt="Comptron Logo" className="logo1" />
                </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] flex">
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
      <div className="flex-1 p-8 md:ml-64">
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 animate-fade-in">
            {successMsg}
          </div>
        )}

        {user && (
          <div className="bg-[#1c1c1e] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto text-center text-white">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-28 h-28 aspect-square rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                onError={(e) => (e.target.src = "/fallback-image.png")}
              />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto bg-gray-700 flex items-center justify-center mb-4">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-blue-400 mb-2">{user.customId}</p>
            <p
              className={`text-sm mb-4 ${
                user.isValid ? "text-green-400" : "text-red-400"
              }`}
            >
              Membership:{" "}
              {user.isValid
                ? `Valid until ${new Date(
                    user.validityDate
                  ).toLocaleDateString()}`
                : "Expired"}
            </p>

            <div className="flex gap-2 justify-center mb-6">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                Badge
              </span>
              {/* <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                Top Skill
              </span> */}
            </div>

            <div className="grid grid-cols-3 text-sm text-gray-400 gap-4 mb-6">
              <div>
                <p className="text-white text-lg font-bold"></p>
                <p>Events</p>
              </div>
              <div>
                <p className="text-white text-lg font-bold"></p>
                <p>Skills</p>
              </div>
              <div>
                <p className="text-white text-lg font-bold"></p>
                <p>Since</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold underline mb-1">Skills</h2>
              <p className="text-gray-300">
                {user.skills || "No skills added"}
              </p>
            </div>

            {/* New Contact Info Section */}
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold underline mb-1">
                Contact Info
              </h2>
              <p className="text-gray-300">
                <span className="font-medium">Email: </span>
                {user.email || "Not provided"}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Phone: </span>
                {user.phone || "Not provided"}
              </p>
            </div>

            <div className="text-center mt-6">
              <h2 className="text-lg font-semibold underline mb-2">
                External Links
              </h2>
              {user.linkedIn && (
                <p>
                  <a
                    href={user.linkedIn}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
              {user.github && (
                <p>
                  <a
                    href={user.github}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              )}
              {user.portfolio && (
                <p>
                  <a
                    href={user.portfolio}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Portfolio
                  </a>
                </p>
              )}
              {user.cv && (
                <p>
                  <a
                    href={user.cv}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    CV / Resume
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
