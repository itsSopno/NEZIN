
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Shield, Zap, Activity, Eye, Terminal } from 'lucide-react';

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* BACKGROUND GRAIN & ATMOSPHERE */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] animate-pulse" />

      {/* 1. TOP TICKER TAPE (Live Brand Feed) */}
      <div className="fixed top-0 w-full bg-white/5 backdrop-blur-md border-b border-white/5 z-50 overflow-hidden py-1">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-20 items-center text-[8px] milky-font  tracking-[0.6em] text-white/40 uppercase"
        >
          <span>System_Stable // Archive_v2.6.0</span>
          <span>New_Capture: Tiger_Tapestry_Detected</span>
          <span>Global_Reach: Bangladesh_Node_Active</span>
          <span>"Fashion_is_the_Armor_of_the_Future"</span>
          <span>Security_Level: Encrypted</span>
        </motion.div>
      </div>

      <div className="relative z-10 p-8 md:p-16 max-w-7xl mx-auto pt-24">
        
        {/* TOP STATUS BAR */}
        <header className="flex justify-between items-center mb-20 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
              <span className="text-[10px] font-mono">NZ</span>
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Node_Status: Active</p>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Region: 23.8N, 90.4E</p>
            </div>
          </div>
          <div className="hidden md:flex gap-12 items-center">
             {/* 2. VITALS HUD (Mini Stats) */}
             <div className="flex gap-8 border-l border-white/10 pl-8">
                <div className="text-right">
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Live_Views</p>
                    <div className="flex items-center justify-end gap-2">
                        <Eye size={10} className="text-white/40"/>
                        <span className="text-xs font-mono">1,402</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Archive_Health</p>
                    <div className="flex items-center justify-end gap-2">
                        <Activity size={10} className="text-green-500"/>
                        <span className="text-xs font-mono">98%</span>
                    </div>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: THE STORY & PHILOSOPHY */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl crenzo-font md:text-8xl font-light tracking-tighter leading-none mb-8 uppercase">
                THE <br /> 
                <span className="milky-font italic text-white/30">ARCHIVE</span> <br />
                REDUX
              </h1>
              
              <div className="max-w-md border-l-2 border-white/10 pl-8 mt-12 space-y-6">
                <p className="text-sm text-white/50 leading-relaxed font-light italic">
                  "NEZIN is not a label; it is a digital dossier of physical forms. We merge the precision of the future with the texture of our heritage."
                </p>
                
                {/* 3. TERMINAL LOG (The "Boring-Free" Zone) */}
                <div className="bg-white/5 p-4 border border-white/5 font-mono text-[9px] text-white/40 leading-loose">
                    <div className="flex items-center gap-2 text-white/60 mb-2">
                        <Terminal size={12}/>
                        <span>SYSTEM_LOG_2026</span>
                    </div>
                    <p>{`> Initializing Winter_Collection... Done`}</p>
                    <p>{`> Syncing 8 New Assets to Render_Server... Done`}</p>
                    <p className="text-white/20 animate-pulse">{`> Awaiting New Transmission...`}</p>
                </div>

                <div className="mt-8 flex gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Globe size={12}/> Global_Sync</span>
                  <span className="flex items-center gap-2"><Shield size={12}/> Secure_Core</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: AESTHETIC VISUALS (FILMSTRIP) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://i.postimg.cc/qRTNVBQQ/1b876acd741e2c0078b9a64d1f716ac0.jpg",
                "https://i.postimg.cc/595wtTFT/8d50138212f45f480377274d8038f2a3.jpg",
                "https://i.postimg.cc/C5JB4yGQ/78495654f2cbbf933ec1e72755d440b6.jpg",
                "https://i.postimg.cc/7PXnVjYj/881abc2bb795cfa36561b58a0f30bec4.jpg"
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.8 }}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  className="relative aspect-[3/4] border border-white/10 bg-[#0a0a0a] overflow-hidden group"
                >
                  <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Showcase" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[7px] font-mono text-white/40 tracking-widest uppercase">Asset_Source: Pinterest</span>
                </motion.div>
              ))}
            </div>
            
            {/* ACTION CARD */}
            <motion.div 
              whileHover={{ x: 10, backgroundColor: "#fff", color: "#000" }}
              className="mt-12 border border-white text-white p-8 flex justify-between items-center cursor-pointer group transition-all"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1">New_Transmission</p>
                <h3 className="text-xl milky-font  font-black uppercase tracking-tighter italic">Upload to Archive</h3>
              </div>
              <Zap className="group-hover:rotate-12 transition-transform" />
            </motion.div>
          </div>

        </div>

        {/* BOTTOM DECORATION */}
        <footer className="mt-32 pt-8 border-t border-white/5 flex justify-between items-end">
          <div className="text-[8px] font-mono text-white/10 uppercase tracking-[0.8em]">
            NEZIN // OS_v.2.6.0
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-[1px] bg-white/10" />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminHome;