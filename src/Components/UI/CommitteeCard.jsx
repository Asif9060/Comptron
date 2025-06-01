// Import the CSS file
import { useEffect, useState } from "react";
import "./CSS/CommiteeCard.css";
import logo from "../../assets/images/Comptron Logo.png";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, alt, role, name, facebook, customId }) => (
  <article className="card__article group">
    <div className="relative">
      <img src={imgSrc} alt={alt} className="card__img" />
      <div className="card__data">
        <h2 className="card__title">{name}</h2>
        <p className="text-xs text-white">{customId}</p>
        <span className="card__description">{role}</span>
      </div>
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 sm:touch-none touch-auto">
        <Link
          to={`/members/CommitteeProfile/${customId}`}
          className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition transform scale-0 group-hover:scale-100 duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  </article>
);

// Main Component
const CommiteeCard = () => {
  

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`); // Your backend URL
      const data = await response.json();
      // console.log("Fetched members data:", data);
      setMembers(data); // Set members data into state
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          
          <div className="loader-container">
            <div className="rotating-circle"></div>
            <img src={logo} alt="Comptron Logo" className="logo1" />
          </div>
        </div>
      );
    }

  return (
    <div className="container md:translate-x-[14.5rem]">
      <div className="card__container">
        {members.length > 0 ? (
          members.map((member) => (
            <Card
              key={member._id}
              imgSrc={member.image}
              // imgSrc={`${import.meta.env.VITE_API_URL.replace(
              //   "/api/members",
              //   ""
              // )}${member.image}`}
              alt={member.name}
              role={member.role}
              name={member.name}
              facebook={member.socials.linkedin}
              customId={member.customId}
            />
          ))
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
  );
};
export default CommiteeCard;
