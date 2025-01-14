const Footer = () => {
    return (
      <footer className="bg-[#261319] text-[#FBF5E5] py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About Section */}
          <div>
            <img src="/logo.png" alt="Logo" className="h-10 mb-4" />
            <p className="text-sm">
              everMatch is dedicated to connecting hearts and creating beautiful stories. Find your perfect match with ease and confidence.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-[#C890A7]">Home</a>
              </li>
              <li>
                <a href="/biodatas" className="hover:text-[#C890A7]">Biodatas</a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-[#C890A7]">About Us</a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-[#C890A7]">Contact Us</a>
              </li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email: <a href="mailto:support@evermatch.com" className="hover:text-[#C890A7]">support@evermatch.com</a>
            </p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-[#C890A7]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-[#C890A7]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-[#C890A7]">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:text-[#C890A7]">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-10 border-t border-[#C890A7] pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} everMatch. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  