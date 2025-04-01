import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://comptron-server.onrender.com/api/eventDetails")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div>
        {events.map((event) => (
          <div key={event._id}>
            <img src={event.mainImage} alt="Event" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link to={`/EventDetails/${event._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
