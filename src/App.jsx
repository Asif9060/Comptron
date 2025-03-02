import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import NewsPage from "./pages/NewsPage";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;