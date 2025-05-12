import { useEffect, useRef, useState } from "react";
import "./CSS/AboutClub.css";

const AboutClub = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://comptron-server-2.onrender.com/api/eventImages");
        const data = await response.json();
        
        // Map API data to the format we need
        const formattedImages = data.map((item, index) => ({
          src: item.imageUrl,
          alt: item.title || `Club Image ${index + 1}`,
          caption: item.description || "About Club"
        }));
        
        setImages(formattedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        // Fallback if API fails
        setImages([
          { src: "https://via.placeholder.com/800x600?text=Image+Not+Found", alt: "Club Image 1", caption: "About Club" },
          { src: "https://via.placeholder.com/800x600?text=Image+Not+Found", alt: "Club Image 2", caption: "About Club" },
          { src: "https://via.placeholder.com/800x600?text=Image+Not+Found", alt: "Club Image 3", caption: "About Club" },
          { src: "https://via.placeholder.com/800x600?text=Image+Not+Found", alt: "Club Image 4", caption: "About Club" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const element = sectionRef.current;
        const rect = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          setIsVisible(true);
        }
        
        // Calculate how far the element is from the top of the viewport
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 when element enters viewport, 1 when it leaves)
        const scrollProgress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
        
        // Limit values between 0 and 1
        const limitedProgress = Math.min(Math.max(scrollProgress, 0), 1);
        
        setScrollPosition(limitedProgress);
      }
    };

    // Also handle window resize to ensure responsive behavior
    const handleResize = () => {
      // Recalculate when window is resized
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Simple sliding effect based on scroll position
  const getSlideTransform = (index) => {
    // Determine direction based on row position (first row slides right, second row slides left)
    const direction = index < 2 ? 1 : -1;
    
    // Calculate slide distance based on scroll progress and screen size
    let maxSlideDistance;
    
    if (window.innerWidth < 480) {
      // Extra small screens
      maxSlideDistance = 60;
    } else if (window.innerWidth < 768) {
      // Small screens
      maxSlideDistance = 80;
    } else if (window.innerWidth < 1024) {
      // Medium screens
      maxSlideDistance = 150;
    } else {
      // Large screens
      maxSlideDistance = 200;
    }
    
    const slideDistance = scrollPosition * maxSlideDistance * direction;
    
    return `translateX(${slideDistance}px)`;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Club Information */}
        <div 
          ref={textRef} 
          className={`mb-10 md:mb-16 text-center reveal ${isVisible ? 'active' : ''}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
            About Comptron Club
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
            Founded in 2018, Comptron is the official computer science club of NWU, dedicated to fostering innovation, technical expertise, and collaborative growth. We regularly host coding challenges, tech workshops, and industry-connected events to prepare students for real-world tech careers.
          </p>
        </div>

        {/* Image Showcase with Simple Sliding Effect */}
        <div 
          ref={imagesRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-md sm:rounded-lg shadow-md sm:shadow-lg w-full md:w-[400px] lg:w-[650px] h-[250px] md:h-[300px] mx-auto bg-gray-100 animate-pulse flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              </div>
            ))
          ) : (
            // Actual images
            images.map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-md sm:rounded-lg shadow-md sm:shadow-lg transition-all duration-500 w-full md:w-[400px] lg:w-[550px] h-[250px] md:h-[300px] mx-auto group bg-white"
                style={{ 
                  transform: getSlideTransform(index),
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.6s ease-out, opacity 0.8s ease"
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-2">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                      transition: 'transform 0.5s ease'
                    }}
                    className="group-hover:scale-105"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutClub; 