import { useState } from "react";
<<<<<<< HEAD
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
=======
>>>>>>> 5b360adaf1e321f71c057e4eade3a49aa5a57899

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
<<<<<<< HEAD
          <div className="flex items-center text-green-400">
            <FaCheckCircle className="mr-2" />
            {`${data.user.name} validated until ${new Date(
              data.user.validityDate
            ).toLocaleDateString()}.
🆔 New ID: ${data.user.customId}`}
          </div>
        );
        setId(data.user.customId); // update input box with new ID
      } else {
        setMessage(
          <div className="flex items-center text-red-400">
            <FaExclamationCircle className="mr-2" />
            {data.message}
          </div>
        );
      }
    } catch (err) {
      setMessage(
        <div className="flex items-center text-red-400">
          <FaExclamationCircle className="mr-2" />
          Failed to update validation.
        </div>
      );
=======
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
>>>>>>> 5b360adaf1e321f71c057e4eade3a49aa5a57899
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-10 text-white flex flex-col max-w-lg bg-gray-900 text-center border border-gray-700 rounded-xl mx-auto shadow-lg">
=======
    <div className="p-10 text-white flex flex-col max-w-lg bg-gray-900 text-center border rounded-xl mx-auto">
>>>>>>> 5b360adaf1e321f71c057e4eade3a49aa5a57899
      <h1 className="text-3xl font-bold mb-4">Member Validation Control</h1>
      <input
        type="text"
        placeholder="Enter Custom ID (e.g., CM2025-1234)"
        value={id}
        onChange={(e) => setId(e.target.value)}
<<<<<<< HEAD
        className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleValidation}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
      >
        Validate for 1 Year
      </button>
      {message && <div className="mt-4 text-sm">{message}</div>}
=======
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
>>>>>>> 5b360adaf1e321f71c057e4eade3a49aa5a57899
    </div>
  );
};

export default ValidationControl;
