const Footer = () => {
  return (
    <footer className="bg-[#1c1535] text-white border-t border-[#F6A623]/30">
      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="https://placehold.co/100x40/1c1535/F6A623?text=NWU+CSE+FEST" 
                alt="NWU CSE FEST Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Join us for an exciting celebration of technology, innovation, and creativity. 
              Experience the thrilling NWU CSE FEST with competitions, exhibitions, and networking opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                <svg className="w-5 h-5 text-[#F6A623]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                <svg className="w-5 h-5 text-[#F6A623]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.297 1.26.47 1.69.62.712.256 1.36.199 1.871.124.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-13.277c-1.302-1.306-3.02-2.071-4.89-2.073h-.002c-3.741 0-6.772 3.03-6.772 6.77 0 1.87 1.178 4.202 2.074 4.89l.002.001 3.155 1.869 1.867 3.156.001.002c.687.395 2.136.808 3.811.28.57-.18 1.727-.71 2.297-1.505.569-.794.57-1.606.57-1.61v-.002c0-3.74-3.031-6.771-6.771-6.771"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#F6A623]/20 hover:bg-[#F6A623]/30 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-[#F6A623]/30">
                <svg className="w-5 h-5 text-[#F6A623]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Event', 'Gallery', 'Sponsor', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-[#F6A623] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#F6A623] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">nwucsefest@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#F6A623] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">+880 1890-430560</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#F6A623] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">NWU Campus, Dhaka</span>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F6A623] border-b border-[#F6A623] pb-1">Event Info</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-[#F6A623] pl-4">
                <div className="text-sm text-[#F6A623]">Date:</div>
                <div className="font-medium text-white">21-29 August</div>
              </div>
              <div className="border-l-4 border-[#F6A623] pl-4">
                <div className="text-sm text-[#F6A623]">Venue:</div>
                <div className="font-medium text-white">NWU Campus</div>
              </div>
              <div className="border-l-4 border-[#F6A623] pl-4">
                <div className="text-sm text-[#F6A623]">Duration:</div>
                <div className="font-medium text-white">Full Day Event</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-[#F6A623]/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 NWU CSE FEST. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#F6A623] text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <div className="w-px h-4 bg-gray-600"></div>
            <p className="text-gray-400 text-sm">Developed by AS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;