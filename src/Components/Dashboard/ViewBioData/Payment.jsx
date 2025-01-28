import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useBiodata from "../../Hooks/useBiodata";
import useUser from "../../Hooks/useUser";

const Payment = ({id}) => {
  const {user} = useAuth()
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [clientSecret, setclientSecret] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios()
  const price = 5;
  const navigate = useNavigate()

  const [biodata] = useBiodata() || [];
  const data = biodata.find((bio) => bio._id === id);
  console.log(data , 'data');
  //  const [users] = useUser()
  //  const userData = users && users.find((bio) => bio?.email === user.email);
  //  console.log(userData , 'payment email');

  useEffect(()=> {
      axiosSecure.post('/create-payment-intent', {price})
      .then(res => {
        // console.log(res.data.clientSecret);
        setclientSecret(res.data.clientSecret)
                    if (res.data.insertedId) {
                      // Swal.fire({
                      //   position: "top-end",
                      //   icon: "success",
                      //   title: `Payment has Benn Submitted`,
                      //   showConfirmButton: false,
                      //   timer: 1000,
                      // });
                      console.log('saved');
                    }
      })
  },[axiosSecure,price])

  const handleSubmit = async (event) => {
  
    event.preventDefault();

    if (!stripe || !elements) {
    
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErr(error.message)
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErr('')
    }
   
    // confirm cardc payment 
    const { paymentIntent , error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name:user?.displayName || 'anonymous' ,
            email: user?.email || 'anonymous'
          }
        },
      });

      if(confirmError){
        console.log("[error]", confirmError);
      }else{
        console.log("payment Intent : ", paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('transection ID: ', paymentIntent.id);
            setMessage(paymentIntent.id)


            // now save the info from database =============
            const payment = {
              price: price,
              status: 'pending',
              biodata: 1,
              ownername: data?.name,
              email: data?.email || 'user@gmail.com',
              biodataId: data?.biodataId,
              mobile: data?.mobile,
              age: data?.age,
              occupation: data?.occupation,
              userEmail: user?.email                     
            }

            // console.log(payment);

            axiosSecure.post('/payments', payment)
            .then(res => {
              console.log(res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Payment has Been Submitted`,
                  showConfirmButton: false,
                  timer: 1000,
                });
                navigate('/dashboard/contact')
              }
            })
        }
      }
  };
  return (


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
  <form
    onSubmit={handleSubmit}
    className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 border border-gray-300"
  >
    <h1 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">
      Complete Your Payment
    </h1>

    {/* Card Element */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        defaultValue={user?.email}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        BioData ID
      </label>
      <input
        type="number"
        name="number"
        placeholder="Enter transaction number"
        defaultValue={data?.biodataId}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        Card Details
      </label>
      <div className="border rounded-lg p-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={!stripe || isLoading || !clientSecret}
      className={`w-full py-3 px-6 rounded-lg text-white font-bold transition ${
        isLoading || !stripe
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      }`}
    >
      {isLoading ? "Processing..." : "Pay"}
    </button>

    {/* Message Display */}
    {message && (
      <div className="mt-6 p-4 text-sm text-center text-violet-800 bg-violet-100 rounded-lg shadow">
        <span className="font-bold">Transaction ID:</span> {message}
      </div>
    )}
    {err && (
      <div className="mt-6 p-4 text-sm text-center text-red-800 bg-red-100 rounded-lg shadow">
        {err}
      </div>
    )}
  </form>
</div>

  );
};

export default Payment;
