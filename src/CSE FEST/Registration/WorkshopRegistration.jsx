import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkshopRegistration = () => {
   const navigate = useNavigate();
   const [hoveredCard, setHoveredCard] = useState(null);

   // Workshop/Internal Event registration links - Replace with actual URLs
   const workshops = [
      {
         id: 1,
         title: "AI & Machine Learning Workshop",
         description: "Deep dive into AI/ML fundamentals and practical applications",
         icon: "🤖",
         color: "from-cyan-500 to-blue-600",
         link: "https://forms.google.com/ai-ml-workshop",
         gradient: "from-cyan-500/20 to-blue-600/20",
         duration: "3 Days",
         level: "Intermediate",
      },
      {
         id: 2,
         title: "Web Development Bootcamp",
         description: "Master modern web technologies from basics to advanced",
         icon: "🌐",
         color: "from-green-500 to-teal-500",
         link: "https://forms.google.com/web-dev-bootcamp",
         gradient: "from-green-500/20 to-teal-500/20",
         duration: "5 Days",
         level: "Beginner",
      },
      {
         id: 3,
         title: "Cybersecurity Essentials",
         description: "Learn ethical hacking and security best practices",
         icon: "🔐",
         color: "from-red-500 to-orange-600",
         link: "https://forms.google.com/cybersecurity",
         gradient: "from-red-500/20 to-orange-600/20",
         duration: "2 Days",
         level: "Intermediate",
      },
      {
         id: 4,
         title: "Cloud Computing with AWS",
         description: "Hands-on experience with AWS cloud infrastructure",
         icon: "☁️",
         color: "from-purple-500 to-indigo-500",
         link: "https://forms.google.com/aws-workshop",
         gradient: "from-purple-500/20 to-indigo-500/20",
         duration: "4 Days",
         level: "Advanced",
      },
      {
         id: 5,
         title: "Mobile App Development",
         description: "Build cross-platform mobile apps with React Native",
         icon: "📱",
         color: "from-pink-500 to-rose-500",
         link: "https://forms.google.com/mobile-dev",
         gradient: "from-pink-500/20 to-rose-500/20",
         duration: "4 Days",
         level: "Intermediate",
      },
      {
         id: 6,
         title: "Data Science & Analytics",
         description: "Extract insights from data using Python and tools",
         icon: "📈",
         color: "from-yellow-500 to-orange-500",
         link: "https://forms.google.com/data-science",
         gradient: "from-yellow-500/20 to-orange-500/20",
         duration: "3 Days",
         level: "Beginner",
      },
      {
         id: 7,
         title: "Blockchain Technology",
         description: "Understand blockchain and build smart contracts",
         icon: "⛓️",
         color: "from-amber-500 to-yellow-600",
         link: "https://forms.google.com/blockchain",
         gradient: "from-amber-500/20 to-yellow-600/20",
         duration: "2 Days",
         level: "Advanced",
      },
      {
         id: 8,
         title: "UI/UX Design Masterclass",
         description: "Create beautiful and user-friendly interfaces",
         icon: "🎨",
         color: "from-fuchsia-500 to-purple-600",
         link: "https://forms.google.com/ui-ux-design",
         gradient: "from-fuchsia-500/20 to-purple-600/20",
         duration: "3 Days",
         level: "Beginner",
      },
      {
         id: 9,
         title: "DevOps & CI/CD",
         description: "Automate deployment with modern DevOps practices",
         icon: "⚙️",
         color: "from-slate-500 to-gray-600",
         link: "https://forms.google.com/devops",
         gradient: "from-slate-500/20 to-gray-600/20",
         duration: "3 Days",
         level: "Advanced",
      },
   ];

   const handleRegistration = (link) => {
      window.open(link, "_blank");
   };

   const getLevelColor = (level) => {
      switch (level) {
         case "Beginner":
            return "text-green-400 bg-green-500/20";
         case "Intermediate":
            return "text-yellow-400 bg-yellow-500/20";
         case "Advanced":
            return "text-red-400 bg-red-500/20";
         default:
            return "text-gray-400 bg-gray-500/20";
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#1c1535] via-[#2a1f4a] to-[#1a0f2e] text-white relative">
         {/* Animated Background Elements */}
         <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div
                  className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/20 via-transparent to-blue-500/20"
                  style={{
                     backgroundImage: `
                        linear-gradient(rgba(246, 166, 35, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(246, 166, 35, 0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: "50px 50px",
                     animation: "gridMove 20s linear infinite",
                  }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
               {[...Array(25)].map((_, i) => (
                  <div
                     key={i}
                     className="absolute animate-pulse"
                     style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                     }}>
                     <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-ping"
                        style={{
                           animationDelay: `${Math.random() * 2}s`,
                           animationDuration: `${2 + Math.random() * 3}s`,
                        }}></div>
                  </div>
               ))}
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div
               className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#F6A623]/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
               style={{ animationDelay: "2s" }}></div>
            <div
               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
               style={{ animationDelay: "4s" }}></div>
         </div>

         {/* Custom CSS Animations */}
         <style>{`
            @keyframes gridMove {
               0% { transform: translate(0, 0); }
               100% { transform: translate(50px, 50px); }
            }
            @keyframes float {
               0%, 100% { transform: translateY(0px) rotate(0deg); }
               50% { transform: translateY(-20px) rotate(5deg); }
            }
         `}</style>

         {/* Main Content */}
         <div className="relative z-10 container mx-auto px-6 py-20">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-6">
               {/* Back Button */}
               <button
                  onClick={() => navigate("/CseFest/registration")}
                  className="group inline-flex items-center space-x-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-xl hover:border-[#F6A623]/50 hover:bg-white/20 transition-all duration-300 mb-8">
                  <svg
                     className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                     />
                  </svg>
                  <span className="font-semibold">Back to All Events</span>
               </button>

               <div className="inline-block animate-float">
                  <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                     <h1 className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                        WORKSHOP REGISTRATION
                     </h1>
                  </div>
               </div>

               <div className="flex items-center justify-center space-x-3">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
               </div>

               <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Expand your skills with hands-on workshops led by industry experts.
                  Limited seats available!
               </p>

               {/* Stats Bar */}
               <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3">
                     <div className="text-3xl font-bold text-[#F6A623]">
                        {workshops.length}
                     </div>
                     <div className="text-sm text-gray-300">Workshops</div>
                  </div>
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3">
                     <div className="text-3xl font-bold text-blue-400">2-5</div>
                     <div className="text-sm text-gray-300">Days Duration</div>
                  </div>
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3">
                     <div className="text-3xl font-bold text-purple-400">All</div>
                     <div className="text-sm text-gray-300">Skill Levels</div>
                  </div>
               </div>
            </div>

            {/* Workshop Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
               {workshops.map((workshop) => (
                  <div
                     key={workshop.id}
                     className="group relative"
                     onMouseEnter={() => setHoveredCard(workshop.id)}
                     onMouseLeave={() => setHoveredCard(null)}>
                     {/* Glow Effect */}
                     <div
                        className={`absolute inset-0 bg-gradient-to-r ${workshop.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>

                     {/* Card */}
                     <div
                        className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 transition-all duration-500 transform group-hover:scale-105 group-hover:border-white/40 h-full flex flex-col ${
                           hoveredCard === workshop.id ? "shadow-2xl" : "shadow-lg"
                        }`}>
                        {/* Icon and Badges */}
                        <div className="flex items-start justify-between mb-4">
                           <div
                              className={`w-16 h-16 bg-gradient-to-br ${workshop.gradient} rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                              {workshop.icon}
                           </div>
                           <div className="flex flex-col gap-2">
                              <span
                                 className={`${getLevelColor(
                                    workshop.level
                                 )} text-xs font-semibold px-3 py-1 rounded-full`}>
                                 {workshop.level}
                              </span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 flex-grow">
                           <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                              {workshop.title}
                           </h3>
                           <p className="text-gray-300 text-sm leading-relaxed">
                              {workshop.description}
                           </p>

                           {/* Duration Badge */}
                           <div className="flex items-center space-x-2 text-sm">
                              <svg
                                 className="w-4 h-4 text-[#F6A623]"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                 <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                              </svg>
                              <span className="text-gray-300">{workshop.duration}</span>
                           </div>
                        </div>

                        {/* Button */}
                        <button
                           onClick={() => handleRegistration(workshop.link)}
                           className={`mt-4 w-full bg-gradient-to-r ${workshop.color} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:shadow-lg group-hover:shadow-white/20 relative overflow-hidden`}>
                           <span className="relative z-10 flex items-center justify-center space-x-2">
                              <span>Register Now</span>
                              <svg
                                 className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
                           </span>
                           {/* Shine Effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>

                        {/* Corner Accent */}
                        <div
                           className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${workshop.color} rounded-full animate-pulse`}></div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Bottom Info Section */}
            <div className="mt-20 text-center space-y-6">
               <div className="inline-block bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-3xl">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                     <svg
                        className="w-6 h-6 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
                     </svg>
                     <h3 className="text-2xl font-bold text-blue-400">
                        Workshop Benefits
                     </h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                     <div className="space-y-2">
                        <div className="text-[#F6A623] font-bold">✓ Certificate</div>
                        <p className="text-gray-300 text-sm">
                           Receive official certification upon completion
                        </p>
                     </div>
                     <div className="space-y-2">
                        <div className="text-blue-400 font-bold">✓ Hands-on Learning</div>
                        <p className="text-gray-300 text-sm">
                           Practical projects and real-world scenarios
                        </p>
                     </div>
                     <div className="space-y-2">
                        <div className="text-purple-400 font-bold">✓ Expert Mentors</div>
                        <p className="text-gray-300 text-sm">
                           Learn from industry professionals
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WorkshopRegistration;
