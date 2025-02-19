
// import app from '../../assets/app.JPG';
// import google from '../../assets/google.JPG';

const Footer = () => {
    return (
        <div>

            <footer className="bg-[#411628] text-white py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: About Us */}
                <div>
                    <h3 className="text-white text-xl font-bold mb-4">About Us</h3>
                    <p className="text-white">
                      We are dedicated to connecting people with their special someone through a seamless and secure platform. Join us and find your perfect match today.
                    </p>
                </div>

                {/* Column 2: Quick Links (Centered) */}
                <div className="flex flex-col items-center">
                    <h3 className="text-white text-xl font-bold mb-4 text-center">Quick Links</h3>
                    <ul className="space-y-2 text-center">
                    <li>
                        <a href="#home" className="hover:text-blue-500 transition">
                        Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-blue-500 transition">
                        About Us
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="hover:text-blue-500 transition">
                        Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-500 transition">
                        Contact
                        </a>
                    </li>
                    </ul>
                </div>

                {/* Column 3: App Download Section */}
                <div>
                    <h3 className="text-white text-xl font-bold mb-4">Get the App</h3>
                    <p className="text-white mb-4">
                    Stay connected on the go! Download our app to find your match anytime, anywhere.
                    </p>
                    <div className="flex space-x-4">
                    <img
                        src={'/app.jpg'}
                        alt="App Store"
                        className="w-20 h-20 cursor-pointer hover:opacity-80 transition"
                    />
                    <img
                        src={'/google.JPG'}
                        alt="Google Play"
                        className="w-20 h-20 cursor-pointer hover:opacity-80 transition"
                    />
                    </div>
                </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                {/* Social Media */}
                <div className="flex space-x-4">
                    <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition text-xl"
                    >
                    <i className="fab fa-facebook"></i>
                    </a>
                    <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition text-xl"
                    >
                    <i className="fab fa-twitter"></i>
                    </a>
                    <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition text-xl"
                    >
                    <i className="fab fa-instagram"></i>
                    </a>
                    <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition text-xl"
                    >
                    <i className="fab fa-linkedin"></i>
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-white text-sm justify-center text-center">
                    © 2025 Matrimony Platform. All rights reserved.
                </div>
                </div>
            </div>
            </footer>


        </div>
    );
};

export default Footer;