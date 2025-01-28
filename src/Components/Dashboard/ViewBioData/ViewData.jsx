import { Link, useParams } from "react-router-dom";
import useBiodata from "../../Hooks/useBiodata";
import {
  FaHeart,
  FaPhone,
  FaBriefcase,
  FaGenderless,
  FaMapLocation,
  FaUser,
} from "react-icons/fa6";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";
import Loading from "../../Shared/Loading";
import { FaMapMarkerAlt } from "react-icons/fa";
import { height } from "@mui/system";
import usePayment from "../../Hooks/usePayment";
import usePublic from "../../Hooks/usePublic";

const ViewData = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [biodata] = useBiodata() || [];
  const [users, refetch, isLoading] = useUser();
  const axiosSecure = usePublic();

  const [payments, ,] = usePayment([]);
  // console.log(payments , 'payment');
  // console.log(biodata , 'biodata');
  // console.log(user.email);
  // console.log(users , 'users');

  if (isLoading) {
    return <Loading></Loading>;
  }

  const CurrenUser = users.find((u) => u.email == user?.email);
  const isRole = CurrenUser?.userRole == "premimum";

  const finduser =
    payments && payments.filter((pay) => pay?.userEmail == user?.email);
  console.log(finduser, "find Userr Payment");

  console.log(isRole);
  // console.log(CurrenUser,'current user');

  const data = biodata.find((bio) => bio._id === id);
  const updatedData = { ...data, userEmail: user?.email };
  // console.log(updatedData, "updated item with email");

  const {
    name,
    image,
    age,
    father,
    mother,
    partnerAge,
    partnerHeight,
    mobile,
    gender,
    date,
    height,
    weight,
    occupation,
    race,
    division,
    presentdivision,
    partnerWeight,
    email,
  } = data || {};

  const isPending =
    finduser && finduser.find((use) => use?.email == data?.email);
  console.log(isPending, "ispending");

  console.log(data, "data");

  function addFav(item) {
    console.log(item);
    const newData = { ...item, userEmail: user?.email };
    console.log(newData, "new item with email");
    axiosSecure.post("/favourate", newData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} Add to Your Fav.. List`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <img
          src={image || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
          alt={`${name}'s photo`}
          className="w-full h-64 object-cover"
        />

        {/* Content Section */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
              <FaBriefcase className="text-lg" />
              {occupation}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              <FaMapMarkerAlt className="text-lg" />
              {presentdivision}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              <FaGenderless className="text-lg" />
              {gender}
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <p>
              <span className="font-semibold">Father's Name:</span> {father}
            </p>
            <p>
              <span className="font-semibold">Mother's Name:</span> {mother}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span> {date}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {age}
            </p>
            <p>
              <span className="font-semibold">Height:</span> {height}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {weight}
            </p>
            <p>
              <span className="font-semibold">Tone:</span> {race}
            </p>
            <p>
              <span className="font-semibold">Partner's Age:</span> {partnerAge}
            </p>
            <p>
              <span className="font-semibold">
                Expected Partner's Division:
              </span>{" "}
              {division}
            </p>
            <p>
              <span className="font-semibold">Expected Partner's Height:</span>{" "}
              {partnerHeight}
            </p>
            <p>
              <span className="font-semibold">Expected Partner's Weight:</span>{" "}
              {partnerWeight}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {isRole || isPending?.status == "approved" ? (
                mobile
              ) : (
                <span className="text-blue-500 italic">Premium users only</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {isRole || isPending?.status == "approved" ? (
                email
              ) : (
                <span className="text-blue-500 italic">Premium users only</span>
              )}
            </p>
          </div>

          {/* Action Buttons */}

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              { !isRole ? (
                <Link className="w-full" to={`/checkout/${id}`}>
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    {" "}
                    Contact <FaPhone />
                  </button>
                </Link>
              ) : (
                <button className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 flex items-center justify-center gap-2">
                  <FaUser></FaUser>  {isPending?.status == "pending" ? 'Premium User' :  'You Paid This'}
                </button>
              )} 

                  
            </div>
            <div className="w-full">
              <button
                onClick={() => addFav(data)}
                className="w-full px-4 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-100 flex items-center justify-center gap-2"
              >
                Add to Favorites <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
