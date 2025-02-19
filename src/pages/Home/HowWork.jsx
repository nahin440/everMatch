import signup from '../../assets/signup.jpg';
import react from 'react';
import profile from '../../assets/profile.png';
import connect from '../../assets/connect.jpg';

const HowWork = () => {
    return (
        <div className="container mx-auto px-4 py-8">
        <div className=" mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Discover your perfect match</h2>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Sign Up */}
            <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <div className="md:h-1/2 w-50 text-blue-600 text-4xl mb-6">
              <img src={signup} alt="signup image" 
              className="h-full w-full object-cover border-2 border-black border-t-4 border-r-10 border-t-red-900 border-r-red-900 rounded-bl-sm rounded-tr-full" />
              </div>
              
              <div className='md:h-1/2'>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Sign Up</h3>
              <p className="text-gray-600">
                Register for free and set up your Matrimony profile with your details.
              </p>
              </div>
            </div>
  
            {/* Step 2: Connect */}
            <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <div className="md:h-1/2 w-50 text-blue-600 text-4xl mb-6">
              <img src={profile} alt="signup image" 
              className="h-full w-full border-2 border-black border-t-4 border-r-10 border-t-red-900 border-r-red-900 rounded-bl-sm rounded-tr-full" />
              </div>
              
              <div className='md:h-1/2'>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Complete Profile</h3>
              <p className="text-gray-600">
                Complete your profile and connect with people who catch your eye.
              </p>
              </div>
            </div>
  
            {/* Step 3: Interact */}
            <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <div className="md:h-1/2 w-50 text-blue-600 text-4xl mb-6">
              <img src={connect} alt="signup image" 
              className="h-full w-full border-2 border-black border-t-4 border-r-10 border-t-red-900 border-r-red-900 rounded-bl-sm rounded-tr-full" />
              </div>
              
              <div className='md:h-1/2'>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Connect</h3>
              <p className="text-gray-600">
                Become a Premium Member and start a conversation with your match.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default HowWork;