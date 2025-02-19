import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
          const res = await axiosSecure.get('/users');
          return res.data;
      }
  });

    const handleMakeAdmin = user => {
      axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
          (res.data)
          if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name} is an Admin Now!`,
                  showConfirmButton: false,
                  timer: 1500
              });
          }
      });
    };

    const handleMakePremium = user => {
        axiosSecure.patch(`/users/premium/${user._id}`)
        .then(res => {
            (res.data)
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is a premium user now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">All Users</h2>
            <h2 className="text-xl mb-6">Total Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-400">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-400 px-4 py-2 text-left text-sm sm:text-base">No</th>
                            <th className="border border-gray-400 px-4 py-2 text-left text-sm sm:text-base">User Name</th>
                            <th className="border border-gray-400 px-4 py-2 text-left text-sm sm:text-base">User Email</th>
                            <th className="border border-gray-400 px-4 py-2 text-left text-sm sm:text-base">Make Admin</th>
                            <th className="border border-gray-400 px-4 py-2 text-left text-sm sm:text-base">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-400 px-4 py-2 text-sm sm:text-base">{index + 1}</td>
                                <td className="border border-gray-400 px-4 py-2 text-sm sm:text-base">{user.name}</td>
                                <td className="border border-gray-400 px-4 py-2 text-sm sm:text-base">{user.email}</td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {user.role === 'admin' ? (
                                        'Admin'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {user.role === 'premium' ? (
                                        'Premium'
                                    ) : (
                                        <button
                                            onClick={() => handleMakePremium(user)}
                                            className="bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                                        >
                                            Make Premium
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

export default AllUsers;
