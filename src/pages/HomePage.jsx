import { Theme } from "@radix-ui/themes";
import "../assets/CSS/index.css";
// import DarkMode from '../Components/Features/DarkMode';
import { useState } from "react";
// import Navbar from '../Components/Layout/Navbar';
import Header from "../Components/Layout/Header";
import TextSlide from "../Components/UI/TextSlide";
// import Members from '../Components/Features/Members';
import Button from "../Components/UI/MemberButton";
import TextEffect from "../Components/UI/TextEffect";
import Menu from "../Components/Layout/Menu";
import Welcomemsg from "../Components/Layout/Welcomemsg";
// import ScalingLogo from "../Components/UI/ScalingLogo";
import Navbar2 from "../Components/Layout/Navbar2";
import Footer from "../Components/Layout/Footer";
import EventSlider from "../Components/Features/EventSlider";
import TeacherCard from "./../Components/UI/TeacherCard";
import ImageSlide from "../Components/Features/Imageslide";
import RaihanSir from "../assets/images/photo/M. Raihan.jpg";
import InzamamSir from "../assets/images/photo/Md. Inzamam-Ul-Hossain.jpg";
import PeyaMaam from "../assets/images/photo/Zahrul Jannat Peya.jpg";
import DeptHead from "../assets/images/photo/Dept Head.jpg";
import GradientBackground from "../Components/UI/GradientBackground";
import AnimatedBG from "../Components/UI/AnimatedBG";
import CoreMembers from "../Components/Features/CoreMembers";
// import { Divide } from 'lucide-react';
import { Divider } from "@heroui/divider";
import SideMenu from "../Components/Features/SideMenu";
import Recent from "../Components/Features/Recent";
import Hero from "../Components/Layout/Hero";
import AboutClub from "../Components/Layout/AboutClub";

const HomePage = () => {
   const [className, setClassName] = useState("");

   const updateClassName = (newClass) => {
      setClassName(newClass);
   };

   const contents = [
      {
         img: [RaihanSir],
         name: "M. Raihan",
         position: "Advisor",
         from:"Comptron",
         url: {
            facebook: "https://www.facebook.com/memraihan",
            linkedin:
               "https://www.linkedin.com/in/mraihanme/?original_referer=https%3A%2F%2Fwww.mraihan.me%2F",
            github: "https://github.com/memraihan",
         },
      },

      {
         img: [InzamamSir],
         name: "Md. Inzamam-Ul-Hossain",
         position: "Moderator",
         from:"Comptron",
         url: {
            facebook: "",
         },
      },

      {
         img: [PeyaMaam],
         name: "Zahrul Jannat Peya",
         position: "Moderator",
         from:"Comptron",
         url: {
            facebook: "",
         },
      },
      {
         img: [DeptHead],
         name: "Md. Mahedi Hasan",
         position: "Department Head",
         from:"Computer Science and Engineering",
         url: {
            facebook: "",
         },
      },
   ];

   return (
      <div className="bg-[#FFFFFF]">
         <Hero></Hero>
         <TextSlide></TextSlide>
         <AboutClub></AboutClub>
         {/* <Header></Header> */}
         {/* <Navbar></Navbar> */}
         {/* <Navbar2></Navbar2> */}
         {/* <DarkMode updateClassName={updateClassName}></DarkMode> */}
         {/* <Menu></Menu> */}
         <div className="absolute fixed translate-y-8 z-3">
            {/* <SideMenu></SideMenu> */}
         </div>
         <TextEffect></TextEffect>
         {/* <Welcomemsg></Welcomemsg> */}
         <h1 className="recent font-bold py-3 sm:py-4 md:py-5 text-3xl sm:text-4xl md:text-5xl text-[#15A6E1] text-center">
            Recent Activity
         </h1>
         {/* <EventSlider></EventSlider> */}
         <Recent></Recent>
         <ImageSlide></ImageSlide>
         {/* <div className="flex justify-center">
          <hr className="my-12 w-[1525px] h-[0.3px] border-t-0 bg-gray-800 opacity-100 dark:opacity-50" />
        </div> */}
         <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl mt-8 md:mt-15 font-bold text-[#15A6E1] underline underline-offset-4 md:underline-offset-7 px-4">
            Department Head
         </h1>
         <div>
            <TeacherCard cont={contents[3]}></TeacherCard>
         </div>
         <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl mt-8 md:mt-15 font-bold text-[#15A6E1] underline underline-offset-4 md:underline-offset-7 px-4">
            Advisory Board
         </h1>
         <div className="flex teacher justify-center gap-7 ">
            <TeacherCard cont={contents[0]}></TeacherCard>
            <TeacherCard cont={contents[1]}></TeacherCard>
            <TeacherCard cont={contents[2]}></TeacherCard>
         </div>
         <h2 className="flex councilor mt-[5rem] justify-center text-4xl text-[#15A6E1] font-bold underline underline-offset-6">
            Councilor (2025-2026)
         </h2>
         {/* <Members></Members> */}
         <CoreMembers></CoreMembers>
         <Button></Button>
         {/* <div className="flex justify-center">
          <hr className="my-10 w-[1525px] h-[0.3px] border-t-0 bg-gray-800 opacity-100 dark:opacity-50" />
        </div> */}
         {/* <div className="flex justify-center">
          <hr className="my-10 w-[1525px] h-[0.3px] border-t-0 bg-gray-800 opacity-100 dark:opacity-50" />
        </div> */}
         {/* <ScalingLogo></ScalingLogo> */}
         <GradientBackground></GradientBackground>
         <AnimatedBG></AnimatedBG>
         <Footer></Footer>
      </div>
   );
};

export default HomePage;
