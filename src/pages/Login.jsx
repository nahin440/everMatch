import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import axios from "axios";

const Login = () => {
    const { userLogin, setUser } = useContext(AuthContext);
    const [error, setError] = useState({});
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    // Get the 'from' location from state (if exists)
    const from = location.state?.from || "/"; // Default to "/" if 'from' is not available

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);

                // Update last login time
                const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime };

                // axios.post('https://merathon-server.vercel.app/jwt', user, { withCredentials: true })
                //     .then(res => (res.data));

                // Show SweetAlert for successful login
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Welcome back! You have successfully logged in.",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    // After successful login, redirect to 'from' location
                    navigate(from);  // Navigate to the page that required login
                });
            })
            .catch((err) => {
                setError({ ...error, login: err.code });

                // SweetAlert2 error alert
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: `Reason: ${err.message}`,
                    confirmButtonColor: "#FF0000",
                });
            });
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName
                // }
                // useAxiosPublic.post('/users', userInfo)

                // Show SweetAlert for successful Google sign-in
                Swal.fire({
                    icon: "success",
                    title: "Google Sign-In Successful",
                    text: "Welcome back! You have successfully signed in with Google.",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    // After Google login, redirect to 'from' location
                    navigate(from);  // Navigate to the page that required login
                });
            })
            .catch((err) => {
                setError({ ...error, google: err.message });

                // SweetAlert2 error alert
                Swal.fire({
                    icon: "error",
                    title: "Google Sign-In Failed",
                    text: `Reason: ${err.message}`,
                    confirmButtonColor: "#FF0000",
                });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-[#fff6fb] w-full max-w-lg shrink-0 shadow-2xl p-10 mb-6">
                <h1 className="text-2xl font-bold text-center pt-2">Login to account</h1>
                <form onSubmit={handleSubmit} className="card-body mt-10">
                    
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text text-lg font-bold mx-2">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            ref={emailRef}
                            placeholder="email"
                            className="input input-bordered  w-full m-2 h-10 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text text-lg font-bold mx-2">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered w-full m-2 h-10 rounded-lg p-2"
                            required
                        />
                        {error.login && (
                            <label className="label text-sm text-red-600">{error.login}</label>
                        )}
                      
                    </div>
                    <div className=" mt-6">
                        <button className="w-full bg-[#411628] py-2 rounded-lg hover:bg-[#5f233c] text-lg font-bold text-white">
                            Login
                        </button>
                    </div>
                </form>

                <div className="border border-[#411628] w-full my-10"></div>

                <div className="form-control">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-[#411628] py-2 rounded-lg hover:bg-[#5f233c] text-lg font-bold text-white"
                    >
                        Continue with Google
                    </button>
                </div>
                <p className="text-center font-semibold mt-4 dark:text-black">
                    Don't have an account?{" "}
                    <Link className="text-red-500" to="/register">
                        Register
                    </Link>
                </p>
                {error.google && <p className="text-sm text-red-500 text-center mt-2">{error.google}</p>}
            </div>
        </div>
    );
};

export default Login;

