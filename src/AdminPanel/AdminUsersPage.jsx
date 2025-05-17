import { useEffect, useState } from "react";
import ValidationControl from "../USER/ValidationControl";
import AdminPasswordResetPage from "../USER/PasswordReset";
import { FaUserCheck, FaSearch, FaEdit, FaTrash, FaSave, FaTimes, FaChevronRight } from "react-icons/fa";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkValidationMessage, setBulkValidationMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);

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

  // Handle checkbox selection
  const handleSelect = (customId) => {
    setSelectedUsers(prev => {
      if (prev.includes(customId)) {
        return prev.filter(id => id !== customId);
      } else {
        return [...prev, customId];
      }
    });
  };

  // Select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      // If all are selected, deselect all
      setSelectedUsers([]);
    } else {
      // Otherwise select all
      setSelectedUsers(filteredUsers.map(user => user.customId));
    }
  };

  // Validate all selected users
  const handleBulkValidation = async () => {
    if (selectedUsers.length === 0) {
      setBulkValidationMessage("Please select users to validate.");
      return;
    }

    setIsValidating(true);
    setBulkValidationMessage("Processing...");
    let successCount = 0;
    let errorCount = 0;
    
    // Process each user validation sequentially
    for (const customId of selectedUsers) {
      try {
        const res = await fetch(`https://comptron-server-2.onrender.com/api/users/validate/${customId}`, {
          method: "PUT",
        });
        
        if (res.ok) {
          const data = await res.json();
          // Update the user in the local state
          setUsers(prev => 
            prev.map(user => user.customId === customId ? data.user : user)
          );
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
      }
    }

    // Update the message based on results
    if (errorCount === 0) {
      setBulkValidationMessage(`Successfully validated ${successCount} users.`);
      setSuccess(`Successfully validated ${successCount} users.`);
    } else {
      setBulkValidationMessage(`Validated ${successCount} users. Failed to validate ${errorCount} users.`);
      setError(`Failed to validate ${errorCount} users.`);
    }

    // Clear selection after validation
    setSelectedUsers([]);
    setIsValidating(false);
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

        {/* Search and notifications */}
        <div className="mb-6">
          <div className="relative flex items-center max-w-md mb-4 mx-auto">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {searchTerm && (
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {filteredUsers.length} results
                </div>
              )}
            </div>
          </div>
          {error && (
            <div className="text-red-600 font-bold p-3 mb-4 bg-red-100 border-l-4 border-red-500 rounded animate-fadeIn max-w-md mx-auto">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 font-bold p-3 mb-4 bg-green-100 border-l-4 border-green-500 rounded animate-fadeIn max-w-md mx-auto">
              {success}
            </div>
          )}
        </div>

        {/* Admin Controls in a separate section */}
        <div className="">
          <div className="">
            {/* <div className="">
              <ValidationControl />
            </div> */}
            {/* <div className="">
              <AdminPasswordResetPage />
            </div> */}
          </div>
        </div>

        {/* Bulk actions */}
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm mb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
                className="mr-2 h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                Select All ({selectedUsers.length}/{filteredUsers.length})
              </span>
            </div>
            
            <button
              onClick={handleBulkValidation}
              disabled={selectedUsers.length === 0 || isValidating}
              className={`px-4 py-2 rounded font-medium text-white ${
                selectedUsers.length === 0 || isValidating
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isValidating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaUserCheck className="mr-2" /> 
                  Validate Selected
                </span>
              )}
            </button>
          </div>
          
          {bulkValidationMessage && (
            <div className={`mt-3 p-2 rounded text-sm ${
              bulkValidationMessage.includes("Failed") 
                ? "text-red-600 bg-red-100" 
                : "text-green-600 bg-green-100"
            }`}>
              {bulkValidationMessage}
            </div>
          )}
        </div>

        {/* Users list - Table optimized for performance */}
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center p-6 text-gray-500">
              No users found matching your search criteria
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Select</span>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Skills
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user.customId} 
                    className={`${
                      selectedUsers.includes(user.customId) ? "bg-blue-50" : ""
                    } ${index % 2 === 0 ? "" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.customId)}
                        onChange={() => handleSelect(user.customId)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.customId}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap max-w-xs truncate">
                      <div className="text-sm text-gray-500">
                        {user.skills ? (
                          user.skills.split(',').slice(0, 2).join(', ') + 
                          (user.skills.split(',').length > 2 ? '...' : '')
                        ) : ''}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 font-medium mr-3"
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 font-medium mr-3"
                        onClick={() => handleDelete(user.customId)}
                      >
                        Delete
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 font-medium"
                        onClick={() => window.open(`/profile/${user.customId}`, '_blank')}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit modal */}
        {editUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom ID</label>
                  <input
                    type="text"
                    name="customId"
                    value={editFormData.customId}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={editFormData.skills}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedIn"
                    value={editFormData.linkedIn}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={editFormData.github}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                  <input
                    type="text"
                    name="portfolio"
                    value={editFormData.portfolio}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CV URL</label>
                  <input
                    type="text"
                    name="cv"
                    value={editFormData.cv}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
