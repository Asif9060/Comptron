import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import AdminLogin from "./AdminPanel/AdminLogin";
import AdminPage from "./AdminPanel/AdminPage";
// import LoadingAnimation from "./Components/UI/LoadingAnimation";
import Dorja from "./AdminPanel/Dorja";
import AdminProtectedRoute from "./AdminPanel/AdminProtectedRoute";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import GeneralMemberPage from "./pages/GeneralMemberPage";
import Members from "./pages/Members";
import RegistrationForm from "./USER/RegistrationForm";
import ProfilePage from "./USER/ProfilePage";
import AllMembersPage from "./USER/AllMembersPage";
import SettingsPage from "./USER/SettingsPage";
import AdminPasswordResetPage from "./USER/PasswordReset";
import UserLogin from "./USER/UserLogin";
import AddMemberForm from './Components/AddMemberForm';
import CommitteeProfile from "./CommitteePanel/CommitteeProfile";
import CommitteeSettings from "./CommitteePanel/CommitteeSettings";
import AdminEventDetailsControl from "./AdminPanel/AdminEventDetailsControl";
import Recent from "./Components/Features/Recent";
import AdminTextSlideControl from "./AdminPanel/AdminTextSlideControl";
import ImageUpload from "./AdminPanel/ImageUpload";
import AdminUsersPage from "./AdminPanel/AdminUsersPage";
import UsersByYear from "./AdminPanel/UsersByYear";
import CommitteeByYear from "./CommitteePanel/CommitteeByYear";


const App = () => {
  const [refresh, setRefresh] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Committee" element={<MembersPage></MembersPage>}></Route>
          <Route path="/About" element={<AboutPage></AboutPage>}></Route>
          <Route path="/Events" element={<EventPage></EventPage>}></Route>
          <Route path="/GMembers" element={<Members></Members>}></Route>
          <Route path="/Dorja" element={<Dorja></Dorja>}></Route>
          <Route path="/EventDetails" element={<EventDetails></EventDetails>}></Route>
          <Route path="/Event" element={<Events></Events>}></Route>
          <Route path="/event/:id" element={<EventDetails></EventDetails>}></Route>
          <Route path="/User" element={<GeneralMemberPage></GeneralMemberPage>}></Route>
          <Route path="/Register" element={<RegistrationForm></RegistrationForm>}></Route>
          <Route path="/AllMembers" element={<AllMembersPage></AllMembersPage>}></Route>
          <Route path="/profile/:id" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="/settings/:id" element={<SettingsPage></SettingsPage>}></Route>
          <Route path="/Reset" element={<AdminPasswordResetPage></AdminPasswordResetPage>}></Route>
          <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/ManageCommittee" element={<AddMemberForm onMemberAdded={() => setRefresh(!refresh)} selectedMember={selectedMember} setSelectedMember={setSelectedMember}/>}></Route>
          <Route path="/members/CommitteeProfile/:id" element={<CommitteeProfile></CommitteeProfile>}></Route>
          <Route path="/CommitteeSettings/:id" element={<CommitteeSettings></CommitteeSettings>}></Route>
          <Route path="/ManageEvent" element={<AdminEventDetailsControl></AdminEventDetailsControl>}></Route>
          <Route path="/ManageActivity" element={<ImageUpload></ImageUpload>}></Route>
          <Route path="/ManageNews" element={<AdminTextSlideControl></AdminTextSlideControl>}></Route>
          <Route path="/ManageUsers" element={<AdminUsersPage></AdminUsersPage>}></Route>
          <Route path="/UsersByYear" element={<UsersByYear></UsersByYear>}></Route>
          <Route path="/CommitteeByYear" element={<CommitteeByYear></CommitteeByYear>}></Route>
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
