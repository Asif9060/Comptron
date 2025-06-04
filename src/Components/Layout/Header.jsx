import logo from "../../assets/images/Comptron Logo.png";
import { useState, useEffect } from "react";
import "./CSS/Header.css";
import ColourfulText from "./ColourfulText";
import "./CSS/ColorfulText.css";
const Header = () => {
   const [time, setTime] = useState(new Date());

   useEffect(() => {
      const interval = setInterval(() => {
         setTime(new Date());
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
   }, []);   const formatDateTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12 || 12;

      // Pad single-digit minutes and seconds with leading zeros
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      // Format date
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      const timeString = `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
      const dateString = `${dayName}, ${monthName} ${day}, ${year}`;
      
      return { timeString, dateString };
   };
   return (
      <div className="w-full px-4 lg:px-6 xl:px-8">
         <div className="flex flex-wrap items-center justify-center md:justify-around lg:justify-between gap-4">
            <a href="/">
               <img
                  className="w-16 sm:w-20 md:w-24 lg:w-20 xl:w-24 logo transform md:translate-x-[-50px] md:translate-y-[10px] lg:transform-none lg:translate-x-0 lg:translate-y-0"
                  src={logo}
                  alt="Logo"
               />
            </a>

            <p className="text-xl colorful-text z-20 text-white font-bold sm:text-2xl md:text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl lg:translate-x-[100px] 2xl:translate-x-[330px] text-center md:text-left">
               <ColourfulText text="Comptron" />{" "}
               <span className="text-[#483D68]">- Creativity Assembled</span> <br />
            </p>            <div className="flex flex-col items-end lg:ml-auto">
               <div
                  className="text-[#00ACF2] font-bold text-xl clock sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                  style={{
                     fontFamily: "Arial, sans-serif",
                     textAlign: "right",
                  }}>
                  {formatDateTime(time).timeString}
               </div>
               <div
                  className="text-[#483D68] font-semibold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg"
                  style={{
                     fontFamily: "Arial, sans-serif",
                     textAlign: "right",
                  }}>
                  {formatDateTime(time).dateString}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
