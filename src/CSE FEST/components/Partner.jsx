import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Partner = () => {
   const [offset, setOffset] = useState(0);
   const [isHovered, setIsHovered] = useState(false);

   // Partner logos with online URLs
   const partners = [
      {
         id: 1,
         name: "Startech",
         logo: "/logos/Startech.png",
      },
      {
         id: 2,
         name: "AppTolet",
         logo: "/logos/AppTolet.png",
      },
      {
         id: 3,
         name: "Biswas",
         logo: "/logos/Biswas.png",
      },
      {
         id: 4,
         name: "Prime Bank",
         logo: "/logos/Prime.png",
      },
      {
         id: 5,
         name: "Impel",
         logo: "/logos/Impel.png",
      },
      {
         id: 6,
         name: "CoderOj",
         logo: "/logos/Coderoj.png",
      },
      {
         id: 7,
         name: "CPS",
         logo: "/logos/Cps.png",
      },
      {
         id: 8,
         name: "Visie",
         logo: "/logos/Visie.png",
      },
      {
         id: 9,
         name: "Ismart",
         logo: "/logos/Ismart.png",
      },
   ];

   // Create multiple duplicates for seamless infinite scroll
   const duplicatedPartners = [...partners, ...partners, ...partners];

   useEffect(() => {
      // Calculate the width of one set of partners (each partner is 160px + 32px gap = 192px)
      const singleSetWidth = partners.length * 192;

      // Animation function
      const animate = () => {
         if (!isHovered) {
            setOffset((prev) => {
               const newOffset = prev - 1;
               // Reset offset when the first set has completely scrolled out
               if (Math.abs(newOffset) >= singleSetWidth) {
                  return 0;
               }
               return newOffset;
            });
         }

         // Continue animation
         animationId = requestAnimationFrame(animate);
      };

      let animationId = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
         if (animationId) {
            cancelAnimationFrame(animationId);
         }
      };
   }, [isHovered, partners.length]);

   return (
      <div className="relative w-full py-20 bg-[#1c1535]">
         {/* Title */}
         <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mx-auto px-4 text-center mb-16">
            <motion.h2
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, delay: 0.2 }}
               className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6A623] mb-6 tracking-tight">
               Our Partners
            </motion.h2>
            <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="w-24 h-1 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] mx-auto rounded-full"></motion.div>
         </motion.div>

         {/* Logo Container */}
         <div
            className="mx-auto px-4 w-full sm:w-3/4 lg:w-1/2 relative overflow-hidden cursor-grab"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* Infinite Logo Strip */}
            <div
               className="flex items-center justify-center space-x-8 transition-transform duration-500 ease-linear"
               style={{
                  transform: `translateX(${offset}px)`,
                  transition: "transform 0s linear",
               }}>
               {duplicatedPartners.map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="flex-shrink-0">
                     <div className="bg-white border border-[#F6A623]/20 rounded-xl p-4 sm:p-6 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/10 w-32 sm:w-40 h-20 sm:h-28 flex items-center justify-center">
                        <img
                           src={partner.logo}
                           alt={partner.name}
                           className="w-full h-full object-contain"
                           onError={(e) => {
                              e.target.src = `https://placehold.co/120x40/ffffff/F6A623?text=${partner.name}`;
                           }}
                        />
                     </div>
                  </div>
               ))}
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-10 left-10 w-16 h-16 border border-[#F6A623]/20 rounded-full animate-spin-slow opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse opacity-30"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-[#F6A623]/30 rotate-12 animate-bounce-slow opacity-20"></div>
         </div>
      </div>
   );
};

export default Partner;
