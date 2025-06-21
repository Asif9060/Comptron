import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaImage } from "react-icons/fa";

const NewsDetails = () => {
   const { newsId } = useParams();
   const [article, setArticle] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [activeImage, setActiveImage] = useState(null);
   const [showLightbox, setShowLightbox] = useState(false);

   useEffect(() => {
      const fetchArticle = async () => {
         try {
            const response = await fetch(
               `https://comptron-server-2.onrender.com/api/news-articles/${newsId}`
            );

            if (!response.ok) {
               throw new Error("Failed to fetch article");
            }

            const data = await response.json();
            setArticle(data.data);
            setLoading(false);
         } catch (error) {
            setError(error.message);
            setLoading(false);
         }
      };

      if (newsId) {
         fetchArticle();
      }
   }, [newsId]);

   const openLightbox = (image) => {
      setActiveImage(image);
      setShowLightbox(true);
      document.body.style.overflow = "hidden";
   };

   const closeLightbox = () => {
      setShowLightbox(false);
      document.body.style.overflow = "auto";
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
               <div className="flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                     />
                  </svg>
                  <p>Error: {error}</p>
               </div>
            </div>
         </div>
      );
   }

   if (!article) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md max-w-md">
               <div className="flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                     />
                  </svg>
                  <p>Article not found</p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
         <div className="max-w-6xl mx-auto px-4">
            <Link
               to="/news"
               className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors group">
               <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
               <span>Back to News</span>
            </Link>

            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
               {/* Header Image */}
               <div className="w-full h-[300px] md:h-[400px] lg:h-full bg-gray-100 flex justify-center items-center overflow-hidden">
                  <img
                     src={article.thumbnail}
                     alt={article.title}
                     className="w-full h-full object-contain lg:object-contain"
                     onError={(e) => {
                        e.target.src =
                           "https://via.placeholder.com/1200x600?text=Image+Not+Available";
                     }}
                  />
               </div>

               {/* Article Content */}
               <div className="p-5 md:p-8 lg:p-10">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-4">
                     {article.publishedAt && (
                        <div className="flex items-center">
                           <FaCalendarAlt className="mr-2 text-blue-500" />
                           <time dateTime={article.publishedAt}>
                              {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
                           </time>
                        </div>
                     )}
                     {article.author && (
                        <div className="flex items-center">
                           <FaUser className="mr-2 text-blue-500" />
                           <span dangerouslySetInnerHTML={{ __html: article.author }}></span>
                        </div>
                     )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-gray-800 leading-tight"
                     dangerouslySetInnerHTML={{ __html: article.title }}>
                  </h1>

                  {/* Summary */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 lg:p-6 mb-6 lg:mb-8 rounded-r">
                     <p className="text-lg lg:text-xl text-gray-700 italic"
                        dangerouslySetInnerHTML={{ __html: article.summary }}>
                     </p>
                  </div>

                  {/* Main Content */}
                  <div className="prose prose-lg lg:prose-xl max-w-none mb-8 lg:mb-10">
                     <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>

                  {/* Image Gallery */}
                  {article.images && article.images.length > 0 && (
                     <div className="mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-gray-200">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 flex items-center text-gray-800">
                           <FaImage className="mr-2 text-blue-500" />
                           <span>Image Gallery</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                           {article.images.map((image, index) => (
                              <div
                                 key={index}
                                 className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105"
                                 onClick={() => openLightbox(image)}>
                                 <img
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                       e.target.src =
                                          "https://via.placeholder.com/400x400?text=Image+Not+Available";
                                    }}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </article>
         </div>

         {/* Lightbox */}
         {showLightbox && (
            <div
               className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
               onClick={closeLightbox}>
               <div className="relative max-w-6xl max-h-[90vh] w-full">
                  <button
                     className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                     onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                     }}>
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M6 18L18 6M6 6l12 12"></path>
                     </svg>
                  </button>
                  <img
                     src={activeImage}
                     alt="Enlarged view"
                     className="max-h-[90vh] max-w-full mx-auto object-contain"
                     onClick={(e) => e.stopPropagation()}
                     onError={(e) => {
                        e.target.src =
                           "https://via.placeholder.com/1200x800?text=Image+Not+Available";
                     }}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default NewsDetails;
