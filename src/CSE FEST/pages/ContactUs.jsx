import { useState } from "react";
import Navbar from "../components/Nav";

// Add modern CSS animations
const styles = `
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
  }
  
  @keyframes shimmer-input {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(246, 166, 35, 0.1); }
    50% { box-shadow: 0 0 40px rgba(246, 166, 35, 0.2); }
  }
  
  .animate-float-gentle {
    animation: float-gentle 8s ease-in-out infinite;
  }
  
  .shimmer-bg {
    background: linear-gradient(90deg, transparent, rgba(246, 166, 35, 0.1), transparent);
    background-size: 200px 100%;
    animation: shimmer-input 3s infinite;
  }
  
  .pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
   const styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   styleSheet.innerText = styles;
   document.head.appendChild(styleSheet);
}

const ContactUs = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState(null);

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
         setIsSubmitting(false);
         setSubmitStatus("success");
         setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
         });

         // Reset success message after 5 seconds
         setTimeout(() => {
            setSubmitStatus(null);
         }, 5000);
      }, 1500);
   };

   return (
      <div className="min-h-screen bg-[#1c1535] text-white">
         <Navbar />

         {/* Modern Hero Section */}
         <div className="relative pt-24 pb-16 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
               <div className="absolute top-20 left-10 w-40 h-40 border border-[#F6A623]/10 rounded-full animate-float-gentle"></div>
               <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-[#F6A623]/5 to-transparent rounded-full animate-pulse"></div>
               <div className="absolute bottom-40 left-1/4 w-16 h-16 border-2 border-[#F6A623]/20 rotate-45 animate-bounce"></div>
               <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[#F6A623]/20 rounded-full animate-ping"></div>
            </div>

            <div className="mx-auto px-6 text-center relative z-10">
               <div className="max-w-4xl mx-auto">
                  {/* Main heading with gradient */}
                  <h1 className="text-5xl md:text-7xl cnt font-bold mb-6 bg-gradient-to-r from-[#F6A623] via-[#ff8c00] to-[#F6A623] bg-clip-text text-transparent">
                     Get In Touch
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                     Have questions about NWU CSE FEST 2025? We&apos;d love to hear from
                     you! Connect with us for sponsorship opportunities, participation
                     details, or any other inquiries.
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                     <div className="text-center p-4 bg-[#1c1535]/40 backdrop-blur-sm rounded-xl border border-[#F6A623]/20">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Support</div>
                     </div>
                     <div className="text-center p-4 bg-[#1c1535]/40 backdrop-blur-sm rounded-xl border border-[#F6A623]/20">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">
                           &lt;24h
                        </div>
                        <div className="text-sm text-gray-400">Response</div>
                     </div>
                     <div className="text-center p-4 bg-[#1c1535]/40 backdrop-blur-sm rounded-xl border border-[#F6A623]/20">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">15+</div>
                        <div className="text-sm text-gray-400">Team Members</div>
                     </div>
                     <div className="text-center p-4 bg-[#1c1535]/40 backdrop-blur-sm rounded-xl border border-[#F6A623]/20">
                        <div className="text-2xl font-bold text-[#F6A623] mb-1">100%</div>
                        <div className="text-sm text-gray-400">Satisfaction</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
               {/* Enhanced Contact Form */}
               <div className="relative">
                  {/* Form background with glassmorphism */}
                  <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                     {/* Background pattern */}
                     <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F6A623] to-transparent"></div>
                     </div>

                     <div className="relative z-10">
                        <div className="flex items-center mb-8">
                           <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-[#ff8c00] rounded-xl flex items-center justify-center mr-4">
                              <svg
                                 className="w-6 h-6 text-[#1c1535]"
                                 fill="currentColor"
                                 viewBox="0 0 20 20">
                                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                           </div>
                           <h2 className="text-3xl font-bold text-[#F6A623]">
                              Send Message
                           </h2>
                        </div>

                        {/* Enhanced Success Message */}
                        {submitStatus === "success" && (
                           <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl flex items-center backdrop-blur-sm">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                 <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </div>
                              <span className="text-green-400 font-medium">
                                 Message sent successfully! We&apos;ll get back to you
                                 soon.
                              </span>
                           </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-[#F6A623] mb-2">
                                    Full Name *
                                 </label>
                                 <div className="relative group">
                                    <input
                                       type="text"
                                       id="name"
                                       name="name"
                                       value={formData.name}
                                       onChange={handleChange}
                                       required
                                       className="w-full px-4 py-3 bg-[#1c1535]/60 backdrop-blur-sm border border-[#F6A623]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] transition-all duration-300 group-hover:border-[#F6A623]/50"
                                       placeholder="Enter your full name"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#F6A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-[#F6A623] mb-2">
                                    Email Address *
                                 </label>
                                 <div className="relative group">
                                    <input
                                       type="email"
                                       id="email"
                                       name="email"
                                       value={formData.email}
                                       onChange={handleChange}
                                       required
                                       className="w-full px-4 py-3 bg-[#1c1535]/60 backdrop-blur-sm border border-[#F6A623]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] transition-all duration-300 group-hover:border-[#F6A623]/50"
                                       placeholder="Enter your email"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#F6A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-[#F6A623] mb-2">
                                    Phone Number
                                 </label>
                                 <div className="relative group">
                                    <input
                                       type="tel"
                                       id="phone"
                                       name="phone"
                                       value={formData.phone}
                                       onChange={handleChange}
                                       className="w-full px-4 py-3 bg-[#1c1535]/60 backdrop-blur-sm border border-[#F6A623]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] transition-all duration-300 group-hover:border-[#F6A623]/50"
                                       placeholder="Enter your phone number"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#F6A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label
                                    htmlFor="subject"
                                    className="block text-sm font-semibold text-[#F6A623] mb-2">
                                    Subject *
                                 </label>
                                 <div className="relative group">
                                    <select
                                       id="subject"
                                       name="subject"
                                       value={formData.subject}
                                       onChange={handleChange}
                                       required
                                       className="w-full px-4 py-3 bg-[#1c1535]/60 backdrop-blur-sm border border-[#F6A623]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] transition-all duration-300 appearance-none group-hover:border-[#F6A623]/50">
                                       <option value="">Select a subject</option>
                                       <option value="sponsorship">
                                          Sponsorship Inquiry
                                       </option>
                                       <option value="participation">
                                          Participation Details
                                       </option>
                                       <option value="volunteer">
                                          Volunteer Opportunities
                                       </option>
                                       <option value="media">Media & Press</option>
                                       <option value="general">General Inquiry</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                       <svg
                                          className="w-5 h-5 text-[#F6A623]/70"
                                          fill="currentColor"
                                          viewBox="0 0 20 20">
                                          <path
                                             fillRule="evenodd"
                                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="message"
                                 className="block text-sm font-semibold text-[#F6A623] mb-2">
                                 Message *
                              </label>
                              <div className="relative group">
                                 <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-[#1c1535]/60 backdrop-blur-sm border border-[#F6A623]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] transition-all duration-300 resize-none group-hover:border-[#F6A623]/50"
                                    placeholder="Tell us about your inquiry..."></textarea>
                                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#F6A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                              </div>
                           </div>

                           <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full relative bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] disabled:from-[#F6A623]/50 disabled:to-[#ff8c00]/50 text-[#1c1535] font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden group">
                              <span className="relative z-10 flex items-center">
                                 {isSubmitting ? (
                                    <>
                                       <svg
                                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1c1535]"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24">
                                          <circle
                                             className="opacity-25"
                                             cx="12"
                                             cy="12"
                                             r="10"
                                             stroke="currentColor"
                                             strokeWidth="4"></circle>
                                          <path
                                             className="opacity-75"
                                             fill="currentColor"
                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                       </svg>
                                       Sending Message...
                                    </>
                                 ) : (
                                    <>
                                       <svg
                                          className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                                          fill="currentColor"
                                          viewBox="0 0 20 20">
                                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                       </svg>
                                       Send Message
                                    </>
                                 )}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                           </button>
                        </form>
                     </div>
                  </div>
               </div>

               {/* Enhanced Contact Information */}
               <div className="space-y-8">
                  {/* Contact Info Cards */}
                  <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                     {/* Background pattern */}
                     <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#F6A623] to-transparent"></div>
                     </div>

                     <div className="relative z-10">
                        <div className="flex items-center mb-8">
                           <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-[#ff8c00] rounded-xl flex items-center justify-center mr-4">
                              <svg
                                 className="w-6 h-6 text-[#1c1535]"
                                 fill="currentColor"
                                 viewBox="0 0 20 20">
                                 <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                           <h2 className="text-3xl font-bold text-[#F6A623]">
                              Contact Information
                           </h2>
                        </div>

                        <div className="grid gap-6">
                           {/* Address Card */}
                           <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-[#1c1535]/40 backdrop-blur-sm border border-[#F6A623]/20 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105">
                              <div className="w-14 h-14 bg-gradient-to-br from-[#F6A623]/20 to-[#ff8c00]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <svg
                                    className="w-7 h-7 text-[#F6A623]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                 </svg>
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">
                                    Address
                                 </h3>
                                 <p className="text-gray-300">NWU Campus, Tejgaon</p>
                                 <p className="text-gray-300">Dhaka, Bangladesh</p>
                              </div>
                           </div>

                           {/* Phone Card */}
                           <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-[#1c1535]/40 backdrop-blur-sm border border-[#F6A623]/20 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105">
                              <div className="w-14 h-14 bg-gradient-to-br from-[#F6A623]/20 to-[#ff8c00]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <svg
                                    className="w-7 h-7 text-[#F6A623]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                 </svg>
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">
                                    Phone
                                 </h3>
                                 <a
                                    href="tel:+8801890430560"
                                    className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                    +880 1890-430560
                                 </a>
                              </div>
                           </div>

                           {/* Email Card */}
                           <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-[#1c1535]/40 backdrop-blur-sm border border-[#F6A623]/20 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105">
                              <div className="w-14 h-14 bg-gradient-to-br from-[#F6A623]/20 to-[#ff8c00]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <svg
                                    className="w-7 h-7 text-[#F6A623]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                 </svg>
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">
                                    Email
                                 </h3>
                                 <a
                                    href="mailto:nwucsefest@gmail.com"
                                    className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                    nwucsefest@gmail.com
                                 </a>
                              </div>
                           </div>

                           {/* Event Dates Card */}
                           <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-[#1c1535]/40 backdrop-blur-sm border border-[#F6A623]/20 hover:border-[#F6A623]/40 transition-all duration-300 hover:scale-105">
                              <div className="w-14 h-14 bg-gradient-to-br from-[#F6A623]/20 to-[#ff8c00]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <svg
                                    className="w-7 h-7 text-[#F6A623]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                 </svg>
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">
                                    Event Dates
                                 </h3>
                                 <p className="text-gray-300">August 21-29, 2025</p>
                                 <p className="text-sm text-[#F6A623] mt-1">
                                    Mark your calendar!
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Enhanced Map Section */}
                  <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl overflow-hidden shadow-2xl">
                     <div className="p-8 border-b border-[#F6A623]/20">
                        <div className="flex items-center">
                           <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-[#ff8c00] rounded-xl flex items-center justify-center mr-4">
                              <svg
                                 className="w-6 h-6 text-[#1c1535]"
                                 fill="currentColor"
                                 viewBox="0 0 20 20">
                                 <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                           <h2 className="text-3xl font-bold text-[#F6A623]">
                              Our Location
                           </h2>
                        </div>
                     </div>

                     {/* Enhanced Map */}
                     <div className="relative h-80 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
                        {/* Map content with better visuals */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="text-center">
                              <div className="relative mb-6">
                                 <div className="w-20 h-20 bg-gradient-to-br from-[#F6A623] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                                    <svg
                                       className="w-10 h-10 text-[#1c1535]"
                                       fill="currentColor"
                                       viewBox="0 0 24 24">
                                       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                 </div>
                                 {/* Ripple effect */}
                                 <div className="absolute inset-0 rounded-full border-4 border-[#F6A623]/30 animate-ping"></div>
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2">
                                 NWU Campus
                              </h3>
                              <p className="text-gray-300 text-lg">
                                 Tejgaon, Dhaka, Bangladesh
                              </p>

                              {/* Get Directions Button */}
                              <button className="mt-6 bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                                 <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                 </svg>
                                 Get Directions
                              </button>
                           </div>
                        </div>

                        {/* Modern Map Controls */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2">
                           <button className="w-10 h-10 bg-[#1c1535]/80 hover:bg-[#F6A623]/20 border border-[#F6A623]/30 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110">
                              <svg
                                 className="w-5 h-5 text-[#F6A623]"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                 />
                              </svg>
                           </button>
                           <button className="w-10 h-10 bg-[#1c1535]/80 hover:bg-[#F6A623]/20 border border-[#F6A623]/30 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110">
                              <svg
                                 className="w-5 h-5 text-[#F6A623]"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                 />
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="mt-20 text-center">
               <div className="relative bg-gradient-to-br from-[#1c1535]/80 to-[#1c1535]/60 backdrop-blur-xl border border-[#F6A623]/30 rounded-3xl p-12 max-w-4xl mx-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F6A623]/5 via-transparent to-[#F6A623]/5 animate-pulse"></div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-bold text-[#F6A623] mb-4">
                        Still Have Questions?
                     </h3>
                     <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Our team is here to help! Reach out to us through any of the
                        channels above, and we&apos;ll get back to you as soon as
                        possible.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group relative bg-gradient-to-r from-[#F6A623] to-[#ff8c00] hover:from-[#e0951f] hover:to-[#e6780d] text-[#1c1535] font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                           <span className="relative z-10 flex items-center">
                              <svg
                                 className="w-5 h-5 mr-2"
                                 fill="currentColor"
                                 viewBox="0 0 20 20">
                                 <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              Call Us Now
                           </span>
                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>

                        <button className="border border-[#F6A623]/40 hover:bg-[#F6A623]/10 text-[#F6A623] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:border-[#F6A623]/80">
                           Visit Campus
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Footer */}
         <Footer />
      </div>
   );
};

// Footer Component
const Footer = () => {
   return (
      <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
         <div className="mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Logo and Description */}
               <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                     <img
                        src="https://placehold.co/100x40/1c1535/F6A623?text=NWU+CSE+FEST"
                        alt="NWU CSE FEST Logo"
                        className="h-10 w-auto"
                     />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                     Join us for an exciting celebration of technology, innovation, and
                     creativity. Experience the thrilling NWU CSE FEST with competitions,
                     exhibitions, and networking opportunities.
                  </p>
                  <div className="flex space-x-4">
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.297 1.26.47 1.69.62.712.256 1.36.199 1.871.124.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-13.277c-1.302-1.306-3.02-2.071-4.89-2.073h-.002c-3.741 0-6.772 3.03-6.772 6.77 0 1.87 1.178 4.202 2.074 4.89l.002.001 3.155 1.869 1.867 3.156.001.002c.687.395 2.136.808 3.811.28.57-.18 1.727-.71 2.297-1.505.569-.794.57-1.606.57-1.61v-.002c0-3.74-3.031-6.771-6.771-6.771" />
                        </svg>
                     </a>
                     <a
                        href="#"
                        className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                        <svg
                           className="w-5 h-5 text-[#F6A623]"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                        </svg>
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Quick Links
                  </h3>
                  <ul className="space-y-3">
                     {["Home", "Events", "Sponsors", "Contact"].map((link) => (
                        <li key={link}>
                           <a
                              href="#"
                              className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                              {link}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Contact Info
                  </h3>
                  <div className="space-y-3">
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                        </svg>
                        <span className="text-gray-300">nwucsefest@gmail.com</span>
                     </div>
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <span className="text-gray-300">+880 1890-430560</span>
                     </div>
                     <div className="flex items-start space-x-3">
                        <svg
                           className="w-5 h-5 text-[#F6A623] mt-0.5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                        </svg>
                        <span className="text-gray-300">NWU Campus, Dhaka</span>
                     </div>
                  </div>
               </div>

               {/* Event Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                     Event Info
                  </h3>
                  <div className="space-y-4">
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Date:</div>
                        <div className="font-medium text-white">21-29 August</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Venue:</div>
                        <div className="font-medium text-white">NWU Campus</div>
                     </div>
                     <div className="border-l-4 border-[#F6A623] pl-4">
                        <div className="text-sm text-[#F6A623]">Duration:</div>
                        <div className="font-medium text-white">Full Day Event</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 pt-6 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-400 text-sm">
                  © 2025 NWU CSE FEST. All rights reserved.
               </p>
               <div className="flex space-x-6 mt-4 md:mt-0">
                  <a
                     href="#"
                     className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                     Privacy Policy
                  </a>
                  <a
                     href="#"
                     className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                     Terms of Service
                  </a>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <p className="text-gray-400 text-sm">Developed by AS</p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default ContactUs;
