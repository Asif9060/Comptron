import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    upcomingEvents: 0,
    deletedUsers: 0,
  });

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/users/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-10">
          <div className="bg-[#1c1c1e] p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Total Users</h2>
            <p className="text-lg">{stats.totalUsers}</p>
          </div>
          {/* <div className="bg-[#1c1c1e] p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Active Users</h2>
            <p className="text-lg">{stats.activeUsers}</p>
          </div> */}
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
      </div>
    </div>
  );
};

export default AdminDashboardPage;
