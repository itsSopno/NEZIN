import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white pt-32 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-20 right-[-5%] text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic">
        Connect
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
        
        {/* --- LEFT SIDE: THE MOOD & DATA --- */}
        <div className="md:col-span-5 flex flex-col gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-[60vh] overflow-hidden grayscale border border-white/10"
          >
            <img 
            //   src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80" 
            src="https://i.postimg.cc/JnWFvHJS/IMG-20260116-175859-631.webp"
              alt="Editorial contact" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/30">Global Headquarters</span>
            <p className="text-xl font-light tracking-tight opacity-80">
              Unit 7, The Creative Hub<br />
              London, E1 6HU<br />
              United Kingdom
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase italic">System Time</span>
              <span className="text-sm font-mono opacity-60">14:22:05 GMT</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE COMMUNICATION TERMINAL --- */}
        <div className="md:col-span-7 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl crenzo-font font-light tracking-tighter leading-none mb-8">
              Initiate <br /> Dialogue.
            </h1>
            <p className="max-w-md text-white/50 text-sm leading-relaxed mb-12 tracking-wide">
              Whether you are looking for a bespoke consultation or have inquiries regarding our latest archives, our protocol ensures a direct link to our design team.
            </p>
          </motion.div>

          {/* Contact Form */}
          <form className="flex flex-col gap-10 w-full max-w-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2 group">
                <label className="text-[9px] tracking-[0.4em] uppercase text-white/30 group-focus-within:text-white transition-colors">Identification</label>
                <input type="text" placeholder="YOUR NAME" className="bg-transparent border-b border-white/10 py-3 text-sm focus:border-white outline-none transition-all placeholder:text-white/10" />
              </div>
              <div className="flex flex-col gap-2 group">
                <label className="text-[9px] tracking-[0.4em] uppercase text-white/30 group-focus-within:text-white transition-colors">Digital Entry</label>
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-white/10 py-3 text-sm focus:border-white outline-none transition-all placeholder:text-white/10" />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-[9px] tracking-[0.4em] uppercase text-white/30 group-focus-within:text-white transition-colors">The Message</label>
              <textarea rows="4" placeholder="DESCRIBE YOUR INQUIRY" className="bg-transparent border-b border-white/10 py-3 text-sm focus:border-white outline-none transition-all resize-none placeholder:text-white/10" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-fit px-16 py-5 bg-white text-black text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-white/90 transition-all flex items-center gap-4"
            >
              Send Transmission <span>→</span>
            </motion.button>
          </form>

          {/* Social Links */}
          <div className="mt-20 flex gap-12 border-t border-white/5 pt-10">
            {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
              <a key={social} href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;