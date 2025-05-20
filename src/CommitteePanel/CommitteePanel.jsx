// App.js
import { useState } from "react";
import AddMemberForm from "../Components/AddMemberForm";
import MemberList from "../Components/MemberList";
import CommiteeCard from "../Components/UI/CommitteeCard";

const CommitteePanel = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div>
      <AddMemberForm onMemberAdded={() => setRefresh(!refresh)} selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
      <MemberList key={refresh} onEdit={setSelectedMember} />
      <CommiteeCard></CommiteeCard>
    </div>
  );
};

export default CommitteePanel;
