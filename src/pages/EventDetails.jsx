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
      <div className="flex justify-center items-center h-screen bg-black z-50 fixed w-full top-0 left-0">
        <div className="loader-container">
          <div className="rotating-circle"></div>
          <img src={logo} alt="Comptron Logo" className="logo1" />
        </div>
      </div>
    );

  return (
    // <div>
    //   <h1>{event.title}</h1>
    //   <img src={event.mainImage} alt="Event Main" />
    //   <p>{event.description}</p>
    //   <div>
    //     {event.galleryImages.map((img, index) => (
    //       <img key={index} src={img} alt={`Gallery ${index}`} />
    //     ))}
    //   </div>
    // </div>

    <div className="flex justify-center items-center">
      <div className="fixed top-0 left-0 w-16 h-screen flex flex-col justify-center items-center z-10">
        <SideMenu></SideMenu>
      </div>
      <div className="container06">
        <h1 className="">
          <span className="text-[32px]">🔥</span>
          <span className="event-title">{event.title}</span>
          <span className="text-[32px]">🔥</span>
        </h1>
        <div className="main-content">
          <img className="event-img" src={event.mainImage} alt="Event Main" />
          <p className="event-description">🎶 {event.description}</p>
          <div className="gallery">
            {event.galleryImages.map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index}`} />
            ))}
          </div>
          {/* <div className="add-comment">
            <input
              type="text"
              id="userName"
              className="comment-input"
              placeholder="Your Name..."
            />
            <input
              type="text"
              id="commentInput"
              className="comment-input"
              placeholder="Write a comment..."
            />
            <button className="submit-btn" onClick="addComment()">
              Post
            </button>
          </div> */}
          {/* <div className="comments-section">
            <h3>💬 Audience Feedback</h3>
            <div className="comment-box">
              🔥 "OMG! Best concert ever!" - Alex
            </div>
            <div className="comment-box">
              🎤 "The vibes were unreal!" - Sarah
            </div>
            <div className="comment-box">
              ✨ "Next-level lighting & sound!" - John
            </div>
          </div> */}

          <CommentSection eventId={event._id}></CommentSection>
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
