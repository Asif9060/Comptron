import { useState, useEffect } from "react";
import Recent from "../Components/Features/Recent";
import toast, { Toaster } from "react-hot-toast";

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all images
  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/eventImages"
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image!");
      return;
    }
    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);

      fetch("https://comptron-server-2.onrender.com/api/eventImages", {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          if (response.ok) {
            if (onUploadSuccess) onUploadSuccess();
            await fetchImages(); // Refresh the images list
            setFile(null); // Reset the file input
            resolve("Image uploaded successfully!");
          } else {
            reject(new Error("Failed to upload image"));
          }
        })
        .catch((error) => {
          console.error("Upload error:", error);
          reject(new Error("Error uploading image"));
        });
    });

    toast.promise(uploadPromise, {
      loading: "Uploading image...",
      success: (message) => message,
      error: (err) => err.message,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <form
        className="border-2 p-4 flex flex-col w-[50rem] translate-y-[5rem] bg-gray-900 items-center mb-[8rem] text-center rounded-3xl"
        onSubmit={handleUpload}
      >
        <div className="text-4xl text-white font-bold text-center">
          Recent Activity Images
        </div>
        <input
          className="mt-6 bg-white mb-4 text-black"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {/* <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} /> */}
        {/* <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} /> */}
        <button className="pushable" type="submit">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">Upload Image</span>
        </button>
      </form>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4 w-full max-w-7xl">
        {isLoading ? (
          <div className="text-center col-span-full">Loading images...</div>
        ) : images.length > 0 ? (
          images.map((image) => (
            <div
              key={image._id}
              className="relative group bg-white rounded-lg shadow-md p-4"
            >
              <div className="relative w-full h-48 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title || "Event image"}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                {/* <div className="text-sm text-gray-600">
                  {new Date(image.createdAt).toLocaleDateString()}
                </div> */}
                <button
                  onClick={() => {
                    toast((t) => (
                      <div className="flex flex-col gap-2">
                        <span>Are you sure you want to delete this image?</span>
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => toast.dismiss(t.id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={async () => {
                              toast.dismiss(t.id);
                              const deletePromise = new Promise(
                                (resolve, reject) => {
                                  fetch(
                                    `https://comptron-server-2.onrender.com/api/eventImages/${image._id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  )
                                    .then(async (response) => {
                                      if (response.ok) {
                                        await fetchImages(); // Refresh the images
                                        resolve("Image deleted successfully!");
                                      } else {
                                        reject(
                                          new Error("Failed to delete image")
                                        );
                                      }
                                    })
                                    .catch((error) => {
                                      console.error("Delete error:", error);
                                      reject(new Error("Error deleting image"));
                                    });
                                }
                              );

                              toast.promise(deletePromise, {
                                loading: "Deleting image...",
                                success: (message) => message,
                                error: (err) => err.message,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ));
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No images found</div>
        )}
      </div>
      {/* Recent Activity Section */}
      <div className="mt-8 w-full">
        <Recent />
      </div>
    </div>
  );
};

export default ImageUpload;
