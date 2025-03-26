import { useEffect, useState } from "react";
import { addMember, updateMember } from "../services/memberService"; // Import API functions

const AddMemberForm = ({
  onMemberAdded,
  selectedMember,
  setSelectedMember,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [socials, setSocials] = useState({ github: "", linkedin: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedMember) {
      setName(selectedMember.name || "");
      setRole(selectedMember.role || "");
      setEmail(selectedMember.email || "");
      setBio(selectedMember.bio || "");
      setSocials(selectedMember.socials || { github: "", linkedin: "" });
      setImage(null); // Don't pre-fill image field
    }
  }, [selectedMember]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = { name, role, email, bio, socials, image };

    try {
      if (selectedMember) {
        // ✅ Update an existing member instead of adding a new one
        await updateMember(selectedMember._id, memberData);
        setSelectedMember(null); // Reset form after updating
      } else {
        // ✅ Add a new member if no selectedMember
        await addMember(memberData);
      }

      onMemberAdded(); // Refresh member list after action
      resetForm(); // Reset form fields
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setEmail("");
    setBio("");
    setSocials({ github: "", linkedin: "" });
    setImage(null);
  };

  return (
    <form className="flex gap-[2rem] justify-center mt-12" onSubmit={handleSubmit}>
      <input
        className="text-black bg-white"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
      className="text-black bg-white"
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      {/* <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="GitHub URL"
        value={socials.github}
        onChange={(e) => setSocials({ ...socials, github: e.target.value })}
      /> */}
      <input
        type="text"
        className="text-black bg-white"
        placeholder="Facebook URL"
        value={socials.linkedin}
        onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
      />
      <input className="text-black bg-white" type="file" accept="image/*" onChange={handleImageChange} />

      <button className="text-black rounded p-2 bg-white" type="submit">
        {selectedMember ? "Update Member" : "Add Member"}
      </button>
      {selectedMember && (
        <button type="button" onClick={() => setSelectedMember(null)}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default AddMemberForm;