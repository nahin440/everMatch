import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";

const BiodataView = () => {
  const { user } = UseAuth();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const response = await axios.get("http://localhost:5000/biodata");
        const userBiodata = response.data.find(
          (item) => item.ContactEmail === user?.email
        );

        if (userBiodata) {
          setBiodata(userBiodata);
        }
      } catch (error) {
        console.error("Error fetching biodata:", error);
        Swal.fire("Error", "Failed to fetch biodata. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBiodata();
    }
  }, [user?.email]);

  const handleMakePremium = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send this biodata for premium approval?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:5000/biodata/premium/${biodata._id}`);
          Swal.fire(
            "Request Sent",
            "Your biodata has been sent for premium approval.",
            "success"
          );
        } catch (error) {
          console.error("Error sending for premium approval:", error);
          Swal.fire("Error", "Failed to send biodata for premium approval.", "error");
        }
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg font-medium">Loading biodata...</p>;
  }

  if (!biodata) {
    return <p className="text-center mt-10 text-lg font-medium text-red-600">No biodata found.</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">View Biodata</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl space-y-6">
        <div className="flex justify-center mb-6">
          <img
            src={biodata.ProfileImage}
            alt={biodata.Name}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200 font-semibold text-sm">Field</th>
                <th className="px-4 py-2 border border-gray-200 font-semibold text-sm">Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries({
                "Biodata Type": biodata.BiodataType,
                Name: biodata.Name,
                "Date of Birth": biodata.DateOfBirth,
                Height: biodata.Height,
                Weight: biodata.Weight,
                Age: biodata.Age,
                Occupation: biodata.Occupation,
                Race: biodata.Race,
                "Father's Name": biodata.FathersName,
                "Mother's Name": biodata.MothersName,
                "Permanent Division": biodata.PermanentDivision,
                "Present Division": biodata.PresentDivision,
                "Expected Partner Age": biodata.ExpectedPartnerAge,
                "Expected Partner Height": biodata.ExpectedPartnerHeight,
                "Expected Partner Weight": biodata.ExpectedPartnerWeight,
                "Contact Email": biodata.ContactEmail,
                "Mobile Number": biodata.MobileNumber,
              }).map(([field, value]) => (
                <tr key={field} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700">
                    {field}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-sm text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleMakePremium}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Make Biodata Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiodataView;
