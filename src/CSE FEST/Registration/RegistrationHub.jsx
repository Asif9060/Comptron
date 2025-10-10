import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENT_ARRAY } from "./eventDetails";

const RegistrationHub = () => {
   const navigate = useNavigate();
   const [hoveredCard, setHoveredCard] = useState(null);
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
         })),
      []
   );

   const handleRegistration = (event) => {
      if (event.pagePath) {
         navigate(event.pagePath);
      }
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

         <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
         <div className="pointer-events-none absolute bottom-[-280px] right-[-120px] z-0 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[220px]"></div>

         <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
            <section>
               <div className="flex flex-wrap items-end justify-between gap-6">
                  <div className="space-y-3">
                     <p className="text-sm uppercase tracking-[0.3em] text-[#F6A623]/80">
                        Event lineup
                     </p>
                     <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Choose your challenge
                     </h2>
                     <p className="max-w-3xl text-base leading-relaxed text-gray-300">
                        Dive into competitions designed for coders, builders, strategists,
                        and creative minds. Each event brings its own twist—select the
                        arena that fits your skillset.
                     </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 backdrop-blur">
                     <span
                        className="h-3 w-3 rounded-full bg-green-400 animate-pulse"
                        aria-hidden="true"></span>
                     Slots update in real time
                  </div>
               </div>

               <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {eventRegistrations.map((event) => (
                     <button
                        key={event.id}
                        type="button"
                        onClick={() => handleRegistration(event)}
                        onMouseEnter={() => setHoveredCard(event.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A623]/70 ${
                           hoveredCard === event.id
                              ? "shadow-2xl shadow-[#F6A623]/10"
                              : "shadow-lg shadow-black/20"
                        }`}>
                        <span
                           className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-30`}></span>
                        <div className="relative flex items-start gap-5">
                           <div
                              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${event.gradient} text-3xl transition-transform duration-500 group-hover:scale-110`}>
                              {event.icon}
                           </div>
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
                           </div>
                        </div>
                        <div className="relative mt-6 flex items-center justify-end text-sm font-semibold">
                           <span className="text-[#F6A623]">Explore event details</span>
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
                        </div>
                     </button>
                  ))}
               </div>
            </section>
         </div>
      </div>
   );
};

export default RegistrationHub;
