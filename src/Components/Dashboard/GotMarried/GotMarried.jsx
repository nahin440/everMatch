import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const GotMarried = () => {

    const [rating , setRating] = useState(null);
    const axiosSecure = useAxios()

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const self = form.self.value;
        const partner = form.partner.value;
        const date = form.date.value;
        const image = form.image.value;
        const story = form.story.value;

        const stroryData ={
            self ,
            partner,
            date,
            image,
            story
        }

        // console.log(stroryData);

        axiosSecure.post('/success',stroryData)
        .then(res => {
            console.log(res.data);
                        if (res.data.insertedId) {
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Your Success Story has been saved`,
                            showConfirmButton: false,
                            timer: 1000,
                          });
                        }
        })

        form.reset()
    }


  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-lg">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Got Married? Share Your Story!</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Self Biodata ID */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Self Biodata ID</label>
          <input
            type="text"
            name="self"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your biodata ID"
          />
        </div>

              {/* Partner Biodata ID */}
         <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Partner Biodata ID</label>
          <input
            type="text"
            name="partner"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your partner's biodata ID"
          />
        </div>

        {/* Marriage Date */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Marriage Date</label>
          <input
            type="date"
            name="date"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Country Selector */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Country</label>
          <select
            onChange={e=>setRating(e.target.value)}
            name="country"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>
              Rate Us!
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

  

        {/* Couple Image */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Couple Image</label>
          <input
            type="url"
            name="image"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter image link"
          />
        </div>

        {/* Success Story */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Success Story Review</label>
          <textarea
            name="story"
            rows="5"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your feelings for using this website..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarried;
