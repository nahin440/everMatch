import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../components/provider/AuthProvider';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Checkout = () => {
  const { biodataId } = useParams();
  (biodataId)// Get biodataId from URL
  const {user} = useContext(AuthContext);
  


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>

      {/* <form className="max-w-md mx-auto mt-8"> */}
        <div className="mb-4">
          <label htmlFor="biodataId" className="block text-lg font-medium mb-2">Biodata ID</label>
          <input
            type="text"
            id="biodataId"
            value={biodataId}  // Display the biodataId as readonly
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        * <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
          <input
            type="email"
            id="email"
            value={user.email}  // Display the user's email as readonly
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div> 

        <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm  biodataId={biodataId} user={user} />
                </Elements>
            </div>
      {/* </form> */}
    </div>
  );
};

export default Checkout;
