import Navbar from "../components/Nav";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Add modern CSS animations
const styles = `
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(1deg); }
  }
  
  @keyframes shimmer-card {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(246, 166, 35, 0.1); }
    50% { box-shadow: 0 0 30px rgba(246, 166, 35, 0.2); }
  }
  
  .animate-float-gentle {
    animation: float-gentle 6s ease-in-out infinite;
  }
  
  .animate-shimmer-card {
    animation: shimmer-card 3s ease-in-out infinite;
  }
  
  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
   const styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   styleSheet.innerText = styles;
   document.head.appendChild(styleSheet);
}

const AllSponsors = () => {
   // 9 Premium Sponsors
   const sponsors = [
      {
         id: 1,
         name: "Prime Bank",
         logo: "/logos/Prime.png",
         website: "https://www.primebank.com.bd/",
         category: "Advertisement Partner",
      },
      {
         id: 2,
         name: "AppTolet",
         logo: "/logos/AppTolet.png",
         website: "",
         category: "Tech Partners",
      },
      {
         id: 3,
         name: "CPS",
         logo: "/logos/Cps.png",
         website: "https://www.cpsacademy.io/",
         category: "Problem Setting Partner",
      },
      {
         id: 4,
         name: "Visie",
         logo: "/logos/Visie.png",
         website: "https://visie.tech/",
         category: "Datathon Partner",
      },
      {
         id: 5,
         name: "Startech",
         logo: "/logos/Startech.png",
         website: "https://www.startech.com.bd/",
         category: "Gaming Partner",
      },
      {
         id: 6,
         name: "Ismart",
         logo: "/logos/Ismart.png",
         website: "https://ismart.net.bd/",
         category: "Internet Partner",
      },
      {
         id: 7,
         name: "Impel",
         logo: "/logos/Impel.png",
         website: "https://impel.com.bd/",
         category: "Agency Partner",
      },
      {
         id: 8,
         name: "CoderOj",
         logo: "/logos/Coderoj.png",
         website: "https://www.coderoj.com/",
         category: "Platform Partner",
      },
      {
         id: 9,
         name: "Biswas",
         logo: "/logos/Biswas.png",
         website: "",
         category: "Logistic Partner",
      },
   ];

   return (
      <div className="min-h-screen bg-[#1c1535] text-white">
         <Navbar />

         {/* Modern Hero Section */}
         <div className="relative pt-28 pb-12 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
               <div className="absolute top-20 left-10 w-32 h-32 border border-[#F6A623]/10 rounded-full animate-float-gentle"></div>
               <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-full animate-pulse"></div>
               <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-[#F6A623]/20 rotate-45 animate-bounce"></div>
            </div>

            <div className="mx-auto px-6 text-center relative z-10">
               <div className="max-w-4xl mx-auto">
                  <motion.h1
                     initial={{ opacity: 0, y: -50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     className="text-5xl md:text-6xl spnsr font-bold mb-6 bg-gradient-to-r from-[#F6A623] via-[#ff8c00] to-[#F6A623] bg-clip-text text-transparent">
                     Our Amazing Sponsors
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.7, delay: 0.2 }}
                     className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                     We&apos;re proud to partner with these innovative organizations for
                     NWU CSE FEST 2025
                  </motion.p>

                  {/* Stats */}
                  {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                     {[
                        { number: "9", label: "Partners" },
                        { number: "50+", label: "Events" },
                        { number: "1000+", label: "Participants" },
                        { number: "8", label: "Days" },
                     ].map((stat, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                           className="text-center">
                           <div className="text-2xl font-bold text-[#F6A623] mb-1">{stat.number}</div>
                           <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                     ))}
                  </div> */}
               </div>
            </div>
         </div>

         {/* Sponsors Container */}
         <div className="mx-auto px-6 pb-24">
            {/* Individual Sponsor Sections */}
            {sponsors.map((sponsor, index) => (
               <motion.div
                  key={sponsor.id}
                  initial={{
                     opacity: 0,
                     x: index % 2 === 0 ? -100 : 100,
                     rotate: index % 2 === 0 ? -5 : 5,
                  }}
                  whileInView={{
                     opacity: 1,
                     x: 0,
                     rotate: 0,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                     duration: 0.8,
                     delay: index * 0.1,
                     type: "spring",
                     stiffness: 80,
                  }}
                  className="mb-24 last:mb-0">
                  <div className="max-w-5xl mx-auto">
                     {/* Sponsor Section Header */}
                     <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-4 mb-4">
                           <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#F6A623]"></div>
                           <span className="text-[#F6A623] font-medium text-sm tracking-wider uppercase">
                              {sponsor.category}
                           </span>
                           <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#F6A623]"></div>
                        </div>
                     </div>

                     {/* Sponsor Card */}
                     <div className="group relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl overflow-hidden hover:border-[#F6A623]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F6A623]/20">
                        {/* Background Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/0 via-[#F6A623]/5 to-[#F6A623]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-12">
                           <div className="flex flex-col items-center text-center gap-8">
                              {/* Logo Section */}
                              <div className="flex-shrink-0 w-full md:w-80">
                                 <div className="bg-white backdrop-blur-sm border border-[#F6A623]/20 rounded-2xl p-8 hover:border-[#F6A623]/40 transition-all duration-300 group-hover:scale-105">
                                    <img
                                       src={sponsor.logo}
                                       alt={sponsor.name}
                                       className="w-full h-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                                       onError={(e) => {
                                          e.target.src = `https://placehold.co/400x200/1c1535/F6A623?text=${sponsor.name}`;
                                       }}
                                    />
                                 </div>
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 max-w-2xl">
                                 {sponsor.website && (
                                    <a
                                       href={sponsor.website}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/30">
                                       <span>Visit Website</span>
                                       <svg
                                          className="w-5 h-5"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                          />
                                       </svg>
                                    </a>
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Corner Decorations */}
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F6A623]/20 rounded-tr-2xl group-hover:border-[#F6A623]/40 transition-colors duration-300"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F6A623]/20 rounded-bl-2xl group-hover:border-[#F6A623]/40 transition-colors duration-300"></div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Footer Component */}
         <Footer />
      </div>
   );
};

export default AllSponsors;
