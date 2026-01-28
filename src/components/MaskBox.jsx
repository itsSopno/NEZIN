

// import React, { useRef, useEffect, useCallback } from 'react';
// import { motion, useTransform, useMotionValue } from 'framer-motion';

// const MaskBox = ({ image, config, mouseX, mouseY }) => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   // 1. Safety Fallback: Prevents "TypeError: can't access property get"
//   // If the parent hasn't passed the MotionValue yet, we use a internal temporary one.
//   const fallbackValue = useMotionValue(0);
//   const mX = mouseX || fallbackValue;
//   const mY = mouseY || fallbackValue;

//   // 2. Custom Depth: We use the index or a random factor to make masks 
//   // move at different speeds. This creates the "Parallax Layering" effect.
//   const depth = config.depth || 40; 
//   const parallaxX = useTransform(mX, [-0.5, 0.5], [-depth, depth]);
//   const parallaxY = useTransform(mY, [-0.5, 0.5], [-depth, depth]);

//   const draw = useCallback(() => {
//     if (!canvasRef.current || !containerRef.current || !image) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const rect = containerRef.current.getBoundingClientRect();

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;
//     ctx.scale(dpr, dpr);

//     const imageAspect = image.naturalWidth / image.naturalHeight;
//     const windowAspect = window.innerWidth / window.innerHeight;
    
//     let dW, dH, dX, dY;
//     if (imageAspect > windowAspect) {
//       dH = window.innerHeight; dW = dH * imageAspect;
//       dX = (window.innerWidth - dW) / 2; dY = 0;
//     } else {
//       dW = window.innerWidth; dH = dW / imageAspect;
//       dX = 0; dY = (window.innerHeight - dH) / 2;
//     }
    
//     const sX = (rect.left - dX) * (image.naturalWidth / dW);
//     const sY = (rect.top - dY) * (image.naturalHeight / dH);
//     const sW = rect.width * (image.naturalWidth / dW);
//     const sH = rect.height * (image.naturalHeight / dH);
    
//     ctx.drawImage(image, sX, sY, sW, sH, 0, 0, rect.width, rect.height);
//   }, [image]);

//   useEffect(() => {
//     let frameId;
//     const animate = () => { draw(); frameId = requestAnimationFrame(animate); };
//     animate();
//     return () => cancelAnimationFrame(frameId);
//   }, [draw]);

//   return (
//     <motion.div
//       ref={containerRef}
//       initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
//       animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
//       transition={{ 
//         duration: 2, 
//         ease: [0.16, 1, 0.3, 1], // Custom Awwwards-style cubic-bezier
//         delay: Math.random() * 0.5 // Staggered entrance for a more organic feel
//       }}
//       className="fixed overflow-hidden bg-[#0a0a0a] group"
//       style={{
//         width: config.width, 
//         height: config.height,
//         top: config.top, 
//         left: config.left,
//         x: parallaxX, 
//         y: parallaxY,
//         border: '1px solid rgba(255, 255, 255, 0.05)',
//         zIndex: Math.floor(depth), // Physically place it higher in stack
//       }}
//     >
//       <canvas 
//         ref={canvasRef} 
//         className="w-full h-full opacity-40 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0" 
//       />
      
//       {/* Precision UI Label */}
//       <div className="absolute bottom-3 left-3 overflow-hidden">
//         <motion.span 
//           initial={{ y: "100%" }}
//           animate={{ y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="text-[8px] text-white/20 tracking-[0.5em] uppercase font-light block"
//         >
//           {config.label}
//         </motion.span>
//       </div>
//     </motion.div>
//   );
// };

// export default MaskBox;

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

const MaskBox = ({ image, config, mouseX, mouseY }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Safety for useTransform (prevents crash if props are undefined)
  const safeX = mouseX || useMotionValue(0);
  const safeY = mouseY || useMotionValue(0);

  // Depth control for parallax
  const d = config.depth || 30;
  const parallaxX = useTransform(safeX, [-0.5, 0.5], [-d, d]);
  const parallaxY = useTransform(safeY, [-0.5, 0.5], [-d, d]);

  const draw = useCallback(() => {
    if (!canvasRef.current || !containerRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = containerRef.current.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const imageAspect = image.naturalWidth / image.naturalHeight;
    const windowAspect = window.innerWidth / window.innerHeight;
    
    let dW, dH, dX, dY;
    if (imageAspect > windowAspect) {
      dH = window.innerHeight; dW = dH * imageAspect;
      dX = (window.innerWidth - dW) / 2; dY = 0;
    } else {
      dW = window.innerWidth; dH = dW / imageAspect;
      dX = 0; dY = (window.innerHeight - dH) / 2;
    }
    
    const sX = (rect.left - dX) * (image.naturalWidth / dW);
    const sY = (rect.top - dY) * (image.naturalHeight / dH);
    const sW = rect.width * (image.naturalWidth / dW);
    const sH = rect.height * (image.naturalHeight / dH);
    
    ctx.drawImage(image, sX, sY, sW, sH, 0, 0, rect.width, rect.height);
  }, [image]);

  useEffect(() => {
    let frameId;
    const loop = () => { draw(); frameId = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, [draw]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute overflow-hidden bg-[#080808] group" // ABSOLUTE IS KEY HERE
      style={{
        width: config.width,
        height: config.height,
        top: config.top,
        left: config.left,
        x: parallaxX,
        y: parallaxY,
        border: '0.5px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10 + (config.depth || 0)
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-1000" 
      />
      
      <div className="absolute top-3 left-3">
        <span className="text-[7px] text-white/20 tracking-[0.5em] uppercase font-light">
          {config.label}
        </span>
      </div>
    </motion.div>
  );
};

export default MaskBox;