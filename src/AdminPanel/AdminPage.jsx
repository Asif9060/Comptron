import SideMenu from "../Components/Features/SideMenu";
import EventCountdown from "../Components/UI/EventCountdown";
import { AdminProvider } from "./ToggleAdmin/AdminContext";
import AdminToggle from "./ToggleAdmin/AdminToggle";


const AdminPage = () => {
  return (
    <div className="">
      <h1 className="text-3xl text-center text-white">Admin Page</h1>
      <AdminProvider>
        <div className="absolute translate-x-[41.5rem]">
          <EventCountdown></EventCountdown>
          <AdminToggle></AdminToggle>
        </div>
        <div className="absolute fixed translate-y-[14rem]">
          <SideMenu></SideMenu>
        </div>
      </AdminProvider>
    </div>
  );
};

export default AdminPage;
