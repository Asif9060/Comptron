import { useState, useEffect } from "react";
import { AdminProvider } from "../AdminPanel/ToggleAdmin/AdminContext";
import EventCountdown from "../Components/UI/EventCountdown";
import EventShowcase from "../Components/UI/EventShowcase";

// import EventSlider from "../Components/UI/EventSlider";

import SideMenu from "../Components/Features/SideMenu";
import logo from "../assets/images/Comptron Logo.png";
import Slider from "../Components/UI/Slider";
import FloatingMenu from "../Components/UI/FloatingMenu";

const EventPage = () => {
   const [loading, setLoading] = useState(true);
   const [countdownLoaded, setCountdownLoaded] = useState(false);
   const [showcaseLoaded, setShowcaseLoaded] = useState(false);

   const [fadeOut, setFadeOut] = useState(false);

   useEffect(() => {
      if (countdownLoaded && showcaseLoaded) {
         setLoading(false);
      }
   }, [countdownLoaded, showcaseLoaded]);

   useEffect(() => {
      if (!loading) {
         setFadeOut(true); // Trigger fade out when loading is finished
         const timer = setTimeout(() => {
            setFadeOut(false); // After animation, hide completely
         }, 500); // Fade out duration (milliseconds)

         return () => clearTimeout(timer); // Clean up timeout
      }
   }, [loading]);
   return (
      <div className="flex flex-col min-h-screen bg-white">
         {loading && (
            <div className="flex justify-center items-center h-screen bg-white z-50 fixed w-full top-0 left-0">
               <div className="loader-container">
                  <div className="rotating-circle"></div>
                  <img src={logo} alt="Comptron Logo" className="logo1" />
               </div>
            </div>
         )}
         <div className="flex-grow">
            <AdminProvider>
               <EventCountdown setCountdownLoaded={setCountdownLoaded} />
            </AdminProvider>{" "}
            <div className="fixed z-50 -translate-y-6">
               <SideMenu />
            </div>
            <FloatingMenu />
            <EventShowcase setShowcaseLoaded={setShowcaseLoaded} />
         </div>
         <footer className="mt-auto bg-[#1E2939] text-white py-3 pl-4 sm:pl-8 md:pl-16">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
                  <div className="text-[#15A6E1] text-base sm:text-lg font-medium hidden sm:block">
                     Comptron
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm md:text-md text-center">
                     &copy; 2025 Comptron. All rights reserved
                  </div>
                  <div className="hidden sm:flex gap-4">
                     <a
                        href="#"
                        className="text-gray-300 hover:text-[#15A6E1] transition-colors">
                        <i className="fab fa-linkedin text-lg"></i>
                     </a>
                     <a
                        href="#"
                        className="text-gray-300 hover:text-[#15A6E1] transition-colors">
                        <i className="fab fa-facebook text-lg"></i>
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default EventPage;
