import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/2ef33f78-05f4-451c-aa98-ccc84e9c4979.jpeg";
import Footer from "../components/Footer";

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
                        Events
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
                        Sponsors
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 to-[#F6A623]/0 group-hover:from-[#F6A623]/10 group-hover:to-[#ff8c00]/10 rounded-lg transition-all duration-300"></div>
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] group-hover:w-3/4 transition-all duration-300"></div>
                  </a>
               </li>
            </ul>

            {/* CTA Button */}
            <a href="https://comptron.nwu.ac.bd/CseFest/registration" target="_blank" rel="noopener noreferrer" className="hidden md:block">
               <button className="relative group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                     <svg
                        className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                     </svg>
                     Register Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </button>
            </a>

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
                     <span className="relative z-10">Events</span>
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
                     <span className="relative z-10">Sponsors</span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </a>
               </li>
               <li className="w-4/5 mt-4">
                  <a href="https://comptron.nwu.ac.bd/CseFest/registration" target="_blank" rel="noopener noreferrer" className="block">
                     <button
                        className="w-full relative group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden"
                        onClick={() => setIsMenuOpen(false)}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           <svg
                              className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                           </svg>
                           Register Now
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                     </button>
                  </a>
               </li>
            </ul>
         </div>
      </nav>
   );
};
// Mock data for events and their gallery images
const eventsData = [
   {
      id: 1,
      name: "Programming Contest",
      date: "Nov 11, 2025",
      description:
         "Three-day intensive cybersecurity bootcamp preparing participants for the CTF competition.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=CTF+Bootcamp+Main+3",
      ],
      galleryImages: [
         "/pg1.jpg",
         "/pg2.jpg",
         "/pg3.jpg",
         "/pg4.jpg",
         "/pg5.jpg",
         "/pg6.jpg",
         "/pg7.jpg",
         "/pg8.jpg",
      ],
   },
   {
      id: 2,
      name: "Gaming Contest",
      date: "Nov 10, 2025",
      description:
         "Intensive preliminary hackathon with real-world challenges and expert mentorship.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Hackathon+Workshop+Main+3",
      ],
      galleryImages: [
         "/g1.jpg",
         "/g2.jpg",
         "/g3.jpg",
         "/g4.jpg",
         "/g5.jpg",
         "/g6.jpg",
         "/g7.jpg",
         "/g8.jpg",
      ],
   },
   {
      id: 3,
      name: "Poster Presentation",
      date: "Nov 10, 2025",
      description:
         "Inspiring talks from industry leaders and technology experts on emerging trends.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Tech+Talk+Series+Main+3",
      ],
      galleryImages: [
         "/po1.jpg",
         "/po2.jpg",
         "/po3.jpg",
         "/po4.jpg",
         "/po5.jpg",
         "/po6.jpg",
         "/po7.jpg",
         "/po8.jpg",
      ],
   },
   {
      id: 4,
      name: "Project Showcase",
      date: "Nov 10, 2025",
      description:
         "Competitive programming challenge testing algorithmic skills and problem-solving abilities.",
      mainImages: [
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+1",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+2",
         "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+3",
      ],
      galleryImages: [
         "/pr1.jpg",
         "/pr2.jpg",
         "/pr3.jpg",
         "/pr4.jpg",
         "/pr5.jpg",
         "/pr6.jpg",
         "/pr7.jpg",
         "/pr8.jpg",
      ],
   },
   // {
   //    id: 5,
   //    name: "Datathon",
   //    date: "Nov 10, 2025",
   //    description:
   //       "Competitive programming challenge testing algorithmic skills and problem-solving abilities.",
   //    mainImages: [
   //       "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+1",
   //       "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+2",
   //       "https://placehold.co/1200x600/1c1535/F6A623?text=Code+Wars+Main+3",
   //    ],
   //    galleryImages: [
   //       "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
   //    ],
   // },
];

// Main Gallery Component
const Gallery = () => {
   const events = eventsData;

   const [selectedEvent, setSelectedEvent] = useState(events[0]);
   const [selectedImage, setSelectedImage] = useState(null);

   const currentEvent = selectedEvent || events[0];

   return (
      <div className="min-h-screen bg-[#1c1535] text-white">
         <Navbar />

         {/* Fullscreen Image Modal */}
         {selectedImage && (
            <div
               className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
               onClick={() => setSelectedImage(null)}>
               <button
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-[#F6A623] rounded-full flex items-center justify-center transition-all duration-300 group"
                  onClick={() => setSelectedImage(null)}>
                  <svg
                     className="w-6 h-6 text-white group-hover:text-[#1c1535]"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </button>
               <img
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
               />
            </div>
         )}

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
                     <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-[#F6A623]/20 to-[#ff8c00]/20 border border-[#F6A623]/30 rounded-full text-[#F6A623] text-sm font-medium backdrop-blur-sm mb-6">
                        🎨 Visual Journey
                     </motion.div>
                     <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-[#F6A623] to-white bg-clip-text text-transparent">
                           Event Gallery
                        </span>
                     </motion.h1>
                     <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                        Explore the vibrant moments, unforgettable experiences, and
                        creative energy that defines NWU CSE FEST 2025
                     </motion.p>
                  </div>
                  {/* Stats Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                     {[
                        { number: "1200+", label: "Photos Captured", icon: "📸" },
                        { number: "40+", label: "Hours of Events", icon: "⏰" },
                        { number: "900+", label: "Participants", icon: "👥" },
                        { number: "5", label: "Event Categories", icon: "🎯" },
                     ].map((stat, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 50, rotate: -10 }}
                           animate={{ opacity: 1, y: 0, rotate: 0 }}
                           transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                           className="text-center group">
                           <div className="bg-gradient-to-br from-[#1c1535]/60 to-slate-800/60 backdrop-blur-lg border border-[#F6A623]/20 rounded-2xl p-6 hover:border-[#F6A623]/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/20">
                              <div className="text-3xl mb-3">{stat.icon}</div>
                              <div className="text-2xl font-bold text-[#F6A623] mb-1 group-hover:scale-110 transition-transform duration-300">
                                 {stat.number}
                              </div>
                              <div className="text-sm text-gray-300">{stat.label}</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
                  {/* Enhanced Event Selection */}
                  <div className="mb-16">
                     <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl font-bold text-center text-white mb-8">
                        Choose Your Experience
                     </motion.h2>
                     <div className="flex flex-wrap justify-center gap-4">
                        {events.map((event, index) => (
                           <motion.button
                              key={event.id}
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                           </motion.button>
                        ))}
                     </div>
                  </div>

                  {/* Redesigned Gallery Grid */}
                  <div className="mb-16">
                     <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-between mb-8">
                        <div>
                           <h2 className="text-3xl font-bold text-white mb-2">
                              {currentEvent.name} Gallery
                           </h2>
                           <p className="text-gray-400">
                              {currentEvent.date} • {currentEvent.galleryImages.length}{" "}
                              Photos
                           </p>
                        </div>
                     </motion.div>

                     {/* Modern Flex Grid with Center Alignment */}
                     <div className="flex flex-wrap justify-center gap-4">
                        {currentEvent.galleryImages.map((image, index) => (
                           <motion.div
                              key={index}
                              initial={{
                                 opacity: 0,
                                 y: 50,
                              }}
                              whileInView={{
                                 opacity: 1,
                                 y: 0,
                              }}
                              viewport={{ once: true, amount: 0.1 }}
                              transition={{
                                 duration: 0.5,
                                 delay: index * 0.03,
                              }}
                              onClick={() => setSelectedImage(image)}
                              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F6A623]/30 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]">
                              <img
                                 src={image}
                                 alt={`${currentEvent.name} ${index + 1}`}
                                 className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1535]/90 via-[#1c1535]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                 <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="w-16 h-16 bg-[#F6A623] rounded-full flex items-center justify-center mb-3 mx-auto">
                                       <svg
                                          className="w-8 h-8 text-[#1c1535]"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                          />
                                       </svg>
                                    </div>
                                    <p className="text-white font-medium text-center">
                                       View Full Size
                                    </p>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
                  {/* Call to Action */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.7 }}
                     className="text-center">
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
                           <a
                              href="https://www.facebook.com/comptron.nwu"
                              target="_blank"
                              rel="noopener noreferrer">
                              <button className="group bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                                 <span className="flex items-center gap-2">
                                    📱 Follow on Facebook
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
                           </a>
                           {/* <button className="group border-2 border-[#F6A623] hover:bg-[#F6A623] text-[#F6A623] hover:text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                              <span className="flex items-center gap-2">
                                 📧 Get Updates
                              </span>
                           </button> */}
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
};

export default Gallery;
