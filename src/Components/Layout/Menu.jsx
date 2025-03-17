import './CSS/Menu.css';
import { useNavigate } from 'react-router-dom';
const Menu = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };
    return (
        <div className="translate-y-32 ml-1 fixed res">
           
            <input className="checkbox" type="checkbox" />
            <span className="button-menu -translate-x-0.5 -translate-y-0.5"></span>
            <button className="option-a option" onClick={() => handleNavigation('/')}>
                Home
            </button>
            <button className="option-b option" onClick={() => handleNavigation('/Members')}>
                Members
            </button>
            <button className="option-c option" onClick={() => handleNavigation('/Events')}>
                Events
            </button>
            <button className="option-d option" onClick={() => handleNavigation('/News')}>
                NWU
            </button>
            <button className="option-e option" onClick={() => handleNavigation('/About')}>
                About Us
            </button>

        </div>
    );
};

export default Menu;