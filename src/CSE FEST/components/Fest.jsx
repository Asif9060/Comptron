import React, { useState } from 'react';
import { Calendar, GraduationCap, Trophy, ArrowRight } from 'lucide-react';
import "../components/css/Fest.css";

const Fest = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      title: "Main Events",
      description: "Experience exciting programming contests, hackathons, and technical competitions that challenge your skills.",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      title: "Workshops",
      description: "Learn from industry experts through hands-on workshops covering latest technologies and best practices.",
      icon: <GraduationCap className="w-8 h-8" />,
    },
    {
      title: "Activities",
      description: "Participate in fun activities, networking sessions, and cultural events throughout the carnival.",
      icon: <Trophy className="w-8 h-8" />,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className=" mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl exp font-bold text-[#1C1535] mb-6 leading-tight">
            Experience the Thrills of NWU CSE FEST
          </h1>
          <div className="w-20 h-1 bg-[#F6A623] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a world of technology, innovation, and competition. 
            Our carnival brings together the brightest minds in computer science for an unforgettable experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Icon Container */}
              <div className="relative flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#F6A623] flex items-center justify-center shadow-md">
                  <div className="text-white">{feature.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#F6A623] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <button className="group relative px-8 py-4 bg-[#F6A623] text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1">
            <span className="flex items-center justify-center space-x-2">
              <span>Join the Carnival</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fest;