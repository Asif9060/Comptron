import { useState, useEffect } from "react";
import logo from "../assets/images/2ef33f78-05f4-451c-aa98-ccc84e9c4979.jpeg";
import "./css/FestNav.css";
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
      <div className="min-h-screen bg-[#1c1535] text-white">
         {/* Navigation Bar */}
         <nav
            className={`fixed top-0 left-0 w-full z-50 px-8 py-4 transition-all duration-500 ${
               isScrolled
                  ? "shadow-lg shadow-[#F6A623]/10 bg-[#1c1535]/95"
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
                        href="/FestEvents"
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

         {/* Hero Section */}
         <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 overflow-hidden">
            {/* Enhanced Background with multiple layers */}
            <div className="absolute inset-0">
               {/* Animated gradient background */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1c1535] via-[#2a1f4f] to-[#1c1535] animate-pulse"></div>

               {/* Floating particles */}
               {[...Array(30)].map((_, i) => (
                  <div
                     key={i}
                     className={`absolute rounded-full animate-float ${
                        i % 3 === 0
                           ? "w-2 h-2 bg-[#F6A623]/60"
                           : i % 3 === 1
                           ? "w-1 h-1 bg-[#ff8c00]/40"
                           : "w-1.5 h-1.5 bg-white/30"
                     }`}
                     style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${4 + Math.random() * 4}s`,
                     }}></div>
               ))}

               {/* Geometric shapes */}
               <div className="absolute top-20 left-10 w-20 h-20 border border-[#F6A623]/20 rotate-45 animate-spin-slow"></div>
               <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse"></div>
               <div className="absolute top-1/3 right-20 w-12 h-12 border-2 border-[#ff8c00]/30 rotate-12 animate-bounce-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Left Content */}
               <div className="space-y-8 animate-fade-in-up">
                  <div>
                     <div className="mb-4 flex justify-center">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#F6A623]/20 to-[#ff8c00]/20 border border-[#F6A623]/30 rounded-full text-[#F6A623] text-sm font-medium backdrop-blur-sm">
                           🎉 Welcome to CSE FEST 2025
                        </span>
                     </div>
                     <h1 className="text-4xl md:text-6xl tle expe font-bold leading-tight mb-6 text-white">
                        Experience the
                        <br />
                        <span className="bg-gradient-to-r from-[#F6A623] via-[#ff8c00] to-[#F6A623] bg-clip-text text-transparent animate-gradient bg-300% relative">
                           Thrilling NWU CSE FEST
                           {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#F6A623]/20 to-[#ff8c00]/20 blur-xl -z-10 animate-pulse"></div> */}
                        </span>
                     </h1>
                     <p className="text-[#F6A623]/80 text-lg text-center md:text-xl mb-8 animate-fade-in">
                        Join us for a week of innovation, competition, and fun! 🚀
                     </p>
                  </div>

                  <div className="flex justify-center sm:flex-row gap-4 animate-fade-in-up">
                     <button className="group relative bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           <svg
                              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M13 12L16 10V14M6 10V14C6 14.55 6.45 15 7 15H17C17.55 15 18 14.55 18 14V10C18 9.45 17.55 9 17 9H7C6.45 9 6 9.45 6 10Z" />
                           </svg>
                           Learn More
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                     </button>
                     <button className="group relative border-2 border-[#F6A623] hover:border-[#e0951f] text-[#F6A623] hover:text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-[#F6A623] overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           <svg
                              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                           </svg>
                           Register Now
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                     </button>
                  </div>
               </div>

               {/* Right Content - Enhanced Stats Cards */}
               <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
                  <div className="group relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/30 rounded-2xl p-6 text-center hover:border-[#F6A623]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6A623]/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative z-10">
                        <div className="text-xs uppercase tracking-wider text-[#F6A623]/70 mb-2 font-semibold">
                           💰 Prizepool
                        </div>
                        <div className="text-4xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                           60K+
                        </div>
                        <div className="text-sm text-[#F6A623]/60 font-medium">BDT</div>
                     </div>
                  </div>

                  <div className="group relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/30 rounded-2xl p-6 text-center hover:border-[#F6A623]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6A623]/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative z-10">
                        <div className="text-xs uppercase tracking-wider text-[#F6A623]/70 mb-2 font-semibold">
                           📅 Timeline
                        </div>
                        <div className="text-4xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                           21 - 29
                        </div>
                        <div className="text-sm text-[#F6A623]/60 font-medium">
                           August
                        </div>
                     </div>
                  </div>

                  <div className="group relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/30 rounded-2xl p-6 text-center hover:border-[#F6A623]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6A623]/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative z-10">
                        <div className="text-xs uppercase tracking-wider text-[#F6A623]/70 mb-2 font-semibold">
                           🎯 Exciting
                        </div>
                        <div className="text-4xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                           08
                        </div>
                        <div className="text-sm text-[#F6A623]/60 font-medium">
                           Segments
                        </div>
                     </div>
                  </div>

                  <div className="group relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/30 rounded-2xl p-6 text-center hover:border-[#F6A623]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6A623]/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative z-10">
                        <div className="text-xs uppercase tracking-wider text-[#F6A623]/70 mb-2 font-semibold">
                           👥 Participants
                        </div>
                        <div className="text-4xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                           500+
                        </div>
                        <div className="text-sm text-[#F6A623]/60 font-medium">
                           Individuals
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
