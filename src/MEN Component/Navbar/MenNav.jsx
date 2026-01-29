import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CollectionNav = () => {
  const categories = [
    { name: "Outerwear", path: "" }, // Empty string for current route
    { name: "Technical_Tops", path: "" },
    { name: "Trousers", path: "" },
    { name: "Aesthetic", path: "aesthetic" }, // Relative path
     {  name : "Home", path :"/"},
  ];

  return (
    <div className="w-full flex justify-center sticky top-24 z-[90] px-6 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-full"
      >
        <div className="flex items-center gap-1">
          {categories.map((cat, i) => (
            <Link key={cat.name} to={cat.path}>
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className={`px-5 py-2 rounded-full text-[9px] tracking-[0.2em] uppercase transition-all flex items-center gap-3
                  ${i === 0 ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
              >
                {cat.name}
              </motion.button>
            </Link>
          ))}
        </div>
        
        {/* Separator */}
        <div className="h-4 w-[1px] bg-white/10 mx-2" />

        {/* Search Toggle */}
        <button className="px-4 text-white/40 hover:text-white transition-colors">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor">
                <circle cx="6" cy="6" r="5" strokeWidth="1.5"/>
                <path d="M10 10L13 13" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default CollectionNav;