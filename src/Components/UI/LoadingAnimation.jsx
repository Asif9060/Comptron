import { useState, useEffect } from "react";// Optional: For styling the animation
import App from "../../App";
import Another from "./Another";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate a 3-second loading time

    return () => clearTimeout(timer); // Cleanup the timer
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