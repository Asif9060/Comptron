import logo from "../../assets/images/Comptron Logo.png"
import DigitalClock from "../Features/DigitalClock";

const Header = () => {
    return (
        <div>
            <div className="flex justify-evenly" >
                <img className='w-24 translate-x-[-100px] translate-y-[10px]' src={logo} alt="" />
                <p className='text-[50px] translate-x-9 translate-y-[15px]'><span className="text-[#15A6E1]">Comptron</span><span className="text-[#483d68]"> - Creativity Assembled </span></p>
                <DigitalClock></DigitalClock>
            </div>

        </div>
    );
};

export default Header;