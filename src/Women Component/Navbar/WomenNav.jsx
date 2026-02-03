import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const WomenNavbar = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Collection", path: "WomenC", id: "01" },
    { name: "Accessories", path: "/women/acc", id: "02" },
    {name : "Home" , path :"/" , id:"03"}
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference">
        {/* BRAND LOGO */}
        <Link to="/women" className="group">
          <motion.div className="flex flex-col">
            <span className="text-white text-xl md:text-2xl font-black tracking-tighter leading-none group-hover:italic transition-all">
              NEZIN
            </span>
            <span className="text-[7px] md:text-[8px] text-white/40 tracking-[0.5em] uppercase mt-1">
              Women_Archive
            </span>
          </motion.div>
        </Link>

        {/* CENTER NAV LINKS - Desktop Only */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onMouseEnter={() => setIsHovered(link.id)}
              onMouseLeave={() => setIsHovered(null)}
              className="relative text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
            >
              <span className="mr-2 text-[8px] opacity-30 font-mono">[{link.id}]</span>
              {link.name}
              
              {/* Animated Underline */}
              {isHovered === link.id && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute -bottom-2 left-0 w-full h-[1px] bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE: HUD STATUS & CART */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex flex-col items-end font-mono text-[8px] text-white/20 uppercase tracking-widest leading-relaxed">
            <span>System_Status: Optimal</span>
            <span>Access: V.26_Authorized</span>
          </div>
          
          {/* CART/BAG ICON */}
          <Link to="/cart" className="relative group">
            <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
              <span className="text-[8px] md:text-[10px] text-white">BAG</span>
              {/* Stock Count Indicator */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black text-[6px] md:text-[7px] flex items-center justify-center font-bold">
                0
              </span>
            </div>
          </Link>

          {/* MOBILE MENU TRIGGER */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col gap-1 w-5 z-[110] relative"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
              className="h-[1px] w-full bg-white origin-center transition-all"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 0.5 }}
              className="h-[1px] w-full bg-white transition-all"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
              className="h-[1px] w-full bg-white origin-center transition-all"
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-[105] flex flex-col items-center justify-center md:hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className="text-white text-3xl font-light tracking-tighter hover:italic transition-all block text-center"
                  >
                    <span className="text-sm text-white/40 font-mono block mb-2">[{link.id}]</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Cart Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="text-white text-2xl font-light tracking-tighter hover:italic transition-all block text-center"
                >
                  <span className="text-sm text-white/40 font-mono block mb-2">[04]</span>
                  Shopping_Bag
                </Link>
              </motion.div>
            </div>

            {/* Mobile System Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 text-center font-mono text-[8px] text-white/20 uppercase tracking-widest leading-relaxed"
            >
              <div>System_Status: Optimal</div>
              <div>Access: V.26_Authorized</div>
              <div className="mt-4 text-white/10">Nezin Women © 2026</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[104] md:hidden" 
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default WomenNavbar;