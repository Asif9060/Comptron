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

const EventRegistrationTemplate = ({ event }) => {
   const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(event.deadline));
   const navigate = useNavigate();

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

         <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-12 px-6 py-20 text-center lg:px-10">
            <div className="w-full">
               <button
                  type="button"
                  onClick={handleBack}
                  className="group mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F6A623]/40 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/60">
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
            <div className="space-y-6">
               <span
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${event.gradient} text-4xl shadow-lg shadow-black/30`}
                  aria-hidden="true">
                  {event.icon}
               </span>
               <div className="space-y-4">
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                     {event.title}
                  </h1>
                  <p className="text-xl font-semibold text-[#F6A623] sm:text-2xl">
                     {event.tagline}
                  </p>
                  <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
                     {event.description}
                  </p>
                  <p className="text-sm text-gray-400">
                     <span className="font-semibold text-[#F6A623]">Deadline:</span>{" "}
                     {deadlineLabel}
                     {isDeadlinePassed && (
                        <span className="ml-2 text-red-400">(Registration closed)</span>
                     )}
                  </p>
               </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-4">
               {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div
                     key={unit}
                     className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#F6A623]/40 hover:bg-white/10">
                     <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                     <p className="text-4xl font-bold text-white">
                        {String(timeLeft[unit] ?? 0).padStart(2, "0")}
                     </p>
                     <p className="mt-2 text-xs uppercase tracking-[0.4em] text-gray-400">
                        {unit}
                     </p>
                  </div>
               ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
               <button
                  type="button"
                  onClick={() =>
                     window.open(event.registrationLink, "_blank", "noopener,noreferrer")
                  }
                  disabled={isDeadlinePassed}
                  className={`group inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3 text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                     isDeadlinePassed
                        ? "cursor-not-allowed border border-white/20 bg-white/10 text-gray-400"
                        : `bg-gradient-to-r ${event.buttonGradient} text-black shadow-lg shadow-black/20 hover:-translate-y-1`
                  }`}>
                  {isDeadlinePassed ? "Registration closed" : "Register now"}
                  <svg
                     className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                  href={event.rulebookPath}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#F6A623]/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70">
                  Download rulebook
                  <svg
                     className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
      </div>
   );
};

EventRegistrationTemplate.propTypes = {
   event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      registrationLink: PropTypes.string.isRequired,
      rulebookPath: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
      gradient: PropTypes.string.isRequired,
      buttonGradient: PropTypes.string.isRequired,
   }).isRequired,
};

export default EventRegistrationTemplate;
