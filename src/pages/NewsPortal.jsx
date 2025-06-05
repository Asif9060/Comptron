import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import logo from "../assets/images/Comptron Logo.png";
import {
   FaCalendarAlt,
   FaUser,
   FaNewspaper,
   FaSearch,
   FaExclamationTriangle,
} from "react-icons/fa";

const NewsPortal = () => {
   const [newsArticles, setNewsArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredArticles, setFilteredArticles] = useState([]);

   useEffect(() => {
      const fetchNewsArticles = async () => {
         try {
            const response = await fetch(
               "https://comptron-server-2.onrender.com/api/news-articles"
            );

            if (!response.ok) {
               throw new Error("Failed to fetch news articles");
            }

            const data = await response.json();
            setNewsArticles(data.data);
            setFilteredArticles(data.data);
            setLoading(false);
         } catch (error) {
            setError(error.message);
            setLoading(false);
         }
      };

      fetchNewsArticles();
   }, []);

   useEffect(() => {
      if (searchTerm.trim() === "") {
         setFilteredArticles(newsArticles);
         return;
      }

      const filtered = newsArticles.filter(
         (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.author &&
               article.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredArticles(filtered);
   }, [searchTerm, newsArticles]);

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading news articles...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
               <div className="flex items-center">
                  <FaExclamationTriangle className="h-6 w-6 mr-2" />
                  <p>Error: {error}</p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 flex">
         {/* Sidebar */}
         <div className="w-16 md:w-20 bg-white shadow-md flex flex-col items-center py-4 fixed h-full">
            {/* Logo */}
            <Link
               to="/"
               className="p-2 w-[4rem] rounded-lg hover:bg-blue-50 transition-colors mb-8">
               <img src={logo} alt="" />
            </Link>

            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-6">
               <Link
                  to="/"
                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors group relative"
                  title="Home">
                  <svg
                     className="w-6 h-6 text-gray-600 group-hover:text-blue-600"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                     />
                  </svg>
               </Link>

               <Link
                  to="/News"
                  className="p-2 rounded-lg bg-blue-50 transition-colors group relative"
                  title="News">
                  <FaNewspaper className="w-6 h-6 text-blue-600" />
               </Link>

               <Link
                  to="/Events"
                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors group relative"
                  title="Events">
                  <svg
                     className="w-6 h-6 text-gray-600 group-hover:text-blue-600"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                     />
                  </svg>
               </Link>

               <Link
                  to="/About"
                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors group relative"
                  title="About">
                  <svg
                     className="w-6 h-6 text-gray-600 group-hover:text-blue-600"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
               </Link>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 pl-16 md:pl-20">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                     <FaNewspaper className="mr-3 text-blue-600 hidden md:block" />
                     Comptron News
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     Stay updated with the latest news, announcements, and stories from
                     our community.
                  </p>
               </div>

               <div className="max-w-xl mx-auto mb-10">
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                     </div>
                     <input
                        type="text"
                        placeholder="Search articles by title, summary, or author..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
               </div>

               {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                     {filteredArticles.map((article) => (
                        <Link
                           to={`/news/${article._id}`}
                           key={article._id}
                           className="block transition-all duration-300 hover:scale-105 hover:shadow-xl">
                           <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                              <div className="relative pb-[56.25%] overflow-hidden">
                                 <img
                                    src={article.thumbnail}
                                    alt={article.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    onError={(e) => {
                                       e.target.src =
                                          "https://via.placeholder.com/600x400?text=Image+Not+Available";
                                    }}
                                 />
                              </div>

                              <div className="p-6 flex-grow flex flex-col">
                                 <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                                    {article.title}
                                 </h2>
                                 <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                    {article.summary}
                                 </p>
                                 <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t">
                                    {article.author && (
                                       <div className="flex items-center">
                                          <FaUser className="mr-1 text-blue-500" />
                                          <span>{article.author}</span>
                                       </div>
                                    )}
                                    {article.publishedAt && (
                                       <div className="flex items-center">
                                          <FaCalendarAlt className="mr-1 text-blue-500" />
                                          <time dateTime={article.publishedAt}>
                                             {format(
                                                new Date(article.publishedAt),
                                                "MMM dd, yyyy"
                                             )}
                                          </time>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-16 bg-white rounded-lg shadow-md">
                     <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                     {searchTerm ? (
                        <>
                           <p className="text-gray-700 text-xl mb-2">
                              No articles match your search
                           </p>
                           <p className="text-gray-500">
                              Try different keywords or clear your search
                           </p>
                           <button
                              onClick={() => setSearchTerm("")}
                              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Clear Search
                           </button>
                        </>
                     ) : (
                        <p className="text-gray-700 text-xl">
                           No news articles available at this time.
                        </p>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default NewsPortal;
