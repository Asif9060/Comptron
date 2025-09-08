import { useState, useEffect } from "react";

const Ideathon = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   const [formData, setFormData] = useState({
      teamName: "",
      teamLeader: "",
      email: "",
      phone: "",
      university: "",
      members: "",
      posterTitle: "",
      category: "",
      abstract: "",
      previousWork: "",
   });

   const [errors, setErrors] = useState({});

   // Countdown timer for ideathon
   useEffect(() => {
      const targetDate = new Date("2025-12-20T09:00:00").getTime();

      const timer = setInterval(() => {
         const now = new Date().getTime();
         const difference = targetDate - now;

         if (difference > 0) {
            setTimeLeft({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
               minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
               seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
         }
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
      if (!formData.teamLeader.trim())
         newErrors.teamLeader = "Team leader name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.university.trim()) newErrors.university = "University is required";
      if (!formData.members.trim()) newErrors.members = "Team members are required";
      if (!formData.posterTitle.trim())
         newErrors.posterTitle = "Poster title is required";
      if (!formData.category.trim()) newErrors.category = "Category is required";
      if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";

      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Please enter a valid email address";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
         console.log("Registration submitted:", formData);
         alert("Registration submitted successfully!");
         // Reset form
         setFormData({
            teamName: "",
            teamLeader: "",
            email: "",
            phone: "",
            university: "",
            members: "",
            posterTitle: "",
            category: "",
            abstract: "",
            previousWork: "",
         });
      }
   };

   const categories = [
      "Technology & Innovation",
      "Healthcare & Medical",
      "Environmental Solutions",
      "Social Impact",
      "Business & Entrepreneurship",
      "Education & Learning",
      "Smart Cities",
      "Artificial Intelligence",
   ];

   const prizes = [
      { place: "1st Place", amount: "৳60,000", color: "from-yellow-400 to-yellow-600" },
      { place: "2nd Place", amount: "৳40,000", color: "from-gray-300 to-gray-500" },
      { place: "3rd Place", amount: "৳25,000", color: "from-amber-600 to-amber-800" },
   ];

   const schedule = [
      { time: "9:00 AM", activity: "Registration & Setup", icon: "📝" },
      { time: "10:00 AM", activity: "Opening Ceremony", icon: "🎉" },
      { time: "10:30 AM", activity: "Poster Session Begins", icon: "🖼️" },
      { time: "12:30 PM", activity: "Lunch Break", icon: "🍽️" },
      { time: "1:30 PM", activity: "Judging Session", icon: "👨‍⚖️" },
      { time: "3:30 PM", activity: "Awards Ceremony", icon: "🏆" },
      { time: "4:00 PM", activity: "Closing Remarks", icon: "🎯" },
   ];

   const judges = [
      {
         name: "Dr. Sarah Ahmed",
         title: "Research Director, Innovation Lab",
         expertise: "AI & Machine Learning",
         image: "👩‍💼",
      },
      {
         name: "Prof. Michael Chen",
         title: "Head of Engineering, Tech Corp",
         expertise: "Software Engineering",
         image: "👨‍🏫",
      },
      {
         name: "Dr. Fatima Khan",
         title: "Startup Founder & Investor",
         expertise: "Entrepreneurship",
         image: "👩‍💻",
      },
      {
         name: "Mr. David Wilson",
         title: "Innovation Consultant",
         expertise: "Product Development",
         image: "👨‍💼",
      },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#1c1535] via-purple-900 to-[#1c1535]">
         {/* Fixed Navbar */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1535]/95 backdrop-blur-lg border-b border-[#F6A623]/30">
            <div className="mx-auto px-6 py-4">
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                           className="w-6 h-6 text-[#1c1535] font-bold"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-2V2a1 1 0 00-2 0v2H9V2a1 1 0 00-2 0v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z" />
                        </svg>
                     </div>
                     <div>
                        <div className="text-xl font-bold text-white">CSE FEST</div>
                        <div className="text-xs text-[#F6A623]">Ideathon 2025</div>
                     </div>
                  </div>

                  {/* Navigation Links - Desktop */}
                  <div className="hidden md:flex items-center space-x-8">
                     <a
                        href="/CseFest"
                        className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                        Home
                     </a>
                     <a
                        href="/FestEvents"
                        className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                        Events
                     </a>
                     <a href="#" className="text-[#F6A623] font-semibold">
                        Ideathon
                     </a>
                     <a
                        href="#"
                        className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                        About
                     </a>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     className="md:hidden text-white"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}>
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>
               </div>

               {/* Mobile Menu */}
               {isMenuOpen && (
                  <div className="md:hidden mt-4 pb-4 border-t border-[#F6A623]/30 pt-4">
                     <div className="flex flex-col space-y-3">
                        <a
                           href="#"
                           className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                           Home
                        </a>
                        <a
                           href="#"
                           className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                           Events
                        </a>
                        <a href="#" className="text-[#F6A623] font-semibold">
                           Ideathon
                        </a>
                        <a
                           href="#"
                           className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                           About
                        </a>
                     </div>
                  </div>
               )}
            </div>
         </nav>

         {/* Hero Section */}
         <section className="pt-20 pb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1535]/90 to-purple-900/90"></div>
            <div className="absolute inset-0">
               <div className="absolute top-20 left-10 w-64 h-64 bg-[#F6A623]/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="text-center mb-12">
                  <div className="inline-flex items-center px-4 py-2 bg-[#F6A623]/20 backdrop-blur-sm rounded-full border border-[#F6A623]/30 mb-6">
                     <svg
                        className="w-5 h-5 text-[#F6A623] mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-2V2a1 1 0 00-2 0v2H9V2a1 1 0 00-2 0v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z" />
                     </svg>
                     <span className="text-[#F6A623] font-semibold">CSE FEST 2025</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                     IDEA<span className="text-[#F6A623]">THON</span>
                     <div className="text-2xl md:text-3xl text-purple-300 font-normal mt-2">
                        Poster Presentation Challenge
                     </div>
                  </h1>

                  <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                     Showcase your innovative ideas through compelling poster
                     presentations. Present groundbreaking solutions, research findings,
                     and creative concepts that can shape the future of technology and
                     society.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                     <button className="bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535] px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#F6A623]/25 transition-all duration-300 transform hover:scale-105">
                        Register Team
                     </button>
                     <button className="border-2 border-[#F6A623] text-[#F6A623] px-8 py-4 rounded-xl font-semibold hover:bg-[#F6A623] hover:text-[#1c1535] transition-all duration-300">
                        View Guidelines
                     </button>
                     <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-[#F6A623]/50 transition-all duration-300 flex items-center gap-2">
                        <svg
                           className="w-5 h-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                           />
                        </svg>
                        Download Rules
                     </button>
                  </div>

                  {/* Event Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">6</div>
                        <div className="text-gray-300">Hours Event</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">
                           ৳1.25L
                        </div>
                        <div className="text-gray-300">Prize Pool</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">100+</div>
                        <div className="text-gray-300">Participants</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">8</div>
                        <div className="text-gray-300">Categories</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Countdown Timer */}
         <section className="py-16 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Event Starts In</h2>
                  <p className="text-gray-300">
                     Get ready to showcase your innovative ideas!
                  </p>
               </div>

               <div className="flex justify-center items-center space-x-4 md:space-x-8">
                  {[
                     { label: "Days", value: timeLeft.days },
                     { label: "Hours", value: timeLeft.hours },
                     { label: "Minutes", value: timeLeft.minutes },
                     { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                     <div key={item.label} className="text-center">
                        <div className="bg-gradient-to-b from-[#F6A623] to-orange-600 rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#F6A623]/25 border border-[#F6A623]/30">
                           <div className="text-3xl md:text-5xl font-bold text-[#1c1535] mb-2">
                              {String(item.value).padStart(2, "0")}
                           </div>
                        </div>
                        <div className="text-gray-300 mt-3 font-semibold">
                           {item.label}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* About Ideathon */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     About <span className="text-[#F6A623]">Ideathon</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                     A poster presentation competition where participants showcase
                     innovative ideas, research findings, and creative solutions through
                     visually compelling presentations.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {[
                     {
                        icon: "💡",
                        title: "Innovation Focus",
                        description:
                           "Present breakthrough ideas that address real-world problems with innovative solutions and creative thinking.",
                     },
                     {
                        icon: "📊",
                        title: "Visual Storytelling",
                        description:
                           "Create compelling poster presentations that effectively communicate complex ideas through visual design and clear messaging.",
                     },
                     {
                        icon: "🎯",
                        title: "Problem Solving",
                        description:
                           "Demonstrate how your ideas solve specific challenges in technology, society, environment, or business domains.",
                     },
                     {
                        icon: "🏆",
                        title: "Competition Format",
                        description:
                           "Teams present their posters to expert judges who evaluate innovation, feasibility, presentation quality, and impact potential.",
                     },
                     {
                        icon: "🤝",
                        title: "Networking",
                        description:
                           "Connect with fellow innovators, industry experts, and potential mentors while showcasing your creative solutions.",
                     },
                     {
                        icon: "📈",
                        title: "Growth Opportunity",
                        description:
                           "Receive valuable feedback from judges and peers to refine your ideas and potentially develop them further.",
                     },
                  ].map((item, index) => (
                     <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-[#F6A623]/50 transition-all duration-300 group hover:scale-105">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F6A623] transition-colors">
                           {item.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                           {item.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Categories */}
         <section className="py-20 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Competition <span className="text-[#F6A623]">Categories</span>
                  </h2>
                  <p className="text-xl text-gray-300">
                     Choose your category and showcase your innovative ideas
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {categories.map((category, index) => (
                     <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:shadow-[#F6A623]/25">
                           {index === 0
                              ? "💻"
                              : index === 1
                              ? "🏥"
                              : index === 2
                              ? "🌱"
                              : index === 3
                              ? "🤝"
                              : index === 4
                              ? "💼"
                              : index === 5
                              ? "📚"
                              : index === 6
                              ? "🏙️"
                              : "🤖"}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F6A623] transition-colors">
                           {category}
                        </h3>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Schedule */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Event <span className="text-[#F6A623]">Schedule</span>
                  </h2>
                  <p className="text-xl text-gray-300">
                     Complete timeline for the Ideathon day
                  </p>
               </div>

               <div className="max-w-4xl mx-auto">
                  <div className="relative">
                     {/* Timeline line */}
                     <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F6A623] to-purple-500"></div>

                     {schedule.map((item, index) => (
                        <div key={index} className="relative flex items-center mb-8">
                           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F6A623] to-orange-500 flex items-center justify-center border-4 border-[#1c1535] font-bold text-2xl z-10 shadow-lg">
                              {item.icon}
                           </div>
                           <div className="ml-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                 <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                       {item.activity}
                                    </h3>
                                    <p className="text-[#F6A623] font-semibold">
                                       {item.time}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Judges Panel */}
         <section className="py-20 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Expert <span className="text-[#F6A623]">Judges</span>
                  </h2>
                  <p className="text-xl text-gray-300">
                     Meet our distinguished panel of industry experts
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {judges.map((judge, index) => (
                     <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105">
                        <div className="text-6xl mb-4">{judge.image}</div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F6A623] transition-colors">
                           {judge.name}
                        </h3>
                        <p className="text-[#F6A623] font-semibold mb-2">{judge.title}</p>
                        <p className="text-gray-300 text-sm">{judge.expertise}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Prizes */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Prize <span className="text-[#F6A623]">Pool</span>
                  </h2>
                  <p className="text-xl text-gray-300">
                     Compete for amazing rewards and recognition
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {prizes.map((prize, index) => (
                     <div
                        key={index}
                        className={`relative bg-gradient-to-br ${
                           prize.color
                        } rounded-3xl p-8 text-center transform ${
                           index === 0 ? "scale-110 z-10" : "hover:scale-105"
                        } transition-all duration-300 shadow-2xl`}>
                        <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                        <div className="relative z-10">
                           <div className="text-6xl mb-4">
                              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                           </div>
                           <h3 className="text-2xl font-bold text-white mb-2">
                              {prize.place}
                           </h3>
                           <div className="text-4xl font-bold text-white">
                              {prize.amount}
                           </div>
                           <p className="text-white/80 mt-4">
                              {index === 0
                                 ? "Best Innovation"
                                 : index === 1
                                 ? "Outstanding Presentation"
                                 : "Creative Solution"}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="text-center mt-12">
                  <p className="text-gray-300 text-lg">
                     Plus certificates, mentorship opportunities, and networking sessions
                     for all participants!
                  </p>
               </div>
            </div>
         </section>

         {/* Registration Form */}
         <section className="py-20 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Register <span className="text-[#F6A623]">Now</span>
                     </h2>
                     <p className="text-xl text-gray-300">
                        Join the ultimate poster presentation challenge
                     </p>
                  </div>

                  <form
                     onSubmit={handleSubmit}
                     className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Team Name *
                           </label>
                           <input
                              type="text"
                              name="teamName"
                              value={formData.teamName}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.teamName ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="Enter your team name"
                           />
                           {errors.teamName && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.teamName}
                              </p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Team Leader *
                           </label>
                           <input
                              type="text"
                              name="teamLeader"
                              value={formData.teamLeader}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.teamLeader ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="Team leader full name"
                           />
                           {errors.teamLeader && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.teamLeader}
                              </p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Email Address *
                           </label>
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.email ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="team@example.com"
                           />
                           {errors.email && (
                              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Phone Number *
                           </label>
                           <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.phone ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="+880 1XXXXXXXXX"
                           />
                           {errors.phone && (
                              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              University *
                           </label>
                           <input
                              type="text"
                              name="university"
                              value={formData.university}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.university ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="Your university name"
                           />
                           {errors.university && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.university}
                              </p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Team Members *
                           </label>
                           <input
                              type="text"
                              name="members"
                              value={formData.members}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.members ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="Member names (comma separated)"
                           />
                           {errors.members && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.members}
                              </p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Poster Title *
                           </label>
                           <input
                              type="text"
                              name="posterTitle"
                              value={formData.posterTitle}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.posterTitle ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors`}
                              placeholder="Your poster presentation title"
                           />
                           {errors.posterTitle && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.posterTitle}
                              </p>
                           )}
                        </div>

                        <div>
                           <label className="block text-white font-semibold mb-2">
                              Category *
                           </label>
                           <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className={`w-full bg-white/20 border ${
                                 errors.category ? "border-red-500" : "border-white/30"
                              } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F6A623] transition-colors`}>
                              <option value="" className="bg-[#1c1535] text-gray-300">
                                 Select a category
                              </option>
                              {categories.map((category, index) => (
                                 <option
                                    key={index}
                                    value={category}
                                    className="bg-[#1c1535] text-white">
                                    {category}
                                 </option>
                              ))}
                           </select>
                           {errors.category && (
                              <p className="text-red-400 text-sm mt-1">
                                 {errors.category}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="mt-6">
                        <label className="block text-white font-semibold mb-2">
                           Abstract *
                        </label>
                        <textarea
                           name="abstract"
                           value={formData.abstract}
                           onChange={handleInputChange}
                           rows="4"
                           className={`w-full bg-white/20 border ${
                              errors.abstract ? "border-red-500" : "border-white/30"
                           } rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors resize-none`}
                           placeholder="Provide a brief abstract of your idea (max 300 words)"></textarea>
                        {errors.abstract && (
                           <p className="text-red-400 text-sm mt-1">{errors.abstract}</p>
                        )}
                     </div>

                     <div className="mt-6">
                        <label className="block text-white font-semibold mb-2">
                           Previous Work
                        </label>
                        <textarea
                           name="previousWork"
                           value={formData.previousWork}
                           onChange={handleInputChange}
                           rows="3"
                           className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors resize-none"
                           placeholder="Any previous work or research related to your idea (optional)"></textarea>
                     </div>

                     <div className="mt-8 text-center">
                        <button
                           type="submit"
                           className="bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535] px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#F6A623]/25 transition-all duration-300 transform hover:scale-105">
                           Register Team
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </section>

         {/* Guidelines */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Presentation <span className="text-[#F6A623]">Guidelines</span>
                     </h2>
                     <p className="text-xl text-gray-300">
                        Important guidelines for your poster presentation
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-[#F6A623] mb-6 flex items-center">
                           <svg
                              className="w-6 h-6 mr-3"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                           </svg>
                           Poster Requirements
                        </h3>
                        <ul className="space-y-4 text-gray-300">
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Size: A1 (594 × 841 mm) or 24″ × 36″
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              High-resolution images and clear text
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Include title, authors, and university
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Professional design and layout
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Maximum 3-4 team members per poster
                           </li>
                        </ul>
                     </div>

                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-[#F6A623] mb-6 flex items-center">
                           <svg
                              className="w-6 h-6 mr-3"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                           Evaluation Criteria
                        </h3>
                        <ul className="space-y-4 text-gray-300">
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Innovation and creativity (30%)
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Technical feasibility (25%)
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Presentation quality (25%)
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Impact and relevance (20%)
                           </li>
                           <li className="flex items-start">
                              <span className="text-[#F6A623] mr-2">•</span>
                              Judges&apos; decision will be final
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-[#1c1535] text-white border-t-4 border-[#F6A623]">
            <div className="mx-auto px-6 py-12">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Logo and Description */}
                  <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                           <svg
                              className="w-6 h-6 text-[#1c1535] font-bold"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-2V2a1 1 0 00-2 0v2H9V2a1 1 0 00-2 0v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z" />
                           </svg>
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-[#F6A623]">
                              CSE FEST
                           </div>
                           <div className="text-sm text-[#F6A623]/70">Ideathon 2025</div>
                        </div>
                     </div>
                     <p className="text-gray-300 leading-relaxed">
                        Showcase your innovative ideas through compelling poster
                        presentations. Join the ultimate ideathon experience and compete
                        with brilliant minds.
                     </p>
                     <div className="flex space-x-4">
                        {["facebook", "twitter", "instagram", "linkedin"].map(
                           (social) => (
                              <a
                                 key={social}
                                 href="#"
                                 className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                 <svg
                                    className="w-5 h-5 text-[#F6A623]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    {social === "facebook" && (
                                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    )}
                                    {social === "twitter" && (
                                       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    )}
                                    {social === "instagram" && (
                                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    )}
                                    {social === "linkedin" && (
                                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    )}
                                 </svg>
                              </a>
                           )
                        )}
                     </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Quick Links
                     </h3>
                     <ul className="space-y-3">
                        {["Home", "Events", "Ideathon", "Guidelines", "Contact"].map(
                           (link) => (
                              <li key={link}>
                                 <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                    {link}
                                 </a>
                              </li>
                           )
                        )}
                     </ul>
                  </div>

                  {/* Event Info */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Event Info
                     </h3>
                     <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">6 Hours Event</div>
                              <div className="text-gray-400 text-sm">
                                 Full Day Experience
                              </div>
                           </div>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 3-4 Members per Team
                              </div>
                              <div className="text-gray-400 text-sm">Team Size</div>
                           </div>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 BDT 125K Prize Pool
                              </div>
                              <div className="text-gray-400 text-sm">Total Rewards</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Contact Info
                     </h3>
                     <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                           </svg>
                           <span className="text-gray-300">ideathon@csefest.com</span>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                           </svg>
                           <span className="text-gray-300">+880 1890-430563</span>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg
                              className="w-5 h-5 text-[#F6A623] mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                           </svg>
                           <span className="text-gray-300">NWU Campus, Dhaka</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Section */}
               <div className="mt-12 pt-8 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">
                     © 2025 CSE FEST Ideathon. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                     <a
                        href="#"
                        className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                        Privacy Policy
                     </a>
                     <a
                        href="#"
                        className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                        Terms of Service
                     </a>
                     <a
                        href="#"
                        className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                        Poster Guidelines
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Ideathon;
