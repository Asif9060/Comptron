import { useState, useEffect, useMemo } from "react";

const Project = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredProjects, setFilteredProjects] = useState([]);

   const categories = [
      "All",
      "Web Development",
      "Mobile Apps",
      "AI/ML",
      "Data Science",
      "IoT",
      "Blockchain",
      "Game Development",
   ];

   const projects = useMemo(
      () => [
         {
            id: 1,
            title: "Smart Healthcare System",
            category: "AI/ML",
            description:
               "An AI-powered healthcare management system that predicts patient outcomes and optimizes treatment plans using machine learning algorithms.",
            image: "🏥",
            technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
            team: ["Alice Johnson", "Bob Smith", "Carol Davis"],
            university: "North Western University",
            github: "#",
            demo: "#",
            award: "Best AI Project",
            status: "Featured",
         },
         {
            id: 2,
            title: "EcoTracker Mobile App",
            category: "Mobile Apps",
            description:
               "A comprehensive mobile application for tracking carbon footprint, promoting sustainable living, and connecting eco-conscious communities.",
            image: "🌱",
            technologies: ["React Native", "Firebase", "Node.js", "Express"],
            team: ["David Wilson", "Emma Brown", "Frank Miller"],
            university: "BUET",
            github: "#",
            demo: "#",
            award: "Best Mobile App",
            status: "Featured",
         },
         {
            id: 3,
            title: "Blockchain Voting System",
            category: "Blockchain",
            description:
               "A secure, transparent, and tamper-proof voting system built on blockchain technology ensuring election integrity and voter privacy.",
            image: "🗳️",
            technologies: ["Solidity", "Web3.js", "React", "Ethereum", "Metamask"],
            team: ["Grace Lee", "Henry Chen", "Ivy Rodriguez"],
            university: "MIT",
            github: "#",
            demo: "#",
            award: "Most Innovative",
            status: "New",
         },
         {
            id: 4,
            title: "Virtual Reality Learning Platform",
            category: "Game Development",
            description:
               "An immersive VR educational platform that makes learning interactive and engaging through 3D environments and gamification.",
            image: "🥽",
            technologies: ["Unity", "C#", "Oculus SDK", "Blender", "3ds Max"],
            team: ["Jack Thompson", "Kate Anderson", "Liam Wilson"],
            university: "Stanford University",
            github: "#",
            demo: "#",
            award: "Best VR Project",
            status: "Featured",
         },
         {
            id: 5,
            title: "Smart City IoT Dashboard",
            category: "IoT",
            description:
               "A comprehensive IoT solution for smart city management including traffic monitoring, air quality tracking, and energy optimization.",
            image: "🏙️",
            technologies: ["Arduino", "Raspberry Pi", "Node.js", "Socket.io", "Chart.js"],
            team: ["Mia Garcia", "Noah Davis", "Olivia Martinez"],
            university: "Harvard University",
            github: "#",
            demo: "#",
            award: "Best IoT Solution",
            status: "Popular",
         },
         {
            id: 6,
            title: "E-Commerce Analytics Platform",
            category: "Data Science",
            description:
               "Advanced analytics platform for e-commerce businesses providing insights on customer behavior, sales trends, and inventory optimization.",
            image: "📊",
            technologies: ["Python", "Pandas", "Plotly", "Django", "PostgreSQL"],
            team: ["Paul Johnson", "Quinn Lee", "Rachel Kim"],
            university: "University of Toronto",
            github: "#",
            demo: "#",
            award: "Best Data Project",
            status: "Featured",
         },
         {
            id: 7,
            title: "Social Media Management Tool",
            category: "Web Development",
            description:
               "A comprehensive social media management platform with scheduling, analytics, and multi-platform posting capabilities.",
            image: "📱",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Redis"],
            team: ["Sam Wilson", "Tina Brown", "Uma Patel"],
            university: "Oxford University",
            github: "#",
            demo: "#",
            award: "People's Choice",
            status: "Popular",
         },
         {
            id: 8,
            title: "AI Content Generator",
            category: "AI/ML",
            description:
               "An AI-powered content generation tool that creates high-quality articles, blogs, and marketing copy using natural language processing.",
            image: "✍️",
            technologies: ["Python", "GPT-3", "Flask", "React", "Docker"],
            team: ["Victor Chen", "Wendy Liu", "Xavier Rodriguez"],
            university: "Cambridge University",
            github: "#",
            demo: "#",
            award: "Most Creative",
            status: "New",
         },
      ],
      []
   );

   useEffect(() => {
      let filtered = projects;

      if (selectedCategory !== "All") {
         filtered = filtered.filter((project) => project.category === selectedCategory);
      }

      if (searchTerm) {
         filtered = filtered.filter(
            (project) =>
               project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               project.technologies.some((tech) =>
                  tech.toLowerCase().includes(searchTerm.toLowerCase())
               )
         );
      }

      setFilteredProjects(filtered);
   }, [selectedCategory, searchTerm, projects]);

   const getStatusColor = (status) => {
      switch (status) {
         case "Featured":
            return "bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535]";
         case "New":
            return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
         case "Popular":
            return "bg-gradient-to-r from-purple-500 to-violet-500 text-white";
         default:
            return "bg-gray-500 text-white";
      }
   };

   const getAwardIcon = (award) => {
      if (award.includes("Best")) return "🏆";
      if (award.includes("Most")) return "⭐";
      if (award.includes("People")) return "❤️";
      return "🎖️";
   };

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
                           <path d="M20 6L9 17l-5-5" />
                        </svg>
                     </div>
                     <div>
                        <div className="text-xl font-bold text-white">CSE FEST</div>
                        <div className="text-xs text-[#F6A623]">
                           Project Showcase 2025
                        </div>
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
                        Projects
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
                           Projects
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
                        <path d="M20 6L9 17l-5-5" />
                     </svg>
                     <span className="text-[#F6A623] font-semibold">CSE FEST 2025</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                     PROJECT <span className="text-[#F6A623]">SHOWCASE</span>
                     <div className="text-2xl md:text-3xl text-purple-300 font-normal mt-2">
                        Innovation • Creativity • Excellence
                     </div>
                  </h1>

                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                     Discover groundbreaking projects from brilliant minds across
                     universities. Explore innovative solutions, cutting-edge
                     technologies, and creative implementations that shape the future.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                     <button className="bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535] px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#F6A623]/25 transition-all duration-300 transform hover:scale-105">
                        Submit Project
                     </button>
                     <button className="border-2 border-[#F6A623] text-[#F6A623] px-8 py-4 rounded-xl font-semibold hover:bg-[#F6A623] hover:text-[#1c1535] transition-all duration-300">
                        View Winners
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
                        Download Guidelines
                     </button>
                  </div>

                  {/* Showcase Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">150+</div>
                        <div className="text-gray-300">Projects</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">50+</div>
                        <div className="text-gray-300">Universities</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">8</div>
                        <div className="text-gray-300">Categories</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-3xl font-bold text-[#F6A623] mb-2">₹2L</div>
                        <div className="text-gray-300">Prize Pool</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Search and Filter Section */}
         <section className="py-16 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="max-w-6xl mx-auto">
                  {/* Search Bar */}
                  <div className="mb-8">
                     <div className="relative max-w-md mx-auto">
                        <input
                           type="text"
                           placeholder="Search projects, technologies..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full bg-white/20 border border-white/30 rounded-xl px-12 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-[#F6A623] transition-colors backdrop-blur-sm"
                        />
                        <svg
                           className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                        </svg>
                     </div>
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                     {categories.map((category) => (
                        <button
                           key={category}
                           onClick={() => setSelectedCategory(category)}
                           className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                              selectedCategory === category
                                 ? "bg-[#F6A623] text-[#1c1535] shadow-lg shadow-[#F6A623]/25"
                                 : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                           }`}>
                           {category}
                        </button>
                     ))}
                  </div>

                  {/* Results Count */}
                  <div className="text-center mb-8">
                     <p className="text-gray-300">
                        Showing{" "}
                        <span className="text-[#F6A623] font-semibold">
                           {filteredProjects.length}
                        </span>{" "}
                        projects
                        {selectedCategory !== "All" && (
                           <span>
                              {" "}
                              in{" "}
                              <span className="text-[#F6A623] font-semibold">
                                 {selectedCategory}
                              </span>
                           </span>
                        )}
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Projects Grid */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {filteredProjects.map((project) => (
                     <div
                        key={project.id}
                        className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-[#F6A623]/50 transition-all duration-300 group hover:scale-105 relative overflow-hidden">
                        {/* Status Badge */}
                        <div
                           className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                              project.status
                           )}`}>
                           {project.status}
                        </div>

                        {/* Project Icon */}
                        <div className="text-6xl mb-6 text-center">{project.image}</div>

                        {/* Project Info */}
                        <div className="mb-6">
                           <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#F6A623] transition-colors">
                              {project.title}
                           </h3>
                           <p className="text-gray-300 leading-relaxed mb-4">
                              {project.description}
                           </p>

                           {/* Category */}
                           <div className="inline-block px-3 py-1 bg-[#F6A623]/20 rounded-full text-[#F6A623] text-sm font-semibold mb-4">
                              {project.category}
                           </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                           <h4 className="text-sm font-semibold text-gray-400 mb-3">
                              TECHNOLOGIES
                           </h4>
                           <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                 <span
                                    key={index}
                                    className="px-3 py-1 bg-white/20 rounded-lg text-white text-sm">
                                    {tech}
                                 </span>
                              ))}
                           </div>
                        </div>

                        {/* Team Info */}
                        <div className="mb-6">
                           <h4 className="text-sm font-semibold text-gray-400 mb-2">
                              TEAM
                           </h4>
                           <p className="text-gray-300 text-sm mb-1">
                              {project.team.join(", ")}
                           </p>
                           <p className="text-[#F6A623] text-sm font-medium">
                              {project.university}
                           </p>
                        </div>

                        {/* Award */}
                        <div className="mb-6">
                           <div className="flex items-center space-x-2 text-[#F6A623]">
                              <span className="text-lg">
                                 {getAwardIcon(project.award)}
                              </span>
                              <span className="font-semibold">{project.award}</span>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                           <a
                              href={project.github}
                              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2">
                              <svg
                                 className="w-4 h-4"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              <span>Code</span>
                           </a>
                           <a
                              href={project.demo}
                              className="flex-1 bg-gradient-to-r from-[#F6A623] to-orange-500 hover:shadow-lg hover:shadow-[#F6A623]/25 text-[#1c1535] py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2">
                              <svg
                                 className="w-4 h-4"
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
                              <span>Demo</span>
                           </a>
                        </div>
                     </div>
                  ))}
               </div>

               {/* No Results */}
               {filteredProjects.length === 0 && (
                  <div className="text-center py-16">
                     <div className="text-6xl mb-4">🔍</div>
                     <h3 className="text-2xl font-bold text-white mb-4">
                        No Projects Found
                     </h3>
                     <p className="text-gray-300">
                        Try adjusting your search or filter criteria
                     </p>
                  </div>
               )}
            </div>
         </section>

         {/* Featured Categories */}
         <section className="py-20 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Featured <span className="text-[#F6A623]">Categories</span>
                  </h2>
                  <p className="text-xl text-gray-300">
                     Explore projects across diverse technology domains
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {[
                     {
                        name: "AI/ML",
                        icon: "🤖",
                        count: 25,
                        color: "from-blue-500 to-cyan-500",
                     },
                     {
                        name: "Web Dev",
                        icon: "🌐",
                        count: 35,
                        color: "from-green-500 to-emerald-500",
                     },
                     {
                        name: "Mobile",
                        icon: "📱",
                        count: 20,
                        color: "from-purple-500 to-violet-500",
                     },
                     {
                        name: "Blockchain",
                        icon: "⛓️",
                        count: 15,
                        color: "from-[#F6A623] to-orange-500",
                     },
                     {
                        name: "IoT",
                        icon: "📡",
                        count: 18,
                        color: "from-red-500 to-pink-500",
                     },
                     {
                        name: "Data Science",
                        icon: "📊",
                        count: 22,
                        color: "from-indigo-500 to-blue-500",
                     },
                     {
                        name: "Game Dev",
                        icon: "🎮",
                        count: 12,
                        color: "from-teal-500 to-cyan-500",
                     },
                     {
                        name: "Others",
                        icon: "🔧",
                        count: 8,
                        color: "from-gray-500 to-gray-600",
                     },
                  ].map((category, index) => (
                     <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F6A623]/50 transition-all duration-300 text-center group hover:scale-105 cursor-pointer"
                        onClick={() =>
                           setSelectedCategory(
                              category.name === "Web Dev"
                                 ? "Web Development"
                                 : category.name === "Mobile"
                                 ? "Mobile Apps"
                                 : category.name
                           )
                        }>
                        <div
                           className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg`}>
                           {category.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F6A623] transition-colors">
                           {category.name}
                        </h3>
                        <p className="text-[#F6A623] font-semibold">
                           {category.count} Projects
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Call to Action */}
         <section className="py-20">
            <div className="mx-auto px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Ready to <span className="text-[#F6A623]">Showcase</span> Your
                     Project?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                     Join hundreds of innovators who have already showcased their
                     groundbreaking projects. Share your work with the world and get
                     recognized for your creativity and technical excellence.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                     <button className="bg-gradient-to-r from-[#F6A623] to-orange-500 text-[#1c1535] px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#F6A623]/25 transition-all duration-300 transform hover:scale-105">
                        Submit Your Project
                     </button>
                     <button className="border-2 border-[#F6A623] text-[#F6A623] px-12 py-4 rounded-xl font-bold text-lg hover:bg-[#F6A623] hover:text-[#1c1535] transition-all duration-300">
                        Learn More
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-2">Win Prizes</h3>
                        <p className="text-gray-300">
                           Compete for amazing prizes and recognition
                        </p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">🤝</div>
                        <h3 className="text-xl font-bold text-white mb-2">Network</h3>
                        <p className="text-gray-300">
                           Connect with like-minded developers and innovators
                        </p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">💼</div>
                        <h3 className="text-xl font-bold text-white mb-2">
                           Career Boost
                        </h3>
                        <p className="text-gray-300">
                           Get noticed by top companies and recruiters
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
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
                              <path d="M20 6L9 17l-5-5" />
                           </svg>
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-[#F6A623]">
                              CSE FEST
                           </div>
                           <div className="text-sm text-[#F6A623]/70">
                              Project Showcase 2025
                           </div>
                        </div>
                     </div>
                     <p className="text-gray-300 leading-relaxed">
                        Discover, explore, and showcase innovative projects from brilliant
                        minds across universities. A platform for creativity, innovation,
                        and excellence.
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
                        {[
                           "Home",
                           "Events",
                           "Projects",
                           "Winners",
                           "Submit",
                           "Contact",
                        ].map((link) => (
                           <li key={link}>
                              <a
                                 href="#"
                                 className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                 {link}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Categories
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
                                 d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 Web Development
                              </div>
                              <div className="text-gray-400 text-sm">35 Projects</div>
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
                                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">Mobile Apps</div>
                              <div className="text-gray-400 text-sm">20 Projects</div>
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
                                 d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">AI/ML Projects</div>
                              <div className="text-gray-400 text-sm">25 Projects</div>
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
                           <span className="text-gray-300">projects@csefest.com</span>
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
                           <span className="text-gray-300">+880 1890-430562</span>
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
                     © 2025 CSE FEST Project Showcase. All rights reserved.
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
                        Submission Guidelines
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Project;
