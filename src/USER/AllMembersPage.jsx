import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import male from "../assets/images/male.jpg";
import female from "../assets/images/female.jpg";
import logo from "../assets/images/Comptron Logo.png";
import FloatingMenu from "../Components/UI/FloatingMenu";

const AllMembersPage = () => {
   const [users, setUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("https://comptron-server-2.onrender.com/api/users")
         .then((res) => res.json())
         .then((data) => {
            setUsers(data);
            setFilteredUsers(data);
         })
         .catch((error) => console.error("Error fetching users:", error))
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      if (!searchTerm.trim()) {
         setFilteredUsers(users);
      } else {
         const keyword = searchTerm.toLowerCase();
         const results = users.filter(
            (user) =>
               user.name.toLowerCase().includes(keyword) ||
               user.skills.toLowerCase().includes(keyword) ||
               user.customId.toLowerCase().includes(keyword)
         );
         setFilteredUsers(results);
      }
   }, [searchTerm, users]);

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen text-white text-xl">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );
   }

   return (
      <div className="h-screen text-white flex flex-col items-center px-5 py-10">
         <FloatingMenu />

         <h1 className="text-4xl font-bold mb-8 text-center">Registered Members</h1>

         <div className="mb-8 flex justify-center px-4 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto">
            <input
               type="text"
               placeholder="Search by name, skill, or ID..."
               className="w-full p-3 md:p-4 rounded-lg text-base md:text-lg text-white bg-gray-800 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#15A6E1] transition duration-300"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
            {filteredUsers.map((user) => (
               <div
                  key={user._id}
                  className="bg-gray-900 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition duration-300  hover:shadow-[cyan_0px_0px_10px_2px]">
                  <div className="">
                     {user.image ? (
                        <img
                           src={user.image}
                           alt="Profile"
                           className="w-28 h-28 aspect-square rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                           onError={(e) => (e.target.src = "/fallback-image.png")}
                        />
                     ) : (
                        <img
                           src={user.gender?.toLowerCase() === "female" ? female : male}
                           alt="Default Avatar"
                           className="w-28 h-28 aspect-square rounded-full mx-auto mb-4 object-cover border-4 border-gray-500"
                        />
                     )}
                  </div>
                  <div className="text-2xl font-bold mb-2">{user.name}</div>
                  <div className="text-sm text-gray-400 mb-4">{user.customId}</div>
                  <p className="text-center">{user.skills}</p>

                  <Link to={`/profile/${user.customId}`} className="w-full">
                     <button className="mt-6 w-full cursor-pointer py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition">
                        View Details
                     </button>
                  </Link>
               </div>
            ))}
         </div>

         {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-8 text-xl">
               No matching members found.
            </p>
         )}
      </div>
   );
};

export default AllMembersPage;
