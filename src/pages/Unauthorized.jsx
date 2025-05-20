import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-6xl font-bold text-amber-500">401</h1>
        <h2 className="mb-4 text-2xl font-semibold">Unauthorized Access</h2>
        <p className="mb-6 text-gray-600">
          You don't have permission to access this page. Please log in with an administrator account.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
          <Link
            to="/Dorja"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Admin Login
          </Link>
          <Link
            to="/"
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 