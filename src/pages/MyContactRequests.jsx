import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../components/provider/AuthProvider";

const MyContactRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch contact requests for the user
        axiosSecure.get(`/my-contact-requests?email=${user.email}`)
            .then(res => {
                ("Fetched Requests:", res.data);
                setRequests(res.data);
            })
            .catch(err => {
                console.error("Error fetching contact requests:", err);
            });
    }, [user.email, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contact-requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your contact request has been deleted.", "success");
                            // Update the requests state to reflect the deleted request
                            setRequests(requests.filter(request => request._id !== id));
                        }
                    })
                    .catch(err => {
                        console.error("Error deleting contact request:", err);
                        Swal.fire("Error", "Something went wrong! Please try again later.", "error");
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">My Contact Requests</h2>

            {/* Responsive table container */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-sm sm:text-base">Biodata ID</th>
                            <th className="border border-gray-300 p-2 text-sm sm:text-base">Status</th>
                            <th className="border border-gray-300 p-2 text-sm sm:text-base">Mobile No</th>
                            <th className="border border-gray-300 p-2 text-sm sm:text-base">Email</th>
                            <th className="border border-gray-300 p-2 text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <tr key={request._id} className="text-center">
                                    <td className="border border-gray-300 p-2 text-sm sm:text-base">
                                        {request.biodataId || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm sm:text-base">
                                        {request.status}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm sm:text-base">
                                        {/* Display mobile number if approved, otherwise show "Hidden" */}
                                        {request.status === "approved" ? request.mobile || "N/A" : "Hidden"}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm sm:text-base">
                                        {/* Display email if approved, otherwise show "Hidden" */}
                                        {request.status === "approved" ? request.email || "N/A" : "Hidden"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleDelete(request._id)}
                                            className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 text-sm sm:text-base"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-sm sm:text-base">
                                    No contact requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContactRequests;



