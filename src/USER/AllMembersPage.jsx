import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../assets/images/Comptron Logo.png"; // Import logo image
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
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Registered Members
      </h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, skill, or ID..."
          className="p-3 w-full max-w-2xl border border-gray-600 rounded-lg bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 justify-center">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/40 flex flex-col justify-center translate-x-15 items-center w-[32rem] transition duration-300"
          >
            <div className="">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              )}
            </div>
            <div className="text-2xl font-bold mb-2">{user.name}</div>
            <div className="text-sm text-gray-400 mb-4">{user.customId}</div>
            <p className="text-center">{user.skills}</p>

            <Link to={`/profile/${user.customId}`} className="w-full">
              <button className="mt-6 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition">
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
