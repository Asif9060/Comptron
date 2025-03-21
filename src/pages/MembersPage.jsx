import Header from "../Components/Layout/Header";
import Navbar2 from "../Components/Layout/Navbar2";
import CommitteeCard from "../Components/UI/CommitteeCard";
import Menu from "../Components/Layout/Menu";
import SideMenu from "../Components/Features/SideMenu";
const MembersPage = () => {
  return (
    <div className="bg-[#1C1C1C]">
      <Header></Header>
      <Navbar2></Navbar2>
      {/* <Menu></Menu> */}
      <div className="translate-y-[7.2rem] absolute fixed">
        <SideMenu></SideMenu>
      </div>
      <CommitteeCard></CommitteeCard>
    </div>
  );
};

export default MembersPage;
