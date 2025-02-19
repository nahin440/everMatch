import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../components/provider/AuthProvider";
import logo from "../../assets/logo.png";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className= "fixed top-0 left-0 right-0 bg-[#411628] z-50 text-white">
      <div className="container mx-auto px-4">
        {/* Navbar wrapper */}
        <div className="flex justify-between items-center py-2">
          {/* Left Section */}
          <div className="text-lg font-semibold flex items-center">
            <Link to="/" onClick={handleMenuClose}>
              <img className="h-16 w-16 rounded-full" src={logo} alt="Logo" />
            </Link>
            <p className="hidden sm:block">EverMatch</p>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="lg:hidden">
            <button
              onClick={handleMenuToggle}
              className="cursor-pointer focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Middle Section (Hidden on smaller screens) */}
          <div className="hidden lg:flex space-x-8">
            <NavLink to="/" onClick={handleMenuClose}>
              Home
            </NavLink>
            <NavLink to="/biodatas" onClick={handleMenuClose}>
              Biodatas
            </NavLink>
            {user && user?.email ? (
              <NavLink to="/dashboard" onClick={handleMenuClose}>
                Dashboard
              </NavLink>
            ) : (
              ""
            )}
            {isAdmin && (
              <NavLink to="/success-story" onClick={handleMenuClose}>
                Success Stories
              </NavLink>
            )}
            <NavLink to="/aboutus" onClick={handleMenuClose}>
              About Us
            </NavLink>
            <NavLink to="/contactus" onClick={handleMenuClose}>
              Contact Us
            </NavLink>
          </div>

          {/* Right Section (Hidden on smaller screens) */}
          <div className="hidden lg:flex">
            {user && user?.email ? (
              <button
                className="font-bold text-xl pr-2"
                onClick={() => {
                  logOut();
                  handleMenuClose();
                }}
              >
                Signout
              </button>
            ) : (
              <NavLink
                className="p-2 rounded-lg font-bold text-xl"
                to="/login"
                onClick={handleMenuClose}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col lg:hidden mt-4 space-y-2">
            <NavLink to="/" onClick={handleMenuClose}>
              Home
            </NavLink>
            <NavLink to="/biodatas" onClick={handleMenuClose}>
              Biodatas
            </NavLink>
            {user && user?.email ? (
              <NavLink to="/dashboard" onClick={handleMenuClose}>
                Dashboard
              </NavLink>
            ) : (
              ""
            )}
            {isAdmin && (
              <NavLink to="/success-story" onClick={handleMenuClose}>
                Success Stories
              </NavLink>
            )}
            <NavLink to="/aboutus" onClick={handleMenuClose}>
              About Us
            </NavLink>
            <NavLink to="/contactus" onClick={handleMenuClose}>
              Contact Us
            </NavLink>
            {user && user?.email ? (
              <button
                className="font-bold text-xl pr-2"
                onClick={() => {
                  logOut();
                  handleMenuClose();
                }}
              >
                Signout
              </button>
            ) : (
              <NavLink
                className="p-2 rounded-lg font-bold text-xl"
                to="/login"
                onClick={handleMenuClose}
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


  