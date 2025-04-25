import { useState, useEffect } from "react";
import { AdminProvider } from "../AdminPanel/ToggleAdmin/AdminContext";
import EventCountdown from "../Components/UI/EventCountdown";
import EventShowcase from "../Components/UI/EventShowcase";
// import EventSlider from "../Components/UI/EventSlider";
import SideMenu from "../Components/Features/SideMenu";
import logo from "../assets/images/Comptron Logo.png";

const EventPage = () => {
  const [loading, setLoading] = useState(true);
  const [countdownLoaded, setCountdownLoaded] = useState(false);
  const [showcaseLoaded, setShowcaseLoaded] = useState(false);

  useEffect(() => {
    if (countdownLoaded && showcaseLoaded) {
      setLoading(false);
    }
  }, [countdownLoaded, showcaseLoaded]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-black z-50 fixed w-full top-0 left-0">
          <div className="loader-container">
            <div className="rotating-circle"></div>
            <img src={logo} alt="Comptron Logo" className="logo1" />
          </div>
        </div>
      )}

      <AdminProvider>
        <EventCountdown setCountdownLoaded={setCountdownLoaded} />
      </AdminProvider>

      <div className="fixed -translate-y-6">
        <SideMenu />
      </div>

      {/* <EventSlider /> */}
      <EventShowcase setShowcaseLoaded={setShowcaseLoaded} />
    </div>
  );
};

export default EventPage;
