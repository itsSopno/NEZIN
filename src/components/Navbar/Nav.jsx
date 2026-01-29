// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router';
// import { path } from 'motion/react-client';
// const Navbar = () => {
 

//   const iteams = [
//     { name: 'Index', path: '#' },
//     { name: 'Work', path: '#' },
//     { name: 'Contact', path: '#' },
//     { name: 'Dashboard', path: '#' },
//     { name: 'Neural Link', path: '#' },
//     { name: 'Archives', path: '#' },
//     { name: 'System Logs', path: '#' },
//   ];

//   return (
  
//   <>
//  <nav className="fixed top-0 w-full p-6 md:p-10 flex flex-row justify-between items-start z-[100] mix-blend-difference">
//     {/* Logo: Text size scales on mobile */}
//     <div className="text-white text-base md:text-lg tracking-tighter font-medium">
//       NEZIN.
//     </div>

//     {/* Links: 
//         1. flex-wrap allows links to drop to a second line on very small screens.
//         2. gap-6 on mobile, gap-12 on desktop.
//         3. text-right keeps everything aligned against the edge.
//     */}
//     <div className="flex flex-wrap justify-end gap-x-6 gap-y-2 md:gap-12 text-[8px] md:text-[10px] text-white/50 tracking-[0.3em] uppercase max-w-[60%] md:max-w-none">
//       {iteams.map(item => (
//         <Link 
//           key={item} 
//           to={`/${item.toLowerCase()}`} 
//           className="hover:text-white transition-colors cursor-pointer"
//         >
//           {item}
//         </Link>
//       ))}
//       <Link to="/" className="hover:text-white transition-colors cursor-pointer">
//         Dashboard
//       </Link>
//     </div>
// </nav>
//       </>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {name : "Story", path :"/story"},
    { name: 'Login', path: '/login' },
    { name: 'Contact', path: '/Contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-[120] mix-blend-difference">
        {/* Logo */}
        <Link to="/" className="text-white text-xl md:text-2xl tracking-tighter font-medium">
          NEZIN.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-[10px] text-white/50 tracking-[0.3em] uppercase">
          {menuItems.slice(0, 4).map((item) => (
            <Link key={item.name} to={item.path} className="hover:text-white transition-colors cursor-pointer">
              {item.name}
            </Link>
          ))}
           <li>
          <a>Collection</a>
          <ul className="p-2">
            <li><Link to="/men">FOR MEN</Link></li>
            <li><Link to="/women">FOR WOMEN</Link></li>
          </ul>
        </li>
        </div>

        {/* Mobile Toggle Button - Forced to stay on top */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-[10px] tracking-[0.4em] uppercase z-[130] p-2 pr-0 outline-none"
        >
          {isOpen ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Close —
            </motion.span>
          ) : (
            <span>Menu +</span>
          )}
        </button>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }} // Premium slide-in from right
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Background Texture for the Menu */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
              >
                <Link 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-4xl font-light tracking-tighter hover:italic transition-all block"
                >
                  {item.name}
                </Link>
           
              </motion.div>
            ))}
           
                 <li>
        <details>
          <summary className='text-white'>Collection</summary>
          <ul className="p-2 bg-base-100 w-40 z-1">
            <Link className='text-white' to="/men"><a>FOR MEN</a></Link>
            <Link className='text-white' to="/women"><a>FOR WOMEN</a></Link>
          </ul>
        </details>
      </li>
            {/* Branding in Menu */}
            <div className="absolute bottom-10 text-[8px] text-white/20 tracking-[0.5em] uppercase">
              <h1>Nezin Protocol © 2026</h1>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;