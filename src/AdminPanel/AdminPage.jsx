import SideMenu from "../Components/Features/SideMenu";
import EventCountdown from "../Components/UI/EventCountdown";
import { AdminProvider } from "./ToggleAdmin/AdminContext";

import { useState } from "react";
import AddMemberForm from "../Components/AddMemberForm";
import MemberList from "../Components/MemberList";
import CommiteeCard from "../Components/UI/CommitteeCard";
import AdminEventControl from "./AdminEventControl";
import AdminTextSlideControl from "./AdminTextSlideControl";

const AdminPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  return (
    <div className="">
      <h1 className="text-3xl text-center text-white">Admin Page</h1>

      <AdminProvider>
  {/* ----------------------------------------------------------------------------------------- */}
        {/* Event Countdown Control */}
        
        <div className="flex flex-col items-center ">
          <AdminEventControl></AdminEventControl>
          <EventCountdown></EventCountdown>
        </div>
        <div className=" fixed absolute -translate-y-[16rem]">
          <SideMenu></SideMenu>
        </div>
  {/* ----------------------------------------------------------------------------------------- */}

  {/* ----------------------------------------------------------------------------------------- */}

        {/* Committee Control */}

        <div className="flex flex-col items-center translate-y-[5rem] " >
          <div className="text-white text-3xl">Committee Panel</div>
          <AddMemberForm
            onMemberAdded={() => setRefresh(!refresh)}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
          <MemberList key={refresh} onEdit={setSelectedMember} />
          {/* <CommiteeCard></CommiteeCard> */}
        </div>

        <div className="relative flex flex-col items-center mb-77 translate-y-[10rem]">
          <AdminTextSlideControl></AdminTextSlideControl>
        </div>

{/* ----------------------------------------------------------------------------------------- */}
      </AdminProvider>
    </div>
  );
};

export default AdminPage;
