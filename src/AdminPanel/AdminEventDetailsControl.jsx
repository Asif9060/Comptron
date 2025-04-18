import { useState, useEffect } from "react";
import moment from "moment-timezone";
const AdminEventDetailsControl = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  // Fetch all events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(
      "https://comptron-server-2.onrender.com/api/eventDetails"
    );
    const data = await res.json();
    setEvents(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", eventDate);
    formData.append("time", eventTime);
    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    let url = "https://comptron-server-2.onrender.com/api/eventDetails/create";
    let method = "POST";

    if (editingEventId) {
      url = `https://comptron-server-2.onrender.com/api/eventDetails/${editingEventId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      body: formData,
    });

    if (response.ok) {
      alert(
        editingEventId
          ? "Event Updated Successfully!"
          : "Event Created Successfully!"
      );
      setTitle("");
      setDescription("");
      setMainImage(null);
      setGalleryImages([]);
      setEditingEventId(null);
      fetchEvents();
    } else {
      alert("Error submitting event");
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setTitle(event.title);
    setDescription(event.description);
  
    const dt = moment.tz(event.dateTime, "Asia/Dhaka");
    setEventDate(dt.format("YYYY-MM-DD"));
    setEventTime(dt.format("HH:mm"));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      const res = await fetch(
        `https://comptron-server-2.onrender.com/api/eventDetails/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Event Deleted Successfully!");
        fetchEvents();
      } else {
        alert("Error deleting event");
      }
    }
  };

  return (
    <div className="p-8 flex flex-col translate-y-[4rem]  ">
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
            className="text-center bg-white p-2"
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="text-center bg-white p-2"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="bg-white p-2"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setMainImage)}
            required={!editingEventId}
          />
          <input
            className="bg-white p-2"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
          <button
            className="button0 bg-emerald-500 text-white p-2 rounded-lg"
            type="submit"
          >
            {editingEventId ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {/* grid-cols-1 md:grid-cols-2 lg:grid-cols-3*/}
        {events.map((event) => (
          <div
            key={event._id}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center"
          >
            <h3 className="font-bold text-lg mb-2">{event.title}</h3>
            <p className="text-sm mb-2">{event.description}</p>
            {/* You can also show images here if you want */}
            <div className="flex gap-2 mt-4">
              <button
                className="bg-yellow-400 Btn05 w-[6.5em]  h-[47.5px] rounded text-white p-2"
                onClick={() => handleEdit(event)}
              >
                Edit
                <svg className="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
              <button
                className="bg-red-500 button04 text-white p-2 rounded-md"
                onClick={() => handleDelete(event._id)}
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
