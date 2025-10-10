import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import SimpleGoogleFormSubmit from "../../../Components/SimpleGoogleFormSubmit";

Modal.setAppElement("#root");

const Gaming = () => {
   const [activeIndex, setActiveIndex] = useState(0);
   const carouselRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [formConfig, setFormConfig] = useState(null);
   const [loading, setLoading] = useState(true);

   // Load Google Form config on mount
   useEffect(() => {
      const loadGoogleFormConfig = async () => {
         setLoading(true);
         try {
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/csefest/gaming/google-form-config"
            );

            console.log("API Response status:", response.status);
            if (response.ok) {
               const config = await response.json();
               console.log("Loaded gaming config:", config);
               setFormConfig(config);
            } else {
               console.log("API returned non-OK status:", response.status);
               setFormConfig(null);
            }
         } catch (error) {
            console.error("Error loading config:", error);
            setFormConfig(null);
         } finally {
            setLoading(false);
         }
      };

      loadGoogleFormConfig();
   }, []);

   // Gaming segments data with online images
   const segments = [
      {
         id: 1,
         name: "PUBG",
         title: "PLAYERUNKNOWN'S BATTLEGROUNDS",
         description:
            "Battle Royale. Survival. Domination. Enter the arena and fight to be the last one standing in intense 100-player matches.",
         image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
         color: "from-red-600 to-orange-500",
      },
      {
         id: 2,
         name: "EFootball",
         title: "E-FOOTBALL PRO EVOLUTION SOCCER",
         description:
            "Experience the beautiful game like never before. Master the pitch, control the ball, and lead your team to victory in realistic football matches.",
         image: "https://images.unsplash.com/photo-1559060049-604cb2e13ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
         color: "from-green-600 to-emerald-500",
      },
      {
         id: 3,
         name: "FreeFire",
         title: "FREE FIRE",
         description:
            "Fast-paced action in a compact battle royale. Drop in, gear up, and survive in this high-octane mobile gaming experience.",
         image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
         color: "from-blue-600 to-cyan-500",
      },
      {
         id: 4,
         name: "Valorant",
         title: "VALORANT",
         description:
            "Tactical 5v5 shooter with unique agent abilities. Combine precise gunplay with strategic abilities to win intense competitive matches.",
         image: "https://images.unsplash.com/photo-1615079083037-673782673b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
         color: "from-purple-600 to-pink-500",
      },
   ];

   const goToSlide = (index) => {
      setActiveIndex(index);
   };

   const handleOpenModal = () => {
      console.log("Button clicked! Form config:", formConfig);
      if (formConfig?.formUrl && formConfig?.fields?.length > 0) {
         setIsModalOpen(true);
      } else {
         console.warn("Cannot open modal - form not configured properly");
         alert(
            "Registration form is not configured yet. Please contact the administrator to set up the registration form."
         );
      }
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div className="min-h-screen bg-[#1c1535] text-white overflow-x-hidden">
         {/* Enhanced Header */}
         <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1c1535]/95 via-black/90 to-[#1c1535]/95 backdrop-blur-xl border-b border-[#F6A623]/30 shadow-2xl shadow-[#F6A623]/10">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6A623]/5 to-transparent opacity-50"></div>
            <div className="absolute inset-0">
               <div className="absolute top-0 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#F6A623]/50 to-transparent animate-pulse"></div>
               <div className="absolute bottom-0 right-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-pulse delay-1000"></div>
            </div>

            <div className="relative mx-auto px-6 py-5">
               <div className="flex items-center justify-between">
                  {/* Enhanced Logo Section */}
                  <div className="flex items-center space-x-4 group">
                     <div className="relative">
                        {/* Logo Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-14 h-14 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                           <svg
                              className="w-7 h-7 text-[#1c1535] font-bold"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                           </svg>
                           {/* Rotating Ring */}
                           <div className="absolute inset-0 border-2 border-[#F6A623]/20 rounded-2xl animate-spin-slow"></div>
                        </div>
                     </div>
                     <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-white via-[#F6A623] to-orange-400 bg-clip-text text-transparent tracking-wide">
                           GAMING ARENA
                        </h1>
                        <div className="flex items-center space-x-2 mt-1">
                           <div className="w-2 h-2 bg-[#F6A623] rounded-full animate-pulse"></div>
                           <p className="text-sm text-[#F6A623]/80 font-semibold tracking-wider">
                              ESPORTS TOURNAMENT 2025
                           </p>
                           <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-500"></div>
                        </div>
                     </div>
                  </div>

                  {/* Enhanced Navigation */}
                  <nav className="hidden lg:flex items-center space-x-1 bg-[#1c1535]/40 backdrop-blur-sm rounded-full px-6 py-3 border border-[#F6A623]/20">
                     {[
                        {
                           name: "Home",
                           url: "/CseFest",
                           icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                        },
                        {
                           name: "Tournaments",
                           url: "/CseFest/tournaments",
                           icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                        },
                        {
                           name: "Rankings",
                           url: "/CseFest/rankings",
                           icon: "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
                        },
                        {
                           name: "Live",
                           url: "/CseFest/live-events",
                           icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
                        },
                        {
                           name: "About",
                           url: "/CseFest/about",
                           icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                        },
                     ].map((item) => (
                        <a
                           key={item.name}
                           href={item.url}
                           className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 rounded-full hover:bg-[#F6A623]/10">
                           <div className="flex items-center space-x-2">
                              <svg
                                 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={item.icon}
                                 />
                              </svg>
                              <span className="text-sm">{item.name}</span>
                           </div>
                           {/* Enhanced Hover Effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-orange-500 group-hover:w-full transition-all duration-300"></div>
                        </a>
                     ))}
                  </nav>

                  {/* Enhanced Action Buttons */}
                  <div className="flex items-center space-x-4">
                     {/* Live Indicator */}
                     <div className="hidden md:flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-2 border border-red-500/30">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-400 text-sm font-semibold">LIVE</span>
                     </div>

                     {/* Register Button */}
                     <button
                        onClick={handleOpenModal}
                        className="hidden md:block bg-gradient-to-r from-[#F6A623] to-orange-500 hover:from-[#e0951f] hover:to-[#d67a0d] text-[#1c1535] font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/30 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center space-x-2">
                           <svg
                              className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                           </svg>
                           <span>Register</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                     </button>

                     {/* Download Rules Button */}
                     <button className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 hover:border-[#F6A623]/50 transition-all duration-300">
                        <svg
                           className="w-4 h-4"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                           />
                        </svg>
                        <span>Rules</span>
                     </button>

                     {/* Enhanced Mobile Menu Button */}
                     <button className="lg:hidden relative w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-full flex items-center justify-center transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg
                           className="w-5 h-5 text-[#F6A623] group-hover:text-white transition-colors duration-300"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                           />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F6A623] to-transparent"></div>
         </header>

         {/* Enhanced Segment Navigation */}
         <div className="fixed top-35 left-0 right-0 z-40 bg-gradient-to-r from-[#1c1535]/95 via-black/90 to-[#1c1535]/95 backdrop-blur-xl border-b border-[#F6A623]/20 shadow-lg">
            <div className="mx-auto px-6 py-5">
               <div className="flex justify-center space-x-3">
                  {segments.map((segment, index) => (
                     <button
                        key={segment.id}
                        onClick={() => goToSlide(index)}
                        className={`group relative px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${
                           activeIndex === index
                              ? "bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535] shadow-2xl shadow-[#F6A623]/30 scale-105"
                              : "text-gray-300 hover:text-white hover:bg-[#1c1535]/50 border border-[#F6A623]/20 hover:border-[#F6A623]/40"
                        }`}>
                        {/* Background Glow for Active State */}
                        {activeIndex === index && (
                           <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623] to-orange-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
                        )}

                        <div className="relative z-10 flex items-center space-x-2">
                           {/* Game Icon */}
                           <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                 activeIndex === index
                                    ? "bg-[#1c1535]/20"
                                    : "bg-[#F6A623]/20 group-hover:bg-[#F6A623]/30"
                              }`}>
                              {segment.name === "PUBG" && (
                                 <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 2L13.09 8.26L22 9L16.27 14.74L17.18 21.02L12 17.77L6.82 21.02L7.73 14.74L2 9L10.91 8.26L12 2Z" />
                                 </svg>
                              )}
                              {segment.name === "EFootball" && (
                                 <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="12,6 14,10 18,10 15,13 16,18 12,15 8,18 9,13 6,10 10,10" />
                                 </svg>
                              )}
                              {segment.name === "FreeFire" && (
                                 <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                    <polyline points="2,17 12,22 22,17" />
                                    <polyline points="2,12 12,17 22,12" />
                                 </svg>
                              )}
                              {segment.name === "Valorant" && (
                                 <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" />
                                    <line x1="12" y1="2" x2="12" y2="22" />
                                    <line x1="4" y1="6" x2="20" y2="18" />
                                 </svg>
                              )}
                           </div>
                           <span className="font-bold tracking-wide">{segment.name}</span>
                        </div>

                        {/* Enhanced Active Indicator */}
                        {activeIndex === index && (
                           <>
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                              <div className="absolute top-0 left-0 w-full h-full border-2 border-white/20 rounded-2xl animate-pulse"></div>
                           </>
                        )}

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                     </button>
                  ))}
               </div>

               {/* Game Stats Quick View */}
               {/* <div className="mt-4 flex justify-center">
                  <div className="bg-[#1c1535]/60 backdrop-blur-sm rounded-full px-6 py-2 border border-[#F6A623]/20">
                     <div className="flex items-center space-x-6 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span>Live: 15,234 players</span>
                        </div>
                        <div className="w-px h-4 bg-[#F6A623]/30"></div>
                        <div className="flex items-center space-x-1">
                           <div className="w-2 h-2 bg-[#F6A623] rounded-full"></div>
                           <span>Prize Pool: BDT 2M+</span>
                        </div>
                        <div className="w-px h-4 bg-[#F6A623]/30"></div>
                        <div className="flex items-center space-x-1">
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                           <span>Tournaments: 20+ Active</span>
                        </div>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>

         {/* Main Content */}
         <main className="pt-48 pb-20">
            {" "}
            {/* Increased pt to account for enhanced fixed navigation */}
            {/* Hero Section with 3D Carousel */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
               {/* Background Elements */}
               <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-20 h-20 border border-[#F6A623]/20 rounded-full animate-spin-slow opacity-20"></div>
                  <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse opacity-30"></div>
                  <div className="absolute top-1/3 right-20 w-12 h-12 border-2 border-[#ff8c00]/30 rotate-12 animate-bounce-slow opacity-20"></div>
               </div>

               {/* 3D Carousel */}
               <div
                  ref={carouselRef}
                  className="relative translate-y-[-4rem] w-full max-w-6xl mx-auto"
                  style={{ height: "600px" }}>
                  {/* Carousel Track */}
                  <div className="relative w-full h-full">
                     {segments.map((segment, index) => {
                        // Calculate position based on index and active index
                        const offset = index - activeIndex;
                        const translateX = offset * 600;
                        const scale = offset === 0 ? 1 : 0.8;
                        const opacity = offset === 0 ? 1 : 0.5;
                        const zIndex = offset === 0 ? 10 : 5;

                        return (
                           <div
                              key={segment.id}
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out cursor-pointer"
                              style={{
                                 transform: `translateX(${translateX}px) scale(${scale})`,
                                 opacity: opacity,
                                 zIndex: zIndex,
                                 width: "500px",
                              }}>
                              {/* Game Card */}
                              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-[#F6A623]/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#F6A623]/20 transition-all duration-500">
                                 {/* Game Image */}
                                 <div className="relative h-64 overflow-hidden">
                                    <img
                                       src={segment.image}
                                       alt={segment.name}
                                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div
                                       className={`absolute inset-0 bg-gradient-to-t ${segment.color} opacity-20`}></div>
                                    <div className="absolute top-4 right-4">
                                       <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                          {segment.name}
                                       </span>
                                    </div>
                                 </div>

                                 {/* Game Content */}
                                 <div className="p-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                       {segment.title}
                                    </h2>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                       {segment.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex justify-between mb-8 text-sm">
                                       <div className="text-center">
                                          <div className="text-[#F6A623] font-bold text-lg">
                                             10K+
                                          </div>
                                          <div className="text-gray-400">Players</div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-[#F6A623] font-bold text-lg">
                                             Prize Pool
                                          </div>
                                          <div className="text-gray-400">BDT 500K</div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-[#F6A623] font-bold text-lg">
                                             Aug 20-29
                                          </div>
                                          <div className="text-gray-400">Duration</div>
                                       </div>
                                    </div>

                                    {/* Registration Button */}
                                    <button
                                       className="w-full bg-gradient-to-r from-[#F6A623] to-orange-500 hover:from-[#e0951f] hover:to-[#d67a0d] text-[#1c1535] font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/30 flex items-center justify-center group"
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenModal();
                                       }}>
                                       <span className="relative z-10 flex items-center gap-2">
                                          <svg
                                             className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                                             fill="currentColor"
                                             viewBox="0 0 24 24">
                                             <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                          </svg>
                                          Register Now
                                       </span>
                                       <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </section>
            {/* Featured Tournaments Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900/50 to-transparent">
               <div className="mx-auto px-6">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl font-bold text-[#F6A623] mb-4">
                        Featured Tournaments
                     </h2>
                     <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Join the most exciting competitions of the year with massive prize
                        pools
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {segments.map((segment) => (
                        <div
                           key={segment.id}
                           className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#F6A623]/20 transition-all duration-500 transform hover:-translate-y-2">
                           <div className="relative h-48 overflow-hidden">
                              <img
                                 src={segment.image}
                                 alt={segment.name}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div
                                 className={`absolute inset-0 bg-gradient-to-t ${segment.color} opacity-30`}></div>
                              <div className="absolute top-4 left-4">
                                 <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {segment.name}
                                 </span>
                              </div>
                           </div>
                           <div className="p-6">
                              <h3 className="text-xl font-bold text-white mb-2">
                                 {segment.title}
                              </h3>
                              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                 {segment.description}
                              </p>
                              <div className="flex justify-between items-center">
                                 <div className="text-sm">
                                    <span className="text-[#F6A623] font-bold">
                                       Prize Pool:
                                    </span>
                                    <span className="text-white ml-1">BDT 500K</span>
                                 </div>
                                 <button className="text-[#F6A623] hover:text-white text-sm font-medium transition-colors duration-300 flex items-center">
                                    Learn More
                                    <svg
                                       className="w-4 h-4 ml-1"
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
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
            {/* Stats Section */}
            <section className="py-20">
               <div className="mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {[
                        { number: "15K+", label: "Total Players" },
                        { number: "500K+", label: "Prize Pool" },
                        { number: "20+", label: "Games" },
                        { number: "100+", label: "Sponsors" },
                     ].map((stat, index) => (
                        <div key={index} className="text-center">
                           <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#F6A623] bg-clip-text text-transparent mb-2">
                              {stat.number}
                           </div>
                           <div className="text-gray-300 text-lg">{stat.label}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         </main>

         {/* Footer */}
         <footer className="bg-[#1c1535] text-white border-t-4 border-[#F6A623]">
            <div className="mx-auto px-6 py-12">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Logo and Description */}
                  <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                           <svg
                              className="w-6 h-6 text-[#1c1535] font-bold"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                           </svg>
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-[#F6A623]">
                              GAMING ARENA
                           </div>
                           <div className="text-sm text-[#F6A623]/70">
                              Esports Tournament 2025
                           </div>
                        </div>
                     </div>
                     <p className="text-gray-300 leading-relaxed">
                        The ultimate gaming experience. Join the most exciting
                        tournaments, compete with the best, and win amazing prizes.
                     </p>
                     <div className="flex space-x-4">
                        {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                           <a
                              key={social}
                              href="#"
                              className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                              <svg
                                 className="w-5 h-5 text-[#F6A623]"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                 {social === "facebook" && (
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                 )}
                                 {social === "twitter" && (
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                 )}
                                 {social === "instagram" && (
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                 )}
                                 {social === "youtube" && (
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                 )}
                              </svg>
                           </a>
                        ))}
                     </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Quick Links
                     </h3>
                     <ul className="space-y-3">
                        {["Home", "Tournaments", "Rankings", "Results", "Contact"].map(
                           (link) => (
                              <li key={link}>
                                 <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                    {link}
                                 </a>
                              </li>
                           )
                        )}
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
                           <span className="text-gray-300">gamingarena@gmail.com</span>
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

                  {/* Newsletter */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Newsletter
                     </h3>
                     <p className="text-gray-300 text-sm">
                        Subscribe to get the latest tournament updates and news.
                     </p>
                     <div className="flex">
                        <input
                           type="email"
                           placeholder="Your email"
                           className="flex-1 px-4 py-2 bg-[#1c1535]/80 border border-[#F6A623]/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50"
                        />
                        <button className="bg-[#F6A623] hover:bg-[#e0951f] text-[#1c1535] font-medium px-4 py-2 rounded-r-lg transition-colors duration-300">
                           Subscribe
                        </button>
                     </div>
                  </div>
               </div>

               {/* Bottom Section */}
               <div className="mt-12 pt-8 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">
                     © 2025 Gaming Arena. All rights reserved.
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
                  </div>
               </div>
            </div>
         </footer>

         {/* Registration Modal */}
         <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className="max-w-2xl mx-auto mt-20 bg-[#1c1535] rounded-xl shadow-2xl p-8 border border-[#F6A623]/30"
            overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10"
            style={{
               content: {
                  background:
                     "radial-gradient(ellipse at top, rgba(30, 58, 138, 0.95) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)",
               },
            }}>
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-[#F6A623]">
                  Gaming Tournament Registration
               </h2>
               <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg
                     className="w-6 h-6"
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
            </div>

            {formConfig?.formUrl && formConfig?.fields?.length > 0 ? (
               <SimpleGoogleFormSubmit
                  formUrl={formConfig.formUrl}
                  fields={formConfig.fields}
                  onClose={handleCloseModal}
               />
            ) : (
               <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                     Registration form is not configured yet.
                  </p>
                  <p className="text-sm text-gray-500">
                     Please contact the administrator to set up the registration form.
                  </p>
               </div>
            )}
         </Modal>
      </div>
   );
};

export default Gaming;
