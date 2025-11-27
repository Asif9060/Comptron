import { useState } from "react";
import { Star, Award, Handshake, Sparkles } from "lucide-react";

// Title Sponsor Component
const TitleSponsor = () => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div className="py-10 bg-[#1C1535]">
         {/* <div className="mx-auto px-4">
            
            <div className="text-center mb-0">
               <div className="flex items-center justify-center mb-4">
                  <Star
                     className={`w-8 h-8 text-[#F6A623] mr-3 transition-transform duration-300 ${
                        isHovered ? "rotate-180" : ""
                     }`}
                  />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                     Title Sponsor
                  </h2>
               </div>
               <div className="w-16 h-16 bg-[#F6A623] mx-auto mb-5"></div>
               <p className="text-gray-300 max-w-2xl mx-auto mb-5">
                  Our premier partner who makes the NWU CSE FEST possible through their
                  generous support
               </p>
            </div>

           
            <div className="max-w-4xl mx-auto">
               <div
                  className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(246,166,35,0.3)]"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                     
                     <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                        <Building className="w-12 h-12 text-white" />
                        {isHovered && (
                           <div className="absolute inset-0 rounded-xl bg-white opacity-20 animate-pulse"></div>
                        )}
                     </div>

                    
                     <div className="text-center md:text-left flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-[#F6A623]">
                           TechVision Inc.
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                           As our title sponsor, TechVision Inc. provides the essential
                           support that powers the entire NWU CSE FEST experience. Their
                           commitment to innovation and education helps nurture the next
                           generation of computer science talent.
                        </p>
                        <div className="flex items-center justify-center md:justify-start text-[#F6A623] font-semibold">
                           <Award className="w-5 h-5 mr-2" />
                           <span>Presenting Sponsor</span>
                        </div>
                     </div>
                  </div>

                  
                  {isHovered && (
                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F6A623] rounded-full animate-bounce"></div>
                  )}
               </div>
            </div>
         </div> */}
      </div>
   );
};

// Event Organizer Component
const EventOrganizer = () => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div className="py-6 h-[45rem] bg-[#1C1535]">
         <div className="mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-0">
               <div className="flex items-center justify-center mb-4">
                  <Handshake
                     className={`w-8 h-8 text-[#F6A623] mr-3 transition-transform duration-300 ${
                        isHovered ? "scale-110" : ""
                     }`}
                  />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                     Event Organizer
                  </h2>
               </div>
               <div className="w-16 h-1 bg-[#F6A623] mx-auto mb-0"></div>
               <p className="text-gray-300 max-w-2xl mb-7 mx-auto">
                  The dedicated team and organization responsible for bringing the NWU CSE
                  FEST to life
               </p>
            </div>

            {/* Organizer Cards */}
            <div className="max-w-6xl mx-auto">
               <div className="grid md:grid-cols-2 gap-8">
                  {/* First Organizer Card */}
                  <div
                     className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(246,166,35,0.3)]"
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                     <div className="flex flex-col items-center gap-6">
                        {/* Organizer Logo */}
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:rotate-[-12deg] hover:scale-110">
                           <img
                              src="/NWU-Logo.png"
                              alt="NWU CSE Department"
                              className="w-full h-full object-cover"
                           />
                           {isHovered && (
                              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#F6A623] animate-pulse" />
                           )}
                        </div>

                        {/* Organizer Details */}
                        <div className="text-center">
                           <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-[#F6A623]">
                              NWU CSE Department
                           </h3>
                           <p className="text-gray-600 mb-4 leading-relaxed transition-all duration-300 hover:text-gray-800 text-sm">
                              The Department of Computer Science and Engineering at
                              North Western University is the driving force behind this annual
                              carnival. Our faculty and student organizers work tirelessly
                              to create an exceptional experience.
                           </p>
                           <div className="flex items-center justify-center text-[#F6A623] font-semibold text-sm">
                              <Star className="w-4 h-4 mr-2" />
                              <span>Host Organization</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Second Organizer Card */}
                  <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(246,166,35,0.3)]">
                     <div className="flex flex-col items-center gap-6">
                        {/* Comptron Logo */}
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                           <img
                              src="/comptron.png"
                              alt="Comptron"
                              className="w-full h-full object-cover"
                           />
                        </div>

                        {/* Comptron Details */}
                        <div className="text-center">
                           <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-[#F6A623]">
                              Comptron
                           </h3>
                           <p className="text-gray-600 mb-4 leading-relaxed transition-all duration-300 hover:text-gray-800 text-sm">
                              Comptron is powered by dedicated committee members from the
                              CSE department. Our team works collaboratively to plan,
                              execute, and deliver an exceptional fest experience. From
                              event coordination to technical support, our volunteers
                              bring diverse skills and unwavering commitment to make NWU
                              CSE FEST a memorable celebration of technology and
                              innovation.
                           </p>
                           <div className="flex items-center justify-center text-[#F6A623] font-semibold text-sm">
                              <Award className="w-4 h-4 mr-2" />
                              <span>Committee & Volunteers</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// Main App Component
const Sponsor = () => {
   return (
      <div className="min-h-screen">
         <TitleSponsor />
         <EventOrganizer />
      </div>
   );
};

export default Sponsor;
