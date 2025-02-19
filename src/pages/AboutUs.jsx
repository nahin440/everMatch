import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white p-8 md:p-16 lg:p-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 md:text-5xl">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Welcome to <strong>BD Matrimony</strong>, the premier platform for helping people find meaningful connections and lifelong partners. Our mission is to bring together individuals from diverse backgrounds, united by shared values and aspirations, in a safe and trusted online environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To create a platform that fosters meaningful connections and promotes lifelong happiness by uniting individuals who share common dreams.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            Empower individuals to find their ideal life partner through innovative technology and a user-first approach.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Values</h3>
          <p className="text-gray-600">
            Transparency, security, and respect for all users are at the heart of everything we do.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Choose Matrimony Connect?
        </h2>
        <ul className="list-disc text-left text-gray-600 mx-auto max-w-3xl space-y-2">
          <li>Comprehensive privacy and security measures to protect user data.</li>
          <li>Active support team ready to assist you.</li>
          <li>A platform designed with love and passion for creating lasting relationships.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
