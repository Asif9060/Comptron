import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FloatingMenu = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [position, setPosition] = useState({ x: 16, y: '50%' }); // Starting position (left-4 = 16px)
   const [isDragging, setIsDragging] = useState(false);
   const dragRef = useRef(null);
   const initialMousePosition = useRef({ x: 0, y: 0 });

   // Calculate if menu should open to the right based on position
   const shouldOpenRight = position.x < window.innerWidth / 2;

   const handleMouseDown = (e) => {
      setIsDragging(true);
      initialMousePosition.current = {
         x: e.clientX - position.x,
         y: e.clientY - (position.y === '50%' ? window.innerHeight / 2 : position.y)
      };
   };

   const handleMouseMove = (e) => {
      if (isDragging) {
         const newX = e.clientX - initialMousePosition.current.x;
         const newY = e.clientY - initialMousePosition.current.y;
         
         // Keep menu within viewport bounds
         const maxX = window.innerWidth - 40; // menu width
         const maxY = window.innerHeight - 40; // menu height
         
         setPosition({
            x: Math.min(Math.max(0, newX), maxX),
            y: Math.min(Math.max(0, newY), maxY)
         });
      }
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   useEffect(() => {
      if (isDragging) {
         document.addEventListener('mousemove', handleMouseMove);
         document.addEventListener('mouseup', handleMouseUp);
      }
      return () => {
         document.removeEventListener('mousemove', handleMouseMove);
         document.removeEventListener('mouseup', handleMouseUp);
      };
   }, [isDragging]);

   // Existing click outside handler
   useEffect(() => {
      const handleClickOutside = (event) => {
         const menuContainer = document.getElementById("floating-menu");
         if (isMenuOpen && menuContainer && !menuContainer.contains(event.target)) {
            setIsMenuOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isMenuOpen]);

   return (
      <div
         ref={dragRef}
         className={`fixed z-50 md:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
         id="floating-menu"
         style={{
            left: `${position.x}px`,
            top: typeof position.y === 'number' ? `${position.y}px` : position.y,
            transform: typeof position.y === 'number' ? 'none' : 'translateY(-50%)'
         }}
         onMouseDown={handleMouseDown}>
         <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 bg-[#15A6E1] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1089BD] transition-all duration-300 transform hover:scale-105">
            <div className="w-6 h-5 flex flex-col justify-between items-center relative">
               <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
               }`}></span>
               <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
               }`}></span>
               <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
               }`}></span>
            </div>
         </button>

         {isMenuOpen && (
            <div 
               className={`absolute top-0 mt-12 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl p-3 min-w-[160px] transform transition-all duration-300 scale-100`}
               style={{
                  left: shouldOpenRight ? '0' : 'auto',
                  right: shouldOpenRight ? 'auto' : '0'
               }}>
               <div className="flex flex-col gap-2">
                  <Link
                     to="/"
                     className="flex items-center gap-2 text-white hover:text-[#15A6E1] transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50 text-sm">
                     <i className="fas fa-home text-xs"></i>
                     <span>Home</span>
                  </Link>
                  <Link
                     to="/Events"
                     className="flex items-center gap-2 text-white hover:text-[#15A6E1] transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50 text-sm">
                     <i className="fas fa-calendar-alt text-xs"></i>
                     <span>Events</span>
                  </Link>
                  <Link
                     to="/About"
                     className="flex items-center gap-2 text-white hover:text-[#15A6E1] transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50 text-sm">
                     <i className="fas fa-info-circle text-xs"></i>
                     <span>About</span>
                  </Link>
                  <Link
                     to="/GMembers"
                     className="flex items-center gap-2 text-white hover:text-[#15A6E1] transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50 text-sm">
                     <i className="fas fa-users text-xs"></i>
                     <span>Members</span>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
};

export default FloatingMenu;
