import LoadingScreen from "../LoadingScreen";
import EventRegistrationTemplate from "../EventRegistrationTemplate";
import { EVENT_DETAILS } from "../eventDetails";

const PosterPresentationEventPage = () => (
   <LoadingScreen>
      <EventRegistrationTemplate event={EVENT_DETAILS.ideathon} />
   </LoadingScreen>
);

export default PosterPresentationEventPage;
