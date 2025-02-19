import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../components/provider/AuthProvider";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
    setIsMenuOpen(false); // Close the menu after logging out
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-[#411628] text-white min-h-screen md:flex flex-col`}
      >
        <ul className="menu p-4 space-y-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/admindashboard" onClick={handleMenuClose}>
                  Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage" onClick={handleMenuClose}>
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approvedPremium" onClick={handleMenuClose}>
                  Approved Premium
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approvedContact" onClick={handleMenuClose}>
                  Approved Contact Request
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userdashboard" onClick={handleMenuClose}>
                  User Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/editbiodata" onClick={handleMenuClose}>
                  Edit Biodata
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/viewbiodata" onClick={handleMenuClose}>
                  View Biodata
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/mycontactrqst?email=${user?.email}`}
                  onClick={handleMenuClose}
                >
                  My Contact Request
                </NavLink>
              </li>
              <li>
                <NavLink to={`/dashboard/myfavourites`} onClick={handleMenuClose}>
                  Favourites Biodata
                </NavLink>
              </li>
            </>
          )}
          {/* Shared Links */}
          <div className="border-t border-white my-4"></div>
          <li>
            <NavLink to="/" onClick={handleMenuClose}>
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Signout</button>
          </li>
        </ul>
      </div>

      {/* Hamburger Button for Small Screens */}
      <div className="bg-[#411628] text-white p-4 md:hidden">
        <button
          onClick={handleMenuToggle}
          className="text-white text-xl focus:outline-none"
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <p className="font-bold text-lg mb-8">Welcome To Dashboard !!!</p>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
