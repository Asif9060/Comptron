import { useEffect, useState, useRef } from "react";
import './CSS/ImageSlide.css';
import photo from '../../assets/images/exmember.jpg';
import photo2 from '../../assets/images/member.jpg';
import photo3 from '../../assets/images/Shohoj.jpg';
import photo4 from '../../assets/images/gang.jpg';
const images = [
  { src: [photo], alt: "Forza Horizon 5" },
  { src: [photo2], alt: "Ghost of Tsushima" },
  { src: [photo3], alt: "Spider-Man PS4" },
  { src: [photo4], alt: "God of War 4" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const slideRef = useRef(null);
  
  useEffect(() => {
    let autoSlide;
    if (autoSlideEnabled) {
      autoSlide = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(autoSlide);
  }, [autoSlideEnabled]);

  return (
    <div className="relative max-w-3xl mb-10 mx-auto overflow-hidden imgslide rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={slideRef}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="w-full flex-shrink-0 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
      
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
      >
        &#10095;
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white scale-125" : "bg-gray-400"}`}
          ></button>
        ))}
      </div>
      
      <button
        onClick={() => setAutoSlideEnabled(!autoSlideEnabled)}
        className="absolute bg-transparent bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        {autoSlideEnabled ? "Pause Auto Slide" : "Resume Auto Slide"}
      </button>
    </div>
  );
}
