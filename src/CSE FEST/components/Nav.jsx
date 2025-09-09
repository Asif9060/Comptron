import { useState, useEffect } from "react";
import logo from "../assets/images/2ef33f78-05f4-451c-aa98-ccc84e9c4979.jpeg";

export default function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
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
               ? "shadow-2xl shadow-[#F6A623]/10 bg-[#1c1535]"
               : "shadow-none bg-[#1c1535]"
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
                     <img
                        src={logo}
                        alt="CSE FEST Logo"
                        className="w-12 h-12 object-cover rounded-md"
                     />
                  </div>
               </div>
               <div className="ml-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#F6A623] bg-clip-text text-transparent">
                     CSE FEST
                  </span>
                  <div className="text-sm text-[#F6A623]/70 font-medium">2025</div>
               </div>
            </div>

            {/* Desktop Navigation */}
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
               <li>
                  <a
                     href="/CseFest"
                     className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10">Home</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestEvents"
                     className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10">Event</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestGallery"
                     className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10">Gallery</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestSponsors"
                     className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10">Sponsor</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
               <li>
                  <a
                     href="/FestContact"
                     className="group relative text-white font-medium hover:text-[#F6A623] transition-all duration-300 px-6 py-2 rounded-lg hover:bg-[#F6A623]/10"
                     onClick={() => setIsMenuOpen(false)}>
                     <span className="relative z-10">Contact</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
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
}