
import "./CSS/EventDetailsPart.css";
const EventDetailsPart = () => {
    return (
        <div>
            <div className="event-details">
        <h3>📅 Event Details</h3>
        <p><strong>Event Name:</strong> Code Clash 2025</p>
        <p><strong>Date:</strong> May 15, 2025</p>
        <p><strong>Time:</strong> 2:00 PM - 6:00 PM</p>
        <p><strong>Venue:</strong> Online (Zoom + Codeforces Platform)</p>
        <p><strong>Rounds:</strong> Qualification + Final</p>
        <p><strong>Entry Fee:</strong> Free</p>
      </div>

      <div className="learning-section">
        <h3>📘 What You Will Learn</h3>
        <ul>
          <li>Advanced problem-solving strategies</li>
          <li>Optimized code writing techniques</li>
          <li>Algorithm design and implementation</li>
          <li>Time and space complexity mastery</li>
          <li>Live competition experience with leaderboard</li>
        </ul>
      </div>

      <div className="mentors-section">
        <h2>🎓 Our Mentors</h2>
        <div className="mentors-list">
          <div className="mentor-card">
            <img src="/game/Ghost_of_Tsushima.jpg" alt="Shahriar Bhai"/>
            <p>Shahriar Bhai</p>
          </div>
          <div className="mentor-card">
            <img src="/game/Ghost_of_Tsushima.jpg" alt="Jannatul Ma'am"/>
            <p>Jannatul Ma'am</p>
          </div>
          <div className="mentor-card">
            <img src="/game/Ghost_of_Tsushima.jpg" alt="Hasan Bhai"/>
            <p>Hasan Bhai</p>
          </div>
        </div>
      </div>

      <a href="/register.html" className="register-btn">🚀 Participate Now</a>
        </div>
    );
};

export default EventDetailsPart;