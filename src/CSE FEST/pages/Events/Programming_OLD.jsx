import { useState, useEffect } from "react";
import Modal from "react-modal";
import GoogleFormEmbed from "../../../Components/Features/GoogleFormEmbed";

Modal.setAppElement("#root");

const REQUIRED_KEY_LABELS = {
   teamName: "Team Name",
   member1: "Captain/Member 1",
   member2: "Member 2",
   member3: "Member 3",
   university: "University/Institution",
   email: "Email",
   phone: "Phone",
};

// Lightweight label-based inference (client-side fallback)
const inferMappedKeyFromLabel = (label = "") => {
   const l = label.toLowerCase();
   if (l.includes("team name") || (l.includes("team") && !l.includes("member")))
      return "teamName";
   if (l.includes("captain") || l.includes("leader") || l.includes("member 1"))
      return "member1";
   if (l.includes("member 2") || (l.includes("member") && l.includes("2")))
      return "member2";
   if (l.includes("member 3") || (l.includes("member") && l.includes("3")))
      return "member3";
   if (
      l.includes("university") ||
      l.includes("institution") ||
      l.includes("college") ||
      l.includes("school")
   )
      return "university";
   if (l.includes("email") || l.includes("mail")) return "email";
   if (
      l.includes("phone") ||
      l.includes("contact") ||
      l.includes("mobile") ||
      l.includes("number")
   )
      return "phone";
   return null;
};

const Programming = () => {
   const [timeLeft, setTimeLeft] = useState({
      days: 15,
      hours: 8,
      minutes: 42,
      seconds: 30,
   });
   const [registrationOpen] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedForm, setSelectedForm] = useState(null);
   const [registrationForm, setRegistrationForm] = useState(null);

   // Load Google Form configuration
   useEffect(() => {
      const loadGoogleFormConfig = async () => {
         try {
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/csefest/programming/google-form-config"
            );
            if (response.ok) {
               const config = await response.json();
               // setGoogleFormConfig(config);

               // Load Google Forms fields that are marked to show in registration
               if (
                  config.enabled &&
                  config.useGoogleForms &&
                  Array.isArray(config.googleForms) &&
                  config.googleForms.length > 0
               ) {
                  const mappedFields = [];
                  const seenMappedKeys = new Set();
                  const requiredKeys = new Set();

                  config.googleForms
                     .filter((f) => f && f.active !== false)
                     .forEach((form) => {
                        if (!Array.isArray(form.customFields)) return;

                        form.customFields.forEach((field) => {
                           if (!field || !field.entryId) return;

                           const canonicalKey =
                              field.mappedKey && field.mappedKey !== "custom"
                                 ? field.mappedKey
                                 : inferMappedKeyFromLabel(field.label) || null;
                           const shouldInclude =
                              field.showInRegistration === true ||
                              (canonicalKey &&
                                 REQUIRED_FIELD_KEYS.includes(canonicalKey));
                           if (canonicalKey && seenMappedKeys.has(canonicalKey)) return;
                           if (!shouldInclude) return;

                           const normalizedField = {
                              ...field,
                              mappedKey: canonicalKey || "custom",
                              value: "",
                              required: field.required === true,
                           };

                           mappedFields.push(normalizedField);
                           if (canonicalKey) {
                              seenMappedKeys.add(canonicalKey);
                              if (normalizedField.required)
                                 requiredKeys.add(canonicalKey);
                           }
                        });
                     });

                  setDynamicFormFields(mappedFields);
                  const missingKeys = REQUIRED_FIELD_KEYS.filter(
                     (key) => !seenMappedKeys.has(key)
                  );
                  setMissingMappedKeys(missingKeys);
                  setRequiredMappedKeys(Array.from(requiredKeys));
               } else {
                  setDynamicFormFields([]);
                  setMissingMappedKeys([]);
                  setRequiredMappedKeys([]);
               }
            }
         } catch (error) {
            console.error("Error loading Google Form config:", error);
            // Clear dynamic fields on error
            setDynamicFormFields([]);
            setMissingMappedKeys([]);
            setRequiredMappedKeys([]);
         }
      };

      loadGoogleFormConfig();
   }, []);

   // Countdown timer effect
   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft((prev) => {
            if (prev.seconds > 0) {
               return { ...prev, seconds: prev.seconds - 1 };
            } else if (prev.minutes > 0) {
               return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            } else if (prev.hours > 0) {
               return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            } else if (prev.days > 0) {
               return {
                  ...prev,
                  days: prev.days - 1,
                  hours: 23,
                  minutes: 59,
                  seconds: 59,
               };
            }
            return prev;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   const handleDynamicFieldChange = (fieldId, value) => {
      setDynamicFormFields((prev) =>
         prev.map((field) => (field.entryId === fieldId ? { ...field, value } : field))
      );
   };

   const validateForm = () => {
      const errors = {};

      // Validate Google Forms fields
      dynamicFormFields.forEach((field) => {
         const rawValue = field.value ?? "";
         const normalizedValue =
            typeof rawValue === "string" ? rawValue.trim() : String(rawValue);

         if (field.required && !normalizedValue) {
            errors[field.entryId] = `${field.label} is required`;
         }

         // Email validation for email fields
         if (field.type === "email" && normalizedValue) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(normalizedValue)) {
               errors[field.entryId] = "Please enter a valid email address";
            }
         }

         // Phone validation for tel fields
         if (field.type === "tel" && normalizedValue) {
            const phoneRegex = /^(\+8801|8801|01)[3-9]\d{8}$/;
            if (!phoneRegex.test(normalizedValue.replace(/\s|-/g, ""))) {
               errors[field.entryId] = "Please enter a valid Bangladeshi phone number";
            }
         }
      });

      return errors;
   };

   const handleRegistration = async (e) => {
      e.preventDefault();

      const trulyMissingRequired = requiredMappedKeys.filter((k) =>
         missingMappedKeys.includes(k)
      );
      if (trulyMissingRequired.length > 0) {
         setSubmitStatus("error");
         const missingLabels = trulyMissingRequired.map(
            (key) => REQUIRED_KEY_LABELS[key] || key
         );
         alert(
            `Registration form is missing required fields: ${missingLabels.join(
               ", "
            )}. Please contact the organizers to update the form mapping before trying again.`
         );
         return;
      }

      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
         // Show first validation error
         const firstError = Object.values(validationErrors)[0];
         setSubmitStatus("error");
         alert(firstError); // You can replace this with a better notification system
         return;
      }

      const mappedValues = dynamicFormFields.reduce((acc, field) => {
         if (field.mappedKey && field.mappedKey !== "custom") {
            const rawValue = field.value ?? "";
            const normalizedValue =
               typeof rawValue === "string" ? rawValue.trim() : rawValue;
            acc[field.mappedKey] = normalizedValue;
         }
         return acc;
      }, {});

      const keysToEnforce = effectiveRequired;
      const missingRequiredValues = keysToEnforce.filter((key) => {
         const value = mappedValues[key];
         if (typeof value === "string") {
            return value.trim() === "";
         }
         return value === undefined || value === null || value === "";
      });

      if (missingRequiredValues.length > 0) {
         setSubmitStatus("error");
         const missingLabels = missingRequiredValues.map(
            (key) => REQUIRED_KEY_LABELS[key] || key
         );
         alert(
            `Please provide values for the following required fields: ${missingLabels.join(
               ", "
            )}.`
         );
         return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
         // Prepare submission data from Google Forms fields only
         const dynamicFieldPayload = dynamicFormFields.reduce((acc, field) => {
            const rawValue = field.value ?? "";
            acc[field.entryId] =
               typeof rawValue === "string" ? rawValue.trim() : rawValue;
            return acc;
         }, {});

         const submissionData = {
            dynamicFields: dynamicFieldPayload,
            mappedValues,
         };

         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/csefest/programming/register",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(submissionData),
            }
         );

         const result = await response.json();

         if (response.ok) {
            setSubmitStatus("success");
            // Reset dynamic fields
            setDynamicFormFields((prev) =>
               prev.map((field) => ({ ...field, value: "" }))
            );
            // Close modal after 2 seconds
            setTimeout(() => {
               setShowRegistrationForm(false);
               setSubmitStatus(null);
            }, 2000);
         } else {
            setSubmitStatus("error");
            console.error("Registration error:", result);
            console.log("Debug info:", {
               submissionData,
               dynamicFields: dynamicFormFields,
               serverResponse: result,
            });
            // Show detailed error to user temporarily for debugging
            alert(
               `Registration failed: ${result.message}\n\nDebug info:\nReceived fields: ${
                  result.receivedFields?.join(", ") || "None"
               }\nMissing: ${result.missingFields?.join(", ") || "Unknown"}`
            );
         }
      } catch (error) {
         setSubmitStatus("error");
         console.error("Network error:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-[#1c1535] text-white overflow-x-hidden">
         {/* Navbar */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1535]/95 backdrop-blur-xl border-b border-[#F6A623]/20 shadow-lg">
            <div className="mx-auto px-6 py-4">
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                           className="w-5 h-5 text-[#1c1535] font-bold"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        </svg>
                     </div>
                     <div>
                        <div className="text-xl font-bold text-[#F6A623]">CSE FEST</div>
                        <div className="text-xs text-gray-400">Programming Contest</div>
                     </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="hidden md:flex items-center space-x-8">
                     <a
                        href="/CseFest"
                        className="text-gray-300 hover:text-[#F6A623] font-medium transition-colors duration-300 relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-orange-500 group-hover:w-full transition-all duration-300"></span>
                     </a>
                     <a
                        href="/FestEvents"
                        className="text-gray-300 hover:text-[#F6A623] font-medium transition-colors duration-300 relative group">
                        Events
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-orange-500 group-hover:w-full transition-all duration-300"></span>
                     </a>
                     <a
                        href="/CseFest/programming"
                        className="text-[#F6A623] font-medium relative">
                        Programming
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#F6A623] to-orange-500"></span>
                     </a>
                     <a
                        href="/CseFest/about"
                        className="text-gray-300 hover:text-[#F6A623] font-medium transition-colors duration-300 relative group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F6A623] to-orange-500 group-hover:w-full transition-all duration-300"></span>
                     </a>
                  </div>

                  {/* Mobile Menu Button */}
                  <button className="md:hidden text-white">
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </nav>

         {/* Header */}
         <header className="relative bg-gradient-to-r from-[#1c1535] via-black/95 to-[#1c1535] backdrop-blur-xl border-b border-[#F6A623]/30 pt-20">
            <div className="container mx-auto px-6 py-12">
               <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                     <div className="w-16 h-16 translate-y-[-2rem] bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg
                           className="w-8 h-8 text-[#1c1535] font-bold"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                           <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        </svg>
                     </div>
                     <div>
                        <h1 className="text-5xl cnt font-black bg-gradient-to-r from-white via-[#F6A623] to-orange-400 bg-clip-text text-transparent tracking-wide">
                           CSE FEST PROGRAMMING CONTEST
                        </h1>
                        <p className="text-xl text-[#F6A623]/80 font-semibold tracking-wider mt-2">
                           International Collegiate Programming Contest Style
                        </p>
                     </div>
                  </div>

                  <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                     Join the ultimate programming challenge inspired by ICPC format.
                     Teams of 3 students compete to solve algorithmic problems in a
                     time-limited environment.
                  </p>

                  {/* Download Rules Button */}
                  <div className="mb-8">
                     <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-[#F6A623]/50 transition-all duration-300 flex items-center gap-2 mx-auto">
                        <svg
                           className="w-5 h-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                           />
                        </svg>
                        Download Contest Rules
                     </button>
                  </div>

                  {/* Contest Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                     <div className="bg-gradient-to-br from-[#1c1535]/60 to-black/60 backdrop-blur-sm rounded-xl p-4 border border-[#F6A623]/20">
                        <div className="text-2xl mb-2">⏱️</div>
                        <div className="text-2xl font-bold text-[#F6A623]">5 Hours</div>
                        <div className="text-gray-400 text-sm">Contest Duration</div>
                     </div>
                     <div className="bg-gradient-to-br from-[#1c1535]/60 to-black/60 backdrop-blur-sm rounded-xl p-4 border border-[#F6A623]/20">
                        <div className="text-2xl mb-2">🧩</div>
                        <div className="text-2xl font-bold text-[#F6A623]">12</div>
                        <div className="text-gray-400 text-sm">Problems</div>
                     </div>
                     <div className="bg-gradient-to-br from-[#1c1535]/60 to-black/60 backdrop-blur-sm rounded-xl p-4 border border-[#F6A623]/20">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="text-2xl font-bold text-[#F6A623]">3</div>
                        <div className="text-gray-400 text-sm">Members per Team</div>
                     </div>
                     <div className="bg-gradient-to-br from-[#1c1535]/60 to-black/60 backdrop-blur-sm rounded-xl p-4 border border-[#F6A623]/20">
                        <div className="text-2xl mb-2">🏆</div>
                        <div className="text-2xl font-bold text-[#F6A623]">250K</div>
                        <div className="text-gray-400 text-sm">Prize Pool (BDT)</div>
                     </div>
                  </div>

                  {/* Countdown Timer */}
                  {registrationOpen && (
                     <div className="bg-gradient-to-r from-[#1c1535]/90 to-black/90 backdrop-blur-sm rounded-2xl p-6 border border-[#F6A623]/30 shadow-2xl mb-8 max-w-lg mx-auto">
                        <h3 className="text-center text-[#F6A623] font-semibold mb-4">
                           Registration Closes In
                        </h3>
                        <div className="flex justify-center space-x-4">
                           {Object.entries(timeLeft).map(([unit, value]) => (
                              <div key={unit} className="text-center">
                                 <div className="bg-gradient-to-br from-[#F6A623] to-orange-500 text-[#1c1535] rounded-xl p-3 min-w-[70px] shadow-lg">
                                    <div className="text-xl font-bold">
                                       {value.toString().padStart(2, "0")}
                                    </div>
                                 </div>
                                 <div className="text-gray-400 text-sm mt-2 capitalize">
                                    {unit}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </header>

         {/* Contest Details */}
         <section className="py-16">
            <div className="mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Contest Information */}
                  <div>
                     <h2 className="text-3xl font-bold text-[#F6A623] mb-6">
                        Contest Format
                     </h2>
                     <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <span className="w-8 h-8 bg-[#F6A623]/20 rounded-lg flex items-center justify-center mr-3">
                                 📝
                              </span>
                              Problem Categories
                           </h3>
                           <ul className="text-gray-300 space-y-2">
                              <li>• Data Structures & Algorithms</li>
                              <li>• Dynamic Programming</li>
                              <li>• Graph Theory</li>
                              <li>• Number Theory</li>
                              <li>• Computational Geometry</li>
                           </ul>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <span className="w-8 h-8 bg-[#F6A623]/20 rounded-lg flex items-center justify-center mr-3">
                                 💻
                              </span>
                              Allowed Languages
                           </h3>
                           <div className="flex flex-wrap gap-2">
                              {["C++", "Java", "Python", "C"].map((lang) => (
                                 <span
                                    key={lang}
                                    className="bg-[#F6A623]/20 text-[#F6A623] px-3 py-1 rounded-full text-sm font-medium">
                                    {lang}
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <span className="w-8 h-8 bg-[#F6A623]/20 rounded-lg flex items-center justify-center mr-3">
                                 🎯
                              </span>
                              Scoring System
                           </h3>
                           <p className="text-gray-300">
                              ICPC-style scoring: Teams ranked by number of problems
                              solved, with penalty time as tiebreaker. +20 minutes penalty
                              for each wrong submission.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Schedule & Prizes */}
                  <div>
                     <h2 className="text-3xl font-bold text-[#F6A623] mb-6">
                        Schedule & Prizes
                     </h2>
                     <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-6">
                           <h3 className="text-xl font-semibold text-white mb-4">
                              Contest Day Schedule
                           </h3>
                           <div className="space-y-3">
                              {[
                                 { time: "08:00 AM", event: "Registration & Check-in" },
                                 { time: "09:00 AM", event: "Opening Ceremony" },
                                 { time: "09:30 AM", event: "Practice Session (30 min)" },
                                 { time: "10:00 AM", event: "Contest Begins" },
                                 { time: "03:00 PM", event: "Contest Ends" },
                                 { time: "04:00 PM", event: "Award Ceremony" },
                              ].map((item, index) => (
                                 <div key={index} className="flex items-center space-x-4">
                                    <div className="w-20 text-sm text-[#F6A623] font-mono font-semibold">
                                       {item.time}
                                    </div>
                                    <div className="flex-1 text-gray-300">
                                       {item.event}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-xl p-6">
                           <h3 className="text-xl font-semibold text-white mb-4">
                              Prize Distribution
                           </h3>
                           <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                 <span className="text-yellow-400 font-semibold">
                                    🥇 1st Place
                                 </span>
                                 <span className="text-[#F6A623] font-bold">
                                    BDT 100,000
                                 </span>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-gray-400 font-semibold">
                                    🥈 2nd Place
                                 </span>
                                 <span className="text-[#F6A623] font-bold">
                                    BDT 75,000
                                 </span>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-amber-600 font-semibold">
                                    🥉 3rd Place
                                 </span>
                                 <span className="text-[#F6A623] font-bold">
                                    BDT 50,000
                                 </span>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-gray-300">4th - 10th Place</span>
                                 <span className="text-[#F6A623] font-bold">
                                    BDT 25,000
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Registration Section */}
         <section className="py-16 bg-gradient-to-br from-slate-900/30 to-transparent">
            <div className="mx-auto px-6">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#F6A623] mb-4">
                     Team Registration
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                     Register your team of 3 members for the programming contest
                  </p>
               </div>

               {!showRegistrationForm ? (
                  <div className="max-w-md mx-auto text-center">
                     {registrationOpen ? (
                        <button
                           onClick={() => setShowRegistrationForm(true)}
                           className="w-full bg-gradient-to-r from-[#F6A623] to-orange-500 hover:from-[#e0951f] hover:to-[#d67a0d] text-[#1c1535] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F6A623]/30 relative overflow-hidden group">
                           <span className="relative z-10 flex items-center justify-center space-x-2">
                              <svg
                                 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                 <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                              </svg>
                              <span>Register Your Team</span>
                           </span>
                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                     ) : (
                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
                           <h3 className="text-red-400 font-semibold mb-2">
                              Registration Closed
                           </h3>
                           <p className="text-gray-300">
                              Registration period has ended. Stay tuned for next contest!
                           </p>
                        </div>
                     )}
                  </div>
               ) : (
                  <div className="max-w-2xl mx-auto">
                     {/* Modal Backdrop */}
                     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-[#F6A623]/20 rounded-2xl p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                           {/* Modal Header */}
                           <div className="flex justify-between items-center mb-6">
                              <h3 className="text-2xl font-bold text-[#F6A623]">
                                 Team Registration
                              </h3>
                              <button
                                 onClick={() => setShowRegistrationForm(false)}
                                 className="text-gray-400 hover:text-white transition-colors duration-200"
                                 disabled={isSubmitting}>
                                 <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M6 18L18 6M6 6l12 12"
                                    />
                                 </svg>
                              </button>
                           </div>

                           {/* Success Message */}
                           {submitStatus === "success" && (
                              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                                 <div className="flex items-center space-x-3">
                                    <svg
                                       className="w-6 h-6 text-green-400"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24">
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                       />
                                    </svg>
                                    <div>
                                       <h4 className="text-green-400 font-semibold">
                                          Registration Successful!
                                       </h4>
                                       <p className="text-green-300 text-sm">
                                          Your team has been registered for the
                                          programming contest.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Error Message */}
                           {submitStatus === "error" && (
                              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                                 <div className="flex items-center space-x-3">
                                    <svg
                                       className="w-6 h-6 text-red-400"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24">
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                       />
                                    </svg>
                                    <div>
                                       <h4 className="text-red-400 font-semibold">
                                          Registration Failed
                                       </h4>
                                       <p className="text-red-300 text-sm">
                                          Please check your information and try again.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           )}

                           <form onSubmit={handleRegistration}>
                              {/* Google Form Fields */}
                              {dynamicFormFields.length > 0 ? (
                                 <div>
                                    <h4 className="text-[#F6A623] font-semibold mb-6">
                                       Registration Information
                                    </h4>
                                    {trulyMissingRequired.length > 0 && (
                                       <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-200">
                                          <p className="font-semibold mb-1">
                                             Form mapping incomplete
                                          </p>
                                          <p>
                                             The registration form is missing required
                                             fields:{" "}
                                             {trulyMissingRequired
                                                .map(
                                                   (key) =>
                                                      REQUIRED_KEY_LABELS[key] || key
                                                )
                                                .join(", ")}
                                             . Please contact the organizers to update the
                                             form before submitting.
                                          </p>
                                       </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                       {dynamicFormFields.map((field) => (
                                          <div
                                             key={field.entryId}
                                             className={
                                                field.type === "paragraph" ||
                                                field.type === "textarea"
                                                   ? "md:col-span-2"
                                                   : ""
                                             }>
                                             <label className="block text-[#F6A623] font-semibold mb-2">
                                                {field.label}{" "}
                                                {field.required && (
                                                   <span className="text-red-400">*</span>
                                                )}
                                             </label>
                                             {field.type === "select" ? (
                                                <select
                                                   value={field.value}
                                                   onChange={(e) =>
                                                      handleDynamicFieldChange(
                                                         field.entryId,
                                                         e.target.value
                                                      )
                                                   }
                                                   required={field.required}
                                                   disabled={isSubmitting}
                                                   className="w-full bg-[#1c1535]/80 border border-[#F6A623]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                                                   <option value="">
                                                      Select an option...
                                                   </option>
                                                   {field.options?.map((option, idx) => (
                                                      <option key={idx} value={option}>
                                                         {option}
                                                      </option>
                                                   ))}
                                                </select>
                                             ) : field.type === "paragraph" ||
                                               field.type === "textarea" ? (
                                                <textarea
                                                   value={field.value}
                                                   onChange={(e) =>
                                                      handleDynamicFieldChange(
                                                         field.entryId,
                                                         e.target.value
                                                      )
                                                   }
                                                   required={field.required}
                                                   disabled={isSubmitting}
                                                   rows={4}
                                                   className="w-full bg-[#1c1535]/80 border border-[#F6A623]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                   placeholder={
                                                      field.placeholder ||
                                                      `Enter ${field.label.toLowerCase()}...`
                                                   }
                                                />
                                             ) : (
                                                <input
                                                   type={
                                                      field.type === "email"
                                                         ? "email"
                                                         : field.type === "tel"
                                                         ? "tel"
                                                         : field.type === "number"
                                                         ? "number"
                                                         : field.type === "date"
                                                         ? "date"
                                                         : field.type === "time"
                                                         ? "time"
                                                         : "text"
                                                   }
                                                   value={field.value}
                                                   onChange={(e) =>
                                                      handleDynamicFieldChange(
                                                         field.entryId,
                                                         e.target.value
                                                      )
                                                   }
                                                   required={field.required}
                                                   disabled={isSubmitting}
                                                   className="w-full bg-[#1c1535]/80 border border-[#F6A623]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F6A623]/50 focus:border-[#F6A623] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                   placeholder={
                                                      field.placeholder ||
                                                      `Enter ${field.label.toLowerCase()}...`
                                                   }
                                                />
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              ) : (
                                 <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                       Registration Form Not Configured
                                    </h3>
                                    <p className="text-gray-400">
                                       Please contact the admin to configure the
                                       registration form with Google Forms.
                                    </p>
                                 </div>
                              )}

                              <div className="flex space-x-4 mt-8">
                                 <button
                                    type="button"
                                    onClick={() => setShowRegistrationForm(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 border-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Cancel
                                 </button>
                                 <button
                                    type="submit"
                                    disabled={
                                       isSubmitting ||
                                       submitStatus === "success" ||
                                       trulyMissingRequired.length > 0
                                    }
                                    className="flex-1 bg-gradient-to-r from-[#F6A623] to-orange-500 hover:from-[#e0951f] hover:to-[#d67a0d] text-[#1c1535] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2">
                                    {isSubmitting ? (
                                       <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1c1535]"></div>
                                          <span>Submitting...</span>
                                       </>
                                    ) : submitStatus === "success" ? (
                                       <>
                                          <svg
                                             className="w-4 h-4"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24">
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                             />
                                          </svg>
                                          <span>Registered!</span>
                                       </>
                                    ) : (
                                       <span>Submit Registration</span>
                                    )}
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </section>

         {/* Rules Section */}
         <section className="py-16">
            <div className="mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-[#F6A623] mb-8 text-center">
                     Contest Rules
                  </h2>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-[#F6A623]/20 rounded-2xl p-8 shadow-2xl">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <h3 className="text-xl font-semibold text-white mb-4">
                              Team Requirements
                           </h3>
                           <ul className="text-gray-300 space-y-2">
                              <li>• Teams must consist of exactly 3 members</li>
                              <li>• All members must be current students</li>
                              <li>• One computer per team allowed</li>
                              <li>• Team captain serves as primary contact</li>
                           </ul>
                        </div>
                        <div>
                           <h3 className="text-xl font-semibold text-white mb-4">
                              Contest Guidelines
                           </h3>
                           <ul className="text-gray-300 space-y-2">
                              <li>• No internet access during contest</li>
                              <li>• Reference materials allowed (books, notes)</li>
                              <li>• No communication between teams</li>
                              <li>• Judge&apos;s decision is final</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
            <div className="mx-auto px-6 py-12">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Logo and Description */}
                  <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F6A623] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                           <svg
                              className="w-6 h-6 text-[#1c1535] font-bold"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                           </svg>
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-[#F6A623]">
                              CSE FEST
                           </div>
                           <div className="text-sm text-[#F6A623]/70">
                              Programming Contest 2025
                           </div>
                        </div>
                     </div>
                     <p className="text-gray-300 leading-relaxed">
                        The ultimate programming experience. Join the most challenging
                        contest, compete with the best programmers, and win amazing
                        prizes.
                     </p>
                     <div className="flex space-x-4">
                        {["facebook", "twitter", "instagram", "github"].map((social) => (
                           <a
                              key={social}
                              href="#"
                              className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                              <svg
                                 className="w-5 h-5 text-[#F6A623]"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                 {social === "facebook" && (
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                 )}
                                 {social === "twitter" && (
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                 )}
                                 {social === "instagram" && (
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                 )}
                                 {social === "github" && (
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                 )}
                              </svg>
                           </a>
                        ))}
                     </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Quick Links
                     </h3>
                     <ul className="space-y-3">
                        {["Home", "Events", "Programming", "Results", "Contact"].map(
                           (link) => (
                              <li key={link}>
                                 <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                                    {link}
                                 </a>
                              </li>
                           )
                        )}
                     </ul>
                  </div>

                  {/* Contest Info */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">
                        Contest Info
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
                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 5 Hours Duration
                              </div>
                              <div className="text-gray-400 text-sm">Contest Time</div>
                           </div>
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
                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 3 Members per Team
                              </div>
                              <div className="text-gray-400 text-sm">Team Size</div>
                           </div>
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
                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                           </svg>
                           <div>
                              <div className="text-white font-medium">
                                 BDT 250K Prize Pool
                              </div>
                              <div className="text-gray-400 text-sm">Total Rewards</div>
                           </div>
                        </div>
                     </div>
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
                           <span className="text-gray-300">programming@csefest.com</span>
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
               </div>

               {/* Bottom Section */}
               <div className="mt-12 pt-8 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">
                     © 2025 CSE FEST Programming Contest. All rights reserved.
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
                     <a
                        href="#"
                        className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
                        Rules & Regulations
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Programming;
