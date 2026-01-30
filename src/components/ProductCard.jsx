import React from 'react';
import { motion } from 'framer-motion';
import BuyNowButton from './Payment/BuyNowButton';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
    >
      {/* Product Image */}
      {product.image && (
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-white text-lg font-light tracking-tight mb-2">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white text-xl font-light">
              ${product.price}
            </span>
            {product.stock !== undefined && (
              <span className="text-white/40 text-xs">
                Stock: {product.stock}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <BuyNowButton
            product={product}
            className="flex-1 px-4 py-3 bg-white text-black hover:bg-white/90 transition-all rounded text-sm uppercase tracking-wider font-medium"
          />
          <button className="px-4 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;