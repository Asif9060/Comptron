import "./CSS/CoreMembers.css";
import { useState, useEffect } from "react";
// Import fallback images in case API fails
import fardin from "../../assets/images/Committee/Fardin.jpg";
import alamin from "../../assets/images/Committee/Alamin.jpg";
import ahir from "../../assets/images/Committee/Ahir.jpg";
import redoy from "../../assets/images/Committee/Redoy.jpg";
import wale from "../../assets/images/Committee/Wale.jpg";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const CoreMembers = () => {
   const [memberImages, setMemberImages] = useState({
      "CCM2025-6702": null,
      "CCM2025-5112": null,
      "CCM2025-7570": null,
      "CCM2025-5570": null,
      "CCM2025-8107": null,
   });
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchImages = async () => {
         setIsLoading(true);
         try {
            // Fetch images for each profile using their customId
            const ids = [
               "CCM2025-6702",
               "CCM2025-5112",
               "CCM2025-7570",
               "CCM2025-5570",
               "CCM2025-8107",
            ];
            const imageResponses = {};

            for (const id of ids) {
               try {
                  const response = await fetch(
                     `https://comptron-server-2.onrender.com/api/members/${id}`
                  );
                  if (response.ok) {
                     const data = await response.json();
                     // Check different possible response structures and extract the image URL
                     if (data.profileImage) {
                        imageResponses[id] = data.profileImage;
                     } else if (data.image) {
                        imageResponses[id] = data.image;
                     } else if (data.imageUrl) {
                        imageResponses[id] = data.imageUrl;
                     } else if (data.avatar) {
                        imageResponses[id] = data.avatar;
                     } else {
                        console.error(`No image found in response for ${id}`, data);
                     }
                  } else {
                     console.error(
                        `Failed to fetch image for ${id}: ${response.status} ${response.statusText}`
                     );
                  }
               } catch (error) {
                  console.error(`Error fetching profile for ${id}:`, error);
               }
            }

            setMemberImages(imageResponses);
         } catch (error) {
            console.error("Error fetching member images:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchImages();
   }, []);

   const timelineData = [
      {
         role: "PRESIDENT",
         name: "Tanzil Parvez Fardin",
         description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque velit nec lorem tincidunt, at malesuada nisi consequat.",
         imageUrl: memberImages["CCM2025-6702"] || fardin,
         socials: {
            facebook: "https://www.facebook.com/itzfardinhere",
            linkedin: "	https://www.linkedin.com/in/tanzilparvez/",
            github: "	https://github.com/tanzil321",
         },
         profile: "/members/CommitteeProfile/CCM2025-6702",
      },
      {
         role: "VICE-PRESIDENT",
         name: "Md. Al-Amin Saikh",
         description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
         imageUrl: memberImages["CCM2025-5112"] || alamin,
         socials: {
            facebook: "https://www.facebook.com/alaminshaikh1703",
            linkedin: "https://www.linkedin.com/in/alaminshaikhseo?trk=contact-info",
            github: "	https://github.com/alaminshaikh1703",
         },
         profile: "/members/CommitteeProfile/CCM2025-5112",
      },
      {
         role: "GENERAL SECRETARY",
         name: "Sourov Hasan Ahir",
         description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
         imageUrl: memberImages["CCM2025-7570"] || ahir,
         socials: {
            facebook: "https://www.facebook.com/ahir.suvo.2024",
            linkedin: "https://www.linkedin.com/in/sourov-hasan-ahir",
            github: "https://github.com/ahir",
         },
         profile: "/members/CommitteeProfile/CCM2025-7570",
      },
      {
         role: "JOINT SECRETARY",
         name: "Md. Tanvir Jahan Redoy",
         description:
            "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
         imageUrl: memberImages["CCM2025-5570"] || redoy,
         socials: {
            facebook: "https://www.facebook.com/tanvir.redoy.14",
            linkedin: "https://www.linkedin.com/in/tanvir-redoy-500052369/",
            github: "https://github.com/Redoy-Xenon",
         },
         profile: "/members/CommitteeProfile/CCM2025-5570",
      },
      {
         role: "TREASURER",
         name: "Md. Waleullah",
         description:
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
         imageUrl: memberImages["CCM2025-8107"] || wale,
         socials: {
            facebook: "https://www.facebook.com/mdismail.munna.14",
            linkedin: "https://www.linkedin.com/in/md-waleullah",
            github: "https://github.com/waleullah",
         },
         profile: "/members/CommitteeProfile/CCM2025-8107",
      },
   ];

   return (
      <div className="core-members-container">
         {isLoading ? (
            // Skeleton loader for members while loading
            <>
               {[1, 2, 3, 4, 5].map((item) => (
                  <div
                     key={item}
                     className="card3 skeleton-card animate-pulse relative overflow-hidden">
                     <div className="skeleton-image relative overflow-hidden">
                        <div
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                           style={{ backgroundSize: "200% 100%" }}></div>
                     </div>
                     <div className="details">
                        <div className="cardHeader skeleton-text"></div>
                        <div className="cardText skeleton-text-sm"></div>
                        <div className="social-links">
                           <div className="skeleton-icon"></div>
                           <div className="skeleton-icon"></div>
                           <div className="skeleton-icon"></div>
                        </div>
                     </div>
                  </div>
               ))}
            </>
         ) : (
            // Actual member cards
            timelineData.map((member, index) => (
               <Link to={member.profile} key={index} className="contents">
                  <div
                     className="card3"
                     style={{
                        "--card-bg": `url(${member.imageUrl})`,
                     }}>
                     {" "}
                     <div className="details">
                        <div className="cardHeader">{member.name}</div>
                        <div className="cardText">{member.role}</div>
                        <div className="social-links">
                           <a
                              href={member.socials.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon">
                              <FaFacebook />
                           </a>
                           <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon">
                              <FaLinkedin />
                           </a>
                           <a
                              href={member.socials.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon">
                              <FaGithub />
                           </a>
                        </div>
                     </div>
                  </div>
               </Link>
            ))
         )}
      </div>
   );
};

export default CoreMembers;
