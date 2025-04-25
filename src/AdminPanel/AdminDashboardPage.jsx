import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    upcomingEvents: 0,
    deletedUsers: 0,
  });

  const [usersByYear, setUsersByYear] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/users/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    fetch("https://comptron-server-2.onrender.com/api/users/byYear")
      .then((res) => res.json())
      .then((data) => setUsersByYear(data))
      .catch((err) => console.error(err));
  }, []);

  const downloadCSV = (year) => {
    const users = usersByYear[year];
    if (!users || users.length === 0) return;

    const csvContent = [
      ["ID", "Name", "Custom ID"],
      ...users.map((user) => [user.id, user.name, user.customId]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `users_${year}.csv`);
  };

  const handleTotalUsersClick = () => {
    navigate("/UsersByYear");
  };

  return (
    <div className="min-h-screen bg-[#111] text-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-10">
          <div
            className="bg-[#1c1c1e] p-6 rounded-lg text-center cursor-pointer hover:bg-[#2c2c2e] transition duration-300"
            onClick={handleTotalUsersClick}
          >
            <h2 className="text-2xl font-bold mb-2">Total Users</h2>
            <p className="text-lg">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {[
            { to: "/ManageCommittee", label: "Committee Management" },
            { to: "/ManageNews", label: "News Management" },
            { to: "/ManageEvent", label: "Event Management" },
            { to: "/ManageActivity", label: "Recent Activity" },
            { to: "/ManageUsers", label: "Manage Users" },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <NavLink
                to={item.to}
                className="block text-center p-10 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-2xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300"
              >
                {item.label}
                <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
              </NavLink>
            </div>
          ))}
        </div>

        {/* Removed Users by Year of Validation section */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
