import './CSS/Welcomemsg.css';
const Welcomemsg = () => {
    return (
        <div className="bg-[#2f3542] space-y-2 h-[350px] cont mt-10 mb-10 ">
            <div className="welcomemsg">Welcome To Comptron</div>
            <div className="animated-text text-white text-center">It's a <span></span></div>
            <div className='flex justify-center'>

            <p className="text-center w-[70rem] text-white">Founded in 2018, Comptron is the official computer club of the Computer Science and Engineering (CSE) department at North Western University, Khulna. Dedicated to fostering innovation, technical expertise, and collaborative growth among students, Comptron provides a dynamic platform for aspiring tech enthusiasts to develop their skills and engage in meaningful projects.Comptron has become a cornerstone of technical excellence within the university</p>
            </div>
             
            <div className="flex justify-center mt-5 Abtn">
                <a href="/About">
                    <button className="button5">
                    About Us
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                        <path
                        clip-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        fill-rule="evenodd"
                        ></path>
                    </svg>
                </button>
                </a>
            </div>

        </div>

    );
};

export default Welcomemsg;