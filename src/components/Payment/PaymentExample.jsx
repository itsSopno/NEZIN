import React from 'react';
import ProductCard from '../ProductCard';
import BuyNowButton from './BuyNowButton';

const PaymentExample = () => {
  // Sample product data - replace with your actual product data
  const sampleProducts = [
    {
      id: 'NZ-W26-OUT-05',
      name: 'Winter Outerwear Collection',
      description: 'Premium winter jacket with advanced thermal technology',
      price: 299.99,
      stock: 15,
      category: 'men',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'NZ-S26-TEE-01',
      name: 'Signature Tee',
      description: 'Minimalist design with premium cotton blend',
      price: 89.99,
      stock: 25,
      category: 'men',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4 tracking-tight">
            Payment System Demo
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Complete Stripe integration with customer data posting and stock management
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Individual Buy Button Example */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-white mb-4">
            Individual Buy Button
          </h2>
          <p className="text-white/60 mb-6">
            You can also use the BuyNowButton component individually
          </p>
          
          <BuyNowButton
            product={sampleProducts[0]}
            className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all rounded text-sm uppercase tracking-wider font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            Purchase Now - ${sampleProducts[0].price}
          </BuyNowButton>
        </div>

        {/* Integration Instructions */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-light text-white mb-6">Integration Guide</h2>
          <div className="space-y-4 text-white/80">
            <div>
              <h3 className="text-white font-medium mb-2">1. Import the BuyNowButton:</h3>
              <code className="block bg-black/50 p-3 rounded text-sm font-mono">
                import BuyNowButton from './components/Payment/BuyNowButton';
              </code>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">2. Use in your product component:</h3>
              <code className="block bg-black/50 p-3 rounded text-sm font-mono">
                {`<BuyNowButton 
  product={{
    id: 'product-id',
    name: 'Product Name',
    price: 99.99,
    stock: 10,
    category: 'men', // or 'women'
    image: 'image-url'
  }}
  className="your-custom-styles"
/>`}
              </code>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">3. What happens on purchase:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>User fills shipping and payment information</li>
                <li>Payment is processed through Stripe</li>
                <li>Customer data is posted to: https://server-1-1-6g3a.onrender.com/Cusdata</li>
                <li>Product stock is automatically decremented</li>
                <li>Success confirmation is shown to user</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentExample;