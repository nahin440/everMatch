import React from "react";
import useUser from "../../Hooks/useUser";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import usePublic from "../../Hooks/usePublic";

const ManageUser = () => {
  const [users, refetch, isPending] = useUser();
  const axiosSecure = useAxios();
  const axiosPub = usePublic()

  function handleAdmin(id) {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Make This User As a Asmin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPub.patch(`/users/${id}`)
        .then(res => {
          if (res.data.modifiedCount > 0){
             refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This User is Now Admin`,
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


  function handlePremimum(id) {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Make This User As a Asmin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/premium/${id}`)
        .then(res => {
          if (res.data.modifiedCount > 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This User is Premium`,
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
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
        Manage Users
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
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Admin Status
              </th>
              <th scope="col" className="px-6 py-4">
                Role
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
            ) : users && users.length > 0 ? (
              users.map((item, idx) => (
                <tr
                  key={item._id}
                  className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-center font-semibold">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item?.email || "Not Provided"}</td>
                  <td className="px-6 py-4">
                    {item?.admin === "Not-admin" ? (
                      <button
                        onClick={() => handleAdmin(item._id)}
                        className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-600"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                        Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    {item?.userRole === "User" ? (
                      <button onClick={()=>handlePremimum(item._id)} className="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm hover:bg-indigo-600">
                        Make Premium
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-orange-400 text-white rounded-md text-sm hover:bg-orange-500">
                        Premimum
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
