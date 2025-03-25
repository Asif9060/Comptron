import { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../services/memberService";

const MemberList = ({onEdit}) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers();   
    }, []);

    const fetchMembers = async () => {
        const data = await getMembers();
        setMembers(data);
    };

    const handleDelete = async (id) => {
        await deleteMember(id);
        fetchMembers();
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Committee Members</h2>
            <ul className="">
                {members.map(member => (
                    <li className="flex gap-11" key={member._id}>
                        <strong className="p-2 bg-white text-black" >{member.name}</strong>
                        <button className="text-white p-2 rounded bg-[#15A6E1]" onClick={() => onEdit(member)}>Edit</button>
                        <button className="text-white p-2 rounded bg-[#15A6E1]" onClick={() => handleDelete(member._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            
        </div>
    );
};

export default MemberList;
