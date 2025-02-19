import React from 'react';
import { Link, useParams } from 'react-router-dom';

const BioItem = ({ item }) => {
  const params = useParams();
  (item);

  return (
    <div className="flex flex-col m-4 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 my-6">
      <div className="flex justify-center items-center bg-gray-100 py-4">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={item.profileImage}
          alt="Profile"
        />
      </div>
      <div className="p-4">
        <h3 className="uppercase text-lg font-bold mb-2 text-gray-800">
          Biodata ID: {item.biodataId}
        </h3>
        <p className="text-gray-700 mb-1">Gender: {item.biodataType}</p>
        <p className="text-gray-700 mb-1">Division: {item.permanentDivision}</p>
        <p className="text-gray-700 mb-1">Age: {item.age}</p>
        <p className="text-gray-700 mb-1">Occupation: {item.occupation}</p>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end">
        <Link
          to={`/biodatadetail/${item._id}`}
          className="bg-[#46192c] w-full text-center text-white px-4 py-2 mt-6 rounded-lg font-semibold hover:bg-[#411628] transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default BioItem;