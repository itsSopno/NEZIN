import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  const is404 = error?.status === 404;
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Error Code */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-light tracking-tighter text-white/20">
              {is404 ? '404' : 'ERROR'}
            </span>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
              {is404 ? 'Page Not Found' : 'Something Went Wrong'}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg mx-auto">
              {is404 
                ? "The page you're looking for doesn't exist or has been moved to a different location."
                : "An unexpected error occurred. Please try again or contact support if the problem persists."
              }
            </p>
          </div>

          {/* Error Details (Development) */}
          {import.meta.env.DEV && error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded text-left">
              <p className="text-red-400 text-sm font-mono">
                {error.statusText || error.message}
              </p>
              {error.data && (
                <p className="text-red-300/60 text-xs font-mono mt-2">
                  {error.data}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/"
              className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded text-sm uppercase tracking-wider font-medium"
            >
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all rounded text-sm uppercase tracking-wider font-medium"
            >
              Go Back
            </button>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-white/30 text-xs uppercase tracking-wider">
              Nezin Protocol © 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorBoundary;