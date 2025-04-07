import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/EventShowcase.css"; // External CSS file for styling
import UpcomingEvents from "./UpcomingEvents";

const EventShowcase = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://comptron-server-1.onrender.com/api/eventDetails")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="event-page">
      {/* Event Listings */}
      <div className="text-center text-[30px] text-white mt-5">
        Latest & Ongoing Events
      </div>
      <section className="event-listings">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <img
              src={event.mainImage}
              alt={event.title}
              className="event-image"
            />
            <div className="event-details">
              <h3 className="event-title01">{event.title}</h3>
              <p className="event-date">
                <i className="fa fa-calendar"></i>{" "}
                {event.date || "Date not available"}
              </p>
              <p className="event-time">
                <i className="fa fa-clock"></i>{" "}
                {event.time || "Time not available"}
              </p>
              <p className="event-location">
                <i className="fa fa-map-marker"></i>{" "}
                {event.location || "Location not available"}
              </p>
              {/* <p className="event-description">{event.description}</p> */}
              <div className="mt-5 flex">
                <Link to={`/event/${event._id}`} className="register-btn">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* <UpcomingEvents /> */}
      </section>

      {/* Pagination */}
      <section className="pagination">
        <button>Previous</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Next</button>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Comptron. All rights reserved.</p>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </footer>
    </div>
  );
};

export default EventShowcase;

// import "./CSS/EventShowcase.css";// External CSS file for styling
// import eventimg from '../../assets/images/Events.jpg';
// import UpcomingEvents from './UpcomingEvents';
// const EventShowcase = () => {
//   const events = [
//     {
//       id: 1,
//       title: 'Title',
//       date: 'Date',
//       time: 'Time',
//       location: 'Location',
//       description: '',
//       image: eventimg,
//     },
//     {
//       id: 2,
//       title: 'Title',
//       date: 'Date',
//       time: 'Time',
//       location: 'LOcation',
//       description: '',
//       image: eventimg,
//     },
//     {
//       id: 3,
//       title: 'Title',
//       date: 'Date',
//       time: 'Time',
//       location: 'Location',
//       description: '',
//       image: eventimg,
//     },
//   ];

//   return (
//     <div className="event-page">
//       {/* Filter & Sort Section */}
//       <section className="filter-sort">
//         <select>
//           <option>Date</option>
//           <option>Today</option>
//           <option>Tomorrow</option>
//           <option>This Week</option>
//         </select>
//         <select>
//           <option>Category</option>
//           <option>Music</option>
//           <option>Sports</option>
//           <option>Workshops</option>
//         </select>
//         <select>
//           <option>Location</option>
//           <option>New York</option>
//           <option>Los Angeles</option>
//           <option>Online</option>
//         </select>
//         <select>
//           <option>Sort By</option>
//           <option>Popularity</option>
//           <option>Date</option>
//           <option>Price</option>
//         </select>
//       </section>

//       {/* Event Listings */}
//       <div className="text-center text-[30px] text-white mt-5">Latest & Ongoing Events</div>
//       <section className="event-listings">
//         {events.map((event) => (
//           <div key={event.id} className="event-card">
//             <img src={event.image} alt={`${event.title} Thumbnail`} className="event-image" />
//             <div className="event-details">
//               <h3 className="event-title">{event.title}</h3>
//               <p className="event-date"><i className="fa fa-calendar"></i> {event.date}</p>
//               <p className="event-time"><i className="fa fa-clock"></i> {event.time}</p>
//               <p className="event-location"><i className="fa fa-map-marker"></i> {event.location}</p>
//               <p className="event-description">{event.description}</p>
//               <button className="register-btn">Details</button>
//             </div>
//           </div>
//         ))}

//           <UpcomingEvents></UpcomingEvents>

//       </section>
//       {/* Pagination */}
//       <section className="pagination">
//         <button>Previous</button>
//         <button>1</button>
//         <button>2</button>
//         <button>3</button>
//         <button>Next</button>
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2025 Comptron. All rights reserved.</p>
//         <a href="#">Privacy Policy</a>
//         <a href="#">Terms of Service</a>
//         <a href="#">Contact Us</a>
//       </footer>
//     </div>
//   );
// };

// export default EventShowcase;
