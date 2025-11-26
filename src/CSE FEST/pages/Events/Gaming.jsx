import { useNavigate } from "react-router-dom";
import { Trophy, Users, Building2, DollarSign, Image, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Gaming = () => {
   const navigate = useNavigate();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const events = [
      { name: "Programming", path: "/Programming" },
      { name: "Gaming", path: "/Gaming" },
      { name: "Project", path: "/Project" },
      { name: "Datathon", path: "/Datathon" },
      { name: "Poster Presentation", path: "/PosterPresentation" },
   ];

   // Event Statistics
   const statistics = {
      totalInstitutions: "67+",
      totalParticipants: "127+",
      totalPrizeMoney: "৳61,000",
   };

   // Game Categories
   const gameCategories = [
      {
         name: "VALORANT",
         winners: {
            champion: { teamName: "No Non-Sense", prize: "৳15,000" },
            firstRunnerUp: { teamName: "Crimson Wraith", prize: "৳10,000" },
         },
      },
      {
         name: "FIFA 23",
         winners: {
            champion: { teamName: "Emon", prize: "৳6,500" },
            firstRunnerUp: { teamName: "Saiduddin Mahbun", prize: "৳3,500" },
         },
      },
      {
         name: "PUBG MOBILE",
         winners: {
            champion: { teamName: "KH ESPORTS", prize: "৳10,000" },
            firstRunnerUp: { teamName: "FLAME MECH ESPORTS", prize: "৳6,000" },
            secondRunnerUp: { teamName: "CLOUDY PREDATORS", prize: "৳4,000" },
         },
      },
      {
         name: "E-FOOTBALL MOBILE",
         winners: {
            champion: { teamName: "Salman Farsi", prize: "৳3,000" },
            firstRunnerUp: { teamName: "Mubassir Gaffar Tashfi", prize: "৳2,000" },
            secondRunnerUp: { teamName: "Imon Das", prize: "৳1,000" },
         },
      },
   ];
   

   const handleGalleryClick = () => {
      navigate("/FestGallery");
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#1c1535] via-purple-900 to-[#1c1535]">
         {/* Navbar */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1535]/95 backdrop-blur-lg border-b border-[#F6A623]/30">
            <div className="mx-auto px-6 py-4">
               <div className="flex items-center justify-between">
                  <button
                     onClick={() => navigate("/FestEvents")}
                     className="text-[#F6A623] font-bold text-xl hover:text-white transition-colors">
                     CSE FEST Events
                  </button>

                  {/* Desktop Menu */}
                  <div className="hidden md:flex items-center space-x-6">
                     {events.map((event) => (
                        <button
                           key={event.name}
                           onClick={() => navigate(event.path)}
                           className={`text-sm font-medium transition-colors ${
                              event.path === "/Gaming"
                                 ? "text-[#F6A623]"
                                 : "text-gray-300 hover:text-[#F6A623]"
                           }`}>
                           {event.name}
                        </button>
                     ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     className="md:hidden text-white"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}>
                     {isMenuOpen ? (
                        <X className="w-6 h-6" />
                     ) : (
                        <Menu className="w-6 h-6" />
                     )}
                  </button>
               </div>

               {/* Mobile Menu */}
               {isMenuOpen && (
                  <div className="md:hidden mt-4 pb-4 border-t border-[#F6A623]/30 pt-4">
                     <div className="flex flex-col space-y-3">
                        {events.map((event) => (
                           <button
                              key={event.name}
                              onClick={() => {
                                 navigate(event.path);
                                 setIsMenuOpen(false);
                              }}
                              className={`text-left text-sm font-medium transition-colors ${
                                 event.path === "/Gaming"
                                    ? "text-[#F6A623]"
                                    : "text-gray-300 hover:text-[#F6A623]"
                              }`}>
                              {event.name}
                           </button>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </nav>

         {/* Hero Section */}
         <div className="relative overflow-hidden py-20 pt-32">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1c1535]/50"></div>
            <div className="mx-auto px-4 relative z-10">
               <div className="text-center">
                  <motion.h1
                     initial={{ opacity: 0, y: -50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="text-5xl md:text-7xl font-bold text-white mb-4">
                     GAMING
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="text-xl text-[#F6A623] mb-8">
                     E-Sports Championship 2025
                  </motion.p>
               </div>
            </div>
         </div>

         {/* Statistics Section */}
         <section className="py-16 bg-black/20">
            <div className="mx-auto px-4">
               <motion.h2
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                  Event <span className="text-[#F6A623]">Statistics</span>
               </motion.h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.5, delay: 0.1 }}
                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6A623]/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                     <Building2 className="w-12 h-12 text-[#F6A623] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                     <div className="text-4xl font-bold text-white mb-2">
                        {statistics.totalInstitutions}
                     </div>
                     <div className="text-gray-300 text-lg">Total Institutions</div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.5, delay: 0.2 }}
                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6A623]/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                     <Users className="w-12 h-12 text-[#F6A623] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                     <div className="text-4xl font-bold text-white mb-2">
                        {statistics.totalParticipants}
                     </div>
                     <div className="text-gray-300 text-lg">Total Teams</div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.5, delay: 0.3 }}
                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6A623]/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                     <DollarSign className="w-12 h-12 text-[#F6A623] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                     <div className="text-4xl font-bold text-white mb-2">
                        {statistics.totalPrizeMoney}
                     </div>
                     <div className="text-gray-300 text-lg">Total Prize Money</div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Winners Section */}
         <section className="py-16">
            <div className="mx-auto px-4">
               <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                  Event <span className="text-[#F6A623]">Winners</span>
               </motion.h2>

               {gameCategories.map((game, gameIndex) => (
                  <div key={gameIndex} className="mb-20 last:mb-0">
                     <motion.h3
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-center text-[#F6A623] mb-10">
                        {game.name}
                     </motion.h3>
                     <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                        {/* Champion */}
                        <motion.div
                           initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                           whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                           viewport={{ once: true, amount: 0.3 }}
                           transition={{ duration: 0.6, delay: 0.1 }}
                           className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden w-full md:w-80">
                           <div className="absolute inset-0 bg-black/20"></div>
                           <div className="relative z-10">
                              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                              <h3 className="text-2xl font-bold text-white mb-2">
                                 Champion
                              </h3>
                              <div className="text-xl font-semibold text-white mb-4">
                                 {game.winners.champion.teamName}
                              </div>
                              <div className="text-3xl font-bold text-white">
                                 {game.winners.champion.prize}
                              </div>
                           </div>
                        </motion.div>

                        {/* 1st Runner Up */}
                        {game.winners.firstRunnerUp && (
                           <motion.div
                              initial={{ opacity: 0, y: 100 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden w-full md:w-80">
                              <div className="absolute inset-0 bg-black/20"></div>
                              <div className="relative z-10">
                                 <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                 <h3 className="text-2xl font-bold text-white mb-2">
                                    1st Runner Up
                                 </h3>
                                 <div className="text-xl font-semibold text-white mb-4">
                                    {game.winners.firstRunnerUp.teamName}
                                 </div>
                                 <div className="text-3xl font-bold text-white">
                                    {game.winners.firstRunnerUp.prize}
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        {/* 2nd Runner Up */}
                        {game.winners.secondRunnerUp && (
                           <motion.div
                              initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                              className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden w-full md:w-80">
                              <div className="absolute inset-0 bg-black/20"></div>
                              <div className="relative z-10">
                                 <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                 <h3 className="text-2xl font-bold text-white mb-2">
                                    2nd Runner Up
                                 </h3>
                                 <div className="text-xl font-semibold text-white mb-4">
                                    {game.winners.secondRunnerUp.teamName}
                                 </div>
                                 <div className="text-3xl font-bold text-white">
                                    {game.winners.secondRunnerUp.prize}
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Gallery Button */}
         <section className="py-16">
            <div className="mx-auto px-4 text-center">
               <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  onClick={handleGalleryClick}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F6A623] to-orange-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-[#F6A623]/50 transition-all duration-300 transform hover:scale-105">
                  <Image className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  View Event Gallery
                  <svg
                     className="w-6 h-6 group-hover:translate-x-2 transition-transform"
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
               </motion.button>
            </div>
         </section>
      </div>
   );
};

export default Gaming;
