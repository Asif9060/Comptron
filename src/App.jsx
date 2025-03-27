import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import ContactUs from "./pages/ContactUs";
import AdminLogin from "./AdminPanel/AdminLogin";
import AdminPage from "./AdminPanel/AdminPage";
// import LoadingAnimation from "./Components/UI/LoadingAnimation";
import Dorja from "./AdminPanel/Dorja";
import AdminProtectedRoute from "./AdminPanel/AdminProtectedRoute";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Members" element={<MembersPage></MembersPage>}></Route>
          <Route path="/About" element={<AboutPage></AboutPage>}></Route>
          <Route path="/Events" element={<EventPage></EventPage>}></Route>
          <Route path="/Contact" element={<ContactUs></ContactUs>}></Route>
          <Route path="/Dorja" element={<Dorja></Dorja>}></Route>

          <Route
            path="/AdminPage"
            element={
              <AdminProtectedRoute>
                <AdminPage></AdminPage>
              </AdminProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<Navigate to="/Dorja" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
