import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import male from "../assets/images/male.jpg";
import female from "../assets/images/female.jpg";
import { userAuth } from "../USER/FirebaseUser";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

const AdvisoryProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // NEW: Effect to manage sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint is typically 768px
        setSidebarOpen(true); // Always open on desktop
      } else {
        setSidebarOpen(false); // Start closed on mobile
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if current user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(userAuth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch advisory user data
  useEffect(() => {
    const fetchAdvisoryUser = async () => {
      if (!id) {
        setError("User ID is missing.");
        return;
      }
      try {
        const res = await fetch(
          `https://comptron-server-2.onrender.com/api/advisory/profile/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
        setError("");

        // Check if profile belongs to current logged-in user
        if (currentUser && currentUser.email === data.email) {
          setIsOwnProfile(true);
        } else {
          setIsOwnProfile(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load profile. Please check the user ID.");
      }
    };

    fetchAdvisoryUser();
  }, [id, currentUser]);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  // Sidebar animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "tween", duration: 0.3 } },
    closed: { x: "-100%", transition: { type: "tween", duration: 0.3 } },
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="loader-container flex items-center space-x-3">
          <div className="relative w-8 h-8">
            <div className="rotating-circle absolute inset-0 border-4 border-t-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          </div>
          <span className="text-white text-lg">Loading Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 flex relative font-sans text-gray-100">
      {/* Background Ornaments (Subtle) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 opacity-5 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-800 opacity-5 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      {/* Sidebar - NEW */}
      <motion.aside
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 w-64 bg-gray-800 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-xl border-r border-gray-700 flex flex-col"
      >
        <div className="p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-400">Comptron</h2>
            {/* Only show close button on mobile when sidebar is open */}
            {sidebarOpen && (
              <button
                className="md:hidden text-gray-400 hover:text-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          <nav className="space-y-4 flex-1">
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${isActive
                  ? "bg-blue-600/40 text-white shadow-inner" : "hover:bg-gray-700/50 text-gray-300 hover:text-blue-300"}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Home
            </NavLink>
            <NavLink
              to={`/advisory/profile/${id}`}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${isActive
                  ? "bg-blue-600/40 text-white shadow-inner" : "hover:bg-gray-700/50 text-gray-300 hover:text-blue-300"}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Profile
            </NavLink>
            {isOwnProfile && (
              <NavLink
                to={`/advisory/settings/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${isActive
                    ? "bg-blue-600/40 text-white shadow-inner" : "hover:bg-gray-700/50 text-gray-300 hover:text-blue-300"}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </NavLink>
            )}
          </nav>
        </div>
      </motion.aside>

      {/* Backdrop for mobile sidebar - NEW */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-transparent bg-opacity-60 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300 ease-in-out`}>
        {/* Mobile menu button - Only show on mobile */}
        {!sidebarOpen && ( // Only show if sidebar is not open
          <button
            className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        )}

        <motion.div
          className="relative w-full max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Panel: Identity & Contact */}
          <div className="md:w-full bg-gray-800 p-6 md:p-10 flex flex-col items-center text-center relative z-10 border-b md:border-b-0 md:border-r border-gray-700">
            <motion.div
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mb-6 relative group"
              variants={itemVariants}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={user.gender?.toLowerCase() === "female" ? female : male}
                  alt="Default Avatar"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight leading-tight"
              variants={itemVariants}
            >
              {user.name}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-blue-400 font-semibold mb-6"
              variants={itemVariants}
            >
              {user.studentId || "Advisory Member"}
            </motion.p>
            <motion.p
              className="font-mono text-gray-400 text-sm mb-4"
              variants={itemVariants}
            >
              ID: {user.customId}
            </motion.p>

            <motion.div className="mt-auto w-full" variants={itemVariants}>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 bg-gray-700/50 p-3 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-center gap-3 bg-gray-700/50 p-3 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {user.phone || "N/A"}
                  </span>
                </div>
              </div>

              {/* Settings Button */}
              {/* {isOwnProfile && (
                <motion.div
                  className="mt-8 w-full"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to={`/advisory/settings/${id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Profile Settings
                  </NavLink>
                </motion.div>
              )} */}
            </motion.div>
          </div>

          {/* Right Panel: Details */}
          <div className="md:w-full p-6 md:p-10 bg-gray-900 z-10 flex flex-col">
            {/* About Section */}
            <motion.div
              className="mb-8 p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700"
              variants={itemVariants}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                About Me
              </h2>
              <div className="text-white leading-relaxed text-sm sm:text-base">
                <div className="content-display" dangerouslySetInnerHTML={{ __html: user?.bio }} />
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              className="mb-8 p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700"
              variants={itemVariants}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9.25 15.25a.75.75 0 01.75-.75h4a.75.75 0 01.75.75L14.25 17m-4.5 0v3a1 1 0 001 1h2a1 1 0 001-1v-3m-4.5 0h4.5M12 4v4m0 0v4m0-4h4m-4 0H8m0 0v4m0-4v-4m4 4h-4"
                  ></path>
                </svg>
                Skills & Expertise
              </h2>
              {user.skills && typeof user.skills === "string" ? (
                <div className="flex flex-wrap gap-3">
                  {user.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-500/30 hover:text-white"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              ) : Array.isArray(user.skills) && user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-500/30 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills added yet.</p>
              )}
            </motion.div>

            {/* External Links Section */}
            <motion.div
              className="p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700"
              variants={itemVariants}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                Professional Links
              </h2>
              {!user.linkedIn &&
              !user.github &&
              !user.portfolio &&
              !user.cv ? (
                <p className="text-gray-500 italic">No external links added yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.linkedIn && (
                    <motion.a
                      href={user.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-blue-900/40 p-4 rounded-lg transition-colors duration-200 border border-transparent hover:border-blue-500/50"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg
                        className="w-6 h-6 text-[#0077b5]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                        />
                      </svg>
                      <span className="text-white">LinkedIn</span>
                    </motion.a>
                  )}

                  {user.github && (
                    <motion.a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-gray-700/70 p-4 rounded-lg transition-colors duration-200 border border-transparent hover:border-white/50"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                      >
                        <path
                          fill="currentColor"
                          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9-2.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                        />
                      </svg>
                      <span className="text-white">GitHub</span>
                    </motion.a>
                  )}

                  {user.portfolio && (
                    <motion.a
                      href={user.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-indigo-900/40 p-4 rounded-lg transition-colors duration-200 border border-transparent hover:border-indigo-500/50"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"
                        />
                      </svg>
                      <span className="text-white">Portfolio</span>
                    </motion.a>
                  )}

                  {user.cv && (
                    <motion.a
                      href={user.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-teal-900/40 p-4 rounded-lg transition-colors duration-200 border border-transparent hover:border-teal-500/50"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg
                        className="w-6 h-6 text-teal-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                        />
                      </svg>
                      <span className="text-white">CV / Resume</span>
                    </motion.a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Styles for animations and loading spinner */}
        <style jsx>{`
          .animate-pulse-slow {
            animation: pulse 10s infinite cubic-bezier(0.4, 0, 0.6, 1);
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.05;
            }
            50% {
              opacity: 0.15;
            }
          }

          .loader-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .rotating-circle {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdvisoryProfilePage;
