import React from 'react';
import { motion } from 'framer-motion';

const MuseArchive = () => {
  const archiveItems = [
    {
      id: "LEGACY_SAR-01",
      tag: "Traditional // Saree",
      title: "The Earth-Tone Narrative",
      description: "A dialogue between nature and textile. Integrating organic handloom patterns with the structural stillness of the forest.",
      img: "https://i.postimg.cc/0Q5tZqS0/Whats-App-Image-2026-01-30-at-8-03-52-PM.jpg", // Your forest saree image
      layout: "md:col-span-4"
    },
      {
      id: "MUSE_01",
      title: "STRUCTURAL SILENCE",
      text: "An exploration of heavy wool and architectural draping. Designed to command space without a sound.",
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80",
      layout: "md:col-span-7",
    },
    //   {
    //   id: "STREET_URB-03",
    //   tag: "Street // Technical",
    //   title: "Urban Geometry",
    //   description: "Defying gravity through form. A high-contrast exploration of heavy cotton layers and tactical accessories.",
    //   img: "https://freeimage.host/i/fLA7BiG", // Your urban streetwear girl image
    //   layout: "md:col-span-4"
    // },
    {
      id: "MODEST_HJB-02",
      tag: "High_Modesty // Hijab",
      title: "Cinematic Presence",
      description: "Monochromatic power meets fluid grace. Engineered for the woman who finds strength in the spotlight of silence.",
      img: "https://i.postimg.cc/4yYRLctg/0819490f095733bb716e379e21ef9dec.jpg", // Your studio white suit/hijab image
      layout: "md:col-span-5 md:mt-40"
    },
    {
      id: "STREET_URB-03",
      tag: "Street // Technical",
      title: "Urban Geometry",
      description: "Defying gravity through form. A high-contrast exploration of heavy cotton layers and tactical accessories.",
      img: "https://freeimage.host/i/fLA7BiG", // Your urban streetwear girl image
      layout: "md:col-span-4"
    },
    {
      id: "VIVID_HJB-04",
      tag: "Vivid // Hijab",
      title: "Skyborne Patterns",
      description: "Traditional motifs re-imagined under a digital sky. Where vivid heritage meets the limitlessness of the horizon.",
      img: "https://i.postimg.cc/2jxfGzBX/b5f44e46356c2ebe27a8d70f7ad28a88.jpg", // Your sky-view patterned hijab image
      layout: "md:col-span-7"
    },
    {
      id: "POP_RED-05",
      tag: "Vibrant // Street",
      title: "The Red Frequency",
      description: "Breaking the monochrome protocol. A sudden surge of color within a structured industrial silhouette.",
      img: "https://i.postimg.cc/3wBS2qzV/katsiaryna-endruszkiewicz-Bte-Cp6aq4GI-unsplash.jpg", // Your red t-shirt/black jacket image
      layout: "md:col-span-4 "
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-40 px-6 md:px-20 overflow-hidden">
      {/* SECTION HEADER */}
      <header className="mb-40 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="font-mono text-[9px] tracking-[0.8em] text-white/30 uppercase mb-6"
          >
            System_Manifesto // V.26_Diversity_Log
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl milky-font font-light tracking-tighter leading-none"
          >
            THE <span className="italic font-serif text-white/40">MUSE</span> <br /> SPECTRUM
          </motion.h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-white/20 font-mono tracking-widest leading-relaxed">
            LOCATION: NEZIN_HQ <br /> 
            ACCESS: UNRESTRICTED <br />
            MOOD: HERITAGE_SYNC
          </p>
        </div>
      </header>

      {/* DYNAMIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-48 md:gap-x-12">
        {archiveItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${item.layout} relative group`}
          >
            {/* Image HUD */}
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[85vh] border border-white/5 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-1">
                 <span className="text-[8px] font-mono text-white/60 bg-black/60 px-2 py-1 backdrop-blur-md uppercase tracking-[0.2em]">
                   {item.tag}
                 </span>
                 <span className="text-[7px] font-mono text-white/20 bg-black/20 px-2 py-0.5 backdrop-blur-sm uppercase">
                   REF_{item.id}
                 </span>
              </div>
            </div>

            {/* Meaningful Text Content */}
            <div className="mt-12 space-y-4 max-w-sm">
              <h3 className="text-3xl milky-font font-light tracking-tighter uppercase leading-none">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm  leading-relaxed font-light">
                {item.description}
              </p>
              <motion.div 
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 cursor-pointer pt-4 group/btn"
              >
                <div className="w-10 h-[1px] bg-white/20 group-hover/btn:w-16 group-hover/btn:bg-white transition-all duration-500" />
                <span className="text-[8px] tracking-[0.4em] uppercase text-white/40 group-hover/btn:text-white">View_Dataset</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MuseArchive;