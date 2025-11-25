import { useState, useEffect } from "react";
import Fest from "../components/Fest";
import Navbar from "../components/FestNav";
import Footer from "../components/Footer";
import Sponsor from "../components/Sponsor";
import logo from "../assets/images/2ef33f78-05f4-451c-aa98-ccc84e9c4979.jpeg";

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
               className={`fixed inset-0 z-50 bg-[#1c1535] flex items-center justify-center transition-all duration-1000 ease-in-out ${
                  isSliding ? "translate-y-[-100vh]" : "translate-y-0"
               }`}>
               {/* Subtle Background Elements - Hidden on mobile */}
               <div className="absolute inset-0 overflow-hidden hidden md:block">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F6A623]/5 rounded-full filter blur-3xl animate-pulse"></div>
                  <div
                     className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F6A623]/5 rounded-full filter blur-3xl animate-pulse"
                     style={{ animationDelay: "1.5s" }}></div>
               </div>

               <div className="relative z-10 text-center">
                  {/* CSE FEST Logo */}
                  <div className="mb-8">
                     <div className="relative inline-block">
                        <img
                           src={logo}
                           alt="CSE FEST Logo"
                           className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-2xl shadow-[#F6A623]/20 animate-pulse"
                        />
                     </div>
                  </div>

                  {/* Logo Title */}
                  <div className="mb-12">
                     <h1 className="text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-[#F6A623] to-[#ff8c00] bg-clip-text mb-2">
                        CSE FEST
                     </h1>
                     <p className="text-white/70 text-lg md:text-xl font-light tracking-widest">
                        NWU CSE FEST 2025
                     </p>
                  </div>

                  {/* Modern Loading Animation - Single Color */}
                  <div className="flex items-center justify-center space-x-2 mb-8">
                     <div className="w-3 h-3 bg-[#F6A623] rounded-full animate-bounce"></div>
                     <div
                        className="w-3 h-3 bg-[#F6A623] rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}></div>
                     <div
                        className="w-3 h-3 bg-[#F6A623] rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}></div>
                  </div>

                  {/* Loading Text */}
                  <div className="mb-10">
                     <p className="text-gray-400 text-sm md:text-base font-light tracking-wider">
                        Loading experience
                     </p>
                  </div>

                  {/* Minimal Progress Bar */}
                  <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                     <div className="h-full w-full bg-[#F6A623] rounded-full animate-pulse"></div>
                  </div>

                  {/* Version Info */}
                  <div className="mt-12 text-xs text-gray-500 font-mono tracking-widest">
                     v2.0 • November 10-11, 2025
                  </div>
               </div>

               {/* Minimal Decorative Elements - Hidden on mobile */}
               <div
                  className="hidden md:block absolute top-10 left-10 w-16 h-16 border border-[#F6A623]/10 rounded-full animate-spin opacity-40"
                  style={{ animationDuration: "8s" }}></div>
               <div
                  className="hidden md:block absolute bottom-10 right-10 w-12 h-12 border border-[#F6A623]/10 rounded-full animate-spin opacity-40"
                  style={{ animationDuration: "10s" }}></div>
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
