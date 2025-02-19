import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShieldAlt, FaHandsHelping, FaRocket } from "react-icons/fa";

const HomeSections = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How do I create an account?", answer: "Click on the 'Sign Up' button and fill in the required details." },
    { question: "Can I edit my profile later?", answer: "Yes, you can update your profile from the dashboard." },
    { question: "How can I donate?", answer: "Go to the 'Campaigns' page, select a campaign, and follow the donation process." },
  ];

  const reviews = [
    { name: "John Doe", review: "Amazing platform! The donation process was seamless.", rating: 5 },
    { name: "Sarah Smith", review: "A great initiative, very user-friendly!", rating: 4 },
    { name: "Mike Johnson", review: "Love the UI and ease of use.", rating: 5 },
  ];

  const features = [
    { icon: <FaShieldAlt className="text-blue-500 text-4xl" />, title: "Secure & Reliable", description: "We ensure the highest level of security for your data and transactions." },
    { icon: <FaHandsHelping className="text-green-500 text-4xl" />, title: "Community-Driven", description: "A platform built by and for the community to help those in need." },
    { icon: <FaRocket className="text-red-500 text-4xl" />, title: "Fast & Efficient", description: "Optimized for speed, making donations quick and hassle-free." },
  ];

  return (
    <div className="space-y-16">
      {/* FAQ Section */}
      <section className="bg-yellow-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left py-4 flex justify-between items-center text-lg font-medium text-gray-700"
                >
                  {faq.question}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 pb-4 pl-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Feedback Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{review.review}"</p>
                <h4 className="mt-4 font-semibold text-gray-800">{review.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-yellow-50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We are committed to making donations easy, secure, and impactful. Here's why thousands trust us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-2 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSections;
