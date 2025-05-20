import "./CSS/CoreMembers.css";
import fardin from "../../assets/images/Committee/Fardin.jpg";
import alamin from "../../assets/images/Committee/Alamin.jpg";
import ahir from "../../assets/images/Committee/Ahir.jpg";
import redoy from "../../assets/images/Committee/Redoy.jpg";
import wale from "../../assets/images/Committee/Wale.jpg";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Divider } from "@heroui/divider";
const CoreMembers = () => {
  const timelineData = [
    {
      role: "PRESIDENT",
      name: "Tanzil Parvez Fardin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque velit nec lorem tincidunt, at malesuada nisi consequat.",
      imageUrl: fardin,
      socials: {
        facebook: "https://www.facebook.com/itzfardinhere",
        linkedin: "https://www.linkedin.com/in/tanzil-parvez-fardin",
        github: "https://github.com/fardin",
      },
    },
    {
      role: "VICE-PRESIDENT",
      name: "Md. Al-Amin Saikh",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      imageUrl: alamin,
      socials: {
        facebook: "https://www.facebook.com/alaminshaikh1703",
        linkedin: "https://www.linkedin.com/in/al-amin-saikh",
        github: "https://github.com/alamin",
      },
    },
    {
      role: "GENERAL SECRETARY",
      name: "Sourov Hasan Ahir",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      imageUrl: ahir,
      socials: {
        facebook: "https://www.facebook.com/ahir.suvo.2024",
        linkedin: "https://www.linkedin.com/in/sourov-hasan-ahir",
        github: "https://github.com/ahir",
      },
    },
    {
      role: "JOINT SECRETARY",
      name: "Md. Tanvir Jahan Redoy",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      imageUrl: redoy,
      socials: {
        facebook: "https://www.facebook.com/tanvir.redoy.14",
        linkedin: "https://www.linkedin.com/in/tanvir-redoy",
        github: "https://github.com/redoy",
      },
    },
    {
      role: "TREASURER",
      name: "Md. Waleullah",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      imageUrl: wale,
      socials: {
        facebook: "https://www.facebook.com/mdismail.munna.14",
        linkedin: "https://www.linkedin.com/in/md-waleullah",
        github: "https://github.com/waleullah",
      },
    },
  ];

  return (
    <div className="core-members-container">
      {timelineData.map((member, index) => (
        <div
          key={index}
          className="card3"
          style={{
            "--card-bg": `url(${member.imageUrl})`,
          }}
        >
          {" "}
          <div className="details">
            <div className="cardHeader">{member.name}</div>
            <div className="cardText">{member.role}</div>
            <div className="social-links">
              <a
                href={member.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebook />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoreMembers;
