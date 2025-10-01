import { useState } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const SimpleGoogleFormSubmit = ({ formUrl, fields, onClose }) => {
   const [formData, setFormData] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (entryId, value) => {
      setFormData((prev) => ({
         ...prev,
         [entryId]: value,
      }));
   };

   const handleCheckboxChange = (entryId, option, checked) => {
      setFormData((prev) => {
         const currentValues = prev[entryId] || [];
         const valuesArray = Array.isArray(currentValues)
            ? currentValues
            : [currentValues].filter(Boolean);

         if (checked) {
            return {
               ...prev,
               [entryId]: [...valuesArray, option],
            };
         } else {
            return {
               ...prev,
               [entryId]: valuesArray.filter((v) => v !== option),
            };
         }
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         // Validate required fields
         const missingFields = fields
            .filter((field) => {
               if (!field.required) return false;
               const value = formData[field.entryId];
               if (field.type === "checkbox") {
                  return !value || (Array.isArray(value) && value.length === 0);
               }
               return !value;
            })
            .map((field) => field.label);

         if (missingFields.length > 0) {
            toast.error(`Please fill in: ${missingFields.join(", ")}`);
            setIsSubmitting(false);
            return;
         }

         // Extract form ID from URL
         const extractFormId = (url) => {
            const match = url.match(/\/forms\/d\/e\/([^/]+)\/|\/forms\/d\/([^/]+)/);
            return match ? match[1] || match[2] : null;
         };

         const formId = extractFormId(formUrl);
         if (!formId) {
            toast.error("Invalid Google Form URL");
            setIsSubmitting(false);
            return;
         }

         // Build the form response URL - this is the key!
         const baseUrl = formUrl.includes("/d/e/")
            ? `https://docs.google.com/forms/d/e/${formId}/formResponse`
            : `https://docs.google.com/forms/d/${formId}/formResponse`;

         // Create URL-encoded form data
         const formBody = new URLSearchParams();
         Object.entries(formData).forEach(([entryId, value]) => {
            if (value) {
               // Handle arrays (for checkboxes) - submit each value separately
               if (Array.isArray(value)) {
                  value.forEach((v) => formBody.append(entryId, v));
               } else {
                  formBody.append(entryId, value);
               }
            }
         });

         console.log("Submitting to:", baseUrl);
         console.log("Form data:", Object.fromEntries(formBody));

         // Submit directly to Google Forms using no-cors mode
         await fetch(baseUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.toString(),
         });

         // no-cors mode always returns opaque response, so we assume success
         toast.success("Registration submitted successfully!");

         // Reset form
         setFormData({});

         // Close modal after a short delay
         setTimeout(() => {
            onClose();
         }, 1500);
      } catch (error) {
         console.error("Submission error:", error);
         toast.error("Failed to submit. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="space-y-6">
         <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
               <div key={field.id} className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                     {field.label}
                     {field.required && <span className="text-[#F6A623] ml-1">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                     <textarea
                        value={formData[field.entryId] || ""}
                        onChange={(e) => handleChange(field.entryId, e.target.value)}
                        required={field.required}
                        rows={4}
                        className="w-full bg-slate-800/50 border border-[#F6A623]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F6A623] focus:border-transparent placeholder-gray-500 transition-all duration-200"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                     />
                  ) : field.type === "dropdown" ? (
                     <select
                        value={formData[field.entryId] || ""}
                        onChange={(e) => handleChange(field.entryId, e.target.value)}
                        required={field.required}
                        className="w-full bg-slate-800/50 border border-[#F6A623]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F6A623] focus:border-transparent transition-all duration-200 cursor-pointer">
                        <option value="" className="bg-slate-800">
                           Select an option
                        </option>
                        {field.options?.map((option, idx) => (
                           <option key={idx} value={option} className="bg-slate-800">
                              {option}
                           </option>
                        ))}
                     </select>
                  ) : field.type === "radio" ? (
                     <div className="space-y-3 pl-1">
                        {field.options?.map((option, idx) => (
                           <label
                              key={idx}
                              className="flex items-center space-x-3 cursor-pointer group">
                              <input
                                 type="radio"
                                 name={field.entryId}
                                 value={option}
                                 checked={formData[field.entryId] === option}
                                 onChange={(e) =>
                                    handleChange(field.entryId, e.target.value)
                                 }
                                 required={field.required}
                                 className="w-4 h-4 text-[#F6A623] bg-slate-800 border-[#F6A623]/30 focus:ring-[#F6A623] focus:ring-offset-slate-900"
                              />
                              <span className="text-gray-300 group-hover:text-white transition-colors">
                                 {option}
                              </span>
                           </label>
                        ))}
                     </div>
                  ) : field.type === "checkbox" ? (
                     <div className="space-y-3 pl-1">
                        {field.options?.map((option, idx) => {
                           const currentValues = formData[field.entryId] || [];
                           const valuesArray = Array.isArray(currentValues)
                              ? currentValues
                              : [currentValues].filter(Boolean);
                           return (
                              <label
                                 key={idx}
                                 className="flex items-center space-x-3 cursor-pointer group">
                                 <input
                                    type="checkbox"
                                    value={option}
                                    checked={valuesArray.includes(option)}
                                    onChange={(e) =>
                                       handleCheckboxChange(
                                          field.entryId,
                                          option,
                                          e.target.checked
                                       )
                                    }
                                    className="w-4 h-4 text-[#F6A623] bg-slate-800 border-[#F6A623]/30 rounded focus:ring-[#F6A623] focus:ring-offset-slate-900"
                                 />
                                 <span className="text-gray-300 group-hover:text-white transition-colors">
                                    {option}
                                 </span>
                              </label>
                           );
                        })}
                     </div>
                  ) : field.type === "linear-scale" ? (
                     <div className="flex items-center justify-center space-x-4 py-2">
                        {field.options?.map((option, idx) => (
                           <label
                              key={idx}
                              className="flex flex-col items-center cursor-pointer group">
                              <input
                                 type="radio"
                                 name={field.entryId}
                                 value={option}
                                 checked={formData[field.entryId] === option}
                                 onChange={(e) =>
                                    handleChange(field.entryId, e.target.value)
                                 }
                                 required={field.required}
                                 className="w-4 h-4 text-[#F6A623] bg-slate-800 border-[#F6A623]/30 focus:ring-[#F6A623] focus:ring-offset-slate-900"
                              />
                              <span className="text-[#F6A623] text-sm font-medium mt-2 group-hover:scale-110 transition-transform">
                                 {option}
                              </span>
                           </label>
                        ))}
                     </div>
                  ) : (
                     <input
                        type={field.type}
                        value={formData[field.entryId] || ""}
                        onChange={(e) => handleChange(field.entryId, e.target.value)}
                        required={field.required}
                        className="w-full bg-slate-800/50 border border-[#F6A623]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F6A623] focus:border-transparent placeholder-gray-500 transition-all duration-200"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                     />
                  )}
               </div>
            ))}

            <div className="flex gap-4 pt-6 border-t border-[#F6A623]/20 mt-6">
               <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-[#F6A623]/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
               </button>
               <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#F6A623] to-orange-500 hover:from-[#e0951f] hover:to-[#d67a0d] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#F6A623]/20 hover:shadow-xl hover:shadow-[#F6A623]/30">
                  {isSubmitting ? (
                     <span className="flex items-center justify-center">
                        <svg
                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Submitting...
                     </span>
                  ) : (
                     "Submit Registration"
                  )}
               </button>
            </div>
         </form>
      </div>
   );
};

SimpleGoogleFormSubmit.propTypes = {
   formUrl: PropTypes.string.isRequired,
   fields: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         label: PropTypes.string.isRequired,
         entryId: PropTypes.string.isRequired,
         type: PropTypes.string.isRequired,
         required: PropTypes.bool,
         options: PropTypes.arrayOf(PropTypes.string),
      })
   ).isRequired,
   onClose: PropTypes.func.isRequired,
};

export default SimpleGoogleFormSubmit;
