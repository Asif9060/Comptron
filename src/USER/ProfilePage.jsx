import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import male from "../assets/images/male.jpg";
import female from "../assets/images/female.jpg";
import SideMenu from "../Components/Features/SideMenu";
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
    <div className=" text-white font-[Poppins] h-screen flex items-center justify-center px-5 py-10">
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
      <div className="w-full flex bg-black  max-w-5xl rounded-3xl shadow-[gray_0px_0px_15px_2px] p-10">
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
          <div className="bg-[#000000] w-[70rem] layer shadow-lg rounded-3xl p-10">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-60 aspect-square rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                onError={(e) => (e.target.src = "/fallback-image.png")}
              />
            ) : (
              <img
                src={user.gender?.toLowerCase() === "female" ? female : male}
                alt="Default Avatar"
                className="w-28 h-28 aspect-square rounded-full mx-auto mb-4 object-cover border-4 border-gray-500"
              />
            )}

            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            {/* {user.gender && (
              <div className="text-center translate-y-[-2rem]">
                <p className="text-gray-300">{user.gender}</p>
              </div>
            )} */}
            <p className="text-blue-400 text-center mb-2">{user.bio}</p>
            <p className="text-blue-400 text-center mb-2">{user.customId}</p>
            <p
              className={`text-sm text-center mb-4 ${
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

            {/* <div className="grid grid-cols-3 text-sm text-gray-400 gap-4 mb-6">
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
            </div> */}
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex-1  min-w-[280px] bg-[#2a2a2a] rounded-2xl p-6">
                <h2 className="text-xl text-center text-cyan-400 font-semibold mb-4">
                  Skills
                </h2>
                {user.skills && typeof user.skills === "string" ? (
                  <ul className=" text-white list-disc ml-5 space-y-1">
                    {user.skills.split(",").map((skill, index) => (
                      <li key={index}>{skill.trim()}</li>
                    ))}
                  </ul>
                ) : Array.isArray(user.skills) && user.skills.length > 0 ? (
                  <ul className=" text-white space-y-1">
                    {user.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No skills added</p>
                )}
              </div>

              <div className="flex-1 min-w-[280px] items-center bg-[#2a2a2a] rounded-2xl p-6">
                <h2 className="text-xl text-center text-cyan-400 font-semibold mb-4">
                  External Links
                </h2>
                <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-200">
                  {user.linkedIn && (
                    <p>
                      <a
                        href={user.linkedIn}
                        target="_blank"
                        className="hover:text-cyan-400 transition-all space-y-1"
                      >
                        <svg
                          className="w-10 h-10 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#15A6E1"
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                          />
                        </svg>
                        <br />
                        LinkedIn
                      </a>
                    </p>
                  )}
                  {user.github && (
                    <p>
                      <a
                        href={user.github}
                        target="_blank"
                        className="hover:text-cyan-400 transition-all space-y-1"
                      >
                        <svg
                          className="w-10 h-10 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path
                            fill="white"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                          />
                        </svg>
                        <br />
                        GitHub
                      </a>
                    </p>
                  )}
                  {user.portfolio && (
                    <p>
                      <a
                        href={user.portfolio}
                        target="_blank"
                        className="hover:text-cyan-400 transition-all space-y-1"
                      >
                        <svg
                          className="w-10 h-10 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#15A6E1"
                            d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"
                          />
                        </svg>
                        <br />
                        Portfolio
                      </a>
                    </p>
                  )}
                  {user.cv && (
                    <p>
                      <a
                        href={user.cv}
                        target="_blank"
                        className="hover:text-cyan-400 transition-all space-y-1"
                      >
                        <svg
                          className="w-10 h-10 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="#15A6E1"
                            d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                          />
                        </svg>
                        <br />
                        CV / Resume
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* New Contact Info Section */}
            <div className="bg-[#2a2a2a] rounded-2xl text-center py-6">
              <h2 className="text-xl text-cyan-400 font-semibold mb-4">
                Contact Info
              </h2>
              <p className="text-gray-300">
                <span className="font-medium">
                  <svg
                    className="w-5 h-5 -translate-x-1 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#15A6E1"
                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                    />
                  </svg>
                </span>
                {user.email || "Not provided"}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">
                  {" "}
                  <svg
                    className="w-5 h-5 -translate-x-1 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#15A6E1"
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>{" "}
                </span>
                {user.phone || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
