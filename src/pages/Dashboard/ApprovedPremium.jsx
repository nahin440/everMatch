import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://evermatch-server.vercel.app/premiumRequests');
        setPendingRequests(res.data); // Store the pending requests
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  // Handle the approval of a premium request
  const handleApprovePremium = async (id) => {
    try {
      // Send a PATCH request to approve the premium request
      const res = await axios.patch(`https://evermatch-server.vercel.app/premium-requests/${id}`, {
        status: 'approved', // Update the status to 'approved' (if required by backend)
      });
  
      if (res.data.message === 'Biodata approved as premium') {
        // Remove the approved request from the pending requests list
        setPendingRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
  
        // Show a success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Biodata approved successfully.',
          confirmButtonColor: '#4CAF50', // Optional: Customize button color
        });
      }
    } catch (error) {
      console.error('Error approving premium request:', error);
  
      // Show an error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error approving the request. Please try again.',
        confirmButtonColor: '#FF0000', // Optional: Customize button color
      });
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Premium Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Biodata ID</th>
              <th className="border px-4 py-2">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request._id}>
                
                <td className="border px-4 py-2">{request.email}</td>
                <td className="border px-4 py-2">{request.biodataId}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleApprovePremium(request._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedPremium;
