import { useState } from "react";
import '../Components/UI/CSS/Buttons.css';

const AdminEventControl = () => {
  const [newEventTime, setNewEventTime] = useState("");

  const updateEventTime = async () => {
    if (!newEventTime) return;
  
    const eventDate = new Date(newEventTime).getTime() + 6 * 60 * 60 * 1000;
    console.log("Sending eventDate:", eventDate); // Debugging
  
    try {
      const response = await fetch("https://comptron-server-1.onrender.com/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventDate }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data); // Debugging
  
      if (response.ok) {
        alert("Event updated successfully!");
        window.dispatchEvent(new Event("eventUpdated"));
      } else {
        alert("Failed to update event: " + data.error);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <h2 className=" text-white text-2xl">Set Event Time</h2>
      <input
        type="datetime-local"
        className="p-2 rounded border  border-white bg-white"
        value={newEventTime}
        onChange={(e) => setNewEventTime(e.target.value)}
      />
      <button className="button6 mb-5 absolute" onClick={updateEventTime}>Update
      </button>
    </div>
  );
};

export default AdminEventControl;
