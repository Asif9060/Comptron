// App.js
import CommiteeCard from "../Components/UI/CommitteeCard";
import { CardsProvider } from "./CardsContext";
import CommitteePanel from "./CommitteeControl";


const App = () => {
  return (
    <CardsProvider>
        <CommitteePanel></CommitteePanel>
        <CommiteeCard></CommiteeCard>
      
      
    </CardsProvider>
  );
};

export default App;