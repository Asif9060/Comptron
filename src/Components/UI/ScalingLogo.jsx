import { useState, useEffect } from "react";
import logo from '../../assets/images/Untitled-1.png';
import './CSS/ScalingLogo.css';
const ScalingLogo = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = Math.max(1, 1 + scrollY / 500);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
  className="fixed  scaleres top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden"
  // style={{ zIndex: 1 }}
>
  <img
    src={logo}
    alt="Logo"
    className="absolute object-cover w-auto h-auto max-w-full max-h-full"
    style={{
      transform: `scale(${scale})`,
      transition: "transform 0.1s ease-out",
      minWidth: "300px",
      minHeight: "300px",
      opacity: 0.5, // Reduced opacity for better readability
    }}
  />
</div>

  );
};

export default ScalingLogo;
