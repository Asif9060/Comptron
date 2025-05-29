import Header from "../Components/Layout/Header";
import Navbar2 from "../Components/Layout/Navbar2";
import CommitteeCard from "../Components/UI/CommitteeCard";
// import Menu from "../Components/Layout/Menu";
import SideMenu from "../Components/Features/SideMenu";
import Footer from './../Components/Layout/Footer';
import { CardsContext, CardsProvider } from "../CommitteePanel/CardsContext";
import ShinyText from './../Components/UI/ShinyText';
const MembersPage = () => {
  return (
    <div className="bg-[]">
      <Header></Header>
      <Navbar2></Navbar2>
      {/* <Menu></Menu> */}

      <ShinyText></ShinyText>
      {/* <div className=" z-1 fixed">
        <SideMenu></SideMenu>
      </div> */}
      <CardsProvider>
        <CardsContext></CardsContext>
        <CommitteeCard></CommitteeCard>
      </CardsProvider>
      <div className="lg:translate-y-[200rem] mt-10">

      <Footer></Footer>
      </div>
    </div>
  );
};

export default MembersPage;
