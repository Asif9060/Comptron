import LoadingScreen from "../LoadingScreen";
import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";

const DatathonEventPage = () => (
   <LoadingScreen>
      <EventRegistrationTemplate event={EVENT_DETAILS.datathon} />
   </LoadingScreen>
);

export default DatathonEventPage;
