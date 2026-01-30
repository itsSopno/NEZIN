import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["NEZIN", "X", "STUDIO SINNERS", "EST 2026"];

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // If we've reached the last word, trigger completion after a brief pause
    if (index >= words.length - 1) {
      const exitTimer = setTimeout(() => onComplete(), 2000);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // Animation variants for cleaner JSX
  const textVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(8px)" },
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050505] cursor-wait overflow-hidden"
    >
      {/* Background Texture - Optimized with CSS for better performance */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
      
      {/* Dynamic Progress Bar at top */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${((index + 1) / words.length) * 100}%` }}
        className="absolute top-0 left-0 h-[1px] bg-white/20"
      />

      {/* Corner Metadata */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 overflow-hidden">
        <motion.span 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="block text-[8px] text-white/20 tracking-[0.5em] font-mono"
        >
          AUTH_TYPE: {index === words.length - 1 ? "VERIFIED" : "GLOBAL_USER"}
        </motion.span>
      </div>
      
      <div className="absolute bottom-10 right-10 overflow-hidden text-right hidden md:block">
        <motion.span className="block text-[8px] text-white/20 tracking-[0.5em] font-mono leading-loose">
          ENCRYPTION: AES_256 <br />
          <span className={index === words.length - 1 ? "text-green-500/40" : ""}>
            STATUS: {index === words.length - 1 ? "READY" : "INITIALIZING"}
          </span>
        </motion.span>
      </div>

      {/* Central Sequence */}
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-white crenzo-font text-2xl md:text-4xl font-light tracking-[0.8em] md:tracking-[1em] uppercase px-4 text-center"
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
        
        {/* Subtle Index Counter */}
        <div className="mt-4 text-[10px] font-mono text-white/10 tracking-widest">
          0{index + 1} / 0{words.length}
        </div>
      </div>

      {/* Visual Pulses */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.4, opacity: [0, 0.15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-[80vw] md:w-[40vw] aspect-square border border-white/5 rounded-full"
      />
    </motion.div>
  );
};

export default Preloader;