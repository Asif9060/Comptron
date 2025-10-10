import LoadingScreen from "../LoadingScreen";
import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";

const ProgrammingEventPage = () => (
   <LoadingScreen>
      <EventRegistrationTemplate event={EVENT_DETAILS.programming} />
   </LoadingScreen>
);

export default ProgrammingEventPage;
