import { motion } from "framer-motion";

const successStories = [
  {
    name: "Emma Johnson",
    story: "Thanks to this platform, we reached our donation goal in just a week! Truly life-changing.",
    img: "https://source.unsplash.com/100x100/?woman,portrait",
  },
  {
    name: "Michael Brown",
    story: "I was able to donate clothes and essentials to families in need easily. Amazing experience!",
    img: "https://source.unsplash.com/100x100/?man,portrait",
  },
  {
    name: "Sophia Lee",
    story: "The transparency and ease of use made me feel confident about my contributions.",
    img: "https://source.unsplash.com/100x100/?girl,portrait",
  },
  {
    name: "David Wilson",
    story: "I organized a campaign and received overwhelming support. A truly impactful platform.",
    img: "https://source.unsplash.com/100x100/?boy,portrait",
  },
];

const SuccessStory = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Success Stories</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Real stories from people whose lives were touched by our platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              className="relative bg-white/60 backdrop-blur-lg p-6 shadow-lg rounded-2xl w-80 text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={story.img}
                alt={story.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{story.name}</h3>
              <p className="mt-2 text-gray-600 italic">"{story.story}"</p>
              <span className="absolute top-3 right-3 text-4xl text-blue-200">❝</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
