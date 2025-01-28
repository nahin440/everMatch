import React from 'react';

const Faq = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 shadow-lg my-10 bg-white rounded-lg border border-gray-200">
      <h2 className="text-4xl font-bold text-center mb-10 text-violet-600">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {/* Question 1 */}
        <details className="group rounded-lg border border-gray-300 p-4">
          <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-800">
            <span>What is the process for registering on the website?</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 text-gray-600">
            To register, click the 'Sign Up' button and provide details such as your name, age, and contact information. Uploading photos and a short bio helps showcase yourself to potential matches.
          </p>
        </details>

        {/* Question 2 */}
        <details className="group rounded-lg border border-gray-300 p-4">
          <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-800">
            <span>How do I find a suitable match?</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 text-gray-600">
            Browse profiles using filters like age, location, and interests. Our platform suggests matches based on shared preferences and interests.
          </p>
        </details>

        {/* Question 3 */}
        <details className="group rounded-lg border border-gray-300 p-4">
          <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-800">
            <span>Is it safe to use this matrimonial platform?</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 text-gray-600">
            Yes, our platform prioritizes user privacy and security. All profiles are verified, and secure messaging options ensure a safe and positive experience.
          </p>
        </details>

        {/* Question 4 */}
        <details className="group rounded-lg border border-gray-300 p-4">
          <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-800">
            <span>Can I communicate with other members directly?</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 text-gray-600">
            Yes, you can directly chat with other members after mutual interest. Our secure messaging system ensures safe communication.
          </p>
        </details>

        {/* Question 5 */}
        <details className="group rounded-lg border border-gray-300 p-4">
          <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-800">
            <span>Are there any fees involved in using the platform?</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 text-gray-600">
            Our platform offers free and premium plans. While free users can access basic features, premium subscribers enjoy additional perks like unlimited messaging and profile boosts.
          </p>
        </details>
      </div>
    </div>
  );
};

export default Faq;
