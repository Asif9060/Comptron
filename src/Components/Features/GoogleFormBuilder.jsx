import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import axios from "axios";
import GoogleFormFieldEditor from "./GoogleFormFieldEditor";

const GoogleFormBuilder = ({
   onFormChange,
   initialForms = [],
   enabled = false,
   useGoogleForms = false,
}) => {
   const [forms, setForms] = useState(initialForms);
   const [isEnabled, setIsEnabled] = useState(enabled);
   const [useGoogle, setUseGoogle] = useState(useGoogleForms);

   useEffect(() => {
      onFormChange({
         enabled: isEnabled,
         useGoogleForms: useGoogle,
         googleForms: forms,
      });
   }, [forms, isEnabled, useGoogle, onFormChange]);

   const addForm = () => {
      setForms([
         ...forms,
         {
            title: "",
            formUrl: "",
            description: "",
            active: true,
            customFields: [],
         },
      ]);
   };

   const updateForm = (index, field, value) => {
      const updatedForms = [...forms];
      updatedForms[index] = { ...updatedForms[index], [field]: value };
      setForms(updatedForms);
   };

   const removeForm = (index) => {
      const updatedForms = forms.filter((_, i) => i !== index);
      setForms(updatedForms);
   };

   const validateFormUrl = (url) => {
      try {
         const formUrl = new URL(url);
         return (
            formUrl.hostname.includes("docs.google.com") &&
            (url.includes("/forms/") || url.includes("forms.gle"))
         );
      } catch {
         return false;
      }
   };

   const handleUrlBlur = async (index, url) => {
      if (url && !validateFormUrl(url)) {
         toast.error("Please enter a valid Google Forms URL");
         return;
      } else if (url) {
         try {
            // Extract Google Form ID from URL
            const extractFormId = (formUrl) => {
               const match = formUrl.match(
                  /\/forms\/d\/e\/([^/]+)\/|\/forms\/d\/([^/]+)/
               );
               return match ? match[1] || match[2] : null;
            };

            const formId = extractFormId(url);

            if (!formId) {
               toast.error("Could not extract form ID from URL");
               return;
            }

            // Show loading toast
            const loadingToast = toast.loading("Extracting form fields...");

            try {
               // Fetch form structure from our API
               const response = await axios.get(`/api/google-forms/structure/${formId}`);

               if (
                  response.data.success &&
                  response.data.fields &&
                  response.data.fields.length > 0
               ) {
                  // Update form with extracted fields
                  const updatedForms = [...forms];
                  updatedForms[index] = {
                     ...updatedForms[index],
                     customFields: response.data.fields.map((field) => ({
                        entryId: field.entryId,
                        label: field.label,
                        type: field.type || "text",
                        required: field.required || false,
                        options: field.options || [],
                     })),
                  };
                  setForms(updatedForms);

                  toast.success(
                     `Successfully extracted ${response.data.fields.length} form fields!`
                  );
               } else {
                  toast.error("Could not extract form fields. Please add them manually.");
               }
            } catch (error) {
               console.error("Error fetching form structure:", error);
               toast.error("Error extracting form fields. Please add them manually.");
            } finally {
               toast.dismiss(loadingToast);
            }

            // Convert viewform URLs to formResponse URLs if needed
            if (url.includes("viewform") && !url.includes("formResponse")) {
               const updatedUrl = url.replace("/viewform", "/formResponse");
               updateForm(index, "formUrl", updatedUrl);
            }
         } catch (error) {
            console.error("Error processing form URL:", error);
            toast.error("Error processing form URL");
         }
      }
   };

   return (
      <div className="space-y-6 p-4 border border-gray-300 rounded-lg bg-gray-800">
         <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2">
                  <label className="text-white">Enable Registration</label>
                  <input
                     type="checkbox"
                     checked={isEnabled}
                     onChange={(e) => setIsEnabled(e.target.checked)}
                     className="form-checkbox h-5 w-5 text-blue-500"
                  />
               </div>

               {isEnabled && (
                  <div className="flex items-center space-x-2">
                     <label className="text-white">Use Google Forms</label>
                     <input
                        type="checkbox"
                        checked={useGoogle}
                        onChange={(e) => setUseGoogle(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-500"
                     />
                  </div>
               )}
            </div>

            {isEnabled && useGoogle && (
               <button
                  onClick={addForm}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                  type="button">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-1"
                     viewBox="0 0 20 20"
                     fill="currentColor">
                     <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                     />
                  </svg>
                  Add Google Form
               </button>
            )}
         </div>

         {isEnabled && useGoogle && (
            <div className="space-y-4">
               {forms.length === 0 ? (
                  <div className="text-center py-8 text-gray-300">
                     <p>No Google Forms added yet.</p>
                     <p className="text-sm mt-2">
                        Click the &quot;Add Google Form&quot; button to add a form.
                     </p>
                  </div>
               ) : (
                  forms.map((form, index) => (
                     <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                           <h4 className="text-white font-medium">Form #{index + 1}</h4>
                           <button
                              onClick={() => removeForm(index)}
                              className="text-red-400 hover:text-red-500"
                              type="button">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                 />
                              </svg>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           <div>
                              <label className="block text-gray-300 text-sm font-medium mb-1">
                                 Title <span className="text-red-500">*</span>
                              </label>
                              <input
                                 type="text"
                                 value={form.title}
                                 onChange={(e) =>
                                    updateForm(index, "title", e.target.value)
                                 }
                                 className="w-full bg-gray-600 border border-gray-500 rounded py-2 px-3 text-white"
                                 placeholder="Enter form title"
                                 required
                              />
                           </div>

                           <div>
                              <label className="block text-gray-300 text-sm font-medium mb-1">
                                 Google Form URL <span className="text-red-500">*</span>
                              </label>
                              <input
                                 type="url"
                                 value={form.formUrl}
                                 onChange={(e) =>
                                    updateForm(index, "formUrl", e.target.value)
                                 }
                                 onBlur={(e) => handleUrlBlur(index, e.target.value)}
                                 className="w-full bg-gray-600 border border-gray-500 rounded py-2 px-3 text-white"
                                 placeholder="https://docs.google.com/forms/..."
                                 required
                              />
                              <p className="text-xs text-gray-400 mt-1">
                                 Use the shareable link from your Google Form
                              </p>
                           </div>

                           <div>
                              <label className="block text-gray-300 text-sm font-medium mb-1">
                                 Description (Optional)
                              </label>
                              <textarea
                                 value={form.description}
                                 onChange={(e) =>
                                    updateForm(index, "description", e.target.value)
                                 }
                                 className="w-full bg-gray-600 border border-gray-500 rounded py-2 px-3 text-white"
                                 placeholder="Enter a short description"
                                 rows="2"></textarea>
                           </div>

                           <div className="flex items-center space-x-2">
                              <input
                                 type="checkbox"
                                 checked={form.active}
                                 onChange={(e) =>
                                    updateForm(index, "active", e.target.checked)
                                 }
                                 className="form-checkbox h-5 w-5 text-blue-500"
                              />
                              <label className="text-gray-300 text-sm">Active</label>
                           </div>

                           <details className="bg-gray-600 p-4 rounded-lg mt-4">
                              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 font-medium">
                                 Custom Field Mapping (Advanced)
                              </summary>
                              <div className="mt-4">
                                 <GoogleFormFieldEditor
                                    form={form}
                                    onUpdate={(updatedForm) => {
                                       const newForms = [...forms];
                                       newForms[index] = updatedForm;
                                       setForms(newForms);
                                    }}
                                 />
                              </div>
                           </details>
                        </div>
                     </div>
                  ))
               )}
            </div>
         )}
      </div>
   );
};

GoogleFormBuilder.propTypes = {
   onFormChange: PropTypes.func.isRequired,
   initialForms: PropTypes.arrayOf(
      PropTypes.shape({
         title: PropTypes.string,
         formUrl: PropTypes.string,
         description: PropTypes.string,
         active: PropTypes.bool,
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
      })
   ),
   enabled: PropTypes.bool,
   useGoogleForms: PropTypes.bool,
};

GoogleFormBuilder.defaultProps = {
   initialForms: [],
   enabled: false,
   useGoogleForms: false,
};

export default GoogleFormBuilder;
