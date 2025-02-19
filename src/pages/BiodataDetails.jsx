import { useLoaderData, useNavigate } from "react-router-dom";  // Import useNavigate
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../components/provider/AuthProvider";
import usePremium from "../hooks/usePremium";

const BiodataDetails = () => {
  const bio = useLoaderData(); // Main biodata details
  // alert(bio.name)
  const [similarBiodata, setSimilarBiodata] = useState([]); // State for similar biodata
  const { user } = useContext(AuthContext); // Get the logged-in user
  const navigate = useNavigate();  // Initialize useNavigate
  // const [isAdmin] = useAdmin();
  const [isPremium] = usePremium();

  useEffect(() => {
    // Fetch similar biodata based on biodataType (gender)
    const fetchSimilarBiodata = async () => {
      try {
        const response = await fetch(
          `https://matrimony-server-dun.vercel.app/biodata?biodataType=${bio.biodataType}&limit=3`
        ); // Query similar biodata
        const data = await response.json();
        setSimilarBiodata(data);
      } catch (error) {
        console.error("Error fetching similar biodata:", error);
      }
    };

    fetchSimilarBiodata();
  }, [bio.biodataType]); // Dependency on the biodataType

  // Handle Add to Favourites
  const handleAddToFavourites = async () => {
    if (!user) {
      Swal.fire("Error", "You need to log in to add to favourites!", "error");
      return;
    }

    try {
      const favouriteData = {
        userId: user._id,
        biodataId: bio.biodataId,  // Use _id here for the biodata identifier
        name: bio.name,
        permanentAddress: bio.permanentDivision,
        occupation: bio.occupation,
        email: user.email, // Assuming user has an email field
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

  // Handle Request Contact Information Button Click
  const handleRequestContactInfo = () => {
    // Navigate to the checkout page for the specific biodata
    
    navigate(`/checkout/${bio.biodataId}`);
    
  };

  return (
    <div className="p-6">
      {/* Main Biodata Details */}
      <div className="flex flex-col items-center justify-center mb-10">
        <img
          src={bio.profileImage}
          alt="Profile"
          className="w-[200px] h-[200px] object-cover rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold text-center">Biodata ID:{bio.biodataId}</h1>
        <p>Name: {bio.name}</p>
        <p>Gender: {bio.biodataType}</p>
        <p>Age: {bio.age}</p>
        <p>Occupation: {bio.occupation}</p>
        <p>Height: {bio.height}</p>
        <p>Weight: {bio.weight}</p>
        <p>Father Name: {bio.fatherName}</p>
        <p>Mother Name: {bio.motherName}</p>
        <p>Permanent Division: {bio.permanentDivision}</p>
        <p>Present Division: {bio.presentDivision}</p>
        <p>Expected Partner Age: {bio.expectedPartnerAge}</p>
        <p>Expected Partner Height: {bio.expectedPartnerHeight}</p>
        <p>Expected Partner Weight: {bio.expectedPartnerWeight}</p>


        
       
        
        {
                        isPremium ? (<>
                        <div className="font-bold bg-slate-200 p-10">
                        <p>Contact Information:</p>
                        <p>Email: {bio.contactEmail}</p>
                        <p>Mobile: {bio.mobileNumber}</p>
                        </div>
                        </>) : (<>
                         <button
          onClick={handleRequestContactInfo}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Request Contact Information
        </button>
                        </>)
        }
        {/* Request Contact Information Button */}
        {/* <button
          onClick={handleRequestContactInfo}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Request Contact Information
        </button> */}

<button
          onClick={handleAddToFavourites}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add to Favourites
        </button>
      </div>

      {/* Similar Biodata Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Similar Biodata
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarBiodata.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={item.profileImage}
                alt="Profile"
                className="w-[100px] h-[100px] object-cover rounded-full mb-2"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>Gender: {item.biodataType}</p>
              <p>Age: {item.age}</p>
              <p>Occupation: {item.occupation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;

