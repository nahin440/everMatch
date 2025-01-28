import React from 'react'
import useReview from '../../Hooks/useReview'
import Swal from 'sweetalert2';
import { BiBookOpen } from 'react-icons/bi';

const SuccesstoryTable = () => {
    const [review , isPending] = useReview([]);

    function storyView(data) {
        Swal.fire({
          title: "Story Details",
          html: `
            <div style="text-align: left; font-size: 16px;">
              <div style="display: flex; align-items: center; gap: 20px;">
                <img src="${data.image}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #4CAF50;">
                <div>
                  <p><strong>Self ID:</strong> ${data.self}</p>
                  <p><strong>Partner ID:</strong> ${data.partner}</p>
                  <p><strong>Date:</strong> ${data.date}</p>
                </div>
              </div>
              <p style="margin-top: 10px; font-size: 18px;"><strong>Story:</strong></p>
              <blockquote style="font-style: italic; background-color: #f9f9f9; padding: 10px; border-left: 5px solid #4CAF50; border-radius: 5px;">
                ${data.story}
              </blockquote>
            </div>
          `,
          icon: "success",
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            popup: "custom-popup"
          }
        });
      }
      
  return (
    <div>
     <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Manage review
    </h2>
    <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-200 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-4 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Self Biodata
            </th>
            <th scope="col" className="px-6 py-4">
             Partner's Biodata
            </th>
            <th scope="col" className="px-6 py-4">
               Action
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
          ) : review && review.length > 0 ? (
            review.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-center font-semibold">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.self}
                </td>
               
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.partner}
                </td>
                <td className="px-6 py-4">
                  <button onClick={()=>storyView(item)} className="btn btn-xs px-3 py-1 bg-violet-500 text-center text-semibold text-white"> <BiBookOpen></BiBookOpen> View Story</button>
                </td>               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No review found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>



  )
}

export default SuccesstoryTable