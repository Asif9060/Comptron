import { useState, useEffect } from "react";
import logo from "../../assets/images/Comptron Logo.png";
import "./CSS/Loading.css";
import MemberCards from "../../pages/MemberCards";
const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        {isLoading && (
          <div className="loader-container">
            <div className="rotating-circle"></div>
            <img src={logo} alt="Comptron Logo" className="logo1" />
          </div>
        )}
        {/* You can add your main content here, which will show after loading */}
        {!isLoading && <MemberCards></MemberCards>}
      </div>
    </div>
  );
};

export default Loader;
