import LoadingScreen from "../LoadingScreen";
import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";

const ProjectShowcaseEventPage = () => (
   <LoadingScreen>
      <EventRegistrationTemplate event={EVENT_DETAILS.project} />
   </LoadingScreen>
);

export default ProjectShowcaseEventPage;
