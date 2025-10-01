import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

const GoogleFormFieldEditor = ({ form, onUpdate }) => {
   const [fields, setFields] = useState(() =>
      (form.customFields || []).map((field) => ({
         entryId: field.entryId || "",
         label: field.label || "",
         type: field.type || "text",
         required: field.required || false,
         showInRegistration: field.showInRegistration ?? true,
         mappedKey: field.mappedKey || "custom",
         options: field.options || [],
         helpText: field.helpText || "",
         placeholder: field.placeholder || "",
         checkboxLabel: field.checkboxLabel || "",
      }))
   );
   const [newField, setNewField] = useState({
      entryId: "",
      label: "",
      type: "text",
      required: false,
      showInRegistration: true,
      mappedKey: "custom",
      options: [],
      helpText: "",
      placeholder: "",
      checkboxLabel: "",
   });
   const [showNewFieldForm, setShowNewFieldForm] = useState(false);
   const [optionInput, setOptionInput] = useState("");
   const [editingIndex, setEditingIndex] = useState(-1);

   const fieldTypes = [
      { value: "text", label: "Text Input" },
      { value: "email", label: "Email" },
      { value: "tel", label: "Phone Number" },
      { value: "number", label: "Number" },
      { value: "select", label: "Dropdown" },
      { value: "radio", label: "Radio Buttons" },
      { value: "checkbox", label: "Checkbox" },
      { value: "textarea", label: "Text Area" },
      { value: "date", label: "Date" },
      { value: "time", label: "Time" },
   ];

   const standardFieldOptions = [
      { value: "custom", label: "-- Keep as additional field --" },
      { value: "teamName", label: "Team Name" },
      { value: "member1", label: "Team Captain / Member 1" },
      { value: "member2", label: "Member 2" },
      { value: "member3", label: "Member 3" },
      { value: "university", label: "University / Institution" },
      { value: "email", label: "Email Address" },
      { value: "phone", label: "Phone Number" },
   ];

   const handleAddOption = () => {
      if (!optionInput.trim()) return;

      if (editingIndex >= 0) {
         // Editing an existing field
         setFields((prev) => {
            const updatedFields = [...prev];
            if (!updatedFields[editingIndex].options) {
               updatedFields[editingIndex].options = [];
            }
            updatedFields[editingIndex].options.push(optionInput.trim());
            return updatedFields;
         });
      } else {
         // Adding a new field
         setNewField((prev) => ({
            ...prev,
            options: [...(prev.options || []), optionInput.trim()],
         }));
      }
      setOptionInput("");
   };

   const handleRemoveOption = (index, isNewField = true) => {
      if (isNewField) {
         // Removing from new field form
         setNewField((prev) => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index),
         }));
      } else {
         // Removing from an existing field
         setFields((prev) => {
            const updatedFields = [...prev];
            updatedFields[editingIndex].options = updatedFields[
               editingIndex
            ].options.filter((_, i) => i !== index);
            return updatedFields;
         });
      }
   };

   const handleSaveField = () => {
      // Validation
      if (!newField.entryId.trim() || !newField.label.trim()) {
         toast.error("Entry ID and Label are required");
         return;
      }

      if (
         (newField.type === "select" || newField.type === "radio") &&
         (!newField.options || newField.options.length === 0)
      ) {
         toast.error("Options are required for dropdown and radio fields");
         return;
      }

      if (editingIndex >= 0) {
         // Update existing field
         setFields((prev) => {
            const updated = [...prev];
            updated[editingIndex] = { ...newField };
            return updated;
         });
         setEditingIndex(-1);
      } else {
         // Add new field
         setFields((prev) => [...prev, { ...newField }]);
      }

      // Reset form
      setNewField({
         entryId: "",
         label: "",
         type: "text",
         required: false,
         showInRegistration: true,
         mappedKey: "custom",
         options: [],
         helpText: "",
         placeholder: "",
         checkboxLabel: "",
      });
      setShowNewFieldForm(false);
      toast.success(`Field ${editingIndex >= 0 ? "updated" : "added"} successfully`);
   };

   const handleEditField = (index) => {
      setEditingIndex(index);
      const field = fields[index] || {};
      setNewField({
         entryId: field.entryId || "",
         label: field.label || "",
         type: field.type || "text",
         required: field.required || false,
         showInRegistration: field.showInRegistration ?? true,
         mappedKey: field.mappedKey || "custom",
         options: field.options || [],
         helpText: field.helpText || "",
         placeholder: field.placeholder || "",
         checkboxLabel: field.checkboxLabel || "",
      });
      setShowNewFieldForm(true);
   };

   const handleRemoveField = (index) => {
      setFields((prev) => prev.filter((_, i) => i !== index));
      toast.success("Field removed successfully");
   };

   const handleSaveAllFields = () => {
      const updatedForm = {
         ...form,
         customFields: fields,
      };
      onUpdate(updatedForm);
      toast.success("Custom fields saved successfully");
   };

   const handleCancel = () => {
      setNewField({
         entryId: "",
         label: "",
         type: "text",
         required: false,
         showInRegistration: true,
         mappedKey: "custom",
         options: [],
         helpText: "",
         placeholder: "",
         checkboxLabel: "",
      });
      setShowNewFieldForm(false);
      setEditingIndex(-1);
   };

   return (
      <div className="bg-white rounded-md shadow-sm p-4 mt-4 space-y-4">
         <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Form Fields</h3>

         {/* Field List */}
         {fields.length > 0 ? (
            <div className="space-y-3 mb-4">
               <h4 className="text-md font-medium">Current Fields:</h4>
               {fields.map((field, index) => (
                  <div
                     key={index}
                     className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                     <div>
                        <p className="font-medium text-black">
                           {field.label}{" "}
                           {field.required && <span className="text-red-500">*</span>}
                        </p>
                        <p className="text-sm text-gray-500">
                           ID: {field.entryId} | Type: {field.type}
                        </p>
                        <p className="text-xs text-gray-500">
                           Mapped as:{" "}
                           {standardFieldOptions.find(
                              (opt) => opt.value === (field.mappedKey || "custom")
                           )?.label || "Custom/Additional"}
                        </p>
                        <p className="text-xs text-gray-500">
                           Visible in Registration:{" "}
                           {field.showInRegistration ? "Yes" : "No"}
                        </p>
                        {(field.type === "select" || field.type === "radio") &&
                           field.options?.length > 0 && (
                              <p className="text-xs text-gray-400">
                                 Options: {field.options.join(", ")}
                              </p>
                           )}
                     </div>
                     <div className="flex space-x-2">
                        <button
                           onClick={() => handleEditField(index)}
                           className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition">
                           Edit
                        </button>
                        <button
                           onClick={() => handleRemoveField(index)}
                           className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition">
                           Remove
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="py-3 text-center text-gray-500 italic border border-dashed border-gray-300 rounded-md">
               No custom fields defined yet. Add fields to customize the form.
            </div>
         )}

         {/* Add New Field Button */}
         {!showNewFieldForm ? (
            <button
               onClick={() => setShowNewFieldForm(true)}
               className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md flex items-center justify-center transition">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
               </svg>
               Add New Field
            </button>
         ) : (
            // New Field Form
            <div className="border border-gray-200 rounded-md p-4">
               <h4 className="text-md font-medium mb-3">
                  {editingIndex >= 0 ? "Edit Field" : "New Field"}
               </h4>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Entry ID */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entry ID <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        value={newField.entryId}
                        onChange={(e) =>
                           setNewField((prev) => ({ ...prev, entryId: e.target.value }))
                        }
                        placeholder="e.g., entry.123456789"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
                     />
                     <p className="text-xs text-gray-500 mt-1">
                        The ID from Google Forms (e.g., entry.123456789)
                     </p>
                  </div>

                  {/* Label */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        value={newField.label}
                        onChange={(e) =>
                           setNewField((prev) => ({ ...prev, label: e.target.value }))
                        }
                        placeholder="e.g., Full Name"
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                     />
                  </div>

                  {/* Field Type */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Type
                     </label>
                     <select
                        value={newField.type}
                        onChange={(e) =>
                           setNewField((prev) => ({ ...prev, type: e.target.value }))
                        }
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md">
                        {fieldTypes.map((type) => (
                           <option key={type.value} value={type.value}>
                              {type.label}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* Mapped Field */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Map to Required Field
                     </label>
                     <select
                        value={newField.mappedKey || "custom"}
                        onChange={(e) =>
                           setNewField((prev) => ({ ...prev, mappedKey: e.target.value }))
                        }
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md">
                        {standardFieldOptions.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* Required */}
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        id="field-required"
                        checked={newField.required}
                        onChange={(e) =>
                           setNewField((prev) => ({
                              ...prev,
                              required: e.target.checked,
                           }))
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                     />
                     <label
                        htmlFor="field-required"
                        className="ml-2 block text-sm text-gray-700">
                        Required field
                     </label>
                  </div>

                  {/* Show in Registration */}
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        id="field-show"
                        checked={newField.showInRegistration}
                        onChange={(e) =>
                           setNewField((prev) => ({
                              ...prev,
                              showInRegistration: e.target.checked,
                           }))
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                     />
                     <label
                        htmlFor="field-show"
                        className="ml-2 block text-sm text-gray-700">
                        Show in Registration modal
                     </label>
                  </div>
               </div>

               {/* Options for select and radio */}
               {(newField.type === "select" || newField.type === "radio") && (
                  <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Options
                     </label>
                     <div className="flex">
                        <input
                           type="text"
                           value={optionInput}
                           onChange={(e) => setOptionInput(e.target.value)}
                           placeholder="Add an option"
                           className="flex-grow px-3 py-2 text-black border border-gray-300 rounded-l-md"
                           onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                        />
                        <button
                           onClick={handleAddOption}
                           className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition">
                           Add
                        </button>
                     </div>

                     {/* Display options */}
                     {(editingIndex >= 0
                        ? fields[editingIndex]?.options
                        : newField.options
                     )?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                           {(editingIndex >= 0 &&
                           fields[editingIndex] &&
                           fields[editingIndex].options
                              ? fields[editingIndex].options
                              : newField.options
                           ).map((option, index) => (
                              <div
                                 key={index}
                                 className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm">
                                 <span>{option}</span>
                                 <button
                                    onClick={() =>
                                       handleRemoveOption(index, editingIndex < 0)
                                    }
                                    className="ml-2 text-red-500 hover:text-red-700">
                                    &times;
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               )}

               {/* Advanced settings accordion */}
               <details className="mb-4">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                     Advanced Settings
                  </summary>
                  <div className="mt-3 pl-3 border-l-2 border-gray-200 space-y-3">
                     {/* Placeholder */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Placeholder
                        </label>
                        <input
                           type="text"
                           value={newField.placeholder || ""}
                           onChange={(e) =>
                              setNewField((prev) => ({
                                 ...prev,
                                 placeholder: e.target.value,
                              }))
                           }
                           placeholder="e.g., Enter your full name"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                     </div>

                     {/* Help Text */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Help Text
                        </label>
                        <input
                           type="text"
                           value={newField.helpText || ""}
                           onChange={(e) =>
                              setNewField((prev) => ({
                                 ...prev,
                                 helpText: e.target.value,
                              }))
                           }
                           placeholder="e.g., Please enter your legal name as it appears on your ID"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                     </div>

                     {/* Checkbox Label (for checkbox type) */}
                     {newField.type === "checkbox" && (
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              Checkbox Label
                           </label>
                           <input
                              type="text"
                              value={newField.checkboxLabel || ""}
                              onChange={(e) =>
                                 setNewField((prev) => ({
                                    ...prev,
                                    checkboxLabel: e.target.value,
                                 }))
                              }
                              placeholder="e.g., I agree to the terms and conditions"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                           />
                        </div>
                     )}
                  </div>
               </details>

               <div className="flex justify-end space-x-3">
                  <button
                     onClick={handleCancel}
                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                     Cancel
                  </button>
                  <button
                     onClick={handleSaveField}
                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                     {editingIndex >= 0 ? "Update Field" : "Add Field"}
                  </button>
               </div>
            </div>
         )}

         {/* Save All Button */}
         {fields.length > 0 && (
            <div className="mt-4">
               <button
                  onClick={handleSaveAllFields}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition">
                  Save Custom Fields
               </button>
            </div>
         )}
      </div>
   );
};

GoogleFormFieldEditor.propTypes = {
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
   }).isRequired,
   onUpdate: PropTypes.func.isRequired,
};

export default GoogleFormFieldEditor;
