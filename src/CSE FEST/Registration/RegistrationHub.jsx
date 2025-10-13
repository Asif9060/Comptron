import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { EVENT_ARRAY } from "./eventDetails";
import LoadingScreen from "./LoadingScreen";

const RegistrationHub = () => {
   const navigate = useNavigate();
   const [hoveredCard, setHoveredCard] = useState(null);
   const [isMobileViewport, setIsMobileViewport] = useState(false);
   const shouldReduceMotion = useReducedMotion();
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
   const eventRegistrations = useMemo(
      () =>
         EVENT_ARRAY.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.tagline,
            icon: event.icon,
            gradient: event.gradient,
            buttonGradient: event.buttonGradient,
            pagePath: event.pagePath,
            startDate: event.startDate,
         })),
      []
   );

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
                     className="flex flex-wrap items-end justify-between gap-6">
                     <motion.div
                        variants={enableScrollAnimation ? containerVariants : undefined}
                        className="space-y-3"
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
                           className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
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
                           className="max-w-3xl text-base leading-relaxed text-gray-300"
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
                        className="flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-[#FFE7C2] backdrop-blur"
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
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#F6A623]">
                           <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                           Starting date
                        </span>
                        <p className="text-base font-semibold leading-relaxed text-[#FFE7C2]">
                           Mark your calendars! ⚡ CSE FEST 2025 begins November 10–11!
                        </p>
                        <p className="text-xs text-gray-300/80">
                           Gaming matches open 10 November, while the Datathon kicks off 3
                           November for the overnight analytics sprint.
                        </p>
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
                     {eventRegistrations.map((event, index) => (
                        <motion.button
                           key={event.id}
                           type="button"
                           onClick={() => handleRegistration(event)}
                           onMouseEnter={() => setHoveredCard(event.id)}
                           onMouseLeave={() => setHoveredCard(null)}
                           className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                              hoveredCard === event.id
                                 ? "shadow-2xl shadow-[#F6A623]/10"
                                 : "shadow-lg shadow-black/20"
                           }`}
                           variants={cardVariants}
                           custom={index}
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
                           <div className="relative flex items-start gap-5">
                              <motion.div
                                 className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${event.gradient} text-3xl`}
                                 layoutId={`event-icon-${event.id}`}
                                 animate={{
                                    scale:
                                       hoveredCard === event.id && !shouldReduceMotion
                                          ? 1.1
                                          : 1,
                                    rotate:
                                       hoveredCard === event.id && !shouldReduceMotion
                                          ? 2
                                          : 0,
                                 }}
                                 transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 20,
                                 }}>
                                 {event.icon}
                              </motion.div>
                              <div className="space-y-3">
                                 <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#F6A623]/80">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                                    Open event
                                 </div>
                                 <h3 className="text-2xl font-bold text-white">
                                    {event.title}
                                 </h3>
                                 <p className="text-sm leading-relaxed text-gray-300">
                                    {event.description}
                                 </p>
                                 {event.startDate && (
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#FFE7C2]">
                                       <span className="uppercase tracking-[0.35em] text-[#F6A623]/90">
                                          Starts
                                       </span>
                                       <span className="inline-flex items-center gap-2 rounded-full bg-[#F6A623]/10 px-3 py-1 text-xs text-[#FFE7C2] ring-1 ring-[#F6A623]/40">
                                          <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623]"></span>
                                          {event.startDate}
                                       </span>
                                       {event.id === 2 && (
                                          <span className="text-[0.7rem] font-medium text-gray-300/90">
                                             Opening showcases run across LAN pods.
                                          </span>
                                       )}
                                       {event.id === 5 && (
                                          <span className="text-[0.7rem] font-medium text-gray-300/90">
                                             Dedicated analytics sprint begins next day.
                                          </span>
                                       )}
                                    </div>
                                 )}
                              </div>
                           </div>
                           <div className="relative mt-6 flex items-center justify-end text-sm font-semibold">
                              <span className="text-[#F6A623]">
                                 Explore event details
                              </span>
                              <motion.svg
                                 className="h-5 w-5"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                                 animate={{
                                    x:
                                       hoveredCard === event.id && !shouldReduceMotion
                                          ? 4
                                          : 0,
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
                     ))}
                  </motion.div>
               </section>
            </div>
         </div>
      </LoadingScreen>
   );
};

export default RegistrationHub;
