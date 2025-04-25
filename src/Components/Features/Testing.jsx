import { icons } from "../../assets/icons/Socialicons";
const ProfileCard = ({ name, role, profileClass, socialLinks }) => {
  return (
    <div className="cardContainer">
      <div className={`profileDiv ${profileClass}`}></div>
      <div className="infoDiv">
        <div className="nameDiv">
          <p className="name">{name}</p>
          <p className="role">{role}</p>
        </div>
        <div className="socialDiv">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url}>
              <svg viewBox="0 0 496 512" className={`socials ${link.iconClass}`}>
                <path d={icons[link.icon]}></path>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testing = () => {
  const profiles = [
    {
      name: "Md Waleullah",
      role: "Treasurer",
      profileClass: "profileDiv1",
      socialLinks: [
        {
          url: "https://www.facebook.com/mdismail.munna.14",
          iconClass: "facebook",
          icon: "facebook"
           
        },
        {
          url: "#linkdin",
          iconClass: "linkdin",
          icon: "linkedin"
           
        },
        {
          url: "#insta",
          iconClass: "instagram",
          icon: "instagram"
        }
      ]
    },
    
  ];

  return (
    <div className="flex justify-center gap-12 mt-36">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </div>
  );
};

export default Testing;