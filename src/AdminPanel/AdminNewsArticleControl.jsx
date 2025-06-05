import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaUpload, FaImage, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const AdminNewsArticleControl = () => {
   const navigate = useNavigate();
   const [newsArticles, setNewsArticles] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [uploadingImage, setUploadingImage] = useState(false);
   const [previewImage, setPreviewImage] = useState(null);
   
   // Form state
   const [title, setTitle] = useState("");
   const [summary, setSummary] = useState("");
   const [content, setContent] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [images, setImages] = useState([]); // Array of image URLs
   const [author, setAuthor] = useState("");
   const [editingId, setEditingId] = useState(null);

   // Refs
   const fileInputRef = useRef(null);
   const additionalImagesRef = useRef(null);

   useEffect(() => {
      fetchNewsArticles();
   }, []);

   const fetchNewsArticles = async () => {
      setLoading(true);
      try {
         const response = await fetch("https://comptron-server-2.onrender.com/api/news-articles");
         if (!response.ok) {
            throw new Error("Failed to fetch news articles");
         }
         const data = await response.json();
         setNewsArticles(data.data || []);
      } catch (err) {
         setError(err.message);
         console.error("Error fetching news articles:", err);
      } finally {
         setLoading(false);
      }
   };

   const resetForm = () => {
      setTitle("");
      setSummary("");
      setContent("");
      setThumbnail("");
      setImages([]);
      setAuthor("");
      setEditingId(null);
      setPreviewImage(null);
   };

   const handleImageUpload = async (file, isMainThumbnail = true) => {
      if (!file) return null;
      
      const formData = new FormData();
      formData.append("image", file);
      
      try {
         setUploadingImage(true);
         const response = await fetch("https://comptron-server-2.onrender.com/api/news-articles/upload", {
            method: "POST",
            body: formData,
         });
         
         if (!response.ok) {
            throw new Error("Failed to upload image");
         }
         
         const data = await response.json();
         
         if (isMainThumbnail) {
            setThumbnail(data.data.url);
            setPreviewImage(data.data.url);
         } else {
            setImages(prev => [...prev, data.data.url]);
         }
         
         return data.data.url;
      } catch (err) {
         setError("Error uploading image: " + err.message);
         console.error("Error uploading image:", err);
         return null;
      } finally {
         setUploadingImage(false);
      }
   };

   const handleThumbnailClick = () => {
      fileInputRef.current.click();
   };

   const handleAdditionalImageClick = () => {
      additionalImagesRef.current.click();
   };

   const handleThumbnailChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
         // Create a preview
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result);
         };
         reader.readAsDataURL(file);
         
         // Upload to server
         await handleImageUpload(file);
      }
   };

   const handleAdditionalImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
         await handleImageUpload(file, false);
      }
   };

   const removeImage = (index) => {
      setImages(prev => prev.filter((_, i) => i !== index));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      // Validate required fields
      if (!title || !summary || !content || !thumbnail) {
         setError("Please fill in all required fields (title, summary, content, thumbnail)");
         setLoading(false);
         return;
      }

      // Prepare the article data
      const articleData = {
         title,
         summary,
         content,
         thumbnail,
         images,
         author
      };

      try {
         const method = editingId ? "PUT" : "POST";
         const url = editingId
            ? `https://comptron-server-2.onrender.com/api/news-articles/${editingId}`
            : "https://comptron-server-2.onrender.com/api/news-articles";

         const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(articleData),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save news article");
         }

         // Reset form and refresh the list
         resetForm();
         fetchNewsArticles();
      } catch (err) {
         setError(err.message);
         console.error("Error saving news article:", err);
      } finally {
         setLoading(false);
      }
   };

   const handleEdit = (article) => {
      setTitle(article.title);
      setSummary(article.summary);
      setContent(article.content);
      setThumbnail(article.thumbnail);
      setPreviewImage(article.thumbnail);
      setImages(article.images || []);
      setAuthor(article.author || "");
      setEditingId(article._id);

      // Scroll to the form
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this article?")) {
         return;
      }

      setLoading(true);
      try {
         const response = await fetch(`https://comptron-server-2.onrender.com/api/news-articles/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Failed to delete article");
         }

         fetchNewsArticles();
      } catch (err) {
         setError(err.message);
         console.error("Error deleting article:", err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
         <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
               <button
                  onClick={() => navigate(-1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                  <span>← Back</span>
               </button>
               <h1 className="text-3xl font-bold text-gray-800 hidden md:block">Manage News Articles</h1>
            </div>

            <h1 className="text-3xl font-bold text-center mb-8 md:hidden">Manage News Articles</h1>

            {error && (
               <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-md">
                  <div className="flex items-center">
                     <FaTimes className="mr-2" />
                     <p>{error}</p>
                  </div>
               </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
               <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  {editingId ? "Edit Article" : "Add New Article"}
               </h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                        <div>
                           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Title *
                           </label>
                           <input
                              type="text"
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                              Summary *
                           </label>
                           <textarea
                              id="summary"
                              value={summary}
                              onChange={(e) => setSummary(e.target.value)}
                              rows="3"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                              required
                           ></textarea>
                        </div>

                        <div>
                           <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                              Author
                           </label>
                           <input
                              type="text"
                              id="author"
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                           />
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              Thumbnail Image *
                           </label>
                           <div 
                              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={handleThumbnailClick}
                           >
                              {previewImage ? (
                                 <div className="relative">
                                    <img 
                                       src={previewImage} 
                                       alt="Thumbnail preview" 
                                       className="max-h-40 mx-auto rounded-md"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                       <span className="text-white font-medium">Change Image</span>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="py-4">
                                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">
                                       Click to upload thumbnail image
                                    </p>
                                 </div>
                              )}
                              <input
                                 type="file"
                                 ref={fileInputRef}
                                 onChange={handleThumbnailChange}
                                 accept="image/*"
                                 className="hidden"
                              />
                           </div>
                           {thumbnail && (
                              <div className="mt-1 text-sm text-gray-500 truncate">
                                 {thumbnail}
                              </div>
                           )}
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Images
                           </label>
                           <div className="grid grid-cols-3 gap-2 mb-2">
                              {images.map((img, index) => (
                                 <div key={index} className="relative group">
                                    <img 
                                       src={img} 
                                       alt={`Additional image ${index + 1}`} 
                                       className="h-20 w-full object-cover rounded-md"
                                    />
                                    <button
                                       type="button"
                                       onClick={() => removeImage(index)}
                                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                       <FaTimes size={10} />
                                    </button>
                                 </div>
                              ))}
                              <div 
                                 className="h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                 onClick={handleAdditionalImageClick}
                              >
                                 <FaPlus className="text-gray-400" />
                              </div>
                           </div>
                           <input
                              type="file"
                              ref={additionalImagesRef}
                              onChange={handleAdditionalImageChange}
                              accept="image/*"
                              className="hidden"
                           />
                        </div>
                     </div>
                  </div>

                  <div>
                     <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content *
                     </label>
                     <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-mono"
                        required
                     ></textarea>
                     <p className="text-xs text-gray-500 mt-1">HTML formatting is supported</p>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                     <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors shadow-sm">
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 shadow-md flex items-center gap-2">
                        {(loading || uploadingImage) && (
                           <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        )}
                        {loading ? "Saving..." : uploadingImage ? "Uploading..." : editingId ? "Update Article" : "Add Article"}
                     </button>
                  </div>
               </form>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
               <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">News Articles</h2>
               {loading && !newsArticles.length ? (
                  <div className="text-center py-8">
                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                     <p className="mt-2 text-gray-600">Loading articles...</p>
                  </div>
               ) : newsArticles.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                     <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                     <p className="text-gray-500 mb-2">No news articles found</p>
                     <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        <FaPlus className="mr-2" /> Add Your First Article
                     </button>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 gap-6">
                     {newsArticles.map((article) => (
                        <div key={article._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                           <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 h-48">
                                 <img
                                    src={article.thumbnail}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                       e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                    }}
                                 />
                              </div>
                              <div className="p-4 md:w-3/4">
                                 <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{article.title}</h3>
                                    <div className="flex space-x-2">
                                       <button
                                          onClick={() => handleEdit(article)}
                                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded transition-colors flex items-center gap-1">
                                          <FaEdit size={14} />
                                          <span>Edit</span>
                                       </button>
                                       <button
                                          onClick={() => handleDelete(article._id)}
                                          className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors flex items-center gap-1">
                                          <FaTrash size={14} />
                                          <span>Delete</span>
                                       </button>
                                    </div>
                                 </div>
                                 <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
                                 <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded">{article.author ? `By ${article.author}` : "No author"}</span>
                                    <span>
                                       {article.publishedAt
                                          ? format(new Date(article.publishedAt), "MMM dd, yyyy")
                                          : ""}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AdminNewsArticleControl;