import { useLoaderData, useNavigate } from "react-router-dom";  
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../components/provider/AuthProvider";
import usePremium from "../hooks/usePremium";

const BiodataDetails = () => {
  const bio = useLoaderData(); // Main biodata details
  const [similarBiodata, setSimilarBiodata] = useState([]); // State for similar biodata
  const { user } = useContext(AuthContext); // Logged-in user
  const navigate = useNavigate();  
  const [isPremium] = usePremium();

  useEffect(() => {
    if (!bio.biodataType) return; // Prevent fetching if data is missing

    // Fetch similar biodata based on biodataType (gender)
    const fetchSimilarBiodata = async () => {
      try {
        const response = await fetch(
          `https://matrimony-server-dun.vercel.app/biodata?biodataType=${bio.biodataType}&limit=3`
        );
        const data = await response.json();
        setSimilarBiodata(data);
      } catch (error) {
        console.error("Error fetching similar biodata:", error);
      }
    };

    fetchSimilarBiodata();
  }, [bio.biodataType]);

  // Handle Add to Favourites
  const handleAddToFavourites = async () => {
    if (!user) {
      Swal.fire("Error", "You need to log in to add to favourites!", "error");
      return;
    }

    try {
      const favouriteData = {
        userId: user._id,
        biodataId: bio.biodataId,  
        name: bio.name,
        permanentAddress: bio.permanentDivision,
        occupation: bio.occupation,
        email: user.email,
      };

      const response = await axios.post("https://matrimony-server-dun.vercel.app/favourites", favouriteData);

      if (response.status === 200) {
        Swal.fire("Success", response.data.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add to favourites", "error");
      console.error("Error adding to favourites:", error);
    }
  };

  // Handle Request Contact Information
  const handleRequestContactInfo = () => {
    navigate(`/checkout/${bio.biodataId}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Main Biodata Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <img
          src={bio.profileImage}
          alt="Profile"
          className="w-[180px] h-[180px] object-cover rounded-full border-4 border-green-500 shadow-md"
        />
        <h1 className="text-2xl font-bold text-center mt-4">
          Biodata ID: {bio.biodataId}
        </h1>
        <p className="text-gray-600">{bio.name} | {bio.biodataType}</p>
        <p className="font-semibold text-gray-700">{bio.occupation}</p>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-gray-700">
          <p><strong>Age:</strong> {bio.age}</p>
          <p><strong>Height:</strong> {bio.height}</p>
          <p><strong>Weight:</strong> {bio.weight}</p>
          <p><strong>Father:</strong> {bio.fatherName}</p>
          <p><strong>Mother:</strong> {bio.motherName}</p>
          <p><strong>Permanent Division:</strong> {bio.permanentDivision}</p>
          <p><strong>Present Division:</strong> {bio.presentDivision}</p>
        </div>

        {/* Expected Partner Details */}
        <div className="mt-6 p-4 w-full bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-lg text-gray-800">🔹 Expected Partner</h2>
          <p><strong>Age:</strong> {bio.expectedPartnerAge}</p>
          <p><strong>Height:</strong> {bio.expectedPartnerHeight}</p>
          <p><strong>Weight:</strong> {bio.expectedPartnerWeight}</p>
        </div>

        {/* Contact Information */}
        {isPremium ? (
          <div className="mt-6 p-6 bg-blue-100 rounded-lg w-full text-center">
            <h2 className="font-semibold text-lg text-blue-800">📞 Contact Information</h2>
            <p><strong>Email:</strong> {bio.contactEmail}</p>
            <p><strong>Mobile:</strong> {bio.mobileNumber}</p>
          </div>
        ) : (
          <button
            onClick={handleRequestContactInfo}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Request Contact Information
          </button>
        )}

        {/* Add to Favourites */}
        <button
          onClick={handleAddToFavourites}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add to Favourites
        </button>
      </div>

      {/* Similar Biodata Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">🔍 Similar Biodata</h2>
        {similarBiodata.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBiodata.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={item.profileImage}
                  alt="Profile"
                  className="w-[100px] h-[100px] object-cover rounded-full border-2 border-gray-300"
                />
                <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                <p className="text-gray-600">{item.biodataType} | {item.age} yrs</p>
                <p className="text-gray-700 font-semibold">{item.occupation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No similar biodata found.</p>
        )}
      </div>
    </div>
  );
};

export default BiodataDetails;
