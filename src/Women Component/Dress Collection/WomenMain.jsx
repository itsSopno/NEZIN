import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const WomenMainPage = () => {
  return (
    <div className="bg-[#050505] selection:bg-white selection:text-black">
      <ModelShowcase />
      <WomenCollection />
    </div>
  );
};

const WomenCollection = () => {
  const [collections, setCollections] = useState([]);
  const { scrollYProgress } = useScroll();
  
  // Subtle page-wide parallax for the background noise
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    axios.get("https://server-1-1-6g3a.onrender.com/women")
      .then(res => setCollections(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="relative bg-[#050505] py-32 px-6 md:px-20 overflow-hidden">
      {/* Background Texture */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
      />

      {collections.map((collection) => (
        <div key={collection._id} className="mb-40 relative z-10">
          {/* Section Header with Floating Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="mb-24 border-l border-white/10 pl-8"
          >
            <span className="text-[10px] tracking-[0.8em] text-white/20 uppercase block mb-6 font-mono">
              System_Archive // {collection.season} // {collection.for}
            </span>
            <h2 className="text-white text-7xl md:text-[10vw] font-light tracking-tighter leading-[0.8] uppercase milky-font opacity-90">
              {collection.collection_name.replace(/_/g, ' ')}
            </h2>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
            {collection.products.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const ProductCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`relative group ${
        index % 3 === 0 ? "md:col-span-8" : "md:col-span-4"
      } h-[70vh] md:h-[90vh] overflow-hidden bg-[#0a0a0a]`}
    >
      <Link to={`/women/${item.id}`} className="block h-full w-full relative">
        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

        <motion.img
          src={item.image_ref}
          alt={item.name}
          className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
        />

        {/* UI HUD Elements */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1">
                <span className="text-white/40 font-mono text-[9px] tracking-widest uppercase">Ref_{item.id}</span>
            </div>
            {item.stock <= 3 && (
              <span className="bg-red-500/80 text-[9px] text-white px-2 py-1 font-bold tracking-tighter animate-pulse">
                CRITICAL_STOCK: {item.stock}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-4xl md:text-5xl font-light tracking-tighter leading-none">
              {item.name}
            </h3>
            
            <div className="flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
               <div className="max-w-[250px]">
                  <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-widest mb-4 italic">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    {item.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[7px] text-white/30 border border-white/10 px-2 py-0.5 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
               </div>
               <div className="text-right">
                  <span className="block text-white/30 text-[9px] uppercase tracking-widest mb-1">Price_Value</span>
                  <span className="text-white text-3xl font-light font-mono">${item.price}</span>
               </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-[1px] h-0 group-hover:h-20 bg-white/20 transition-all duration-1000" />
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-20 h-[1px] bg-white/20 transition-all duration-1000" />
    </motion.div>
  );
};

const ModelShowcase = () => {
  return (
    <div className="relative w-full h-screen bg-[#050505] flex flex-col md:flex-row items-center overflow-hidden">
      {/* Vertical Label */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block overflow-hidden h-64 w-10">
        <motion.p 
            animate={{ y: [0, -100, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-[10px] text-white/10 font-mono uppercase tracking-[1em] rotate-90 origin-center whitespace-nowrap"
        >
            NEZIN_SYSTEM_OPERATIONAL_LOGS_2026
        </motion.p>
      </div>

      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-10 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-left"
        >
          <div className="mb-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-ping" />
             </div>
             <span className="text-[9px] text-white/40 tracking-[0.5em] font-mono uppercase">V.26_Women_Archive</span>
          </div>

          <h1 className="text-white text-[12vw] md:text-[8vw] milky-font leading-[0.8] tracking-tighter uppercase">
            ETHEREAL <br /> 
            <span className="italic milky-font opacity-30">VOID</span>
          </h1>
          
          <p className="mt-8 max-w-xs text-white/30 text-[10px] leading-relaxed tracking-[0.2em] uppercase">
            Sculpting the silhouette of the modern survivor through digital geometry and forgotten marble aesthetics.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full md:w-1/2 h-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img 
            src="https://i.postimg.cc/zvS4HH0t/97f2a3dba7b066a4668aa0f8ee2e5f35.jpg" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3s]"
            alt="Women Hero"
          />
        </motion.div>
        
        {/* HUD Scanner Effect */}
        <motion.div 
           animate={{ top: ["0%", "100%", "0%"] }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           className="absolute left-0 w-full h-[1px] bg-white/20 z-30 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default WomenMainPage;