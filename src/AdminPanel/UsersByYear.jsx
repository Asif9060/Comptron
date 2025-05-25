import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const UsersByYear = () => {
  const [usersByYear, setUsersByYear] = useState({});
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/users/byYear")
      .then((res) => res.json())
      .then((data) => setUsersByYear(data))
      .catch((err) => console.error(err));
  }, []);
  const downloadCSV = (year) => {
    const users = usersByYear[year];
    if (!users || users.length === 0) return;

    // Define headers based on User model
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Skills",
      "Bio",
      "Student ID",
      "Blood Group",
      "Department",
      "Date of Birth",
      "Custom ID",
      "Gender",
      "LinkedIn",
      "GitHub",
      "Portfolio",
      "CV Link",
      "Validity Date",
      "Is Valid",
    ];

    const csvContent = [
      headers,
      ...users.map((user) =>
        [
          user.id,
          user.name || "",
          user.email || "",
          user.phone || "",
          user.skills || "",
          user.bio || "",
          user.studentId || "",
          user.bloodGroup || "",
          user.department || "",
          user.dateOfBirth || "",
          user.customId || "",
          user.gender || "",
          user.linkedIn || "",
          user.github || "",
          user.portfolio || "",
          user.cv || "",
          new Date(user.validityDate).toLocaleDateString() || "",
          user.isValid ? "Yes" : "No",
        ].map((cell) =>
          // Escape cells that contain commas or quotes
          typeof cell === "string" && (cell.includes(",") || cell.includes('"'))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        )
      ),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `users_${year}.csv`);
  };

  const filteredYears = filterYear
    ? Object.keys(usersByYear).filter(
        (year) => year === (parseInt(filterYear) + 1).toString()
      )
    : Object.keys(usersByYear);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Users by Year of Validation
        </h1>

        <div className="mb-6">
          <label htmlFor="filter" className="block text-lg font-medium mb-2">
            Filter by Year:
          </label>
          <input
            type="text"
            id="filter"
            placeholder="Enter year (e.g., 2025)"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredYears.length > 0 ? (
          filteredYears.map((year) => (
            <div
              key={year}
              className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-400">
                  Year: {year - 1}
                </h3>
                <button
                  onClick={() => downloadCSV(year)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Download CSV
                </button>
              </div>
              <ul className="divide-y divide-gray-700">
                {usersByYear[year].map((user) => (
                  <li
                    key={user.id}
                    className="py-2 flex items-center justify-between"
                  >
                    <span className="text-white font-medium">{user.name}</span>
                    <span className="text-gray-400 text-sm">
                      ID: {user.customId}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No users found for the selected year.</p>
        )}
      </div>
    </div>
  );
};

export default UsersByYear;
