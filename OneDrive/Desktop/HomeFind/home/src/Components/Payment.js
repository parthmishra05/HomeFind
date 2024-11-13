import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QKAMSRwpFn0SlpkfEJp1biLiqvrOzcRoWLEcOLVFaNSHogXZyhVN1OdmJ9gbekUtnL0Lgm4jpyrPnCqKWjSuG2B00UuQWXSZb'); // Replace with your Stripe publishable key

const Payment = () => {
  const handlePayment = async () => {
    // Step 1: Call backend to create a Stripe checkout session
    const response = await fetch('http://localhost:5000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 500, // in currency’s smallest unit (e.g., cents)
        currency: 'usd'
      })
    });

    const { sessionId } = await response.json();

    if (!sessionId) {
      alert('Failed to create Stripe checkout session');
      return;
    }

    // Step 2: Redirect to Stripe checkout
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <h2>Complete Your Payment with Stripe</h2>
      <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
