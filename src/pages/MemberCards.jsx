import { useState, useEffect } from "react";
import Loading from "../Components/UI/Loading";
import logo from "../assets/images/Comptron Logo.png";
import "./CSS/Search.css"; // Assuming your animation is styled here

const MemberCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true initially

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/members"
      );
      const data = await response.json();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false); // Even if error happens, stop loading
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
    } else {
      const keyword = searchTerm.toLowerCase();
      const results = members.filter(
        (member) =>
          member.name?.toLowerCase().includes(keyword) ||
          member.skills?.some((skill) => skill.toLowerCase().includes(keyword))
      );
      setFilteredMembers(results);
    }
  }, [searchTerm, members]);

  // Show the animation while loading
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
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Search Members</h1>
        <input
          type="text"
          placeholder="Search by name or skill..."
          className="border flex justify-self-center border-gray-400 w-3/9 bg-white p-2 rounded-md mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="container04">
        <h1>Our Club Members</h1>
        <div className="members04" id="membersContainer">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="member-card04 flex flex-col items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-[150px] h-[150px] rounded-full"
              />
              <div className="member-name04">{member.name}</div>
              <div className="member-id04">{member.role}</div>
              <div className="social-icons04 grid grid-cols-3 items-center place-self-center w-[10rem] gap-4 mt-2">
                <a href={member.fb} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook text-blue-500"></i>
                </a>
                <a href={member.wp} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp text-green-500"></i>
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-gray-800"></i>
                </a>
              </div>
              <a href="#" className="view-btn04">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No matching members found.
        </p>
      )}
    </div>
  );
};

export default MemberCards;
