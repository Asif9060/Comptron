import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Components/UI/CSS/EventDetails.css";
import CommentSection from "../Components/Features/CommentSection";
import SideMenu from "../Components/Features/SideMenu";
import logo from "../assets/images/Comptron Logo.png";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`https://comptron-server-2.onrender.com/api/eventDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

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
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
              </svg>
              <h1 className="event-title2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 translate-y-1.5">
                {event.title}
              </h1>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
          <p className="event-description text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 md:px-6">
            {event.description}
          </p>
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
