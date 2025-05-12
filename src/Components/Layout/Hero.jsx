import { useState, useEffect } from "react";
import logo from "../../assets/images/Comptron Logo.png";
import "./CSS/sparkle.css";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "COMPTRON, NWU";
  
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
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  return (
    <section className="relative h-screen w-full bg-cover bg-center overflow-hidden">
      {/* Multiple animated gradient blobs for more dynamic effect */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] z-0"></div>
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gradient-to-bl from-indigo-500 via-blue-300 to-teal-400 opacity-20 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite_1s] z-0"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-tr from-pink-400 via-purple-500 to-blue-400 opacity-25 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s] z-0"></div>
      
      {/* Overlay with slightly less opacity */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60 z-0"></div>
      
      {/* Improved sparkle animation with fewer sparkles for better performance */}
      <div className="absolute inset-0 sparkle z-0">
        {Array.from({ length: 70 }).map((_, i) => (
          <div key={i} className="sparkle-dot"></div>
        ))}
      </div>

      {/* Navbar with scroll transparency effect - only sticky on desktop */}
      <div className={`hidden sm:flex fixed top-0 left-0 w-full justify-between items-center px-6 py-4 z-30 transition-all duration-300 bg-transparent`}>
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Comptron Logo"
            className={`h-12 w-[50px] bg-white p-1 rounded-lg ${scrolled ? 'shadow-md' : 'shadow-lg'} group-hover:scale-105 transition-transform duration-300`}
          />
          <span className={`font-bold text-xl text-black opacity-0 -translate-x-4 transition-all duration-300 ${scrolled ? 'opacity-100 translate-x-0' : 'hidden'}`}>Comptron</span>
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/UserLogin"
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            aria-label="Join Now"
          >
            Join Now
          </a>
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
          <a
            href="/UserLogin"
            className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md"
            aria-label="Join Now"
          >
            Join Now
          </a>
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
              <a href="/About" className="group flex items-center hover:text-blue-400 transition-colors">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About
              </a>
            </li>
            <li>
              <a href="/Events" className="group flex items-center hover:text-blue-400 transition-colors">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Events
              </a>
            </li>
            <li>
              <a href="/Committee" className="group flex items-center hover:text-blue-400 transition-colors">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Committee
              </a>
            </li>
            <li>
              <a href="/GMembers" className="group flex items-center hover:text-blue-400 transition-colors">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Members
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-sm text-gray-400">Connect with us</div>
          <div className="flex gap-4 mt-3">
            <a href="https://www.facebook.com/comptron.nwu" target="_blank" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@ComptronClubNWU" target="_blank" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
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
        <div className="space-y-6 sm:space-y-8">
          <p className="text-base sm:text-xl opacity-0 animate-[fadeIn_0.8s_forwards_0.3s] max-w-md sm:max-w-2xl mx-auto leading-relaxed">
            Comptron Club of NWU is an organization run by teachers and students
            of the Faculty of CSE.
          </p>
          <h1 className="text-3xl sm:text-6xl font-extrabold opacity-0 animate-[fadeIn_0.8s_forwards_0.6s]">
            <span className="bg-gradient-to-r from-[#15A7E2] to-[#3D3455] bg-clip-text text-transparent animate-gradient-move drop-shadow-xl">
              {typedText}
              <span className="animate-blink">|</span>
            </span>
          </h1>
          <div className="opacity-0 animate-[fadeIn_0.8s_forwards_0.9s] pt-2 sm:pt-4">
            <a
              href="/Events"
              className="mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 inline-flex items-center gap-2"
            >
              Explore Events
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
          
          {/* Floating features section - hidden on mobile for minimalism */}

        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white opacity-70">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
