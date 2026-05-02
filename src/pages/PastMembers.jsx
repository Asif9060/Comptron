import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const PastMembers = () => {
  const [byYear, setByYear] = useState({});
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://comptron-server-2.onrender.com/api/past-members/byYear")
      .then((r) => r.json())
      .then((d) => {
        setByYear(d);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const years = Object.keys(byYear).sort().reverse();
  const displayed = filter ? { [filter]: byYear[filter] || [] } : byYear;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1724] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1724] text-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Past Members</h1>

        {error && <div className="bg-red-900 text-red-200 p-3 rounded mb-6">{error}</div>}

        {years.length > 0 && (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Filter by Year</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-64 p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}

        {Object.keys(displayed).length === 0 ? (
          <div className="text-center text-gray-400 py-12">No past members found.</div>
        ) : (
          Object.entries(displayed).map(([yr, members]) => (
            <div key={yr} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">{yr}</h2>
              
              {/* Column Headers */}
              <div className="bg-gray-700 p-4 rounded-t-lg border border-gray-600 grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300 mb-0">
                <div className="col-span-1"></div>
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Student ID</div>
                <div className="col-span-3">Year/Semester</div>
                <div className="col-span-2">Role</div>
              </div>
              
              {/* List Items */}
              <div className="space-y-0 border border-t-0 border-gray-600 rounded-b-lg overflow-hidden">
                {members.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`p-4 hover:bg-gray-750 transition grid grid-cols-12 gap-4 items-center ${
                      idx !== members.length - 1 ? "border-b border-gray-700" : ""
                    }`}
                  >
                    <div className="col-span-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="col-span-3 min-w-0">
                      <h3 className="font-semibold text-white truncate">{m.name}</h3>
                    </div>
                    <div className="col-span-3 min-w-0">
                      <p className="text-sm text-green-400 font-mono truncate">{m.studentId || "—"}</p>
                    </div>
                    <div className="col-span-3">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                        {m.role || "Member"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-300 truncate">{m.role ? "—" : "Member"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastMembers;
