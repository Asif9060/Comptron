import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";

const ProgrammingEventPage = () => (
   <EventRegistrationTemplate event={EVENT_DETAILS.programming} />
);

export default ProgrammingEventPage;
