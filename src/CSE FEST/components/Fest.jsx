import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import "../components/css/Fest.css";

const Fest = () => {
   const [hoveredCard, setHoveredCard] = useState(null);

   const features = [
      {
         title: "Main Events",
         description:
            "Experience exciting programming contests, hackathons, and technical competitions that challenge your skills.",
         icon: <Calendar className="w-8 h-8" />,
      },
      {
         title: "Workshops",
         description:
            "Learn from industry experts through hands-on workshops covering latest technologies and best practices.",
         icon: <GraduationCap className="w-8 h-8" />,
      },
      {
         title: "Activities",
         description:
            "Participate in fun activities, networking sessions, and cultural events throughout the carnival.",
         icon: <Trophy className="w-8 h-8" />,
      },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
            {/* Header Section */}
            <motion.div
               initial={{ opacity: 0, y: -30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.8 }}
               className="text-center mb-16">
               <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl exp font-bold text-[#1C1535] mb-6 leading-tight px-4">
                  Experience the Thrills of NWU CSE FEST
               </motion.h1>
               <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-20 h-1 bg-[#F6A623] mx-auto mb-8"></motion.div>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                  Immerse yourself in a world of technology, innovation, and competition.
                  Our carnival brings together the brightest minds in computer science for
                  an unforgettable experience.
               </motion.p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
               {features.map((feature, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -5 : 5 }}
                     whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                     viewport={{ once: true, amount: 0.2 }}
                     transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 80,
                     }}
                     className={`group relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 ${
                        hoveredCard === index ? "scale-105" : ""
                     }`}
                     onMouseEnter={() => setHoveredCard(index)}
                     onMouseLeave={() => setHoveredCard(null)}>
                     {/* Icon Container */}
                     <div className="relative flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#F6A623] flex items-center justify-center shadow-md">
                           <div className="text-white">{feature.icon}</div>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="text-center">
                        <h3 className="text-xl font-bold text-[#F6A623] mb-4">
                           {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                           {feature.description}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Call to Action */}
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="mt-20 text-center">
               <a
                  href="https://comptron.nwu.ac.bd/CseFest/registration"
                  target="_blank"
                  rel="noopener noreferrer">
                  <button className="group relative px-8 py-4 bg-[#F6A623] text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1">
                     <span className="flex items-center justify-center space-x-2">
                        <span>Join the Fest</span>
                        <ArrowRight className="w-5 h-5" />
                     </span>
                  </button>
               </a>
            </motion.div>
         </div>
      </div>
   );
};

export default Fest;
