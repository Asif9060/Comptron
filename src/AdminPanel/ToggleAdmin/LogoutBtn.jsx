import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Dorja.css";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      navigate("/Dorja");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 text-sm sm:text-base md:text-lg"
      >
       <div className="translate-y-[-0.2rem]">Logout</div>
      </button>
    </div>
  );
};

export default LogoutBtn;
