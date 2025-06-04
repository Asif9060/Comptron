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
            console.log("Fetched events:", data);
            setEvents(data);
            categorizeEvents(data);
         } catch (err) {
            console.error("Error fetching events:", err);
         } finally {
            setShowcaseLoaded(true);
         }
      };

      fetchEvents();
   }, [setShowcaseLoaded]);

   useEffect(() => {
      const interval = setInterval(() => {
         categorizeEvents(events);
      }, 20 * 1000);
      return () => clearInterval(interval);
   }, [events]);

   const categorizeEvents = (data) => {
      const now = moment().tz("Asia/Dhaka");
      const upcoming = [];
      const ongoing = [];
      const past = [];

      data.forEach((event) => {
         const start = moment.tz(event.startDateTime, "Asia/Dhaka");
         const end = moment.tz(event.endDateTime, "Asia/Dhaka");

         if (start.isAfter(now)) {
            upcoming.push(event);
         } else if (start.isSameOrBefore(now) && end.isAfter(now)) {
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
      const formattedStartDate = moment
         .tz(event.startDateTime, "Asia/Dhaka")
         .format("MMMM D, YYYY");
      const formattedStartTime = moment
         .tz(event.startDateTime, "Asia/Dhaka")
         .format("hh:mm A");

      const formattedEndDate = moment
         .tz(event.endDateTime, "Asia/Dhaka")
         .format("MMMM D, YYYY");
      const formattedEndTime = moment
         .tz(event.endDateTime, "Asia/Dhaka")
         .format("hh:mm A");

      return (
         <div key={event._id} className="event-card">
            <img src={event.mainImage} alt={event.title} className="event-image" />
            <div className="event-details">
               <h3 className="event-title01">{event.title}</h3>
               <p>
                  <span className="font-semibold">Date:</span> {formattedStartDate}
               </p>
               <p>
                  <span className="font-semibold">Time:</span> {formattedStartTime}
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
         {/* <EventSlider /> */}
         {ongoingEvents.length > 0 && (
            <>
               <div className="text-center text-[30px] mt-5">Ongoing Events</div>
               <section className="event-listings">
                  {ongoingEvents.map(renderEventCard)}
               </section>
            </>
         )}{" "}
         {upcomingEvents.length > 0 && (
            <>
               <div className="text-center text-[30px] mt-10">Upcoming Events</div>
               <section className="event-listings">
                  {upcomingEvents.map(renderEventCard)}
               </section>
            </>
         )}
         {pastEvents.length > 0 && (
            <div className="text-center mt-10">
               <Link
                  to="/past-events"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  View Past Events ({pastEvents.length})
               </Link>
            </div>
         )}
         {events.length === 0 && (
            <div className="text-center mt-10 text-lg">No events found.</div>
         )}
      </div>
   );
};

export default EventShowcase;
