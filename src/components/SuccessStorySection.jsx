import { motion } from "framer-motion";

const successStories = [
  {
    name: "Michael Brown",
    story: "I was able to donate clothes and essentials to families in need easily. Amazing experience!",
    img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1739970244~exp=1739973844~hmac=c3f97eec880ce68e25ea0c0c64cb17a530a2ac756ef0793f13aec8b0c193f315&w=996",
  },
  {
    name: "Sophia Lee",
    story: "The transparency and ease of use made me feel confident about my contributions.",
    img: "https://img.freepik.com/free-photo/indian-hindu-girl-traditional-violet-saree-sitting-cafe-table_627829-1989.jpg?t=st=1739970346~exp=1739973946~hmac=947d7923aa6956a355b10b3283cb2f9164fb02963782ef91a89fcc322de7cfd6&w=996",
  },
  {
    name: "David Wilson",
    story: "I organized a campaign and received overwhelming support. A truly impactful platform.",
    img: "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?t=st=1739970284~exp=1739973884~hmac=b6e3182f614b9b416162b25af1e8a03cb34dc25cad61cf365f32a8a2691358fa&w=996",
  },
];

const SuccessStory = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-12 px-6">
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
