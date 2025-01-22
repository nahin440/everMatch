import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './NavBar.css';
import { AuthContext } from "../../../Providers/AuthProvier";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext); // Destructure logOut from AuthContext

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Successfully logged out");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="bg-[#261319]/90 z-50 fixed left-0 right-0 top-0 font-bold text-[#FBF5E5]">
      <div className="mx-auto flex items-center justify-evenly p-2">
        {/* Logo and Website Name */}
        <div className="flex items-center">
          <span className="text-xl font-bold">EverMatch</span>
        </div>

        {/* Links (Desktop View) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#C890A7]">Home</Link>
          <Link to="/biodatas" className="hover:text-[#C890A7]">Biodatas</Link>
          <Link to="/about" className="hover:text-[#C890A7]">About Us</Link>
          <Link to="/contact" className="hover:text-[#C890A7]">Contact Us</Link>
        </div>

        <div className="hidden md:block">
          {user?.email ? (
            <div className="flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-[#A35C7A]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="block px-4 py-2 hover:bg-[#A35C7A]"
              >
                LogOut
              </button>
            </div>
          ) : (
            <Link to="/login"> 
            <AwesomeButton className="text-[#FBF5E5] rounded-md shadow-lg px-4 py-2 bg-[#FBF5E5] aws-button">
              <button className="text-[#261319]">Login</button>
            </AwesomeButton>
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Mobile View) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon when menu is open
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu (Mobile View) */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#261319]">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-[#A35C7A]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/biodatas"
            className="block px-4 py-2 hover:bg-[#A35C7A]"
            onClick={() => setIsMenuOpen(false)}
          >
            Biodatas
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-[#A35C7A]"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-[#A35C7A]"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          {user?.email ? (
            <div>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-[#A35C7A]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="block px-4 py-2 hover:bg-[#A35C7A]"
              >
                LogOut
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-[#A35C7A]"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
