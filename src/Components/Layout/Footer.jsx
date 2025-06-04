import "./CSS/Footer.css";
import { Link } from "react-router-dom";
import Asif from "../../assets/images/Asif.jpg";
import Shawon from "../../assets/images/Shawon.jpg";
const Footer = () => {
   return (
      <div>
         <footer className="footer-container">
            <div className="footer-content">
               <div className="logo">
                  <h1>Comptron</h1>
                  <p>North Western University's Premier Tech Club</p>
               </div>

               <div className="landscape-layout">
                  <div className="footer-section about">
                     <h4>About Comptron</h4>
                     <p>
                        Comptron is North Western University's tech club dedicated to
                        fostering innovation, collaboration, and learning in the fields of
                        technology and computer science.
                     </p>
                  </div>
                  <div className="footer-section features">
                     <h4>What We Do</h4>
                     <ul>
                        <p>
                           <i className="fas fa-users"></i> Workshops & Seminars
                        </p>
                        <p>
                           <i className="fas fa-project-diagram"></i> Collaborative
                           Projects
                        </p>
                        <p>
                           <i className="fas fa-graduation-cap"></i> Mentorship Programs
                        </p>
                        <p>
                           <i className="fas fa-laptop-code"></i> Hackathons & Coding
                           Competitions
                        </p>
                     </ul>
                  </div>
                  <div className="footer-section contact">
                     <h4>Contact Us</h4>
                     <p>Department of Computer Science and Engineering</p>
                     <p>North Western University, Khulna, Bangladesh</p>
                     <p>
                        <i className="fas fa-phone"></i>{" "}
                     </p>
                     <p>
                        <i className="fas fa-envelope"></i> comptron@nwu.ac.bd comptron.nwu@gmail.com
                     </p>
                  </div>{" "}
                  <div className="footer-section flex flex-col items-center newsletter">
                     <h4>Developed By</h4>
                     <div className="flex gap-6 mt-4">
                        <Link
                           to="/profile/CGM2025-2447"
                           className="developer-card group relative cursor-pointer">
                           <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/30 transform transition-all duration-300 group-hover:scale-110 group-hover:ring-blue-500 hover:shadow-lg">
                              <img
                                 src={Asif}
                                 alt="Developer"
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                              <p className="text-xs text-white">G.M Asif Foisal</p>
                           </div>
                        </Link>

                        <Link
                           to="/profile/CGM2025-2728"
                           className="developer-card group relative cursor-pointer">
                           <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/30 transform transition-all duration-300 group-hover:scale-110 group-hover:ring-blue-500 hover:shadow-lg">
                              <img
                                 src={Shawon}
                                 alt="Developer"
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                              <p className="text-xs text-white">Sardar Shamsul Arefin Shawon</p>
                           </div>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="social-media">
               <h4>Follow Us</h4>
               <div className="social-icons">
                  <a
                     href="https://www.facebook.com/comptron.nwu "
                     className="translate-x-4"
                     target="_blank">
                     <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                           fill="#005cfa"
                           d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                        />
                     </svg>
                  </a>
                  <a href="https://www.facebook.com/comptron.nwu" target="_blank">
                     Facebook
                  </a>
                  <a
                     className="translate-x-4"
                     href="https://www.youtube.com/@ComptronClubNWU"
                     target="_blank">
                     <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512">
                        <path
                           fill="#ff0019"
                           d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                        />
                     </svg>
                  </a>
                  <a href="https://www.youtube.com/@ComptronClubNWU" target="_blank">
                     Youtube
                  </a>
                  <a
                     className="translate-x-4"
                     href="https://www.linkedin.com/company/nwucomptron/"
                     target="_blank">
                     <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path
                           fill="#0077b5"
                           d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                        />
                     </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/comptron-nwu" target="_blank">
                     LinkedIn
                  </a>{" "}
               </div>
            </div>{" "}
            <div className="copyright">
               &copy; 2025 Comptron - North Western University. All rights reserved.
            </div>
         </footer>
      </div>
   );
};

export default Footer;
