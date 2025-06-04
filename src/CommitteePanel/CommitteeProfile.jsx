import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import male from "../assets/images/male.jpg";
import female from "../assets/images/female.jpg";
const CommitteeProfile = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const [editOpen, setEditOpen] = useState(false);
   const [successMsg, setSuccessMsg] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/members/${id}`)
         .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
            return res.json();
         })
         .then((data) => {
            setUser(data);
            setError("");
         })
         .catch((err) => {
            console.error("Fetch error:", err);
            setError("Failed to load profile. Please check the user ID.");
         });
   }, [id]);

   if (!user && !error) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-[#111] text-white text-2xl">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-[Poppins] p-4 md:p-8 overflow-x-hidden">
         {/* Backdrop Overlay */}
         <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
               sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
         />

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-xl text-white transform ${
               sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } md:translate-x-0 md:opacity-100 transition-all duration-300 ease-out z-50 border-r border-white/10`}>
            <div className="flex flex-col h-full">
               {/* Logo and Title - Add slide-in animation for children */}
               <a href="/">
                  <div className="p-6">
                     <div
                        className={`flex items-center cursor-pointer gap-3 mb-8 transition-transform duration-500 delay-100 ${
                           sidebarOpen
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-4 opacity-0"
                        } md:translate-x-0 md:opacity-100`}>
                        <img src={logo} alt="Comptron Logo" className="w-10 h-10" />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                           Comptron
                        </h2>
                     </div>
                  </div>
               </a>

               {/* Navigation - Add staggered animation for nav items */}
               <nav className="flex-1 px-4 space-y-2">
                  {[
                     {
                        to: "/",
                        icon: "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z",
                        text: "Home",
                     },
                     {
                        to: `/members/CommitteeProfile/${id}`,
                        icon: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z",
                        text: "Profile",
                     },
                     {
                        to: "/GMembers",
                        icon: "M144 160A80 80 0 1 0 144 0a80 80 0 1 0 0 160zm368 0A80 80 0 1 0 512 0a80 80 0 1 0 0 160zM0 298.7C0 310.4 9.6 320 21.3 320H234.7c.2 0 .4 0 .7 0c-26.6-23.5-43.3-57.8-43.3-96c0-7.6 .7-15 1.9-22.3c-13.6-6.3-28.7-9.7-44.6-9.7H106.7C47.8 192 0 239.8 0 298.7zM320 320c24 0 45.9-8.8 62.7-23.3c2.5-2.2 5-4.6 7.3-7c-17.3-10.5-37.7-16.7-59.7-16.7h-42.7c-22 0-42.4 6.2-59.7 16.7c2.3 2.4 4.8 4.8 7.3 7C252.1 311.2 274 320 298 320h22zm-42.7-64h42.7c46.4 0 85.3 32.3 95.7 75.7c1.5-3.8 2.3-7.9 2.3-12.1c0-17.3-14-31.3-31.3-31.3H405.3c-44.2 0-80-35.8-80-80V176c0-17.7-14.3-32-32-32H261.3c-17.7 0-32 14.3-32 32v32c0 44.2-35.8 80-80 80H106.7C89.3 320 75.3 334 75.3 351.3c0 4.2 .8 8.3 2.3 12.1C88.3 320 127.2 287.7 173.6 287.7h42.7zM533.3 192H490.7c-15.9 0-31 3.5-44.6 9.7c1.3 7.3 1.9 14.7 1.9 22.3c0 38.2-16.8 72.5-43.3 96c.2 0 .4 0 .7 0H618.7c11.7 0 21.3-9.6 21.3-21.3C640 239.8 592.2 192 533.3 192z",
                        text: "All Members",
                     },
                     {
                        to: "/Committee",
                        icon: "M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z",
                        text: "Committee",
                     },
                  ].map((item, index) => (
                     <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                           `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                 ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                                 : "hover:bg-white/5 hover:text-blue-400"
                           } ${
                              sidebarOpen
                                 ? "translate-x-0 opacity-100"
                                 : "-translate-x-4 opacity-0"
                           } md:translate-x-0 md:opacity-100`
                        }
                        style={{
                           transitionDelay: `${(index + 2) * 100}ms`,
                        }}
                        onClick={() => setSidebarOpen(false)}>
                        <svg
                           className="w-5 h-5"
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 576 512">
                           <path fill="currentColor" d={item.icon} />
                        </svg>
                        {item.text}
                     </NavLink>
                  ))}
               </nav>

               {/* Divider */}
               <div
                  className={`px-6 py-4 transition-all duration-500 delay-500 ${
                     sidebarOpen ? "opacity-100" : "opacity-0"
                  } md:opacity-100`}>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
               </div>

               {/* Footer */}
               <div
                  className={`p-6 transition-all duration-500 delay-600 ${
                     sidebarOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } md:translate-y-0 md:opacity-100`}>
                  <p className="text-xs text-center text-gray-500">
                     © 2025 Comptron. All rights reserved.
                  </p>
               </div>
            </div>
         </div>

         {/* Mobile Sidebar Toggle - Add rotation animation */}
         <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/5 transition-all duration-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div
               className={`transition-transform duration-300 ${
                  sidebarOpen ? "rotate-90" : "rotate-0"
               }`}>
               {sidebarOpen ? (
                  <svg
                     className="w-6 h-6"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 384 512">
                     <path
                        fill="currentColor"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                     />
                  </svg>
               ) : (
                  <svg
                     className="w-6 h-6"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                     <path
                        fill="currentColor"
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                     />
                  </svg>
               )}
            </div>
         </button>

         {/* Main Content */}
         <div className="w-full md:ml-48 transition-all duration-300">
            <div className="max-w-6xl mx-auto">
               {error && (
                  <div className="bg-red-500/20 backdrop-blur-md text-white px-6 py-4 rounded-xl mb-6 border border-red-500/20">
                     {error}
                  </div>
               )}
               {successMsg && (
                  <div className="bg-green-500/20 backdrop-blur-md text-white px-6 py-4 rounded-xl mb-6 border border-green-500/20 animate-fade-in">
                     {successMsg}
                  </div>
               )}

               {user && (
                  <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10">
                     <div className="relative mb-16">
                        {/* Profile Image */}
                        <div className="relative text-center">
                           {user.image ? (
                              <img
                                 src={user.image}
                                 alt="Profile"
                                 className="w-32 h-32 aspect-square rounded-full mx-auto ring-4 ring-white/10 shadow-xl object-cover transform hover:scale-105 transition-transform duration-300"
                                 onError={(e) => (e.target.src = "/fallback-image.png")}
                              />
                           ) : (
                              <img
                                 src={
                                    user.gender?.toLowerCase() === "female"
                                       ? female
                                       : male
                                 }
                                 alt="Default Avatar"
                                 className="w-32 h-32 aspect-square rounded-full mx-auto ring-4 ring-white/10 shadow-xl object-cover"
                              />
                           )}

                           <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {user.name}
                           </h1>
                           <p className="text-blue-400 mt-2">{user.customId}</p>

                           <div className="mt-3">
                              <span
                                 className={`inline-flex items-center px-4 py-1 rounded-full text-sm ${
                                    user.isValid
                                       ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                       : "bg-red-500/20 text-red-400 border border-red-500/30"
                                 }`}>
                                 <span
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                       user.isValid ? "bg-green-400" : "bg-red-400"
                                    }`}></span>
                                 {user.isValid
                                    ? `Valid until ${new Date(
                                         user.validityDate
                                      ).toLocaleDateString()}`
                                    : "Expired"}
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Skills Section */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                           <h2 className="text-xl text-center font-semibold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                              Skills
                           </h2>
                           {user.skills && typeof user.skills === "string" ? (
                              <div className="flex flex-wrap gap-2 justify-center">
                                 {user.skills.split(",").map((skill, index) => (
                                    <span
                                       key={index}
                                       className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/20 transition-colors duration-300">
                                       {skill.trim()}
                                    </span>
                                 ))}
                              </div>
                           ) : Array.isArray(user.skills) && user.skills.length > 0 ? (
                              <div className="flex flex-wrap gap-2 justify-center">
                                 {user.skills.map((skill, index) => (
                                    <span
                                       key={index}
                                       className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/20 transition-colors duration-300">
                                       {skill}
                                    </span>
                                 ))}
                              </div>
                           ) : (
                              <p className="text-gray-400 text-center text-sm">
                                 No skills added
                              </p>
                           )}
                        </div>

                        {/* External Links Section */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                           <h2 className="text-xl text-center font-semibold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                              External Links
                           </h2>
                           <div className="flex flex-wrap justify-center gap-4">
                              {" "}
                              {user.socials?.github && (
                                 <a
                                    href={user.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                       <svg
                                          className="w-6 h-6"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 496 512">
                                          <path
                                             fill="currentColor"
                                             d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                          />
                                       </svg>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white">
                                       GitHub
                                    </span>
                                 </a>
                              )}
                              {user.socials?.linkedin && (
                                 <a
                                    href={user.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                       <svg
                                          className="w-6 h-6"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 448 512">
                                          <path
                                             fill="currentColor"
                                             d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                          />
                                       </svg>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white">
                                       LinkedIn
                                    </span>
                                 </a>
                              )}
                              {user.socials?.cv && (
                                 <a
                                    href={user.socials.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                       <svg
                                          className="w-6 h-6"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 384 512">
                                          <path
                                             fill="currentColor"
                                             d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 224H88c30.9 0 56 25.1 56 56s-25.1 56-56 56H80v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm24 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H80v48h8zm72-64c0-8.8 7.2-16 16-16h24c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H176c-8.8 0-16-7.2-16-16V240zm32 112h8c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16h-8v96zm96-128h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H304v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H304v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V240c0-8.8 7.2-16 16-16z"
                                          />
                                       </svg>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white">
                                       CV
                                    </span>
                                 </a>
                              )}
                              {user.socials?.portfolio && (
                                 <a
                                    href={user.socials.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                       <svg
                                          className="w-6 h-6"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512">
                                          <path
                                             fill="currentColor"
                                             d="M352 256c0 22.2-1.2 43.6-3.3 64h-185.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.3c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64h-123.1c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32h-116.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0h-176.6c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5c11.2-10.6 20.5-13.8 27.8-13.8s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0h-116.7c30-74.1 93.6-130.9 171.9-151.6c-25.5 34.2-45.3 87.7-55.3 151.6zm-135.9 32h123.1c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64h-123.1c-5.3-20.5-8.1-41.9-8.1-64s2.8-43.5 8.1-64zm323.9 128h-176.6c-6.1 36.4-15.5 68.6-27 94.7c-10.5 23.6-22.2 40.7-33.5 51.5c-11.2 10.6-20.5 13.8-27.8 13.8s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5c-11.6-26-20.9-58.2-27-94.7h176.6c6.1 36.4 15.5 68.6 27 94.7c10.5 23.6 22.2 40.7 33.5 51.5c11.2 10.6 20.5 13.8 27.8 13.8s16.6-3.2 27.8-13.8c11.3-10.8 23-27.9 33.5-51.5c11.6-26 20.9-58.2 27-94.7zm-323.9-128h123.1c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64h-123.1c-5.3-20.5-8.1-41.9-8.1-64s2.8-43.5 8.1-64z"
                                          />
                                       </svg>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white">
                                       Portfolio
                                    </span>
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Contact Info Section */}
                     <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                        <h2 className="text-xl text-center font-semibold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                           Contact Info
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                           <a
                              href={`mailto:${user.email}`}
                              className="group flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors duration-300">
                              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                                 <svg
                                    className="w-5 h-5 text-blue-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                       fill="currentColor"
                                       d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                                    />
                                 </svg>
                              </div>
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                 {user.email || "Not provided"}
                              </span>
                           </a>{" "}
                           <a
                              href={`https://wa.me/${user.phone?.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors duration-300">
                              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-400"
                                    viewBox="0 0 448 512">
                                    <path
                                       fill="currentColor"
                                       d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                    />
                                 </svg>
                              </div>
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                 {user.phone || "Not provided"}
                              </span>
                           </a>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default CommitteeProfile;
