import "./CSS/TextSlide.css";
import { useEffect, useState } from "react";
const TextSlide = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await fetch(
      "https://comptron-server-2.onrender.com/api/news"
    );
    const data = await response.json();
    setNews(data);
  };
  return (
    <div>
      <div className="stock-ticker">
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <span className="company">
                <a className="hover:text-[#10A5E0]" href={item.link}
                  dangerouslySetInnerHTML={{ __html: item.text }}>
                </a>
              </span>
            </li>
          ))}
        </ul>
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <span className="company">
                <a className="hover:text-[#10A5E0]" href={item.link}
                  dangerouslySetInnerHTML={{ __html: item.text }}>
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    // <div>
    //     <div className="stock-ticker">
    //         <ul>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Alphabet's Acquisition of Wiz for $32 Billion to Enhance Cloud Security</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Nvidia to Unveil Details of Latest AI Chip</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Adobe Introduces AI Video Tool to Compete with OpenAI</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Apple Faces Increased Scrutiny After Losing German Antitrust Fight</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Jack Ma's AI-Driven Comeback with Alibaba</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Rise of the 'Palantir Mafia' in Tech Startups</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">AI Tools Highlighted at Mobile World Congress</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Big Tech Competing with Sleep for User Attention</a></span>

    //             </li>
    //         </ul>

    //         <ul aria-hidden="true">
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Alphabet's Acquisition of Wiz for $32 Billion to Enhance Cloud Security</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Nvidia to Unveil Details of Latest AI Chip</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Adobe Introduces AI Video Tool to Compete with OpenAI</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Apple Faces Increased Scrutiny After Losing German Antitrust Fight</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Jack Ma's AI-Driven Comeback with Alibaba</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Rise of the 'Palantir Mafia' in Tech Startups</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">AI Tools Highlighted at Mobile World Congress</a></span>

    //             </li>
    //             <li className="">
    //             <span className="company"><a className="hover:text-[#10A5E0]" href="">Big Tech Competing with Sleep for User Attention</a></span>

    //             </li>
    //         </ul>
    //     </div>
    // </div>
  );
};

export default TextSlide;
