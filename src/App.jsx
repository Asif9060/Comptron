import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
import AddMemberForm from "./Components/AddMemberForm";
import CommitteeProfile from "./CommitteePanel/CommitteeProfile";
import CommitteeSettings from "./CommitteePanel/CommitteeSettings";
import AdminEventDetailsControl from "./AdminPanel/AdminEventDetailsControl";
import Recent from "./Components/Features/Recent";
import AdminTextSlideControl from "./AdminPanel/AdminTextSlideControl";
import ImageUpload from "./AdminPanel/ImageUpload";
import AdminUsersPage from "./AdminPanel/AdminUsersPage";
import UserApprovalPage from "./AdminPanel/UserApprovalPage";
import UsersByYear from "./AdminPanel/UsersByYear";
import CommitteeByYear from "./CommitteePanel/CommitteeByYear";
import AboutImage from "./AdminPanel/AboutImage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PastEvents from "./Components/UI/PastEvents";
// import Bio from "./USER/Bio";

const App = () => {
   const [refresh, setRefresh] = useState(false);
   const [selectedMember, setSelectedMember] = useState(null);

   // Debug current user
   useEffect(() => {
      console.log("Current user email:", localStorage.getItem("userEmail"));
   }, []);

   return (
      <>
         <Toaster position="top-center" />
         <BrowserRouter>
            <Routes>
               <Route path="/Dorja" element={<Dorja></Dorja>}></Route>
               <Route path="/" element={<HomePage></HomePage>}></Route>
               <Route path="/Committee" element={<MembersPage></MembersPage>}></Route>
               <Route path="/About" element={<AboutPage></AboutPage>}></Route>
               <Route path="/Events" element={<EventPage></EventPage>}></Route>
               <Route path="/GMembers" element={<Members></Members>}></Route>
               <Route path="/past-events" element={<PastEvents></PastEvents>}></Route>
               <Route
                  path="/EventDetails"
                  element={<EventDetails></EventDetails>}></Route>
               <Route path="/Event" element={<Events></Events>}></Route>
               <Route path="/event/:id" element={<EventDetails></EventDetails>}></Route>
               <Route
                  path="/User"
                  element={<GeneralMemberPage></GeneralMemberPage>}></Route>
               <Route
                  path="/Register"
                  element={<RegistrationForm></RegistrationForm>}></Route>
               <Route
                  path="/AllMembers"
                  element={<AllMembersPage></AllMembersPage>}></Route>
               <Route path="/profile/:id" element={<ProfilePage></ProfilePage>}></Route>
               <Route
                  path="/settings/:id"
                  element={<SettingsPage></SettingsPage>}></Route>
               <Route
                  path="/Reset"
                  element={<AdminPasswordResetPage></AdminPasswordResetPage>}></Route>
               <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
               <Route path="/unauthorized" element={<Unauthorized />}></Route>

               {/* Admin Protected Routes */}
               <Route
                  path="/AdminPage"
                  element={
                     <AdminProtectedRoute>
                        <AdminPage />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageCommittee"
                  element={
                     <AdminProtectedRoute>
                        <AddMemberForm
                           onMemberAdded={() => setRefresh(!refresh)}
                           selectedMember={selectedMember}
                           setSelectedMember={setSelectedMember}
                        />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/members/CommitteeProfile/:id"
                  element={<CommitteeProfile />}></Route>

               <Route
                  path="/CommitteeSettings/:id"
                  element={
                     <AdminProtectedRoute>
                        <CommitteeSettings />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageEvent"
                  element={
                     <AdminProtectedRoute>
                        <AdminEventDetailsControl />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageActivity"
                  element={
                     <AdminProtectedRoute>
                        <ImageUpload />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageNews"
                  element={
                     <AdminProtectedRoute>
                        <AdminTextSlideControl />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageUsers"
                  element={
                     <AdminProtectedRoute>
                        <AdminUsersPage />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/ManageAboutImage"
                  element={
                     <AdminProtectedRoute>
                        <AboutImage />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/UsersByYear"
                  element={
                     <AdminProtectedRoute>
                        <UsersByYear />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/CommitteeByYear"
                  element={
                     <AdminProtectedRoute>
                        <CommitteeByYear />
                     </AdminProtectedRoute>
                  }></Route>

               <Route
                  path="/UserApproval"
                  element={
                     <AdminProtectedRoute>
                        <UserApprovalPage />
                     </AdminProtectedRoute>
                  }></Route>

               <Route path="*" element={<NotFound />}></Route>
            </Routes>
         </BrowserRouter>
      </>
   );
};

export default App;
