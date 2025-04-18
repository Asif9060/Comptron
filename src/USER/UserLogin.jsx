// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAuth } from "./FirebaseUser";
import { useParams } from "react-router-dom"; // Your Firebase initialization file

const UserLogin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase login
      await signInWithEmailAndPassword(userAuth, email, password);

      // ✅ Fetch user by email from backend
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/getByEmail/${email}`
      );
      const data = await response.json();

      if (response.ok && data.customId) {
        localStorage.setItem("customId", data.customId);
        navigate(`/profile/${data.customId}`);
      } else {
        setError("User not found or missing ID.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] p-8 flex justify-center items-center">
      <div className="bg-[#1c1c1e] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/Reset")}
              className="text-sm text-blue-400 cursor-pointer hover:underline"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/Register")}
              className="text-sm text-blue-400 ml-5 cursor-pointer hover:underline"
              type="button"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
