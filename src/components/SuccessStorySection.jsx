import React, { useEffect, useState } from "react";

const SuccessStorySection = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch success stories from the backend
    fetch("https://evermatch-server.vercel.app/successStories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStories(data.data);
        } else {
          console.error("Failed to fetch success stories:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching success stories:", error);
      });
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={story.coupleImage}
                alt="Couple"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Biodata IDs: {story.selfBiodataId} & {story.partnerBiodataId}
                </h3>
                <p className="text-gray-600 italic">{story.successStory}</p>
              </div>
            </div>
          ))}
        </div>
        {stories.length === 0 && (
          <p className="text-center text-gray-800 mt-8">
            No success stories yet. Be the first to share your story!
          </p>
        )}
      </div>
    </section>
  );
};

export default SuccessStorySection;
