import { useState, useEffect, Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from "../../assets/images/Comptron Logo.png";
import male from "../../assets/images/male.jpg";
import female from "../../assets/images/female.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { userAuth } from "../../USER/FirebaseUser";
import background from "../../assets/images/tech/BGHigh.mp4";
import { NavLink } from "react-router-dom"; // Make sure to add a default avatar image
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user] = useAuthState(userAuth);
  const texts = useMemo(() => ["COMPTRON, NWU", "Creativity Assembled"], []);
  const navigate = useNavigate();
  const auth = getAuth();
  const [customUser, setCustomUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          // Check if user is pending
          const pendingRes = await fetch(
            `https://comptron-server-2.onrender.com/api/users/pending/check/${user.email}`
          );
          const pendingData = await pendingRes.json();
          setIsPending(pendingData.isPending);

          // Get user data if exists
          const res = await fetch(
            `https://comptron-server-2.onrender.com/api/users/getByEmail/${user.email}`
          );
          const data = await res.json();
          if (res.ok) {
            setCustomUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // useEffect(() => {

  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);
  // Removed unused functions as we're handling actions directly in the menu items

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Use a smaller threshold for mobile devices
      const threshold = window.innerWidth < 640 ? 30 : 50;
      setScrolled(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial state based on scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved typing animation effect with infinite cycling
  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && typedText === currentFullText) {
      // Wait a bit when text is fully typed before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedText === "") {
      // When done deleting, move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      // Speed is faster when deleting
      const typingSpeed = isDeleting ? 75 : 150;

      timeout = setTimeout(() => {
        setTypedText((currentFullText) => {
          if (isDeleting) {
            return currentFullText.substring(0, currentFullText.length - 1);
          } else {
            return (
              currentFullText + texts[currentTextIndex].charAt(typedText.length)
            );
          }
        });
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentTextIndex, texts]);

  return (
    <section className="relative h-screen w-full bg-cover bg-center overflow-hidden">
      {" "}
      {/* Video Background */}{" "}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter blur-[5px] scale-105"
          src={background}
        ></video>
      </div>
      {/* Slight dark overlay to improve text visibility */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      {/* Dark overlay for better content visibility */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div> */}
      {/* Navbar with scroll transparency effect - only sticky on desktop */}
      <div
        className={`hidden sm:flex fixed top-0 left-0 w-full justify-between items-center px-6 py-4 z-30 transition-all duration-300 bg-transparent`}
      >
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Comptron Logo"
            className={`h-12 w-[50px] cursor-pointer bg-white p-1 rounded-lg ${
              scrolled ? "shadow-md" : "shadow-lg"
            } group-hover:scale-105 transition-transform duration-300`}
          />
          <span
            className={`font-bold text-xl text-black opacity-0 -translate-x-4 transition-all duration-300 ${
              scrolled ? "opacity-100 translate-x-0" : "hidden"
            }`}
          >
            Comptron
          </span>
        </a>
        <div className="flex items-center gap-4">
          {user ? (
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative mt-2 w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all duration-300 group">
                  <img
                    src={
                      customUser?.image ||
                      user?.photoURL ||
                      (customUser?.gender?.toLowerCase() === "female"
                        ? female
                        : male)
                    }
                    alt="User profile"
                    className="h-10 w-10 cursor-pointer aspect-square rounded-full object-cover border-2 border-[#15A6E1]"
                    onError={(e) => {
                      e.target.src =
                        customUser?.gender?.toLowerCase() === "female"
                          ? female
                          : male;
                    }}
                  />
                </MenuButton>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute  right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href={`/profile/${customUser?.customId || ""}`}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href={`/settings/${customUser?.customId || ""}`}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => signOut(userAuth)}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          ) : (
            <div className="flex items-center gap-3">
              {/* Desktop view buttons */}
              {user && isPending ? (
                <div className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold shadow-md">
                  Pending Approval
                </div>
              ) : !user ? (
                <>
                  <NavLink
                    to="/Register"
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300"
                  >
                    Join Now
                  </NavLink>
                  <NavLink
                    to="/UserLogin"
                    className="px-5 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full font-semibold shadow-md hover:scale-105 hover:from-indigo-400 hover:to-blue-500 transition-all duration-300"
                  >
                    Login
                  </NavLink>
                </>
              ) : null}
            </div>
          )}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white z-30 shadow-lg hover:bg-blue-100 transition-colors duration-300"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-black"></span>
              <span className="block w-5 h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      </div>
      {/* Mobile navbar - non-sticky */}
      <div className="sm:hidden absolute top-0 left-0 w-full flex justify-between items-center px-4 py-3 z-30">
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Comptron Logo"
            className="h-10 w-[45px] bg-white p-1 rounded-lg shadow-lg"
          />
        </a>
        <div className="flex items-center gap-3">
          {" "}
          <div className="flex gap-2">
            {user && isPending ? (
              <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-md">
                Pending
              </div>
            ) : !user ? (
              <>
                <NavLink
                  to="/Register"
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md hover:from-pink-500 hover:to-blue-500 transition-all duration-300"
                >
                  Join Now
                </NavLink>
                <NavLink
                  to="/UserLogin"
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full text-sm font-semibold shadow-md hover:from-indigo-400 hover:to-blue-500 transition-all duration-300"
                >
                  Login
                </NavLink>
              </>
            ) : null}
          </div>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white z-30 shadow-lg"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <div className="space-y-1">
              <span className="block w-4 h-0.5 bg-black"></span>
              <span className="block w-4 h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      </div>
      {/* Improved sidebar with backdrop blur and animation */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900/90 backdrop-blur-md text-white p-8 z-40 shadow-xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center mb-8">
          <img
            src={logo}
            alt="Comptron Logo"
            className="w-[50px] bg-white p-1 rounded-lg mr-3"
          />
          <span className="font-bold text-xl tracking-wide">Comptron</span>
        </div>
        <hr className="mb-6 border-gray-700" />
        <button
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="text-xl font-medium">×</span>
        </button>
        <nav aria-label="Main Navigation">
          <ul className="mt-12 space-y-6 text-lg">
            <li>
              <a
                href="/About"
                className="group flex items-center hover:text-blue-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About
              </a>
            </li>
            <li>
              <a
                href="/Events"
                className="group flex items-center hover:text-blue-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Events
              </a>
            </li>
            <li>
              <a
                href="/Committee"
                className="group flex items-center hover:text-blue-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Committee
              </a>
            </li>
            <li>
              <a
                href="/GMembers"
                className="group flex items-center hover:text-blue-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Members
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-sm text-gray-400">Connect with us</div>
          <div className="flex gap-4 mt-3">
            <a
              href="https://www.facebook.com/comptron.nwu"
              target="_blank"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@ComptronClubNWU"
              target="_blank"
              aria-label="YouTube"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* Overlay that closes menu when clicked outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-white/5 z-30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      {/* Hero Content with reveal animations */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white text-center h-full px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-6 sm:space-y-8">          <p className="text-base sm:text-xl opacity-0 animate-[fadeIn_0.8s_forwards_0.3s] max-w-md sm:max-w-2xl mx-auto leading-relaxed">
            Comptron Club of NWU is an organization run by teachers and students
            of the Faculty of CSE.
          </p>
          <div className="h-[72px] sm:h-[144px] flex items-center justify-center">
            <h1 className="text-3xl sm:text-6xl font-extrabold opacity-0 animate-[fadeIn_0.8s_forwards_0.6s]">
              <span className="bg-gradient-to-r from-[#15A7E2] to-[#15A7E2] bg-clip-text text-transparent animate-gradient-move drop-shadow-xl inline-block min-w-[300px] sm:min-w-[600px]">
                {typedText}
              </span>
            </h1>
          </div>
          <div className="opacity-0 animate-[fadeIn_0.8s_forwards_0.9s] pt-2 sm:pt-4">
            <a
              href="/Events"
              className="mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 inline-flex items-center gap-2"
            >
              Explore Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>

          {/* Floating features section - hidden on mobile for minimalism */}
        </div>
      </div>
      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white opacity-70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
