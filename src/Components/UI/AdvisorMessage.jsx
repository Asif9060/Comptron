import { useEffect, useRef, useState } from "react";
import Advisor from "../../assets/images/photo/M. Raihan.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdvisorMessage = () => {
   const [isVisible, setIsVisible] = useState(false);
   const messageRef = useRef(null);

   const textParagraphs = [
      'Comptron, established in 2018 under the leadership of 12 esteemed Comptron Councilors, serves as a distinguished platform for students passionate about technology, competitive programming, research, artificial intelligence, and advanced engineering. Guided by our motto, "Creativity Assembled," the club fosters an intellectually stimulating environment that promotes critical thinking, interdisciplinary collaboration, and technological innovation.',
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
      location: "Khulna, Bangladesh",
   };

   const contactDetails = {
      pabx: "+880-2477-730596 Ext: 105",
      phone: "+880-1714070902, +880-1841724707",
      email: "rianku11@gmail.com, mraihan@nwu.ac.bd",
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
         { threshold: 0.1, rootMargin: "50px" }
      );

      if (messageRef.current) {
         observer.observe(messageRef.current);
      }

      return () => observer.disconnect();
   }, []);

   // Animation variants for enhanced UX
   const containerVariants = {
      hidden: { opacity: 0, y: 60 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.15,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: "easeOut",
         },
      },
   };

   const imageVariants = {
      hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
      visible: {
         opacity: 1,
         scale: 1,
         rotateY: 0,
         transition: {
            duration: 0.8,
            ease: "easeOut",
         },
      },
   };

   const textVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            delay: 0.4 + i * 0.1,
            ease: "easeOut",
         },
      }),
   };
   return (
      <section
         className="translate-y-[13rem] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mb-[10rem]"
         aria-labelledby="advisor-message-title">
         <div className="max-w-7xl mx-auto">
            <motion.div
               ref={messageRef}
               variants={containerVariants}
               initial="hidden"
               animate={isVisible ? "visible" : "hidden"}
               className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
               {/* Header Section */}
               <motion.header
                  variants={itemVariants}
                  className="relative bg-gradient-to-r from-[#15A6E1] via-[#1295CC] to-[#1089BD] px-8 py-8 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                     <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                     <div className="absolute top-4 right-8 w-24 h-24 bg-white rounded-full opacity-20"></div>
                     <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                     <div className="absolute bottom-4 left-8 w-16 h-16 bg-white rounded-full opacity-30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                     <h1
                        id="advisor-message-title"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight leading-tight">
                        <motion.span
                           initial={{ opacity: 0, y: 20 }}
                           animate={
                              isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                           }
                           transition={{ delay: 0.2, duration: 0.6 }}
                           className="block text-[#04ffea]">
                           Message From
                        </motion.span>
                        <motion.span
                           initial={{ opacity: 0, y: 20, scale: 0.9 }}
                           animate={
                              isVisible
                                 ? { opacity: 1, y: 0, scale: 1 }
                                 : { opacity: 0, y: 20, scale: 0.9 }
                           }
                           transition={{ delay: 0.4, duration: 0.6 }}
                           className="block font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mt-1">
                           Advisor
                        </motion.span>
                     </h1>

                     <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={
                           isVisible
                              ? { opacity: 1, scaleX: 1 }
                              : { opacity: 0, scaleX: 0 }
                        }
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></motion.div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
               </motion.header>

               {/* Main Content */}
               <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                     {/* Advisor Image and Details */}
                     <motion.aside
                        variants={imageVariants}
                        className="lg:col-span-4 space-y-6">
                        {/* Image Container */}
                        <div className="relative group">
                           <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg ring-4 ring-[#15A6E1]/10 transition-all duration-300 group-hover:shadow-xl group-hover:ring-[#15A6E1]/20">
                              <Link to={"/advisory/profile/CAB-MRI"}>
                                 <img
                                    src={Advisor}
                                    alt={`Portrait of ${advisorDetails.name}, ${advisorDetails.title}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                 />
                              </Link>
                           </div>
                           {/* Decorative gradient overlay on hover */}
                           <div className="absolute inset-0 bg-gradient-to-t from-[#15A6E1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                        </div>

                        {/* Advisor Information Card */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
                           <div className="space-y-3">
                              <Link to={"/advisory/profile/CAB-MRI"}>
                                 <h2 className="text-xl font-bold text-gray-900 border-b border-[#15A6E1]/20 pb-2">
                                    {advisorDetails.name}
                                 </h2>
                              </Link>
                              <div className="space-y-2 text-gray-700">
                                 <p className="font-medium text-[#15A6E1]">
                                    {advisorDetails.title}
                                 </p>
                                 <p className="text-sm leading-relaxed">
                                    {advisorDetails.department}
                                 </p>
                                 <p className="text-sm font-medium">
                                    {advisorDetails.university}
                                 </p>
                                 <p className="text-sm text-gray-600">
                                    {advisorDetails.location}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                           <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-[#15A6E1]/20 pb-2">
                              Office Contact
                           </h3>
                           <div className="space-y-3 text-sm">
                              <div className="flex flex-col space-y-1">
                                 <span className="font-medium text-gray-700">PABX:</span>
                                 <a
                                    href={`tel:${contactDetails.pabx.replace(
                                       /[^\d+]/g,
                                       ""
                                    )}`}
                                    className="text-[#15A6E1] hover:text-[#1089BD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#15A6E1]/20 rounded">
                                    {contactDetails.pabx}
                                 </a>
                              </div>
                              <div className="flex flex-col space-y-1">
                                 <span className="font-medium text-gray-700">Phone:</span>
                                 <div className="space-y-1">
                                    {contactDetails.phone
                                       .split(", ")
                                       .map((phone, idx) => (
                                          <a
                                             key={idx}
                                             href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                             className="block text-[#15A6E1] hover:text-[#1089BD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#15A6E1]/20 rounded">
                                             {phone}
                                          </a>
                                       ))}
                                 </div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                 <span className="font-medium text-gray-700">Email:</span>
                                 <div className="space-y-1">
                                    {contactDetails.email
                                       .split(", ")
                                       .map((email, idx) => (
                                          <a
                                             key={idx}
                                             href={`mailto:${email}`}
                                             className="block text-[#15A6E1] hover:text-[#1089BD] transition-colors break-words focus:outline-none focus:ring-2 focus:ring-[#15A6E1]/20 rounded">
                                             {email}
                                          </a>
                                       ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.aside>

                     {/* Message Content */}
                     <motion.main className="lg:col-span-8 space-y-6">
                        <div className="prose prose-lg max-w-none">
                           {textParagraphs.map((paragraph, index) => (
                              <motion.p
                                 key={index}
                                 custom={index}
                                 variants={textVariants}
                                 initial="hidden"
                                 animate={isVisible ? "visible" : "hidden"}
                                 className="text-gray-700 leading-relaxed text-justify mb-6 first:mt-0 last:mb-0">
                                 {paragraph}
                              </motion.p>
                           ))}
                        </div>

                        {/* Motto Section */}
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={
                              isVisible
                                 ? { opacity: 1, scale: 1 }
                                 : { opacity: 0, scale: 0.95 }
                           }
                           transition={{ delay: 1.2, duration: 0.6 }}
                           className="mt-12 text-center">
                           <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#15A6E1]/5 to-[#1089BD]/5 rounded-full border border-[#15A6E1]/20">
                              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#15A6E1] to-transparent"></div>
                              <span className="text-[#15A6E1] font-semibold text-lg tracking-wide">
                                 Creativity Assembled
                              </span>
                              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#15A6E1] to-transparent"></div>
                           </div>
                        </motion.div>
                     </motion.main>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default AdvisorMessage;
