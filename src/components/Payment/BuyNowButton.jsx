import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import stripePromise from '../../config/stripe';
import PaymentForm from './PaymentForm';
import PaymentSuccess from './PaymentSuccess';
import UseAuth from '../Hooks/UseAuth';
import { Link } from 'react-router-dom';

const BuyNowButton = ({ product, className = "", children }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const { user } = UseAuth();

  const handleBuyNow = () => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (result) => {
    setShowPayment(false);
    setPaymentResult(result);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleSuccessClose = () => {
    setPaymentResult(null);
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Link
        to="/login"
        className={`inline-flex items-center justify-center gap-2 ${className}`}
      >
        {children || (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6H8z" />
            </svg>
            Login to Purchase
          </>
        )}
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={handleBuyNow}
        className={`inline-flex items-center justify-center gap-2 ${className}`}
      >
        {children || (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            Buy Now
          </>
        )}
      </button>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <Elements stripe={stripePromise}>
            <PaymentForm
              product={product}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Elements>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {paymentResult && (
          <PaymentSuccess
            paymentResult={paymentResult}
            onClose={handleSuccessClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BuyNowButton;