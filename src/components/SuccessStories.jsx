import React, { useState, useEffect } from "react";

const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]); // Holds all success stories
  const [selectedStory, setSelectedStory] = useState(null); // Holds the selected story for the modal
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  // Fetch success stories from the backend
  useEffect(() => {
    fetch("https://evermatch-server.vercel.app/successStories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessStories(data.data);
        }
      })
      .catch((error) => console.error("Error fetching success stories:", error));
  }, []);

  // Function to handle opening the modal
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Success Stories</h1>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        {/* Table to display success stories */}
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Male Biodata ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Female Biodata ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {successStories.length > 0 ? (
              successStories.map((story) => (
                <tr key={story._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{story.selfBiodataId}</td>
                  <td className="border border-gray-300 px-4 py-2">{story.partnerBiodataId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewStory(story)}
                      className="bg-[#411628] hover:bg-gray-700 text-white py-1 px-3 rounded"
                    >
                      View Story
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No success stories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to show the full story */}
      {showModal && selectedStory && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Success Story</h2>
            <p>
              <strong>Male Biodata ID:</strong> {selectedStory.selfBiodataId}
            </p>
            <p>
              <strong>Female Biodata ID:</strong> {selectedStory.partnerBiodataId}
            </p>
            <p className="my-4">
              <strong>Couple Image:</strong>
            </p>
            <img
              src={selectedStory.coupleImage}
              alt="Couple"
              className="w-full max-h-60 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>Story:</strong> {selectedStory.successStory}
            </p>
            <div className="text-right mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
