import React from 'react';
import Navbar from '../../../Shared/Navbar/Navbar';

import SuccessCounter from '../../../components/SuccessCounter';
import SuccessStory from '../../../components/SuccessStory';
import HowWork from '../HowWork';
import PremiumMembers from './PremiumMembers';
import SuccessStorySection from '../../../components/SuccessStorySection';
import SuccessCounterSection from '../../../components/SuccessCounterSection';
import { NavLink } from 'react-router-dom';
// import Banner from '../../../../public/Banner.PNG'; // Adjust the path if necessary

const Home = () => {
  return (
    <div>
      <div className="relative w-full h-[450px] overflow-hidden">
   
        {/* Background Image with Zoom Effect */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 animate-zoom"
          style={{
            backgroundImage: "url('/Banner.PNG')",
          }}
        ></div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold">Welcome to Our Platform</h1>
          <p className="text-lg lg:text-xl">
            Join us to explore the best services tailored for your needs.
          </p>
          <div className="space-x-4">
          <NavLink to="/aboutus">
            <button className="px-6 py-3 bg-[#212121] text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300">
              Learn More
            </button>
            </NavLink>
          </div>
        </div>
      </div>
      <PremiumMembers></PremiumMembers>
      <HowWork></HowWork>
      <SuccessCounterSection></SuccessCounterSection>
      <SuccessStorySection></SuccessStorySection>
    </div>
  );
};

export default Home;
