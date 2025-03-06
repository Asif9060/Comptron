import { useEffect } from "react";
import ahirImage from "../../assets/images/pooto/Ahir.jpg";
import alaminImage from "../../assets/images/pooto/alamin.jpg";
import fardinImage from "../../assets/images/pooto/fardin.jpg";
import ridoyImage from "../../assets/images/pooto/ridoy.jpg";
import waleImage from "../../assets/images/pooto/wale.jpg";
import './CSS/Members.css';

const timelineData = [
  {
    imgSrc: fardinImage,
    role: "PRESIDENT",
    name: "Tanzil Parvez Fardin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque velit nec lorem tincidunt, at malesuada nisi consequat.",
  },
  {
    imgSrc: alaminImage,
    role: "VICE-PRESIDENT",
    name: "Md. Al-Amin Saikh",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    imgSrc: ahirImage,
    role: "GENERAL SECRETARY",
    name: "Sourov Hasan Ahir",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
  },
  {
    imgSrc: ridoyImage,
    role: "JOINT SECRETARY",
    name: "Md. Tanvir Jahan Redoy",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  },
  {
    imgSrc: waleImage,
    role: "TREASURER",
    name: "Md. Waleullah",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  },
];

const Members = () => {
  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  return (
    <div className="timeline">
      {timelineData.map((item, index) => (
        <div
          className={`timeline-item ${index % 2 === 0 ? "even" : "odd"}`}
          key={index}
        >
          <img src={item.imgSrc} alt="Profile" />
          <div className="timeline-item-content">
            <div className="timeline-item-date">{item.role}</div>
            <div className="timeline-item-title">{item.name}</div>
            <div className="timeline-item-description">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Members;
