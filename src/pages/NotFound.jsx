import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-6xl font-bold text-red-500">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 