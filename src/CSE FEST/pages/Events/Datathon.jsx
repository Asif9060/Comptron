import { useNavigate } from "react-router-dom";
import { Trophy, Users, Building2, DollarSign, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Datathon = () => {
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
      totalInstitutions: "18+",
      totalParticipants: "48+",
      totalPrizeMoney: "৳15,000",
   };

   // Winners
   const winners = {
      champion: {
         teamName: "Data Wizards",
         position: "Champion",
         prize: "৳57,000",
      },
      firstRunnerUp: {
         teamName: "Analytics Pro",
         position: "1st Runner Up",
         prize: "৳5,000",
      },
      secondRunnerUp: {
         teamName: "Code Crushers",
         position: "2nd Runner Up",
         prize: "৳3,000",
      },
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
                              event.path === "/Datathon"
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
                                 event.path === "/Datathon"
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
                     initial={{ opacity: 0, y: -80 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.7 }}
                     className="text-5xl md:text-7xl font-bold text-white mb-4">
                     DATATHON
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0, x: 100 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     className="text-xl text-[#F6A623] mb-8">
                     Data Science Competition 2025
                  </motion.p>
               </div>
            </div>
         </div>

         {/* Statistics Section */}
         <section className="py-16 bg-black/20">
            <div className="mx-auto px-4">
               <motion.h2
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                  Event <span className="text-[#F6A623]">Statistics</span>
               </motion.h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, x: -120 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.15 }}
                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6A623]/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                     <Building2 className="w-12 h-12 text-[#F6A623] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                     <div className="text-4xl font-bold text-white mb-2">
                        {statistics.totalInstitutions}
                     </div>
                     <div className="text-gray-300 text-lg">Total Institutions</div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, scale: 0.6 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6A623]/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                     <Users className="w-12 h-12 text-[#F6A623] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                     <div className="text-4xl font-bold text-white mb-2">
                        {statistics.totalParticipants}
                     </div>
                     <div className="text-gray-300 text-lg">Total Teams</div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, x: 120 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.45 }}
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
                  initial={{ opacity: 0, rotate: -5 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                  Event <span className="text-[#F6A623]">Winners</span>
               </motion.h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Champion */}
                  <motion.div
                     initial={{ opacity: 0, y: -80 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.15 }}
                     className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-0 bg-black/20"></div>
                     <div className="relative z-10">
                        <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">
                           {winners.champion.position}
                        </h3>
                        <div className="text-xl font-semibold text-white mb-4">
                           {winners.champion.teamName}
                        </div>
                        <div className="text-3xl font-bold text-white">
                           {winners.champion.prize}
                        </div>
                     </div>
                  </motion.div>

                  {/* 1st Runner Up */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-0 bg-black/20"></div>
                     <div className="relative z-10">
                        <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">
                           {winners.firstRunnerUp.position}
                        </h3>
                        <div className="text-xl font-semibold text-white mb-4">
                           {winners.firstRunnerUp.teamName}
                        </div>
                        <div className="text-3xl font-bold text-white">
                           {winners.firstRunnerUp.prize}
                        </div>
                     </div>
                  </motion.div>

                  {/* 2nd Runner Up */}
                  <motion.div
                     initial={{ opacity: 0, y: -80 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.6, delay: 0.45 }}
                     className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-0 bg-black/20"></div>
                     <div className="relative z-10">
                        <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">
                           {winners.secondRunnerUp.position}
                        </h3>
                        <div className="text-xl font-semibold text-white mb-4">
                           {winners.secondRunnerUp.teamName}
                        </div>
                        <div className="text-3xl font-bold text-white">
                           {winners.secondRunnerUp.prize}
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Datathon;
