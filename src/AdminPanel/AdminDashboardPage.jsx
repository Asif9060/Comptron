import React, { useState, useEffect } from "react";
import UserGrowthGraph from "./UserGrowthGraph"; // Import the UserGrowthGraph component
import { NavLink } from "react-router-dom";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    upcomingEvents: 0,
    deletedUsers: 0,
  });

  useEffect(() => {
    // Fetch stats from your backend (adjust URL if necessary)
    fetch("https://comptron-server-2.onrender.com/api/users/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <div className="bg-[#1c1c1e] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Total Users
          </h2>
          <p className="text-lg text-white">{stats.totalUsers}</p>
        </div>
        <div className="bg-[#1c1c1e] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Active Users
          </h2>
          <p className="text-lg text-white">{stats.activeUsers}</p>
        </div>
        {/* <div classNameName="bg-[#1c1c1e] p-6 rounded-lg">
          <h2 classNameName="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
          <p classNameName="text-lg text-white">{stats.upcomingEvents}</p>
        </div> */}
        {/* <div classNameName="bg-[#1c1c1e] p-6 rounded-lg">
          <h2 classNameName="text-2xl font-bold text-white mb-4">Deleted Users</h2>
          <p classNameName="text-lg text-white">{stats.deletedUsers}</p>
        </div> */}
      </div>

      {/* <UserGrowthGraph /> Include the growth graph here */}

      <div className="flex flex-col items-center mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl">
          <div className="relative group">
            <NavLink to={"/ManageCommittee"} className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              Edit Member
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </NavLink>
          </div>

          <div className="relative group">
            <NavLink to={"/ManageNews"} className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              News Management
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </NavLink>
          </div>

          <div className="relative group">
            <NavLink to={"/ManageEvent"} className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              Event Management
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </NavLink>
          </div>

          <div className="relative group">
            <NavLink to={"/ManageActivity"} className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              Recent Activity
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </NavLink>
          </div>

          <div className="relative group">
            <button className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              Website Settings
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </button>
          </div>

          <div className="relative group">
            <NavLink to={"/ManageUsers"} className="w-full p-12 bg-gradient-to-r from-[#003049] to-[#00B4D8] text-white text-3xl font-semibold rounded-xl shadow-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-opacity-30 border-transparent group-hover:animate-pulse">
              Manage Users
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00B4D8] transition-all duration-300"></span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
