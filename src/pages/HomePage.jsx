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
import { Link } from "react-router-dom";
import SuccessCSE from "/CSEFEST25.jpg";
import SuccessTechSpark from "/TeckSpark25.png";
import SuccessFest23 from "/CSEFEST23.jpg";
import SuccessWorkshop from "/BDAPPS.jpg";
import SuccessWorkshop1 from "/PHITRON.jpg";

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

   const successEvents = [
      {
         title: "CSE FEST 2025",
         descriptor: "National inter-university tech carnival",
         stats: ["5K+ visitors", "72 teams", "48 hours of hacks"],
         badge: "Flagship",
         image: SuccessCSE,
         link: "https://comptron.nwu.ac.bd/CseFest",
      },
      {
         title: "TechSpark 2025",
         descriptor: "Intra-University Tech Carnival",
         stats: ["14 workshops", "1.2K registrations", "9 partner companies"],
         badge: "Skills",
         image: SuccessTechSpark,
         link: "https://comptron.nwu.ac.bd/news/688e4d240fd2695795211999",
      },
      {
         title: "BDapps Powered by Robi Axiata Limited",
         descriptor: "Workshop",
         stats: ["36 projects", "18 mentors", "City-wide outreach"],
         badge: "Community",
         image: SuccessWorkshop,
         link: "https://comptron.nwu.ac.bd/news/68cfd4db9bb8a2745be9398f",
      },
      {
         title: "Collab With Phitron",
         descriptor: "Workshop",
         stats: ["36 projects", "18 mentors", "City-wide outreach"],
         badge: "Community",
         image: SuccessWorkshop1,
         link: "https://comptron.nwu.ac.bd/news/68a23131b80d3f8243573964",
      },
      {
         title: "CSE FEST 2023",
         descriptor: "National inter-university tech fest",
         stats: ["36 projects", "18 mentors", "City-wide outreach"],
         badge: "Community",
         image: SuccessFest23,
         link: "https://comptron.nwu.ac.bd/news/68415f0d684d2d7d76efc374",
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
         <h1 className="recent font-bold py-8 sm:py-4 md:py-5 text-3xl sm:text-4xl md:text-5xl text-[#15A6E1] text-center">
            Recent Activity
         </h1>
         {/* <EventSlider></EventSlider> */}
         <Recent></Recent>
         <section className="mt-24 sm:mt-16 md:mt-20 px-4 sm:px-8 md:px-12 lg:px-16 relative">
            {/* <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 blur-[1px] opacity-90 pointer-events-none"></div> */}
            <div className="relative flex flex-col gap-6 sm:gap-8 md:gap-10 border border-slate-100 rounded-[28px] bg-white/80 backdrop-blur-sm p-5 sm:p-7 md:p-8 shadow-[0_22px_70px_-40px_rgba(15,23,42,0.35)]">
               <div className="flex items-center justify-center flex-wrap gap-3">
                  <div className="text-center flex flex-col justify-center">
                     <p className="text-sm sm:text-lg uppercase tracking-[0.28em] text-sky-600 font-semibold">
                        Our Success
                     </p>
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 drop-shadow-sm">
                        Moments that define us
                     </h2>
                     <div className="h-[3px] w-28 sm:w-32 mt-3 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 rounded-full shadow-[0_12px_28px_-16px_rgba(14,165,233,0.9)] mx-auto"></div>
                     <p className="text-slate-700 mt-4 max-w-2xl text-base sm:text-lg mx-auto">
                        Signature events and workshops that grew our community, sharpened
                        skills, and showcased what Comptron can build together.
                     </p>
                  </div>
               </div>

               <div className="flex flex-wrap justify-center gap-6 sm:gap-7">
                  {successEvents.map((event, idx) => (
                     <Link
                        key={`${event.title}-${idx}`}
                        to={event.link}
                        className="group block w-full max-w-[440px] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-3xl">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 w-full h-full shadow-[0_18px_70px_-32px_rgba(14,165,233,0.55)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_90px_-34px_rgba(14,165,233,0.75)] ring-1 ring-white/70 group-hover:ring-sky-200/90">
                           <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-sky-50/30"></div>
                              <div className="absolute -top-24 -right-24 h-52 w-52 rounded-full bg-sky-200/35 blur-3xl"></div>
                              <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl"></div>
                           </div>
                           <div className="relative aspect-[16/9] overflow-hidden">
                              <img
                                 src={event.image}
                                 alt={event.title}
                                 className="h-full w-full object-cover"
                              />
                              <div
                                 className={`absolute inset-0 bg-gradient-to-br ${event.tone} opacity-65 mix-blend-multiply pointer-events-none`}></div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent"></div>
                           </div>
                           <div className="relative flex h-full flex-col items-center text-center px-5 sm:px-6 py-6 sm:py-7 gap-3">
                              <h3 className="text-2xl sm:text-2xl font-extrabold text-slate-900 leading-tight drop-shadow-sm">
                                 {event.title}
                              </h3>
                              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl">
                                 {event.descriptor}
                              </p>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>
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
