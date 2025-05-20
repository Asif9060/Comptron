import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const CommitteeByYear = () => {
  const [committeeByYear, setCommitteeByYear] = useState({});
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/members/byYear")
      .then((res) => res.json())
      .then((data) => setCommitteeByYear(data))
      .catch((err) => console.error(err));
  }, []);

  const downloadCSV = (year) => {
    const members = committeeByYear[year];
    if (!members || members.length === 0) return;

    const csvContent = [
      ["ID", "Name", "Role"],
      ...members.map((member) => [member.id, member.name, member.role]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `committee_${year-1}.csv`);
  };

  const filteredCommitteeByYear = filterYear
    ? { [filterYear]: committeeByYear[filterYear] }
    : committeeByYear;

  return (
    <div className="min-h-screen w-1/2 bg-[#1E2939] text-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Committee Members by Year</h1>
        <div className="mb-6">
          <label htmlFor="yearFilter" className="block text-gray-400 mb-2">Filter by Year:</label>
          <select
            id="yearFilter"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {Object.keys(committeeByYear).map((year) => (
              <option key={year} value={year}>{year - 1}</option>
            ))}
          </select>
        </div>
        {Object.keys(filteredCommitteeByYear).length > 0 ? (
          Object.entries(filteredCommitteeByYear).map(([year, members]) => (
            <div key={year} className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-400">Year: {year - 1}</h3>
                <button
                  onClick={() => downloadCSV(year)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Download CSV
                </button>
              </div>
              <ul className="divide-y divide-gray-700">
                {members.map((member) => (
                  <li key={member.id} className="py-2 flex items-center justify-between">
                    <span className="text-white  font-medium">{member.name}</span>
                    <span className="text-gray-400 text-sm">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No committee members found for any year.</p>
        )}
      </div>
    </div>
  );
};

export default CommitteeByYear;