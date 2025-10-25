import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RegistrationFooter from "./RegistrationFooter";

const getTimeLeft = (deadline) => {
   const deadlineDate = new Date(deadline);
   const total = deadlineDate.getTime() - Date.now();

   if (Number.isNaN(deadlineDate.getTime())) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
   }

   const safeTotal = Math.max(total, 0);

   const days = Math.floor(safeTotal / (1000 * 60 * 60 * 24));
   const hours = Math.floor((safeTotal / (1000 * 60 * 60)) % 24);
   const minutes = Math.floor((safeTotal / (1000 * 60)) % 60);
   const seconds = Math.floor((safeTotal / 1000) % 60);

   return { total: safeTotal, days, hours, minutes, seconds };
};

const formatDeadline = (deadline) => {
   const deadlineDate = new Date(deadline);
   if (Number.isNaN(deadlineDate.getTime())) {
      return "To be announced";
   }

   return new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "numeric",
      // minute: "2-digit",
      hour12: true,
   }).format(deadlineDate);
};

const EventRegistrationTemplate = ({ event }) => {
   const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(event.deadline));
   const navigate = useNavigate();
   const shouldReduceMotion = useReducedMotion();

   const heroVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 40,
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

   const countdownVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 16,
         },
         visible: (index = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.4,
               ease: [0.16, 1, 0.3, 1],
               delay: shouldReduceMotion ? 0 : index * 0.05,
            },
         }),
      }),
      [shouldReduceMotion]
   );

   const buttonVariants = useMemo(
      () => ({
         hover: shouldReduceMotion
            ? {}
            : {
                 y: -6,
                 boxShadow: "0 20px 40px rgba(246, 166, 35, 0.18)",
                 transition: { type: "spring", stiffness: 240, damping: 18 },
              },
         tap: shouldReduceMotion
            ? {}
            : {
                 scale: 0.97,
                 transition: { type: "spring", stiffness: 500, damping: 35 },
              },
      }),
      [shouldReduceMotion]
   );

   useEffect(() => {
      setTimeLeft(getTimeLeft(event.deadline));
      const timer = setInterval(() => {
         setTimeLeft(getTimeLeft(event.deadline));
      }, 1000);

      return () => clearInterval(timer);
   }, [event.deadline]);

   const deadlineLabel = useMemo(() => formatDeadline(event.deadline), [event.deadline]);
   const isDeadlinePassed = timeLeft.total <= 0;

   const handleBack = () => {
      navigate("/CseFest/registration");
   };

   return (
      <>
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

            <div className="pointer-events-none absolute -top-48 left-1/2 z-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="pointer-events-none absolute bottom-[-260px] right-[-120px] z-0 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[220px]"></div>

            <motion.div
               className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-12 px-6 py-20 text-center lg:px-10"
               variants={heroVariants}
               initial="hidden"
               animate="visible">
               <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.button
                     type="button"
                     onClick={handleBack}
                     className="group relative mx-auto inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-0.5 py-0.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                     whileHover={
                        shouldReduceMotion
                           ? undefined
                           : { x: -4, boxShadow: "0 16px 36px rgba(246, 166, 35, 0.28)" }
                     }
                     whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}>
                     <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F6A623] via-[#facc15] to-[#fb923c] transition-transform duration-500 group-hover:scale-105"></span>
                     <span className="absolute inset-0 rounded-full bg-[#F6A623]/40 opacity-0 blur-md transition-opacity duration-400 group-hover:opacity-60"></span>
                     <span className="relative inline-flex items-center gap-2 rounded-full bg-[#0B1220]/90 px-6 py-2 text-[0.95rem] text-[#FFE7C2] shadow-[0_18px_40px_rgba(246,166,35,0.32)] transition-colors duration-300 group-hover:bg-[#121f34]/90">
                        <svg
                           className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7 7-7"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12h18"
                           />
                        </svg>
                        Back to registrations
                     </span>
                  </motion.button>
               </motion.div>
               <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     duration: 0.65,
                     ease: [0.16, 1, 0.3, 1],
                     delay: shouldReduceMotion ? 0 : 0.1,
                  }}>
                  <motion.span
                     className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${event.gradient} text-4xl shadow-lg shadow-black/30`}
                     aria-hidden="true"
                     initial={{ scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                     {event.icon}
                  </motion.span>
                  <motion.div
                     className="space-y-4"
                     initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: shouldReduceMotion ? 0 : 0.12,
                     }}>
                     <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {event.title}
                     </h1>
                     <p className="text-xl font-semibold text-[#F6A623] sm:text-2xl">
                        {event.tagline}
                     </p>
                     <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
                        {event.description}
                     </p>
                     <p className="text-base text-gray-300 sm:text-lg">
                        <span className="font-semibold uppercase tracking-[0.24em] text-[#F6A623]/90">
                           Deadline
                        </span>
                        <span className="relative ml-3 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white shadow-[0_16px_40px_rgba(15,23,42,0.45)] backdrop-blur">
                           <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F6A623]/25 via-transparent to-[#fb923c]/25 opacity-80"></span>
                           <span
                              className="relative inline-flex h-7 w-7 items-center justify-center"
                              aria-hidden="true">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/50"></span>
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(248,113,113,0.9)]"></span>
                           </span>
                           <span className="relative text-sm font-semibold tracking-tight text-[#FFEED8]">
                              {deadlineLabel}
                           </span>
                        </span>
                        {isDeadlinePassed && (
                           <span className="ml-2 text-red-400">
                              (Registration closed)
                           </span>
                        )}
                     </p>
                  </motion.div>
               </motion.div>

               <motion.div
                  className="flex flex-wrap items-center justify-center gap-4"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                     duration: 0.6,
                     ease: [0.16, 1, 0.3, 1],
                     delay: shouldReduceMotion ? 0 : 0.16,
                  }}>
                  <motion.button
                     type="button"
                     onClick={() =>
                        window.open(
                           event.registrationLink,
                           "_blank",
                           "noopener,noreferrer"
                        )
                     }
                     disabled={isDeadlinePassed}
                     className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-8 py-3 text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                        isDeadlinePassed
                           ? "cursor-not-allowed border border-white/20 bg-white/10 text-gray-400"
                           : `bg-gradient-to-r ${event.buttonGradient} text-black shadow-lg shadow-black/20`
                     }`}
                     variants={buttonVariants}
                     whileHover={isDeadlinePassed ? undefined : "hover"}
                     whileTap={isDeadlinePassed ? undefined : "tap"}
                     aria-disabled={isDeadlinePassed}>
                     {isDeadlinePassed ? "Registration closed" : "Register now"}
                     <motion.svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{
                           x: isDeadlinePassed || shouldReduceMotion ? 0 : [0, 4, 0],
                        }}
                        transition={{
                           repeat: isDeadlinePassed || shouldReduceMotion ? 0 : Infinity,
                           duration: 1.2,
                           ease: "easeInOut",
                           delay: 0.4,
                        }}>
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                     </motion.svg>
                  </motion.button>
                  {event.rulebookPath && (
                     <motion.a
                        href={event.rulebookPath}
                        download
                        className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-[#F6A623]/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap">
                        Download rulebook
                        <motion.svg
                           className="h-5 w-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           animate={{ y: shouldReduceMotion ? 0 : [0, -3, 0] }}
                           transition={{
                              repeat: shouldReduceMotion ? 0 : Infinity,
                              duration: 1.6,
                              ease: "easeInOut",
                           }}>
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                           />
                        </motion.svg>
                     </motion.a>
                  )}
               </motion.div>

               <motion.p
                  className="text-[1.3rem] font-semibold uppercase tracking-[0.38em] text-[#FFE7C2]/70"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     duration: 0.5,
                     ease: [0.16, 1, 0.3, 1],
                     delay: shouldReduceMotion ? 0 : 0.22,
                  }}>
                  Days Left
               </motion.p>
               <motion.div
                  className="grid w-full gap-4 sm:grid-cols-4"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     duration: 0.7,
                     ease: [0.16, 1, 0.3, 1],
                     delay: shouldReduceMotion ? 0 : 0.26,
                  }}>
                  {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                     <motion.div
                        key={unit}
                        variants={countdownVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#F6A623]/40 hover:bg-white/10">
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        <p className="text-4xl font-bold text-white">
                           {String(timeLeft[unit] ?? 0).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-gray-400">
                           {unit}
                        </p>
                     </motion.div>
                  ))}
               </motion.div>
            </motion.div>
         </div>
         <RegistrationFooter />
      </>
   );
};

EventRegistrationTemplate.propTypes = {
   event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      registrationLink: PropTypes.string.isRequired,
      rulebookPath: PropTypes.string,
      deadline: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
      gradient: PropTypes.string.isRequired,
      buttonGradient: PropTypes.string.isRequired,
   }).isRequired,
};

export default EventRegistrationTemplate;
