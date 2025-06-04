import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMember, updateMember } from "../services/memberService";
import MemberList from "./MemberList";
import CommitteeValidation from "../CommitteePanel/CommitteeValidation";
import CommitteeByYear from "../CommitteePanel/CommitteeByYear";

const AddMemberForm = ({ onMemberAdded, selectedMember, setSelectedMember }) => {
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [role, setRole] = useState("");
   // const [email, setEmail] = useState("");
   // const [bio, setBio] = useState("");
   const [socials, setSocials] = useState({ github: "", linkedin: "" });
   const [image, setImage] = useState(null);

   useEffect(() => {
      if (selectedMember) {
         setName(selectedMember.name || "");
         setRole(selectedMember.role || "");
         // setEmail(selectedMember.email || "");
         // setBio(selectedMember.bio || "");
         setSocials(selectedMember.socials || { github: "", linkedin: "" });
         setImage(null); // Don't pre-fill image field
      }
   }, [selectedMember]);

   const handleImageChange = (e) => {
      setImage(e.target.files[0]); // Set selected image file
   };

   const [refresh, setRefresh] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const memberData = { name, role, socials, image };

      try {
         if (selectedMember) {
            // ✅ Update an existing member instead of adding a new one
            await updateMember(selectedMember.customId, memberData);
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
      // setEmail("");
      // setBio("");
      setSocials({ github: "", linkedin: "" });
      setImage(null);
   };

   return (
      <div className="flex flex-col items-center justify-center w-full">
         <div className="w-full max-w-[50rem] px-4 mb-4 translate-y-[2rem]">
            <button
               onClick={() => navigate(-1)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
               ← Back
            </button>
         </div>
         <form
            className="gap-[2rem] grid comaddfield place-items-center mt-12"
            onSubmit={handleSubmit}>
            <div className="container01">
               <input
                  className="input01"
                  type="text"
                  placeholder=" Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className="container01">
               <input
                  className="input01"
                  type="text"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
               />
            </div>

            <label className="Documents-btn">
               <input
                  accept="image/*"
                  onChange={handleImageChange}
                  type="file"
                  className="hidden-file-input"
               />
               <span className="folderContainer">
                  <svg
                     className="fileBack"
                     width="146"
                     height="113"
                     viewBox="0 0 146 113"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                        fill="url(#paint0_linear_117_4)"></path>
                     <defs>
                        <linearGradient
                           id="paint0_linear_117_4"
                           x1="0"
                           y1="0"
                           x2="72.93"
                           y2="95.4804"
                           gradientUnits="userSpaceOnUse">
                           <stop stopColor="#a040fd"></stop>
                           <stop offset="1" stopColor="#5f41f3"></stop>
                        </linearGradient>
                     </defs>
                  </svg>
                  <svg
                     className="filePage"
                     width="88"
                     height="99"
                     viewBox="0 0 88 99"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>
                     <defs>
                        <linearGradient
                           id="paint0_linear_117_6"
                           x1="0"
                           y1="0"
                           x2="81"
                           y2="160.5"
                           gradientUnits="userSpaceOnUse">
                           <stop stopColor="white"></stop>
                           <stop offset="1" stopColor="#686868"></stop>
                        </linearGradient>
                     </defs>
                  </svg>

                  <svg
                     className="fileFront"
                     width="160"
                     height="79"
                     viewBox="0 0 160 79"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                        fill="url(#paint0_linear_117_5)"></path>
                     <defs>
                        <linearGradient
                           id="paint0_linear_117_5"
                           x1="38.7619"
                           y1="8.71323"
                           x2="66.9106"
                           y2="82.8317"
                           gradientUnits="userSpaceOnUse">
                           <stop stopColor="#a040fd"></stop>
                           <stop offset="1" stopColor="#5f41f3"></stop>
                        </linearGradient>
                     </defs>
                  </svg>
               </span>
               <p className="text">Image</p>
            </label>

            <div className="flex flex-col gap-4 w-full max-w-[50rem]">
               <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  {selectedMember ? "Update Member" : "Add Member"}
               </button>
            </div>
         </form>

         <div className="w-full max-w-[50rem] px-4 mb-4 mt-8">
            <MemberList refresh={refresh} setRefresh={setRefresh} />
         </div>
      </div>
   );
};

export default AddMemberForm;
