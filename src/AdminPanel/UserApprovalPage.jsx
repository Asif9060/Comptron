import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserApprovalPage = () => {
   const navigate = useNavigate();
   const [pendingUsers, setPendingUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [searchTerm, setSearchTerm] = useState("");
   const [isFiltering, setIsFiltering] = useState(false);

   // Load pending users when the component mounts
   useEffect(() => {
      fetchPendingUsers();
   }, []);

   const fetchPendingUsers = async () => {
      setLoading(true);
      try {
         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/users/pending"
         );

         if (!response.ok) {
            throw new Error(`Failed to fetch pending users. Status: ${response.status}`);
         }

         const data = await response.json();
         setPendingUsers(data);
         setLoading(false);
      } catch (err) {
         setError("Failed to load pending users. " + err.message);
         setLoading(false);
      }
   };

   const handleApprove = async (userId) => {
      try {
         setLoading(true);
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/users/approve/${userId}`,
            { method: "POST" }
         );

         if (!response.ok) {
            throw new Error(`Approval failed. Status: ${response.status}`);
         }

         // Remove approved user from the list
         setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
         setSuccess("User approved successfully!");
         // If the approved user was the selected user, clear the selection
         if (selectedUser && selectedUser._id === userId) {
            setSelectedUser(null);
         }
      } catch (err) {
         setError("Failed to approve user. " + err.message);
      } finally {
         setLoading(false);
      }
   };

   const handleReject = async (userId) => {
      try {
         setLoading(true);
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/users/reject/${userId}`,
            { method: "POST" }
         );

         if (!response.ok) {
            throw new Error(`Rejection failed. Status: ${response.status}`);
         }

         // Remove rejected user from the list
         setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
         setSuccess("User rejected successfully!");
         // If the rejected user was the selected user, clear the selection
         if (selectedUser && selectedUser._id === userId) {
            setSelectedUser(null);
         }
      } catch (err) {
         setError("Failed to reject user. " + err.message);
      } finally {
         setLoading(false);
      }
   };

   // Filter users based on search term
   const filteredUsers = pendingUsers.filter((user) => {
      return (
         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
   });

   // Animation variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: { type: "spring", stiffness: 150 },
      },
      exit: {
         y: -20,
         opacity: 0,
         transition: { ease: "easeOut", duration: 0.3 },
      },
   };

   const fadeInVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } },
   };
   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#16213e] text-white p-6">
         <div className="w-full max-w-7xl mx-auto mb-6">
            <button
               onClick={() => navigate(-1)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
               ← Back
            </button>
         </div>
         <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            {/* Header Section */}
            <motion.div className="mb-10 text-center" variants={fadeInVariants}>
               <motion.h1
                  className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                  whileHover={{ scale: 1.01 }}>
                  User Approval Dashboard
               </motion.h1>
               <p className="text-gray-400 max-w-2xl mx-auto">
                  Manage pending user registrations, approve or reject applicants, and
                  help maintain the quality of our platform.
               </p>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
               {error && (
                  <motion.div
                     className="bg-red-900/80 backdrop-blur-sm text-white p-4 rounded-lg mb-6 border-l-4 border-red-500 shadow-lg"
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}>
                     <div className="flex items-center">
                        <svg
                           className="w-6 h-6 mr-2 text-red-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                        <span>{error}</span>
                     </div>
                     <button
                        className="absolute top-3 right-3 text-white"
                        onClick={() => setError("")}>
                        <svg
                           className="w-4 h-4"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </motion.div>
               )}

               {success && (
                  <motion.div
                     className="bg-green-900/80 backdrop-blur-sm text-white p-4 rounded-lg mb-6 border-l-4 border-green-500 shadow-lg"
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}>
                     <div className="flex items-center">
                        <svg
                           className="w-6 h-6 mr-2 text-green-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                           />
                        </svg>
                        <span>{success}</span>
                     </div>
                     <button
                        className="absolute top-3 right-3 text-white"
                        onClick={() => setSuccess("")}>
                        <svg
                           className="w-4 h-4"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Search and Stats */}
            <motion.div
               className="mb-8 bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl"
               variants={fadeInVariants}>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                           className="w-5 h-5 text-gray-500"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                        </svg>
                     </div>
                     <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => {
                           setSearchTerm(e.target.value);
                           setIsFiltering(e.target.value !== "");
                        }}
                        className="pl-10 p-3 w-full bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                     />
                     {searchTerm && (
                        <button
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                           onClick={() => {
                              setSearchTerm("");
                              setIsFiltering(false);
                           }}>
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M6 18L18 6M6 6l12 12"
                              />
                           </svg>
                        </button>
                     )}
                  </div>

                  <div className="flex items-center bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-700/50">
                     <span className="text-sm font-medium mr-2 text-gray-400">
                        Pending:
                     </span>
                     <span className="text-lg font-bold text-blue-400">
                        {pendingUsers.length}
                     </span>
                     {isFiltering && (
                        <>
                           <span className="mx-2 text-gray-600">|</span>
                           <span className="text-sm font-medium mr-2 text-gray-400">
                              Filtered:
                           </span>
                           <span className="text-lg font-bold text-purple-400">
                              {filteredUsers.length}
                           </span>
                        </>
                     )}
                  </div>
               </div>
            </motion.div>

            {/* User List Section */}
            <div className="relative">
               {loading && pendingUsers.length === 0 ? (
                  <motion.div
                     className="flex flex-col items-center justify-center p-20"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}>
                     <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
                     <p className="text-gray-400 text-lg">Loading pending users...</p>
                  </motion.div>
               ) : filteredUsers.length === 0 ? (
                  <motion.div
                     className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-12 text-center"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}>
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <svg
                           className="w-8 h-8 text-gray-500"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                           />
                        </svg>
                     </div>
                     <h3 className="text-xl font-medium text-white mb-2">
                        {pendingUsers.length === 0
                           ? "No pending users to approve"
                           : "No users match your search criteria"}
                     </h3>
                     <p className="text-gray-400">
                        {pendingUsers.length === 0
                           ? "All user applications have been processed."
                           : "Try adjusting your search terms to find what you're looking for."}
                     </p>
                  </motion.div>
               ) : (
                  <motion.div
                     className="grid grid-cols-1 gap-6"
                     variants={containerVariants}>
                     <AnimatePresence>
                        {filteredUsers.map((user) => (
                           <motion.div
                              key={user._id}
                              className={`bg-gray-800/30 backdrop-blur-sm rounded-xl border overflow-hidden ${
                                 selectedUser && selectedUser._id === user._id
                                    ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                                    : "border-gray-700/50"
                              }`}
                              variants={itemVariants}
                              layout
                              exit="exit">
                              <div className="p-6">
                                 <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                    {/* User Avatar/Info */}
                                    <div className="flex items-center flex-1">
                                       {user.image ? (
                                          <div className="relative mr-4">
                                             <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-16 h-16 object-cover rounded-full border-2 border-gray-700"
                                             />
                                             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full border-2 border-gray-800"></div>
                                          </div>
                                       ) : (
                                          <div className="relative mr-4">
                                             <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl font-bold">
                                                {user.name?.charAt(0).toUpperCase() ||
                                                   "?"}
                                             </div>
                                             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full border-2 border-gray-800"></div>
                                          </div>
                                       )}

                                       <div className="flex-1">
                                          <div className="flex items-center">
                                             <h3 className="text-xl font-bold">
                                                {user.name}
                                             </h3>
                                             <span className="ml-2 px-2 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-300 font-medium">
                                                Pending
                                             </span>
                                          </div>
                                          <div className="mt-1 flex flex-wrap gap-2 items-center text-sm text-gray-400">
                                             <span className="flex items-center">
                                                <svg
                                                   className="w-4 h-4 mr-1"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M16 12a4 4 0 10-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                   />
                                                </svg>
                                                {user.email}
                                             </span>
                                             <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                             <span className="flex items-center">
                                                <svg
                                                   className="w-4 h-4 mr-1"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                   />
                                                </svg>
                                                {user.createdAt &&
                                                   format(
                                                      new Date(user.createdAt),
                                                      "PPP"
                                                   )}
                                             </span>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 w-full lg:w-auto">
                                       <button
                                          onClick={() =>
                                             setSelectedUser(
                                                user === selectedUser ? null : user
                                             )
                                          }
                                          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                                             selectedUser && selectedUser._id === user._id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                          }`}>
                                          {selectedUser &&
                                          selectedUser._id === user._id ? (
                                             <>
                                                <svg
                                                   className="w-4 h-4 mr-2"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M19 9l-7 7-7-7"
                                                   />
                                                </svg>
                                                Hide Details
                                             </>
                                          ) : (
                                             <>
                                                <svg
                                                   className="w-4 h-4 mr-2"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                   />
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                   />
                                                </svg>
                                                View Details
                                             </>
                                          )}
                                       </button>

                                       <button
                                          onClick={() => handleApprove(user._id)}
                                          disabled={loading}
                                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                          <svg
                                             className="w-4 h-4 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          Approve
                                       </button>

                                       <button
                                          onClick={() => handleReject(user._id)}
                                          disabled={loading}
                                          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                          <svg
                                             className="w-4 h-4 mr-2"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                             />
                                          </svg>
                                          Reject
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              {/* User Details Expandable Section */}
                              <AnimatePresence>
                                 {selectedUser && selectedUser._id === user._id && (
                                    <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: "auto", opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.3 }}
                                       className="overflow-hidden border-t border-gray-700/50">
                                       <div className="p-6 bg-gray-800/30">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             {/* Contact Information */}
                                             <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                                                <h4 className="text-lg font-medium mb-3 text-blue-400 flex items-center">
                                                   <svg
                                                      className="w-5 h-5 mr-2"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor">
                                                      <path
                                                         strokeLinecap="round"
                                                         strokeLinejoin="round"
                                                         strokeWidth={2}
                                                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                      />
                                                   </svg>
                                                   Contact Information
                                                </h4>
                                                <div className="space-y-2">
                                                   <div className="flex items-start">
                                                      <span className="text-gray-400 w-24 flex-shrink-0">
                                                         Phone:
                                                      </span>
                                                      <span className="text-white">
                                                         {user.phone || "Not provided"}
                                                      </span>
                                                   </div>
                                                   <div className="flex items-start">
                                                      <span className="text-gray-400 w-24 flex-shrink-0">
                                                         Gender:
                                                      </span>
                                                      <span className="text-white">
                                                         {user.gender || "Not specified"}
                                                      </span>
                                                   </div>
                                                   {user.studentId && (
                                                      <div className="flex items-start">
                                                         <span className="text-gray-400 w-24 flex-shrink-0">
                                                            Student ID:
                                                         </span>
                                                         <span className="text-white">
                                                            {user.studentId}
                                                         </span>
                                                      </div>
                                                   )}
                                                   {user.bloodGroup && (
                                                      <div className="flex items-start">
                                                         <span className="text-gray-400 w-24 flex-shrink-0">
                                                            Blood Group:
                                                         </span>
                                                         <span className="text-white">
                                                            {user.bloodGroup}
                                                         </span>
                                                      </div>
                                                   )}
                                                   {user.dateOfBirth && (
                                                      <div className="flex items-start">
                                                         <span className="text-gray-400 w-24 flex-shrink-0">
                                                            Birth Date:
                                                         </span>
                                                         <span className="text-white">
                                                            {format(
                                                               new Date(user.dateOfBirth),
                                                               "MMMM d, yyyy"
                                                            )}
                                                         </span>
                                                      </div>
                                                   )}
                                                </div>
                                             </div>

                                             {/* Skills Section */}
                                             <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                                                <h4 className="text-lg font-medium mb-3 text-blue-400 flex items-center">
                                                   <svg
                                                      className="w-5 h-5 mr-2"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor">
                                                      <path
                                                         strokeLinecap="round"
                                                         strokeLinejoin="round"
                                                         strokeWidth={2}
                                                         d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                      />
                                                   </svg>
                                                   Skills & Expertise
                                                </h4>
                                                {user.skills ? (
                                                   <div className="flex flex-wrap gap-2">
                                                      {user.skills
                                                         ?.split(",")
                                                         .map((skill, index) => (
                                                            <span
                                                               key={index}
                                                               className="px-3 py-1 bg-blue-900/40 text-blue-300 border border-blue-700/50 rounded-full text-sm">
                                                               {skill.trim()}
                                                            </span>
                                                         ))}
                                                   </div>
                                                ) : (
                                                   <p className="text-gray-400 italic">
                                                      No skills provided
                                                   </p>
                                                )}
                                             </div>
                                          </div>

                                          {/* Firebase Info */}
                                          <div className="mt-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                                             <h4 className="text-lg font-medium mb-3 text-blue-400 flex items-center">
                                                <svg
                                                   className="w-5 h-5 mr-2"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                   />
                                                </svg>
                                                Authentication & System Info
                                             </h4>
                                             <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                <div className="flex items-start">
                                                   <span className="text-gray-400 w-32 flex-shrink-0">
                                                      Firebase ID:
                                                   </span>
                                                   <code className="text-green-400 bg-gray-900/50 px-2 py-1 rounded text-xs font-mono">
                                                      {user.firebaseUserId?.substring(
                                                         0,
                                                         12
                                                      )}
                                                      ...
                                                   </code>
                                                </div>
                                                <div className="flex items-start">
                                                   <span className="text-gray-400 w-32 flex-shrink-0">
                                                      Registration:
                                                   </span>
                                                   <span className="text-white">
                                                      {user.createdAt &&
                                                         format(
                                                            new Date(user.createdAt),
                                                            "PPpp"
                                                         )}
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </motion.div>
               )}
            </div>
         </motion.div>
      </div>
   );
};

export default UserApprovalPage;
