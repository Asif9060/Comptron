import { useContext } from "react";
import { AdminContext } from "./AdminContext";
import "../ToggleAdmin/ToggleButton.css";
const AdminToggle = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext); // Use the context

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin); // Toggle the isAdmin state
  };

  return (
    <div className="flex items-center mt-4 justify-center">
      <button className="button3" onClick={toggleAdmin}>
        <div id="clip">
          <div id="leftTop" className="corner"></div>
          <div id="rightBottom" className="corner"></div>
          <div id="rightTop" className="corner"></div>
          <div id="leftBottom" className="corner"></div>
        </div>
        <span id="rightArrow" className="arrow"></span>
        <span id="leftArrow" className="arrow"></span>
        {isAdmin ? "Hide" : "Reveal"}
      </button>
    </div>
  );
};

export default AdminToggle;
