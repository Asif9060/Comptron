import './CSS/Menu.css';
const Menu = () => {
    return (
        <div className="translate-y-32 ml-1 fixed res">
           
            <input className="checkbox" type="checkbox" />
            <span className="button-menu -translate-x-0.5 -translate-y-0.5"></span>
            <button className="option-a option">A</button>
            <button className="option-b option">B</button>
            <button className="option-c option">C</button>
            <button className="option-d option">D</button>
            <button className="option-e option">E</button>

        </div>
    );
};

export default Menu;