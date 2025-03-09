import './CSS/Card.css';
import fardin from '../../assets/images/pooto/fardin.jpg';
const SocialIcons = ({ github, linkedin, instagram }) => (
  <div className="socialDiv">
    {github && (
      <a href={github} target="_blank" rel="noreferrer">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>
      </a>
    )}
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 448 512" className="socials linkdin"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
      </a>
    )}
    {instagram && (
      <a href={instagram} target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
      </a>
    )}
  </div>
);

// Individual Card Component
const MemberCard = ({image, profileClass, name, role, social }) => (
  <div className="cardContainer">
    <div style={{
        backgroundImage: `url(${image})`}} className={`profileDiv ${profileClass}`}>
        
    </div>
    <div className="infoDiv">
      <div className="nameDiv">
        <p className="name">{name}</p>
        <p className="role">{role}</p>
      </div>
      <SocialIcons {...social} />
    </div>
  </div>
);

// Main Card Component
const Card = () => {
  const teamMembers = [
    {
      id: 1,
      image: fardin,
      profileClass: 'profile1',
      name: 'Team Member 1',
      role: 'Project Lead',
      social: {
        github: 'https://github.com/member1',
        linkedin: 'https://linkedin.com/in/member1',
        instagram: 'https://instagram.com/member1'
      }
    },
    {
      id: 2,
      image: '',
      profileClass: 'profile2',
      name: 'Team Member 2',
      role: 'Senior Developer',
      social: {
        github: 'https://github.com/member2',
        linkedin: 'https://linkedin.com/in/member2',
        instagram: 'https://instagram.com/member2'
      }
    },
    {
      id: 3,
      image: '',
      profileClass: 'profile3',
      name: 'Team Member 3',
      role: 'UI/UX Designer',
      social: {
        github: 'https://github.com/member3',
        linkedin: 'https://linkedin.com/in/member3',
        instagram: 'https://instagram.com/member3'
      }
    },
    {
      id: 4,
      image: '',
      profileClass: 'profile4',
      name: 'Team Member 4',
      role: 'Data Scientist',
      social: {
        github: 'https://github.com/member4',
        linkedin: 'https://linkedin.com/in/member4',
        instagram: 'https://instagram.com/member4'
      }
    },
    {
      id: 5,
      image: '',
      profileClass: 'profile5',
      name: 'Team Member 5',
      role: 'DevOps Engineer',
      social: {
        github: 'https://github.com/member5',
        linkedin: 'https://linkedin.com/in/member5',
        instagram: 'https://instagram.com/member5'
      }
    },
    {
      id: 6,
      image: '',
      profileClass: 'profile6',
      name: 'Team Member 6',
      role: 'Product Manager',
      social: {
        github: 'https://github.com/member6',
        linkedin: 'https://linkedin.com/in/member6',
        instagram: 'https://instagram.com/member6'
      }
    },
    {
      id: 7,
      image: '',
      profileClass: 'profile7',
      name: 'Team Member 7',
      role: 'Frontend Developer',
      social: {
        github: 'https://github.com/member7',
        linkedin: 'https://linkedin.com/in/member7',
        instagram: 'https://instagram.com/member7'
      }
    },
    {
      id: 8,
      image: '',
      profileClass: 'profile8',
      name: 'Team Member 8',
      role: 'Backend Developer',
      social: {
        github: 'https://github.com/member8',
        linkedin: 'https://linkedin.com/in/member8',
        instagram: 'https://instagram.com/member8'
      }
    },
    {
      id: 9,
      image: '',
      profileClass: 'profile9',
      name: 'Team Member 9',
      role: 'QA Engineer',
      social: {
        github: 'https://github.com/member9',
        linkedin: 'https://linkedin.com/in/member9',
        instagram: 'https://instagram.com/member9'
      }
    },
    {
      id: 10,
      image: '',
      profileClass: 'profile10',
      name: 'Team Member 10',
      role: 'Technical Writer',
      social: {
        github: 'https://github.com/member10',
        linkedin: 'https://linkedin.com/in/member10',
        instagram: 'https://instagram.com/member10'
      }
    },
    {
      id: 11,
      image: '',
      profileClass: 'profile11',
      name: 'Team Member 11',
      role: 'Security Specialist',
      social: {
        github: 'https://github.com/member11',
        linkedin: 'https://linkedin.com/in/member11',
        instagram: 'https://instagram.com/member11'
      }
    },
    {
      id: 12,
      image: '',
      profileClass: 'profile12',
      name: 'Team Member 12',
      role: 'Cloud Architect',
      social: {
        github: 'https://github.com/member12',
        linkedin: 'https://linkedin.com/in/member12',
        instagram: 'https://instagram.com/member12'
      }
    },
    {
      id: 13,
      image: '',
      profileClass: 'profile13',
      name: 'Team Member 13',
      role: 'Mobile Developer',
      social: {
        github: 'https://github.com/member13',
        linkedin: 'https://linkedin.com/in/member13',
        instagram: 'https://instagram.com/member13'
      }
    },
    {
      id: 14,
      image: '',
      profileClass: 'profile14',
      name: 'Team Member 14',
      role: 'AI Engineer',
      social: {
        github: 'https://github.com/member14',
        linkedin: 'https://linkedin.com/in/member14',
        instagram: 'https://instagram.com/member14'
      }
    },
    {
      id: 15,
      image: '',
      profileClass: 'profile15',
      name: 'Team Member 15',
      role: 'Database Administrator',
      social: {
        github: 'https://github.com/member15',
        linkedin: 'https://linkedin.com/in/member15',
        instagram: 'https://instagram.com/member15'
      }
    },
    {
      id: 16,
      image: '',
      profileClass: 'profile16',
      name: 'Team Member 16',
      role: 'Full Stack Developer',
      social: {
        github: 'https://github.com/member16',
        linkedin: 'https://linkedin.com/in/member16',
        instagram: 'https://instagram.com/member16'
      }
    },
    {
      id: 17,
      image: '',
      profileClass: 'profile17',
      name: 'Team Member 17',
      role: 'Systems Analyst',
      social: {
        github: 'https://github.com/member17',
        linkedin: 'https://linkedin.com/in/member17',
        instagram: 'https://instagram.com/member17'
      }
    },
    {
      id: 18,
      image: '',
      profileClass: 'profile18',
      name: 'Team Member 18',
      role: 'Network Engineer',
      social: {
        github: 'https://github.com/member18',
        linkedin: 'https://linkedin.com/in/member18',
        instagram: 'https://instagram.com/member18'
      }
    },
    {
      id: 19,
      image: '',
      profileClass: 'profile19',
      name: 'Team Member 19',
      role: 'IT Support Specialist',
      social: {
        github: 'https://github.com/member19',
        linkedin: 'https://linkedin.com/in/member19',
        instagram: 'https://instagram.com/member19'
      }
    },
    {
      id: 20,
      image: '',
      profileClass: 'profile20',
      name: 'Team Member 20',
      role: 'Business Analyst',
      social: {
        github: 'https://github.com/member20',
        linkedin: 'https://linkedin.com/in/member20',
        instagram: 'https://instagram.com/member20'
      }
    },
    {
      id: 21,
      image: '',
      profileClass: 'profile21',
      name: 'Team Member 21',
      role: 'Marketing Specialist',
      social: {
        github: 'https://github.com/member21',
        linkedin: 'https://linkedin.com/in/member21',
        instagram: 'https://instagram.com/member21'
      }
    }
  ];

  return (
    <div>
        <h1 className='mt-5 text-[40px] underline underline-offset-10 text-[#16A6E1]'> Comptron Executive Committee</h1>
        <div className=" flex justify-center flex-wrap gap-12 mt-3">  
            {teamMembers.map(member => (
                <MemberCard key={member.id} {...member} />
            ))}
        </div>
    </div>
  );
};

export default Card;