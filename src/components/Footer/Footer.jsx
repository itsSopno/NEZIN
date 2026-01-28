import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Navigation", links: ["Index", "Work", "Archive", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
    { title: "Social", links: ["Instagram", "Twitter", "LinkedIn"] }
  ];

  return (
    <footer className="relative w-full bg-[#050505] text-white pt-20 pb-10 px-6 md:px-10 overflow-hidden">
      {/* 1. Large Background Watermark */}
      <div className="absolute bottom-[-10%] left-[-5%] text-[25vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        NEZIN
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* 2. Top Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-6 max-w-sm">
              Defining the interface of modern apparel.
            </h2>
            <Link to="/contact" className="group flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
              Start a Conversation 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <span className="text-[10px] text-white/20 tracking-[0.4em] uppercase mb-2">
                {column.title}
              </span>
              {column.links.map((link) => (
                <Link 
                  key={link} 
                  to="#" 
                  className="text-sm font-light text-white/60 hover:text-white hover:italic transition-all w-fit"
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* 3. Bottom Strip */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex gap-8 text-[9px] text-white/30 tracking-[0.3em] uppercase">
            <span>Local Time: 22:15 GMT+6</span>
            <span>Status: Operational</span>
          </div>

          <div className="text-[9px] text-white/30 tracking-[0.3em] uppercase">
            © {currentYear} NEZIN PROTOCOL. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
            <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase">Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;