import Navbar from "../components/Nav";

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
   // Mock data for sponsors
   const sponsors = {
      titleSponsors: [
         {
            id: 1,
            name: "TechGiant Inc.",
            logo: "https://placehold.co/300x150/1c1535/F6A623?text=TechGiant",
            tier: "Title Sponsor",
            description:
               "Global leader in innovative technology solutions powering the future.",
            website: "https://techgiant.com",
         },
         {
            id: 2,
            name: "InnovateX",
            logo: "https://placehold.co/300x150/1c1535/F6A623?text=InnovateX",
            tier: "Title Sponsor",
            description:
               "Pioneering digital transformation with cutting-edge AI and cloud solutions.",
            website: "https://innovatex.com",
         },
      ],
      platinumSponsors: [
         {
            id: 3,
            name: "CodeCraft Studios",
            logo: "https://placehold.co/250x120/1c1535/F6A623?text=CodeCraft",
            tier: "Platinum Sponsor",
            description: "Premium software development and digital innovation partner.",
            website: "https://codecraft.com",
         },
         {
            id: 4,
            name: "DigitalEdge Solutions",
            logo: "https://placehold.co/250x120/1c1535/F6A623?text=DigitalEdge",
            tier: "Platinum Sponsor",
            description: "Advanced technology solutions for the digital age.",
            website: "https://digitaledge.com",
         },
         {
            id: 5,
            name: "CyberSecure Systems",
            logo: "https://placehold.co/250x120/1c1535/F6A623?text=CyberSecure",
            tier: "Platinum Sponsor",
            description: "Leading cybersecurity and data protection specialists.",
            website: "https://cybersecure.com",
         },
      ],
      goldSponsors: [
         {
            id: 6,
            name: "CloudNexus",
            logo: "https://placehold.co/200x100/1c1535/F6A623?text=CloudNexus",
            tier: "Gold Sponsor",
            description: "Cloud infrastructure and enterprise solutions provider.",
            website: "https://cloudnexus.com",
         },
         {
            id: 7,
            name: "DataFlow Analytics",
            logo: "https://placehold.co/200x100/1c1535/F6A623?text=DataFlow",
            tier: "Gold Sponsor",
            description: "Advanced data analytics and business intelligence.",
            website: "https://dataflow.com",
         },
         {
            id: 8,
            name: "AI Dynamics",
            logo: "https://placehold.co/200x100/1c1535/F6A623?text=AI+Dynamics",
            tier: "Gold Sponsor",
            description: "Artificial intelligence and machine learning specialists.",
            website: "https://aidynamics.com",
         },
         {
            id: 9,
            name: "DevOps Pro",
            logo: "https://placehold.co/200x100/1c1535/F6A623?text=DevOps+Pro",
            tier: "Gold Sponsor",
            description: "Continuous integration and deployment experts.",
            website: "https://devopspro.com",
         },
      ],
      silverSponsors: [
         {
            id: 10,
            name: "WebFlow",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=WebFlow",
            tier: "Silver Sponsor",
            description: "Modern web development and design platform.",
            website: "https://webflow.com",
         },
         {
            id: 11,
            name: "MobileFirst",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=MobileFirst",
            tier: "Silver Sponsor",
            description: "Mobile application development specialists.",
            website: "https://mobilefirst.com",
         },
         {
            id: 12,
            name: "UX Studio",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=UX+Studio",
            tier: "Silver Sponsor",
            description: "User experience and interface design experts.",
            website: "https://uxstudio.com",
         },
         {
            id: 13,
            name: "API Connect",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=API+Connect",
            tier: "Silver Sponsor",
            description: "API development and integration services.",
            website: "https://apiconnect.com",
         },
         {
            id: 14,
            name: "TestLab",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=TestLab",
            tier: "Silver Sponsor",
            description: "Software testing and quality assurance.",
            website: "https://testlab.com",
         },
         {
            id: 15,
            name: "DesignHub",
            logo: "https://placehold.co/150x75/1c1535/F6A623?text=DesignHub",
            tier: "Silver Sponsor",
            description: "Creative design and branding solutions.",
            website: "https://designhub.com",
         },
      ],
   };

   const SponsorCard = ({ sponsor, isTitleSponsor = false }) => {
      return (
         <div className="group relative">
            {/* Modern compact card with glassmorphism */}
            <div
               className={`relative overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isTitleSponsor
                     ? "bg-gradient-to-br from-[#F6A623]/15 to-[#ff8c00]/10 border-[#F6A623]/40 p-5"
                     : "bg-[#1c1535]/60 border-[#F6A623]/20 hover:border-[#F6A623]/40 p-4"
               }`}
               style={{
                  backdropFilter: "blur(10px)",
                  boxShadow: isTitleSponsor
                     ? "0 8px 32px rgba(246, 166, 35, 0.15)"
                     : "0 4px 20px rgba(28, 21, 53, 0.3)",
               }}>
               {/* Animated background gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623]/5 via-transparent to-[#1c1535]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

               {/* Shimmer effect on hover */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
               </div>

               {/* Content */}
               <div className="relative z-10">
                  {/* Tier badge - more compact */}
                  <div className="flex items-center justify-between mb-3">
                     <span
                        className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${
                           isTitleSponsor
                              ? "bg-[#F6A623] text-[#1c1535]"
                              : "bg-[#F6A623]/10 text-[#F6A623] border border-[#F6A623]/30"
                        }`}>
                        {sponsor.tier}
                     </span>

                     {/* Floating icon */}
                     <div className="w-6 h-6 rounded-full bg-[#F6A623]/20 flex items-center justify-center animate-float-gentle">
                        <div className="w-2 h-2 rounded-full bg-[#F6A623]"></div>
                     </div>
                  </div>

                  {/* Logo - more compact */}
                  <div
                     className={`mb-3 flex items-center justify-center ${
                        isTitleSponsor ? "h-16" : "h-12"
                     }`}>
                     <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-110 filter group-hover:brightness-110"
                        onError={(e) => {
                           e.target.src = `https://placehold.co/150x75/1c1535/F6A623?text=${sponsor.name}`;
                        }}
                     />
                  </div>

                  {/* Name - more compact */}
                  <h3
                     className={`font-bold mb-2 text-center transition-colors duration-300 ${
                        isTitleSponsor ? "text-lg text-[#F6A623]" : "text-base text-white"
                     }`}>
                     {sponsor.name}
                  </h3>

                  {/* Description - more compact */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 text-center line-clamp-2">
                     {sponsor.description}
                  </p>

                  {/* Action button - more compact */}
                  <div className="flex justify-center">
                     <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${
                           isTitleSponsor
                              ? "bg-[#F6A623]/20 text-[#F6A623] hover:bg-[#F6A623] hover:text-[#1c1535]"
                              : "border border-[#F6A623]/30 text-[#F6A623] hover:bg-[#F6A623]/10 hover:border-[#F6A623]/60"
                        }`}>
                        <svg
                           className="w-3 h-3 mr-1"
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
                        Visit
                     </a>
                  </div>
               </div>
            </div>
         </div>
      );
   };

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
                  <h1 className="text-5xl md:text-6xl spnsr font-bold mb-6 bg-gradient-to-r from-[#F6A623] via-[#ff8c00] to-[#F6A623] bg-clip-text text-transparent">
                     Our Amazing Sponsors
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                     We&apos;re proud to partner with these innovative organizations for
                     NWU CSE FEST 2025
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">15+</div>
                        <div className="text-sm text-gray-400">Partners</div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">4</div>
                        <div className="text-sm text-gray-400">Tiers</div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">50+</div>
                        <div className="text-sm text-gray-400">Events</div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">
                           1000+
                        </div>
                        <div className="text-sm text-gray-400">Participants</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sponsors Container */}
         <div className="mx-auto px-6 pb-24">
            {/* Title Sponsors Section - Enhanced */}
            <div className="mb-20">
               <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center">
                     <div className="w-12 h-1 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] rounded-full"></div>
                     <h2 className="text-3xl md:text-4xl font-bold mx-6 text-[#F6A623]">
                        Title Sponsors
                     </h2>
                     <div className="w-12 h-1 bg-gradient-to-l from-[#F6A623] to-[#ff8c00] rounded-full"></div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {sponsors.titleSponsors.map((sponsor) => (
                     <SponsorCard
                        key={sponsor.id}
                        sponsor={sponsor}
                        isTitleSponsor={true}
                     />
                  ))}
               </div>
            </div>

            {/* Platinum Sponsors Section */}
            <div className="mb-20">
               <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                     <div className="w-10 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                     <h2 className="text-2xl md:text-3xl font-bold mx-4 text-gray-300">
                        Platinum Sponsors
                     </h2>
                     <div className="w-10 h-1 bg-gradient-to-l from-gray-300 to-gray-400 rounded-full"></div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {sponsors.platinumSponsors.map((sponsor) => (
                     <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
               </div>
            </div>

            {/* Gold Sponsors Section */}
            <div className="mb-20">
               <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                     <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                     <h2 className="text-2xl md:text-3xl font-bold mx-4 text-yellow-400">
                        Gold Sponsors
                     </h2>
                     <div className="w-8 h-1 bg-gradient-to-l from-yellow-400 to-yellow-500 rounded-full"></div>
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {sponsors.goldSponsors.map((sponsor) => (
                     <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
               </div>
            </div>

            {/* Silver Sponsors Section */}
            <div className="mb-20">
               <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                     <div className="w-6 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                     <h2 className="text-2xl md:text-3xl font-bold mx-4 text-gray-400">
                        Silver Sponsors
                     </h2>
                     <div className="w-6 h-1 bg-gradient-to-l from-gray-400 to-gray-500 rounded-full"></div>
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                  {sponsors.silverSponsors.map((sponsor) => (
                     <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
               </div>
            </div>

            {/* Enhanced Sponsorship CTA */}
            {/* <div className="text-center mt-20">
               <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl p-12 max-w-4xl mx-auto overflow-hidden"> */}
                  {/* Background animation */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/5 via-transparent to-[#F6A623]/5 animate-pulse"></div>

                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-gradient-to-br from-[#F6A623] to-[#ff8c00] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg
                           className="w-8 h-8 text-[#1c1535]"
                           fill="currentColor"
                           viewBox="0 0 20 20">
                           <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                     </div>

                     <h3 className="text-3xl font-bold text-[#F6A623] mb-4">
                        Become Our Partner
                     </h3>
                     <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join our network of innovative partners and gain visibility among
                        top tech talent and industry leaders at NWU CSE FEST 2025.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group relative bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F6A623]/30 overflow-hidden">
                           <span className="relative z-10">Contact for Sponsorship</span>
                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>

                        <button className="border border-[#F6A623]/40 hover:bg-[#F6A623]/10 text-[#F6A623] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:border-[#F6A623]/80">
                           Download Sponsorship Package
                        </button>
                     </div>
                  </div>
               </div>
            </div> */}
         </div>

         {/* Footer Component */}
         <Footer />
      </div>
   );
};

// Footer Component
const Footer = () => {
   return (
      <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
         <div className="mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Logo and Description */}
               <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                     <img
                        src="https://placehold.co/100x40/1c1535/F6A623?text=NWU+CSE+FEST"
                        alt="NWU CSE FEST Logo"
                        className="h-10 w-auto"
                     />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                     Join us for an exciting celebration of technology, innovation, and
                     creativity. Experience the thrilling NWU CSE FEST with competitions,
                     exhibitions, and networking opportunities.
                  </p>
                  <div className="flex space-x-4">
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.297 1.26.47 1.69.62.712.256 1.36.199 1.871.124.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-13.277c-1.302-1.306-3.02-2.071-4.89-2.073h-.002c-3.741 0-6.772 3.03-6.772 6.77 0 1.87 1.178 4.202 2.074 4.89l.002.001 3.155 1.869 1.867 3.156.001.002c.687.395 2.136.808 3.811.28.57-.18 1.727-.71 2.297-1.505.569-.794.57-1.606.57-1.61v-.002c0-3.74-3.031-6.771-6.771-6.771" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                        </svg>
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Quick Links
                  </h3>
                  <ul className="space-y-3">
                     {["Home", "Events", "Sponsors", "Contact"].map((link) => (
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
                        <span className="text-gray-300">nwucsefest@gmail.com</span>
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
                        <span className="text-gray-300">+880 1890-430560</span>
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

               {/* Event Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Event Info
                  </h3>
                  <div className="space-y-4">
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Date:</div>
                        <div className="font-medium text-white">21-29 August</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Venue:</div>
                        <div className="font-medium text-white">NWU Campus</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Duration:</div>
                        <div className="font-medium text-white">Full Day Event</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 pt-6 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-400 text-sm">
                  © 2025 NWU CSE FEST. All rights reserved.
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
                  <div className="w-px h-4 bg-gray-600"></div>
                  <p className="text-gray-400 text-sm">Developed by AS</p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default AllSponsors;
