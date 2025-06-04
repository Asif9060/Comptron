import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const PastEvents = () => {
   const [pastEvents, setPastEvents] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const res = await fetch(
               "https://comptron-server-2.onrender.com/api/eventDetails"
            );
            const data = await res.json();
            const now = moment().tz("Asia/Dhaka");
            const past = data.filter((event) => {
               const end = moment.tz(event.endDateTime, "Asia/Dhaka");
               return end.isBefore(now);
            });
            setPastEvents(past);
         } catch (err) {
            console.error("Error fetching events:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchEvents();
   }, []);

   const renderEventCard = (event) => {
      const formattedStartDate = moment
         .tz(event.startDateTime, "Asia/Dhaka")
         .format("MMMM D, YYYY");
      const formattedStartTime = moment
         .tz(event.startDateTime, "Asia/Dhaka")
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

   if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
   }

   return (
      <div className="event-page">
         <div className="text-center text-[30px] mt-10 mb-8">Past Events</div>
         {pastEvents.length > 0 ? (
            <section className="event-listings">
               {pastEvents.map(renderEventCard)}
            </section>
         ) : (
            <div className="text-center mt-10 text-lg">No past events found.</div>
         )}

         <div className="text-center mt-8">
            <Link
               to="/events"
               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
               Back to Events
            </Link>
         </div>
      </div>
   );
};

export default PastEvents;
