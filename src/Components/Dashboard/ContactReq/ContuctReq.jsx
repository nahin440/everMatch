import React from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
// import useContact from "../../Hooks/useContact";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import usePayment from "../../Hooks/usePayment";

const ContuctReq = () => {
  const [payments , refetch , isLoading] = usePayment([]) || []
  console.log(payments , 'payments');
  const axiosSecure = useAxios();
  // console.log(payments);
  const {user} = useAuth();

  const finduser = payments && payments.filter(pay => pay?.userEmail == user?.email);
  console.log(finduser);



  function handleDelete(id) {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/payments/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              fetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This User Removed from Your Fvourate List`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch ()
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Something Happend Wrong!`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" p-2 rounded-lg shadow-md mb-6 flex justify-between">
        <h2 className="text-3xl font-bold text-blue-800">Contact Requests</h2>
        <span className=" mt-2 text-sm font-semibold py-1 rounded-lg px-4 bg-blue-300">Welcome, {user?.email}</span>
      </div>
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Occupation</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Mobile</th>
            <th scope="col" className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <div className="flex items-center justify-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
                  <span className="ml-2 text-gray-600">Loading...</span>
                </div>
              </td>
            </tr>
          ) : finduser && finduser.length > 0 ? (
            finduser.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span className="mr-1 font-semibold text-blue-600">
                    ({idx + 1})
                  </span>{" "}
                  {item.ownername}
                </th>
                <td className="px-6 py-4">{item?.occupation || "Not Given"}</td>
                <td >
                  <span  className={`px-5 py-1 text-center font-medium rounded-xl ${
                    item.status === "approved"
                      ? "text-violet-800 bg-violet-100"
                      : "text-blue-800 bg-blue-100"
                  }`}>
                  {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.status === "approved" ? (
                    <span className="text-gray-700 font-semibold">{item?.email || 'email@gmail.com'}</span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Make Payment
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {item.status === "approved" ? (
                    <span className="text-gray-700 font-semibold">{item?.mobile}</span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Make Payment
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-white bg-red-500 hover:bg-red-600 rounded-full"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No payment records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ContuctReq;
