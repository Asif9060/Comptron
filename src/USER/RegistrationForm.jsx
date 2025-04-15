import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebase"; // Your Firebase auth

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    image: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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

  const handleSendOtp = async () => {
    setErrorMessage("");
    if (!formData.email)
      return setErrorMessage("Email is required to send OTP.");

    try {
      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      setErrorMessage("Error sending OTP.");
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Verify OTP with backend
    try {
      const verifyRes = await fetch(
        "https://comptron-server-2.onrender.com/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, code: otp }),
        }
      );

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setErrorMessage(verifyData.message || "OTP verification failed.");
        return;
      }
    } catch (error) {
      setErrorMessage("OTP verification failed. Please try again.");
      return;
    }

    try {
      // Register in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Register in your MongoDB backend
      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            firebaseUserId: user.uid,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setSuccessMessage(
          `Registration successful! Your ID: ${userData.customId}`
        );
        setOtpVerified(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          image: "",
          password: "",
        });
        setOtp("");
        setOtpSent(false);
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error during registration.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-[#1C1C1C] rounded-xl shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleVerifyAndRegister} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded bg-[#2a2a2a]"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 rounded bg-[#2a2a2a]"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 rounded bg-[#2a2a2a]"
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (e.g., React, Node.js)"
          value={formData.skills}
          onChange={handleChange}
          className="p-2 rounded bg-[#2a2a2a]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 rounded bg-[#2a2a2a]"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 rounded bg-[#2a2a2a] text-gray-400"
          required
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="rounded-full w-24 h-24 object-cover mx-auto"
          />
        )}

        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-2 rounded bg-[#2a2a2a]"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Verify & Register
            </button>
          </>
        )}

        {successMessage && (
          <div className="text-green-400 text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-400 text-center">{errorMessage}</div>
        )}

        {otpVerified && (
          <button
            type="button"
            onClick={() => (window.location.href = "/UserLogin")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
          >
            Go to Login
          </button>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
