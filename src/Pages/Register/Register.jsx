import { useState } from 'react';
import { motion } from 'framer-motion';
import 'animate.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !photoURL) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        // Add registration logic here
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#FBF5E5] px-4 py-20 ">


            {/* Left Section with Text and Image */}
            <div className="relative  md:space-y-0 space-y-10 md:flex items-center justify-center">
                <div>
                    <img
                        src="https://img.freepik.com/free-photo/floral-composition-made-eucalyptus-tender-pink-flowers-with-candles-outdoors_8353-10662.jpg?t=st=1736968610~exp=1736972210~hmac=f912ea2e133c5f23722994dd9ae87fe3027d8e40cb94a567c5458538014b8e77&w=360"
                        alt="Floral"
                        className=" w-full h-full object-cover rounded-lg md:rounded-none md:rounded-l-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
                        <h1 className="text-center text-white py-10 bg-[#261319]/70 px-6 text-2xl md:text-5xl font-bold">
                            Find your <br /> life partner <br />
                            Easy and fast.
                        </h1>
                    </div>
                </div>
            </div>

            {/* Registration Form */}
            <motion.div
                className="w-full md:w-1/2 max-w-md bg-white   rounded-lg md:rounded-none md:rounded-r-lg p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center text-[#261319] mb-4">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-2 mb-[18px]" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Photo URL</label>
                        <input
                            type="text"
                            placeholder="Enter photo URL"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#261319] text-white font-medium rounded-md hover:bg-[#212121] transition-colors"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <hr />

                <div className='mt-4' >
                    <button className='w-full py-2 px-4 bg-[#261319] text-white font-medium rounded-md hover:bg-[#212121] transition-colors' > Login with Google </button>
                </div>

                <p className="text-center text-sm text-[#261319] mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#261319] hover:underline">Login here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
