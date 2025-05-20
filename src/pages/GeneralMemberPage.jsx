import "./CSS/General.css";
const GeneralMemberPage = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="sidebar03">
        <div className="logo03">CClub</div>
        <ul>
          <a href="/User">
            <li>Dashboard</li>
          </a>
          <a href="/Members">
            <li>Members</li>
          </a>
          <a href="/Events">
            <li>Events</li>
          </a>

          <li>Projects</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="main03">
        <div className="header03">
          <h2>Computer Club Dashboard</h2>
          <div>Welcome Shawon 👋</div>
        </div>

        <div className="dashboard03">
          <div className="left-panel03">
            <div className="card03 flex flex-col items-center profile-card03">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="Profile"
                id="profileImg"
              />
              <h3>Shawon</h3>
              <p>Web Developer</p>
              <p>Shawon@example.com</p>
            </div>
            <div className="card03 bottom-card03">
              <h3>Member Since</h3>
              <p>September 2018</p>
            </div>
          </div>

          <div className="right-panel03">
            <div className="card03 xpay-card03">
              <h3>Club Projects</h3>
              <div className="account03 active">
                Website Development (Active)
              </div>
              <div className="account03 blocked">
                Inventory System (Pending)
              </div>
            </div>

            <div className="card03 skill-card03">
              <h3>Skills & Roles</h3>
              <ul id="skillList">
                <li>Web Development</li>
                <li>Project Management</li>
                <li>Graphics Design</li>
                <li>Team Collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMemberPage;
