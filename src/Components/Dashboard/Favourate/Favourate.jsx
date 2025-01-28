import { Link } from 'react-router-dom';
import useFav from '../../Hooks/useFav'
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Shared/Loading';

const Favourate = () => {
   const [favourate , fetch , isLoading] = useFav() || [];
   console.log(favourate);
   const {user} = useAuth()
   const axiosSecure = useAxios();
  //  console.log(favourate);
   
   const favData = favourate && favourate.filter(fav => fav?.userEmail == user?.email);
   console.log(favData);

   function handleDelete(id){
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/favourate/${id}`)
            .then(res => {
              if (res.data.deletedCount > 0){
                fetch()
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `This User Removed from Your Favourate List`,
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
    <div>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Occupatcion
                </th>
                <th scope="col" className="px-6 py-3">
                   Division
                </th>
                <th scope="col" className="px-6 py-3">
                    age
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {isLoading ? <Loading></Loading> :
              favData && favData.map((item,idx )=> <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className='mr-1'>({idx+1}) </span>   {item.name} 
                </th>
                <td className="px-6 py-4">
                    {item?.occupation}
                </td>
                <td className="px-6 py-4">
                    {item.division}
                </td>
                <td className="px-6 py-4">
                   {item.age}
                </td>
                <td className="px-6 py-4 flex gap-3 items-center ">
                   <button onClick={()=>handleDelete(item._id)} className="btn btn-xs  text-white rounded-lg bg-red-500"><FaTrash></FaTrash></button>
                </td>
            </tr>)
            }
            
        </tbody>
    </table>
</div>

    </div>
  )
}

export default Favourate