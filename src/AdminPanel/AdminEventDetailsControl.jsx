import { useState } from "react";

const AdminEventDetailsControl = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file && file.size < 10 * 1024 * 1024) { // Max size: 10MB
      setImage(file);
    } else {
      alert("File is too large! Max size: 5MB.");
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files).filter(file => file.size < 5 * 1024 * 1024);
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
    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file, index) => {
      formData.append("galleryImages", file);
    });

    const response = await fetch("https://comptron-server-1.onrender.com/api/eventDetails/create", {
      method: "POST",
      body: formData, 
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
    <div className="flex text-center flex-col absolute translate-x-[8rem] mt-[20rem] left-[75rem] border border-[#15A6E1] p-4 float-end translate-y-[52rem] rounded-3xl shadow-md">
      <h2 className="p-2 text-[2rem] font-bold text-emerald-500">Create Event</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <input className="text-center bg-white" type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="text-center bg-white" placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input className="bg-white" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setMainImage)} required />
        <input className="bg-white" type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
        <button className="button0" type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AdminEventDetailsControl;
