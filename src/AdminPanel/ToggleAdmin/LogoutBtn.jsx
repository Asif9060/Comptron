import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Dorja.css";


const LogoutBtn = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("userEmail"); // Remove stored user info
            navigate("/Dorja"); // Redirect to login page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
  return (
    <div className="absolute top-0 right-0 p-4">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
