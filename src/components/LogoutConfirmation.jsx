import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoutConfirmation = ({ isOpen, onConfirm, onCancel, userName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={onCancel}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/95 border border-white/10 rounded-lg p-8 max-w-md w-full mx-auto backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-white text-xl font-light tracking-tight mb-3">
                  Sign Out Confirmation
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Are you sure you want to sign out{userName ? `, ${userName}` : ''}? 
                  You'll need to sign in again to access your account.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all rounded text-sm uppercase tracking-wider font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 transition-all rounded text-sm uppercase tracking-wider font-medium"
                >
                  Sign Out
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-center text-white/30 text-xs uppercase tracking-wider">
                  Nezin Protocol Security
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmation;