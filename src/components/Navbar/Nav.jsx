import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import UseAuth from '../Hooks/UseAuth';
import LogoutConfirmation from '../LogoutConfirmation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { role, loading } = useRole();
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    {name : "Story", path :"/story"},
    { name: 'Contact', path: '/Contact' },
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileOpen(false);
      setShowLogoutConfirm(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openLogoutConfirm = () => {
    setShowLogoutConfirm(true);
    setIsProfileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-[120] mix-blend-difference">
        {/* Logo */}
        <Link to="/" className="text-white text-xl md:text-2xl tracking-tighter font-medium">
          NEZIN.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-[10px] text-white/50 tracking-[0.3em] uppercase items-center">
          {/* Menu Items */}
          {menuItems.slice(0, user ? 2 : 4).map((item) => (
            <Link key={item.name} to={item.path} className="hover:text-white transition-colors cursor-pointer">
              {item.name}
            </Link>
          ))}
          
          {/* Dashboard Link for Owners */}
          {!loading && role === "owner" && (
            <Link to="/Dashboard" className="hover:text-white transition-colors cursor-pointer">
              Dashboard
            </Link>
          )}
         
          {/* Collection Dropdown */}
          <div className="relative group">
            <span className="cursor-pointer hover:text-white transition-colors">Collection</span>
            <div className="absolute top-full left-0 bg-black/90 backdrop-blur-sm border border-white/10 rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <Link to="/men" className="block px-4 py-2 hover:text-white transition-colors whitespace-nowrap">FOR MEN</Link>
              <Link to="/women" className="block px-4 py-2 hover:text-white transition-colors whitespace-nowrap">FOR WOMEN</Link>
            </div>
          </div>

          {/* User Profile / Auth Section */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold">
                      {user.displayName?.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl"
                  >
                    {/* User Info */}
                    <div className="border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {user.photoURL ? (
                            <img 
                              src={user.photoURL} 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold">
                              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-white/60 text-xs">
                          
                          </p>
                          {role && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-white/10 rounded text-xs text-white/80 capitalize">
                              {role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="space-y-2">
                      <Link 
                        to="/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs uppercase tracking-wider">Profile</span>
                      </Link>
{/*                       
                      <Link 
                        to="/settings" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs uppercase tracking-wider">Settings</span>
                      </Link> */}

                      <button 
                        onClick={openLogoutConfirm}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-500/20 transition-colors text-white/80 hover:text-red-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-xs uppercase tracking-wider">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hover:text-white transition-colors cursor-pointer">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-[10px] tracking-[0.4em] uppercase z-[130] p-2 pr-0 outline-none"
        >
          {isOpen ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Close —
            </motion.span>
          ) : (
            <span>Menu +</span>
          )}
        </button>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* User Profile Section for Mobile */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <p className="text-white text-xl font-light">
                  {user.displayName || 'User'}
                </p>
                <p className="text-white/60 text-sm">
                  {user.email}
                </p>
                {role && (
                  <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded text-sm text-white/80 capitalize">
                    {role}
                  </span>
                )}
              </motion.div>
            )}

            {/* Menu Items */}
            {menuItems.slice(0, user ? 2 : 4).map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
              >
                <Link 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-4xl font-light tracking-tighter hover:italic transition-all block"
                >
                  {item.name}
                </Link>
              
              </motion.div>
            ))}
           
            {/* Collection Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-white text-2xl mb-4 font-light">Collection</p>
              <Link 
                to="/men" 
                onClick={() => setIsOpen(false)}
                className="block text-white text-xl mb-2 hover:italic transition-all"
              >
                FOR MEN
              </Link>
              <Link 
                to="/women" 
                onClick={() => setIsOpen(false)}
                className="block text-white text-xl hover:italic transition-all"
              >
                FOR WOMEN
            </Link>
             {user ? (
              <></>
            ) :(
              <>
 <Link to="/login" className="text-white transition-colors cursor-pointer">
              Login
            </Link>
            </>
            )} 
             {!loading && role === "owner" && (
            <Link to="/dashboard" className="hover:text-white transition-colors cursor-pointer">
              Dashboard
            </Link>
          )}
                {/* <Link to="/login" className="text-white transition-colors cursor-pointer">
              Login
            </Link> */}
            </motion.div>

            {/* Logout Button for Mobile */}
            {user && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={openLogoutConfirm}
                className="mt-8 px-8 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all rounded text-sm uppercase tracking-wider"
              >
                Logout
              </motion.button>
            )}
            
            {/* Branding */}
            <div className="absolute bottom-10 text-[8px] text-white/20 tracking-[0.5em] uppercase">
              <h1>Nezin Protocol © 2026</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        userName={user?.displayName?.split(' ')[0]}
      />

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-[110]" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;