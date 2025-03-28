import { useState, useEffect } from "react";

const EventGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch images from MongoDB when component loads
  useEffect(() => {
    fetch("https://comptron-server.onrender.com/api/eventGallery") // Update with your actual API URL
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Store selected file in state
  };

  // Handle new image upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://comptron-server.onrender.com/api/eventGallery", {
        method: "POST",
        body: formData,
      });

      const newImage = await response.json();
      setImages((prev) => [...prev, newImage]); // Update UI
      setSelectedFile(null); // Reset file input
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Event Gallery</h2>

      {/* Image Upload Section */}
      <div className="my-4 flex flex-col items-center">
        <input type="file" onChange={handleFileChange} className="mb-2 absolute z-123" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 absolute z-123 translate-y-[10rem] rounded"
        >
          Upload Image
        </button>
      </div>

      {/* Event Slider */}
      <div className="carousel">
        <div className="list">
          {images.map((event, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${event.imageUrl})` }}
              className="item"
            >
              <div className="content">
                <div className="btn">
                  <a href="/Events">
                    <button>Details</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
