import React, { useState } from "react";

// Add CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(5deg); }
    66% { transform: translateY(5px) rotate(-3deg); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(100%  const ne  const prevImage = () => {
    setMainImageIndex((prev) => (prev - 1 + currentEvent.mainImages.length) % currentEvent.mainImages.length);
  };

  return (=> {
    setMainImageIndex((prev) => (prev + 1) % currentEvent.mainImages.length);
  };

  const prevImage = () => {
    setMainImageIndex((prev) => (prev - 1 + currentEvent.mainImages.length) % currentEvent.mainImages.length);
  };; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
   const styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   styleSheet.innerText = styles;
   document.head.appendChild(styleSheet);
}

// Navbar Component
const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   React.useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav
         className={`fixed top-0 left-0 w-full z-50 px-8 py-4 transition-all duration-500 ${
            isScrolled
               ? "shadow-2xl shadow-[#F6A623]/20 bg-[#1c1535]/95"
               : "shadow-none bg-[#1c1535]/80"
         }`}
         style={{
            backdropFilter: "blur(20px)",
            borderBottom: isScrolled ? "1px solid rgba(246, 166, 35, 0.2)" : "none",
         }}>
         <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo/Brand */}
            <div className="flex items-center group">
               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F6A623] to-[#ff8c00] p-1 shadow-lg group-hover:shadow-[#F6A623]/30 transition-all duration-300 group-hover:scale-110">
                  <div className="w-full h-full rounded-lg overflow-hidden bg-[#1c1535] flex items-center justify-center">
                     <div className="w-12 h-12 bg-[#F6A623] rounded-md flex items-center justify-center text-[#1c1535] font-bold">
                        NWU
                     </div>
                  </div>
               </div>
               <div className="ml-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#F6A623] bg-clip-text text-transparent">
                     CSE FEST
                  </span>
                  <div className="text-sm text-[#F6A623]/70 font-medium">2025</div>
               </div>
            </div>

            <ul className="hidden md:flex space-x-2">
               <li>
                  <a
                     href="/CseFest"
                     className="relative group px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-[#F6A623]/10">
                     <span className="relative z-10 group-hover:text-[#F6A623] transition-colors duration-300">
                        Home
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="FestEvents"
                     className="relative group px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-[#F6A623]/10">
                     <span className="relative z-10 group-hover:text-[#F6A623] transition-colors duration-300">
                        Event
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestGallery"
                     className="relative group px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-[#F6A623]/10">
                     <span className="relative z-10 group-hover:text-[#F6A623] transition-colors duration-300">
                        Gallery
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestSponsors"
                     className="relative group px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-[#F6A623]/10">
                     <span className="relative z-10 group-hover:text-[#F6A623] transition-colors duration-300">
                        Sponsor
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestContact"
                     className="relative group px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-[#F6A623]/10">
                     <span className="relative z-10 group-hover:text-[#F6A623] transition-colors duration-300">
                        Contact
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
            </ul>

            {/* CTA Button */}
            <button className="hidden md:block relative group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden">
               <span className="relative z-10 flex items-center gap-2">
                  <svg
                     className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                     fill="currentColor"
                     viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Promo Video
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Mobile Hamburger Menu */}
            <div
               className={`flex flex-col gap-1.5 cursor-pointer md:hidden p-2 rounded-lg hover:bg-[#F6A623]/10 transition-all duration-300 ${
                  isMenuOpen ? "active" : ""
               }`}
               onClick={toggleMenu}>
               <span
                  className={`w-7 h-0.5 bg-gradient-to-r from-white to-[#F6A623] transition-all duration-300 ${
                     isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}></span>
               <span
                  className={`w-7 h-0.5 bg-gradient-to-r from-[#F6A623] to-white transition-all duration-300 ${
                     isMenuOpen ? "opacity-0 scale-0" : ""
                  }`}></span>
               <span
                  className={`w-7 h-0.5 bg-gradient-to-r from-white to-[#F6A623] transition-all duration-300 ${
                     isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}></span>
            </div>
         </div>

         {/* Mobile Menu */}
         <div
            className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-[#1c1535]/95 to-slate-900/95 backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden border-t border-[#F6A623]/20 ${
               isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
            <ul className="flex flex-col items-center py-8 space-y-6">
               {["Home", "Events", "Gallery", "Sponsors", "Contact"].map((link) => (
                  <li key={link}>
                     <a
                        href="#"
                        className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                        onClick={() => setIsMenuOpen(false)}>
                        <span className="relative z-10">{link}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                     </a>
                  </li>
               ))}
               <li className="w-4/5 mt-4">
                  <button
                     className="w-full relative group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                           className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Promo Video
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
               </li>
            </ul>
         </div>
      </nav>
   );
};

// Footer Component
const Footer = () => {
   return (
      <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
         <div className="mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Logo and Description */}
               <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                     <img
                        src="https://placehold.co/100x40/1c1535/F6A623?text=NWU+CSE+FEST"
                        alt="NWU CSE FEST Logo"
                        className="h-10 w-auto"
                     />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                     Join us for an exciting celebration of technology, innovation, and
                     creativity. Experience the thrilling NWU CSE FEST with competitions,
                     exhibitions, and networking opportunities.
                  </p>
                  <div className="flex space-x-4">
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.297 1.26.47 1.69.62.712.256 1.36.199 1.871.124.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-13.277c-1.302-1.306-3.02-2.071-4.89-2.073h-.002c-3.741 0-6.772 3.03-6.772 6.77 0 1.87 1.178 4.202 2.074 4.89l.002.001 3.155 1.869 1.867 3.156.001.002c.687.395 2.136.808 3.811.28.57-.18 1.727-.71 2.297-1.505.569-.794.57-1.606.57-1.61v-.002c0-3.74-3.031-6.771-6.771-6.771" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                        </svg>
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Quick Links
                  </h3>
                  <ul className="space-y-3">
                     {["Home", "Events", "Sponsors", "Contact"].map((link) => (
                        <li key={link}>
                           <a
                              href="#"
                              className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                              {link}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Contact Info
                  </h3>
                  <div className="space-y-3">
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                        </svg>
                        <span className="text-gray-300">nwucsefest@gmail.com</span>
                     </div>
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <span className="text-gray-300">+880 1890-430560</span>
                     </div>
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                        </svg>
                        <span className="text-gray-300">NWU Campus, Dhaka</span>
                     </div>
                  </div>
               </div>

               {/* Event Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Event Info
                  </h3>
                  <div className="space-y-4">
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Date:</div>
                        <div className="font-medium text-white">21-29 August</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Venue:</div>
                        <div className="font-medium text-white">NWU Campus</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Duration:</div>
                        <div className="font-medium text-white">Full Day Event</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 pt-6 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-400 text-sm">
                  © 2025 NWU CSE FEST. All rights reserved.
               </p>
               <div className="flex space-x-6 mt-4 md:mt-0">
                  <a
                     href="#"
                     className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                     Privacy Policy
                  </a>
                  <a
                     href="#"
                     className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                     Terms of Service
                  </a>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <p className="text-gray-400 text-sm">Developed by AS</p>
               </div>
            </div>
         </div>
      </footer>
   );
};

// Mock data for events and their gallery images
const eventsData = [
   {
      id: 1,
      name: "Capture The Flag Bootcamp",
      date: "AUG 21-23, 2025",
      description:
         "Three-day intensive cybersecurity bootcamp preparing participants for the CTF competition.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+3",
      ],
      galleryImages: [
         "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1552429740-99a99281e5d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1587623495008-d8c2b2e361d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
   },
   {
      id: 2,
      name: "Hackathon Workshop",
      date: "AUG 27, 2025",
      description:
         "Intensive preliminary hackathon with real-world challenges and expert mentorship.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+3",
      ],
      galleryImages: [
         "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
   },
   {
      id: 3,
      name: "Tech Talk Series",
      date: "AUG 25-26, 2025",
      description:
         "Inspiring talks from industry leaders and technology experts on emerging trends.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+3",
      ],
      galleryImages: [
         "https://images.unsplash.com/photo-1573164713712-03790a178651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
   },
   {
      id: 4,
      name: "Code Wars",
      date: "AUG 28, 2025",
      description:
         "Competitive programming challenge testing algorithmic skills and problem-solving abilities.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+3",
      ],
      galleryImages: [
         "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
   },
];

// Main Gallery Component
const Gallery = () => {
   const events = eventsData; // Use the external events array

   const [selectedEvent, setSelectedEvent] = useState(events[0]);
   const [mainImageIndex, setMainImageIndex] = useState(0);

   const currentEvent = selectedEvent || events[0];

   // Auto-advance main image
   React.useEffect(() => {
      const interval = setInterval(() => {
         setMainImageIndex((prev) => (prev + 1) % currentEvent.mainImages.length);
      }, 4000);
      return () => clearInterval(interval);
   }, [currentEvent.mainImages.length]);

   const nextMainImage = () => {
      setMainImageIndex((prev) => (prev + 1) % currentEvent.mainImages.length);
   };

   const prevMainImage = () => {
      setMainImageIndex(
         (prev) =>
            (prev - 1 + currentEvent.mainImages.length) % currentEvent.mainImages.length
      );
   };

   return (
      <div className="min-h-screen bg-[#1c1535] text-white">
         <Navbar />

         {/* Main Content with proper spacing for fixed navbar */}
         <main className="pt-24 pb-24">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
               {/* Animated Background */}
               <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1535] via-[#2a1f4f] to-[#1c1535]"></div>
                  {/* Floating particles */}
                  {[...Array(20)].map((_, i) => (
                     <div
                        key={i}
                        className={`absolute rounded-full animate-float ${
                           i % 3 === 0
                              ? "w-2 h-2 bg-[#F6A623]/30"
                              : i % 3 === 1
                              ? "w-1 h-1 bg-[#F6A623]/50"
                              : "w-1.5 h-1.5 bg-white/20"
                        }`}
                        style={{
                           left: `${Math.random() * 100}%`,
                           top: `${Math.random() * 100}%`,
                           animationDelay: `${Math.random() * 5}s`,
                           animationDuration: `${3 + Math.random() * 4}s`,
                        }}></div>
                  ))}
               </div>

               <div className="relative mx-auto px-4 py-20">
                  {/* Header */}
                  <div className="text-center mb-16">
                     <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#F6A623]/20 to-[#ff8c00]/20 border border-[#F6A623]/30 rounded-full text-[#F6A623] text-sm font-medium backdrop-blur-sm mb-6">
                        🎨 Visual Journey
                     </div>
                     <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-[#F6A623] to-white bg-clip-text text-transparent">
                           Event Gallery
                        </span>
                     </h1>
                     <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                        Explore the vibrant moments, unforgettable experiences, and
                        creative energy that defines NWU CSE FEST 2025
                     </p>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                     {[
                        { number: "500+", label: "Photos Captured", icon: "📸" },
                        { number: "50+", label: "Hours of Events", icon: "⏰" },
                        { number: "1000+", label: "Participants", icon: "👥" },
                        { number: "8", label: "Event Categories", icon: "🎯" },
                     ].map((stat, index) => (
                        <div key={index} className="text-center group">
                           <div className="bg-gradient-to-br from-[#1c1535]/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/20 rounded-2xl p-6 hover:border-[#F6A623]/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/20">
                              <div className="text-3xl mb-3">{stat.icon}</div>
                              <div className="text-2xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                                 {stat.number}
                              </div>
                              <div className="text-sm text-gray-300">{stat.label}</div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Enhanced Event Selection */}
                  <div className="mb-16">
                     <h2 className="text-2xl font-bold text-center text-white mb-8">
                        Choose Your Experience
                     </h2>
                     <div className="flex flex-wrap justify-center gap-4">
                        {events.map((event, index) => (
                           <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`group relative px-8 py-4 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                                 selectedEvent?.id === event.id
                                    ? "bg-gradient-to-r from-[#F6A623] to-[#ff8c00] text-[#1c1535] shadow-2xl shadow-[#F6A623]/30 scale-105"
                                    : "bg-[#1c1535]/40 border border-[#F6A623]/20 text-gray-300 hover:text-[#F6A623] hover:border-[#F6A623]/40 hover:bg-[#F6A623]/5"
                              }`}>
                              <span className="relative z-10 flex items-center gap-2">
                                 <span className="text-xl">
                                    {index === 0
                                       ? "🛡️"
                                       : index === 1
                                       ? "💻"
                                       : index === 2
                                       ? "🎤"
                                       : "⚔️"}
                                 </span>
                                 {event.name}
                              </span>
                              {/* Shimmer effect for active button */}
                              {selectedEvent?.id === event.id && (
                                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 animate-shimmer"></div>
                              )}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Featured Event Showcase */}
                  <div className="mb-20">
                     <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-slate-900/80 backdrop-blur-xl border border-[#F6A623]/20 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Main Image Carousel */}
                        <div className="relative h-96 md:h-[600px] overflow-hidden">
                           <img
                              src={currentEvent.mainImages[mainImageIndex]}
                              alt={`${currentEvent.name} featured`}
                              className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                           />

                           {/* Enhanced Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-[#1c1535]/90 via-[#1c1535]/20 to-transparent"></div>

                           {/* Content Overlay */}
                           <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                              <div className="max-w-4xl">
                                 <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-2 bg-[#F6A623]/20 border border-[#F6A623]/40 rounded-full text-[#F6A623] text-sm font-medium backdrop-blur-sm">
                                       Featured Event
                                    </span>
                                    <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm backdrop-blur-sm">
                                       {currentEvent.date}
                                    </span>
                                 </div>
                                 <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                    {currentEvent.name}
                                 </h3>
                                 <p className="text-lg text-gray-200 mb-6 max-w-2xl leading-relaxed">
                                    {currentEvent.description}
                                 </p>
                                 <button className="group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/30">
                                    <span className="flex items-center gap-2">
                                       Explore Gallery
                                       <svg
                                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                          fill="currentColor"
                                          viewBox="0 0 20 20">
                                          <path
                                             fillRule="evenodd"
                                             d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                    </span>
                                 </button>
                              </div>
                           </div>

                           {/* Enhanced Navigation */}
                           <button
                              onClick={prevMainImage}
                              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-[#1c1535]/80 hover:bg-[#F6A623] border border-[#F6A623]/30 hover:border-[#F6A623] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110 group">
                              <svg
                                 className="w-6 h-6 text-[#F6A623] group-hover:text-[#1c1535] transition-colors duration-300"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                 />
                              </svg>
                           </button>

                           <button
                              onClick={nextMainImage}
                              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-[#1c1535]/80 hover:bg-[#F6A623] border border-[#F6A623]/30 hover:border-[#F6A623] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110 group">
                              <svg
                                 className="w-6 h-6 text-[#F6A623] group-hover:text-[#1c1535] transition-colors duration-300"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                 />
                              </svg>
                           </button>

                           {/* Enhanced Indicators */}
                           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                              {currentEvent.mainImages.map((_, index) => (
                                 <button
                                    key={index}
                                    onClick={() => setMainImageIndex(index)}
                                    className={`transition-all duration-300 ${
                                       index === mainImageIndex
                                          ? "w-8 h-3 bg-[#F6A623] rounded-full"
                                          : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
                                    }`}
                                 />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Redesigned Gallery Grid */}
                  <div className="mb-16">
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">
                           Event Highlights
                        </h2>
                        <div className="flex items-center gap-4">
                           <span className="text-[#F6A623] text-sm font-medium">
                              {currentEvent.galleryImages.length} Photos
                           </span>
                           <div className="flex gap-2">
                              <button className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623] border border-[#F6A623]/30 hover:border-[#F6A623] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                 <svg
                                    className="w-5 h-5 text-[#F6A623] group-hover:text-[#1c1535]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM17 4a1 1 0 10-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4z" />
                                 </svg>
                              </button>
                              <button className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623] border border-[#F6A623]/30 hover:border-[#F6A623] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                 <svg
                                    className="w-5 h-5 text-[#F6A623] group-hover:text-[#1c1535]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Uniform Grid */}
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentEvent.galleryImages.map((image, index) => (
                           <div
                              key={index}
                              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#F6A623]/20 h-64">
                              <img
                                 src={image}
                                 alt={`${currentEvent.name} gallery ${index + 1}`}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {/* Enhanced Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1535]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                              {/* Overlay Content */}
                              {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                 <div className="text-center">
                                    <div className="w-16 h-16 bg-[#F6A623]/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                       <svg
                                          className="w-8 h-8 text-[#1c1535]"
                                          fill="currentColor"
                                          viewBox="0 0 20 20">
                                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                          <path
                                             fillRule="evenodd"
                                             d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                    </div>
                                    <p className="text-white font-medium text-sm">
                                       {currentEvent.name}
                                    </p>
                                 </div>
                              </div> */}

                              {/* Number Badge */}
                              <div className="absolute top-4 left-4 w-8 h-8 bg-[#F6A623] text-[#1c1535] rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                 {index + 1}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center">
                     <div className="bg-gradient-to-br from-[#1c1535]/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/20 rounded-3xl p-12 hover:border-[#F6A623]/40 transition-all duration-500">
                        <h3 className="text-3xl font-bold text-white mb-4">
                           Want to See More?
                        </h3>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                           Discover more amazing moments from our events. Follow us on
                           social media for real-time updates and behind-the-scenes
                           content.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                           <button className="group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                              <span className="flex items-center gap-2">
                                 📱 Follow on Instagram
                                 <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </span>
                           </button>
                           <button className="group border-2 border-[#F6A623] hover:bg-[#F6A623] text-[#F6A623] hover:text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                              <span className="flex items-center gap-2">
                                 📧 Get Updates
                              </span>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
};

export default Gallery;
