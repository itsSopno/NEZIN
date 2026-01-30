import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const MenMainPage = () => {
  return (
    <>
      <ModelShowcase />
      <MenCollection />
    </>
  );
};

const MenCollection = () => {
  const [collections, setCollections] = useState([]); // Array of collections
  
  useEffect(() => {
    // Tomar production URL check koro, local thakle localhost:5000
    axios.get("https://server-1-1-6g3a.onrender.com/men")
      .then(res => setCollections(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="bg-[#050505] py-32 px-6 md:px-20 overflow-hidden">
      {collections.map((collection) => (
        <div key={collection._id} className="mb-24">
          {/* Collection Title */}
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.6em] text-white/30 uppercase block mb-4">
              {collection.season} // {collection.for}
            </span>
            <h2 className="text-white text-6xl md:text-8xl font-light tracking-tighter leading-none uppercase">
              {collection.collection_name.replace(/_/g, ' ')}
            </h2>
          </div>

          {/* Grid optimized for backend products array */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
            {collection.products.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`relative group ${
                  index % 3 === 0 ? "md:col-span-7" : "md:col-span-5"
                } h-[60vh] md:h-[80vh] bg-[#111] overflow-hidden`}
              >
                {/* Image Reference fix: item.image_ref onujayi */}
                <Link to={`/men/${item.id}`}>
                  <motion.img
                    src={item.image_ref} 
                    alt={item.name}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />

                  <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-white/20 font-mono text-xs tracking-widest">[{item.id}]</span>
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter ${
                        item.stock <= 3 ? "bg-red-600 text-white animate-pulse" : "bg-white text-black"
                      }`}>
                        {item.stock} Units Left
                      </span>
                    </div>
                    
                    <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-white text-3xl md:text-4xl font-light mb-2">{item.name}</h3>
                      <p className="text-white/40 text-sm max-w-[300px] mb-6 line-clamp-2 italic">{item.description}</p>
                      
                      {/* Tags display logic */}
                      <div className="flex gap-2 mb-4">
                         {item.tags?.map(tag => (
                           <span key={tag} className="text-[8px] text-white/30 border border-white/10 px-2 py-0.5 uppercase tracking-widest">{tag}</span>
                         ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-white text-2xl font-mono">${item.price}</span>
                        <div className="border border-white/20 text-white px-6 py-2 text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const ModelShowcase = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-screen bg-[#050505] flex flex-col md:flex-row items-center overflow-hidden border-b border-white/5">
      
      {/* LEFT: Massive Typography with Clip-Path */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-10 z-20 bg-[#050505]">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-left"
        >
          <h2 className="text-white text-[15vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase">
            FORM <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10 italic font-serif font-light">
              DECODED
            </span>
          </h2>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20" />
            <p className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">
              Release_Archive // FW26
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Interactive Image Frame */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
        {/* Parallax Image Container */}
        <motion.div 
          initial={{ scale: 1.2, filter: "blur(20px)" }}
          whileInView={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img 
            src="https://i.postimg.cc/3xRyhJpy/aab55a50e8af0150d3f55fb61851d70e.jpg" 
            alt="Model Sculpture"
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
          />
        </motion.div>

        {/* Floating Technical HUD (Heads-up Display) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-l opacity-60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 left-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-10 md:left-auto text-left md:text-right"
        >
          <div className="space-y-4">
            {["Engineered Fit", "Articulated", "V.26 Archive"].map((text, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p 
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="text-white/60 font-mono text-[9px] uppercase tracking-[0.5em] border-b border-white/10 pb-1"
                >
                  {text}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center Absolute "Power" Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:block">
         <motion.h3 
           animate={{ opacity: [0.2, 0.5, 0.2] }}
           transition={{ duration: 3, repeat: Infinity }}
           className="text-white/10 text-9xl font-black tracking-[0.2em] rotate-90"
         >
           POWER
         </motion.h3>
      </div>
    </div>
  );
};

export default MenMainPage;