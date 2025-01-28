import React from "react";

const HowItWork = () => {
  return (
    <div className="bg-gradient-to-r from-violet-200 via-violet-300 to-violet-400 my-10 rounded-lg py-12 px-6">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold text-center text-violet-700 mb-12">
        How We Work
      </h2>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center max-w-6xl mx-auto">
        {/* Description Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-violet-700      mb-4">
            Find Your Perfect Life Partner
          </h2>
          <p className="text-gray-700">
            Our platform makes finding your soulmate seamless, secure, and fun.
            From creating an account to connecting with your chosen partner, we
            ensure a smooth experience every step of the way.
          </p>
        </div>

        {/* Steps Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-violet-700     mb-4">
            Steps to Find Your Partner
          </h3>
          <ul className=" text-gray-800">
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">1.</span>
              Register or Log in to your account.
            </li>
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">2.</span>
              Search and browse verified profiles.
            </li>
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">3.</span>
              Choose a partner that matches your preferences.
            </li>
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">4.</span>
              Upgrade to Premium to connect.
            </li>
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">5.</span>
              Communicate and discuss your future plans.
            </li>
            <li className="flex items-start">
              <span className="text-violet-700     font-bold text-lg mr-2">6.</span>
              Leave a review after marriage and inspire others!
            </li>
          </ul>
        </div>
      </div>

      {/* New Section: Why Choose Us */}
      <div className="bg-white py-12 px-6 mt-16 rounded-lg shadow-md max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-violet-700     mb-6">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
          {/* Reason 1 */}
          <div className="flex-1 py-5 px-4 rounded-lg bg-orange-400 bg-opacity-15 shadow-sm">
            <h4 className="text-xl font-semibold  mb-2">
              Verified Profiles
            </h4>
            <p className="text-gray-700">
              All profiles are thoroughly verified to ensure safety and
              authenticity.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="flex-1 bg-violet-600 bg-opacity-15 p-4 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold  mb-2">
              Secure Communication
            </h4>
            <p className="text-gray-700">
              Chat and connect with your partner securely within the platform.
            </p>
          </div>
          {/* Reason 3 */}
          <div className="flex-1 bg-teal-400  bg-opacity-15 p-4 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold  mb-2">
              Personalized Matches
            </h4>
            <p className="text-gray-700">
              Our advanced algorithms match you with the most compatible
              partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
