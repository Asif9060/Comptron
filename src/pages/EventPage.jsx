


import Menu from "../Components/Layout/Menu";
import EventCountdown from "../Components/UI/EventCountdown";
import EventShowcase from "../Components/UI/EventShowcase";
// import Events from "../Components/UI/Events";


const EventPage = () => {
    
    return (
        <div >
             
            
            <Menu></Menu>
            {/* <Events></Events> */}

            <EventCountdown></EventCountdown>
            <EventShowcase></EventShowcase>
            
            

            
             
        </div>
    );
};

export default EventPage;