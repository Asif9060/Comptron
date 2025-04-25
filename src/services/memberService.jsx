import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://comptron-server-2.onrender.com/api/members";

export const updateMember = async (customId, updatedMember) => {
    const formData = new FormData();
    formData.append("name", updatedMember.name);
    formData.append("role", updatedMember.role);
    // formData.append("email", updatedMember.email);
    // formData.append("bio", updatedMember.bio);
    formData.append("socials", JSON.stringify(updatedMember.socials));

    if (updatedMember.image) {
        formData.append("image", updatedMember.image);
    }

    const response = await axios.put(`${API_URL}/${customId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// Function to send member data (including the image) to the backend
export const getMembers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error;
    }
};

// Delete member by ID
export const deleteMember = async (customId) => {
    try {
        const response = await axios.delete(`${API_URL}/${customId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting member:", error);
        throw error;
    }
};



export const addMember = async (member) => {
    const formData = new FormData();

    // Append member data to form data
    formData.append("name", member.name);
    formData.append("role", member.role);
    // formData.append("email", member.email);
    // formData.append("bio", member.bio);
    formData.append("socials", JSON.stringify(member.socials));

    // Append image if exists
    if (member.image) {
        formData.append("image", member.image);
    }

    const response = await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};