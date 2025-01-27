import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { toast } from "react-toastify";


const GoogleLogin = () => {

    const {googleSignIn} = UseAuth();
    const axiosPublic = UseAxiosPublic()

    const navigate = useNavigate()


    const handleGoogleLogin = () => {
                googleSignIn()
                
                  .then((result) => {

                    const user = result.user;
                                    // setUser({ ...user, displayName: name, photoURL }); // Set user with additional details
                    
                                    const addUser = ({...user})
                                    
                                    axiosPublic.post('/user',addUser)
                                    .then(res => {
                    
                                        toast.success('Registration successful and User Added to ta data base! 🎉', {
                                            position: 'top-center',
                                            autoClose: 2000, // Auto close after 2 seconds
                                        });
                    
                                        if(res.data.insertedId){
                                            toast.success('Registration successful and User Added to ta data base! 🎉', {
                                                position: 'top-center',
                                                autoClose: 2000, // Auto close after 2 seconds
                                            });
                                        }
                                       
                    
                                    })

                    // console.log(result.user)

                    Swal.fire('Success', 'Logged in with Google!', 'success');
                    navigate(location?.state ? location.state : '/');
                  })
                 
    
                  
              };


    return (
        <div className="mt-4">
            <button
                className="w-full py-2 px-4 bg-[#261319] text-white font-medium rounded-md hover:bg-[#212121] transition-colors"
                onClick={handleGoogleLogin}
            >
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;