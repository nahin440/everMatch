import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const { setUser, logInUser , googleSignIn} = useAuth();
  const [err , setErr] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  const from = location?.state;


  function makeGoogle(){
    googleSignIn()
    .then((result) => {
      
      const user = result.user;
      Swal.fire({
        title: `Google Logged In`,
        text: "Succesfull",
        icon: "success",
      });
      setUser(user); 
      navigate( from || '/');

    }).catch((error) => {
      const errorMessage = error.message;
      setErr(errorMessage)
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    //  const name = form.name.value;
    const email = form.email.value;
    const pass = form.pass.value;


    const passwordRegex = /^(?=.*[A-Z]).{7}$/;

    // if (!passwordRegex.test(pass)) {
    //   setErr("Password must contain at least one capital letter and be 7 characters long.");
    //   return;
    // }
    

    logInUser(email, pass)
      .then((userCredential) => {
        const userInfo = userCredential.user;
        console.log(userInfo);
        setUser(userInfo);
        Swal.fire({
          title: `Logged In!`,
          text: "Succesfull",
          icon: "success",
        });
        navigate( from || '/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage)
      });

    const userData = {
      // name,
      pass,
      email,
    };
   form.reset()
  }
  return (
    <div className="min-h-screen my-10 py-10 flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please log in to your account
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
             className="bg-gray-50 "
            name="email"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            className="bg-gray-50"
            variant="outlined"
            name="pass"
          />  
          {<p className="text-red-500 text-xs text-center">{err}</p>}       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all"
          >
            Log In
          </Button>
      <div className="divider">OR</div>
          <div className="text-center text-2xl">
          <button onClick={()=>makeGoogle()} className="btn btn-outline w-full"><FaGoogle></FaGoogle>Google</button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-blue-600 hover:underline">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
