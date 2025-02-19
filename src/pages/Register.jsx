import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createNewUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoURL = formData.get("photo");

    // Password validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must have at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must have at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError(""); // Clear password error if validation passes

    // Create new user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        const createdAt = user?.metadata?.creationTime;

        // Update user profile with display name and photoURL
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "", // Optional photoURL
        })
          .then(() => {
            const userInfo = { name, email, createdAt };

            // Save user information in the database
            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  form.reset(); // Clear the form
                  navigate("/"); // Redirect to the homepage
                }
              })
              .catch((err) => {
                console.error("Error saving user to the database:", err);
                Swal.fire({
                  icon: "error",
                  title: "Database Error",
                  text: "Failed to save user information to the database.",
                });
              });
          })
          .catch((err) => {
            console.error("Error updating profile: ", err);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: err.message,
            });
          });
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message,
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

        const userInfo = {
          name: user.displayName,
          email: user.email,
        };

        // Save Google sign-in user to the database
        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Google Sign-In Successful",
            text: "You have signed in successfully with Google!",
          }).then(() => {
            navigate("/"); // Redirect to homepage
          });
        });
      })
      .catch((err) => {
        console.error("Google Sign-In Failed:", err);
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: `Reason: ${err.message}`,
        });
      });
  };

  return (
    <div className="min-h-screen text-[#411628] flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl p-10 mb-6">
        <h1 className="text-2xl font-bold my-10 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="card-body">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-bold  mx-2">Name</span>
            </label>
            <input name="name" type="text" placeholder="Name" className="input input-bordered  w-full m-2 h-10 rounded-lg p-2 border-2 border-[#212121]" required />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-bold  mx-2">Email</span>
            </label>
            <input name="email" type="email" placeholder="Email" className="input input-bordered  w-full m-2 h-10 rounded-lg p-2 border-2 border-[#212121]" required />
          </div>

          {/* Photo URL Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-bold  mx-2">Photo URL</span>
            </label>
            <input name="photo" type="text" placeholder="Photo URL (optional)" className="input input-bordered  w-full m-2 h-10 rounded-lg p-2 border-2 border-[#212121]" />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-bold  mx-2">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered  w-full m-2 h-10 rounded-lg p-2 border-2 border-[#411628]"
              required
            />
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="w-full bg-[#411628] py-2 rounded-lg hover:bg-[#5f233c] text-lg font-bold text-white">
              Register
            </button>
          </div>
        </form>

        {/* General Error Message */}
        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}


        {/* Google Sign-in Button */}
        <div className="border border-[#411628] w-full my-10"></div>


        <div className="form-control">
          <button onClick={handleGoogleSignIn} className="w-full bg-[#411628] py-2 rounded-lg hover:bg-[#5f233c] text-lg font-bold text-white">
            Continue with Google
          </button>
        </div>

        <p className="text-center font-semibold mt-4">
          Already have an account?{" "}
          <Link className="text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;



