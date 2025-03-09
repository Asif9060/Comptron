import logo from "../../assets/images/Comptron Logo.png"
import { useState, useEffect } from 'react';
import './CSS/Header.css';
const Header = () => {
    const [time, setTime] = useState(new Date());
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
      }, []);
    
      const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert to 12-hour format
        hours = hours % 12 || 12;
    
        // Pad single-digit minutes and seconds with leading zeros
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
        return `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
      };
    return (
        <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center  md:justify-around gap-4">
   
                <img 
                className="w-16 sm:w-20 md:w-24 logo transform md:translate-x-[-50px] md:translate-y-[10px]" 
                src={logo}
                alt="Logo" 
                />

                
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl lg:translate-x-12 text-center  md:text-left">
                <span className="text-[#15A6E1] text">Comptron</span>
                <span className="text-[#483d68] text2"> - Creativity Assembled</span>
                </p>

    
                <div className="text-[#00ACF2] text text-xl sm:text-2xl md:text-3xl lg:text-4xl md:translate-x-0 md:translate-y-0"  style={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', textAlign: 'center' }}>
                {formatTime(time)}
                </div>
            </div>
        </div>

    );
};

export default Header;