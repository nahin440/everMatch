import React, { useEffect, useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import usePayment from '../../Hooks/usePayment';

const ContuctApproved = () => {
  const [payments,  refetch, isPending] = usePayment();
  // console.log(payments);
  const axiosSecure = useAxios();
  console.log(payments , 'user');

    function handleApproved(id) {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "Make Him/Her Approved?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Approved!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/payments/${id}`)
          .then(res => {
            if (res.data.modifiedCount > 0){
               refetch()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Approved Successfull!`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
  
        }
      });
    }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Manage payments
    </h2>
    <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-200 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-4 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
             partner's Email
            </th>
            <th scope="col" className="px-6 py-4">
               Age
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan="5" className="text-center py-8">
                <div className="flex items-center justify-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
                  <span className="ml-3 text-gray-600 text-lg">
                    Loading...
                  </span>
                </div>
              </td>
            </tr>
          ) : payments && payments.length > 0 ? (
            payments.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-center font-semibold">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.ownername}
                </td>
                <td className="px-6 py-4">{item?.email|| "Not Provided"}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  {item.age}
                </td>
                <td className="px-6 py-4">
                        {item?.status == 'pending' ? <button
                        className="px-3 py-1 font-semibold bg-purple-100 text-purple-600 rounded-md text-sm hover:bg-purple-300"                       
                        onClick={()=>handleApproved(item._id)}> Pending</button> : <button 
                        className="px-3 font-semibold py-1 bg-green-200 text-green-600 rounded-lg text-sm hover:bg-violet-300"                     
                        >{item.status}</button>}
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ContuctApproved