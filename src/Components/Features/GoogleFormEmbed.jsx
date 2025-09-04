import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import axios from "axios";

const GoogleFormEmbed = ({ form, onClose }) => {
   const [formFields, setFormFields] = useState([]);
   const [formData, setFormData] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formId, setFormId] = useState("");

   useEffect(() => {
      if (!form || !form.formUrl) return;

      const fetchFormStructure = async () => {
         try {
            setIsLoading(true);

            // Extract Google Form ID from URL
            const extractFormId = (url) => {
               const match = url.match(/\/forms\/d\/e\/([^/]+)\/|\/forms\/d\/([^/]+)/);
               return match ? match[1] || match[2] : null;
            };

            const id = extractFormId(form.formUrl);

            if (!id) {
               toast.error("Invalid Google Form URL");
               setIsLoading(false);
               return;
            }

            setFormId(id);

            // Convert viewform URL to formResponse URL for submission
            // (We don't need this anymore since we're using our backend proxy)

            // For custom field mapping provided in the admin panel
            if (form.customFields && form.customFields.length > 0) {
               setFormFields(
                  form.customFields.map((field) => ({
                     id: field.entryId,
                     label: field.label,
                     type: field.type || "text",
                     required: field.required || false,
                     options: field.options || [],
                  }))
               );
               setIsLoading(false);
               return;
            }

            // If we don't have custom fields, try to fetch form structure from our backend API
            try {
               const response = await axios.get(`/api/google-forms/structure/${id}`);

               if (response.data.success && response.data.fields) {
                  const parsedFields = response.data.fields.map((field) => ({
                     id: field.entryId,
                     label: field.label,
                     type: field.type || "text",
                     required: field.required || false,
                     options: field.options || [],
                  }));

                  setFormFields(parsedFields);
               } else {
                  throw new Error("Failed to parse form structure");
               }
            } catch (error) {
               console.error("Error fetching form structure:", error);

               // Fallback to default fields if parsing fails
               setFormFields([
                  {
                     id: "entry.123456789",
                     label: "Full Name",
                     type: "text",
                     required: true,
                  },
                  {
                     id: "entry.234567890",
                     label: "Email Address",
                     type: "email",
                     required: true,
                  },
                  {
                     id: "entry.345678901",
                     label: "Phone Number",
                     type: "tel",
                     required: false,
                  },
               ]);

               toast.error(
                  "Could not automatically parse form fields. Please add custom field mapping in the admin panel."
               );
            }

            setIsLoading(false);
         } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to load form structure");
            setIsLoading(false);
         }
      };

      fetchFormStructure();
   }, [form]);

   const handleInputChange = (id, value) => {
      setFormData((prev) => ({
         ...prev,
         [id]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         // Validate required fields
         const missingFields = formFields
            .filter((field) => field.required && !formData[field.id])
            .map((field) => field.label);

         if (missingFields.length > 0) {
            toast.error(
               `Please fill in the following required fields: ${missingFields.join(", ")}`
            );
            setIsSubmitting(false);
            return;
         }

         console.log("Submitting form data:", formData);
         console.log("Form fields:", formFields);

         // Submit the form through our backend proxy to avoid CORS issues
         const response = await axios.post("/api/google-forms/submit", {
            formId,
            formData,
         });

         if (response.data.success) {
            toast.success("Form submitted successfully!");
            setTimeout(() => {
               onClose();
            }, 1500);
         } else {
            throw new Error(response.data.message || "Form submission failed");
         }
      } catch (error) {
         console.error("Error submitting form:", error);
         toast.error("Failed to submit form. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   if (isLoading) {
      return (
         <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading form fields...</p>
         </div>
      );
   }

   return (
      <div className="w-full h-full flex flex-col bg-white">
         <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
               {form?.title || "Event Registration"}
            </h2>
            <button
               onClick={onClose}
               className="text-gray-300 hover:text-white transition-colors duration-200"
               aria-label="Close">
               <svg
                  className="h-6 w-6"
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

         {form?.description && (
            <div className="bg-gray-700 p-4 border-b border-gray-600">
               <p className="text-gray-200">{form.description}</p>
            </div>
         )}

         <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
            {formFields.length === 0 ? (
               <div className="text-center py-8">
                  <p className="text-gray-500">
                     No form fields available. Please update the form configuration in the
                     admin panel.
                  </p>
               </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                  {formFields.map((field) => (
                     <div key={field.id} className="form-group">
                        <label
                           htmlFor={field.id}
                           className="block text-sm font-medium text-gray-700 mb-1">
                           {field.label}{" "}
                           {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === "textarea" ? (
                           <textarea
                              id={field.id}
                              name={field.id}
                              value={formData[field.id] || ""}
                              onChange={(e) =>
                                 handleInputChange(field.id, e.target.value)
                              }
                              required={field.required}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                           />
                        ) : field.type === "select" ? (
                           <select
                              id={field.id}
                              name={field.id}
                              value={formData[field.id] || ""}
                              onChange={(e) =>
                                 handleInputChange(field.id, e.target.value)
                              }
                              required={field.required}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                              <option value="">-- Select --</option>
                              {field.options &&
                                 field.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                       {option}
                                    </option>
                                 ))}
                           </select>
                        ) : field.type === "checkbox" ? (
                           <div className="flex items-center">
                              <input
                                 type="checkbox"
                                 id={field.id}
                                 name={field.id}
                                 checked={formData[field.id] || false}
                                 onChange={(e) =>
                                    handleInputChange(field.id, e.target.checked)
                                 }
                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                 htmlFor={field.id}
                                 className="ml-2 block text-sm text-gray-700">
                                 {field.checkboxLabel || "Yes"}
                              </label>
                           </div>
                        ) : field.type === "radio" && field.options ? (
                           <div className="space-y-2">
                              {field.options.map((option, idx) => (
                                 <div key={idx} className="flex items-center">
                                    <input
                                       type="radio"
                                       id={`${field.id}_${idx}`}
                                       name={field.id}
                                       value={option}
                                       checked={formData[field.id] === option}
                                       onChange={(e) =>
                                          handleInputChange(field.id, e.target.value)
                                       }
                                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                       required={field.required && idx === 0}
                                    />
                                    <label
                                       htmlFor={`${field.id}_${idx}`}
                                       className="ml-2 block text-sm text-gray-700">
                                       {option}
                                    </label>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <input
                              type={field.type}
                              id={field.id}
                              name={field.id}
                              value={formData[field.id] || ""}
                              onChange={(e) =>
                                 handleInputChange(field.id, e.target.value)
                              }
                              required={field.required}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder={field.placeholder || ""}
                           />
                        )}

                        {field.helpText && (
                           <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                        )}
                     </div>
                  ))}

                  <div className="flex justify-end pt-4">
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center disabled:opacity-70">
                        {isSubmitting ? (
                           <>
                              <svg
                                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                           </>
                        ) : (
                           "Submit Registration"
                        )}
                     </button>
                  </div>
               </form>
            )}
         </div>
      </div>
   );
};

GoogleFormEmbed.propTypes = {
   form: PropTypes.shape({
      title: PropTypes.string.isRequired,
      formUrl: PropTypes.string.isRequired,
      description: PropTypes.string,
      customFields: PropTypes.arrayOf(
         PropTypes.shape({
            entryId: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string,
            required: PropTypes.bool,
            options: PropTypes.arrayOf(PropTypes.string),
            helpText: PropTypes.string,
            placeholder: PropTypes.string,
            checkboxLabel: PropTypes.string,
         })
      ),
   }),
   onClose: PropTypes.func.isRequired,
};

export default GoogleFormEmbed;
