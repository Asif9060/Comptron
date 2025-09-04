import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Components/UI/CSS/EventDetails.css";
import CommentSection from "../Components/Features/CommentSection";
import SideMenu from "../Components/Features/SideMenu";
import RegistrationForm from "../Components/Features/RegistrationForm";
import GoogleFormEmbed from "../Components/Features/GoogleFormEmbed";
import logo from "../assets/images/Comptron Logo.png";
import Modal from "react-modal";

// Set the app element for react-modal
Modal.setAppElement("#root");

const customModalStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(26, 26, 26, 0.95)",
      border: "1px solid rgba(51, 51, 51, 0.5)",
      borderRadius: "0.5rem",
      padding: "0", // Remove padding for Google Forms
      maxWidth: "95vw",
      width: "920px", // Even wider for Google Forms
      height: "90vh", // Further increased height for Google Forms
      maxHeight: "90vh", // Consistent max height
      overflow: "hidden", // Hide scrollbars on the modal itself
      opacity: 0,
      transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)", // For Safari support
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
   },
   overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)", // For Safari support
      transition: "all 300ms ease-in-out",
   },
};

const afterOpenModal = () => {
   // Fade in the modal and overlay
   if (Modal.defaultStyles.overlay) {
      Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.5)";
   }
   // Apply fade-in and slide-up animation to modal content
   const content = document.querySelector(".ReactModal__Content");
   if (content) {
      content.style.opacity = 1;
      content.style.transform = "translate(-50%, -50%) scale(1)";
   }
};

const beforeCloseModal = () => {
   return new Promise((resolve) => {
      // Fade out the modal and overlay
      if (Modal.defaultStyles.overlay) {
         Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
      }
      // Apply fade-out and slide-down animation to modal content
      const content = document.querySelector(".ReactModal__Content");
      if (content) {
         content.style.opacity = 0;
         content.style.transform = "translate(-50%, -40%) scale(0.95)";
      }
      // Wait for animation to complete
      setTimeout(resolve, 300);
   });
};

const EventDetails = () => {
   const { id } = useParams();
   const [event, setEvent] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedForm, setSelectedForm] = useState(null);

   useEffect(() => {
      fetch(`https://comptron-server-2.onrender.com/api/eventDetails/${id}`)
         .then((res) => {
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
         })
         .then((data) => {
            console.log("Full event data received:", data);
            console.log("Bullet points array:", data.bulletPoints);
            if (!data.bulletPoints || !Array.isArray(data.bulletPoints)) {
               console.warn("Bullet points missing or not an array:", data.bulletPoints);
            }
            setEvent(data);
         })
         .catch((err) => {
            console.error("Error fetching event:", err);
            // You might want to set some error state here
         });
   }, [id]);

   const openModal = (form = null) => {
      setSelectedForm(form);
      setIsModalOpen(true);
   };
   const closeModal = async () => {
      await beforeCloseModal();
      setIsModalOpen(false);
      setTimeout(() => setSelectedForm(null), 300); // Clear selected form after animation completes
   };

   if (!event)
      return (
         <div className="flex justify-center items-center h-screen z-50 fixed w-full top-0 left-0">
            <div className="loader-container">
               <div className="rotating-circle"></div>
               <img src={logo} alt="Comptron Logo" className="logo1" />
            </div>
         </div>
      );

   return (
      <div className="flex justify-center items-center w-full">
         <div className="fixed top-0 left-0 w-12 sm:w-16 h-screen flex flex-col justify-center items-center z-10">
            <SideMenu></SideMenu>
         </div>
         <div className="container06 w-full max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 mx-auto">
            <div className="text-center mb-4 sm:mb-6 md:mb-8 relative">
               <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent top-1/2 -translate-y-1/2 z-0"></div>
               <div className="inline-block relative z-10 px-4 sm:px-6 py-2 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                     <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                     </svg>
                     <h1
                        className="event-title2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 translate-y-1.5"
                        dangerouslySetInnerHTML={{ __html: event.title }}></h1>
                     <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                     </svg>
                  </div>
               </div>
            </div>
            <div className="main-content w-full">
               <img
                  className="event-img w-full rounded-lg object-cover mb-4 sm:mb-6 md:mb-8 
                       h-48 sm:h-64 md:h-80 lg:h-96 shadow-lg"
                  src={event.mainImage}
                  alt="Event Main"
               />
               <p
                  className="event-description sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 md:px-6"
                  dangerouslySetInnerHTML={{ __html: event.description }}></p>{" "}
               {/* Bullet Points Section */}
               {event.bulletPoints?.length > 0 && (
                  <div className="bg-gray-800 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30 mb-8 px-4 sm:px-6 md:px-8">
                     <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Event Details
                     </h3>
                     <div className="">
                        {event.bulletPoints.map((point, index) => (
                           <div
                              key={index}
                              className="grid grid-cols-9 sm:grid-cols-[200px,1fr] gap-2">
                              <div className="text-blue-400 font-semibold flex">
                                 {point.label} :
                              </div>
                              <div
                                 className="text-gray-300 flex"
                                 dangerouslySetInnerHTML={{ __html: point.text }}></div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
               <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  {event.galleryImages.map((img, index) => (
                     <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index}`}
                        className="w-full rounded-lg object-cover h-40 sm:h-48 md:h-52 lg:h-60 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                     />
                  ))}
               </div>
               {/* Registration Section */}
               {event.registrationForm?.enabled && (
                  <div className="mt-8 sm:mt-10 md:mt-12 mb-8 text-center">
                     {event.registrationForm?.useGoogleForms ? (
                        <>
                           {/* Display Google Form options if multiple forms are available */}
                           {event.registrationForm?.googleForms &&
                           event.registrationForm.googleForms.length > 0 ? (
                              event.registrationForm.googleForms.length === 1 ? (
                                 // Single Google Form
                                 <button
                                    onClick={() =>
                                       openModal(event.registrationForm.googleForms[0])
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105">
                                    Register for Event
                                 </button>
                              ) : (
                                 // Multiple Google Forms
                                 <div className="space-y-4">
                                    <h3 className="text-xl font-medium text-gray-800">
                                       Registration Options
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                       {event.registrationForm.googleForms
                                          .filter((form) => form.active)
                                          .map((form, idx) => (
                                             <button
                                                key={idx}
                                                onClick={() => openModal(form)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105">
                                                {form.title ||
                                                   `Registration Form ${idx + 1}`}
                                             </button>
                                          ))}
                                    </div>
                                 </div>
                              )
                           ) : (
                              <div className="text-gray-500">
                                 Registration forms are being set up
                              </div>
                           )}
                        </>
                     ) : (
                        // Regular custom form
                        <button
                           onClick={() => openModal()}
                           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105">
                           Register for Event
                        </button>
                     )}
                  </div>
               )}
               {/* Registration Modal */}
               <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  style={customModalStyles}
                  contentLabel="Event Registration Form"
                  onAfterOpen={afterOpenModal}
                  closeTimeoutMS={300}>
                  <div
                     className={`relative ${
                        event.registrationForm?.useGoogleForms && selectedForm
                           ? "h-full"
                           : ""
                     }`}>
                     {!event.registrationForm?.useGoogleForms || !selectedForm ? (
                        <button
                           onClick={closeModal}
                           className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 z-10">
                           <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M6 18L18 6M6 6l12 12"
                              />
                           </svg>
                        </button>
                     ) : null}
                     {event.registrationForm?.useGoogleForms && selectedForm ? (
                        <div className="h-full">
                           <GoogleFormEmbed form={selectedForm} onClose={closeModal} />
                        </div>
                     ) : (
                        <div className="p-8">
                           <RegistrationForm
                              eventId={event._id}
                              formFields={event.registrationForm?.fields || []}
                              onSubmit={async () => {
                                 await closeModal();
                              }}
                           />
                        </div>
                     )}
                  </div>
               </Modal>
               <div className="mt-8 sm:mt-10 md:mt-12">
                  <CommentSection eventId={event._id}></CommentSection>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EventDetails;

// import "../Components/UI/CSS/EventDetails.css";

// import img1 from "../assets/images/img1.jpg";
// import img2 from "../assets/images/img2.jpg";
// import img3 from "../assets/images/img3.jpg";
// import img4 from "../assets/images/img4.jpg";
// import img5 from "../assets/images/img5.jpg";
// import img6 from "../assets/images/img6.jpg";
// import img7 from "../assets/images/img7.jpg";

// const EventDetails = () => {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="container06">
//         <h1 className=""><span className="text-[32px]">🔥</span><span className="event-title">CSE FEST 2025</span><span className="text-[32px]">🔥</span></h1>

//         <div className="main-content">
//           <img className="event-img" src={img1} alt="Event Image" />

//           <p className="event-description">
//             🎶 Get ready for the most electrifying night of music! Featuring top
//             artists, insane light shows, and unforgettable vibes! 🔥 Don't miss
//             out! 🌟
//           </p>

//           <div className="gallery">
//             <img src={img2} alt="Gallery Image" />
//             <img src={img3} alt="Gallery Image" />
//             <img src={img4} alt="Gallery Image" />
//             <img src={img5} alt="Gallery Image" />
//             <img src={img6} alt="Gallery Image" />
//             <img src={img7} alt="Gallery Image" />
//           </div>

//           <div className="add-comment">
//             <input
//               type="text"
//               id="userName"
//               className="comment-input"
//               placeholder="Your Name..."
//             />
//             <input
//               type="text"
//               id="commentInput"
//               className="comment-input"
//               placeholder="Write a comment..."
//             />
//             <button className="submit-btn" onClick="addComment()">
//               Post
//             </button>
//           </div>
//           <div className="comments-section">
//             <h3>💬 Audience Feedback</h3>
//             <div className="comment-box">
//               🔥 "OMG! Best concert ever!" - Alex
//             </div>
//             <div className="comment-box">
//               🎤 "The vibes were unreal!" - Sarah
//             </div>
//             <div className="comment-box">
//               ✨ "Next-level lighting & sound!" - John
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;
