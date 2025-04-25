import "./CSS/ImageSlide.css";
import { useEffect, useState } from "react";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://comptron-server-2.onrender.com/api/eventImages");
      const data = await response.json();
      setImages(data.filter((item) => item?.imageUrl));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    let slideInterval;
    if (autoSlide && images.length > 0) {
      slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(slideInterval);
  }, [autoSlide, images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const toggleAutoSlide = () => {
    setAutoSlide(!autoSlide);
  };

  return (
    <div className="relative overflow-hidden imgslide w-full">
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image.imageUrl}
            alt={`Slide ${idx}`}
            className="w-full h-80 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prevSlide} className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={nextSlide} className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* AutoSlide Toggle Button */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <button
          onClick={toggleAutoSlide}
          className="px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-200"
        >
          {autoSlide ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
