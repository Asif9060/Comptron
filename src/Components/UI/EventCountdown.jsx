import { useState, useEffect } from "react";
import "./CSS/EventCoundown.css";

const EventCountdown = () => {
  const isAdmin = true; // Change this to true to test admin visibility

  // Retrieve the event date from localStorage or set a new one
  const storedEventDate = localStorage.getItem("eventDate");
  const initialEventDate = storedEventDate ? parseInt(storedEventDate, 10) : null;

  const [eventDate, setEventDate] = useState(initialEventDate);
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Function to calculate and update the countdown
  const updateCountdown = () => {
    const now = new Date().getTime();
    if (!eventDate || eventDate <= now) {
      setTimeRemaining({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      return;
    }

    const remainingTime = eventDate - now;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setTimeRemaining({
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
  };

  useEffect(() => {
    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  useEffect(() => {
    if (eventDate) {
      localStorage.setItem("eventDate", eventDate.toString());
    }
  }, [eventDate]);

  // Function to reset the countdown with a new duration
  const resetCountdown = () => {
    const now = new Date().getTime();
    const newDuration = 

    4 * 24 * 60 * 60 * 1000 + 
    0 * 60 * 60 * 1000 + 
    10 * 60 * 1000 + 
    56 * 1000;
     // 4 days, 2 hours
    const newEventDate = now + newDuration;
    setEventDate(newEventDate);
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
