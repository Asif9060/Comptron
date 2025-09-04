
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import Partner from "../components/Partner";
import Roadmap from "../components/Roadmap";

const Event = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Carousel></Carousel>
            <Partner></Partner>
            <Roadmap></Roadmap>
            <Footer></Footer>
        </div>
    );
};

export default Event;