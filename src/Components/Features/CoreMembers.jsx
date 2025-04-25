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
      imageUrl: fardin,
      facebook: "https://www.facebook.com/itzfardinhere", // Replace with actual image URL
    },
    {
      role: "VICE-PRESIDENT",
      name: "Md. Al-Amin Saikh",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      imageUrl: alamin,
      facebook: "https://www.facebook.com/alaminshaikh1703",
    },
    {
      role: "GENERAL SECRETARY",
      name: "Sourov Hasan Ahir",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      imageUrl: ahir,
      facebook: "https://www.facebook.com/ahir.suvo.2024",
    },
    {
      role: "JOINT SECRETARY",
      name: "Md. Tanvir Jahan Redoy",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      imageUrl: redoy,
      facebook: "https://www.facebook.com/tanvir.redoy.14", 
    },
    {
      role: "TREASURER",
      name: "Md. Waleullah",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      imageUrl: wale,
      facebook: "https://www.facebook.com/mdismail.munna.14", 
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
            <a href={member.facebook} className="button3">Facebook</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoreMembers;