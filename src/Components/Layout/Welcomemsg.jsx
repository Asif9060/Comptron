

const Welcomemsg = () => {
    return (
        <div className="bg-[#2f3542] space-y-2 h-[300px]">
            <div className="welcomemsg">Welcome To Comptron</div>
            <div className="animated-text text-white text-center">It's a <span></span></div>
            <p className="text-center text-white">We are a group of passionate students who are always looking to learn and grow. <br />We are a community of developers, designers, and tech enthusiasts who are always looking to innovate and create.</p>
             
            <div className="flex justify-center mt-5">
                <a href="/About">
                    <button className="button">
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