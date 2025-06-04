import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Add this import
import AboutClub from "../Components/Layout/AboutClub";
import SideMenu from "../Components/Features/SideMenu";

const AboutImage = ({ onUploadSuccess }) => {
   const navigate = useNavigate(); // Add this hook
   const [file, setFile] = useState(null);
   const [title /*setTitle*/] = useState(""); // Commented out setTitle
   const [description /*setDescription*/] = useState(""); // Commented out setDescription
   const [images, setImages] = useState([]);

   useEffect(() => {
      const fetchImages = async () => {
         try {
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/AboutImages"
            );
            if (response.ok) {
               const data = await response.json();
               setImages(data);
            } else {
               console.error("Failed to fetch images");
            }
         } catch (error) {
            console.error("Error fetching images:", error);
         }
      };

      fetchImages();
   }, []);

   const refreshImages = async () => {
      try {
         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/AboutImages"
         );
         if (response.ok) {
            const data = await response.json();
            setImages(data);
         } else {
            console.error("Failed to refresh images");
         }
      } catch (error) {
         console.error("Error refreshing images:", error);
      }
   };

   const handleUpload = async (e) => {
      e.preventDefault();
      if (!file) return alert("Please select an image!");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);

      try {
         const response = await fetch(
            "https://comptron-server-2.onrender.com/api/AboutImages",
            {
               method: "POST",
               body: formData,
            }
         );

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

   const handleDelete = async (imageId) => {
      if (!window.confirm("Are you sure you want to delete this image?")) return;

      try {
         const response = await fetch(
            `https://comptron-server-2.onrender.com/api/AboutImages/${imageId}`,
            {
               method: "DELETE",
            }
         );

         if (response.ok) {
            alert("Image deleted successfully!");
            refreshImages(); // Refresh the image list
         } else {
            alert("Failed to delete image");
         }
      } catch (error) {
         console.error("Delete error:", error);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center">
         <div className="w-full max-w-[50rem] px-4 mb-4 translate-y-[2rem]">
            <button
               onClick={() => navigate(-1)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
               ← Back
            </button>
         </div>
         <form
            className="border p-4 flex flex-col w-[50rem] translate-y-[5rem] bg-gray-900 items-center mb-[8rem] text-center rounded-3xl"
            onSubmit={handleUpload}>
            <div className="text-4xl text-white font-bold text-center">About Images</div>
            <input
               className="mt-6 bg-white mb-4 text-black"
               type="file"
               onChange={(e) => setFile(e.target.files[0])}
               required
            />
            <button className="pushable" type="submit">
               <span className="shadow"></span>
               <span className="edge"></span>
               <span className="front">Upload Image</span>
            </button>
         </form>
         <div className="w-[50rem]mt-6 grid grid-cols-4 gap-4">
            {images.length > 0 ? (
               images.map((image) => (
                  <div
                     key={image._id}
                     className="relative bg-white p-2 rounded-lg shadow-md flex items-center space-x-2">
                     <img
                        src={image.imageUrl}
                        alt={image.alt || `Preview of ${image.title || "image"}`}
                        className="w-16 h-16 object-cover rounded-md"
                     />
                     <button
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                        onClick={() => handleDelete(image._id)}>
                        Delete
                     </button>
                  </div>
               ))
            ) : (
               <p className="text-gray-500 col-span-4 text-center">
                  No images available.
               </p>
            )}
         </div>
         <div>
            <AboutClub></AboutClub>
         </div>
      </div>
   );
};

// Added prop validation
AboutImage.propTypes = {
   onUploadSuccess: PropTypes.func.isRequired,
};

export default AboutImage;
