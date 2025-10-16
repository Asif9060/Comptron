import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../components/css/Fest.css";
import LoadingScreen from "../LoadingScreen";
import RegistrationFooter from "../RegistrationFooter";
import { useEventDates, useGamingSubEvents } from "../useEventDates";
import { EVENT_DETAILS } from "../eventDetails";

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

const GAME_DEFINITIONS = [
   {
      id: "valorant",
      iconSrc: "/logos/valorant.png",
      title: "Valorant",
      tagline: "Execute perfect strats in every round.",
      description:
         "Assemble your five-stack, coordinate utility, and outsmart opponents across best-of series on Fracture, Bind, and more.",
      gradient: "from-purple-500/20 to-indigo-500/20",
      buttonGradient: "from-rose-400 to-red-500",
      registrationLink: "https://forms.gle/MvhPkygNe41DzE1Q8",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-10-31T11:59:00+06:00",
      platform: "PC",
      segment: "LAN Tournament",
   },
   {
      id: "fifa25",
      iconSrc: "/logos/fifa.png",
      title: "FIFA 23",
      tagline: "Control the pitch, secure every decisive touch.",
      description:
         "Craft tactical lineups, read your opponent’s build-up play, and deliver ice-cold finishes in nail-biting extra-time thrillers.",
      gradient: "from-blue-500/20 to-slate-500/20",
      buttonGradient: "from-emerald-400 to-green-500",
      registrationLink: "https://forms.gle/4y2Gf2hiRYWppPHH6",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-10-31T11:59:00+06:00",
      platform: "PC",
      segment: "LAN Tournament",
   },
   {
      id: "pubg",
      iconSrc: "/logos/pubg.png",
      title: "PUBG Mobile",
      tagline: "Drop hot, secure resources, and clutch the circle.",
      description:
         "Battle across Erangel and Miramar with squad rotations, precision engagements, and last-zone survivability deciding the champions.",
      gradient: "from-orange-500/20 to-amber-500/20",
      buttonGradient: "from-orange-400 to-amber-400",
      registrationLink: "https://forms.gle/HCfGPoqVkFooQHTg6",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-10-31T11:59:00+06:00",
      platform: "Mobile",
      segment: "Online Segment",
   },
   {
      id: "efootball",
      iconSrc: "/logos/efootball.png",
      title: "E-Football",
      tagline: "Master every pass, dribble, and finishing touch.",
      description:
         "Showcase tactical formations and clutch penalty conversions in fast-paced fixtures that mirror the intensity of stadium play.",
      gradient: "from-green-500/20 to-emerald-500/20",
      buttonGradient: "from-sky-400 to-blue-500",
      registrationLink: "https://forms.gle/6FoEWdsnDfZfJiqc9",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-10-31T11:59:00+06:00",
      platform: "Mobile",
      segment: "Online Segment",
   },
   {
      id: "indoor",
      iconEmoji: "🏟️",
      title: "Indoor Games",
      tagline: "Precision, focus, and crowd-pleasing clutch plays.",
      description:
         "Face off in the Indoor Games under bright lights, with cheers all around and officials keeping the fun rolling!",
      gradient: "from-emerald-500/20 to-lime-500/20",
      buttonGradient: "from-emerald-400 to-lime-500",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScpmRQfiYGA0HHYQ1RaJE8Umr44bo9JwoZQ7FPJyQbOy1tYuQ/viewform?usp=dialog",
      rulebookPath: "https://drive.google.com/file/d/18wFGbfTp_PL2j9f-PaWytk45Xvnhpg6V/view?usp=drive_link",
      deadline: "2025-11-05T23:59:00+06:00",
      platform: "Indoor Arena",
      segment: "Indoor Games",
   },
];

const SEGMENT_VISUALS = {
   "LAN Tournament": {
      gradient: "from-[#F6A623] via-[#facc15] to-[#fb923c]",
      glow: "bg-[#F6A623]/18",
      headline: "On-stage firefights",
      indicator: "bg-[#F6A623]",
      overlay: "from-[#F6A623]/10 via-transparent to-transparent",
   },
   "Online Segment": {
      gradient: "from-sky-400 via-blue-500 to-indigo-500",
      glow: "bg-sky-500/18",
      headline: "Remote domination",
      indicator: "bg-sky-400",
      overlay: "from-sky-500/10 via-transparent to-transparent",
   },
   "Indoor Games": {
      gradient: "from-emerald-400 via-green-500 to-lime-400",
      glow: "bg-emerald-500/18",
      headline: "Indoor mastery",
      indicator: "bg-emerald-400",
      overlay: "from-emerald-500/10 via-transparent to-transparent",
   },
};

const GameSection = ({ game }) => {
   const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(game.deadline));
   const shouldReduceMotion = useReducedMotion();
   const cardVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 32,
         },
         visible: {
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.65,
               ease: [0.16, 1, 0.3, 1],
            },
         },
      }),
      [shouldReduceMotion]
   );

   const blockVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
         },
         visible: {
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.5,
               ease: [0.16, 1, 0.3, 1],
            },
         },
      }),
      [shouldReduceMotion]
   );

   const countdownItemVariants = useMemo(
      () => ({
         hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 14,
         },
         visible: (index = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.35,
               ease: [0.16, 1, 0.3, 1],
               delay: shouldReduceMotion ? 0 : index * 0.04,
            },
         }),
      }),
      [shouldReduceMotion]
   );

   useEffect(() => {
      setTimeLeft(getTimeLeft(game.deadline));
      const timer = setInterval(() => {
         setTimeLeft(getTimeLeft(game.deadline));
      }, 1000);

      return () => clearInterval(timer);
   }, [game.deadline]);

   const deadlineLabel = useMemo(() => formatDeadline(game.deadline), [game.deadline]);
   const isDeadlinePassed = timeLeft.total <= 0;

   return (
      <motion.section
         className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl shadow-lg shadow-black/20"
         variants={cardVariants}
         initial="hidden"
         animate="visible"
         whileHover={shouldReduceMotion ? undefined : { y: -8 }}
         whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}>
         <motion.span
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${game.gradient}`}
            initial={{ opacity: 0.2 }}
            animate={{
               opacity: shouldReduceMotion ? 0.2 : [0.2, 0.35, 0.2],
            }}
            transition={{
               duration: 6,
               ease: "easeInOut",
               repeat: shouldReduceMotion ? 0 : Infinity,
            }}></motion.span>
         <div className="relative flex flex-1 flex-col items-center gap-5">
            <motion.div
               className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${game.gradient} shadow-lg shadow-black/30`}
               aria-hidden="true"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.05,
               }}>
               {game.iconSrc ? (
                  <motion.img
                     src={game.iconSrc}
                     alt={`${game.title} logo`}
                     className="h-10 w-10 object-contain"
                     whileHover={
                        shouldReduceMotion
                           ? undefined
                           : {
                                rotate: [-2, 2, -2],
                                transition: {
                                   duration: 2.4,
                                   repeat: Infinity,
                                   ease: "easeInOut",
                                },
                             }
                     }
                  />
               ) : (
                  <motion.span
                     className="text-3xl"
                     aria-hidden="true"
                     whileHover={
                        shouldReduceMotion
                           ? undefined
                           : {
                                rotate: [-6, 6, -6],
                                transition: {
                                   duration: 2.4,
                                   repeat: Infinity,
                                   ease: "easeInOut",
                                },
                             }
                     }>
                     {game.iconEmoji}
                  </motion.span>
               )}
            </motion.div>
            <motion.div
               className="space-y-2"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.1,
               }}>
               <h3 className="text-2xl font-bold text-white">{game.title}</h3>
               <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F6A623]">
                  {game.tagline}
               </p>
               <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-200">
                  <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                  Platform: {game.platform}
               </span>
               <p className="text-sm leading-relaxed text-gray-300">{game.description}</p>
               {game.id === "indoor" && (
                  <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-emerald-950 shadow-[0_12px_24px_rgba(34,197,94,0.35)]">
                     <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                     Only for NWU students
                  </span>
               )}
            </motion.div>

            <motion.p
               className="text-sm text-gray-300 sm:text-base"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.22,
               }}>
               <span className="font-semibold uppercase tracking-[0.3em] text-[#F6A623]/90">
                  Deadline
               </span>
               <span className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs text-white shadow-[0_16px_32px_rgba(15,23,42,0.45)] backdrop-blur sm:ml-3">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F6A623]/20 via-transparent to-[#fb923c]/25"></span>
                  <span
                     className="relative inline-flex h-6 w-6 items-center justify-center"
                     aria-hidden="true">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/50"></span>
                     <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(248,113,113,0.9)]"></span>
                  </span>
                  <span className="relative text-xs font-semibold tracking-tight text-[#FFEED8]">
                     {deadlineLabel}
                  </span>
               </span>
               {isDeadlinePassed && (
                  <span className="ml-1 text-red-400">(Registration closed)</span>
               )}
            </motion.p>

            <motion.div
               className="mt-auto flex w-full flex-col gap-2"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.24,
               }}>
               <motion.button
                  type="button"
                  onClick={() =>
                     window.open(game.registrationLink, "_blank", "noopener,noreferrer")
                  }
                  disabled={isDeadlinePassed}
                  className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                     isDeadlinePassed
                        ? "cursor-not-allowed border border-white/20 bg-white/10 text-gray-400"
                        : `bg-gradient-to-r ${game.buttonGradient} text-black shadow-lg shadow-black/20`
                  }`}
                  whileHover={
                     isDeadlinePassed || shouldReduceMotion
                        ? undefined
                        : { y: -6, boxShadow: "0 16px 30px rgba(15, 23, 42, 0.25)" }
                  }
                  whileTap={
                     isDeadlinePassed || shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  aria-disabled={isDeadlinePassed}>
                  {isDeadlinePassed ? "Registration closed" : "Register now"}
                  <motion.svg
                     className="h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     animate={{
                        x: isDeadlinePassed || shouldReduceMotion ? 0 : [0, 4, 0],
                     }}
                     transition={{
                        repeat: isDeadlinePassed || shouldReduceMotion ? 0 : Infinity,
                        duration: 1.1,
                        ease: "easeInOut",
                     }}>
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                     />
                  </motion.svg>
               </motion.button>
               <motion.a
                  href={game.rulebookPath}
                  download
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#F6A623]/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70"
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  Download rulebook
                  <motion.svg
                     className="h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     animate={{ y: shouldReduceMotion ? 0 : [0, -3, 0] }}
                     transition={{
                        repeat: shouldReduceMotion ? 0 : Infinity,
                        duration: 1.4,
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
            </motion.div>

            <motion.p
               className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#FFE7C2]/70"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.28,
               }}>
               Days Left
            </motion.p>
            <motion.div
               className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
               variants={blockVariants}
               initial="hidden"
               animate="visible"
               transition={{
                  ...blockVariants.visible.transition,
                  delay: shouldReduceMotion ? 0 : 0.32,
               }}>
               {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                  <motion.div
                     key={unit}
                     className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center transition-all duration-300 hover:border-[#F6A623]/40 hover:bg-white/10"
                     variants={countdownItemVariants}
                     initial="hidden"
                     animate="visible"
                     custom={index}>
                     <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                     <p className="text-2xl font-bold text-white">
                        {String(timeLeft[unit] ?? 0).padStart(2, "0")}
                     </p>
                     <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
                        {unit}
                     </p>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </motion.section>
   );
};

GameSection.propTypes = {
   game: PropTypes.shape({
   id: PropTypes.string.isRequired,
   iconSrc: PropTypes.string,
   iconEmoji: PropTypes.string,
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      gradient: PropTypes.string.isRequired,
      buttonGradient: PropTypes.string.isRequired,
      registrationLink: PropTypes.string.isRequired,
      rulebookPath: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
   }).isRequired,
};

const GamingEventPage = () => {
   const { eventDetails, loading: eventsLoading } = useEventDates(EVENT_DETAILS);
   const { games: dynamicGames, loading } = useGamingSubEvents(GAME_DEFINITIONS);

   const programmingDetails = eventDetails?.programming;

   const games = useMemo(() => {
      if (!Array.isArray(dynamicGames)) {
         return [];
      }

      if (!programmingDetails) {
         return dynamicGames;
      }

      return dynamicGames.map((game) => {
         if (game.id !== "indoor") {
            return game;
         }

         return {
            ...game,
            deadline: programmingDetails.deadline ?? game.deadline,
            isRegistrationOpen:
               typeof programmingDetails.isRegistrationOpen === "boolean"
                  ? programmingDetails.isRegistrationOpen
                  : game.isRegistrationOpen,
            timeRemaining: programmingDetails.timeRemaining ?? game.timeRemaining,
         };
      });
   }, [dynamicGames, programmingDetails]);

   const segments = useMemo(
      () => [
         {
            id: "lan",
            title: "LAN Tournament",
            accentKey: "LAN Tournament",
            description:
               "Play shoulder-to-shoulder on calibrated rigs, react to the crowd, and own the arena energy.",
            games: games.filter((game) => game.segment === "LAN Tournament"),
            startDate: "10 November 2025",
         },
         {
            id: "online",
            title: "Online Segment",
            accentKey: "Online Segment",
            description:
               "Compete remotely with mobile mastery and cross-campus coordination across open lobbies.",
            games: games.filter((game) => game.segment === "Online Segment"),
            startDate: "7 November 2025",
         },
         {
            id: "indoor",
            title: "Indoor Games",
            accentKey: "Indoor Games",
            description:
               "Battle for campus glory in  Indoor Games inside the festival's indoor arena.",
            games: games.filter((game) => game.segment === "Indoor Games"),
            startDate: "10 November 2025",
         },
      ],
      [games]
   );
   const navigate = useNavigate();
   const shouldReduceMotion = useReducedMotion();

   if (loading || eventsLoading) {
      return (
         <LoadingScreen>
            <div className="text-center text-white">Loading gaming events...</div>
         </LoadingScreen>
      );
   }

   const handleBack = () => {
      navigate("/CseFest/registration");
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

            <div className="pointer-events-none absolute -top-48 left-1/2 z-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="pointer-events-none absolute bottom-[-200px] right-[-120px] z-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[200px]"></div>

            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-10">
               <motion.div
                  className="mb-6 flex justify-center"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.button
                     type="button"
                     onClick={handleBack}
                     className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-0.5 py-0.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
               <motion.header
                  className="mb-10 max-w-2xl text-center mx-auto"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     duration: 0.6,
                     ease: [0.16, 1, 0.3, 1],
                     delay: shouldReduceMotion ? 0 : 0.08,
                  }}>
                  <p className="text-xs uppercase rp tracking-[0.35em] text-[#F6A623]/80">
                     Gaming Arena
                  </p>
                  <h1 className="mt-3 text-4xl rp font-black text-white">
                     Choose your battleground
                  </h1>
                  <p className="mt-3 text-sm rp leading-relaxed text-gray-300 sm:text-base">
                     Four competitive brackets, one electrifying stage. Rally your squad,
                     lock your loadouts, and secure your place in the CSE Fest gaming
                     arena.
                  </p>
               </motion.header>

               {segments
                  .filter((segment) => segment.games.length > 0)
                  .map((segment, index) => {
                     const isSingleGame = segment.games.length === 1;
                     const visuals = SEGMENT_VISUALS[segment.accentKey] || {
                        gradient: "from-[#F6A623] via-[#facc15] to-[#fb923c]",
                        glow: "bg-[#F6A623]/18",
                        overlay: "from-[#F6A623]/10 via-transparent to-transparent",
                        indicator: "bg-[#F6A623]",
                        headline: segment.title,
                     };
                     const accentGradient = visuals.gradient;
                     const accentGlow = visuals.glow;
                     const accentOverlay = visuals.overlay;
                     const accentIndicator = visuals.indicator;
                     const sectionHeadline = visuals.headline || segment.title;

                     return (
                     <motion.section
                        key={segment.id}
                        className={`relative ${
                           index === 0 ? "mt-10" : "mt-16"
                        } space-y-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_30px_60px_rgba(15,23,42,0.45)] ${
                           isSingleGame ? "mx-auto max-w-3xl" : ""
                        }`}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                           duration: 0.6,
                           ease: [0.16, 1, 0.3, 1],
                           delay: shouldReduceMotion ? 0 : 0.14 + index * 0.08,
                        }}>
                        <span
                           className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentOverlay}`}></span>
                        <span
                           className={`pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${accentGlow}`}></span>

                        <motion.div
                           className="relative space-y-3 text-center"
                           initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                              delay: shouldReduceMotion ? 0 : 0.02,
                           }}>
                           <span
                              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accentGradient} px-5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-slate-950 shadow-[0_16px_40px_rgba(15,23,42,0.35)]`}
                              aria-label={`${segment.title} highlight`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-900/70"></span>
                              {segment.title}
                           </span>
                           <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#FFE7C2]">
                              <span
                                 className={`relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accentGradient} p-[1px] shadow-[0_20px_50px_rgba(15,23,42,0.45)]`}
                                 aria-label={`${segment.title} start date`}>
                                 <span className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-xl opacity-70"></span>
                                 <span className="relative inline-flex items-center gap-3 rounded-full bg-[#050b16]/90 px-6 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7C2]">
                                    <span
                                       className={`flex h-2 w-2 items-center justify-center rounded-full ${accentIndicator}`}></span>
                                    {segment.startDate}
                                    {/* <span className="inline-flex h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70"></span> */}
                                 </span>
                              </span>
                           </div>
                           <h2 className="text-2xl font-bold text-white sm:text-3xl">
                              {sectionHeadline}
                           </h2>
                           <p className="text-sm text-gray-300 sm:text-base">
                              {segment.description}
                           </p>
                        </motion.div>

                        <motion.div
                           className={`relative grid grid-cols-1 gap-6 ${
                              isSingleGame
                                 ? "mx-auto max-w-md place-items-center sm:max-w-lg md:max-w-xl"
                                 : "md:grid-cols-2"
                           }`}
                           initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.55,
                              ease: [0.16, 1, 0.3, 1],
                              delay: shouldReduceMotion ? 0 : 0.1,
                           }}>
                           {segment.games.map((game) => (
                              <GameSection key={game.id} game={game} />
                           ))}
                        </motion.div>
                     </motion.section>
                     );
                  })}
            </div>
         </div>
         <RegistrationFooter />
      </LoadingScreen>
   );
};

export default GamingEventPage;
