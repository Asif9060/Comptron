import { useState, useEffect } from "react";

const Partner = () => {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Partner logos with online URLs
  const partners = [
    {
      id: 1,
      name: "Programming Hero",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Programming_Hero_logo.svg/1200px-Programming_Hero_logo.svg.png"
    },
    {
      id: 2,
      name: "Cyber Bangla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Cyber_Bangla_Logo.svg/1200px-Cyber_Bangla_Logo.svg.png"
    },
    {
      id: 3,
      name: "Operand",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Operand_Logo.svg/1200px-Operand_Logo.svg.png"
    },
    {
      id: 4,
      name: "VKWay Global",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/VKWay_Global_Logo.svg/1200px-VKWay_Global_Logo.svg.png"
    },
    {
      id: 5,
      name: "TechNexus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/TechNexus_Logo.svg/1200px-TechNexus_Logo.svg.png"
    },
    {
      id: 6,
      name: "CodeCraft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/CodeCraft_Logo.svg/1200px-CodeCraft_Logo.svg.png"
    },
    {
      id: 7,
      name: "DigitalEdge",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DigitalEdge_Logo.svg/1200px-DigitalEdge_Logo.svg.png"
    }
  ];

  // Create a duplicate array to create the infinite effect
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    // Animation function
    const animate = () => {
      if (!isHovered) {
        setOffset(prev => {
          const newOffset = prev - 0.5;
          // Reset offset when it reaches the end of the first cycle
          if (Math.abs(newOffset) >= (partners.length * 100)) {
            return 0;
          }
          return newOffset;
        });
      }
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered, partners.length]);

  return (
    <div className="relative w-full py-20 bg-[#1c1535]">
      {/* Title */}
      <div className="mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#F6A623] mb-6 tracking-tight">
          Our Partners
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] mx-auto rounded-full"></div>
      </div>

      {/* Logo Container */}
      <div 
        className="mx-auto px-4 w-1/2 relative overflow-hidden cursor-grab"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Infinite Logo Strip */}
        <div 
          className="flex items-center justify-center space-x-8 transition-transform duration-500 ease-linear"
          style={{ 
            transform: `translateX(${offset}px)`,
            transition: 'transform 0s linear'
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0"
            >
              <div className="bg-[#1c1535]/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-8 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/10">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-16 object-contain mx-auto"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/120x40/1c1535/F6A623?text=${partner.name}`;
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border border-[#F6A623]/20 rounded-full animate-spin-slow opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-br from-[#F6A623]/10 to-transparent rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-[#F6A623]/30 rotate-12 animate-bounce-slow opacity-20"></div>
      </div>
    </div>
  );
};

export default Partner;