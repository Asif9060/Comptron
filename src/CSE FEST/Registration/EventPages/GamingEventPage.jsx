import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
   }).format(deadlineDate);
};

const GAME_DEFINITIONS = [
   {
      id: "valorant",
      iconSrc: "/logos/valorant.png",
      title: "Valorant Showdown",
      tagline: "Execute perfect strats in every round.",
      description:
         "Assemble your five-stack, coordinate utility, and outsmart opponents across best-of series on Fracture, Bind, and more.",
      gradient: "from-purple-500/20 to-indigo-500/20",
      buttonGradient: "from-purple-400 to-indigo-400",
      registrationLink: "https://forms.google.com/gaming-valorant",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-11-07T11:59:00+06:00",
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
      registrationLink: "https://forms.google.com/gaming-pubg",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-11-07T11:59:00+06:00",
   },
   {
      id: "efootball",
      iconSrc: "/logos/efootball.png",
      title: "E-Football",
      tagline: "Master every pass, dribble, and finishing touch.",
      description:
         "Showcase tactical formations and clutch penalty conversions in fast-paced fixtures that mirror the intensity of stadium play.",
      gradient: "from-green-500/20 to-emerald-500/20",
      buttonGradient: "from-green-400 to-emerald-400",
      registrationLink: "https://forms.google.com/gaming-efootball",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-11-07T11:59:00+06:00",
   },
   {
      id: "freefire",
      iconSrc: "/logos/freefire.png",
      title: "Free Fire",
      tagline: "Race through Bermuda and ramp up the pressure.",
      description:
         "Coordinate rapid rotations, timed engagements, and ability synergy to dominate opponents in explosive, high-tempo skirmishes.",
      gradient: "from-red-500/20 to-rose-500/20",
      buttonGradient: "from-red-400 to-rose-400",
      registrationLink: "https://forms.google.com/gaming-freefire",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-11-07T11:59:00+06:00",
   },
];

const GameSection = ({ game }) => {
   const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(game.deadline));

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
      <section className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1">
         <span
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 transition-opacity duration-300 hover:opacity-40`}></span>
         <div className="relative flex flex-1 flex-col items-center gap-5">
            <div
               className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${game.gradient} shadow-lg shadow-black/30`}
               aria-hidden="true">
               <img
                  src={game.iconSrc}
                  alt={`${game.title} logo`}
                  className="h-10 w-10 object-contain"
               />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-bold text-white">{game.title}</h3>
               <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F6A623]">
                  {game.tagline}
               </p>
               <p className="text-sm leading-relaxed text-gray-300">{game.description}</p>
            </div>

            <div className="grid w-full grid-cols-4 gap-3">
               {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div
                     key={unit}
                     className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center transition-all duration-300 hover:border-[#F6A623]/40 hover:bg-white/10">
                     <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                     <p className="text-2xl font-bold text-white">
                        {String(timeLeft[unit] ?? 0).padStart(2, "0")}
                     </p>
                     <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
                        {unit}
                     </p>
                  </div>
               ))}
            </div>

            <p className="text-xs text-gray-400">
               <span className="font-semibold text-[#F6A623]">Deadline:</span>{" "}
               {deadlineLabel}
               {isDeadlinePassed && (
                  <span className="ml-1 text-red-400">(Registration closed)</span>
               )}
            </p>

            <div className="mt-auto flex w-full flex-col gap-2">
               <button
                  type="button"
                  onClick={() =>
                     window.open(game.registrationLink, "_blank", "noopener,noreferrer")
                  }
                  disabled={isDeadlinePassed}
                  className={`group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                     isDeadlinePassed
                        ? "cursor-not-allowed border border-white/20 bg-white/10 text-gray-400"
                        : `bg-gradient-to-r ${game.buttonGradient} text-black shadow-lg shadow-black/20 hover:-translate-y-1`
                  }`}>
                  {isDeadlinePassed ? "Registration closed" : "Register now"}
                  <svg
                     className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                     />
                  </svg>
               </button>
               <a
                  href={game.rulebookPath}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#F6A623]/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70">
                  Download rulebook
                  <svg
                     className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                     />
                  </svg>
               </a>
            </div>
         </div>
      </section>
   );
};

GameSection.propTypes = {
   game: PropTypes.shape({
      id: PropTypes.string.isRequired,
      iconSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      gradient: PropTypes.string.isRequired,
      buttonGradient: PropTypes.string.isRequired,
      registrationLink: PropTypes.string.isRequired,
      rulebookPath: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
   }).isRequired,
};

const GamingEventPage = () => {
   const games = useMemo(() => GAME_DEFINITIONS, []);
   const navigate = useNavigate();

   const handleBack = () => {
      navigate("/CseFest/registration");
   };

   return (
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
            <div className="mb-6 flex justify-center">
               <button
                  type="button"
                  onClick={handleBack}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F6A623]/40 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/60">
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
               </button>
            </div>
            <header className="mb-10 text-center">
               <p className="text-xs uppercase tracking-[0.35em] text-[#F6A623]/80">
                  Gaming Arena
               </p>
               <h1 className="mt-3 text-4xl font-black text-white">
                  Choose your battleground
               </h1>
               <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                  Four competitive brackets, one electrifying stage. Rally your squad,
                  lock your loadouts, and secure your place in the CSE Fest gaming arena.
               </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
               {games.map((game) => (
                  <GameSection key={game.id} game={game} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default GamingEventPage;
