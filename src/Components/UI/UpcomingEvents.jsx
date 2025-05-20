import eventimg from '../../assets/images/Events.jpg';
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
  ];

  return (
      <div className="event-page flex" >
        <div className="translate-x-88 text-[30px] text-white mt-5">Upcoming Events</div>
      <section className="event-listings -translate-x-31 mt-15">
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
      </section>
      
    </div>
  );
};

export default EventShowcase;