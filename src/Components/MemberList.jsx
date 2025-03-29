import { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../services/memberService";

const MemberList = ({ onEdit }) => {
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
    <div className="flex mt-[5rem] flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Committee Members</h2>
      <ul className="space-y-5">
        {members.map((member) => (
          <li className="flex gap-5" key={member._id}>
            <img
              className="w-[3rem] translate-y-[-7px]"
              src={`https://comptron-server.onrender.com${member.image}`}
              alt={member.alt}
            />
            <strong className="p-2 h-[2.5rem] bg-white text-black rounded-sm">
              {member.name}
            </strong>
            <strong className="p-2 bg-white h-[2.5rem] text-black rounded-sm">
              {member.role}
            </strong>
            {/* <strong className="p-2 bg-white text-black">
              {member.socials.linkedin}
            </strong> */}
            <a
              href={member.socials.linkedin}
              className="cursor-pointer w-[2.3rem]  inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#0978ce"
                  d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
                />
              </svg>
            </a>

            <button
              className="text-white p-2 Btn05 w-[6.5em] h-[45px] rounded bg-[#15A6E1]"
              onClick={() => onEdit(member)}
            >
              Edit
              <svg className="svg" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
            <button
              className="button04"
              onClick={() => handleDelete(member._id)}
            >
              <div className="button-top">Delete</div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
