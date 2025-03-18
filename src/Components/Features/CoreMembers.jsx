import "./CSS/CoreMembers.css";
import fardin from '../../assets/images/Committee/Fardin.jpg';
import alamin from '../../assets/images/Committee/Alamin.jpg';
import ahir from '../../assets/images/Committee/Ahir.jpg';
import redoy from '../../assets/images/Committee/Redoy.jpg';
import wale from '../../assets/images/Committee/Wale.jpg';
import { Divider } from "@heroui/divider";
const CoreMembers = () => {
  const timelineData = [
    {
      role: "PRESIDENT",
      name: "Tanzil Parvez Fardin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque velit nec lorem tincidunt, at malesuada nisi consequat.",
      imageUrl: fardin, // Replace with actual image URL
    },
    {
      role: "VICE-PRESIDENT",
      name: "Md. Al-Amin Saikh",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      imageUrl: alamin, // Replace with actual image URL
    },
    {
      role: "GENERAL SECRETARY",
      name: "Sourov Hasan Ahir",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      imageUrl: ahir, // Replace with actual image URL
    },
    {
      role: "JOINT SECRETARY",
      name: "Md. Tanvir Jahan Redoy",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      imageUrl: redoy, // Replace with actual image URL
    },
    {
      role: "TREASURER",
      name: "Md. Waleullah",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      imageUrl: wale, // Replace with actual image URL
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
          <div className="details">
            <div className="cardHeader">{member.name}</div>
            <div className="cardText">{member.role}</div>
            <div className="button3">Socials</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoreMembers;