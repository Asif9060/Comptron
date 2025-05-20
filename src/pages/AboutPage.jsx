import MessageFromAdvisor from "../Components/UI/MessageFromAdvisor";
import Objectives from "../Components/UI/Objectives";
import { motion } from "framer-motion";
import "../Components/UI/CSS/VisionAndMission.css";
import msgForMobile from "../assets/images/pooto/msgFormobile.php.png";
import Footer from "../Components/Layout/Footer";
import SideMenu from "../Components/Features/SideMenu";
import AdvisorMessage from "../Components/UI/AdvisorMessage";
const AboutPage = () => {
  return (
    <div className=" w-full h-screen">
      {/* <div className="text-[35px] underline underline-offset-9 text-white text-center">Objectives</div> */}
      <div className="relative translate-y-[4rem] mb-[2rem] z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-black md:text-4xl lg:text-5xl dark:text-[#15A6E1]">
        {"Our Vision & Mission".split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </div>
      <div className="flex translate-y-[5rem] flex-col mb-[5rem] items-center justify-center">
        <p className=" flex vision text-center text-black text-2xl  w-[70rem]">
          To be a pioneering hub for technological innovation, research, and
          problem-solving, empowering students across all disciplines to harness
          the power of computing, artificial intelligence, and advanced
          engineering to drive meaningful advancements in academia, industry,
          and society.
        </p>
        <br />
        <br />
        <p className="flex mission text-center text-2xl text-black w-[70rem]">
          Comptron is committed to fostering an intellectually stimulating
          environment where students develop problem-solving skills,
          computational expertise, and research-driven innovation. Through
          competitive programming, interdisciplinary collaboration, cutting-edge
          research, and participation in global technology competitions, we aim
          to bridge the gap between theory and real-world application, equipping
          future leaders with the knowledge and technical proficiency to shape
          the future of computing and engineering.
        </p>
      </div>

      <div className="relative translate-y-[7rem] z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-black md:text-700 md:text-4xl lg:text-5xl">
        {"Objectives".split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </div>
      <div className="translate-y-[10rem]">
        <Objectives></Objectives>
      </div>
      <div className="">
        {/* <MessageFromAdvisor></MessageFromAdvisor> */}
        <AdvisorMessage></AdvisorMessage>
      </div>
      {/* <div className="msgForMobile hidden">
        <div className="text-[25px]  text-slate-300 text-center mb-6 font-bold">
          Message From Advisor
        </div>
        <img src={msgForMobile} alt="" />
      </div> */}
      <div className="foot">
        <Footer></Footer>
      </div>

        <div className="-translate-y-[202rem] sidemenu fixed">
          <SideMenu></SideMenu>
        </div>

    </div>
  );
};

export default AboutPage;
