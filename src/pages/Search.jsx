import { useState, useEffect } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching from Fake API (DummyJSON)
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setMembers(data.users); // API returns data.users array
      setFilteredMembers(data.users); // initially show all
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
    } else {
      const keyword = searchTerm.toLowerCase();
      const results = members.filter(
        (member) =>
          member.firstName.toLowerCase().includes(keyword) ||
          member.lastName.toLowerCase().includes(keyword) ||
          (member.company?.department?.toLowerCase().includes(keyword)) // using department as fake skill
      );
      setFilteredMembers(results);
    }
  }, [searchTerm, members]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Search Members</h1>
      <input
        type="text"
        placeholder="Search by name or skill..."
        className="border border-gray-400 p-2 w-full rounded-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">
              {member.firstName} {member.lastName}
            </h2>
            <p className="text-gray-600 mt-2">
              Skill (Department): {member.company.department}
            </p>
            <p className="text-gray-400 text-sm">Email: {member.email}</p>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && !loading && (
        <p className="text-gray-500 mt-4">No matching members found.</p>
      )}
    </div>
  );
};

export default Search;
