import { useState } from "react";

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("https://comptron-server.onrender.com/api/eventImages", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        onUploadSuccess();
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
