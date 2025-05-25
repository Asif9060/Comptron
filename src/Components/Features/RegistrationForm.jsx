import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

const RegistrationForm = ({ eventId, formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("RegistrationForm mounted with fields:", formFields);
  }, [formFields]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const missingFields = formFields
        .filter((field) => field.required && !formData[field.label])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}`
        );
        return;
      } // Submit form data
      await fetch(
        `https://comptron-server-2.onrender.com/api/form/eventDetails/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            formData,
          }),
        }
      );

      toast.success("Registration successful!");
      onSubmit?.();
      setFormData({});
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const baseInputStyles =
      "w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg transition-all duration-200 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-blue-300";

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <div className="relative">
            <input
              type={field.type}
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={`${baseInputStyles} peer`}
              required={field.required}
              placeholder=" "
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              {field.required && <span className="text-red-500 mr-1">*</span>}
              {field.label}
            </label>
          </div>
        );

      case "textarea":
        return (
          <div className="relative">
            <textarea
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={`${baseInputStyles} min-h-[120px] resize-y peer`}
              required={field.required}
              placeholder=" "
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              {field.required && <span className="text-red-500 mr-1">*</span>}
              {field.label}
            </label>
          </div>
        );

      case "select":
        return (
          <div className="relative">
            <select
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={`${baseInputStyles} appearance-none peer`}
              required={field.required}
            >
              <option value="" disabled hidden></option>
              {field.options?.map((option, idx) => (
                <option
                  key={idx}
                  value={option}
                  className="text-gray-100 bg-gray-800"
                >
                  {option}
                </option>
              ))}
            </select>
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              {field.required && <span className="text-red-500 mr-1">*</span>}
              {field.label}
            </label>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <label className="inline-flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData[field.label] || false}
                onChange={(e) =>
                  handleInputChange(field.label, e.target.checked)
                }
                className="peer sr-only"
                required={field.required}
              />
              <div className="w-6 h-6 border-2 border-gray-600 rounded-md transition-all duration-200 peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-hover:border-blue-400">
                <svg
                  className="w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span className="text-gray-300 text-sm font-medium">
              {field.required && <span className="text-red-500 mr-1">*</span>}
              {field.label}
            </span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Event Registration
          </h2>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field, index) => (
            <div key={index} className="space-y-1">
              <div className="relative">{renderField(field)}</div>
            </div>
          ))}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <div className="absolute inset-0 w-full h-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              <div className="relative">
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Register Now</span>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "text",
        "email",
        "tel",
        "number",
        "select",
        "checkbox",
        "textarea",
      ]).isRequired,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.string),
      validations: PropTypes.shape({
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        pattern: PropTypes.string,
        customMessage: PropTypes.string,
      }),
    })
  ).isRequired,
  onSubmit: PropTypes.func,
};

export default RegistrationForm;
