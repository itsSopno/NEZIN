import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CollectionNav = () => {
  const categories = [
    { name: "Outerwear", path: "/men" },
    { name: "Winter Collection", path:"Products" },
    { name: "Trousers", path: "/trousers" },
    { name: "Aesthetic", path: "aesthetic" },
    { name: "Home", path: "/" },
  ];

  return (
    <div className="w-full flex justify-center sticky top-10 md:top-24 z-[90] px-4 md:px-6 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center bg-black/20 backdrop-blur-xl border border-white/10 p-1 md:p-1.5 rounded-full max-w-full"
      >
        {/* Scrollable Container for Mobile */}
        <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-2 md:px-0">
          <div className="flex items-center gap-1">
            {categories.map((cat, i) => (
              <Link key={cat.name} to={cat.path} className="shrink-0">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 md:px-5 py-2 rounded-full text-[8px] md:text-[9px] tracking-[0.2em] uppercase transition-all whitespace-nowrap
                    ${i === 0 ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
                >
                  {cat.name.replace('_', ' ')}
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Separator - Hidden on very small screens if space is tight */}
        <div className="hidden xs:block h-4 w-[1px] bg-white/10 mx-2 shrink-0" />

        {/* Search Toggle */}
        <button className="shrink-0 px-4 text-white/40 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor">
                <circle cx="6" cy="6" r="5" strokeWidth="1.5"/>
                <path d="M10 10L13 13" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default CollectionNav;