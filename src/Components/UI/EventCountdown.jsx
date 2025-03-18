import { useState, useEffect } from "react";
import "./CSS/EventCoundown.css"

const EventCountdown = () => {
  // Simulate admin status (true for admin, false for regular users)
  const isAdmin = true; // Change this to `true` to test admin visibility

  // Retrieve the target event date from localStorage or calculate a new one
  const now = new Date().getTime();
  const durationInMilliseconds =
    4 * 24 * 60 * 60 * 1000 + // 1 day
    2 * 60 * 60 * 1000 +   // 12 hours
    0 * 60 * 1000 +        // 56 minutes
    2 * 1000;              // 59 seconds

  const storedEventDate = localStorage.getItem("eventDate");
  const initialEventDate = storedEventDate
    ? parseInt(storedEventDate, 10)
    : now + durationInMilliseconds;

  // State to store the remaining time and the target event date
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [eventDate, setEventDate] = useState(initialEventDate);

  // Function to calculate and update the countdown
  const updateCountdown = () => {
    const now = new Date().getTime();
    const remainingTime = eventDate - now;

    if (remainingTime > 0) {
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // Update state with padded values
      setTimeRemaining({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    } else {
      // Stop the countdown when the event date is reached
      setTimeRemaining({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    }
  };

  // Use useEffect to run the countdown logic every second
  useEffect(() => {
    updateCountdown(); // Initial call to display countdown immediately
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [eventDate]);

  // Function to reset the countdown with a new duration
  const resetCountdown = () => {
    const newEventDate = now + durationInMilliseconds;
    setEventDate(newEventDate); // Update the event date in state
    localStorage.setItem("eventDate", newEventDate.toString()); // Update in localStorage
  };

  return (
    <div>
      <div className="countdown-container">
        <h1 className="eventTitle">Event Countdown</h1>
        <p id="event-name">Colab With Programming Hero</p>
        <div className="countdown">
          <div className="time-section">
            <span id="days">{timeRemaining.days}</span>
            <p>Days</p>
          </div>
          <div className="time-section">
            <span id="hours">{timeRemaining.hours}</span>
            <p>Hours</p>
          </div>
          <div className="time-section">
            <span id="minutes">{timeRemaining.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="time-section">
            <span id="seconds">{timeRemaining.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>

        {/* Render the reset button only for admins */}
        {isAdmin && (
          <button onClick={resetCountdown} className="reset-button">
            Reset Countdown
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCountdown;