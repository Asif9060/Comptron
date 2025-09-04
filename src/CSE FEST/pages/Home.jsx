import Fest from "../components/Fest";
import Navbar from "../components/FestNav";
import Footer from "../components/Footer";
import Sponsor from "../components/Sponsor";
const Home = () => {
   return (
      <div className="bg-[#1c1535]">
         <Navbar></Navbar>
         <Fest></Fest>
         <Sponsor></Sponsor>
         <Footer></Footer>
      </div>
   );
};

export default Home;
