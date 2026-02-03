import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import UsePayment from '../Hooks/UsePayment';
import UseAuth from '../../components/Hooks/UseAuth';

const WomerForm = ({ product, onSuccess, onCancel }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  
  const { processPayment, loading, error } = UsePayment();
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements || !user) {
      return;
    }

    // Prepare product data with shipping info
    const productData = {
      ...product,
      shippingAddress: shippingInfo,
      quantity: product.quantity || 1,
    };

    const result = await processPayment(productData, product.price);
    
    if (result.success) {
      onSuccess(result);
    }
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#aab7c4',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-black/95 border border-white/10 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-white tracking-tight">
            Complete Purchase
          </h2>
          <button
            onClick={onCancel}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product Summary */}
        <div className="mb-8 p-4 border border-white/10 rounded">
          <div className="flex items-center gap-4">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h3 className="text-white font-medium">{product.name}</h3>
              <p className="text-white/60 text-sm">Quantity: {product.quantity || 1}</p>
              <p className="text-white text-lg font-light">${product.price}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shipping Information */}
          <div>
            <h3 className="text-white text-lg font-light mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:border-white/30 focus:outline-none md:col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingInfo.state}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
              />
              <select
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white focus:border-white/30 focus:outline-none"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-white text-lg font-light mb-4">Payment Information</h3>
            <div className="p-4 border border-white/10 rounded bg-white/5">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all rounded text-sm uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || loading}
              className="flex-1 px-6 py-3 bg-white text-black hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-all rounded text-sm uppercase tracking-wider font-medium"
            >
              {loading ? 'Processing...' : `Pay $${product.price}`}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-white/40 text-xs text-center">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WomerForm;