import { useState, useEffect } from "react";
import moment from "moment-timezone";
import AdminEventControl from "./AdminEventControl";
import EventCountdown from "../Components/UI/EventCountdown";

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

  // Fetch all events when the component mounts
  useEffect(() => {
    fetchEvents();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
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

      const url = editingEventId
        ? `https://comptron-server-2.onrender.com/api/eventDetails/${editingEventId}`
        : "https://comptron-server-2.onrender.com/api/eventDetails/create";

      const response = await fetch(url, {
        method: editingEventId ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit event");
      }

      alert(
        editingEventId
          ? "Event Updated Successfully!"
          : "Event Created Successfully!"
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
    setMainImage(null);
    setGalleryImages([]);
    setEditingEventId(null);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setError("");
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setTitle(event.title);
    setDescription(event.description);

    const startDt = moment.tz(event.startDateTime, "Asia/Dhaka");
    setStartDate(startDt.format("YYYY-MM-DD"));
    setStartTime(startDt.format("HH:mm"));

    const endDt = moment.tz(event.endDateTime, "Asia/Dhaka");
    setEndDate(endDt.format("YYYY-MM-DD"));
    setEndTime(endDt.format("HH:mm"));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
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
    <div className="p-8 flex text-white flex-col translate-y-[4rem]">
      <h1 className="text-4xl translate-y-[-2rem] font-bold text-center text-[#15A6E1]">
        Admin Event Management
      </h1>

      {/* Show loading state */}
      {isLoading && (
        <div className="text-center text-yellow-400 my-4">Loading...</div>
      )}

      {/* Show error messages */}
      {error && (
        <div className="text-center text-red-500 my-4 p-2 border border-red-500 rounded">
          {error}
        </div>
      )}

      <AdminEventControl />
      <EventCountdown />
      <br />

      {/* Event Form */}
      <div className="flex flex-col items-center border border-[#15A6E1] p-4 rounded-3xl shadow-md mb-8">
        <h2 className="p-2 text-[2rem] font-bold text-emerald-500">
          {editingEventId ? "Edit Event" : "Create Event"}
        </h2>
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            className="text-center bg-gray-800 text-white p-2 rounded"
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />
          <textarea
            className="text-center bg-gray-800 text-white p-2 rounded"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isLoading}
            rows={4}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Main Image {!editingEventId && "*"}
            </label>
            <input
              className="bg-gray-800 text-white p-2 rounded"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setMainImage)}
              required={!editingEventId}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Gallery Images (Optional)</label>
            <input
              className="bg-gray-800 text-white p-2 rounded"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Start Date *</label>
              <input
                className="bg-gray-800 text-white p-2 rounded"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Start Time *</label>
              <input
                className="bg-gray-800 text-white p-2 rounded"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">End Date *</label>
              <input
                className="bg-gray-800 text-white p-2 rounded"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">End Time *</label>
              <input
                className="bg-gray-800 text-white p-2 rounded"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            {editingEventId && (
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded-lg"
                onClick={resetForm}
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
            <button
              className="button0 bg-emerald-500 text-white p-2 rounded-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : editingEventId
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-black lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center"
          >
            <h3 className="font-bold text-lg mb-2">{event.title}</h3>
            <p className="text-sm mb-2">{event.description}</p>

            <div className="text-sm mb-4">
              <p>
                <span className="font-semibold">Starts:</span>{" "}
                {moment
                  .tz(event.startDateTime, "Asia/Dhaka")
                  .format("MMM D, YYYY h:mm A")}
              </p>
              <p>
                <span className="font-semibold">Ends:</span>{" "}
                {moment
                  .tz(event.endDateTime, "Asia/Dhaka")
                  .format("MMM D, YYYY h:mm A")}
              </p>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                className="bg-yellow-400 Btn05 w-[6.5em] h-[47.5px] rounded text-white p-2"
                onClick={() => handleEdit(event)}
                disabled={isLoading}
              >
                Edit
                <svg className="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
              <button
                className="bg-red-500 button04 text-white p-2 rounded-md"
                onClick={() => handleDelete(event._id)}
                disabled={isLoading}
              >
                <div className="button-top">Delete</div>
                <div className="button-bottom"></div>
                <div className="button-base"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEventDetailsControl;
