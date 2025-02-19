import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PremiumMembers = () => {
  const [members, setMembers] = useState([]);
  const [sortOrder, setSortOrder] = useState('ascending'); // Default sort order
  (members);

  // Fetch premium members from the backend
  useEffect(() => {
    const fetchPremiumMembers = async () => {
      try {
        const res = await axios.get('https://evermatch-server.vercel.app/premium-memberss');
        const sortedMembers = sortMembers(res.data, sortOrder); // Sort members by default order
        setMembers(sortedMembers);
      } catch (error) {
        console.error('Error fetching premium members:', error);
      }
    };

    fetchPremiumMembers();
  }, [sortOrder]); // Re-fetch or re-sort when sortOrder changes

  // Sort members based on age
  const sortMembers = (members, order) => {
    return [...members].sort((a, b) => {
      if (order === 'ascending') {
        return a.age - b.age;
      } else if (order === 'descending') {
        return b.age - a.age;
      }
      return 0;
    });
  };

  // Handle change in sort order
  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update sort order state
  };

  return (


    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Premium Members
      </h2>

      {/* Dropdown for sorting */}
      <div className="flex justify-end items-center mb-6">
        <label htmlFor="sortOrder" className="mr-2 font-medium text-gray-700">
          Sort by Age:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#411628] transition"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      {/* Member cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.biodataId}
            className="bg-[#e0e0d7] shadow-md rounded-xl overflow-hidden transition hover:shadow-lg transform hover:-translate-y-1"
          >
            {/* Full-width Profile Image */}
            <div className='h-56' >
            <img
              src={member.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            </div>

            {/* Biodata Information */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Biodata ID: {member.biodataId}
              </h3>
              <p className="text-gray-600">Type: {member.biodataType}</p>
              <p className="text-gray-600">Division: {member.permanentDivision}</p>
              <p className="text-gray-600">Age: {member.age}</p>
              <p className="text-gray-600 mb-4">Occupation: {member.occupation}</p>

              {/* View Profile Button */}
              <Link
                to={`/biodatadetail/${member._id}`}
                className="inline-block bg-[#411628] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#5a2039] transition"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
};

export default PremiumMembers;
