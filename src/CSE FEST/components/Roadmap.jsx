import { useState, useMemo } from "react";

const MainEventsRoadmap = () => {
   const [activeTab, setActiveTab] = useState("Main Events");

   // Navigation function to handle page navigation
   const handleNavigateToEvent = (url) => {
      if (url) {
         // Option 1: Simple window navigation (current implementation)
         window.location.href = url;

         // Option 2: For React Router (uncomment if using React Router)
         // import { useNavigate } from 'react-router-dom';
         // const navigate = useNavigate();
         // navigate(url);

         // Option 3: For Next.js (uncomment if using Next.js)
         // import { useRouter } from 'next/router';
         // const router = useRouter();
         // router.push(url);

         // Option 4: Open in new tab
         // window.open(url, '_blank');
      }
   };

   // Mock data for main events - wrapped in useMemo to prevent recreation on each render
   const mainEvents = useMemo(
      () => [
         {
            id: 1,
            title: "Programming Contest",
            date: "FRI, AUG 21",
            description:
               "Join our Capture The Flag bootcamp to learn the basics of cybersecurity and prepare for the CTF competition.",
            category: "Security",
            type: "Individual",
            image: "https://placehold.co/300x200/1c1535/F6A623?text=Programming",
            online: true,
            url: "/Programming",
         },
         {
            id: 2,
            title: "Gaming Contest",
            date: "FRI, AUG 22",
            description:
               "Compete in an exciting multiplayer gaming tournament featuring popular titles and amazing prizes for top performers.",
            category: "Gaming",
            type: "Individual + Team",
            image: "https://placehold.co/300x200/1c1535/F6A623?text=Gaming+Contest",
            online: true,
            url: "/Gaming",
         },
         {
            id: 3,
            title: "Project Showcase",
            date: "FRI, AUG 23",
            description:
               "Master advanced cybersecurity concepts and prepare for the final CTF competition with expert guidance.",
            category: "Security",
            type: "Individual",
            image: "https://placehold.co/300x200/1c1535/F6A623?text=Project",
            online: true,
            url: "/Project",
         },
         {
            id: 4,
            title: "Ideathon",
            date: "WED, AUG 27",
            description:
               "Build innovative solutions in this intensive preliminary hackathon with real-world challenges.",
            category: "Development",
            type: "Individual",
            image: "https://placehold.co/300x200/1c1535/F6A623?text=Ideathon",
            online: true,
            url: "/Ideathon",
         },
         {
            id: 5,
            title: "Datathon",
            date: "WED, AUG 27",
            description:
               "Build innovative solutions in this intensive preliminary hackathon with real-world challenges.",
            category: "Development",
            type: "Individual",
            image: "https://placehold.co/300x200/1c1535/F6A623?text=Datathon",
            online: true,
            url: "/Datathon",
         },
      ],
      []
   );

   return (
      <div className="min-h-screen bg-[#1c1535] text-white">
         {/* Header */}
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="text-center mb-8 sm:mb-12">
               <h1 className="text-3xl sm:text-4xl md:text-5xl rdtxt font-bold text-[#F6A623] mb-4">
                  Event Roadmap
               </h1>
               <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Follow the journey through NWU CSE FEST 2025 - August 20-28, 2025
               </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8 sm:mb-12">
               <div className="bg-[#1c1535]/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-full p-1 inline-flex">
                  {/* <button
                     onClick={() => setActiveTab("Workshops")}
                     className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === "Workshops"
                           ? "bg-[#F6A623] text-[#1c1535] shadow-lg"
                           : "text-gray-300 hover:text-[#F6A623] hover:bg-[#1c1535]/30"
                     }`}>
                     Workshops
                  </button>
                  <button
                     onClick={() => setActiveTab("Preliminaries")}
                     className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === "Preliminaries"
                           ? "bg-[#F6A623] text-[#1c1535] shadow-lg"
                           : "text-gray-300 hover:text-[#F6A623] hover:bg-[#1c1535]/30"
                     }`}>
                     Preliminaries
                  </button> */}
                  <button
                     onClick={() => setActiveTab("Main Events")}
                     className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === "Main Events"
                           ? "bg-[#F6A623] text-[#1c1535] shadow-lg"
                           : "text-gray-300 hover:text-[#F6A623] hover:bg-[#1c1535]/30"
                     }`}>
                     Main Events
                  </button>
               </div>
            </div>

            {/* Timeline */}
            <div className="relative max-w-6xl mx-auto">
               {/* Vertical line - hidden on mobile, visible on larger screens */}
               <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-transparent via-[#F6A623] to-transparent"></div>

               {/* Timeline points */}
               {mainEvents.map((event, index) => (
                  <div
                     key={event.id}
                     className={`relative flex items-center mb-12 sm:mb-20 ${
                        index % 2 === 0
                           ? "sm:justify-start justify-center"
                           : "sm:justify-end justify-center"
                     }`}>
                     {/* Timeline dot - hidden on mobile */}
                     <div
                        className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-[#F6A623] rounded-full border-4 border-[#1c1535] z-10 animate-pulse transition-shadow duration-300"
                        style={{
                           boxShadow:
                              "0 0 20px rgba(246, 166, 35, 0.6), 0 0 40px rgba(246, 166, 35, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                           e.target.style.boxShadow =
                              "0 0 30px rgba(246, 166, 35, 0.8), 0 0 60px rgba(246, 166, 35, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                           e.target.style.boxShadow =
                              "0 0 20px rgba(246, 166, 35, 0.6), 0 0 40px rgba(246, 166, 35, 0.3)";
                        }}></div>

                     {/* Mobile event indicator */}
                     <div className="sm:hidden absolute left-4 top-4 w-4 h-4 bg-[#F6A623] rounded-full animate-pulse"></div>

                     {/* Event card */}
                     <div
                        className={`w-full max-w-sm sm:w-80 md:w-96 relative px-4 sm:px-0 ${
                           index % 2 === 0
                              ? "sm:mr-8 md:mr-12 lg:mr-16"
                              : "sm:ml-8 md:ml-12 lg:ml-16"
                        }`}>
                        <div
                           onClick={() => handleNavigateToEvent(event.url)}
                           className="bg-[#1c1535]/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#F6A623]/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                           {/* Event Image */}
                           <div className="relative h-32 sm:h-40 overflow-hidden">
                              <img
                                 src={event.image}
                                 alt={event.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1535] to-transparent"></div>
                              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                                 <span className="bg-black/80 text-[#F6A623] text-xs px-2 py-1 rounded-md">
                                    ONLINE
                                 </span>
                              </div>
                              {/* Click overlay indicator */}
                              <div className="absolute inset-0 bg-[#F6A623]/0 group-hover:bg-[#F6A623]/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                 <div className="bg-[#F6A623] text-[#1c1535] px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                    Click to view details
                                 </div>
                              </div>
                           </div>

                           {/* Event Content */}
                           <div className="p-4 sm:p-6">
                              <div className="flex items-center text-xs text-[#F6A623] mb-2 sm:mb-3">
                                 <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                                 {event.date}
                              </div>

                              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#F6A623] transition-colors duration-300">
                                 {event.title}
                              </h3>
                              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                                 {event.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                 <span className="inline-flex items-center text-xs px-2 py-1 bg-[#F6A623]/10 text-[#F6A623] rounded-full">
                                    <svg
                                       className="w-3 h-3 mr-1"
                                       fill="currentColor"
                                       viewBox="0 0 20 20">
                                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {event.category}
                                 </span>
                                 <span className="inline-flex items-center text-xs px-2 py-1 bg-[#F6A623]/10 text-[#F6A623] rounded-full">
                                    <svg
                                       className="w-3 h-3 mr-1"
                                       fill="currentColor"
                                       viewBox="0 0 20 20">
                                       <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                    </svg>
                                    {event.type}
                                 </span>
                              </div>

                              <button
                                 onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    handleNavigateToEvent(event.url);
                                 }}
                                 className="w-full bg-[#F6A623] hover:bg-[#e0951f] text-[#1c1535] font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center cursor-pointer text-sm sm:text-base">
                                 <span>LEARN MORE →</span>
                                 <svg
                                    className="w-4 h-4 ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Floating Decorative Elements */}
         <div className="hidden lg:block absolute top-10 left-10 w-12 lg:w-16 h-12 lg:h-16 border border-[#F6A623]/20 rounded-full animate-spin-slow opacity-20"></div>
         <div className="hidden lg:block absolute bottom-10 right-10 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse opacity-30"></div>
         <div className="hidden lg:block absolute top-1/2 left-1/4 w-6 lg:w-8 h-6 lg:h-8 border-2 border-[#F6A623]/30 rotate-12 animate-bounce-slow opacity-20"></div>
      </div>
   );
};

export default MainEventsRoadmap;
