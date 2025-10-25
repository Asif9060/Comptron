import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and merge dynamic event dates from the Event Control API
 * with static event details.
 *
 * This ensures that dates updated via the Control Panel are reflected in real-time
 * across all event pages.
 */
export const useEventDates = (staticEventDetails) => {
   const [eventDetails, setEventDetails] = useState(staticEventDetails);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchDynamicDates = async () => {
         try {
            // Fetch event dates from the Event Control API
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/event-control/events"
            );

            if (response.ok) {
               const data = await response.json();
               console.log("📥 API Response:", data);

               if (data.success && data.events) {
                  // Merge dynamic dates with static event details
                  const updatedDetails = { ...staticEventDetails };

                  Object.keys(updatedDetails).forEach((key) => {
                     const eventSlug = updatedDetails[key].slug;
                     const dynamicEvent = data.events[eventSlug];

                     console.log(`🔍 Checking event: ${key}, slug: ${eventSlug}`);
                     console.log(`   Dynamic data:`, dynamicEvent);

                     if (dynamicEvent) {
                        // Override static dates with dynamic dates from database
                        updatedDetails[key] = {
                           ...updatedDetails[key],
                           deadline: dynamicEvent.deadline,
                           startDate: formatStartDate(dynamicEvent.startDate),
                           // Add additional dynamic fields
                           isRegistrationOpen: dynamicEvent.isRegistrationOpen,
                           hasStarted: dynamicEvent.hasStarted,
                           timeRemaining: dynamicEvent.timeRemaining,
                        };
                        console.log(`   ✅ Updated ${key}:`, {
                           deadline: dynamicEvent.deadline,
                           startDate: formatStartDate(dynamicEvent.startDate),
                        });
                     } else {
                        console.warn(`   ⚠️ No dynamic data found for ${eventSlug}`);
                     }
                  });

                  setEventDetails(updatedDetails);
                  console.log("✅ Dynamic event dates loaded successfully");
                  console.log("📊 Final event details:", updatedDetails);
               } else {
                  console.warn("⚠️ API response missing success or events:", data);
               }
            } else {
               console.warn(`❌ API fetch failed with status: ${response.status}`);
               const text = await response.text();
               console.warn("Response:", text);
            }
         } catch (error) {
            console.error("❌ Error fetching dynamic event dates:", error);
            console.warn("Using static event dates as fallback");
         } finally {
            setLoading(false);
         }
      };

      fetchDynamicDates();
   }, [staticEventDetails]);

   return { eventDetails, loading };
};

/**
 * Format startDate from ISO string to display format
 * Example: "2025-11-10T00:00:00.000Z" → "10 November 2025"
 */
const formatStartDate = (isoString) => {
   const date = new Date(isoString);
   return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
   }).format(date);
};

/**
 * Hook for gaming sub-events to get dynamic deadlines
 */
export const useGamingSubEvents = (staticGames) => {
   const [games, setGames] = useState(staticGames);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchGamingDates = async () => {
         try {
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/event-control/gaming-sub-events"
            );

            if (response.ok) {
               const data = await response.json();
               console.log("🎮 Gaming API Response:", data);

               if (data.success && data.games) {
                  // Merge dynamic deadlines with static game details
                  const updatedGames = staticGames.map((game) => {
                     const dynamicGame = data.games[game.id];

                     console.log(`🔍 Checking game: ${game.id}`);
                     console.log(`   Dynamic data:`, dynamicGame);

                     if (dynamicGame) {
                        const updated = {
                           ...game,
                           deadline: dynamicGame.deadline,
                           isRegistrationOpen: dynamicGame.isRegistrationOpen,
                           timeRemaining: dynamicGame.timeRemaining,
                           schedule: dynamicGame.schedule
                              ? {
                                   ...(game.schedule || {}),
                                   ...dynamicGame.schedule,
                                }
                              : game.schedule,
                        };

                        console.log(`   ✅ Updated ${game.id}:`, {
                           deadline: dynamicGame.deadline,
                           schedule: dynamicGame.schedule,
                        });
                        return updated;
                     }

                     console.warn(`   ⚠️ No dynamic data found for ${game.id}`);
                     return game;
                  });

                  setGames(updatedGames);
                  console.log("✅ Dynamic gaming sub-event dates loaded successfully");
                  console.log("🎮 Final games:", updatedGames);
               } else {
                  console.warn("⚠️ Gaming API response missing success or games:", data);
               }
            } else {
               console.warn(`❌ Gaming API fetch failed with status: ${response.status}`);
               const text = await response.text();
               console.warn("Response:", text);
            }
         } catch (error) {
            console.error("❌ Error fetching gaming sub-event dates:", error);
            console.warn("Using static gaming dates as fallback");
         } finally {
            setLoading(false);
         }
      };

      fetchGamingDates();
   }, [staticGames]);

   return { games, loading };
};
