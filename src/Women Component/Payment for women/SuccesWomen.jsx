import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SuccessWomen = ({ paymentResult, onClose }) => {
  const { paymentIntent, transactionId } = paymentResult;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-black/95 border border-white/10 rounded-lg p-8 max-w-md w-full backdrop-blur-xl text-center"
      >
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-white mb-2">Payment Successful!</h2>
          <p className="text-white/60 text-sm">
            Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        {/* Transaction Details */}
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Transaction ID:</span>
              <span className="text-white font-mono text-xs">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Amount:</span>
              <span className="text-white">${(paymentIntent.amount / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Status:</span>
              <span className="text-green-400 capitalize">{paymentIntent.status}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full px-6 py-3 bg-white text-black hover:bg-white/90 transition-all rounded text-sm uppercase tracking-wider font-medium"
          >
            View Orders
          </Link>
          <Link
            to="/women"
            onClick={onClose}
            className="block w-full px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all rounded text-sm uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-white/30 text-xs">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessWomen;