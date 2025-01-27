import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import { FaAddressBook, FaCheckCircle, FaCog, FaEdit, FaEye, FaHeart, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Dashboard = () => {

    // TODO get admin from database
    const isAdmin = true;


    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const { logOut } = UseAuth()

    const navigate = useNavigate()

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    //  const { user, logOut } = useContext(AuthContext); // Destructure logOut from AuthContext

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("Successfully logged out");
                navigate('/')
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    };
    return (
        <div className="grid md:grid-cols-12 min-h-screen bg-[#fffbf1]  ">
            {/* Sidebar */}
            <div
                className={`col-span-2 min-h-screen  py-16 bg-[#261319] text-white pl-6 md:pl-10 pr-4 md:block ${isSidebarOpen ? "block" : "hidden"
                    } md:relative fixed min-h-screen py-16 inset-0 z-50`}
            >
                <button
                    className="absolute top-4 right-4 text-xl md:hidden"
                    onClick={toggleSidebar}
                >
                    ✖
                </button>
                <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
                <ul>

                    {
                        isAdmin ?

                            <>

                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/adminDashboard" className="flex justify-start gap-2 items-center">
                                        <FaEdit className="text-lg" /> Admin Dashboard
                                    </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/users" className="flex justify-start gap-2 items-center">
                                        <FaUsers className="text-lg" /> Manage Users
                                    </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/approvedPremium" className="flex justify-start gap-2 items-center">
                                        <FaCheckCircle className="text-lg" /> Approved Premium
                                    </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/approvedContact" className="flex justify-start gap-2 items-center">
                                        <FaAddressBook className="text-lg" /> Approved Contact Request
                                    </NavLink>
                                </li>


                            </>

                            :

                            <>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/edit" className="flex justify-start gap-2 items-center " > <FaEdit></FaEdit> Edit Biodata

                                    </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/profile" className="flex justify-start gap-2 items-center "    > <FaEye></FaEye> View Biodata
                                    </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/settings " className="flex justify-start gap-2 items-center "  > <FaUser></FaUser> My Contact Request </NavLink>
                                </li>
                                <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                                    <NavLink to="/dashboard/favourites" className="flex justify-start gap-2 items-center "  > <FaHeart></FaHeart> Favourites Biodata
                                    </NavLink>
                                </li>
                            </>
                    }




                    <div className="border w-full border-white my-5"></div>




                    <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                        <NavLink to="/" className="flex justify-start gap-2 items-center "  > <FaHome></FaHome> Home</NavLink>
                    </li>
                    <li className="mb-2 hover:bg-[#42202b] rounded p-2">
                        <button onClick={handleLogOut} className="flex justify-start gap-2 items-center "  > <IoLogOut className="font-extrabold text-xl" ></IoLogOut> Logout

                        </button>
                    </li>
                </ul>
            </div>

            {/* Overlay for smaller devices */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-[#261319] opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main content */}
            <div className="col-span-10 p-4 md:pl-0">
                <button
                    className="md:hidden bg-gray-800 text-white p-2 rounded mb-4"
                    onClick={toggleSidebar}
                >
                    ☰ Menu
                </button>


                <div className="px-4 md:px-10 lg:px-24 py-16 " >
                    <Outlet />

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
