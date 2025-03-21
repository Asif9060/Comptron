import Menu from "../Components/Layout/Menu";
import EventCountdown from "../Components/UI/EventCountdown";
import EventShowcase from "../Components/UI/EventShowcase";
// import Events from "../Components/UI/Events";
import SideMenu from "./../Components/Features/SideMenu";

const EventPage = () => {
  return (
    <div>
      {/* <Menu></Menu> */}
      {/* <Events></Events> */}

      <EventCountdown></EventCountdown>
      <div className="absolute fixed -translate-y-6">
        <SideMenu></SideMenu>
      </div>
      <EventShowcase></EventShowcase>
    </div>
  );
};

export default EventPage;
