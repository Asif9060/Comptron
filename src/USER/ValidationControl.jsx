import { useState } from "react";

const ValidationControl = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleValidation = async () => {
    try {
      const res = await fetch(`https://comptron-server-2.onrender.com/api/users/validate/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(
          `✅ ${data.user.name} validated until ${new Date(
            data.user.validityDate
          ).toLocaleDateString()}.\n🆔 New ID: ${data.user.customId}`
        );
        setId(data.user.customId); // update input box with new ID
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Failed to update validation.");
    }
  };

  return (
    <div className="p-10 text-white max-w-lg translate-x-[25rem] translate-y-[-25rem] text-center border rounded-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Member Validation Control</h1>
      <input
        type="text"
        placeholder="Enter Custom ID (e.g., CM2025-1234)"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-800 rounded"
      />
      <button
        onClick={handleValidation}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Validate for 1 Year
      </button>
      {message && (
        <p className="mt-4 whitespace-pre-line text-green-400">{message}</p>
      )}
    </div>
  );
};

export default ValidationControl;
