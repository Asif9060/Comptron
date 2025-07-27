import { useState } from "react";
import axios from "axios";

export default function CommitteeValidation() {
  const [customId, setCustomId] = useState("");
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get(
        `https://comptron-server-2.onrender.com/api/members/${customId}`
      );
      setMember(res.data);
    } catch (err) {
      setMessage("Member not found.");
      setMember(null);
    }
    setLoading(false);
  };

  const handleValidation = async (isValid) => {
    if (!member) {
      return;
    }
  
    try {
      let validityDate = null;
  
      if (isValid) {
        
        const startDate = new Date("2025-02-23");
  
        
        validityDate = new Date(startDate);
        validityDate.setFullYear(startDate.getFullYear() + 1);
      }
  
      const res = await axios.put(
        `https://comptron-server-2.onrender.com/api/members/validity/${customId}`,
        {
          isValid,
          validityDate: validityDate,
        }
      );
  
      setMember(res.data);
      setMessage(`Member marked as ${isValid ? "Valid" : "Invalid"}`);
    } catch (err) {
      setMessage("Error updating member status.");
    }
  };

  return (
    <div className="p-6 w-full mt-5 text-white flex flex-col items-center mx-auto bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Validate Committee Member</h1>
      <input
        type="text"
        placeholder="Enter Custom ID"
        value={customId}
        onChange={(e) => setCustomId(e.target.value)}
        className="w-3/6 p-2 border text-white bg-gray-800 text-center rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {member && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
          <p>
            <strong>Email:</strong> {member.email}
          </p>
          <p>
            <strong>Phone:</strong> {member.phone}
          </p>
          <p>
            <strong>Role:</strong> {member.role}
          </p>
          <p>
            <strong>Valid:</strong> {member.isValid ? "Yes ✅" : "No ❌"}
          </p>
          <p>
            <strong>Validity Date:</strong> {member.validityDate || "N/A"}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleValidation(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Mark as Valid
            </button>
            <button
              onClick={() => handleValidation(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Mark as Invalid
            </button>
          </div>
        </div>
      )}

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
