

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import { Link } from 'react-router';
// const Story = () => {
//   const containerRef = useRef(null);
  
//   // Track scroll progress for the entire story block
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   // Unique Animation: Background color transition from Black to Bone-White
//   const bgColor = useTransform(scrollYProgress, [0.4, 0.6], ["#050505", "#f5f5f7"]);
//   const textColor = useTransform(scrollYProgress, [0.4, 0.6], ["#ffffff", "#000000"]);

//   return (
//     <motion.div 
//       ref={containerRef} 
//       style={{ backgroundColor: bgColor }} 
//       className="relative min-h-[400vh] w-full transition-colors duration-700"
//     >
//       {/* SECTION 1: THE PINNED HERO */}
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
//         <motion.h2 
//           style={{ color: textColor, scale: useTransform(scrollYProgress, [0, 0.2], [1, 15]), opacity: useTransform(scrollYProgress, [0.1, 0.2], [1, 0]) }}
//           className="text-[12vw] font-black tracking-tighter uppercase z-20"
//         >
//           NEZIN
//         </motion.h2>
        
//         {/* Floating Image Parallax */}
//         <motion.div 
//           style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
//           className="absolute right-[10%] top-[20%] w-[20vw] h-[30vw] grayscale hover:grayscale-0 transition-all duration-500"
//         >
//           <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" className="object-cover w-full h-full border-[0.5px] border-white/10" alt="Fashion 1" />
//         </motion.div>
//       </div>

//       {/* SECTION 2: THE SPLIT NARRATIVE */}
//       <div className="relative h-screen w-full flex px-[10vw] items-center">
//         <div className="w-1/2">
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             className="max-w-md"
//           >
//             <span className="text-xs tracking-[0.5em] uppercase opacity-50 block mb-4">The Philosophy</span>
//             <h3 style={{ color: textColor }} className="text-5xl font-light leading-tight">We don't design clothes. We design confidence.</h3>
//           </motion.div>
//         </div>
//         <div className="w-1/2 flex justify-end">
//            <motion.div 
//              style={{ scale: useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1.2]) }}
//              className="w-[35vw] h-[45vw] overflow-hidden"
//            >
//              <img src="https://i.postimg.cc/q7d80J5W/Nezin.jpg" className="w-full h-full object-cover" alt="Fashion 2" />
//            </motion.div>
//         </div>
//       </div>

//       {/* SECTION 3: THE "BIG TEXT" SCROLL */}
//       <div className="h-screen w-full flex items-center overflow-hidden">
//         <motion.div 
//           style={{ x: useTransform(scrollYProgress, [0.6, 1], ["100%", "-100%"]) }}
//           className="whitespace-nowrap text-[25vw] font-black uppercase tracking-tighter opacity-10 italic"
//         >
//           Craftsmanship — Quality — Timeless — Luxury —
//         </motion.div>
//       </div>

//       {/* SECTION 4: THE FINAL LOOK */}
//       <div className="h-screen w-full flex flex-col items-center justify-center relative">
//         <motion.div 
//            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
//            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
//            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//            className="w-[60vw] h-[40vw] relative"
//         >
//           <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Fashion 3" />
//           <div className="absolute inset-0 flex items-center justify-center">
//              <Link to="/shop" className="px-12 py-4 bg-white text-black text-sm tracking-[0.3em] uppercase mix-blend-screen hover:bg-black hover:text-white transition-all">
//                 Shop Collection
//              </Link>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Story;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Privacy from '../Privacy/privacy';

const Story = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Color transitions remain the same
  const bgColor = useTransform(scrollYProgress, [0.4, 0.6], ["#050505", "#f5f5f7"]);
  const textColor = useTransform(scrollYProgress, [0.4, 0.6], ["#ffffff", "#000000"]);

  return (
    <>
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }} 
      className="relative min-h-[400vh] w-full transition-colors duration-700"
    >
      {/* SECTION 1: THE PINNED HERO */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.h2 
          style={{ 
            color: textColor, 
            scale: useTransform(scrollYProgress, [0, 0.2], [1, 12]), // Reduced scale for mobile safety
            opacity: useTransform(scrollYProgress, [0.1, 0.2], [1, 0]) 
          }}
          className="text-[18vw] md:text-[12vw] crenzo-font tracking-tighter uppercase z-20"
        >
          NEZIN
        </motion.h2>
        
        {/* Responsive Parallax Image */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="absolute right-[5%] md:right-[10%] top-[15%] md:top-[20%] w-[35vw] md:w-[20vw] h-[50vw] md:h-[30vw] grayscale opacity-40 md:opacity-100"
        >
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" 
            className="object-cover w-full h-full border-[0.5px] border-white/10" 
            alt="Fashion 1" 
          />
        </motion.div>
      </div>

      {/* SECTION 2: THE SPLIT NARRATIVE */}
      <div className="relative h-screen w-full flex flex-col md:flex-row px-6 md:px-[10vw] items-center justify-center md:justify-between gap-10 md:gap-0">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-md text-center md:text-left"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-50 block mb-4">The Philosophy</span>
            <h3 style={{ color: textColor }} className="text-3xl md:text-5xl font-light leading-tight">
              We don't design clothes. We design confidence.
            </h3>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
           <motion.div 
             style={{ scale: useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1.1]) }}
             className="w-[70vw] md:w-[35vw] h-[80vw] md:h-[45vw] overflow-hidden"
           >
             <img src="https://i.postimg.cc/q7d80J5W/Nezin.jpg" className="w-full h-full object-cover" alt="Fashion 2" />
           </motion.div>
        </div>
      </div>

      {/* SECTION 3: THE "BIG TEXT" SCROLL */}
      <div className="h-screen w-full flex items-center overflow-hidden">
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0.6, 1], ["50%", "-150%"]) }}
          className="whitespace-nowrap text-[35vw] md:text-[25vw] crenzo-font uppercase tracking-tighter opacity-10 italic"
        >
          Craftsmanship — Quality — Timeless — Luxury —
        </motion.div>
      </div>

      {/* SECTION 4: THE FINAL LOOK */}
      <div className="h-screen w-full flex flex-col items-center justify-center relative px-4">
        <motion.div 
           initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
           whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full md:w-[60vw] h-[60vh] md:h-[40vw] relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Fashion 3" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
             <Link 
               to="/men" 
               className="px-8 md:px-12 py-3 md:py-4 bg-white text-black text-[10px] md:text-sm tracking-[0.3em] uppercase mix-blend-screen hover:bg-black hover:text-white transition-all text-center"
             >
                Men Collection
             </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
    <section>
      <Privacy></Privacy>
    </section>
    </>
  );
};

export default Story;