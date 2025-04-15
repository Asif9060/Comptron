import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebase"; // Import Firebase auth

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    image: "",
    password: "", // Add password field
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Firebase Authentication: Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password // Use password from the form
      );

      const user = userCredential.user;

      // Send data to your backend
      const response = await fetch("https://comptron-server-2.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          firebaseUserId: user.uid, // Save the Firebase user ID
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setSuccessMessage(`Registration Successful! Your ID: ${userData.customId}`);
        setFormData({ name: "", email: "", phone: "", skills: "", image: "", password: "" });
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-[#1C1C1C] rounded-xl shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 rounded bg-[#2a2a2a]"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded bg-[#2a2a2a]"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="p-2 rounded bg-[#2a2a2a]"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (e.g., React, Node.js)"
          className="p-2 rounded bg-[#2a2a2a]"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password" // Password field
          placeholder="Password"
          className="p-2 rounded bg-[#2a2a2a]"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 rounded bg-[#2a2a2a] text-gray-400"
          required
        />

        {/* Show preview if uploaded */}
        {formData.image && (
          <img src={formData.image} alt="Preview" className="rounded-full w-24 h-24 object-cover mx-auto" />
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 text-lg"
        >
          Register
        </button>

        {/* Success or Error Messages */}
        {successMessage && <div className="text-green-400 text-center">{successMessage}</div>}
        {errorMessage && <div className="text-red-400 text-center">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default RegistrationForm;
