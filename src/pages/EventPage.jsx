import { useState, useEffect } from "react";
import { AdminProvider } from "../AdminPanel/ToggleAdmin/AdminContext";
import EventCountdown from "../Components/UI/EventCountdown";
import EventShowcase from "../Components/UI/EventShowcase";

// import EventSlider from "../Components/UI/EventSlider";


import SideMenu from "../Components/Features/SideMenu";
import logo from "../assets/images/Comptron Logo.png";
import Slider from "../Components/UI/Slider";

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
    <div className="bg-white">
      {loading && (
        <div className="flex justify-center items-center h-screen bg-white z-50 fixed w-full top-0 left-0">
          <div className="loader-container">
            <div className="rotating-circle"></div>
            <img src={logo} alt="Comptron Logo" className="logo1" />
          </div>
        </div>
      )}

      <AdminProvider>
        <EventCountdown setCountdownLoaded={setCountdownLoaded} />
      </AdminProvider>


      <div className="fixed z-1000 -translate-y-6">
        <SideMenu />
      </div>

      {/* <EventSlider /> */}

      <div className="absolute fixed -translate-y-6">
        <SideMenu />
      </div>


      <EventShowcase setShowcaseLoaded={setShowcaseLoaded} />
      {/* <Slider></Slider> */}
    </div>
  );
};

export default EventPage;
