import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvier';
import {  toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser,setUser,googleSignIn } = useContext(AuthContext); // Access createUser from AuthProvider
    const [error, setErrors] = useState('');

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Password validation
        if (!/[A-Z]/.test(password)) {
            setErrors('Password must have at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrors('Password must have at least one lowercase letter.');
            return;
        }
        if (password.length < 6) {
            setErrors('Password must be at least 6 characters long.');
            return;
        }
        setErrors(''); // Clear errors if validation passes

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser({ ...user, displayName: name, photoURL }); // Set user with additional details
                toast.success('Registration successful! 🎉', {
                    position: 'top-center',
                    autoClose: 2000, // Auto close after 2 seconds
                });
                navigate('/'); // Redirect to home
            })
            .catch((error) => {
                toast.error(`Error: ${error.code}`, {
                    position: 'top-center',
                    autoClose: 2000, // Auto close after 2 seconds
                });
            });
    };




    const handleGoogleLogin = () => {
            googleSignIn()
              .then((result) => {
                Swal.fire('Success', 'Logged in with Google!', 'success');
                navigate(location?.state ? location.state : '/');
              })
              .catch((error) => {
                Swal.fire('Error', error.message, 'error');
              });
          };



    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#FBF5E5] px-4 py-20">
            {/* Left Section with Text and Image */}
            <div className="relative md:space-y-0 space-y-10 md:flex items-center justify-center">
                <div>
                    <img
                        src="https://img.freepik.com/free-photo/floral-composition-made-eucalyptus-tender-pink-flowers-with-candles-outdoors_8353-10662.jpg?t=st=1736968610~exp=1736972210~hmac=f912ea2e133c5f23722994dd9ae87fe3027d8e40cb94a567c5458538014b8e77&w=360"
                        alt="Floral"
                        className="w-full h-full object-cover rounded-lg md:rounded-none md:rounded-l-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <h1 className="text-center text-white py-10 bg-[#261319]/70 px-6 text-2xl md:text-5xl font-bold">
                            Find your <br /> life partner <br />
                            Easy and fast.
                        </h1>
                    </div>
                </div>
            </div>

            {/* Registration Form */}
            <motion.div
                className="w-full md:w-1/2 max-w-md bg-white rounded-lg md:rounded-none md:rounded-r-lg p-8"
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
                            name="name"
                            placeholder="Enter your name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-[#261319]">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="Enter photo URL"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35C7A] focus:border-transparent"
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

                <div className="mt-4">
                    <button
                        className="w-full py-2 px-4 bg-[#261319] text-white font-medium rounded-md hover:bg-[#212121] transition-colors"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </button>
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
