import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

const AdminDashboardPage = () => {
   const [stats, setStats] = useState({
      totalUsers: 0,
      activeUsers: 0,
      upcomingEvents: 0,
      deletedUsers: 0,
      pendingUsers: 0,
   });

   const [usersByYear, setUsersByYear] = useState({});
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true);
      Promise.all([
         fetch("https://comptron-server-2.onrender.com/api/users/stats").then((res) =>
            res.json()
         ),
         fetch("https://comptron-server-2.onrender.com/api/users/byYear").then((res) =>
            res.json()
         ),
      ])
         .then(([statsData, yearData]) => {
            console.log("Stats response:", statsData);
            setStats(statsData);
            setUsersByYear(yearData);
            setLoading(false);
         })
         .catch((err) => {
            console.error(err);
            setLoading(false);
         });
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

   // Animation variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: { type: "spring", stiffness: 200, damping: 10 },
      },
   };

   const menuItems = [
      {
         to: "/ManageCommittee",
         label: "Committee Management",
         icon: "👥",
         bgFrom: "from-indigo-600",
         bgTo: "to-blue-500",
         delay: 0,
      },
      {
         to: "/ManageNews",
         label: "News Management",
         icon: "📰",
         bgFrom: "from-red-500",
         bgTo: "to-orange-400",
         delay: 0.1,
      },
      {
         to: "/ManageNewsArticles",
         label: "News Articles",
         icon: "📝",
         bgFrom: "from-blue-500",
         bgTo: "to-cyan-400",
         delay: 0.15,
      },
      {
         to: "/ManageEvent",
         label: "Event Management",
         icon: "🎉",
         bgFrom: "from-green-500",
         bgTo: "to-emerald-400",
         delay: 0.2,
      },
      {
         to: "/ManageActivity",
         label: "Recent Activity",
         icon: "📊",
         bgFrom: "from-purple-500",
         bgTo: "to-pink-500",
         delay: 0.3,
      },
      {
         to: "/UserApproval",
         label: "User Approval",
         icon: "✅",
         bgFrom: "from-yellow-400",
         bgTo: "to-amber-500",
         delay: 0.4,
      },
      {
         to: "/ManageUsers",
         label: "Manage Users",
         icon: "👤",
         bgFrom: "from-cyan-500",
         bgTo: "to-blue-400",
         delay: 0.5,
      },
      {
         to: "/ManageAboutImage",
         label: "About Image",
         icon: "🖼️",
         bgFrom: "from-pink-500",
         bgTo: "to-rose-400",
         delay: 0.6,
      },
      {
         to: "/CseFestAdmin",
         label: "CSE FEST Management",
         icon: "💻",
         bgFrom: "from-orange-500",
         bgTo: "to-yellow-400",
         delay: 0.7,
      },
   ];

   return (
      <motion.div
         className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#16213e] text-white p-8"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}>
         <motion.div
            className="max-w-screen-xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <motion.div
               className="relative flex items-center justify-center mb-14"
               variants={itemVariants}>
               <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Admin Dashboard
               </h1>
               <div className="absolute -bottom-4 w-32 h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
            </motion.div>

            {loading ? (
               <div className="flex items-center justify-center h-60">
                  <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
               </div>
            ) : (
               <>
                  {/* Stats Cards Section */}
                  <motion.div
                     className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-14"
                     variants={containerVariants}>
                     <motion.div
                        className="relative overflow-hidden backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl border border-white/10 group hover:shadow-2xl transition-all duration-300"
                        variants={itemVariants}
                        onClick={handleTotalUsersClick}
                        whileHover={{ y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}>
                        <div className="absolute -right-8 -top-8 w-28 h-28 bg-blue-600/20 rounded-full"></div>
                        <div className="absolute right-10 bottom-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                           👥
                        </div>
                        <h2 className="text-xl font-medium text-blue-300 mb-2">
                           Total Users
                        </h2>
                        <p className="text-5xl font-bold">{stats.totalUsers}</p>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                     </motion.div>

                     <motion.div
                        className={`relative overflow-hidden backdrop-blur-md ${
                           stats.pendingUsers > 0 ? "bg-yellow-500/20" : "bg-white/10"
                        } p-8 rounded-xl shadow-xl border ${
                           stats.pendingUsers > 0
                              ? "border-yellow-500/50"
                              : "border-white/10"
                        } group hover:shadow-2xl transition-all duration-300`}
                        variants={itemVariants}
                        onClick={() => navigate("/UserApproval")}
                        whileHover={{ y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}>
                        <div className="absolute -right-8 -top-8 w-28 h-28 bg-yellow-600/20 rounded-full"></div>
                        <div className="absolute right-10 bottom-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                           ⏳
                        </div>
                        <div className="flex items-center">
                           <h2 className="text-xl font-medium text-yellow-300 mb-2">
                              Pending Approvals
                           </h2>
                           {stats.pendingUsers > 0 && (
                              <span className="ml-3 flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-red-600 rounded-full animate-pulse">
                                 {stats.pendingUsers}
                              </span>
                           )}
                        </div>
                        <p className="text-5xl font-bold">{stats.pendingUsers || 0}</p>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                     </motion.div>
                  </motion.div>

                  {/* Admin Actions Section */}
                  <motion.div className="mb-10" variants={containerVariants}>
                     <h2 className="text-3xl font-bold mb-8 text-gray-200 pl-2">
                        Admin Actions
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item, idx) => (
                           <motion.div
                              key={idx}
                              className="relative group"
                              variants={itemVariants}
                              custom={idx}
                              whileHover={{ y: -8 }}
                              transition={{ delay: item.delay }}>
                              <NavLink
                                 to={item.to}
                                 className={`flex items-center p-8 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 hover:border-white/20 shadow-xl bg-gradient-to-br ${item.bgFrom} ${item.bgTo} hover:shadow-2xl transition-all duration-300`}>
                                 <span className="text-3xl mr-4">{item.icon}</span>
                                 <span className="font-semibold text-lg">
                                    {item.label}
                                 </span>
                              </NavLink>
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>
               </>
            )}
         </motion.div>
      </motion.div>
   );
};

export default AdminDashboardPage;
