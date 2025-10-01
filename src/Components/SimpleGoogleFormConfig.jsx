import { useState } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const SimpleGoogleFormConfig = ({ initialConfig, onSave }) => {
   const [formUrl, setFormUrl] = useState(initialConfig?.formUrl || "");
   const [fields, setFields] = useState(initialConfig?.fields || []);
   const [newFieldLabel, setNewFieldLabel] = useState("");
   const [newFieldEntryId, setNewFieldEntryId] = useState("");
   const [newFieldType, setNewFieldType] = useState("text");
   const [newFieldRequired, setNewFieldRequired] = useState(false);
   const [newFieldOptions, setNewFieldOptions] = useState("");

   const fieldTypes = [
      { value: "text", label: "Short Answer (Text)" },
      { value: "textarea", label: "Paragraph (Long Text)" },
      { value: "email", label: "Email" },
      { value: "tel", label: "Phone Number" },
      { value: "number", label: "Number" },
      { value: "url", label: "URL" },
      { value: "date", label: "Date" },
      { value: "time", label: "Time" },
      { value: "datetime-local", label: "Date & Time" },
      { value: "dropdown", label: "Dropdown (Select)" },
      { value: "radio", label: "Multiple Choice (Radio)" },
      { value: "checkbox", label: "Checkboxes" },
      { value: "linear-scale", label: "Linear Scale" },
   ];

   const needsOptions = (type) => {
      return ["dropdown", "radio", "checkbox", "linear-scale"].includes(type);
   };

   const addField = () => {
      if (!newFieldLabel.trim() || !newFieldEntryId.trim()) {
         toast.error("Please enter both label and entry ID");
         return;
      }

      // Validate options for field types that need them
      if (needsOptions(newFieldType) && !newFieldOptions.trim()) {
         toast.error(
            `Please provide options for ${newFieldType} field (comma-separated)`
         );
         return;
      }

      const newField = {
         id: Date.now().toString(),
         label: newFieldLabel.trim(),
         entryId: newFieldEntryId.trim(),
         type: newFieldType,
         required: newFieldRequired,
      };

      // Add options if the field type needs them
      if (needsOptions(newFieldType)) {
         newField.options = newFieldOptions
            .split(",")
            .map((opt) => opt.trim())
            .filter((opt) => opt);
      }

      setFields([...fields, newField]);
      setNewFieldLabel("");
      setNewFieldEntryId("");
      setNewFieldType("text");
      setNewFieldRequired(false);
      setNewFieldOptions("");
      toast.success("Field added!");
   };

   const removeField = (id) => {
      setFields(fields.filter((f) => f.id !== id));
      toast.success("Field removed!");
   };

   const handleSave = () => {
      if (!formUrl.trim()) {
         toast.error("Please enter a Google Form URL");
         return;
      }

      if (fields.length === 0) {
         toast.error("Please add at least one field");
         return;
      }

      const config = {
         formUrl: formUrl.trim(),
         fields: fields,
      };

      onSave(config);
      toast.success("Configuration saved!");
   };

   return (
      <div className="space-y-6">
         {/* Form URL Input */}
         <div>
            <label className="block text-white font-semibold mb-2">Google Form URL</label>
            <input
               type="text"
               value={formUrl}
               onChange={(e) => setFormUrl(e.target.value)}
               placeholder="https://docs.google.com/forms/d/e/1FAIpQLSc..."
               className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-400 text-sm mt-1">
               Paste your Google Form's URL here
            </p>
         </div>

         {/* Fields List */}
         <div>
            <h3 className="text-white font-semibold mb-3">Form Fields</h3>
            {fields.length > 0 ? (
               <div className="space-y-2 mb-4">
                  {fields.map((field) => (
                     <div
                        key={field.id}
                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                        <div>
                           <div className="text-white font-medium">{field.label}</div>
                           <div className="text-gray-400 text-sm">
                              Entry ID: {field.entryId} | Type: {field.type}
                              {field.required && " | Required"}
                           </div>
                           {field.options && field.options.length > 0 && (
                              <div className="text-gray-400 text-xs mt-1">
                                 Options: {field.options.join(", ")}
                              </div>
                           )}
                        </div>
                        <button
                           onClick={() => removeField(field.id)}
                           className="text-red-400 hover:text-red-300 px-3 py-1 rounded">
                           Remove
                        </button>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="text-gray-400 text-sm mb-4">No fields added yet</p>
            )}
         </div>

         {/* Add New Field */}
         <div className="bg-gray-700 p-4 rounded-lg space-y-3">
            <h4 className="text-white font-semibold">Add New Field</h4>

            <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="block text-gray-300 text-sm mb-1">Field Label</label>
                  <input
                     type="text"
                     value={newFieldLabel}
                     onChange={(e) => setNewFieldLabel(e.target.value)}
                     placeholder="e.g., Team Name"
                     className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-gray-300 text-sm mb-1">Entry ID</label>
                  <input
                     type="text"
                     value={newFieldEntryId}
                     onChange={(e) => setNewFieldEntryId(e.target.value)}
                     placeholder="e.g., entry.123456789"
                     className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-gray-300 text-sm mb-1">Field Type</label>
                  <select
                     value={newFieldType}
                     onChange={(e) => {
                        setNewFieldType(e.target.value);
                        setNewFieldOptions("");
                     }}
                     className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                     {fieldTypes.map((ft) => (
                        <option key={ft.value} value={ft.value}>
                           {ft.label}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="flex items-center">
                  <label className="flex items-center text-gray-300 cursor-pointer">
                     <input
                        type="checkbox"
                        checked={newFieldRequired}
                        onChange={(e) => setNewFieldRequired(e.target.checked)}
                        className="mr-2 w-4 h-4"
                     />
                     Required Field
                  </label>
               </div>
            </div>

            {needsOptions(newFieldType) && (
               <div>
                  <label className="block text-gray-300 text-sm mb-1">
                     Options (comma-separated)
                  </label>
                  <input
                     type="text"
                     value={newFieldOptions}
                     onChange={(e) => setNewFieldOptions(e.target.value)}
                     placeholder={
                        newFieldType === "linear-scale"
                           ? "1, 2, 3, 4, 5"
                           : "Option 1, Option 2, Option 3"
                     }
                     className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <small className="text-gray-400 text-xs mt-1 block">
                     {newFieldType === "linear-scale"
                        ? "Enter scale range (e.g., 1, 2, 3, 4, 5)"
                        : "Enter each choice option separated by commas"}
                  </small>
               </div>
            )}

            <button
               onClick={addField}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
               Add Field
            </button>
         </div>

         {/* Save Button */}
         <div className="flex justify-end">
            <button
               onClick={handleSave}
               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
               Save Configuration
            </button>
         </div>

         {/* Instructions */}
         <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">How to get Entry IDs:</h4>
            <ol className="text-blue-200 text-sm space-y-1 list-decimal list-inside">
               <li>Open your Google Form in edit mode</li>
               <li>
                  Click on a field, then click the three dots menu → "Get pre-filled link"
               </li>
               <li>Fill in a test value and click "Get link"</li>
               <li>In the URL, find "entry.XXXXXXXXX" - that's your Entry ID</li>
               <li>Repeat for each field you want to include</li>
            </ol>
         </div>
      </div>
   );
};

SimpleGoogleFormConfig.propTypes = {
   initialConfig: PropTypes.shape({
      formUrl: PropTypes.string,
      fields: PropTypes.arrayOf(
         PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            entryId: PropTypes.string,
            type: PropTypes.string,
            required: PropTypes.bool,
            options: PropTypes.arrayOf(PropTypes.string),
         })
      ),
   }),
   onSave: PropTypes.func.isRequired,
};

export default SimpleGoogleFormConfig;
