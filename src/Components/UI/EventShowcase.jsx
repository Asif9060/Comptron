import "./CSS/EventShowcase.css";// External CSS file for styling
import eventimg from '../../assets/images/Events.jpg';
import UpcomingEvents from './UpcomingEvents';
const EventShowcase = () => {
  const events = [
    {
      id: 1,
      title: 'Title',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      description: '',
      image: eventimg,
    },
    {
      id: 2,
      title: 'Title',
      date: 'Date',
      time: 'Time',
      location: 'LOcation',
      description: '',
      image: eventimg,
    },
    {
      id: 3,
      title: 'Title',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      description: '',
      image: eventimg,
    },
  ];

  return (
    <div className="event-page">
      {/* Filter & Sort Section */}
      <section className="filter-sort">
        <select>
          <option>Date</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Week</option>
        </select>
        <select>
          <option>Category</option>
          <option>Music</option>
          <option>Sports</option>
          <option>Workshops</option>
        </select>
        <select>
          <option>Location</option>
          <option>New York</option>
          <option>Los Angeles</option>
          <option>Online</option>
        </select>
        <select>
          <option>Sort By</option>
          <option>Popularity</option>
          <option>Date</option>
          <option>Price</option>
        </select>
      </section>

      {/* Event Listings */}
      <div className="text-center text-[30px] text-white mt-5">Latest & Ongoing Events</div>
      <section className="event-listings">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={`${event.title} Thumbnail`} className="event-image" />
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date"><i className="fa fa-calendar"></i> {event.date}</p>
              <p className="event-time"><i className="fa fa-clock"></i> {event.time}</p>
              <p className="event-location"><i className="fa fa-map-marker"></i> {event.location}</p>
              <p className="event-description">{event.description}</p>
              <button className="register-btn">Details</button>
            </div>
          </div>
        ))}
        
          <UpcomingEvents></UpcomingEvents>
        
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