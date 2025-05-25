import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { defaultFields } from "../../utils/defaultFormFields";

const FormBuilder = ({ onFormChange, initialFields = [], enabled = false }) => {
  const [fields, setFields] = useState(initialFields);
  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    if (isEnabled && fields.length === 0) {
      setFields([...defaultFields]);
    }
    onFormChange({ enabled: isEnabled, fields });
  }, [fields, isEnabled, onFormChange]);

  const resetToDefault = () => {
    setFields([...defaultFields]);
  };

  const addField = (e) => {
    if (e) e.preventDefault(); // Prevent form submission
    const newField = {
      label: "",
      type: "text",
      required: false,
      order: fields.length + 1,
      options: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields.map((field, i) => ({ ...field, order: i + 1 })));
  };

  const updateField = (index, field) => {
    const newFields = [...fields];
    newFields[index] = { ...field, order: index + 1 };
    setFields(newFields);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items.map((field, index) => ({ ...field, order: index + 1 })));
  };

  return (
    <div className="space-y-4 p-4 border border-gray-300 rounded-lg bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-white">Enable Registration Form</label>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
        </div>
        {isEnabled && (
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset to Default Fields
          </button>
        )}
      </div>

      {isEnabled && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="form-fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={index}
                      draggableId={`field-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-700 p-4 rounded-lg"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) =>
                                updateField(index, {
                                  ...field,
                                  label: e.target.value,
                                })
                              }
                              placeholder="Field Label"
                              className="bg-gray-800 text-white p-2 rounded"
                            />
                            <select
                              value={field.type}
                              onChange={(e) =>
                                updateField(index, {
                                  ...field,
                                  type: e.target.value,
                                })
                              }
                              className="bg-gray-800 text-white p-2 rounded"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="tel">Phone</option>
                              <option value="number">Number</option>
                              <option value="select">Dropdown</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="textarea">Text Area</option>
                            </select>

                            {field.type === "select" && (
                              <div className="col-span-2">
                                <input
                                  type="text"
                                  value={field.options?.join(",") || ""}
                                  onChange={(e) =>
                                    updateField(index, {
                                      ...field,
                                      options: e.target.value
                                        .split(",")
                                        .map((opt) => opt.trim()),
                                    })
                                  }
                                  placeholder="Options (comma-separated)"
                                  className="w-full bg-gray-800 text-white p-2 rounded"
                                />
                              </div>
                            )}

                            <div className="col-span-2 flex items-center space-x-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) =>
                                    updateField(index, {
                                      ...field,
                                      required: e.target.checked,
                                    })
                                  }
                                  className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span className="text-white">Required</span>
                              </label>{" "}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeField(index);
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={addField}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Field
            </button>
          </div>
        </>
      )}
    </div>
  );
};

FormBuilder.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  initialFields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      order: PropTypes.number,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  enabled: PropTypes.bool,
};

FormBuilder.defaultProps = {
  initialFields: [],
  enabled: false,
};

export default FormBuilder;
