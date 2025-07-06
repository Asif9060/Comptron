// import { Theme } from "@radix-ui/themes";
import "../assets/CSS/index.css";
// import DarkMode from '../Components/Features/DarkMode';
import { useState, useEffect } from "react";
// import Navbar from '../Components/Layout/Navbar';
// import Header from "../Components/Layout/Header";
import TextSlide from "../Components/UI/TextSlide";
// import Members from '../Components/Features/Members';
import Button from "../Components/UI/MemberButton";
import TextEffect from "../Components/UI/TextEffect";
// import Menu from "../Components/Layout/Menu";
// import Welcomemsg from "../Components/Layout/Welcomemsg";
// import ScalingLogo from "../Components/UI/ScalingLogo";
// import Navbar2 from "../Components/Layout/Navbar2";
import Footer from "../Components/Layout/Footer";
// import EventSlider from "../Components/Features/EventSlider";
import TeacherCard from "./../Components/UI/TeacherCard";
import ImageSlide from "../Components/Features/Imageslide";
// Import fallback images in case API fails
import RaihanSir from "../assets/images/photo/M. Raihan.jpg";
import InzamamSir from "../assets/images/photo/Md. Inzamam-Ul-Hossain.jpg";
import PeyaMaam from "../assets/images/photo/Zahrul Jannat Peya.jpg";
import DeptHead from "../assets/images/photo/Dept Head.jpg";
import GradientBackground from "../Components/UI/GradientBackground";
import AnimatedBG from "../Components/UI/AnimatedBG";
import CoreMembers from "../Components/Features/CoreMembers";
// import { Divide } from 'lucide-react';
// import { Divider } from "@heroui/divider";
// import SideMenu from "../Components/Features/SideMenu";
import Recent from "../Components/Features/Recent";
import Hero from "../Components/Layout/Hero";
import AboutClub from "../Components/Layout/AboutClub";

const HomePage = () => {
   // Remove unused className state
   const [advisoryImages, setAdvisoryImages] = useState({
      "CAB-MRI": null,
      "CAB-IUH": null,
      "CAB-ZJ": null,
      "CAB-MAH": null,
   });
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchImages = async () => {
         setIsLoading(true);
         try {
            // Fetch images for each profile using their customId
            const ids = ["CAB-MRI", "CAB-IUH", "CAB-ZJ", "CAB-MAH"];
            const imageResponses = {};

            for (const id of ids) {
               try {
                  const response = await fetch(
                     `https://comptron-server-2.onrender.com/api/advisory/profile/${id}`
                  );
                  if (response.ok) {
                     const data = await response.json();
                     // Check different possible response structures and extract the image URL
                     if (data.profileImage) {
                        imageResponses[id] = data.profileImage;
                     } else if (data.image) {
                        imageResponses[id] = data.image;
                     } else if (data.imageUrl) {
                        imageResponses[id] = data.imageUrl;
                     } else if (data.avatar) {
                        imageResponses[id] = data.avatar;
                     } else {
                        console.error(`No image found in response for ${id}`, data);
                     }
                  } else {
                     console.error(
                        `Failed to fetch image for ${id}: ${response.status} ${response.statusText}`
                     );
                  }
               } catch (error) {
                  console.error(`Error fetching profile for ${id}:`, error);
               }
            }

            setAdvisoryImages(imageResponses);
         } catch (error) {
            console.error("Error fetching advisory images:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchImages();
   }, []);

   // Updated contents with dynamic images from API with fallbacks
   const contents = [
      {
         img: [advisoryImages["CAB-MRI"] || RaihanSir],
         profile: "/advisory/profile/CAB-MRI",
         name: "M. Raihan",
         position: "Advisor",
         from: "Comptron",
         url: {
            facebook: "https://www.facebook.com/memraihan",
            linkedin:
               "https://www.linkedin.com/in/mraihanme/?original_referer=https%3A%2F%2Fwww.mraihan.me%2F",
            github: "https://github.com/memraihan",
         },
      },

      {
         img: [advisoryImages["CAB-IUH"] || InzamamSir],
         profile: "/advisory/profile/CAB-IUH",
         name: "Md. Inzamam-Ul-Hossain",
         position: "Moderator",
         from: "Comptron",
         url: {
            facebook: "",
         },
      },

      {
         img: [advisoryImages["CAB-ZJ"] || PeyaMaam],
         profile: "/advisory/profile/CAB-ZJ",
         name: "Zahrul Jannat Peya",
         position: "Moderator",
         from: "Comptron",
         url: {
            facebook: "",
         },
      },
      {
         img: [advisoryImages["CAB-MAH"] || DeptHead],
         profile: "/advisory/profile/CAB-MAH",
         name: "Md. Mahedi Hasan",
         position: "Department Head",
         from: "Computer Science and Engineering",
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
            Head of the Department
         </h1>
         <div>
            {isLoading ? (
               <div className="flex justify-center">
                  <div className="card animate-pulse relative overflow-hidden m-4">
                     <div className="profile-pic">
                        <div className="w-full h-full bg-gray-300 rounded-md relative overflow-hidden">
                           <div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                              style={{ backgroundSize: "200% 100%" }}></div>
                        </div>
                     </div>
                     <div className="bottom">
                        <div className="content">
                           <div className="h-6 bg-gray-300 rounded-sm w-3/4 mb-2 relative overflow-hidden">
                              <div
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                 style={{ backgroundSize: "200% 100%" }}></div>
                           </div>
                           <div className="h-4 bg-gray-200 rounded-sm w-1/2 mb-1 relative overflow-hidden">
                              <div
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                 style={{ backgroundSize: "200% 100%" }}></div>
                           </div>
                           <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-1 relative overflow-hidden">
                              <div
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                 style={{ backgroundSize: "200% 100%" }}></div>
                           </div>
                        </div>
                        <div className="bottom-bottom">
                           <div className="social-links-container cursor-pointer">
                              <div className="flex gap-2">
                                 <div className="w-8 h-8 bg-gray-300 rounded-sm relative overflow-hidden">
                                    <div
                                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                       style={{ backgroundSize: "200% 100%" }}></div>
                                 </div>
                                 <div className="w-8 h-8 bg-gray-300 rounded-sm relative overflow-hidden">
                                    <div
                                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                       style={{ backgroundSize: "200% 100%" }}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="animate-fade-in">
                  <TeacherCard cont={contents[3]}></TeacherCard>
               </div>
            )}
         </div>
         <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl mt-8 md:mt-15 font-bold text-[#15A6E1] underline underline-offset-4 md:underline-offset-7 px-4">
            Advisory Panel
         </h1>
         <div className="flex teacher justify-center gap-7 flex-wrap">
            {isLoading ? (
               <div className="flex justify-center gap-7 flex-wrap">
                  {[1, 2, 3].map((item) => (
                     <div
                        key={item}
                        className="card animate-pulse relative overflow-hidden m-4">
                        <div className="profile-pic">
                           <div className="w-full h-full bg-gray-300 rounded-md relative overflow-hidden">
                              <div
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                 style={{ backgroundSize: "200% 100%" }}></div>
                           </div>
                        </div>
                        <div className="bottom">
                           <div className="content">
                              <div className="h-6 bg-gray-300 rounded-sm w-3/4 mb-2 relative overflow-hidden">
                                 <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                    style={{ backgroundSize: "200% 100%" }}></div>
                              </div>
                              <div className="h-4 bg-gray-200 rounded-sm w-1/2 mb-1 relative overflow-hidden">
                                 <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                    style={{ backgroundSize: "200% 100%" }}></div>
                              </div>
                              <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-1 relative overflow-hidden">
                                 <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                    style={{ backgroundSize: "200% 100%" }}></div>
                              </div>
                           </div>
                           <div className="bottom-bottom">
                              <div className="social-links-container cursor-pointer">
                                 <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-sm relative overflow-hidden">
                                       <div
                                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                          style={{ backgroundSize: "200% 100%" }}></div>
                                    </div>
                                    <div className="w-8 h-8 bg-gray-300 rounded-sm relative overflow-hidden">
                                       <div
                                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                          style={{ backgroundSize: "200% 100%" }}></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="flex justify-center gap-7 animate-fade-in flex-wrap sm:flex-nowrap md:flex-nowrap lg:flex-nowrap">
                  <TeacherCard cont={contents[0]}></TeacherCard>
                  <TeacherCard cont={contents[1]}></TeacherCard>
                  <TeacherCard cont={contents[2]}></TeacherCard>
               </div>
            )}
         </div>
         <h2 className="flex councilor mt-[5rem] justify-center text-4xl text-[#15A6E1] font-bold underline underline-offset-6">
            Councilors (2025-2026)
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
