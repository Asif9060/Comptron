import ImageUpload from "../../AdminPanel/ImageUpload";
import "./CSS/EventSlider.css";
import { useRef, useEffect, useState } from "react";

const Recent = () => {
   const nextBtn = useRef(null);
   const prevBtn = useRef(null);
   const carousel = useRef(null);
   const list = useRef(null);
   const runningTime = useRef(null);
   const autoPlayInterval = useRef(null);

   const [eventImages, setEventImages] = useState([]);
   const [isPaused, setIsPaused] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);

   const timeRunning = 3000;
   const timeAutoNext = 4000;
   useEffect(() => {
      fetchImages();

      // Start autoplay when component mounts
      if (!isPaused) {
         startAutoPlay();
      }

      return () => {
         stopAutoPlay();
      };
   }, []);

   // Handle autoplay state changes
   useEffect(() => {
      if (isPaused) {
         stopAutoPlay();
      } else {
         startAutoPlay();
      }
   }, [isPaused]);

   const startAutoPlay = () => {
      stopAutoPlay(); // Clear any existing interval
      autoPlayInterval.current = setInterval(() => {
         handleNext();
      }, timeAutoNext);
   };

   const stopAutoPlay = () => {
      if (autoPlayInterval.current) {
         clearInterval(autoPlayInterval.current);
         autoPlayInterval.current = null;
      }
   };

   const handleNext = () => {
      const ItemsDom = list.current.querySelectorAll(".item");
      if (!ItemsDom.length) return;

      list.current.appendChild(ItemsDom[0]);
      carousel.current.classList.add("next");

      setTimeout(() => {
         carousel.current.classList.remove("next");
      }, timeRunning);

      resetTimeAnimation();
   };

   const handlePrev = () => {
      const ItemsDom = list.current.querySelectorAll(".item");
      if (!ItemsDom.length) return;

      list.current.prepend(ItemsDom[ItemsDom.length - 1]);
      carousel.current.classList.add("prev");

      setTimeout(() => {
         carousel.current.classList.remove("prev");
      }, timeRunning);

      resetTimeAnimation();
   };
   const startAutoSlide = () => {
      // Clear any existing timeout
      clearTimeout(runNextAuto.current);

      // Only start auto-slide if not paused
      if (!isPaused) {
         runNextAuto.current = setTimeout(() => {
            if (nextBtn.current && !isPaused) {
               nextBtn.current.click();
            }
         }, timeAutoNext);
      }
   };

   const fetchImages = async () => {
      try {
         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/eventImages"
         );
         const data = await response.json();
         setEventImages(data.filter((img) => img?.imageUrl));
      } catch (error) {
         console.error("Error fetching event images:", error);
      }
   };
   const resetTimeAnimation = () => {
      if (runningTime.current) {
         // Force a reflow to reset the animation
         runningTime.current.style.animation = "none";
         runningTime.current.offsetHeight;

         // Reset the animation
         runningTime.current.style.animation = "runningTime 4s linear 1 forwards";

         // Set animation state based on pause status
         runningTime.current.style.animationPlayState = isPaused ? "paused" : "running";
      }
   };

   const show = (type) => {
      const ItemsDom = list.current.querySelectorAll(".item");
      if (!ItemsDom.length) return;

      if (type === "next") {
         list.current.appendChild(ItemsDom[0]);
         carousel.current.classList.add("next");
      } else {
         list.current.prepend(ItemsDom[ItemsDom.length - 1]);
         carousel.current.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
         carousel.current.classList.remove("next");
         carousel.current.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto.current);
      if (!isPaused) {
         startAutoSlide();
         resetTimeAnimation();
      }
   };
   const togglePause = () => {
      setIsPaused(!isPaused);
      if (runningTime.current) {
         if (!isPaused) {
            // Going to pause
            runningTime.current.style.animationPlayState = "paused";
         } else {
            // Going to play
            runningTime.current.style.animationPlayState = "running";
            resetTimeAnimation();
         }
      }
   };

   return (
      <div>
         <div
            ref={carousel}
            className="carousel mt-8 sm:mt-12 md:mt-16 lg:translate-y-[200px] xl:translate-y-[250px] 2xl:translate-y-[350px]">
            <div ref={list} className="list">
               {eventImages.map((image, index) => (
                  <div
                     key={index}
                     style={{ backgroundImage: `url(${image.imageUrl})` }}
                     className="item">
                     <div className="content">
                        <div className="title"></div>
                        <div className="name"></div>
                        <div className="des"></div>
                        <div className="btn">
                           <a href="/Events">
                              <button className="px-3 py-1 sm:px-4 sm:py-2">
                                 Details
                              </button>
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>{" "}
            <div className="arrows flex items-center gap-2 sm:gap-4">
               <button onClick={handlePrev} ref={prevBtn} className="prev">
                  <svg
                     className="w-5 sm:w-7 translate-x-3"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                     <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
               </button>{" "}
               <button
                  onClick={togglePause}
                  className="pause-play rounded bg-white text-black font-semibold px-4 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center min-w-[80px]">
                  {isPaused ? "Play" : "Pause"}
               </button>
               <button onClick={handleNext} ref={nextBtn} className="next">
                  <svg
                     className="w-5 sm:w-7 translate-x-3"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                     <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
               </button>
            </div>
            <div ref={runningTime} className="timeRunning"></div>
         </div>
      </div>
   );
};

export default Recent;
