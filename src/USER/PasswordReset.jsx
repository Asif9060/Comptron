import { useState } from "react";
import { sendPasswordResetEmail, userAuth } from "./FirebaseUser"; // Import the function and auth object

const AdminPasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(userAuth, email);
      setSuccessMessage("Password reset email sent successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Failed to send password reset email.");
    }
  };

  return (
    <div className="p-9.5 w-[30rem] h-[15.9rem] mx-auto bg-[#1C1C1C] rounded-xl border shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Send Password Reset
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Enter User's Email"
          className="p-2 rounded bg-[#2a2a2a]"
          value={email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 text-lg"
        >
          Send Reset Email
        </button>

        {/* Success or Error Messages */}
        {successMessage && (
          <div className="text-green-400 text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-400 text-center">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default AdminPasswordResetPage;
