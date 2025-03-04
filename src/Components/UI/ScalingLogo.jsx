import { useState, useEffect } from "react";
import logo from '../../assets/images/Untitled-1.png';
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
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: -1,
      }}
    >
      <img
        src={logo}
        alt="Logo"
        className="absolute"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.1s ease-out",
          maxWidth: "100%",
          maxHeight: "100%",
          opacity: 0.1,
        }}
      />
    </div>
  );
};

export default ScalingLogo;
