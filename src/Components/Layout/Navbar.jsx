const Navbar = () => {
    return (
        <div>
            <div className="cont-nav">
            <div className="nav">
                <div className="navbar">
                    <ul className="flex transition-all justify-center gap-[50px] mt-5 border border-gray-600 border-l-0 border-r-0 p-3">
                        <li><a className="hover:bg-[#00ACF2] duration-300 hover:text-white p-2 rounded  ring-blue-700" href="/">Home</a></li>
                        <li><a className="hover:bg-[#00ACF2] duration-300 hover:text-white p-2 rounded  ring-blue-700" href="/Members">Committee</a></li>
                        <li><a className="hover:bg-[#00ACF2] duration-300 hover:text-white p-2 rounded  ring-blue-700" href="/Events">Events</a></li>
                        <li><a className="hover:bg-[#00ACF2] duration-300 hover:text-white p-2 rounded  ring-blue-700" href="/News">The Daily NWU</a></li>
                        <li><a className="hover:bg-[#00ACF2] duration-300 hover:text-white p-2 rounded  ring-blue-700" href="/About">About Us</a></li>
                    </ul>
                </div>
            </div>
            
            </div> 
        </div>
    );
};

export default Navbar;