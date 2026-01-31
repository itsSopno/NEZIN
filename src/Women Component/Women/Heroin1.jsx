// import React from 'react';
// import { motion } from 'framer-motion';

// const WomenHero = () => {
//   return (
//     <section className="relative w-full min-h-screen bg-[#080808] py-32 px-6 md:px-20 overflow-hidden">
//       {/* Background Decorative Element - Feminine Silhouette Reference */}
//       <div className="absolute top-0 right-0 p-10 opacity-5 hidden md:block">
//         <span className="text-[15vw] font-serif font-light italic tracking-tighter text-white leading-none select-none">
//           Femme
//         </span>
//       </div>

//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
//         {/* --- LEFT SIDE: THE POETRY --- */}
//         <div className="md:col-span-5 z-10">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//           >
//             <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 mb-8 block">
//               The Art of Ethereal Form
//             </span>
//             <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white leading-[0.85] mb-10">
//               Grace <br /> is a <br /> <span className="italic font-serif text-white/60">Subversive</span> <br /> Act.
//             </h2>
            
//             <div className="space-y-6 max-w-sm">
//               <p className="text-white/40 text-sm leading-relaxed tracking-wide font-light">
//                 Our Women’s Archive 26 is a dialogue between the <span className="text-white/70 italic">delicacy of silk</span> and the <span className="text-white/70">rigor of tailoring</span>. 
//               </p>
//               <p className="text-white/40 text-sm leading-relaxed tracking-wide font-light border-l border-white/10 pl-6">
//                 Designed for the woman who moves with intent. A collection that breathes with the body, not against it.
//               </p>
//             </div>

//             <motion.div 
//               whileHover={{ gap: '2.5rem' }}
//               className="mt-16 inline-flex items-center gap-6 cursor-pointer group"
//             >
//               <span className="text-[9px] tracking-[0.5em] uppercase text-white/80 font-bold group-hover:text-white transition-colors">
//                 Explore the Archive
//               </span>
//               <div className="w-16 h-[1px] bg-white/40 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* --- RIGHT SIDE: THE COMPOSITION --- */}
//         <div className="md:col-span-7 relative h-[75vh] md:h-[95vh] flex items-center justify-end">
          
//           {/* Main Large Image - Soft, High Fashion Focus */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 1.1 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
//             className="w-[85%] h-[85%] grayscale-[40%] hover:grayscale-0 transition-all duration-[2s] border border-white/5 overflow-hidden"
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80" 
//               className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[3s]" 
//               alt="Women's Editorial Aesthetic"
//             />
//           </motion.div>

//           {/* Overlapping Small Image - Detail & Texture */}
//           <motion.div 
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1.2, delay: 0.8 }}
//             className="absolute left-[-5%] bottom-[5%] w-[40%] h-[45%] z-20 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10"
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" 
//               className="w-full h-full object-cover brightness-90 hover:brightness-110 transition-all duration-1000" 
//               alt="Silk Texture Detail"
//             />
//             {/* Label - Subtle HUD element */}
//             <div className="absolute top-0 right-0 bg-black/60 backdrop-blur-md px-3 py-1 text-[7px] text-white/60 tracking-widest uppercase">
//               V.26_Material_Study
//             </div>
//           </motion.div>

//           {/* Floating Aesthetic Element - Vertical Text */}
//           <div className="absolute left-[40%] top-[10%] hidden md:block overflow-hidden">
//             <motion.span 
//               initial={{ y: "100%" }}
//               whileInView={{ y: "0%" }}
//               transition={{ duration: 1, delay: 1 }}
//               className="text-[9px] text-white/20 tracking-[1.2em] uppercase whitespace-nowrap"
//               style={{ writingMode: 'vertical-rl' }}
//             >
//               Fluidity // Structure // Grace
//             </motion.span>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default WomenHero;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WomenHeroRedesign = () => {
  const { scrollY } = useScroll();
  
  // Subtle parallax for the main image
  const yImage = useTransform(scrollY, [0, 500], [0, -50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative w-full min-h-[110vh] bg-[#070707] flex items-center overflow-hidden pt-20">
      
      {/* Background HUD Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute top-0 left-[15%] h-full w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
        <span className="absolute bottom-10 left-10 font-mono text-[10px] tracking-[1em] text-white/10 uppercase">
          Archive_Reference_26 // System_Initiated
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
          
          {/* LEFT: The Deconstructed Title */}
          <motion.div style={{ y: yText }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
            >
              <h1 className="text-[14vw] lg:text-[10vw] milky-font font-black tracking-tighter leading-[0.8] text-white uppercase select-none">
                FLUID <br />
                <span className="font-serif italic font-light text-white/30 ml-[2vw]">LOGIC</span>
              </h1>
              
              <div className="mt-12 flex items-start gap-8">
                <div className="w-1 bg-white h-24 mt-2 hidden md:block" />
                <div className="space-y-6">
                  <p className="text-white/40 text-xs md:text-sm tracking-widest uppercase font-mono max-w-xs leading-relaxed">
                    [01] An exploration of draped structuralism. <br />
                    [02] Engineered for the modern silhouette.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
                    className="text-white border border-white/20 px-10 py-4 text-[10px] uppercase tracking-[0.4em] backdrop-blur-sm hover:bg-white hover:text-black transition-all"
                  >
                    Enter_Archive
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: The Visual Stack */}
          <div className="relative w-full lg:w-1/2 h-[60vh] md:h-[80vh]">
            
            {/* Primary Image Frame */}
            <motion.div 
              style={{ y: yImage }}
              className="absolute right-0 top-0 w-full md:w-[85%] h-full overflow-hidden border border-white/10 group"
            >
              <motion.img 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
                src="https://i.postimg.cc/3wBS2qzV/katsiaryna-endruszkiewicz-Bte-Cp6aq4GI-unsplash.jpg" 
                className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-105"
                alt="Main Archive Piece"
              />
              {/* Overlay HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">Visual_Asset_ID</p>
                <p className="text-white text-[10px] font-mono tracking-widest">NZ-W26-FRM-09</p>
              </div>
            </motion.div>

            {/* Floating Secondary Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -left-10 md:-left-20 bottom-10 w-48 md:w-72 h-64 md:h-96 z-20 border-[8px] border-[#070707] shadow-2xl overflow-hidden"
            >
               <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover contrast-125 brightness-75"
                alt="Texture Close-up"
              />
              <div className="absolute inset-0 border border-white/20 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-10 top-1/2 -rotate-90 origin-right hidden xl:block">
        <span className="text-[10px] tracking-[2em] text-white/5 uppercase whitespace-nowrap">
          NEZIN — WINTER ARCHIVE // 2026
        </span>
      </div>
    </section>
  );
};

export default WomenHeroRedesign;