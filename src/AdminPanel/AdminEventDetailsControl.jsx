import { useState } from "react";

const AdminEventDetailsControl = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then(setGalleryImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://comptron-server.onrender.com/api/eventDetails/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, mainImage, galleryImages }),
    });
    if (response.ok) {
      alert("Event Created Successfully!");
      setTitle("");
      setDescription("");
      setMainImage(null);
      setGalleryImages([]);
    } else {
      alert("Error creating event");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => handleImageUpload(e, setMainImage)} required />
        <input type="file" multiple onChange={handleGalleryUpload} />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AdminEventDetailsControl;
