import LoadingScreen from "../LoadingScreen";
import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";
import { useEventDates } from "../useEventDates";

const DatathonEventPage = () => {
   const { eventDetails, loading } = useEventDates(EVENT_DETAILS);

   if (loading) {
      return (
         <LoadingScreen>
            <div className="text-center text-white">Loading event details...</div>
         </LoadingScreen>
      );
   }

   return (
      <LoadingScreen>
         <EventRegistrationTemplate event={eventDetails.datathon} />
      </LoadingScreen>
   );
};

export default DatathonEventPage;
