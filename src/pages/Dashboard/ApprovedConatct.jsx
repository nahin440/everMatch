import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedContact = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch contact requests
        axiosSecure.get('/my-contact-requests')
            .then(res => {
                setRequests(res.data);
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
            });
    }, [axiosSecure]);

    const handleApprove = (id) => {
        // Show confirmation prompt
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Send request to approve the contact request
                axiosSecure.patch(`/contact-requests/${id}`, { status: 'approved' })
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Request approved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setRequests(requests.map(request => 
                                request._id === id ? { ...request, status: 'approved' } : request
                            ));
                        }
                    })
                    .catch((err) => {
                        console.error("Error approving request:", err);
                        Swal.fire("Error", "Something went wrong! Please try again later.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Contact Requests for Approval</h2>
     
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">Transaction ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                    {new Date(request.date).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                    {request.transactionId}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                    {request.status}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {request.status === 'pending' && (
                                        <button 
                                            onClick={() => handleApprove(request._id)} 
                                            className="bg-green-500 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedContact;

