import SideMenu from "../Components/Features/SideMenu";
import EventCountdown from "../Components/UI/EventCountdown";
import { AdminProvider } from "./ToggleAdmin/AdminContext";

import { useState } from "react";
import AddMemberForm from "../Components/AddMemberForm";
import MemberList from "../Components/MemberList";
import CommiteeCard from "../Components/UI/CommitteeCard";
import AdminEventControl from "./AdminEventControl";
import AdminTextSlideControl from "./AdminTextSlideControl";
import AdminEventDetailsControl from "./AdminEventDetailsControl";
import LogoutBtn from "./ToggleAdmin/LogoutBtn";
import ImageUpload from "./ImageUpload";
import ValidationControl from "../USER/ValidationControl";
import AdminPasswordResetPage from './../USER/PasswordReset';

const AdminPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  return (
    <div className="">
      <h1 className="text-3xl text-center translate-y-[4rem] text-white">
        Admin Page
      </h1>

      <LogoutBtn></LogoutBtn>

      <AdminProvider>
        {/* ----------------------------------------------------------------------------------------- */}
        {/* Event Countdown Control */}

        <div className=" relative left-[73.4rem] gap-4  border translate-y-[-2.5rem] rounded-3xl p-4 inline-block items-center ">
          <AdminEventControl></AdminEventControl>
          <EventCountdown></EventCountdown>
        </div>
        <div className="fixed top-0 left-0 w-16 h-screen flex flex-col justify-center items-center z-10">
          <SideMenu></SideMenu>
        </div>
        {/* ----------------------------------------------------------------------------------------- */}

        {/* ----------------------------------------------------------------------------------------- */}

        {/* Committee Control */}

        <div className="flex flex-col translate-x-[-33rem] border inline-block rounded-3xl mb-4 p-4 items-center translate-y-[5rem]">
          <div className="text-white text-center text-3xl">Committee Panel</div>
          <AddMemberForm
            onMemberAdded={() => setRefresh(!refresh)}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
          <MemberList key={refresh} onEdit={setSelectedMember} />
          {/* <CommiteeCard></CommiteeCard> */}
        </div>

        <div className=" ">
          <AdminTextSlideControl></AdminTextSlideControl>
        </div>

        <div>
          <ImageUpload></ImageUpload>
        </div>

        <ValidationControl/>
        <AdminPasswordResetPage></AdminPasswordResetPage>
        

        {/* ----------------------------------------------------------------------------------------- */}
        {/* ----------------------------------------------------------------------------------------- */}
        <AdminEventDetailsControl></AdminEventDetailsControl>
        {/* ----------------------------------------------------------------------------------------- */}
      </AdminProvider>
    </div>
  );
};

export default AdminPage;
