import SideMenu from "../Components/Features/SideMenu";
import EventCountdown from "../Components/UI/EventCountdown";
import { AdminProvider } from "./ToggleAdmin/AdminContext";
import AdminToggle from "./ToggleAdmin/AdminToggle";
import CommitteePanel from "./../CommitteePanel/CommitteeControl";
import { useState } from "react";
import AddMemberForm from "../Components/AddMemberForm";
import MemberList from "../Components/MemberList";
import CommiteeCard from "../Components/UI/CommitteeCard";

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
          <EventCountdown></EventCountdown>
          <AdminToggle></AdminToggle>
        </div>
        <div className=" absolute fixed -translate-y-[11rem]">
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

{/* ----------------------------------------------------------------------------------------- */}
      </AdminProvider>
    </div>
  );
};

export default AdminPage;
