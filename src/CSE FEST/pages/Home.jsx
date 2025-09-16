import { useState, useEffect } from "react";
import Fest from "../components/Fest";
import Navbar from "../components/FestNav";
import Footer from "../components/Footer";
import Sponsor from "../components/Sponsor";

const Home = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [isSliding, setIsSliding] = useState(false);

   useEffect(() => {
      // Simulate loading time (you can adjust this or replace with actual loading logic)
      const timer = setTimeout(() => {
         setIsSliding(true);
         // Remove loading screen after slide animation completes
         setTimeout(() => {
            setIsLoading(false);
         }, 1000); // Match this with the CSS transition duration
      }, 3000); // Loading duration (3 seconds for better effect)

      return () => clearTimeout(timer);
   }, []);

   return (
      <div className="bg-[#1c1535]">
         {/* Loading Screen */}
         {isLoading && (
            <div
               className={`fixed inset-0 z-50 bg-gradient-to-br from-[#1c1535] via-[#2a1f4a] to-[#1a0f2e] flex items-center justify-center transition-transform duration-1000 ease-in-out ${
                  isSliding ? "-translate-y-full" : "translate-y-0"
               }`}
               style={{
                  clipPath: isSliding
                     ? "ellipse(150% 100% at 50% 100%)"
                     : "ellipse(150% 100% at 50% 0%)",
               }}>
               {/* Animated Background Elements */}
               <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-[#F6A623]/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                  <div
                     className="absolute -bottom-8 -right-4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-[#F6A623]/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                     style={{ animationDelay: "1s" }}></div>
                  <div
                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
                     style={{ animationDelay: "2s" }}></div>
               </div>

               <div className="relative z-10 text-center">
                  {/* Logo or Brand */}
                  <div className="mb-8">
                     <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-[#F6A623] via-yellow-400 to-orange-500 bg-clip-text mb-4 animate-pulse">
                           CSE FEST
                        </h1>
                        {/* Glow effect */}
                        <div className="absolute inset-0 text-5xl md:text-7xl font-black text-[#F6A623] opacity-20 blur-sm animate-pulse">
                           CSE FEST
                        </div>
                     </div>
                     <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                        <span className="text-[#F6A623]">NWU</span> CSE FEST{" "}
                        <span className="text-purple-400">2025</span>
                     </p>
                  </div>

                  {/* Modern Loading Animation */}
                  <div className="flex items-center justify-center space-x-3 mb-8">
                     <div className="w-4 h-4 bg-gradient-to-r from-[#F6A623] to-yellow-400 rounded-full animate-bounce shadow-lg shadow-[#F6A623]/50"></div>
                     <div
                        className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50"
                        style={{ animationDelay: "0.1s" }}></div>
                     <div
                        className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-bounce shadow-lg shadow-blue-500/50"
                        style={{ animationDelay: "0.2s" }}></div>
                  </div>

                  {/* Loading Text with Typing Effect */}
                  <div className="mb-8">
                     <p className="text-gray-300 text-sm md:text-base font-medium tracking-wider">
                        <span className="inline-block animate-pulse">Preparing</span>
                        <span
                           className="inline-block animate-pulse mx-2"
                           style={{ animationDelay: "0.3s" }}>
                           amazing
                        </span>
                        <span
                           className="inline-block animate-pulse"
                           style={{ animationDelay: "0.6s" }}>
                           experiences
                        </span>
                        <span
                           className="inline-block animate-pulse ml-1 text-[#F6A623]"
                           style={{ animationDelay: "0.9s" }}>
                           ...
                        </span>
                     </p>
                  </div>

                  {/* Modern Progress Bar */}
                  <div className="w-80 h-3 bg-white/10 backdrop-blur-sm rounded-full mx-auto overflow-hidden border border-white/20">
                     <div className="h-full bg-gradient-to-r from-[#F6A623] via-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg shadow-[#F6A623]/30 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping"></div>
                     </div>
                  </div>

                  {/* Version/Event Info */}
                  <div className="mt-8 text-xs text-gray-400 font-mono tracking-widest">
                     <span className="text-[#F6A623]">v2.0</span> • August 20-28, 2025
                  </div>
               </div>

               {/* Enhanced Decorative Elements */}
               <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#F6A623]/30 rounded-full animate-spin opacity-40"></div>
               <div className="absolute top-20 right-16 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-60"></div>
               <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-[#F6A623]/20 to-purple-500/20 rounded-full animate-pulse opacity-50"></div>
               <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-400/40 rotate-45 animate-bounce opacity-30"></div>
               <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-50"></div>

               {/* Particle Effect */}
               <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                     <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                        style={{
                           top: `${Math.random() * 100}%`,
                           left: `${Math.random() * 100}%`,
                           animationDelay: `${Math.random() * 2}s`,
                           animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                     />
                  ))}
               </div>
            </div>
         )}

         {/* Main Content */}
         <div
            className={`${
               isLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}>
            <Navbar></Navbar>
            <Fest></Fest>
            <Sponsor></Sponsor>
            <Footer></Footer>
         </div>
      </div>
   );
};

export default Home;
