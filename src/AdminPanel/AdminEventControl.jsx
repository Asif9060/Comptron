import { useState } from "react";

const AdminEventControl = () => {
  const [newEventTime, setNewEventTime] = useState("");

  const updateEventTime = async () => {
    if (!newEventTime) return;
  
    const eventDate = new Date(newEventTime).getTime();
    console.log("Sending eventDate:", eventDate); // Debugging
  
    try {
      const response = await fetch("https://comptron-server.onrender.com/api/event", {
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
    <div>
      <h2>Set Event Time</h2>
      <input
        type="datetime-local"
        value={newEventTime}
        onChange={(e) => setNewEventTime(e.target.value)}
      />
      <button onClick={updateEventTime}>Update Event</button>
    </div>
  );
};

export default AdminEventControl;
