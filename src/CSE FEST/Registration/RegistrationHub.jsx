import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { EVENT_DETAILS } from "./eventDetails";
import { useEventDates } from "./useEventDates";
import LoadingScreen from "./LoadingScreen";
import RegistrationFooter from "./RegistrationFooter";

const getTimeRemaining = (deadlineDate) => {
   if (!deadlineDate) {
      return null;
   }

   const timestamp = deadlineDate.getTime?.();
   if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return null;
   }

   const totalMs = timestamp - Date.now();
   const clampedMs = Math.max(totalMs, 0);
   const secondMs = 1000;
   const minuteMs = secondMs * 60;
   const hourMs = minuteMs * 60;
   const dayMs = hourMs * 24;

   const days = Math.floor(clampedMs / dayMs);
   const hours = Math.floor((clampedMs % dayMs) / hourMs);
   const minutes = Math.floor((clampedMs % hourMs) / minuteMs);
   const seconds = Math.floor((clampedMs % minuteMs) / secondMs);

   return {
      totalMs,
      days,
      hours,
      minutes,
      seconds,
      isExpired: totalMs <= 0,
   };
};

const RegistrationHub = () => {
   const navigate = useNavigate();
   const [hoveredCard, setHoveredCard] = useState(null);
   const [isMobileViewport, setIsMobileViewport] = useState(false);
   const shouldReduceMotion = useReducedMotion();
   const { eventDetails } = useEventDates(EVENT_DETAILS);
   const containerVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 48,
         },
         visible: {
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.7,
               ease: [0.16, 1, 0.3, 1],
            },
         },
      }),
      [shouldReduceMotion]
   );
   const cardVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 28,
            scale: shouldReduceMotion ? 1 : 0.96,
         },
         visible: (index = 0) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
               duration: 0.6,
               ease: [0.16, 1, 0.3, 1],
               delay: shouldReduceMotion ? 0 : index * 0.08,
            },
         }),
      }),
      [shouldReduceMotion]
   );
   const normalizedEvents = useMemo(
      () => Object.values(eventDetails || EVENT_DETAILS),
      [eventDetails]
   );

   const eventRegistrations = useMemo(
      () =>
         normalizedEvents.map((event) => ({
            id: event.id,
            slug: event.slug,
            title: event.title,
            description: event.tagline,
            icon: event.icon,
            gradient: event.gradient,
            buttonGradient: event.buttonGradient,
            pagePath: event.pagePath,
            startDate: event.startDate,
            deadline: event.deadline,
         })),
      [normalizedEvents]
   );

   const orderedRegistrations = useMemo(() => {
      const gamingEvent = eventRegistrations.find((event) => event.slug === "gaming");
      const remainingEvents = eventRegistrations.filter(
         (event) => event.slug !== "gaming"
      );
      if (!gamingEvent) {
         return eventRegistrations;
      }
      return [...remainingEvents, gamingEvent];
   }, [eventRegistrations]);

   const primaryEvents = useMemo(
      () => orderedRegistrations.slice(0, 3),
      [orderedRegistrations]
   );
   const secondaryEvents = useMemo(
      () => orderedRegistrations.slice(3),
      [orderedRegistrations]
   );

   const upcomingDeadline = useMemo(() => {
      const now = Date.now();
      const datedEvents = orderedRegistrations
         .filter(
            (event) =>
               Boolean(event.deadline) &&
               event.slug !== "programming" &&
               event.slug !== "project"
         )
         .map((event) => {
            const date = new Date(event.deadline);
            if (Number.isNaN(date.getTime())) {
               return null;
            }
            return { event, date, timestamp: date.getTime() };
         })
         .filter(Boolean);

      if (datedEvents.length === 0) {
         return null;
      }

      const upcoming = datedEvents.filter((item) => item.timestamp > now);
      if (upcoming.length > 0) {
         return upcoming.reduce((earliest, current) =>
            current.timestamp < earliest.timestamp ? current : earliest
         );
      }

      return datedEvents.reduce((earliest, current) =>
         current.timestamp < earliest.timestamp ? current : earliest
      );
   }, [orderedRegistrations]);

   const [countdown, setCountdown] = useState(() =>
      getTimeRemaining(upcomingDeadline?.date)
   );

   useEffect(() => {
      const deadlineDate = upcomingDeadline?.date;
      if (!deadlineDate) {
         setCountdown(null);
         return undefined;
      }

      setCountdown(getTimeRemaining(deadlineDate));

      if (typeof window === "undefined") {
         return undefined;
      }

      const interval = window.setInterval(() => {
         setCountdown(getTimeRemaining(deadlineDate));
      }, 1000);

      return () => window.clearInterval(interval);
   }, [upcomingDeadline]);

   useEffect(() => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
         return undefined;
      }

      const mediaQuery = window.matchMedia("(max-width: 640px)");
      const handleChange = (event) => {
         setIsMobileViewport(event.matches);
      };

      setIsMobileViewport(mediaQuery.matches);

      if (typeof mediaQuery.addEventListener === "function") {
         mediaQuery.addEventListener("change", handleChange);
         return () => mediaQuery.removeEventListener("change", handleChange);
      }

      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
   }, []);

   const enableScrollAnimation = !isMobileViewport && !shouldReduceMotion;

   const handleRegistration = (event) => {
      if (event.pagePath) {
         navigate(event.pagePath);
      }
   };

   const renderEventCard = (event, animationIndex) => (
      <motion.button
         key={event.id}
         type="button"
         onClick={() => handleRegistration(event)}
         onMouseEnter={() => setHoveredCard(event.id)}
         onMouseLeave={() => setHoveredCard(null)}
         className={`group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
            hoveredCard === event.id
               ? "shadow-2xl shadow-[#F6A623]/10"
               : "shadow-lg shadow-black/20"
         }`}
         variants={cardVariants}
         custom={animationIndex}
         whileHover={{ scale: shouldReduceMotion ? 1 : 1.015 }}
         whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
         transition={{ type: "spring", stiffness: 260, damping: 24 }}>
         <motion.span
            className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredCard === event.id ? 0.35 : 0 }}
            transition={{
               duration: 0.4,
               ease: "easeOut",
            }}></motion.span>
         <div className="relative flex items-start gap-6">
            <motion.div
               className={`relative flex aspect-square w-15 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r ${event.gradient}`}
               layoutId={`event-icon-${event.id}`}
               animate={{
                  scale: hoveredCard === event.id && !shouldReduceMotion ? 1.1 : 1,
                  rotate: hoveredCard === event.id && !shouldReduceMotion ? 2 : 0,
               }}
               transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
               }}>
               <span className="relative text-3xl leading-none">{event.icon}</span>
            </motion.div>
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#F6A623]/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                  Open event
               </div>
               <h3 className="text-2xl font-bold text-white">{event.title}</h3>
               <p className="text-sm leading-relaxed text-gray-300">
                  {event.description}
               </p>
            </div>
         </div>
         <div className="relative mt-6 flex items-center justify-end text-sm font-semibold">
            <span className="text-[#F6A623]">Explore event details</span>
            <motion.svg
               className="h-5 w-5"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               animate={{
                  x: hoveredCard === event.id && !shouldReduceMotion ? 4 : 0,
               }}
               transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
               }}>
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
               />
            </motion.svg>
         </div>
      </motion.button>
   );

   return (
      <LoadingScreen>
         <div className="relative min-h-screen overflow-hidden text-white">
            <div className="absolute inset-0 z-0">
               <div
                  className="absolute inset-0"
                  style={{
                     background:
                        "radial-gradient(ellipse at top, #1e3a8a 0%, #1e3a5f 20%, #0f172a 40%, #020617 60%, #000000 100%)",
                     backgroundSize: "100% 100%",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                  }}></div>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c1535]/30 to-[#0f172a]/80"></div>
            </div>

            <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="pointer-events-none absolute bottom-[-280px] right-[-120px] z-0 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[220px]"></div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
               <header className="headres mb-14 flex flex-col items-center gap-4 text-center">
                  <motion.img
                     src="/logos/feest.png"
                     alt="CSE Fest logo"
                     className="h-24 w-48 max-w-full rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl shadow-[#F6A623]/20 backdrop-blur"
                     initial={
                        enableScrollAnimation
                           ? { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }
                           : false
                     }
                     whileInView={
                        enableScrollAnimation ? { opacity: 1, scale: 1 } : undefined
                     }
                     viewport={enableScrollAnimation ? { once: true } : undefined}
                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.p
                     className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#FFE7C2] backdrop-blur"
                     initial={
                        enableScrollAnimation
                           ? { opacity: 0, y: shouldReduceMotion ? 0 : 18 }
                           : false
                     }
                     whileInView={
                        enableScrollAnimation ? { opacity: 1, y: 0 } : undefined
                     }
                     viewport={enableScrollAnimation ? { once: true } : undefined}
                     transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: shouldReduceMotion ? 0 : 0.05,
                     }}>
                     <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                     10 & 11 November
                     <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                  </motion.p>
               </header>
               <section>
                  <motion.div
                     variants={enableScrollAnimation ? containerVariants : undefined}
                     initial={enableScrollAnimation ? "hidden" : false}
                     whileInView={enableScrollAnimation ? "visible" : undefined}
                     viewport={
                        enableScrollAnimation
                           ? { once: true, margin: "-100px" }
                           : undefined
                     }
                     className="flex flex-col items-center gap-10 text-center">
                     <motion.div
                        variants={enableScrollAnimation ? containerVariants : undefined}
                        className="space-y-3 max-w-2xl text-center"
                        transition={{ delay: 0.05 }}>
                        <motion.p
                           className="text-sm uppercase tracking-[0.3em] text-[#F6A623]/80"
                           initial={
                              enableScrollAnimation
                                 ? { opacity: 0, y: shouldReduceMotion ? 0 : 16 }
                                 : false
                           }
                           whileInView={
                              enableScrollAnimation ? { opacity: 1, y: 0 } : undefined
                           }
                           viewport={enableScrollAnimation ? { once: true } : undefined}
                           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                           Event lineup
                        </motion.p>
                        <motion.h2
                           className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center"
                           initial={
                              enableScrollAnimation
                                 ? { opacity: 0, y: shouldReduceMotion ? 0 : 20 }
                                 : false
                           }
                           whileInView={
                              enableScrollAnimation ? { opacity: 1, y: 0 } : undefined
                           }
                           viewport={enableScrollAnimation ? { once: true } : undefined}
                           transition={{
                              duration: 0.7,
                              ease: [0.16, 1, 0.3, 1],
                              delay: shouldReduceMotion ? 0 : 0.05,
                           }}>
                           Choose your challenge
                        </motion.h2>
                        <motion.p
                           className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300 text-center"
                           initial={
                              enableScrollAnimation
                                 ? { opacity: 0, y: shouldReduceMotion ? 0 : 24 }
                                 : false
                           }
                           whileInView={
                              enableScrollAnimation ? { opacity: 1, y: 0 } : undefined
                           }
                           viewport={enableScrollAnimation ? { once: true } : undefined}
                           transition={{
                              duration: 0.7,
                              ease: [0.16, 1, 0.3, 1],
                              delay: shouldReduceMotion ? 0 : 0.1,
                           }}>
                           Dive into competitions designed for coders, builders,
                           strategists, and creative minds. Each event brings its own
                           twist—select the arena that fits your skillset.
                        </motion.p>
                     </motion.div>
                     <motion.div
                        className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl border border-white/12 bg-white/8 px-10 py-8 text-base text-[#FFE7C2] shadow-[0_30px_80px_rgba(8,8,35,0.45)] backdrop-blur"
                        initial={
                           enableScrollAnimation
                              ? { opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }
                              : false
                        }
                        whileInView={
                           enableScrollAnimation ? { opacity: 1, scale: 1 } : undefined
                        }
                        viewport={enableScrollAnimation ? { once: true } : undefined}
                        transition={{
                           duration: 0.6,
                           ease: [0.16, 1, 0.3, 1],
                           delay: shouldReduceMotion ? 0 : 0.15,
                        }}>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.45em] text-[#F6A623]">
                           <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                           Registration Deadline
                        </span>
                        {upcomingDeadline ? (
                           <>
                              <div className="flex flex-col items-center gap-3 text-center">
                                 {/* {upcomingDeadline.event?.title && (
                                   <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7C2]/80">
                                      <span
                                         className="relative inline-flex h-3 w-3 items-center justify-center"
                                         aria-hidden="true">
                                         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/40"></span>
                                         <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.7)]"></span>
                                      </span>
                                      {upcomingDeadline.event.title}
                                   </span>
                                )} */}
                                 <p className="text-lg font-semibold leading-relaxed text-[#FFE7C2]">
                                    
                                    {upcomingDeadline.date.toLocaleString("en-US", {
                                       month: "long",
                                       day: "numeric",
                                       year: "numeric",
                                    })}
                                 </p>
                              </div>
                              {countdown ? (
                                 <>
                                    <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#FFE7C2]/80">
                                       Days Left
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center gap-5">
                                       {["days", "hours", "minutes", "seconds"].map(
                                          (unit) => (
                                             <div
                                                key={unit}
                                                className="flex min-w-[88px] flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#FFE7C2] shadow-[0_16px_38px_rgba(8,8,35,0.45)]">
                                                <span className="text-3xl font-black text-white">
                                                   {String(countdown[unit]).padStart(
                                                      2,
                                                      "0"
                                                   )}
                                                </span>
                                                <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[#F6A623]/85">
                                                   {unit}
                                                </span>
                                             </div>
                                          )
                                       )}
                                    </div>
                                 </>
                              ) : (
                                 <p className="text-sm text-gray-300/80">
                                    Countdown unavailable at the moment.
                                 </p>
                              )}
                              {countdown?.isExpired && (
                                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                                    Registration closed — stay tuned for next updates
                                 </p>
                              )}
                           </>
                        ) : (
                           <p className="text-sm text-gray-300/80">
                              No deadlines published yet. Check back soon!
                           </p>
                        )}
                     </motion.div>
                  </motion.div>

                  <motion.div
                     className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                     initial={enableScrollAnimation ? "hidden" : false}
                     whileInView={enableScrollAnimation ? "visible" : undefined}
                     viewport={
                        enableScrollAnimation ? { once: true, amount: 0.2 } : undefined
                     }
                     variants={enableScrollAnimation ? containerVariants : undefined}>
                     {primaryEvents.map((event, index) => renderEventCard(event, index))}
                  </motion.div>

                  {secondaryEvents.length > 0 && (
                     <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-6"
                        initial={enableScrollAnimation ? "hidden" : false}
                        whileInView={enableScrollAnimation ? "visible" : undefined}
                        viewport={
                           enableScrollAnimation ? { once: true, amount: 0.2 } : undefined
                        }
                        variants={enableScrollAnimation ? containerVariants : undefined}>
                        {secondaryEvents.map((event, index) =>
                           renderEventCard(event, primaryEvents.length + index)
                        )}
                     </motion.div>
                  )}
               </section>
            </div>
         </div>
         <RegistrationFooter />
      </LoadingScreen>
   );
};

export default RegistrationHub;
