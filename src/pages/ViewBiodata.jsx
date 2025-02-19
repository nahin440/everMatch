import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../components/provider/AuthProvider";

const ViewBiodata = () => {
  const { user } = useContext(AuthContext); 
  (user)// Logged-in user context
  const [biodata, setBiodata] = useState(null); // Stores user's biodata
  // const [isPremium, setIsPremium] = useState(false); // Tracks premium status
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [loading, setLoading] = useState(false); // Tracks loading state

  // Fetch user biodata on component mount
  useEffect(() => {
    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://evermatch-server.vercel.app/biodatas/${user?.email}`);
        if (res.data) {
          setBiodata(res.data);
          // setIsPremium(res.data.isPremium);
          ("Fetched biodata:", res.data);
        }
      } catch (error) {
        console.error("Error fetching biodata:", error);
        Swal.fire("Error", "Failed to fetch biodata. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [user.email]);

  // Show modal for premium confirmation
  const handleMakePremium = () => {
    setShowModal(true);
  };

  // Confirm premium request
  const handleConfirmPremium = async () => {
    if (!user || !user?.email) {
      console.error("Biodata or Contact Email is missing.");
      Swal.fire("Error", "Biodata information is incomplete. Please try again.", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://evermatch-server.vercel.app/premium-requests/${user?.email}/${biodata.biodataId}`);
(res.data)
      if (res.data.message === "Premium request submitted successfully.") {
        // setIsPremium(false); // Biodata is pending approval
        setShowModal(false); // Close modal
        Swal.fire("Success", "Your biodata has been sent for admin approval.", "success");
      }
    } catch (error) {
      console.error("Error sending biodata for approval:", error);
      Swal.fire("Error", "Failed to send biodata for approval. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Cancel premium request modal
  const handleCancelPremium = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Biodata</h2>

      {/* Loader */}
      {loading ? (
        <p>Loading biodata...</p>
      ) : biodata ? (
        <div>
          <div>
            <strong>Biodata ID:</strong> {biodata.biodataId}
          </div>
          <div>
            <strong>Name:</strong> {biodata.biodataType}
          </div>
          <div>
            <strong>Name:</strong> {biodata.name}
          </div>
          <div>
            <strong>Profile Image:</strong>{" "}
            <img src={biodata.profileImage} alt="Profile" width="100" />
          </div>
          <div>
            <strong>Date of Birth:</strong> {biodata.dob}
          </div>
          <div>
            <strong>Height:</strong> {biodata.height}
          </div>
          <div>
            <strong>Weight:</strong> {biodata.weight}
          </div>
          <div>
            <strong>Age:</strong> {biodata.age}
          </div>
          <div>
            <strong>Occupation:</strong> {biodata.occupation}
          </div>
          <div>
            <strong>Race:</strong> {biodata.race}
          </div>
          <div>
            <strong>Father's Name:</strong> {biodata.fatherName}
          </div>
          <div>
            <strong>Mother's Name:</strong> {biodata.motherName}
          </div>
          <div>
            <strong>Permanent Division:</strong> {biodata.permanentDivision}
          </div>
          <div>
            <strong>Present Division:</strong> {biodata.presentDivision}
          </div>
          <div>
            <strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}
          </div>
          <div>
            <strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}
          </div>
          <div>
            <strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}
          </div>
          <div>
            <strong>Contact Email:</strong> {biodata.contactEmail}
          </div>
          <div>
            <strong>Mobile Number:</strong> {biodata.mobileNumber}
          </div>
          {/* {!isPremium && ( */}
            <button
              onClick={handleMakePremium}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Biodata to Premium 
            </button>
          
        </div>
      ) : (
        <p>No biodata found.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to send your biodata for admin approval?
            </h3>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmPremium}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleCancelPremium}
                className="bg-[#411628] text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBiodata;

