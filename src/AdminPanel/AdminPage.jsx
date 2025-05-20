import LogoutBtn from "./ToggleAdmin/LogoutBtn";
import AdminDashboardPage from "./AdminDashboardPage";
import SideMenu from "../Components/Features/SideMenu";

const AdminPage = () => {
  return (
    <div>
      <LogoutBtn></LogoutBtn>
      <div className="fixed z-1 flex flex-col justify-center items-center h-screen">
        <SideMenu></SideMenu>
      </div>
      <AdminDashboardPage></AdminDashboardPage>
    </div>
  );
};

export default AdminPage;
