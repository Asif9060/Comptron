import { useEffect, useState } from "react";
import ValidationControl from "../USER/ValidationControl";
import AdminPasswordResetPage from "../USER/PasswordReset";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ New state for search

  const [editFormData, setEditFormData] = useState({
    name: "",
    customId: "",
    skills: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    cv: "",
    image: "",
  });

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users.");
      });
  }, []);

  const handleDelete = async (customId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `https://comptron-server-2.onrender.com/api/users/delete/${customId}`,
          { method: "DELETE" }
        );
        if (!response.ok)
          throw new Error(`Failed to delete. Status: ${response.status}`);

        setSuccess("User deleted successfully.");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.customId !== customId)
        );
      } catch (err) {
        setError(err.message || "Failed to delete user");
      }
    }
  };

  const startEdit = (user) => {
    setEditUserId(user.customId);
    setEditFormData({
      name: user.name || "",
      customId: user.customId || "",
      skills: user.skills || "",
      linkedIn: user.linkedIn || "",
      github: user.github || "",
      portfolio: user.portfolio || "",
      cv: user.cv || "",
      image: user.image || "",
    });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditFormData({
      name: "",
      customId: "",
      skills: "",
      linkedIn: "",
      github: "",
      portfolio: "",
      cv: "",
      image: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://comptron-server-2.onrender.com/api/users/update/${editUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.customId === editUserId ? updatedUser : user
        )
      );
      setSuccess("User updated successfully.");
      cancelEdit();
    } catch (err) {
      setError(err.message || "Failed to update user");
    }
  };

  // ✅ Filter users based on name or ID
  const filteredUsers = users.filter((user) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerSearch) ||
      user.customId.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="min-h-screen bg-[#111] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {/* ✅ Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-3 w-1/2 bg-[#222] rounded-lg border border-[#444] text-white"
        />
      </div>
      <div className="flex items-center gap-18 mb-5 justify-center">
        <div>
          <ValidationControl></ValidationControl>
        </div>
        <div>
          <AdminPasswordResetPage></AdminPasswordResetPage>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="space-y-6 flex flex-col items-center">
        {filteredUsers.map((user) => (
          <div
            key={user.customId}
            className="bg-[#1c1c1e] p-4 rounded-lg w-1/2 gap-4"
          >
            {editUserId === user.customId ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="bg-[#333] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="customId"
                    value={editFormData.customId}
                    disabled
                    className="bg-[#444] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="skills"
                    value={editFormData.skills}
                    onChange={handleEditChange}
                    placeholder="Skills (comma separated)"
                    className="bg-[#333] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="linkedIn"
                    value={editFormData.linkedIn}
                    onChange={handleEditChange}
                    placeholder="LinkedIn URL"
                    className="bg-[#333] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="github"
                    value={editFormData.github}
                    onChange={handleEditChange}
                    placeholder="GitHub URL"
                    className="bg-[#333] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="portfolio"
                    value={editFormData.portfolio}
                    onChange={handleEditChange}
                    placeholder="Portfolio URL"
                    className="bg-[#333] text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    name="cv"
                    value={editFormData.cv}
                    onChange={handleEditChange}
                    placeholder="CV URL"
                    className="bg-[#333] text-white p-2 rounded col-span-2"
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Custom ID:</strong> {user.customId}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    onClick={() => startEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(user.customId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
