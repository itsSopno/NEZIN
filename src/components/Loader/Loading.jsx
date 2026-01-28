import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const words = ["NEZIN", "We don't design clothes", "We design confidence", "X STUDIO SINNERS", "EST 2026"];

  useEffect(() => {
    if (index === words.length) {
      setTimeout(() => onComplete(), 500);
      return;
    }
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 1000); // Fast, rhythmic sequence
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050505] cursor-wait"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Corner Metadata */}
      <div className="absolute top-10 left-10 overflow-hidden">
        <motion.span 
          initial={{ y: "100%" }} 
          animate={{ y: 0 }} 
          className="block text-[8px] text-white/20 tracking-[0.5em] font-mono"
        >
          AUTH_TYPE: GLOBAL_USER
        </motion.span>
      </div>
      
      <div className="absolute bottom-10 right-10 overflow-hidden text-right">
        <motion.span 
          initial={{ y: "100%" }} 
          animate={{ y: 0 }} 
          className="block text-[8px] text-white/20 tracking-[0.5em] font-mono"
        >
          ENCRYPTION: AES_256 <br />
          STATUS: INITIALIZING
        </motion.span>
      </div>

      {/* Central Sequence */}
      <div className="relative h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-white text-3xl md:text-5xl font-light tracking-[0.5em] uppercase"
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Expanding Ring Effect */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: [0, 0.1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-[30vw] h-[30vw] border border-white/10 rounded-full"
      />
    </motion.div>
  );
};

export default Preloader;