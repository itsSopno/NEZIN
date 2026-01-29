// import React from 'react';
// import { motion } from 'framer-motion';

// const Aesthetic = () => {
//   return (
//     <section className="relative w-full min-h-screen bg-[#0a0a0a] py-32 px-6 md:px-20 overflow-hidden">
//       {/* Background Decorative Element */}
//       <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
//         <span className="text-[12vw] font-black tracking-tighter text-white leading-none italic select-none">
//           01
//         </span>
//       </div>

//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
//         {/* --- LEFT SIDE: THE POETRY --- */}
//         <div className="md:col-span-5 z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 mb-8 block">
//               The Architecture of Presence
//             </span>
//             <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white leading-[0.9] mb-10">
//               Silence <br /> is the new <br /> <span className="italic font-serif">Volume.</span>
//             </h2>
            
//             <div className="space-y-6 max-w-sm">
//               <p className="text-white/50 text-sm leading-relaxed tracking-wide font-light">
//                 We believe that true masculinity is not shouted; it is felt in the precision of a seam and the weight of a drape.
//               </p>
//               <p className="text-white/50 text-sm leading-relaxed tracking-wide font-light">
//                 NEZIN Men is an exploration of the space between <span className="text-white/80">structure</span> and <span className="text-white/80">fluidity</span>.
//               </p>
//             </div>

//             <motion.div 
//               whileHover={{ x: 10 }}
//               className="mt-16 inline-flex items-center gap-6 cursor-pointer group"
//             >
//               <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 transition-all duration-500" />
//               <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">Read the Manifesto</span>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* --- RIGHT SIDE: THE COMPOSITION --- */}
//         <div className="md:col-span-7 relative h-[70vh] md:h-[90vh]">
//           {/* Main Large Image */}
//           <motion.div 
//             initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
//             whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
//             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute right-0 top-0 w-[80%] h-[80%] grayscale brightness-75 border border-white/5"
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80" 
//               className="w-full h-full object-cover" 
//               alt="Male Fashion Aesthetic"
//             />
//           </motion.div>

//           {/* Overlapping Small Image */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="absolute left-0 bottom-10 w-[45%] h-[50%] z-20 shadow-2xl border-[0.5px] border-white/10"
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1532910404247-7ee9488d7292?auto=format&fit=crop&q=80" 
//               className="w-full h-full object-cover grayscale brightness-110" 
//               alt="Texture Detail"
//             />
//             {/* Label on the small image */}
//             <div className="absolute bottom-4 left-4 text-[7px] text-white/40 tracking-[0.3em] uppercase bg-black/40 backdrop-blur-md p-2">
//               Detail_Ref: 0029 // Silk_Wool_Blend
//             </div>
//           </motion.div>

//           {/* Floating Text Element */}
//           <motion.div 
//             animate={{ y: [0, -20, 0] }}
//             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//             className="absolute top-[20%] right-[-5%] hidden md:block"
//           >
//              <span className="text-[10px] text-white/10 tracking-[1em] uppercase vertical-text">
//                 Timeless — Engineering
//              </span>
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Aesthetic;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AestheticGrid = () => {
  const { scrollYProgress } = useScroll();

  // Optimized parallax for a more "floating" feel
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -450]);

  const images = [
    { 
      src: "https://i.postimg.cc/mDmPHjXj/171e99fe35379cc59a11bba55e44d3f2.jpg", 
      label: "DIVINE_RECOVERY", 
      meaning: "HISTORY IS A VARIABLE.", 
      pos: "col-span-7", 
      y: y1 
    },
    { 
      src: "https://i.postimg.cc/JnVfQCgB/b05647cb81bc3bd7544d2422a28aa23b.jpg", 
      label: "MARBLE_CORE", 
      meaning: "STILLNESS IN MOTION.", 
      pos: "col-span-5 pt-32", 
      y: y2 
    },
    { 
      src: "https://i.postimg.cc/jS3xWTVw/ead817742145abdd0295da4a25cbeaf0.jpg", 
      label: "VOID_GEOMETRY", 
      meaning: "ARCHITECTURE OF SILENCE.", 
      pos: "col-span-4", 
      y: y3 
    },
    { 
      src: "https://i.postimg.cc/3r0nVFJW/002fd0af4d0a8d1b5ab8142df4ccfc8c.jpg", 
      label: "HALO_INITIAL", 
      meaning: "THE FUTURE IS ANCESTRAL.", 
      pos: "col-span-8 mt-[-15%]", 
      y: y4 
    }
  ];

  return (
    <div className="bg-black">
      {/* 1. MAIN GRID SECTION */}
      <section className="relative py-60 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Header */}
        <div className="relative z-10 mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-white/20" />
               <span className="text-[9px] tracking-[0.6em] text-white/40 uppercase font-mono">Archive // Visual_Logic</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-light tracking-tighter leading-[0.85] text-white">
              The Digital <br/> <span className="italic font-serif">Aura.</span>
            </h2>
          </motion.div>
          <div className="md:text-right">
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">Protocol Status</p>
              <p className="text-xs font-mono text-white/60 italic leading-relaxed">
                  SYNCHRONIZING_ANALOG_FORMS... <br />
                  ENCRYPTION_LEVEL: AES_256
              </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20 items-start relative z-20">
          {images.map((img, i) => (
            <motion.div key={i} style={{ y: img.y }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} className={`relative group ${img.pos}`}>
              <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="text-white text-[10px] tracking-[1.5em] uppercase font-bold mix-blend-difference">{img.meaning}</span>
              </div>
              <div className="flex justify-between items-center mb-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[8px] font-mono tracking-widest uppercase italic">[{img.label}]</span>
                  <span className="text-[8px] font-mono uppercase">Ref_00{i+1}</span>
              </div>
              <div className="overflow-hidden bg-[#111] relative border border-white/5">
                <motion.img whileHover={{ scale: 1.1, filter: "grayscale(0%) contrast(100%)" }} src={img.src} className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 opacity-70 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-yellow-500 scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right" />
              </div>
              <div className="mt-4 overflow-hidden">
                  <motion.p className="text-[7px] tracking-[0.4em] text-white/20 group-hover:text-white/60 uppercase transition-colors">
                     Coordinates: 40.7128° N, 74.0060° W // Depth: {Math.abs(Math.round(img.y.get()))}px
                  </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. MANIFESTO BRIDGE SECTION */}
      <section className="relative z-10 py-40 max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.5em] text-yellow-500 font-bold uppercase">Terminal_Philosophy // 001</span>
          </div>
          <h3 className="text-3xl md:text-6xl font-light tracking-tighter leading-tight text-white/90">
            We exist at the intersection of <br /> 
            <span className="italic font-serif text-white">forgotten marble</span> and 
            <span className="font-mono text-white/20 text-xl md:text-3xl"> {'>'} future_code.</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-12">
            <p className="text-[11px] leading-relaxed tracking-[0.2em] text-white/40 uppercase">
              The fabric we weave is a digital skin. A protective layer for those who navigate the physical world with a virtual soul. We do not follow trends; we follow the resonance of the void.
            </p>
            <p className="text-[11px] leading-relaxed tracking-[0.2em] text-white/40 uppercase">
              Every garment is a reconstructed archive. A piece of history encrypted for the modern survivor. Identify with the past to navigate the infinite.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. SYSTEM FOOTER SECTION */}
      <footer className="bg-black py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="flex flex-col gap-6">
            <h5 className="text-white text-xs tracking-[0.4em] uppercase font-bold">The Core Archive</h5>
            <p className="text-[10px] text-white/30 uppercase leading-relaxed tracking-widest">
              NEZIN IS A SYSTEM OF DRESSING DESIGNED FOR THE INTERSECTION OF THE PHYSICAL AND THE VIRTUAL.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase italic">System_Live: 24.1.28</span>
            </div>
            <div className="text-[8px] font-mono text-white/20 uppercase leading-loose text-center">
              Protocol_01: Integrity <br /> Protocol_02: Anonymity <br /> Protocol_03: Evolution
            </div>
          </div>
          <div className="flex flex-col gap-6 items-end text-right">
            <span className="text-4xl font-serif italic text-white opacity-20">Nezin.</span>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Designed in the Void <br /> Crafted for the survivor.</p>
          </div>
        </div>

        {/* Eternal Process Tag */}
        <div className="mt-40 flex flex-col items-center">
            <motion.div animate={{ height: [0, 80, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-[1px] bg-gradient-to-b from-white/40 to-transparent mb-10" />
            <h4 className="text-[10px] tracking-[1.5em] uppercase text-white font-bold mb-4">ETERNAL_PROCESS</h4>
            <p className="max-w-xs text-[9px] text-white/30 leading-relaxed tracking-widest uppercase italic text-center">
                "We do not create. We simply reveal what the digital void has already crafted."
            </p>
        </div>
      </footer>
    </div>
  );
};

export default AestheticGrid;