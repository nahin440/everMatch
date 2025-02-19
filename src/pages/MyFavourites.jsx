import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../components/provider/AuthProvider";

const MyFavourites = () => {
  const { user } = useContext(AuthContext); // To get the logged-in user
  const [favourites, setFavourites] = useState([]);

  // Fetch the user's favourite biodata
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(`https://evermatch-server.vercel.app/favourites/${user.email}`);
        setFavourites(res.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching favourite biodata:", error);
        Swal.fire("Error", "Failed to fetch favourite biodata.", "error");
      }
    };

    if (user?.email) {
      fetchFavourites();
    }
  }, [user]);

  // Table headers
  const tableHeaders = ["Name", "Biodata ID", "Permanent Address", "Occupation", "Action"];

  // Handle delete
  const handleDelete = async (_id) => {
    try {
      // Make a DELETE request with the _id
      const res = await axios.delete(`https://evermatch-server.vercel.app/favourites/${_id}`);
      
      // Show a success alert
      Swal.fire("Success", res.data.message, "success");
      
      // Remove the deleted item from the state
      setFavourites(favourites.filter((fav) => fav._id !== _id));
    } catch (error) {
      console.error("Error deleting favourite biodata:", error);
      // Show an error alert
      Swal.fire("Error", "Failed to delete favourite biodata.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Favourite Biodata</h2>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-500">No favourite biodata found.</p>
      ) : (
        // Responsive table container
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {favourites.map((fav) => (
                <tr key={fav.biodataId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                    {fav.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                    {fav.biodataId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                    {fav.permanentAddress || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                    {fav.occupation || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavourites;
