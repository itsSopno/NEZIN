import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StoryMain = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="bg-[#050505] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mb-32">
        <motion.span 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] text-white/30 uppercase"
        >
          Archive_01 // Origins
        </motion.span>
        <motion.h2 
          initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-5xl crenzo-font font-light tracking-tighter mt-4"
        >
        
          Woven from <br /> <span className="italic font-serif">the Void.</span>
        </motion.h2>
      </div>

      {/* Parallax Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <motion.div style={{ y: y1 }} className="md:col-span-5 aspect-[3/4] overflow-hidden grayscale">
          <img src="https://i.postimg.cc/zf8Lk0L4/9d617fb1fc83bb676f5a49d37151e5b6.jpg" alt="Process" className="object-cover w-full h-full opacity-70" />
        </motion.div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="text-xl crenzo-font md:text-xl font-light leading-relaxed text-white/70">
            NEZIN didn't start in a studio. It started as a digital whisper—a response to the noise of fast fashion. We believe apparel is the final layer of your digital identity.
          </p>
          <div className="mt-12 h-[1px] w-20 bg-white/20" />
          <p className="mt-12 text-sm text-white/40 tracking-wide max-w-sm">
            Every stitch is a line of code. Every fabric is a deliberate choice. We don't follow seasons; we follow evolution.
          </p>
        </div>

        <motion.div style={{ y: y2 }} className="hidden md:block md:col-span-3 md:col-start-9 aspect-square overflow-hidden mt-[-20%] grayscale contrast-125 border border-white/10">
          <img src="https://i.postimg.cc/15S8Gy8n/4961c33bfd18dacb2c055d25ea31faa4.jpg" alt="Detail" className="object-cover w-full h-full" />
        </motion.div>
      </div>
    </div>
  );
};
export default StoryMain;