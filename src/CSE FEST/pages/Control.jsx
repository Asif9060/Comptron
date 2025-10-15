import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EVENT_DETAILS } from "../Registration/eventDetails";

const formatDateForInput = (value) => {
   const date = new Date(value);
   if (Number.isNaN(date.getTime())) {
      return "";
   }
   return date.toISOString().split("T")[0];
};

const formatDateTimeForInput = (value) => {
   const date = value instanceof Date ? value : new Date(value);
   if (Number.isNaN(date.getTime())) {
      return "";
   }

   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");

   return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const buildDefaultEventDates = () => {
   const defaults = {};
   Object.values(EVENT_DETAILS).forEach((event) => {
      defaults[event.slug] = {
         startDate: formatDateForInput(event.startDate),
         deadline: formatDateTimeForInput(event.deadline),
      };
   });
   return defaults;
};

const buildDefaultGamingSubEvents = () => ({
   valorant: {
      title: "Valorant",
      deadline: formatDateTimeForInput("2025-10-31T11:59:00+06:00"),
      platform: "PC",
      segment: "LAN Tournament",
   },
   fifa25: {
      title: "FIFA 25",
      deadline: formatDateTimeForInput("2025-10-31T11:59:00+06:00"),
      platform: "PC",
      segment: "LAN Tournament",
   },
   pubg: {
      title: "PUBG Mobile",
      deadline: formatDateTimeForInput("2025-10-31T11:59:00+06:00"),
      platform: "Mobile",
      segment: "Online Segment",
   },
   efootball: {
      title: "E-Football",
      deadline: formatDateTimeForInput("2025-10-31T11:59:00+06:00"),
      platform: "Mobile",
      segment: "Online Segment",
   },
});

const Control = () => {
   const [selectedEvent, setSelectedEvent] = useState("programming");
   const [loading, setLoading] = useState(false);
   const [saveSuccess, setSaveSuccess] = useState(false);

   // Main Events State
   const [eventDates, setEventDates] = useState(() => buildDefaultEventDates());

   // Gaming Sub-Events State
   const [gamingSubEvents, setGamingSubEvents] = useState(() =>
      buildDefaultGamingSubEvents()
   );

   const events = [
      {
         id: "programming",
         name: "Programming Contest",
         icon: "💻",
         gradient: "from-blue-500 to-cyan-500",
      },
      {
         id: "gaming",
         name: "Gaming Tournament",
         icon: "🎮",
         gradient: "from-orange-500 to-red-500",
      },
      {
         id: "project",
         name: "Project Showcase",
         icon: "🚀",
         gradient: "from-purple-500 to-pink-500",
      },
      {
         id: "poster-presentation",
         name: "Poster Presentation",
         icon: "💡",
         gradient: "from-yellow-500 to-orange-500",
      },
      {
         id: "datathon",
         name: "Datathon",
         icon: "📊",
         gradient: "from-green-500 to-emerald-500",
      },
   ];

   // Load current dates from backend on mount
   useEffect(() => {
      const loadEventDates = async () => {
         try {
            // Load main events from backend
            const eventsRes = await fetch(
               "https://comptron-server-2.onrender.com/api/event-control/events"
            );
            const eventsData = await eventsRes.json();

            if (eventsData.success && eventsData.count > 0 && eventsData.events) {
               const formattedDates = buildDefaultEventDates();

               Object.entries(eventsData.events).forEach(([slug, event]) => {
                  if (!formattedDates[slug]) {
                     formattedDates[slug] = {
                        startDate: "",
                        deadline: "",
                     };
                  }

                  if (event.startDate) {
                     formattedDates[slug].startDate = formatDateForInput(event.startDate);
                  }

                  if (event.deadline) {
                     formattedDates[slug].deadline = formatDateTimeForInput(
                        event.deadline
                     );
                  }
               });

               setEventDates(formattedDates);
            } else {
               setEventDates(buildDefaultEventDates());
            }

            // Load gaming sub-events from backend
            const gamesRes = await fetch(
               "https://comptron-server-2.onrender.com/api/event-control/gaming-sub-events"
            );
            const gamesData = await gamesRes.json();

            if (gamesData.success && gamesData.count > 0 && gamesData.games) {
               const formattedGames = buildDefaultGamingSubEvents();

               Object.entries(gamesData.games).forEach(([gameId, game]) => {
                  if (!formattedGames[gameId]) {
                     formattedGames[gameId] = {
                        title: "",
                        deadline: "",
                        platform: "",
                        segment: "",
                     };
                  }

                  if (game.title) {
                     formattedGames[gameId].title = game.title;
                  }

                  if (game.deadline) {
                     formattedGames[gameId].deadline = formatDateTimeForInput(
                        game.deadline
                     );
                  }

                  if (game.platform) {
                     formattedGames[gameId].platform = game.platform;
                  }

                  if (game.segment) {
                     formattedGames[gameId].segment = game.segment;
                  }
               });

               setGamingSubEvents(formattedGames);
            } else {
               setGamingSubEvents(buildDefaultGamingSubEvents());
            }
         } catch (error) {
            console.error("Error loading dates from backend:", error);
            // Fallback to static defaults if backend fails
            setEventDates(buildDefaultEventDates());
            setGamingSubEvents(buildDefaultGamingSubEvents());
         }
      };

      loadEventDates();
   }, []);

   const handleEventDateChange = (eventId, field, value) => {
      setEventDates((prev) => ({
         ...prev,
         [eventId]: {
            ...prev[eventId],
            [field]: value,
         },
      }));
      setSaveSuccess(false);
   };

   const handleGamingSubEventChange = (gameId, value) => {
      setGamingSubEvents((prev) => ({
         ...prev,
         [gameId]: {
            ...prev[gameId],
            deadline: value,
         },
      }));
      setSaveSuccess(false);
   };

   const handleSave = async () => {
      setLoading(true);
      setSaveSuccess(false);

      try {
         console.log("Saving event dates:", eventDates);
         console.log("Saving gaming sub-events:", gamingSubEvents);

         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/event-control/save-all",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  eventDates,
                  gamingSubEvents,
                  updatedBy: "admin", // Replace with actual admin username from auth context
               }),
            }
         );

         const data = await response.json();

         if (data.success) {
            setSaveSuccess(true);
            console.log("Update results:", data.results);

            // Show detailed success message
            const eventsUpdated = data.results.events.updated.length;
            const gamesUpdated = data.results.games.updated.length;
            const totalFailed =
               data.results.events.failed.length + data.results.games.failed.length;

            let message = `✅ Successfully updated ${eventsUpdated} event(s) and ${gamesUpdated} gaming sub-event(s)!`;
            if (totalFailed > 0) {
               message += `\n⚠️ ${totalFailed} item(s) failed to update.`;
            }

            alert(message);
         } else {
            throw new Error(data.message || "Failed to save changes");
         }
      } catch (error) {
         console.error("Error saving dates:", error);
         alert(
            "❌ Error saving dates: " +
               error.message +
               "\n\nPlease check console for details."
         );
      } finally {
         setLoading(false);
      }
   };

   const formatDisplayDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   const formatDisplayDateTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toLocaleString("en-US", {
         weekday: "short",
         year: "numeric",
         month: "short",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
         hour12: true,
      });
   };

   const getTimeRemaining = (deadline) => {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      const diff = deadlineDate - now;

      if (diff <= 0) return "Expired";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (days > 0) return `${days} days, ${hours} hours`;
      return `${hours} hours`;
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
                  CSE FEST Event Control Panel
               </h1>
               <p className="text-gray-300 text-lg">
                  Manage event dates, deadlines, and gaming sub-event schedules
               </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <motion.div
                  className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-blue-200 text-sm font-medium">Total Events</p>
                        <p className="text-white text-3xl font-bold">5</p>
                     </div>
                     <div className="bg-blue-500/20 p-3 rounded-lg">
                        <span className="text-2xl">🎯</span>
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-orange-200 text-sm font-medium">
                           Gaming Sub-Events
                        </p>
                        <p className="text-white text-3xl font-bold">4</p>
                     </div>
                     <div className="bg-orange-500/20 p-3 rounded-lg">
                        <span className="text-2xl">🎮</span>
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-green-200 text-sm font-medium">Status</p>
                        <p className="text-white text-xl font-bold">
                           {saveSuccess ? "Saved ✓" : "Ready"}
                        </p>
                     </div>
                     <div className="bg-green-500/20 p-3 rounded-lg">
                        <span className="text-2xl">{saveSuccess ? "✅" : "📝"}</span>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Event Selection */}
            <div className="mb-8">
               <h2 className="text-2xl font-bold text-white mb-4">Select Event</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {events.map((event) => (
                     <motion.button
                        key={event.id}
                        onClick={() => setSelectedEvent(event.id)}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                           selectedEvent === event.id
                              ? `bg-gradient-to-br ${event.gradient} text-white shadow-lg`
                              : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        <div className="flex flex-col items-center space-y-2">
                           <span className="text-3xl">{event.icon}</span>
                           <h3 className="font-semibold text-sm text-center">
                              {event.name}
                           </h3>
                        </div>
                     </motion.button>
                  ))}
               </div>
            </div>

            {/* Main Event Date Controls */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
               <h2 className="text-2xl font-bold text-white mb-6">
                  {events.find((e) => e.id === selectedEvent)?.name} - Date Management
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <div>
                     <label className="block text-gray-300 font-semibold mb-3">
                        Event Start Date
                     </label>
                     <input
                        type="date"
                        value={eventDates[selectedEvent]?.startDate || ""}
                        onChange={(e) =>
                           handleEventDateChange(
                              selectedEvent,
                              "startDate",
                              e.target.value
                           )
                        }
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                     />
                     <p className="text-gray-400 text-sm mt-2">
                        Display:{" "}
                        {formatDisplayDate(
                           eventDates[selectedEvent]?.startDate || "2025-11-10"
                        )}
                     </p>
                  </div>

                  {/* Deadline */}
                  <div>
                     <label className="block text-gray-300 font-semibold mb-3">
                        Registration Deadline
                     </label>
                     <input
                        type="datetime-local"
                        value={eventDates[selectedEvent]?.deadline || ""}
                        onChange={(e) =>
                           handleEventDateChange(
                              selectedEvent,
                              "deadline",
                              e.target.value
                           )
                        }
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                     />
                     <p className="text-gray-400 text-sm mt-2">
                        Display:{" "}
                        {formatDisplayDateTime(
                           eventDates[selectedEvent]?.deadline || "2025-10-31T23:59"
                        )}
                     </p>
                     <p className="text-orange-400 text-sm mt-1">
                        ⏱️ Time remaining:{" "}
                        {getTimeRemaining(
                           eventDates[selectedEvent]?.deadline || "2025-10-31T23:59"
                        )}
                     </p>
                  </div>
               </div>

               {/* Current Values Display */}
               <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Current Configuration</h3>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white font-medium">
                           {formatDisplayDate(
                              eventDates[selectedEvent]?.startDate || "2025-11-10"
                           )}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-400">Deadline:</span>
                        <span className="text-white font-medium">
                           {formatDisplayDateTime(
                              eventDates[selectedEvent]?.deadline || "2025-10-31T23:59"
                           )}
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Gaming Sub-Events Section */}
            {selectedEvent === "gaming" && (
               <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                     Gaming Sub-Events Deadline Management
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {Object.entries(gamingSubEvents).map(([gameId, game]) => (
                        <motion.div
                           key={gameId}
                           className="bg-gray-700 p-5 rounded-lg border border-gray-600"
                           whileHover={{ scale: 1.01 }}
                           transition={{ type: "spring", stiffness: 300 }}>
                           <div className="flex items-center justify-between mb-4">
                              <div>
                                 <h3 className="text-white font-bold text-lg">
                                    {game.title}
                                 </h3>
                                 <div className="flex gap-2 mt-1">
                                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                       {game.platform}
                                    </span>
                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                       {game.segment}
                                    </span>
                                 </div>
                              </div>
                              <span className="text-3xl">
                                 {gameId === "valorant"
                                    ? "🎯"
                                    : gameId === "fifa25"
                                    ? "⚽"
                                    : gameId === "pubg"
                                    ? "🔫"
                                    : "🎮"}
                              </span>
                           </div>

                           <div>
                              <label className="block text-gray-300 font-semibold mb-2 text-sm">
                                 Registration Deadline
                              </label>
                              <input
                                 type="datetime-local"
                                 value={game.deadline}
                                 onChange={(e) =>
                                    handleGamingSubEventChange(gameId, e.target.value)
                                 }
                                 className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                              />
                              <p className="text-gray-400 text-xs mt-2">
                                 {formatDisplayDateTime(game.deadline)}
                              </p>
                              <p className="text-orange-400 text-xs mt-1">
                                 ⏱️ {getTimeRemaining(game.deadline)}
                              </p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end gap-4">
               <motion.button
                  onClick={() => window.location.reload()}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                     />
                  </svg>
                  <span>Reset</span>
               </motion.button>

               <motion.button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}>
                  {loading ? (
                     <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Saving...</span>
                     </>
                  ) : (
                     <>
                        <svg
                           className="w-5 h-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                           />
                        </svg>
                        <span>Save All Changes</span>
                     </>
                  )}
               </motion.button>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
               <h3 className="text-blue-300 font-semibold mb-3 flex items-center">
                  <svg
                     className="w-5 h-5 mr-2"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
                  How to Use This Control Panel
               </h3>
               <ul className="text-blue-200 text-sm space-y-2 list-disc list-inside">
                  <li>
                     Select an event from the grid to manage its start date and
                     registration deadline
                  </li>
                  <li>
                     For the Gaming Tournament, you can also manage individual game
                     deadlines
                  </li>
                  <li>
                     All times are in GMT+6 (Bangladesh Time) - adjust accordingly for
                     your timezone
                  </li>
                  <li>
                     Changes are NOT saved automatically - click &quot;Save All
                     Changes&quot; button to apply
                  </li>
                  <li>
                     The &quot;Time remaining&quot; indicator shows how long until the
                     deadline expires
                  </li>
                  <li>
                     After saving, these dates will be reflected across all registration
                     pages
                  </li>
               </ul>
            </div>
         </motion.div>
      </div>
   );
};

export default Control;
