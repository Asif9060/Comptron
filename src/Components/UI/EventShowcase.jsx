import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/EventShowcase.css";
import moment from "moment-timezone";
import EventSlider from "./EventSlider";

const EventShowcase = ({ setShowcaseLoaded }) => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://comptron-server-2.onrender.com/api/eventDetails"
        );
        const data = await res.json();
        setEvents(data);
        categorizeEvents(data); // initial setup
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setShowcaseLoaded(true);
      }
    };

    fetchEvents();
  }, [setShowcaseLoaded]);

  // ⏱️ Auto-update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      categorizeEvents(events);
    }, 60 * 1000); // 1 minute

    return () => clearInterval(interval); // cleanup
  }, [events]);

  // 🔍 Categorize function
  const categorizeEvents = (data) => {
    const now = moment().tz("Asia/Dhaka");

    const upcoming = [];
    const ongoing = [];
    const past = [];

    data.forEach((event) => {
      const eventStart = moment.tz(
        `${event.startDateTime} ${event.startdateTime}`,
        "YYYY-MM-DD hh:mm A",
        "Asia/Dhaka"
      );
      const eventEnd = moment.tz(
        `${event.endDateTime} ${event.endDateTime}`,
        "YYYY-MM-DD hh:mm A",
        "Asia/Dhaka"
      );

      if (eventStart.isAfter(now)) {
        upcoming.push(event);
      } else if (eventStart.isSameOrBefore(now) && eventEnd.isAfter(now)) {
        ongoing.push(event);
      } else {
        past.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setOngoingEvents(ongoing);
    setPastEvents(past);
  };

  const renderEventCard = (event) => {
    return (
      <div key={event._id} className="event-card">
        <img src={event.mainImage} alt={event.title} className="event-image" />
        <div className="event-details">
          <h3 className="event-title01">{event.title}</h3>
          <p>
            <span className="font-semibold">Starts:</span>{" "}
            {moment
              .tz(event.startDateTime, "Asia/Dhaka")
              .format("MMM D, YYYY h:mm A")}
          </p>
          <div className="mt-5 flex">
            <Link to={`/event/${event._id}`} className="register-btn">
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="event-page">
      <EventSlider />
      {ongoingEvents.length > 0 && (
        <>
          <div className="text-center text-[30px] text-white mt-5">
            Ongoing Events
          </div>
          <section className="event-listings">
            {ongoingEvents.map(renderEventCard)}
          </section>
        </>
      )}

      {upcomingEvents.length > 0 && (
        <>
          <div className="text-center text-[30px] text-white mt-10">
            Upcoming Events
          </div>
          <section className="event-listings">
            {upcomingEvents.map(renderEventCard)}
          </section>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <div className="text-center text-[30px] text-white mt-10">
            Past Events
          </div>
          <section className="event-listings">
            {pastEvents.map(renderEventCard)}
          </section>
        </>
      )}

      {events.length === 0 && (
        <div className="text-center text-white mt-10 text-lg">
          No events found.
        </div>
      )}

      <footer className="mt-12">
        <p>&copy; 2025 Comptron. All rights reserved.</p>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </footer>
    </div>
  );
};

export default EventShowcase;
