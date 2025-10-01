import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SimpleGoogleFormConfig from "../Components/SimpleGoogleFormConfig";

const CseFestAdmin = () => {
   const [selectedEvent, setSelectedEvent] = useState("programming");
   const [registrations, setRegistrations] = useState([]);
   const [loading, setLoading] = useState(false);
   const [stats, setStats] = useState({
      totalRegistrations: 0,
      programmingRegistrations: 0,
      completedRegistrations: 0,
   });
   const [googleFormConfig, setGoogleFormConfig] = useState({
      formUrl: "",
      fields: [],
   });
   const [showGoogleFormSetup, setShowGoogleFormSetup] = useState(false);

   const events = [
      {
         id: "programming",
         name: "Programming Contest",
         icon: "💻",
         description: "ICPC-style programming competition",
      },
      // Future events can be added here
   ];

   const fetchRegistrations = useCallback(async () => {
      setLoading(true);
      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/csefest/${selectedEvent}/registrations`
         );
         if (response.ok) {
            const data = await response.json();
            setRegistrations(data);
         }
      } catch (error) {
         console.error("Error fetching registrations:", error);
      } finally {
         setLoading(false);
      }
   }, [selectedEvent]);

   const fetchStats = useCallback(async () => {
      try {
         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/csefest/stats"
         );
         if (response.ok) {
            const data = await response.json();
            setStats(data);
         }
      } catch (error) {
         console.error("Error fetching stats:", error);
      }
   }, []);

   const fetchGoogleFormConfig = useCallback(async () => {
      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/csefest/${selectedEvent}/google-form-config`
         );
         if (response.ok) {
            const data = await response.json();
            setGoogleFormConfig(data);
         }
      } catch (error) {
         console.error("Error fetching Google Form config:", error);
      }
   }, [selectedEvent]);

   const saveGoogleFormConfig = async (config) => {
      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/csefest/${selectedEvent}/google-form-config`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(config),
            }
         );

         if (response.ok) {
            setGoogleFormConfig(config);
            alert("Google Form configuration saved successfully!");
         } else {
            throw new Error("Failed to save configuration");
         }
      } catch (error) {
         console.error("Error saving Google Form config:", error);
         alert("Error saving configuration. Please try again.");
      }
   };

   useEffect(() => {
      const loadData = async () => {
         await Promise.all([fetchRegistrations(), fetchStats(), fetchGoogleFormConfig()]);
      };
      loadData();
   }, [fetchRegistrations, fetchStats, fetchGoogleFormConfig]);

   const downloadRegistrations = () => {
      if (registrations.length === 0) return;

      const csvContent = [
         [
            "Team Name",
            "Captain",
            "Member 2",
            "Member 3",
            "University",
            "Email",
            "Phone",
            "Registration Date",
         ],
         ...registrations.map((reg) => [
            reg.teamName,
            reg.member1,
            reg.member2,
            reg.member3,
            reg.university,
            reg.email,
            reg.phone,
            new Date(reg.registrationDate).toLocaleDateString(),
         ]),
      ]
         .map((row) => row.join(","))
         .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedEvent}_registrations.csv`;
      link.click();
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#16213e] text-white p-8">
         <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  CSE FEST Management
               </h1>
               <p className="text-gray-300 text-lg">
                  Manage CSE FEST events, registrations, and participant data
               </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <motion.div
                  className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-orange-100 text-sm font-medium">
                           Total Registrations
                        </p>
                        <p className="text-white text-3xl font-bold">
                           {stats.totalRegistrations}
                        </p>
                     </div>
                     <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">📊</span>
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-blue-100 text-sm font-medium">
                           Programming Contest
                        </p>
                        <p className="text-white text-3xl font-bold">
                           {stats.programmingRegistrations}
                        </p>
                     </div>
                     <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">💻</span>
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-green-100 text-sm font-medium">Completed</p>
                        <p className="text-white text-3xl font-bold">
                           {stats.completedRegistrations}
                        </p>
                     </div>
                     <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">✅</span>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Event Selection */}
            <div className="mb-8">
               <h2 className="text-2xl font-bold text-white mb-4">Select Event</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {events.map((event) => (
                     <motion.button
                        key={event.id}
                        onClick={() => setSelectedEvent(event.id)}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                           selectedEvent === event.id
                              ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg"
                              : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        <div className="flex items-center space-x-3">
                           <span className="text-2xl">{event.icon}</span>
                           <div>
                              <h3 className="font-semibold">{event.name}</h3>
                              <p className="text-sm opacity-80">{event.description}</p>
                           </div>
                        </div>
                     </motion.button>
                  ))}
               </div>
            </div>

            {/* Google Forms Setup */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                     Google Forms Integration -{" "}
                     {events.find((e) => e.id === selectedEvent)?.name}
                  </h2>
                  <button
                     onClick={() => setShowGoogleFormSetup(!showGoogleFormSetup)}
                     className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                     <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                     </svg>
                     <span>
                        {showGoogleFormSetup ? "Hide Setup" : "Setup Google Form"}
                     </span>
                  </button>
               </div>

               {showGoogleFormSetup && (
                  <div className="bg-gray-700 rounded-lg p-6">
                     <div className="mb-4">
                        <p className="text-gray-300 mb-4">
                           Configure Google Forms integration for the{" "}
                           {events.find((e) => e.id === selectedEvent)?.name} event. Enter
                           your form URL and manually add the entry IDs for each field.
                        </p>
                     </div>

                     <SimpleGoogleFormConfig
                        initialConfig={googleFormConfig}
                        onSave={(config) => saveGoogleFormConfig(config)}
                     />
                  </div>
               )}

               {!showGoogleFormSetup && googleFormConfig.formUrl && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                     <div className="flex items-center space-x-3">
                        <svg
                           className="w-6 h-6 text-green-400"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                        <div>
                           <h4 className="text-green-400 font-semibold">
                              Google Forms Integration Active
                           </h4>
                           <p className="text-green-300 text-sm">
                              {googleFormConfig.fields?.length || 0} field(s) configured.
                              Registrations will be submitted to Google Forms.
                           </p>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Registrations Management */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                     {events.find((e) => e.id === selectedEvent)?.name} Registrations
                  </h2>
                  <button
                     onClick={downloadRegistrations}
                     disabled={registrations.length === 0}
                     className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                     <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                     </svg>
                     <span>Download CSV</span>
                  </button>
               </div>

               {loading ? (
                  <div className="flex justify-center items-center py-12">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                     <span className="ml-3 text-gray-300">Loading registrations...</span>
                  </div>
               ) : registrations.length === 0 ? (
                  <div className="text-center py-12">
                     <div className="text-6xl mb-4">📝</div>
                     <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        No Registrations Yet
                     </h3>
                     <p className="text-gray-400">
                        Registrations will appear here once teams start signing up.
                     </p>
                  </div>
               ) : (
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-gray-700">
                              <th className="pb-3 text-gray-300 font-semibold">
                                 Team Name
                              </th>
                              <th className="pb-3 text-gray-300 font-semibold">
                                 Captain
                              </th>
                              <th className="pb-3 text-gray-300 font-semibold">
                                 Members
                              </th>
                              <th className="pb-3 text-gray-300 font-semibold">
                                 University
                              </th>
                              <th className="pb-3 text-gray-300 font-semibold">
                                 Contact
                              </th>
                              <th className="pb-3 text-gray-300 font-semibold">Date</th>
                           </tr>
                        </thead>
                        <tbody>
                           {registrations.map((registration, index) => (
                              <motion.tr
                                 key={index}
                                 className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.1 }}>
                                 <td className="py-4 text-white font-medium">
                                    {registration.teamName}
                                 </td>
                                 <td className="py-4 text-gray-300">
                                    {registration.member1}
                                 </td>
                                 <td className="py-4 text-gray-300">
                                    <div className="text-sm">
                                       <div>{registration.member2}</div>
                                       <div>{registration.member3}</div>
                                    </div>
                                 </td>
                                 <td className="py-4 text-gray-300">
                                    {registration.university}
                                 </td>
                                 <td className="py-4 text-gray-300">
                                    <div className="text-sm">
                                       <div>{registration.email}</div>
                                       <div>{registration.phone}</div>
                                    </div>
                                 </td>
                                 <td className="py-4 text-gray-300">
                                    {new Date(
                                       registration.registrationDate
                                    ).toLocaleDateString()}
                                 </td>
                              </motion.tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         </motion.div>
      </div>
   );
};

export default CseFestAdmin;
