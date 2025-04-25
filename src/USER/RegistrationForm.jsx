import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // helper function provided below
import { userAuth, createUserWithEmailAndPassword } from "./FirebaseUser";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    gender: "",
    image: "",
    password: "",
  });

  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRawImage(reader.result);
        setCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropDone = async () => {
    try {
      const croppedImage = await getCroppedImg(rawImage, croppedAreaPixels);
      setFormData({ ...formData, image: croppedImage });
      setCropping(false);
    } catch (e) {
      console.error("Cropping failed", e);
    }
  };

  const handleSendOtp = async () => {
    setErrorMessage("");
    if (!formData.email)
      return setErrorMessage("Email is required to send OTP.");
    try {
      const res = await fetch(
        "https://comptron-server-2.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        setErrorMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setErrorMessage("Error sending OTP.");
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const verify = await fetch(
        "https://comptron-server-2.onrender.com/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, code: otp }),
        }
      );
      const result = await verify.json();
      if (!verify.ok) throw new Error(result.message || "OTP failed");

      const userCredential = await createUserWithEmailAndPassword(
        userAuth,
        formData.email,
        formData.password
      );

      const response = await fetch(
        "https://comptron-server-2.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            firebaseUserId: userCredential.user.uid,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Registered! Your ID: ${data.customId}`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          gender: "",
          image: "",
          password: "",
        });
        setOtp("");
        setOtpSent(false);
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Registration failed.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Registration error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-[#1C1C1C] rounded-xl shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <form onSubmit={handleVerifyAndRegister} className="flex flex-col gap-4">
        {/* Other inputs */}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        />
        <input
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 bg-[#2a2a2a] rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 bg-[#2a2a2a] rounded"
        />

        {cropping && rawImage && (
          <div className="relative w-full h-64 bg-black">
            <Cropper
              image={rawImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button
              type="button"
              onClick={handleCropDone}
              className="absolute bottom-2 right-2 bg-green-600 px-3 py-1 rounded text-sm"
            >
              Done
            </button>
          </div>
        )}

        {formData.image && !cropping && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        )}

        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-blue-600 py-2 rounded-lg"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="p-2 bg-[#2a2a2a] rounded"
            />
            <button
              type="submit"
              className="bg-green-600 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "Verify & Register"}
            </button>
          </>
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
