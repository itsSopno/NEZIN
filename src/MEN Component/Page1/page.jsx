import React from "react";
import { motion } from "framer-motion";

const Hero1 = () => {
  return (
    <section className="relative w-full h-screen bg-[#f5f5f7] overflow-hidden flex items-center justify-center">
      {/* 1. Background Watermark (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[25vw] font-black text-black/[0.03] tracking-tighter uppercase">
          Masculine
        </h2>
      </div>

      {/* 2. The Main Content Grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 px-6 md:px-10">
        
        {/* LEFT COLUMN: Metadata */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-end pb-20 border-r border-black/5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] tracking-[0.4em] text-black/30 uppercase">System_Classification</span>
            <p className="text-xs font-mono text-black/60 leading-relaxed uppercase">
              // Type: Men_Apparel <br />
              // Season: Fall/Winter_26 <br />
              // Status: Available_Archives
            </p>
          </motion.div>
        </div>

        {/* CENTER COLUMN: The Visual Hook */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[60vh] md:w-[80%] md:h-[75vh] group"
          >
            {/* The Image */}
            <img 
              src="https://i.postimg.cc/JzRFdhY4/70ce13a05c86ca70b4e39798d114cef0.jpg" 
              alt="Men's Collection" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference">
              <h1 className="text-white text-[12vw] md:text-[8vw] font-light tracking-tighter leading-none text-center">
                NEZIN <br /> <span className="font-serif italic">MEN</span>
              </h1>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 flex flex-col items-center gap-4">
            <span className="text-[9px] tracking-[0.5em] text-black/40 uppercase">Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[1px] h-10 bg-black/20"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Statement */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center items-end border-l border-black/5">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-[200px] text-right"
          >
            <h3 className="text-2xl font-light tracking-tighter leading-tight text-black mb-4">
              Architecture for the modern man.
            </h3>
            <p className="text-[10px] text-black/40 leading-relaxed tracking-wider">
              A collection defined by structural integrity and advanced textile engineering.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero1;