import React from 'react';
import { motion } from 'framer-motion';

const MuseGallery = () => {
  const muses = [
    {
      id: "MUSE_01",
      title: "STRUCTURAL SILENCE",
      text: "An exploration of heavy wool and architectural draping. Designed to command space without a sound.",
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80",
      layout: "md:col-span-7",
    },
    {
      id: "MUSE_02",
      title: "KINETIC FLUIDITY",
      text: "Silk-tech blends that move faster than the eye can follow. The silhouette in constant motion.",
      img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80",
      layout: "md:col-span-5 md:mt-32",
    },
    {
      id: "MUSE_03",
      title: "INDUSTRIAL GRACE",
      text: "Cold-pressed hardware meets soft-touch textiles. A study in feminine contradictions.",
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80",
      layout: "md:col-span-5",
    },
    {
      id: "MUSE_04",
      title: "THE MONOCHROME PROTOCOL",
      text: "Deep blacks and optic whites. Removing the noise of color to focus on the purity of form.",
      img: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80",
      layout: "md:col-span-7 md:-mt-20",
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-40 pb-20 px-6 md:px-20 overflow-hidden">
      {/* Header Section */}
      <header className="mb-32 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.8em] text-white/30 uppercase block mb-6"
        >
          Visual_Manifesto // V.26
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-9xl font-light tracking-tighter leading-none uppercase"
        >
          The <span className="font-serif italic text-white/40">Muse</span> <br /> Protocol
        </motion.h1>
      </header>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-16">
        {muses.map((muse, index) => (
          <motion.div 
            key={muse.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`${muse.layout} relative group`}
          >
            <div className="overflow-hidden bg-[#111] aspect-[3/4] md:aspect-auto md:h-[80vh] border border-white/5">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src={muse.img} 
                alt={muse.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Context Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-white/20 tracking-widest">{muse.id}</span>
                <div className="h-[1px] w-12 bg-white/10"></div>
              </div>
              <h3 className="text-2xl font-light tracking-tighter uppercase italic">{muse.title}</h3>
              <p className="text-white/40 text-sm max-w-xs font-light leading-relaxed">
                {muse.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Decoration */}
      <footer className="mt-40 border-t border-white/5 pt-10 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
        <span>Encrypted Archive Entry</span>
        <span>NEZIN // 2026</span>
      </footer>
    </div>
  );
};

export default MuseGallery;