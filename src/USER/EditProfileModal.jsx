import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null); // Store File object, not base64
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://comptron-server-2.onrender.com/api/users/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the File object directly
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name || "");
    formData.append("skills", user.skills || "");
    formData.append("email", user.email || "");
    formData.append("phone", user.phone || "");
    if (image) {
      formData.append("image", image); // Append the File object
    }

    try {
      console.log("Sending request to:", `https://comptron-server-2.onrender.com/api/users/profile/${id}`);
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/profile/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={user.skills || ""}
          onChange={(e) => setUser({ ...user, skills: e.target.value })}
          placeholder="Skills"
        />
        <input
          type="email"
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          value={user.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="Phone"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)} // Preview the File object
            alt="Profile"
            className="profile-image"
          />
        )}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;