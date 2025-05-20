import { useState, useContext } from "react";
import { CardsContext } from "./CardsContext";

const CommitteePanel = () => {
  const { cardsData, setCardsData } = useContext(CardsContext);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [editedMember, setEditedMember] = useState({
    imgSrc: "",
    alt: "",
    name: "",
    role: "",
    facebook: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle member selection
  const handleMemberSelect = (index) => {
    const member = cardsData[index];
    setSelectedMemberIndex(index);
    setEditedMember({ ...member });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember({ ...editedMember, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedMember({ ...editedMember, imgSrc: imageUrl });
      setSelectedFile(file);
    }
  };

  // Update the selected member and save to local storage
  const handleSave = () => {
    if (selectedMemberIndex !== null) {
      const updatedCardsData = [...cardsData];
      updatedCardsData[selectedMemberIndex] = editedMember;

      setCardsData(updatedCardsData);
      localStorage.setItem("cardsData", JSON.stringify(updatedCardsData)); // Save to local storage

      setSelectedMemberIndex(null);
      setEditedMember({ imgSrc: "", alt: "", name: "", role: "", facebook: "" });
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl text-white font-bold" >Edit Committee Member</h2>
      <div>
        <select
          onChange={(e) => handleMemberSelect(Number(e.target.value))}
          value={selectedMemberIndex ?? ""}
          className="border text-white p-2 pointer mr-2"
        >
          <option>
            <div >
              Select a member To modify
            </div>
          </option>
          {cardsData.map((member, index) => (
            <option className="text-black" key={index} value={index}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      {selectedMemberIndex !== null && (
        <div>
          <input
            className="text-white border p-2 mr-2"
            type="text"
            name="name"
            placeholder="Name"
            value={editedMember.name}
            onChange={handleInputChange}
          />
          <input
          className="text-white border p-2 mr-2"
            type="text"
            name="role"
            placeholder="Role"
            value={editedMember.role}
            onChange={handleInputChange}
          />
          <input
          className="text-white border p-2 mr-2"
            type="text"
            name="facebook"
            placeholder="Facebook Link"
            value={editedMember.facebook}
            onChange={handleInputChange}
          />
          <input className="text-white border p-2 mr-2 pointer" type="file" accept="image/*" onChange={handleFileChange} />
          <button className="button0 pointer" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default CommitteePanel;
