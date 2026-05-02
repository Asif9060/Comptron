import { useEffect, useState } from "react";

const PastCommittee = () => {
  const [byYear, setByYear] = useState({});
  const [filter, setFilter] = useState("");
  const [mode, setMode] = useState("members"); // or 'advisors'

  useEffect(() => {
    const base = mode === "members" ? "/api/members/assigned/byYear" : "/api/advisory/assigned/byYear";
    fetch(base)
      .then((r) => r.json())
      .then((d) => setByYear(d))
      .catch((e) => console.error(e));
  }, [mode]);

  const years = Object.keys(byYear).sort().reverse();
  const displayed = filter ? { [filter]: byYear[filter] || [] } : byYear;

  return (
    <div className="min-h-screen bg-[#0f1724] text-white py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Past {mode === 'members' ? 'Committee Members' : 'Advisors'}</h1>
        <div className="mb-6 flex justify-center gap-2">
          <button onClick={() => setMode('members')} className={`px-4 py-2 rounded font-medium transition ${mode==='members' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>Members</button>
          <button onClick={() => setMode('advisors')} className={`px-4 py-2 rounded font-medium transition ${mode==='advisors' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>Advisors</button>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">Filter by Year</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none">
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {Object.keys(displayed).length === 0 && <p className="text-center text-gray-400">No past {mode === 'members' ? 'committee members' : 'advisors'} found.</p>}
        {Object.entries(displayed).map(([yr, members]) => (
          <div key={yr} className="mb-6 bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">{yr}</h2>
            <ul className="space-y-3">
              {members.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 pb-3 border-b border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <div className="font-medium text-white">{m.name}</div>
                    <div className="text-sm text-gray-400">{m.role}</div>
                  </div>
                  {m.image && <img src={m.image} alt={m.name} className="h-10 w-10 rounded-full object-cover flex-shrink-0" />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastCommittee;
