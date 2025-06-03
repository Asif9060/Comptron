import { useEffect, useRef, useState } from "react";
import Advisor from "../../assets/images/photo/M. Raihan.jpg";
import { motion } from "framer-motion";

const AdvisorMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef(null);
  const textParagraphs = [
    "Comptron, established in 2018 under the leadership of 12 esteemed Comptron Councilors, serves as a distinguished platform for students passionate about technology, competitive programming, research, artificial intelligence, and advanced engineering. Guided by our motto, \"Creativity Assembled,\" the club fosters an intellectually stimulating environment that promotes critical thinking, interdisciplinary collaboration, and technological innovation.",
    "At the core of Comptron lies the development of problem-solving abilities, computational efficiency, and research-driven innovation. A key focus is competitive programming, where members undergo rigorous training in algorithmic problem-solving, data structures, computational theory, and optimization techniques. Through structured workshops and participation in ICPC, Codeforces, Hackerrank, AtCoder, and Google Kick Start, students sharpen their analytical and technical skills, preparing for global academic and industry challenges.",
    "Beyond programming, Comptron is committed to cutting-edge research and emerging technologies, including artificial intelligence, machine learning, cybersecurity, quantum computing, cryptography, and software engineering. We encourage students to engage in scholarly research, contribute to open-source projects, and collaborate with faculty and industry experts, ensuring meaningful contributions to technological advancements.",
    "We invite all aspiring programmers, researchers, and technology enthusiasts to join this dynamic community. Through collaborative research, technical competitions, and innovation-driven initiatives, our members contribute meaningfully to the evolving landscape of computing and engineering.",
    "Join Comptron, where creativity is assembled, knowledge is expanded, and groundbreaking ideas take shape, paving the way for a smarter and more innovative future.",
  ];

  const advisorDetails = {
    name: "M. Raihan",
    title: "Assistant Professor",
    department: "Department of Computer Science and Engineering",
    university: "North Western University",
    location: "Khulna, Bangladesh"
  };

  const contactDetails = {
    pabx: "+880-2477-730596 Ext: 105",
    phone: "+880-1714070902, +880-1841724707",
    email: "rianku11@gmail.com, mraihan@nwu.ac.bd"
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({ 
      opacity: 1,
      transition: { 
        duration: 0.8,
        delay: 0.8 + (i * 0.2),
        ease: "easeInOut"
      }
    })
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-6 pt-20 sm:pt-50">
      <motion.div 
        ref={messageRef}
        variants={cardVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="bg-gradient-to-br from-[#121212] to-[#202020] w-full max-w-7xl rounded-xl shadow-2xl overflow-hidden p-4 sm:p-8"
      >
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-[#15A6E1] text-white text-center text-lg sm:text-xl font-bold rounded-lg mb-6 sm:mb-10 py-3 sm:py-4 shadow-lg"
        >
          Message From Advisor
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="w-full lg:w-1/3"
          >
            <div className="relative">
              <div className="relative w-[220px] sm:w-[280px] h-[200px] sm:h-[260px] mx-auto overflow-hidden rounded-xl border-2 border-[#15A6E1]/30 shadow-lg">
                <img
                  src={Advisor}
                  alt="Advisor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          <div className="lg:w-2/3 space-y-4 sm:space-y-5 text-justify">
            {textParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="text-[#15A6E1] text-sm sm:text-base leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
            
            <motion.div
              custom={textParagraphs.length}
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-[#15A6E1]/80 text-xs sm:text-sm italic"
            >
              <div className="space-y-0.5">
                {Object.values(advisorDetails).map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              custom={textParagraphs.length + 1}
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-[#15A6E1]/80 text-xs sm:text-sm italic"
            >
              <div className="font-medium mb-1">Office Address:</div>
              <div className="flex flex-col space-y-1">
                <div className="flex flex-col sm:flex-row">
                  <span className="w-14 inline-block">PABX:</span>
                  <span className="sm:ml-2">{contactDetails.pabx}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <span className="w-14 inline-block">Phone:</span>
                  <span className="sm:ml-2">{contactDetails.phone}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <span className="w-14 inline-block">Email:</span>
                  <span className="sm:ml-2 break-words">{contactDetails.email}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#15A6E1]"></div>
            <span className="text-[#15A6E1] text-xs sm:text-sm">Creativity Assembled</span>
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#15A6E1]"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdvisorMessage;
