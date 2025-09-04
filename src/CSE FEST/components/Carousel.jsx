import { useState, useEffect } from "react";
import "./css/carousel.css";
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1587623495008-d8c2b2e361d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552429740-99a99281e5d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1c1535]">
      {/* Main Carousel */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1535]/90 to-[#1c1535]/70"></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className="max-w-4xl text-center">
                <h1 className="text-4xl md:text-6xl font-bold cltxt text-white mb-6 leading-tight">
                  Experience the Thrilling NWU CSE FEST
                </h1>
                <p className="text-lg md:text-xl text-[#F6A623]/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join us for a week of excitement, innovation, and fun from August 20-28, 2025!
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-[#1c1535] font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Gallery →
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#F6A623]/20 backdrop-blur-sm border border-[#F6A623]/30 rounded-full flex items-center justify-center text-white hover:bg-[#F6A623]/30 transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#F6A623]/20 backdrop-blur-sm border border-[#F6A623]/30 rounded-full flex items-center justify-center text-white hover:bg-[#F6A623]/30 transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#F6A623] scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-[#F6A623]/20 rounded-full animate-spin-slow opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-[#F6A623]/30 rotate-12 animate-bounce-slow opacity-20"></div>
    </div>
  );
};

export default Carousel;