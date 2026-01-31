import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Privacy = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const protocols = [
    {
      tag: "CORE_IDENTITY",
      title: "Bio-Metric Data",
      desc: "We do not store physical measurements. We only translate your aesthetic preferences into digital coordinates to ensure the 'Nezin Fit' remains consistent across the ecosystem."
    },
    {
      tag: "TRACKING_VECTOR",
      title: "Digital Footprint",
      desc: "Our system logs your interaction nodes (IP, Device ID) solely to prevent unauthorized terminal access. We do not track your movement outside the Nezin domain."
    },
    {
      tag: "NODE_SHARING",
      title: "Encrypted Partners",
      desc: "Your data is never a commodity. We only share delivery vectors with our logistics nodes to facilitate the physical arrival of your archives."
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* 1. THE STICKY BLUEPRINT (LEFT SIDE) */}
      <div className="sticky top-0 h-screen w-full md:w-1/2 hidden md:flex flex-col items-center justify-center pointer-events-none p-10">
        <div className="relative w-full h-[70vh] border-l border-white/5 flex items-center justify-center">
            {/* Minimalist Tech Drawing of a Shirt/Jacket */}
            <motion.div 
                style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]) }}
                className="w-full h-full flex items-center justify-center"
            >
                {/* <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.1] opacity-40">
                    <path d="M20,20 L80,20 L85,50 L75,85 L25,85 L15,50 Z" />
                    <circle cx="50" cy="50" r="30" className="stroke-dashed" strokeDasharray="1 2" />
                    <line x1="20" y1="20" x2="80" y2="80" />
                    <line x1="80" y1="20" x2="20" y2="80" />
                </svg> */}
                <img src="https://i.postimg.cc/Bnmz4QWf/da859ef9c5282f8384126c25fca8273f.jpg" alt="Tech Drawing" className="object-contain w-full h-full opacity-40 grayscale" />   
            </motion.div>

            {/* Scanning Line Animation */}
            <motion.div 
                style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                className="absolute left-0 w-full h-[1px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
            />
            
            <div className="absolute top-10 left-10 text-[8px] font-mono tracking-[0.4em] text-white/20 uppercase">
                Status: Scanning_Privacy_Protocols<br/>
                Scan_Level: Deep_Archive
            </div>
        </div>
      </div>

      {/* 2. THE SCROLLING CONTENT (RIGHT SIDE) */}
      <div className="relative w-full md:w-1/2 ml-auto">
        <div className="min-h-screen flex flex-col justify-center px-10 md:px-20 py-40">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[10px] tracking-[0.8em] uppercase text-white/30 mb-6 block"
            >
                Legal_Interface_0.1
            </motion.span>
            <h1 className="text-3xl md:text-4xl crenzo-font font-light tracking-tighter mb-10 leading-none">
                Privacy <br/> As An Art.
            </h1>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed tracking-wide">
                At Nezin, we treat your digital presence with the same precision as our silk. Transparency is not a feature; it is the foundation.
            </p>
        </div>

        {protocols.map((p, i) => (
            <section key={i} className="min-h-screen flex flex-col justify-center px-10 md:px-20 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="font-mono text-[9px] text-white/30 tracking-widest mb-4 block">
                        PROTOCOL_{p.tag}
                    </span>
                    <h2 className="text-3xl md:text-6xl crenzo-font font-light tracking-tight mb-8">
                        {p.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-md">
                        {p.desc}
                    </p>
                </motion.div>
            </section>
        ))}

        {/* Closing Footer of the page */}
        <div className="h-[50vh] flex items-center px-10 md:px-20 bg-white text-black">
            <div className="w-full">
                <p className="text-[10px] tracking-[0.5em] uppercase mb-4 opacity-40">End of Transmission</p>
                <h3 className="text-3xl font-light tracking-tight">Questions regarding our protocols?</h3>
                <a href="mailto:vault@nezin.com" className="inline-block mt-8 pb-1 border-b border-black text-sm uppercase tracking-widest font-bold">
                    Reach the Vault
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;