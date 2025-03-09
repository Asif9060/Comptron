import { useState, useEffect } from "react";
import Another from "./Another";
import App from "../../App";
import './CSS/LoadingAnimation.css';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Another></Another>
      ) : (
        <div>
            <App></App>
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
