import './CSS/Footer.css';
const Footer = () => {
    return (
        <div>
            <footer className="footer-container">
                <div className="footer-content">
                    <div className="logo">
                        <h1>Comptron</h1>
                        <p>North Western University's Premier Tech Club</p>
                    </div>

                    <div className="landscape-layout">
                        <div className="footer-section about">
                            <h4>About Comptron</h4>
                            <p>Comptron is North Western University's tech club dedicated to fostering innovation, collaboration, and learning in the fields of technology and computer science.</p>
                        </div>

                        <div className="footer-section features">
                            <h4>What We Do</h4>
                            <ul>
                                <p><i className="fas fa-users"></i> Workshops & Seminars</p>
                                <p><i className="fas fa-project-diagram"></i> Collaborative Projects</p>
                                <p><i className="fas fa-graduation-cap"></i> Mentorship Programs</p>
                                <p><i className="fas fa-laptop-code"></i> Hackathons & Coding Competitions</p>
                            </ul>
                        </div>

                        <div className="footer-section contact">
                            <h4>Contact Us</h4>
                            <p><i className="fas fa-map-marker-alt"></i> North Western University, Khulna, Bangladesh</p>
                            <p><i className="fas fa-phone"></i> </p>
                            <p><i className="fas fa-envelope"></i> comptron@nwu.ac.bd
                            </p>
                        </div>

                        {/* <div className="footer-section newsletter">
                            <h4>Join Our Mailing List</h4>
                            <form>
                                <input type="email" placeholder="Enter your email"/>
                                <button type="submit">Subscribe</button>
                            </form>
                        </div> */}
                    </div>
                </div>

                <div className="social-media">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/comptron.nwu" target="_blank">Facebook</a>
                        <a href="https://www.youtube.com/@ComptronClubNWU" target="_blank">Youtube</a>
                        {/* <a href="https://www.twitter.com" target="_blank"><i className="fab fa-twitter"></i> Twitter</a>
                        <a href="https://www.linkedin.com" target="_blank"><i className="fab fa-linkedin"></i> LinkedIn</a> */}
                    </div>
                </div>

                <div className="copyright">
                    &copy; 2025 Comptron - North Western University. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;