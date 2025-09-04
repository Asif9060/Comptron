import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CSVLink } from "react-csv";
import AdminEventControl from "./AdminEventControl";
import EventCountdown from "../Components/UI/EventCountdown";
import FormBuilder from "../Components/Features/FormBuilder";
import GoogleFormBuilder from "../Components/Features/GoogleFormBuilder";
import RichTextEditor from "../RichTextStyle/RichTextEditor";

const AdminEventDetailsControl = () => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [mainImage, setMainImage] = useState(null);
   const [galleryImages, setGalleryImages] = useState([]);
   const [events, setEvents] = useState([]);
   const [editingEventId, setEditingEventId] = useState(null);
   const [startDate, setStartDate] = useState("");
   const [startTime, setStartTime] = useState("");
   const [endDate, setEndDate] = useState("");
   const [endTime, setEndTime] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [formConfig, setFormConfig] = useState({
      enabled: false,
      fields: [],
   });
   const [registrations, setRegistrations] = useState({});
   const [loadingRegistrations, setLoadingRegistrations] = useState({});
   const [bulletPoints, setBulletPoints] = useState([{ label: "", text: "" }]);

   // Fetch all events and their registrations when the component mounts
   useEffect(() => {
      const loadEventsAndRegistrations = async () => {
         await fetchEvents();
         const eventData = await fetch(
            "https://comptron-server-2.onrender.com/api/eventDetails"
         ).then((res) => res.json());

         // Fetch registrations for all events that have registration enabled
         for (const event of eventData) {
            if (event.registrationForm?.enabled) {
               await fetchRegistrations(event._id);
            }
         }
      };

      loadEventsAndRegistrations();
   }, []);

   const fetchEvents = async () => {
      try {
         setIsLoading(true);
         setError("");
         const res = await fetch(
            "https://comptron-server-2.onrender.com/api/eventDetails"
         );
         if (!res.ok) {
            throw new Error("Failed to fetch events");
         }
         const data = await res.json();
         setEvents(data);
      } catch (err) {
         setError("Failed to load events: " + err.message);
         console.error("Error fetching events:", err);
      } finally {
         setIsLoading(false);
      }
   };

   const fetchRegistrations = async (eventId) => {
      try {
         setLoadingRegistrations((prev) => ({ ...prev, [eventId]: true }));
         const res = await fetch(
            `https://comptron-server-2.onrender.com/api/form/eventDetails/${eventId}/registrations`
         );
         if (!res.ok) {
            throw new Error("Failed to fetch registrations");
         }
         const data = await res.json();
         setRegistrations((prev) => ({
            ...prev,
            [eventId]: data,
         }));
      } catch (err) {
         console.error("Error fetching registrations:", err);
      } finally {
         setLoadingRegistrations((prev) => ({ ...prev, [eventId]: false }));
      }
   };

   const handleImageUpload = (e, setImage) => {
      const file = e.target.files[0];
      if (file && file.size < 10 * 1024 * 1024) {
         setImage(file);
      } else {
         alert("File is too large! Max size: 10MB.");
      }
   };

   const handleGalleryUpload = (e) => {
      const files = Array.from(e.target.files).filter(
         (file) => file.size < 5 * 1024 * 1024
      );
      if (files.length !== e.target.files.length) {
         alert("Some files were too large (max 5MB each).");
      }
      setGalleryImages(files);
   };

   const validateForm = () => {
      if (!title.trim()) {
         setError("Title is required");
         return false;
      }
      if (!description.trim()) {
         setError("Description is required");
         return false;
      }
      if (!startDate || !startTime) {
         setError("Start date and time are required");
         return false;
      }
      if (!endDate || !endTime) {
         setError("End date and time are required");
         return false;
      }

      const startDateTime = moment.tz(
         `${startDate} ${startTime}`,
         "YYYY-MM-DD HH:mm",
         "Asia/Dhaka"
      );
      const endDateTime = moment.tz(
         `${endDate} ${endTime}`,
         "YYYY-MM-DD HH:mm",
         "Asia/Dhaka"
      );

      if (!startDateTime.isValid() || !endDateTime.isValid()) {
         setError("Invalid date/time format");
         return false;
      }

      if (endDateTime.isBefore(startDateTime)) {
         setError("End date/time must be after start date/time");
         return false;
      }

      if (!editingEventId && !mainImage) {
         setError("Main image is required for new events");
         return false;
      }

      setError("");
      return true;
   };

   const handleBulletPointChange = (index, field, value) => {
      const newBulletPoints = [...bulletPoints];
      newBulletPoints[index][field] = value;
      setBulletPoints(newBulletPoints);
   };

   const addBulletPoint = () => {
      setBulletPoints([...bulletPoints, { label: "", text: "" }]);
   };

   const removeBulletPoint = (index) => {
      const newBulletPoints = bulletPoints.filter((_, i) => i !== index);
      setBulletPoints(newBulletPoints);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      try {
         setIsLoading(true);
         setError("");

         // Filter out empty bullet points and validate
         const validBulletPoints = bulletPoints.filter((bp) => bp.label && bp.text);
         console.log("Submitting bullet points:", validBulletPoints);

         const formData = new FormData();
         formData.append("title", title.trim());
         formData.append("description", description.trim());
         formData.append("bulletPoints", JSON.stringify(validBulletPoints));
         formData.append("startDate", startDate);
         formData.append("startTime", startTime);
         formData.append("endDate", endDate);
         formData.append("endTime", endTime);

         if (mainImage) {
            formData.append("mainImage", mainImage);
         }

         if (galleryImages.length > 0) {
            galleryImages.forEach((file) => {
               formData.append("galleryImages", file);
            });
         }

         // Add registration form configuration
         formData.append(
            "registrationForm",
            JSON.stringify({
               enabled: formConfig.enabled,
               fields: formConfig.fields,
               useGoogleForms: formConfig.useGoogleForms,
               googleForms: formConfig.googleForms,
            })
         );

         const url = editingEventId
            ? `https://comptron-server-2.onrender.com/api/eventDetails/${editingEventId}`
            : "https://comptron-server-2.onrender.com/api/eventDetails/create";

         console.log("Sending request to:", url);

         const response = await fetch(url, {
            method: editingEventId ? "PUT" : "POST",
            body: formData,
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit event");
         }

         const savedEvent = await response.json();
         console.log("Saved event data:", savedEvent);

         alert(
            editingEventId ? "Event Updated Successfully!" : "Event Created Successfully!"
         );
         resetForm();
         fetchEvents();
      } catch (err) {
         setError(err.message);
         console.error("Error submitting event:", err);
      } finally {
         setIsLoading(false);
      }
   };

   const resetForm = () => {
      setTitle("");
      setDescription("");
      setBulletPoints([{ label: "", text: "" }]);
      setMainImage(null);
      setGalleryImages([]);
      setEditingEventId(null);
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setError("");
      // Reset form configuration
      setFormConfig({
         enabled: false,
         fields: [],
         useGoogleForms: false,
         googleForms: [],
      });
   };

   const prepareCSVData = (eventId) => {
      const eventRegistrations = registrations[eventId] || [];
      if (eventRegistrations.length === 0) return [];

      // Get all unique fields from all registrations
      const allFields = new Set();
      eventRegistrations.forEach((reg) => {
         Object.keys(reg.formData).forEach((key) => allFields.add(key));
      });

      // Prepare headers
      const headers = [
         { label: "Registration Date", key: "submittedAt" },
         ...Array.from(allFields).map((field) => ({
            label: field,
            key: `formData.${field}`,
         })),
      ];

      // Prepare data
      const data = eventRegistrations.map((reg) => ({
         submittedAt: moment(reg.submittedAt).format("YYYY-MM-DD HH:mm:ss"),
         ...Array.from(allFields).reduce(
            (acc, field) => ({
               ...acc,
               [`formData.${field}`]: reg.formData[field] || "",
            }),
            {}
         ),
      }));

      return { headers, data };
   };

   // Modify the handleEdit function to fetch registrations
   const handleEdit = async (event) => {
      console.log("Editing event full data:", event);

      setEditingEventId(event._id);
      setTitle(event.title);
      setDescription(event.description);

      // Handle bullet points
      if (Array.isArray(event.bulletPoints) && event.bulletPoints.length > 0) {
         console.log("Loading bullet points for editing:", event.bulletPoints);
         setBulletPoints(event.bulletPoints);
      } else {
         console.log("No bullet points found, setting default empty bullet point");
         setBulletPoints([{ label: "", text: "" }]);
      }

      const startDt = moment.tz(event.startDateTime, "Asia/Dhaka");
      setStartDate(startDt.format("YYYY-MM-DD"));
      setStartTime(startDt.format("HH:mm"));

      const endDt = moment.tz(event.endDateTime, "Asia/Dhaka");
      setEndDate(endDt.format("YYYY-MM-DD"));
      setEndTime(endDt.format("HH:mm"));

      // Load registration form configuration
      console.log("Registration form data:", event.registrationForm);
      setFormConfig({
         enabled: event.registrationForm?.enabled || false,
         fields: event.registrationForm?.fields || [],
         useGoogleForms: event.registrationForm?.useGoogleForms || false,
         googleForms: event.registrationForm?.googleForms || [],
      });

      // Fetch registrations when editing an event
      await fetchRegistrations(event._id);
   };

   const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      if (confirmDelete) {
         try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
               `https://comptron-server-2.onrender.com/api/eventDetails/${id}`,
               {
                  method: "DELETE",
               }
            );
            if (!res.ok) {
               throw new Error("Failed to delete event");
            }
            alert("Event Deleted Successfully!");
            fetchEvents();
         } catch (err) {
            setError("Failed to delete event: " + err.message);
            console.error("Error deleting event:", err);
         } finally {
            setIsLoading(false);
         }
      }
   };

   return (
      <div className="p-8 flex flex-col translate-y-[4rem] min-h-screen bg-gradient-to-b from-white to-gray-50">
         <h1 className="text-4xl mb-8 font-bold text-center text-gray-800">
            Admin Event Management
         </h1>

         {/* Show loading state */}
         {isLoading && (
            <div className="text-center">
               <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
                  <div className="flex items-center space-x-2">
                     <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                     <span>Loading...</span>
                  </div>
               </div>
            </div>
         )}

         {/* Show error messages */}
         {error && (
            <div className="text-center mb-6 animate-fade-in">
               <div className="inline-block px-4 py-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                     <svg
                        className="h-5 w-5"
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
                     <span>{error}</span>
                  </div>
               </div>
            </div>
         )}

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="lg:col-span-2">
               <AdminEventControl />
            </div>
            <div className="lg:col-span-2">
               <EventCountdown />
            </div>
         </div>

         {/* Event Form */}
         <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
               <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  {editingEventId ? "Edit Event" : "Create Event"}
               </h2>
               <form
                  className="space-y-6"
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSubmit(e);
                  }}
                  encType="multipart/form-data">
                  {/* Title Input */}
                  <div className="group">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title <span className="text-red-500">*</span>
                     </label>
                     <RichTextEditor
                        initialContent={title}
                        onContentChange={(newContent) => setTitle(newContent)}
                        contentClassName="bg-white text-gray-800"
                        minHeight="150px"
                     />
                  </div>

                  {/* Description Input */}
                  <div className="group">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Description <span className="text-red-500">*</span>
                     </label>
                     <RichTextEditor
                        initialContent={description}
                        onContentChange={(newContent) => setDescription(newContent)}
                        contentClassName="bg-white text-gray-800"
                        minHeight="250px"
                     />
                  </div>

                  {/* Bullet Points Section */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800">
                           Bullet Points
                        </h3>
                        <button
                           type="button"
                           onClick={addBulletPoint}
                           className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm">
                           Add Point
                        </button>
                     </div>
                     {bulletPoints.map((point, index) => (
                        <div key={index} className="flex gap-4 items-start group">
                           <div className="flex-1">
                              <input
                                 type="text"
                                 placeholder="Label (e.g., 'Location', 'Highlights')"
                                 value={point.label}
                                 onChange={(e) =>
                                    handleBulletPointChange(
                                       index,
                                       "label",
                                       e.target.value
                                    )
                                 }
                                 className="w-full px-4 py-2 mb-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-800"
                              />
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                 Text Content
                              </label>
                              <RichTextEditor
                                 initialContent={point.text}
                                 onContentChange={(newContent) =>
                                    handleBulletPointChange(index, "text", newContent)
                                 }
                                 contentClassName="bg-white text-gray-800"
                                 minHeight="200px"
                              />
                           </div>
                           {bulletPoints.length > 1 && (
                              <button
                                 type="button"
                                 onClick={() => removeBulletPoint(index)}
                                 className="mt-2 p-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                 <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                 </svg>
                              </button>
                           )}
                        </div>
                     ))}
                  </div>

                  {/* Image Upload Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Main Image{" "}
                           {!editingEventId && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative group">
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setMainImage)}
                              required={!editingEventId}
                              disabled={isLoading}
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Gallery Images (Optional)
                        </label>
                        <div className="relative group">
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleGalleryUpload}
                              disabled={isLoading}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Date and Time Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Start Date <span className="text-red-500">*</span>
                           </label>
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              required
                              disabled={isLoading}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              Start Time <span className="text-red-500">*</span>
                           </label>
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
                              type="time"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                              required
                              disabled={isLoading}
                           />
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              End Date <span className="text-red-500">*</span>
                           </label>
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              required
                              disabled={isLoading}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="block text-sm font-medium text-gray-700">
                              End Time <span className="text-red-500">*</span>
                           </label>
                           <input
                              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
                              type="time"
                              value={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                              required
                              disabled={isLoading}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Registration Options Section */}
                  <div className="mt-8 space-y-6">
                     <h3 className="text-xl font-semibold text-gray-800">
                        Registration Options
                     </h3>

                     <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                        <div className="mb-6">
                           <p className="text-lg font-medium text-gray-700 mb-2">
                              Choose Registration Method:
                           </p>
                           <div className="flex flex-col space-y-2">
                              <label className="flex items-center cursor-pointer">
                                 <input
                                    type="radio"
                                    name="formType"
                                    checked={
                                       !formConfig.useGoogleForms && formConfig.enabled
                                    }
                                    onChange={() =>
                                       setFormConfig((prev) => ({
                                          ...prev,
                                          enabled: true,
                                          useGoogleForms: false,
                                       }))
                                    }
                                    className="form-radio h-5 w-5 text-blue-600"
                                 />
                                 <span className="ml-2 text-gray-700">
                                    Custom Form Builder
                                 </span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                 <input
                                    type="radio"
                                    name="formType"
                                    checked={
                                       formConfig.useGoogleForms && formConfig.enabled
                                    }
                                    onChange={() =>
                                       setFormConfig((prev) => ({
                                          ...prev,
                                          enabled: true,
                                          useGoogleForms: true,
                                       }))
                                    }
                                    className="form-radio h-5 w-5 text-blue-600"
                                 />
                                 <span className="ml-2 text-gray-700">Google Forms</span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                 <input
                                    type="radio"
                                    name="formType"
                                    checked={!formConfig.enabled}
                                    onChange={() =>
                                       setFormConfig((prev) => ({
                                          ...prev,
                                          enabled: false,
                                       }))
                                    }
                                    className="form-radio h-5 w-5 text-blue-600"
                                 />
                                 <span className="ml-2 text-gray-700">
                                    No Registration
                                 </span>
                              </label>
                           </div>
                        </div>

                        {/* Show appropriate form builder based on selection */}
                        {formConfig.enabled && !formConfig.useGoogleForms && (
                           <div className="pt-4 border-t border-gray-200">
                              <h4 className="text-lg font-medium text-gray-700 mb-4">
                                 Custom Form Builder
                              </h4>
                              <FormBuilder
                                 onFormChange={(formData) =>
                                    setFormConfig((prev) => ({
                                       ...prev,
                                       fields: formData.fields,
                                       enabled: formData.enabled,
                                    }))
                                 }
                                 initialFields={formConfig.fields}
                                 enabled={true}
                              />
                           </div>
                        )}

                        {formConfig.enabled && formConfig.useGoogleForms && (
                           <div className="pt-4 border-t border-gray-200">
                              <h4 className="text-lg font-medium text-gray-700 mb-4">
                                 Google Forms
                              </h4>
                              <GoogleFormBuilder
                                 onFormChange={(formData) =>
                                    setFormConfig((prev) => ({
                                       ...prev,
                                       googleForms: formData.googleForms,
                                       enabled: formData.enabled,
                                       useGoogleForms: formData.useGoogleForms,
                                    }))
                                 }
                                 initialForms={formConfig.googleForms}
                                 enabled={true}
                                 useGoogleForms={true}
                              />
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 mt-8">
                     {editingEventId && (
                        <button
                           type="button"
                           className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                           onClick={resetForm}
                           disabled={isLoading}>
                           Cancel
                        </button>
                     )}
                     <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 font-medium"
                        disabled={isLoading}>
                        {isLoading ? (
                           <div className="flex items-center space-x-2">
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              <span>Saving...</span>
                           </div>
                        ) : editingEventId ? (
                           "Update Event"
                        ) : (
                           "Create Event"
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>

         {/* Event List */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {events.map((event) => (
               <div
                  key={event._id}
                  className="relative group bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                     <h3
                        className="font-bold text-xl mb-3 text-gray-800"
                        dangerouslySetInnerHTML={{ __html: event.title }}></h3>
                     <p
                        className="text-gray-600 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: event.description }}></p>

                     <div className="space-y-2 mb-6">
                        <p className="text-sm text-gray-600">
                           <span className="font-medium text-blue-600">Starts:</span>{" "}
                           {moment
                              .tz(event.startDateTime, "Asia/Dhaka")
                              .format("MMM D, YYYY h:mm A")}
                        </p>
                        <p className="text-sm text-gray-600">
                           <span className="font-medium text-blue-600">Ends:</span>{" "}
                           {moment
                              .tz(event.endDateTime, "Asia/Dhaka")
                              .format("MMM D, YYYY h:mm A")}
                        </p>
                        {event.registrationForm?.enabled && (
                           <p className="text-sm text-green-600 font-medium">
                              Registration Enabled
                           </p>
                        )}
                     </div>

                     <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                           <button
                              onClick={() => handleEdit(event)}
                              disabled={isLoading}
                              className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium">
                              Edit
                           </button>
                           <button
                              onClick={() => handleDelete(event._id)}
                              disabled={isLoading}
                              className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium">
                              Delete
                           </button>
                        </div>
                        {event.registrationForm?.enabled &&
                           (loadingRegistrations[event._id] ? (
                              <div className="w-full text-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg">
                                 <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading registrations...</span>
                                 </div>
                              </div>
                           ) : registrations[event._id]?.length > 0 ? (
                              <CSVLink
                                 data={prepareCSVData(event._id).data}
                                 headers={prepareCSVData(event._id).headers}
                                 filename={`${event.title.replace(
                                    /\s+/g,
                                    "_"
                                 )}_registrations.csv`}
                                 className="w-full text-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium">
                                 Download Registrations ({registrations[event._id].length}
                                 )
                              </CSVLink>
                           ) : (
                              <div className="w-full text-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg">
                                 No registrations yet
                              </div>
                           ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AdminEventDetailsControl;
