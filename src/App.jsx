import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import NewsPage from "./pages/NewsPage";
import AdminLogin from "./AdminPanel/AdminLogin";
import AdminPage from "./AdminPanel/AdminPage";
// import LoadingAnimation from "./Components/UI/LoadingAnimation";
import Dorja from './AdminPanel/Dorja';
import CommitteePanel from "./CommitteePanel/CommitteePanel";
import CommitteeLogin from "./CommitteePanel/CommitteeLogin";

const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Members" element={<MembersPage></MembersPage>}></Route>
          <Route path="/About" element={<AboutPage></AboutPage>}></Route>
          <Route path="/Events" element={<EventPage></EventPage>}></Route>
          <Route path="/News" element={<NewsPage></NewsPage>}></Route>
          <Route path="/AdminLogin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/AdminPage" element={<AdminPage></AdminPage>}></Route>
          <Route path="/Dorja" element={<Dorja></Dorja>}></Route>
          <Route path="/Committee" element={<CommitteePanel></CommitteePanel>}></Route>
          <Route path="/CommitteeLogin" element={<CommitteeLogin></CommitteeLogin>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;