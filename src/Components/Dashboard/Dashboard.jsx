import React from "react";
import { FaHome, FaTasks } from "react-icons/fa";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import Loading from "../Shared/Loading";
import {
  FaBook,
  FaBookOpen,
  FaCertificate,
  FaFaceGrinHearts,
  FaUsers,
} from "react-icons/fa6";
import { TbBrandStorytel, TbPremiumRights } from "react-icons/tb";
import { ImportContacts, IosShare } from "@mui/icons-material";
import { BiCommentDetail, BiHeart, BiLogOut } from "react-icons/bi";
import { IoHomeSharp } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import useBiodata from "../Hooks/useBiodata";
const Dashboard = () => {
  // const {user} = useAuth();
  const { user, logoutUser, setUser } = useAuth();
  const [biodata] = useBiodata();
  const navigate = useNavigate();
  const currentBidata =
    biodata && biodata.find((bio) => bio?.email == user?.email);
  // console.log(currentBidata);
  function handleLogOut() {
    logoutUser();
    setUser(null);
    navigate("/");
  }
  const [users, refetch, isLoading] = useUser();
  if (isLoading) {
    return <Loading></Loading>;
  }

  const CurrenUser = users?.find((u) => u.email == user?.email);
  // console.log(CurrenUser);

  const isAdmin = CurrenUser?.admin == "admin";
  // console.log(isAdmin);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-sky-700 to-sky-500 text-white md:w-1/5 w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
        <ul className="flex flex-col gap-1">
          {isAdmin ? (
            <>
              <NavLink to="/dashboard/adminhome">
                <li className="hover:bg-sky-600 px-4 flex justify-left gap-1 items-center py-2 rounded-lg transition">
                  <FaHome></FaHome> Admin Home
                </li>
              </NavLink>
              <NavLink to="/dashboard/manageuser">
                <li className="hover:bg-sky-600 px-4  flex justify-left gap-1 items-center py-2 rounded-lg transition">
                  <FaUsers></FaUsers> Manage User
                </li>
              </NavLink>
              <NavLink to="/dashboard/premium">
                <li className="hover:bg-sky-600  flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <TbPremiumRights></TbPremiumRights> Approved Premium
                </li>
              </NavLink>
              <NavLink to="/dashboard/admincontact">
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <ImportContacts></ImportContacts> Approved Contact
                </li>
              </NavLink>
              <NavLink to="/dashboard/story">
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <BiHeart></BiHeart> Succes Story
                </li>
              </NavLink>
              <button
                className="hover:bg-red-600 flex gap-2 items-center px-4 py-3 font-semibold text-left rounded-lg transition"
                onClick={() => handleLogOut()}
              >
                <BiLogOut></BiLogOut> Log Out
              </button>
            </>
          ) : (
            <>
              {currentBidata ? (
                <Link to={`/dashboard/edit/${currentBidata?._id}`}>
                  <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                    <FaCertificate></FaCertificate> Edit Biodata
                  </li>
                </Link>
              ) : (
                <NavLink to="/dashboard/create">
                  <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                    <FaCertificate></FaCertificate> Create Biodata
                  </li>
                </NavLink>
              )}
              <NavLink to={`/dashboard/mybio`}>
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <FaBookOpen></FaBookOpen> View Biodata
                </li>
              </NavLink>
              <NavLink to="/dashboard/contact">
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <IoIosContacts /> Contact Request
                </li>
              </NavLink>
              <NavLink to="/dashboard/favourate">
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <FaFaceGrinHearts></FaFaceGrinHearts> Favorite Bio
                </li>
              </NavLink>
              <NavLink to="/dashboard/gotmarried">
                <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
                  <MdRateReview /> Married Exprience
                </li>
              </NavLink>
              <button
                className="hover:bg-red-600 flex gap-2 items-center px-4 py-3 font-semibold text-left rounded-lg transition"
                onClick={() => handleLogOut()}
              >
                <BiLogOut></BiLogOut> Log Out
              </button>
            </>
          )}

          <hr className="border-white/50 my-4" />
          <NavLink to="/">
            <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
              <IoHomeSharp /> Home
            </li>
          </NavLink>
          <NavLink to="/biodata">
            <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
              <FaBook></FaBook> Biodata
            </li>
          </NavLink>
          <NavLink to="/about">
            <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
              <BiCommentDetail /> About
            </li>
          </NavLink>
          <NavLink to="/contact">
            <li className="hover:bg-sky-600 flex justify-left gap-1 items-center px-4 py-2 rounded-lg transition">
              <IoIosContacts /> Contact
            </li>
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <div className="bg-gradient-to-b from-sky-700 to-sky-500 text-white rounded-lg shadow-md p-3 text-center">
          <h2 className="text-xl md:text-3xl font-bold flex gap-1 items-center justify-center">
            <FaTasks></FaTasks> Dashboard
          </h2>
        </div>
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
