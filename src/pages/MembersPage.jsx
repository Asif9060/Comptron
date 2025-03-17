import Header from "../Components/Layout/Header";
import Navbar2 from "../Components/Layout/Navbar2";
import CommitteeCard from "../Components/UI/CommitteeCard";
import Menu from "../Components/Layout/Menu";
const MembersPage = () => {
    
    return (
        <div className="bg-gray-800">
            <Header></Header>
            <Navbar2></Navbar2>
            <Menu></Menu>
            <CommitteeCard></CommitteeCard>
        </div>
        
    );
};

export default MembersPage;