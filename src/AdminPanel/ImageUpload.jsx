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
      const response = await fetch("https://comptron-server-2.onrender.com/api/eventImages", {
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
    <form className="translate-y-[-27rem] border p-4 inline-block translate-x-[75rem] rounded-3xl" onSubmit={handleUpload}>
      <div className="text-2xl text-white font-bold text-center">Recent Activity Images</div>
      <input className="mt-6" type="file" onChange={(e) => setFile(e.target.files[0])} required />
      {/* <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} /> */}
      {/* <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} /> */}
      <button className="pushable" type="submit">
      <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">
            Upload Image
          </span>
      </button>
    </form>
  );
};

export default ImageUpload;
