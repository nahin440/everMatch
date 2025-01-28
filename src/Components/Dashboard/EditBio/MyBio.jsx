import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useBiodata from '../../Hooks/useBiodata';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import { FaBitcoin, FaBriefcase, FaGenderless } from 'react-icons/fa6';
import { FaArrowLeft, FaCoins, FaMapMarkerAlt } from 'react-icons/fa';

const MyBio = () => {
    const {user} = useAuth();
    const [biodata] = useBiodata([]) || [];
    const favourate =  biodata.find(bio => bio?.email == user?.email);

    // console.log(favourate , 'opar');
    const axiosSecure = useAxios();
    const  {
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
      role,
      email  
    } = favourate || {}


    function handlePremium(item){
        console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "Make It Premium Bio Data",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yeah! Sure? "
          }).then((result) => {
            if (result.isConfirmed) {
                    axiosSecure.post('/premium-biodata', item)
                    .then((res) => {
                      console.log(res.data);
                      if (res.data.insertedId) {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `Request Send Succesfully`,
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      }
                    })
            }
          });
    } 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

    {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Occupatcion
                </th>
                <th scope="col" className="px-6 py-3">
                   Division
                </th>
                <th scope="col" className="px-6 py-3">
                    age
                </th>
                <th scope="col" className="px-6 text-center py-3">
                    Action
                </th>

            </tr>
        </thead>
        <tbody>
            {
              favourate && favourate.map((item,idx )=> <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className='mr-1'>({idx+1}) </span>   {item.name} 
                </th>
                <td className="px-6 py-4">
                    {item?.occupation}
                </td>
                <td className="px-6 py-4">
                    {item.division}
                </td>
                <td className="px-6 py-4">
                   {item.age}
                </td>
                <td className="px-6 py-4 flex justify-center gap-3 items-center ">
                    <Link  to={`/dashboard/edit/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><button>
                    Edit
                        </button></Link>
                        {
                          item?.role == 'user' ? 
                        <button onClick={()=>handlePremium(item)} className="btn-xs hover:bg-orange-500 rounded-lg text-white font-semibold bg-red-500">Make Premium</button>
                         : 
                        <button className="btn-xs hover:bg-violet-300 rounded-lg  text-violet-700 font-semibold  bg-violet-200">Premium data</button>

                        }
                </td>
            </tr>)
            }
            
        </tbody>
    </table> */}

{favourate ? (
  <div className="max-w-4xl mx-auto bg-gradient-to-tr from-blue-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105">
    {/* Image Section */}
    <div className="relative">
      <img
        src={image || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
        alt={`${name}'s photo`}
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-0 left-0 bg-gradient-to-b from-black/50 to-transparent w-full h-full flex items-center justify-center text-white">
        <h2 className="text-4xl font-bold tracking-widest">{name}</h2>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-8">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-800 font-medium rounded-full shadow-sm">
          <FaBriefcase className="text-lg" />
          {occupation || "Occupation Unknown"}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-full shadow-sm">
          <FaMapMarkerAlt className="text-lg" />
          {presentdivision || "No Division"}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-full shadow-sm">
          <FaGenderless className="text-lg" />
          {gender || "Gender Unknown"}
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <p>
          <span className="font-semibold">Father's Name:</span> {father || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Mother's Name:</span> {mother || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span> {date || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Age:</span> {age || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Height:</span> {height || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {weight || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Tone:</span> {race || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Partner's Age:</span> {partnerAge || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Expected Partner's Division:</span>{" "}
          {division || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Expected Partner's Height:</span>{" "}
          {partnerHeight || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Expected Partner's Weight:</span>{" "}
          {partnerWeight || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Mobile:</span> {mobile || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {role || "Not Provided"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => handlePremium(favourate)}
          className="w-full flex items-center gap-2 md:w-auto px-6 py-3 text-white font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <FaCoins></FaCoins> Make Premium
        </button>
      </div>
    </div>
  </div>
) : (
  <p className="text-center text-2xl py-5 flex gap-4 justify-center items-center text-red-600 font-medium mt-6">
   <FaArrowLeft></FaArrowLeft> Please create your own bio data. 
  </p>
)}

            </div>

  )
}

export default MyBio