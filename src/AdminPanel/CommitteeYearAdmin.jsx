import { useEffect, useState } from "react";

const CommitteeYearAdmin = () => {
	const [mode, setMode] = useState("members"); // "members" or "advisors"
	const [members, setMembers] = useState([]);
	const [assignments, setAssignments] = useState([]);
	const [assignmentsByYear, setAssignmentsByYear] = useState({});
	const [selectedMember, setSelectedMember] = useState("");
	const [year, setYear] = useState("");
	const [designation, setDesignation] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const API_URL = "https://comptron-server-2.onrender.com";

	const fetchEntities = async () => {
		try {
			console.log("Fetching entities for mode:", mode);
			const endpoint = mode === "members" ? "/api/members" : "/api/advisory";
			const res = await fetch(`${API_URL}${endpoint}`);
			if (!res.ok) throw new Error(`Entities fetch failed: ${res.status}`);
			const data = await res.json();
			console.log("Entities fetched:", (data && data.length) || 0);
			setMembers(data || []);
		} catch (err) {
			console.error("Error fetching entities:", err);
			setError("Failed to load entities: " + err.message);
		}
	};

	const fetchAssignments = async () => {
		try {
			console.log("Fetching assignments...");
			// Fetch raw assignments with IDs
			const base = mode === "members" ? "/api/members/assigned" : "/api/advisory/assigned";
			const res = await fetch(`${API_URL}${base}`);
			if (!res.ok) throw new Error(`Assignments fetch failed: ${res.status}`);
			const data = await res.json();
			console.log("Raw assignments fetched:", (data && data.length) || 0);
			setAssignments(data || []);

			// Fetch by-year grouped view
			const res2 = await fetch(`${API_URL}${base}/byYear`);
			if (!res2.ok) throw new Error(`By-year fetch failed: ${res2.status}`);
			const data2 = await res2.json();
			console.log("Assignments by year fetched:", Object.keys(data2).length, "years");
			setAssignmentsByYear(data2 || {});
		} catch (err) {
			console.error("Error fetching assignments:", err);
			setError("Failed to load assignments: " + err.message);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			setError(null);
			try {
				await fetchEntities();
				await fetchAssignments();
			} catch (err) {
				setError("Error loading data: " + err.message);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, [mode]);

	const assign = async () => {
		if (!selectedMember || !year) return alert("Select member/advisor and year");
		setLoading(true);
		try {
			const base = mode === "members" ? "/api/members/assigned/assign" : "/api/advisory/assigned/assign";
			const payload = mode === "members" ? { memberCustomId: selectedMember, year, designation } : { adviserCustomId: selectedMember, year, designation };
			console.log("Assigning:", payload);
			const res = await fetch(`${API_URL}${base}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (res.ok) {
				setSelectedMember("");
				setYear("");
				setDesignation("");
				await fetchAssignments();
				alert("Member assigned successfully!");
			} else {
				const err = await res.json();
				alert(err.message || "Error assigning member");
			}
		} catch (err) {
			console.error("Error:", err);
			alert("Error: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const removeAssignment = async (id) => {
		if (!confirm("Delete this assignment?")) return;
		try {
			console.log("Deleting assignment:", id);
			const base = mode === "members" ? "/api/members/assigned" : "/api/advisory/assigned";
			const res = await fetch(`${API_URL}${base}/${id}`, { method: "DELETE" });
			if (res.ok) {
				await fetchAssignments();
				alert("Assignment deleted!");
			} else {
				alert("Error deleting assignment");
			}
		} catch (err) {
			console.error("Error:", err);
			alert("Error: " + err.message);
		}
	};

	// Get entity (member/advisor) name by customId
	const getMemberName = (customId) => {
		return members.find(m => m.customId === customId)?.name || customId;
	};

	// Get all years a member is assigned to
	const getMemberYears = (customId) => {
		return assignments.filter(a => a.memberCustomId === customId).map(a => a.year);
	};

	if (loading) {
		return (
			<div className="p-6 bg-[#1E2939] text-white min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 bg-[#1E2939] text-white min-h-screen">
				<div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
					<p className="font-bold">Error</p>
					<p>{error}</p>
					<button onClick={() => window.location.reload()} className="mt-2 bg-red-700 px-4 py-2 rounded">
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-[#1E2939] text-white min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Committee Year Administration</h1>
			<div className="mb-4">
				<button onClick={() => setMode('members')} className={`px-3 py-1 mr-2 rounded ${mode==='members' ? 'bg-blue-600' : 'bg-gray-700'}`}>Members</button>
				<button onClick={() => setMode('advisors')} className={`px-3 py-1 rounded ${mode==='advisors' ? 'bg-blue-600' : 'bg-gray-700'}`}>Advisors</button>
			</div>
			
			{/* Assignment Form */}
			<div className="mb-8 bg-gray-800 p-6 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">Assign {mode === 'members' ? 'Member' : 'Advisor'} to Year</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block mb-2 text-sm font-medium">{mode==='members' ? 'Member' : 'Advisor'}</label>
						<select 
							value={selectedMember} 
							onChange={(e) => setSelectedMember(e.target.value)} 
							className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
						>
							<option value="">Select {mode === 'members' ? 'member' : 'advisor'}</option>
							{members.map((m) => (
								<option key={m.customId} value={m.customId}>
									{m.name} ({m.customId})
								</option>
							))}
						</select>
						{selectedMember && getMemberYears(selectedMember).length > 0 && (
							<p className="text-xs text-yellow-400 mt-1">
								Already assigned to: {getMemberYears(selectedMember).join(", ")}
							</p>
						)}
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Academic Year (e.g. 2025-26)</label>
						<input 
							className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
							value={year} 
							onChange={(e) => setYear(e.target.value)} 
							placeholder="2025-26"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block mb-2 text-sm font-medium">Designation (optional)</label>
					<input 
						className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
						value={designation} 
						onChange={(e) => setDesignation(e.target.value)} 
						placeholder="e.g. President, Vice President"
					/>
				</div>
				<button 
					onClick={assign} 
					disabled={loading}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded text-white font-medium transition"
				>
					{loading ? "Assigning..." : "Assign Member"}
				</button>
			</div>

			{/* Assignments by Year */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">Members by Academic Year</h2>
				{Object.keys(assignmentsByYear).length === 0 ? (
					<p className="text-gray-400">No assignments yet</p>
				) : (
					Object.entries(assignmentsByYear).map(([yr, members]) => (
						<div key={yr} className="mb-4 bg-gray-800 p-4 rounded-lg">
							<h3 className="font-bold text-lg text-blue-400 mb-3">{yr}</h3>
							<div className="space-y-2">
								{members.map((m, idx) => (
									<div key={m.id + idx} className="flex justify-between items-center bg-gray-700 p-3 rounded">
										<div className="flex items-center gap-2">
											{m.image && <img src={m.image} alt={m.name} className="w-8 h-8 rounded-full object-cover" />}
											<div>
												<div className="font-medium">{m.name}</div>
												<div className="text-xs text-gray-400">{m.role}</div>
											</div>
										</div>
										<button 
											onClick={() => {
												const assignment = assignments.find(a => a.memberCustomId === m.id && a.year === yr);
												if (assignment) removeAssignment(assignment._id);
												else alert("Could not find assignment ID");
											}}
											className="text-red-400 hover:text-red-300 text-sm font-medium"
										>
											Remove
										</button>
									</div>
								))}
							</div>
						</div>
					))
				)}
			</div>

			{/* All Assignments List (Admin View) */}
			<div>
				<h2 className="text-xl font-semibold mb-4">All Assignments (Admin View)</h2>
				{assignments.length === 0 ? (
					<p className="text-gray-400">No assignments</p>
				) : (
					<div className="bg-gray-800 rounded-lg overflow-hidden">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-700 border-b border-gray-600">
									<th className="text-left p-3">Member</th>
									<th className="text-left p-3">Year</th>
									<th className="text-left p-3">Designation</th>
									<th className="text-left p-3">Assigned</th>
									<th className="text-center p-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{assignments.map((a) => (
									<tr key={a._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
										<td className="p-3">{getMemberName(a.memberCustomId)}</td>
										<td className="p-3 font-mono text-blue-400">{a.year}</td>
										<td className="p-3">{a.designation || "—"}</td>
										<td className="p-3 text-xs text-gray-400">
											{new Date(a.assignedAt).toLocaleDateString()}
										</td>
										<td className="p-3 text-center">
											<button 
												onClick={() => removeAssignment(a._id)}
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

export default CommitteeYearAdmin;
