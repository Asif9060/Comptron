import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    skills: "",
    email: "",
    phone: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`https://comptron-server-2.onrender.com/api/users/profile/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUser({
          name: data.name || "",
          skills: data.skills || "",
          email: data.email || "",
          phone: data.phone || "",
        });
        setImage(data.image || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load profile. Please check the user ID.");
        setLoading(false);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      name: user.name,
      skills: user.skills,
      email: user.email,
      phone: user.phone,
      image: image || "",
      linkedIn: user.linkedIn,
      github: user.github,
      portfolio: user.portfolio,
      cv: user.cv,
    };

    try {
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      setUser({
        name: data.name || "",
        skills: data.skills || "",
        email: data.email || "",
        phone: data.phone || "",
      });
      setImage(data.image || null);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.message.includes("User not found")
          ? "User not found. Please verify the profile ID."
          : err.message || "Failed to update profile"
      );
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          `https://comptron-server-2.onrender.com/api/users/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        setSuccess("Account deleted successfully.");
        setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
      } catch (err) {
        console.error("Delete error:", err);
        setError(err.message || "Failed to delete account");
      }
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111] text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f] p-8 flex justify-center">
      <div className="bg-[#1c1c1e] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              value={user.skills}
              onChange={(e) => setUser({ ...user, skills: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your skills"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={user.linkedIn || ""}
              onChange={(e) => setUser({ ...user, linkedIn: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              value={user.github || ""}
              onChange={(e) => setUser({ ...user, github: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              placeholder="https://github.com/yourusername"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Portfolio URL
            </label>
            <input
              type="url"
              value={user.portfolio || ""}
              onChange={(e) => setUser({ ...user, portfolio: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              placeholder="https://yourportfolio.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CV URL</label>
            <input
              type="url"
              value={user.cv || ""}
              onChange={(e) => setUser({ ...user, cv: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              placeholder="https://drive.google.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Delete Account Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
