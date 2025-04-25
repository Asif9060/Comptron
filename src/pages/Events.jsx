import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://comptron-server-1.onrender.com/api/eventDetails")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10 font-bold text-3xl text-[#15A6E1]">
      <h2>Upcoming Events</h2>
      <div className="flex flex-wrap justify-center items-center mt-10 gap-5">
        {events.map((event) => (
          <div className="bg-amber-50 w-[20rem] h-[25rem] shadow-lg rounded-lg overflow-hidden flex flex-col" key={event._id}>
            <img  className="w-full h-full object-cover aspect-[16/9]" src={event.mainImage} alt="Event" />
            <h3 className="text-lg  font-semibold">{event.title}</h3>
            <p className="text-lg  font-semibold">{event.description}</p>
            <Link className="cursor-pointer w-full mt-9 bg-[#15A6E1] text-white py-2 px-4 rounded"to={`/event/${event._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
