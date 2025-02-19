import React, { useState } from "react";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    successStory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !formData.selfBiodataId ||
      !formData.partnerBiodataId ||
      !formData.coupleImage ||
      !formData.successStory
    ) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
        text: "Please fill out the entire form before submitting.",
      });
      return;
    }

    // Simulating API call to add success story (replace this with actual API)
    try {
      const response = await fetch("https://evermatch-server.vercel.app/successStories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Story Submitted!",
          text: "Your success story has been added to our collection.",
        });

        // Reset form
        setFormData({
          selfBiodataId: "",
          partnerBiodataId: "",
          coupleImage: "",
          successStory: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to submit",
          text: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting story:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was a problem submitting your story. Please try again later.",
      });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-b from-gray-100 to-gray-300 shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Got Married? Share Your <span className="text-gray-600">Story</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Self Biodata ID */}
        <div>
          <label
            htmlFor="selfBiodataId"
            className="block font-medium text-gray-700 mb-2"
          >
            Your Biodata ID
          </label>
          <input
            type="text"
            id="selfBiodataId"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
            placeholder="Enter your biodata ID"
          />
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label
            htmlFor="partnerBiodataId"
            className="block font-medium text-gray-700 mb-2"
          >
            Partner's Biodata ID
          </label>
          <input
            type="text"
            id="partnerBiodataId"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
            placeholder="Enter partner's biodata ID"
          />
        </div>

        {/* Couple Image */}
        <div>
          <label
            htmlFor="coupleImage"
            className="block font-medium text-gray-700 mb-2"
          >
            Couple Image Link
          </label>
          <input
            type="text"
            id="coupleImage"
            name="coupleImage"
            value={formData.coupleImage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
            placeholder="Enter the image URL"
          />
        </div>

        {/* Success Story */}
        <div>
          <label
            htmlFor="successStory"
            className="block font-medium text-gray-700 mb-2"
          >
            Share Your Story
          </label>
          <textarea
            id="successStory"
            name="successStory"
            value={formData.successStory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
            rows="5"
            placeholder="Write your success story here"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#411628] text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default UserDashboard;
