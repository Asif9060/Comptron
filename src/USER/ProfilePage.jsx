import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import logo from "../assets/images/Comptron Logo.png";
import male from "../assets/images/male.jpg";
import female from "../assets/images/female.jpg";
import signature from "../assets/images/Signature.jpg";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
import { userAuth } from "./FirebaseUser";
import { onAuthStateChanged } from "firebase/auth";
import QRCode from "qrcode";
import "./pp.css";

const ProfilePage = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const [editOpen, setEditOpen] = useState(false);
   const [successMsg, setSuccessMsg] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [error, setError] = useState("");
   const [showIdCard, setShowIdCard] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);
   const [isOwnProfile, setIsOwnProfile] = useState(false);
   const qrCodeRef = useRef(null);
   const [qrCodeUrl, setQrCodeUrl] = useState("");

   // Check if current user is authenticated
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(userAuth, (user) => {
         setCurrentUser(user);
      });

      return () => unsubscribe();
   }, []);

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/users/profile/${id}`)
         .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
            return res.json();
         })
         .then((data) => {
            setUser(data);
            setError("");

            // Check if profile belongs to current user
            if (currentUser && currentUser.email === data.email) {
               setIsOwnProfile(true);
            } else {
               setIsOwnProfile(false);
            }
         })
         .catch((err) => {
            console.error("Fetch error:", err);
            setError("Failed to load profile. Please check the user ID.");
         });
   }, [id, currentUser]);

   // Update QR code generation
   useEffect(() => {
      if (user && qrCodeRef.current) {
         const profileUrl = window.location.origin + `/profile/${id}`;
         QRCode.toCanvas(
            qrCodeRef.current,
            profileUrl,
            {
               width: 144,
               margin: 4,
               color: {
                  dark: "#000000",
                  light: "#ffffff",
               },
               errorCorrectionLevel: "H",
            },
            function (error) {
               if (error) console.error(error);
            }
         );
      }
   }, [user, id, showIdCard]);

   const downloadIdCard = async () => {
      // Only allow download if this is the user's own profile
      if (!isOwnProfile) {
         setError("You can only download your own ID card.");
         return;
      }

      const frontCard = document.getElementById("digital-id-card-front");
      const backCard = document.getElementById("digital-id-card-back");
      if (!frontCard || !backCard) return;

      try {
         // Create a container with exact dimensions
         const container = document.createElement("div");
         container.style.width = "800px";
         container.style.height = "700px";
         container.style.display = "flex";
         container.style.justifyContent = "space-between";
         container.style.backgroundColor = "#112D4E";
         container.style.padding = "0";
         container.style.margin = "0";

         // Clone the cards and their inner content
         const frontClone = frontCard.cloneNode(true);
         const backClone = backCard.cloneNode(true);

         // Reset styles and set exact dimensions for both cards
         [frontClone, backClone].forEach((card) => {
            card.style.transform = "none";
            card.style.position = "relative";
            card.style.inset = "auto";
            card.style.width = "400px";
            card.style.margin = "0";
            card.style.padding = "0";
         });

         // Function to replace problematic colors with hex equivalents
         const fixColors = (element) => {
            // Fix all elements with potential color issues
            const allElements = element.querySelectorAll("*");
            allElements.forEach((el) => {
               // Fix background colors
               const bgColor = getComputedStyle(el).backgroundColor;
               if (
                  bgColor &&
                  (bgColor.includes("oklch") ||
                     bgColor.includes("color-mix") ||
                     bgColor.includes("lch") ||
                     bgColor.includes("lab"))
               ) {
                  if (
                     bgColor.includes("112D4E") ||
                     el.classList.contains("bg-[#112D4E]")
                  ) {
                     el.style.backgroundColor = "#112D4E";
                  } else if (
                     bgColor.includes("15A6E1") ||
                     el.classList.contains("bg-[#15A6E1]")
                  ) {
                     el.style.backgroundColor = "#15A6E1";
                  } else if (
                     bgColor.includes("white") ||
                     el.classList.contains("bg-white")
                  ) {
                     el.style.backgroundColor = "#ffffff";
                  } else {
                     el.style.backgroundColor = "#112D4E"; // fallback
                  }
               }

               // Fix text colors
               const textColor = getComputedStyle(el).color;
               if (
                  textColor &&
                  (textColor.includes("oklch") ||
                     textColor.includes("color-mix") ||
                     textColor.includes("lch") ||
                     textColor.includes("lab"))
               ) {
                  if (
                     textColor.includes("white") ||
                     el.classList.contains("text-white")
                  ) {
                     el.style.color = "#ffffff";
                  } else if (
                     textColor.includes("15A6E1") ||
                     el.classList.contains("text-[#15A6E1]")
                  ) {
                     el.style.color = "#15A6E1";
                  } else if (
                     textColor.includes("112D4E") ||
                     el.classList.contains("text-[#112D4E]")
                  ) {
                     el.style.color = "#112D4E";
                  } else if (el.classList.contains("text-black")) {
                     el.style.color = "#000000";
                  } else {
                     el.style.color = "#ffffff"; // fallback
                  }
               }

               // Fix border colors
               const borderColor = getComputedStyle(el).borderColor;
               if (
                  borderColor &&
                  (borderColor.includes("oklch") ||
                     borderColor.includes("color-mix") ||
                     borderColor.includes("lch") ||
                     borderColor.includes("lab"))
               ) {
                  if (
                     borderColor.includes("15A6E1") ||
                     el.classList.contains("border-[#15A6E1]")
                  ) {
                     el.style.borderColor = "#15A6E1";
                  } else {
                     el.style.borderColor = "#ffffff";
                  }
               }
            });

            // Explicitly set background colors for known elements
            const bgElements = element.querySelectorAll('[data-bg="primary"]');
            bgElements.forEach((el) => {
               el.style.backgroundColor = "#112D4E";
               el.style.width = "100%";
               el.style.margin = "0";
               el.style.padding = "0";
            });

            // Fix specific class-based colors
            element
               .querySelectorAll(".bg-\\[\\#112D4E\\]")
               .forEach((el) => (el.style.backgroundColor = "#112D4E"));
            element
               .querySelectorAll(".bg-\\[\\#15A6E1\\]")
               .forEach((el) => (el.style.backgroundColor = "#15A6E1"));
            element
               .querySelectorAll(".text-\\[\\#15A6E1\\]")
               .forEach((el) => (el.style.color = "#15A6E1"));
            element
               .querySelectorAll(".text-\\[\\#112D4E\\]")
               .forEach((el) => (el.style.color = "#112D4E"));
            element
               .querySelectorAll(".text-white")
               .forEach((el) => (el.style.color = "#ffffff"));
            element
               .querySelectorAll(".bg-white")
               .forEach((el) => (el.style.backgroundColor = "#ffffff"));
            element
               .querySelectorAll(".border-\\[\\#15A6E1\\]")
               .forEach((el) => (el.style.borderColor = "#15A6E1"));
         };

         fixColors(frontClone);
         fixColors(backClone);

         // Manually render QR code in the back card clone
         const qrContainer = backClone.querySelector(".flex.justify-center");
         if (qrContainer) {
            const qrHolder = qrContainer.querySelector("div");
            if (qrHolder) {
               // Remove existing content and create a new QR code image
               const existingCanvas = qrHolder.querySelector("canvas");
               if (existingCanvas) {
                  const profileUrl = window.location.origin + `/profile/${id}`;
                  const tempCanvas = document.createElement("canvas");
                  tempCanvas.width = 144;
                  tempCanvas.height = 144;

                  // Create a promise to ensure QR code is generated before continuing
                  await new Promise((resolve) => {
                     QRCode.toCanvas(
                        tempCanvas,
                        profileUrl,
                        {
                           width: 144,
                           margin: 4,
                           color: {
                              dark: "#000000",
                              light: "#ffffff",
                           },
                           errorCorrectionLevel: "H",
                        },
                        function (error) {
                           if (error) console.error(error);
                           resolve();
                        }
                     );
                  });

                  // Convert canvas to image for better html2canvas compatibility
                  const qrImg = document.createElement("img");
                  qrImg.src = tempCanvas.toDataURL("image/png");
                  qrImg.className = existingCanvas.className;
                  qrImg.width = 144;
                  qrImg.height = 144;
                  qrImg.alt = "QR Code";

                  // Replace canvas with image
                  existingCanvas.parentNode.replaceChild(qrImg, existingCanvas);
               }
            }
         }

         // Add to container
         container.appendChild(frontClone);
         container.appendChild(backClone);

         // Hide container initially
         container.style.position = "fixed";
         container.style.left = "-9999px";
         container.style.top = "-9999px";

         // Add to document for capturing
         document.body.appendChild(container);

         const canvas = await html2canvas(container, {
            backgroundColor: "#112D4E",
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false, // Disable logging to reduce console noise
            ignoreElements: (element) => {
               // Ignore elements that might cause color parsing issues
               const style = getComputedStyle(element);
               return (
                  style.backgroundColor?.includes("oklch") ||
                  style.color?.includes("oklch") ||
                  style.backgroundColor?.includes("color-mix") ||
                  style.color?.includes("color-mix")
               );
            },
            onclone: function (clonedDoc) {
               const clonedContainer = clonedDoc.body.firstChild;
               clonedContainer.style.backgroundColor = "#112D4E";

               // Additional color fixing in the cloned document
               const allElements = clonedContainer.querySelectorAll("*");
               allElements.forEach((el) => {
                  // Force replace any remaining problematic colors
                  if (
                     el.style.backgroundColor &&
                     (el.style.backgroundColor.includes("oklch") ||
                        el.style.backgroundColor.includes("color-mix"))
                  ) {
                     el.style.backgroundColor = "#112D4E";
                  }
                  if (
                     el.style.color &&
                     (el.style.color.includes("oklch") ||
                        el.style.color.includes("color-mix"))
                  ) {
                     el.style.color = "#ffffff";
                  }
               });
            },
         });

         // Remove the temporary container
         document.body.removeChild(container);

         canvas.toBlob(
            (blob) => {
               if (!blob) return;
               const url = URL.createObjectURL(blob);
               const link = document.createElement("a");
               link.download = `${user?.name || "user"}-digital-id.png`;
               link.href = url;
               link.click();
               URL.revokeObjectURL(url);
            },
            "image/png",
            1.0
         );
      } catch (err) {
         console.error("Error generating ID card:", err);
         setError("Failed to generate ID card. Please try again.");
      }
   };

   const IdCardModal = ({ onClose }) => {
      const [isFlipped, setIsFlipped] = useState(false);
      const qrCanvasRef = useRef(null);

      useEffect(() => {
         if (qrCanvasRef.current) {
            const profileUrl = window.location.origin + `/profile/${id}`;
            QRCode.toCanvas(
               qrCanvasRef.current,
               profileUrl,
               {
                  width: 144,
                  margin: 4,
                  color: {
                     dark: "#000000",
                     light: "#ffffff",
                  },
                  errorCorrectionLevel: "H",
               },
               function (error) {
                  if (error) console.error(error);
               }
            );
         }
      }, []);

      return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-transparent max-w-2xl w-full">
               <div className="flex justify-end mb-2">
                  <button
                     onClick={onClose}
                     className="text-white hover:text-red-500 text-xl p-2">
                     ✕
                  </button>
               </div>

               <div
                  className="perspective-1000 relative w-full"
                  style={{ perspective: "1000px" }}>
                  <div
                     className={`relative transition-transform duration-700 transform-style-preserve-3d w-full ${
                        isFlipped ? "rotate-y-180" : ""
                     }`}
                     style={{ transformStyle: "preserve-3d" }}>
                     {/* Front of Card */}
                     <div
                        id="digital-id-card-front"
                        className="w-full backface-hidden"
                        style={{
                           width: "100%",
                           maxWidth: "400px",
                           margin: "0 auto",
                           backfaceVisibility: "hidden",
                        }}>
                        <div
                           className="bg-[#112D4E] rounded-none overflow-hidden shadow-2xl relative h-auto"
                           data-bg="primary">
                           {/* Waves Design */}
                           <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                              <svg
                                 className="absolute top-0 right-0"
                                 viewBox="0 0 500 150"
                                 preserveAspectRatio="none">
                                 <path
                                    className="fill-[#ffffff]"
                                    d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z"></path>
                              </svg>
                              <svg
                                 className="absolute bottom-0 right-0"
                                 viewBox="0 0 500 150"
                                 preserveAspectRatio="none">
                                 <path
                                    className="fill-[#ffffff]"
                                    d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z"
                                    transform="rotate(180)"></path>
                              </svg>
                           </div>

                           {/* Header */}
                           <div className="relative p-2 sm:p-4 flex items-center justify-between">
                              <img
                                 src={logo}
                                 alt="Comptron Logo"
                                 className="w-14 sm:w-20"
                              />
                              <div className="text-right">
                                 {/* <h2 className="text-3xl font-bold text-white">Comptron</h2>
                      <p className="text-cyan-400 text-sm">Creativity Assembled</p> */}
                              </div>
                           </div>

                           {/* Profile Image */}
                           <div className="relative px-2 sm:px-4 py-1 sm:py-2">
                              <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto rounded-lg overflow-hidden border-2 border-[#15A6E1]">
                                 <img
                                    src={
                                       user?.image ||
                                       (user?.gender?.toLowerCase() === "female"
                                          ? female
                                          : male)
                                    }
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                           </div>

                           {/* User Details */}
                           <div className="relative p-2 sm:p-4 text-center">
                              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                 {user?.name}
                              </h1>
                              <p className="text-[#15A6E1] translate-y-[-1rem] sm:translate-y-[-2rem] text-base sm:text-lg mb-2 sm:mb-4">
                                 {user?.role || "GENERAL MEMBER"}
                              </p>

                              <p className="font-mono text-blue-400 text-center mb-2 text-sm sm:text-base">
                                 {user?.customId}
                              </p>
                              <p
                                 className={`text-xs sm:text-sm text-center mb-4 flex items-center justify-center gap-1 ${
                                    user.isValid ? "text-green-400" : "text-red-400"
                                 }`}>
                                 <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                 </svg>
                                 <span>
                                    Membership:{" "}
                                    {user.isValid
                                       ? `Valid until ${new Date(
                                            user.validityDate
                                         ).toLocaleDateString()}`
                                       : "Expired"}
                                 </span>
                              </p>

                              <div className="text-white space-y-1 sm:space-y-2 text-left text-sm sm:text-base">
                                 {[
                                    ["Student ID", user?.studentId || user?.customId],
                                    ["Blood Group", user?.bloodGroup || "N/A"],
                                    ["Date of Birth", user?.dateOfBirth || "N/A"],
                                    ["Contact", user?.phone || "N/A"],
                                    ["Email", user?.email || "N/A"],
                                 ].map(([label, value]) => (
                                    <div key={label} className="flex">
                                       <span className="text-[#15A6E1] min-w-[90px] sm:min-w-[120px]">
                                          {label}
                                       </span>
                                       <span className="px-1">:</span>
                                       <span className="break-words flex-1">{value}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Signature Section */}
                           <div className="relative w-full sm:w-[30rem] sm:translate-x-[-2.5rem] bg-white p-2 sm:p-4 mt-2 border-t border-[#15A6E1]">
                              <div className="flex justify-center">
                                 <div className="text-center">
                                    <img
                                       src={signature}
                                       alt="Advisor Signature"
                                       className="mx-auto mb-1 w-24 sm:w-auto"
                                    />
                                    {/* <p className="text-black bg-white p-1 translate-y-[-5px] text-sm">Signature of the Advisor</p> */}
                                 </div>
                              </div>
                           </div>

                           {/* Bottom Bar */}
                           <div className="bg-[#112D4E] h-4 sm:h-6"></div>
                        </div>
                     </div>

                     {/* Back of Card */}
                     <div
                        id="digital-id-card-back"
                        className="absolute inset-0 w-full backface-hidden rotate-y-180"
                        style={{
                           width: "100%",
                           maxWidth: "400px",
                           margin: "0 auto",
                           backfaceVisibility: "hidden",
                           transform: "rotateY(180deg)",
                        }}>
                        <div
                           className="bg-[#112D4E] rounded-none overflow-hidden shadow-2xl relative h-full"
                           data-bg="primary">
                           <div className="p-3 sm:p-6 flex flex-col h-full">
                              <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-3 sm:mb-6">
                                 Terms and Condition
                              </h2>

                              <div className="space-y-2 sm:space-y-4 text-white mb-4 sm:mb-8 text-xs sm:text-base">
                                 <p className="flex items-start gap-2">
                                    <span className="text-[#15A6E1] text-xl">•</span>
                                    This card is a property of Comptron Creativity
                                    Assembled club.
                                 </p>
                                 <p className="flex items-start gap-2">
                                    <span className="text-[#15A6E1] text-xl">•</span>
                                    If lost or misplaced card must be reported immediately
                                    to the office or contact number.
                                 </p>
                                 <p className="flex items-start gap-2">
                                    <span className="text-[#15A6E1] text-xl">•</span>
                                    This card will remain valid till 21 February 2026.
                                 </p>
                              </div>

                              {/* QR Code - now generated dynamically */}
                              <div className="flex justify-center sm:translate-y-[2rem] mb-4 sm:mb-8">
                                 <div className="p-3 rounded-xl bg-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <div className="relative">
                                       <canvas
                                          ref={qrCanvasRef}
                                          className="w-28 sm:w-36 h-28 sm:h-36"
                                          width="144"
                                          height="144"
                                          aria-label={`QR code for ${user?.name}'s profile`}
                                       />
                                    </div>
                                    <div className="mt-2 text-center">
                                       <p className="text-[#112D4E] font-medium text-xs">
                                          <span className="flex items-center justify-center gap-1"></span>
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              {/* Contact Information */}
                              <div className="mt-auto text-white text-center space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                 <p className="flex items-center justify-center gap-1 sm:gap-2">
                                    <svg
                                       className="w-4 h-4 sm:w-5 sm:h-5"
                                       fill="#15A6E1"
                                       viewBox="0 0 20 20">
                                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    comptron@nwu.ac.bd
                                 </p>
                                 <p className="flex items-center justify-center gap-1 sm:gap-2">
                                    <svg
                                       className="w-4 h-4 sm:w-5 sm:h-5"
                                       fill="#15A6E1"
                                       viewBox="0 0 20 20">
                                       <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-11h-2v4h2V7zm0 6h-2v2h2v-2z" />
                                    </svg>
                                    https://comptron.nwu.ac.bd
                                 </p>
                                 <p className="flex items-center justify-center gap-1 sm:gap-2">
                                    Building-2; 58, KDA Avenue, Sonadanga, Khulna-9100
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex justify-center mt-4 gap-2 sm:gap-4">
                  <button
                     onClick={() => setIsFlipped(!isFlipped)}
                     className="bg-[#15A6E1] hover:bg-blue-700 text-white px-3 sm:px-6 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                     <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M16 2H8C4.691 2 2 4.691 2 8v8c0 3.309 2.691 6 6 6h8c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm-2 12H8v-2h6v2z" />
                     </svg>
                     Flip Card
                  </button>

                  {/* Only show download button for user's own profile */}
                  {isOwnProfile && (
                     <button
                        onClick={downloadIdCard}
                        className="bg-[#15A6E1] hover:bg-blue-700 text-white px-3 sm:px-6 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                        <svg
                           className="w-4 h-4 sm:w-5 sm:h-5"
                           fill="currentColor"
                           viewBox="0 0 20 20">
                           <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                        </svg>
                        Download ID Card
                     </button>
                  )}
               </div>
            </div>
         </div>
      );
   };

   IdCardModal.propTypes = {
      onClose: PropTypes.func.isRequired,
   };

   if (!user && !error) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-white text-white text-2xl">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );
   }

   return (
      <div className="text-white font-[Poppins] min-h-screen  flex items-center justify-center px-2 sm:px-5 py-5 sm:py-10">
         {/* Animated background elements */}
         <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
         </div>

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 w-64 bg-[#1c1c1e] text-white transform ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}>
            <div className="p-4 pt-12 md:pt-4 flex flex-col h-full">
               <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Menu</h2>
               <nav className="space-y-3 flex-1">
                  <NavLink
                     to={`/`}
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                           isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500"
                              : "hover:bg-gray-800 hover:text-blue-400"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                     </svg>
                     Home
                  </NavLink>
                  <NavLink
                     to={`/profile/${id}`}
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                           isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500"
                              : "hover:bg-gray-800 hover:text-blue-400"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                     </svg>
                     Profile
                  </NavLink>
                  <NavLink
                     to={`/GMembers`}
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                           isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500"
                              : "hover:bg-gray-800 hover:text-blue-400"
                        }`
                     }
                     onClick={() => setSidebarOpen(false)}>
                     <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                     </svg>
                     All Members
                  </NavLink>

                  {isOwnProfile && (
                     <NavLink
                        to={`/settings/${id}`}
                        className={({ isActive }) =>
                           `block px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                              isActive
                                 ? "bg-gradient-to-r from-blue-600 to-blue-500"
                                 : "hover:bg-gray-800 hover:text-blue-400"
                           }`
                        }
                        onClick={() => setSidebarOpen(false)}>
                        <svg
                           className="w-5 h-5 mr-3"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Settings
                     </NavLink>
                  )}
               </nav>

               {isOwnProfile && (
                  <div className="mt-auto mb-4 px-4">
                     <button
                        onClick={() => setShowIdCard(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md transform hover:scale-[1.02]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                        </svg>
                        ID Card
                     </button>
                  </div>
               )}
            </div>
         </div>

         {/* Backdrop overlay for mobile */}
         {sidebarOpen && (
            <div
               className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
               onClick={() => setSidebarOpen(false)}></div>
         )}

         {/* Main Content - adjust for sidebar on desktop */}
         <div className="flex bg-[#121212] md:translate-x-[5rem] max-w-5xl rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.15)] p-3 sm:p-5 md:p-10 w-full mx-2 sm:mx-0 relative animate-fadeIn">
            {/* Mobile Sidebar Toggle - Now positioned relative to card */}
            <button
               className="md:hidden absolute top-4 left-4 z-10 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
               onClick={() => setSidebarOpen(!sidebarOpen)}
               aria-label="Toggle menu">
               {sidebarOpen ? (
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
               ) : (
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
               )}
            </button>

            {error && (
               <div className="bg-red-500/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg mb-4 w-full animate-fadeIn">
                  {error}
               </div>
            )}
            {successMsg && (
               <div className="bg-green-500/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg mb-4 animate-fadeIn w-full">
                  {successMsg}
               </div>
            )}

            {user && (
               <div className="bg-[#1A1A1A] resp w-full layer shadow-xl rounded-3xl p-4 sm:p-6 md:p-10 overflow-y-auto pt-12 md:pt-4 border border-gray-800/50">
                  <div className="relative w-full mb-8">
                     {/* Profile header with image and basic info */}
                     <div className="flex flex-col items-center relative">
                        <div className="w-28 sm:w-32 md:w-48 h-28 sm:h-32 md:h-48 rounded-full mb-6 relative group">
                           {user.image ? (
                              <img
                                 src={user.image}
                                 alt="Profile"
                                 className="w-full h-full rounded-full aspect-square object-cover border-4 border-blue-500/80 group-hover:border-blue-400 transition-all duration-300 shadow-lg"
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
                                 className="w-full h-full aspect-square rounded-full object-cover border-4 border-gray-600/80 group-hover:border-gray-500 transition-all duration-300 shadow-lg"
                              />
                           )}
                           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                           {user.name}
                        </h1>
                        <p className="text-2xl sm:text-3xl md:text-2xl font-bold translate-y-[-1em] mb-2 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                           {user?.role || "General Member"}
                        </p>
                        <p className="text-blue-400 text-center mb-1 text-sm sm:text-base">
                           <div
                              className="content-display"
                              dangerouslySetInnerHTML={{ __html: user?.bio }}
                           />
                        </p>
                        <p className="font-mono text-blue-400 text-center mb-2 text-sm sm:text-base">
                           {user.customId}
                        </p>
                        <p
                           className={`text-xs sm:text-sm text-center mb-4 flex items-center justify-center gap-1 ${
                              user.isValid ? "text-green-400" : "text-red-400"
                           }`}>
                           <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                           </svg>
                           <span>
                              Membership:{" "}
                              {user.isValid
                                 ? `Valid until ${new Date(
                                      user.validityDate
                                   ).toLocaleDateString()}`
                                 : "Expired"}
                           </span>
                        </p>

                        {isOwnProfile && (
                           <div className="mb-6 flex justify-center">
                              <button
                                 onClick={() => setShowIdCard(true)}
                                 className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 sm:px-8 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 shadow-lg text-sm sm:text-base transform hover:scale-[1.02] focus:scale-[0.98]">
                                 <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                 </svg>
                                 View Digital ID
                              </button>
                           </div>
                        )}
                     </div>

                     {/* Add custom decorative elements */}
                     <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 animate-pulse"></div>
                     <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500 animate-pulse"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-10">
                     <div className="flex-1 min-w-[250px] bg-[#202020] rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-900/10 group">
                        <h2 className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-semibold mb-4 flex items-center gap-2">
                           <svg
                              className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                 fillRule="evenodd"
                                 d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                                 clipRule="evenodd"
                              />
                           </svg>
                           Skills
                        </h2>
                        {user.skills && typeof user.skills === "string" ? (
                           <ul className="text-white list-disc ml-5 space-y-2 text-sm sm:text-base">
                              {user.skills.split(",").map((skill, index) => (
                                 <li
                                    key={index}
                                    className="text-gray-300 hover:text-white transition-colors duration-300">
                                    {skill.trim()}
                                 </li>
                              ))}
                           </ul>
                        ) : Array.isArray(user.skills) && user.skills.length > 0 ? (
                           <ul className="text-white space-y-2 text-sm sm:text-base">
                              {user.skills.map((skill, index) => (
                                 <li
                                    key={index}
                                    className="text-gray-300 hover:text-white transition-colors duration-300">
                                    {skill}
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <div className="flex items-center justify-center h-24 text-gray-500 text-sm italic">
                              <p>No skills added yet</p>
                           </div>
                        )}
                     </div>

                     <div className="flex-1 min-w-[250px] bg-[#202020] rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-900/10 group">
                        <h2 className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-semibold mb-4 flex items-center gap-2">
                           <svg
                              className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                 fillRule="evenodd"
                                 d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                 clipRule="evenodd"
                              />
                           </svg>
                           External Links
                        </h2>
                        {!user.linkedIn && !user.github && !user.portfolio && !user.cv ? (
                           <div className="flex items-center justify-center h-24 text-gray-500 text-sm italic">
                              <p>No external links added yet</p>
                           </div>
                        ) : (
                           <div className="grid grid-cols-2 gap-4 text-center">
                              {user.linkedIn && (
                                 <a
                                    href={user.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#0077b5]/10 border border-transparent hover:border-[#0077b5]/30 transition-all duration-300">
                                    <svg
                                       className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#0077b5] group-hover:scale-110 transition-transform duration-300"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 448 512">
                                       <path
                                          fill="currentColor"
                                          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                       />
                                    </svg>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                       LinkedIn
                                    </span>
                                 </a>
                              )}

                              {user.github && (
                                 <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#333]/10 border border-transparent hover:border-[#333]/30 transition-all duration-300">
                                    <svg
                                       className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-white group-hover:scale-110 transition-transform duration-300"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 496 512">
                                       <path
                                          fill="currentColor"
                                          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                       />
                                    </svg>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                       GitHub
                                    </span>
                                 </a>
                              )}

                              {user.portfolio && (
                                 <a
                                    href={user.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#15A6E1]/10 border border-transparent hover:border-[#15A6E1]/30 transition-all duration-300">
                                    <svg
                                       className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#15A6E1] group-hover:scale-110 transition-transform duration-300"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 512 512">
                                       <path
                                          fill="currentColor"
                                          d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"
                                       />
                                    </svg>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                       Portfolio
                                    </span>
                                 </a>
                              )}

                              {user.cv && (
                                 <a
                                    href={user.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#15A6E1]/10 border border-transparent hover:border-[#15A6E1]/30 transition-all duration-300">
                                    <svg
                                       className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#15A6E1] group-hover:scale-110 transition-transform duration-300"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 384 512">
                                       <path
                                          fill="currentColor"
                                          d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                                       />
                                    </svg>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                       CV / Resume
                                    </span>
                                 </a>
                              )}
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="bg-[#202020] rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-900/10 group">
                     <h2 className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-semibold mb-4 flex items-center gap-2">
                        <svg
                           className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Contact Info
                     </h2>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1E1E1E] transition-colors duration-300">
                           <div className="bg-blue-500/10 p-3 rounded-lg">
                              <svg
                                 className="w-6 h-6 text-blue-400"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-xs text-gray-400">Email</p>
                              <p className="text-white text-sm font-medium truncate">
                                 {user.email || "Not provided"}
                              </p>
                           </div>
                        </div>

                        <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1E1E1E] transition-colors duration-300">
                           <div className="bg-green-500/10 p-3 rounded-lg">
                              <svg
                                 className="w-6 h-6 text-green-400"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                           </div>
                           <div>
                              <p className="text-xs text-gray-400">Phone</p>
                              <p className="text-white text-sm font-medium">
                                 {user.phone || "Not provided"}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
         {showIdCard && user && <IdCardModal onClose={() => setShowIdCard(false)} />}

         {/* Add animation styles */}
         <style jsx>{`
            @keyframes fadeIn {
               from {
                  opacity: 0;
               }
               to {
                  opacity: 1;
               }
            }

            @keyframes blob {
               0% {
                  transform: translate(0px, 0px) scale(1);
               }
               33% {
                  transform: translate(30px, -50px) scale(1.1);
               }
               66% {
                  transform: translate(-20px, 20px) scale(0.9);
               }
               100% {
                  transform: translate(0px, 0px) scale(1);
               }
            }

            .animate-fadeIn {
               animation: fadeIn 0.5s ease-out;
            }

            .animate-blob {
               animation: blob 7s infinite alternate;
            }

            .animation-delay-2000 {
               animation-delay: 2s;
            }

            .animation-delay-4000 {
               animation-delay: 4s;
            }

            .group:hover .group-hover\:border-blue-400 {
               border-color: rgb(96, 165, 250);
            }

            .perspective-1000 {
               perspective: 1000px;
            }

            .rotate-y-180 {
               transform: rotateY(180deg);
            }
         `}</style>
      </div>
   );
};

export default ProfilePage;
