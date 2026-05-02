import { useEffect, useState } from "react";

const PastMembersAdmin = () => {
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [studentId, setStudentId] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const API_URL = "https://comptron-server-2.onrender.com";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/past-members`);
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVUpload = async () => {
    if (!file) return alert("Select a CSV file");
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/api/past-members/upload-csv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Upload failed");
      }

      const data = await res.json();
      setSuccess(`Successfully uploaded ${data.count} members`);
      setFile(null);
      await fetchMembers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!name || !year) return alert("Name and year are required");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/past-members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, year, studentId, image, bio }),
      });

      if (!res.ok) throw new Error("Failed to add member");

      setSuccess("Member added successfully");
      setName("");
      setRole("");
      setYear("");
      setStudentId("");
      setImage("");
      setBio("");
      await fetchMembers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm("Delete this member?")) return;

    try {
      const res = await fetch(`${API_URL}/api/past-members/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setSuccess("Member deleted");
      await fetchMembers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBatchDelete = async () => {
    if (!confirm("Are you sure you want to delete ALL past members? This cannot be undone!")) return;
    if (!confirm("This will delete " + members.length + " members permanently. Are you absolutely sure?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/api/past-members/delete-all`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete all members");

      const data = await res.json();
      setSuccess(`All ${data.deletedCount} members have been deleted`);
      await fetchMembers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#1E2939] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Past Members Administration</h1>

      {error && <div className="bg-red-900 text-red-200 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-900 text-green-200 p-3 rounded mb-4">{success}</div>}

      {/* CSV Upload */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
        <div className="mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white file:cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">CSV columns: name, role, year, image (optional), bio (optional)</p>
        </div>
        <button
          onClick={handleCSVUpload}
          disabled={loading || !file}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-medium"
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {/* Add Single Member */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Single Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Year (e.g. 2023-24)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
          rows="3"
        />
        <button
          onClick={handleAddMember}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-medium"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </div>

      {/* Members List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Past Members ({members.length})</h2>
          {members.length > 0 && (
            <button
              onClick={handleBatchDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded text-white font-medium text-sm"
            >
              {loading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {members.length === 0 ? (
          <p className="text-gray-400">No members found</p>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Student ID</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3">Year</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-3">{m.name}</td>
                    <td className="p-3 font-mono text-green-400">{m.studentId || "—"}</td>
                    <td className="p-3 text-gray-300">{m.role || "—"}</td>
                    <td className="p-3 font-mono text-blue-400">{m.year}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteMember(m._id)}
                        className="text-red-400 hover:text-red-300 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastMembersAdmin;
