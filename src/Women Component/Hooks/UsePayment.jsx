import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import UseAuth from '../../components/Hooks/UseAuth';
import toast from 'react-hot-toast';

const UsePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();

  const processPayment = async (productData, paymentAmount) => {
    if (!stripe || !elements || !user) {
      setError('Payment system not ready or user not authenticated');
      return { success: false };
    }

    // Debug logging
    console.log('Processing payment for product:', productData);
    console.log('Payment amount:', paymentAmount);
    console.log('User:', user);

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create payment intent on your server
      console.log('Sending payment request to server...');
      const paymentIntentResponse = await axios.post(
        'https://server-1-1-6g3a.onrender.com/female-payment',
        {
          amount: Math.round(paymentAmount * 100), // Convert to cents
          currency: 'usd',
          productId: productData.id,
          productName: productData.name,
          userId: user.uid,
          userEmail: user.email,
          gender: "female",
          category: productData.category || "women", // Ensure category is passed
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      console.log('Payment Intent Response:', paymentIntentResponse.data);

      // Check if we got a client_secret
      const { client_secret, clientSecret } = paymentIntentResponse.data;
      const finalClientSecret = client_secret || clientSecret;

      if (!finalClientSecret) {
        // If no client_secret, create a mock successful payment for practice
        console.log('No client_secret received, creating mock payment for practice...');
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create mock payment intent
        const mockPaymentIntent = {
          id: `pi_mock_${Date.now()}`,
          status: 'succeeded',
          amount: Math.round(paymentAmount * 100),
          currency: 'usd',
          created: Math.floor(Date.now() / 1000),
        };

        // Step 3: Post purchase data and update stock (even for mock payment)
        await handleSuccessfulPayment(productData, mockPaymentIntent);
        
        toast.success('Mock Payment successful! (Practice Mode)');
        return { 
          success: true, 
          paymentIntent: mockPaymentIntent,
          transactionId: mockPaymentIntent.id,
          isMockPayment: true
        };
      }

      // Step 2: Confirm payment with Stripe (if we have client_secret)
      const cardElement = elements.getElement(CardElement);
      
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        finalClientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user.displayName || user.email,
              email: user.email,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        toast.error(stripeError.message);
        return { success: false, error: stripeError.message };
      }

      if (paymentIntent.status === 'succeeded') {
        // Step 3: Post purchase data and update stock
        await handleSuccessfulPayment(productData, paymentIntent);
        
        toast.success('Payment successful!');
        return { 
          success: true, 
          paymentIntent,
          transactionId: paymentIntent.id 
        };
      }

    } catch (err) {
      console.error('Payment error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      // If API call fails, create mock payment for practice
      if (err.response?.status >= 400 || err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        console.log('API error or timeout, creating mock payment for practice...');
        
        try {
          // Simulate payment processing delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Create mock payment intent
          const mockPaymentIntent = {
            id: `pi_mock_${Date.now()}`,
            status: 'succeeded',
            amount: Math.round(paymentAmount * 100),
            currency: 'usd',
            created: Math.floor(Date.now() / 1000),
          };

          // Still post purchase data and update stock
          await handleSuccessfulPayment(productData, mockPaymentIntent);
          
          toast.success('Mock Payment successful! (Practice Mode)');
          return { 
            success: true, 
            paymentIntent: mockPaymentIntent,
            transactionId: mockPaymentIntent.id,
            isMockPayment: true
          };
        } catch (mockErr) {
          console.error('Mock payment error:', mockErr);
          const errorMessage = 'Payment processing failed';
          setError(errorMessage);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      }
      
      const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulPayment = async (productData, paymentIntent) => {
    try {
      // Prepare customer purchase data
      const purchaseData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        userPhoto: user.photoURL || '',
        productId: productData.id,
        productName: productData.name,
        productPrice: productData.price,
        productImage: productData.image || '',
        productCategory: productData.category || 'women', // Ensure correct category
        quantity: productData.quantity || 1,
        totalAmount: paymentIntent.amount / 100, // Convert back from cents
        transactionId: paymentIntent.id,
        paymentStatus: 'completed',
        purchaseDate: new Date().toISOString(),
        shippingAddress: productData.shippingAddress || {},
        paymentMethod: paymentIntent.id.startsWith('pi_mock_') ? 'mock_stripe' : 'stripe',
        currency: paymentIntent.currency,
        isPracticePayment: true, // Mark as practice payment
      };

      // Step 1: Post customer purchase data
      const customerDataResponse = await axios.post(
        'https://server-1-1-6g3a.onrender.com/CusData',
        purchaseData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Customer data posted:', customerDataResponse.data);

      // Step 2: Update product stock quantity
      if (productData.category === 'men') {
        await updateMenProductStock(productData.id, productData.quantity || 1);
      } else if (productData.category === 'women') {
        await updateWomenProductStock(productData.id, productData.quantity || 1);
      } else {
        // Default to women for this component
        await updateWomenProductStock(productData.id, productData.quantity || 1);
      }

      return customerDataResponse.data;

    } catch (err) {
      console.error('Error handling successful payment:', err);
      // Don't throw error here as payment was successful
      // Just log the error for debugging
    }
  };

  const updateMenProductStock = async (productId, purchasedQuantity) => {
    try {
      // Get current product data from the men endpoint
      const productResponse = await axios.get(
        'https://server-1-1-6g3a.onrender.com/men'
      );
      
      let foundProduct = null;
      let collectionIndex = -1;
      let productIndex = -1;

      // Find the product in the collections
      if (Array.isArray(productResponse.data)) {
        productResponse.data.forEach((collection, cIndex) => {
          const pIndex = collection.products.findIndex((p) => p.id === productId);
          if (pIndex !== -1) {
            foundProduct = collection.products[pIndex];
            collectionIndex = cIndex;
            productIndex = pIndex;
          }
        });
      } else if (productResponse.data && productResponse.data.products) {
        productIndex = productResponse.data.products.findIndex((p) => p.id === productId);
        if (productIndex !== -1) {
          foundProduct = productResponse.data.products[productIndex];
        }
      }

      if (foundProduct) {
        const newStock = Math.max(0, (foundProduct.stock || 0) - purchasedQuantity);
        
        // Update the product stock
        foundProduct.stock = newStock;
        foundProduct.lastUpdated = new Date().toISOString();

        // Send updated data back to server
        await axios.put(
          'https://server-1-1-6g3a.onrender.com/men',
          productResponse.data,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        console.log(`Men's product ${productId} stock updated: ${foundProduct.stock + purchasedQuantity} → ${newStock}`);
      }
      
    } catch (err) {
      console.error('Error updating men product stock:', err);
    }
  };

  const updateWomenProductStock = async (productId, purchasedQuantity) => {
    try {
      // Similar logic for women's products
      const productResponse = await axios.get(
        'https://server-1-1-6g3a.onrender.com/women'
      );
      
      let foundProduct = null;

      if (Array.isArray(productResponse.data)) {
        productResponse.data.forEach((collection) => {
          const item = collection.products.find((p) => p.id === productId);
          if (item) {
            foundProduct = item;
          }
        });
      } else if (productResponse.data && productResponse.data.products) {
        foundProduct = productResponse.data.products.find((p) => p.id === productId);
      }

      if (foundProduct) {
        const newStock = Math.max(0, (foundProduct.stock || 0) - purchasedQuantity);
        foundProduct.stock = newStock;
        foundProduct.lastUpdated = new Date().toISOString();

        await axios.put(
          'https://server-1-1-6g3a.onrender.com/women',
          productResponse.data,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        console.log(`Women's product ${productId} stock updated: ${foundProduct.stock + purchasedQuantity} → ${newStock}`);
      }
      
    } catch (err) {
      console.error('Error updating women product stock:', err);
    }
  };

  return {
    processPayment,
    loading,
    error,
    isReady: !!(stripe && elements && user),
  };
}

export default UsePayment;