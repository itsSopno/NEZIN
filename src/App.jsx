

// import React, { useRef, useState, useEffect } from 'react';
// import MaskBox from './components/MaskBox';
// import { useMotionValue, useSpring } from 'framer-motion';

// const App = () => {
//   const imageRef = useRef(null);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // 1. Motion Values for smooth parallax
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springConfig = { stiffness: 100, damping: 30 };
//   const smoothX = useSpring(mouseX, springConfig);
//   const smoothY = useSpring(mouseY, springConfig);

//   // 2. The event handler MUST be on the main container
//   const handleMouseMove = (e) => {
//     mouseX.set(e.clientX / window.innerWidth - 0.5);
//     mouseY.set(e.clientY / window.innerHeight - 0.5);
//   };

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const maskConfigs = isMobile ? [
//     { width: '85vw', height: '30vh', top: '12vh', left: '7.5vw', label: "01 / PRIMARY", depth: 10 },
//     { width: '40vw', height: '20vh', top: '45vh', left: '7.5vw', label: "02 / AUX_A", depth: 20 },
//     { width: '40vw', height: '20vh', top: '45vh', left: '52.5vw', label: "03 / AUX_B", depth: 25 },
//     { width: '85vw', height: '20vh', top: '68vh', left: '7.5vw', label: "04 / LOGS", depth: 15 }
//   ] : [
//     { width: '32vw', height: '48vh', top: '15vh', left: '8vw', label: "01 / CORE_VIEW", depth: 20 },
//     { width: '18vw', height: '22vh', top: '15vh', left: '42vw', label: "02 / ANALYTICS", depth: 40 },
//     { width: '18vw', height: '22vh', top: '41vh', left: '42vw', label: "03 / SPECTRAL", depth: 30 },
//     { width: '30vw', height: '12vh', top: '67vh', left: '42vw', label: "04 / TELEMETRY", depth: 50 },
//     { width: '12vw', height: '64vh', top: '15vh', left: '75vw', label: "05 / NEURAL", depth: 60 },
//     { width: '20vw', height: '6vh', top: '82vh', left: '8vw', label: "06 / STATUS", depth: 10 }
//   ];

// return (
//   <>
//  <main className="w-full bg-[#050505]">
//   {/* HERO SECTION */}
//   <div 
//     onMouseMove={handleMouseMove} 
//     className="relative h-screen w-full flex flex-col items-center justify-center cursor-none"
//     /* Note: Removed overflow-hidden here to allow natural scroll flow */
//   >
 
//   <img 
//         ref={imageRef}
//         src="https://i.postimg.cc/MKjZDWrf/file-00000000fdc87206927f8b9b5ac66e3f.png"
//         className="hidden"
//         onLoad={() => setImageLoaded(true)}
//         crossOrigin="anonymous"
//       />

    
//       {!isMobile && (
//         <div className="absolute inset-0 flex justify-between px-[8vw] pointer-events-none opacity-5">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="w-[1px] h-full bg-white" />
//           ))}
//         </div>
//       )}
//     <div className="relative w-full h-full z-10">
//       {imageLoaded && maskConfigs.map((config, index) => (
//         <MaskBox 
//           key={index} 
//           image={imageRef.current} 
//           config={config} 
//           mouseX={smoothX} 
//           mouseY={smoothY} 
//         />
//       ))}
//     </div>

//     {/* Footer - Keep it Absolute */}
//     <div className="absolute bottom-6 w-full px-10 flex justify-between items-end pointer-events-none z-[70]">
//        {/* ... Footer Content ... */}
//     </div>
//   </div>

//   {/* WHITE SECTION */}
//   <section className="relative w-full h-screen bg-white z-[100] flex items-center justify-center">
//     <h1 className="text-black text-5xl font-light tracking-tighter">PREMIUM CONTENT</h1>
//   </section>
// </main>

//     </>
//   );
// }

// export default App;


 import React, { useRef, useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import MaskBox from './components/MaskBox';

const App = () => {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Smooth Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    // Normalizing coordinates (-0.5 to 0.5)
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Premium Mask Layouts
  const maskConfigs = isMobile ? [
    { width: '85vw', height: '30vh', top: '12vh', left: '7.5vw', label: "01 / PRIMARY", depth: 10 },
    { width: '40vw', height: '20vh', top: '45vh', left: '7.5vw', label: "02 / AUX_A", depth: 20 },
    { width: '40vw', height: '20vh', top: '45vh', left: '52.5vw', label: "03 / AUX_B", depth: 25 }
  ] : [
    { width: '32vw', height: '48vh', top: '15vh', left: '8vw', label: "01 / CORE", depth: 15 },
    { width: '18vw', height: '22vh', top: '15vh', left: '42vw', label: "02 / DATA", depth: 35 },
    { width: '18vw', height: '22vh', top: '41vh', left: '42vw', label: "03 / SPECT", depth: 25 },
    { width: '30vw', height: '12vh', top: '67vh', left: '42vw', label: "04 / TELEM", depth: 45 },
    { width: '12vw', height: '64vh', top: '15vh', left: '75vw', label: "05 / NEUR", depth: 55 }
  ];

  return (
    <main className="w-full bg-[#050505]">
      {/* --- HERO SECTION --- */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full flex flex-col items-center justify-center cursor-none z-10 overflow-hidden"
      >
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hidden Source Image */}
        <img 
          ref={imageRef}
          src="https://i.postimg.cc/MKjZDWrf/file-00000000fdc87206927f8b9b5ac66e3f.png"
     
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          crossOrigin="anonymous"
        />

        {/* Grid Guides */}
        {!isMobile && (
          <div className="absolute inset-0 flex justify-between px-[8vw] pointer-events-none opacity-5 z-0">
            {[...Array(6)].map((_, i) => <div key={i} className="w-[1px] h-full bg-white" />)}
          </div>
        )}

        {/* Portals Container */}
        <div className="relative w-full h-full z-10">
          {imageLoaded && maskConfigs.map((config, index) => (
            <MaskBox 
              key={`${isMobile}-${index}`} 
              image={imageRef.current} 
              config={config} 
              mouseX={smoothX} 
              mouseY={smoothY} 
            />
          ))}
        </div>

        {/* Hero Footer */}
        <div className="absolute bottom-6 w-full px-10 flex justify-between items-end pointer-events-none z-[60]">
          <div className="text-[9px] text-white/20 tracking-[0.5em] uppercase font-mono">
            Nexus Protocol <br /> <span className="text-white/40">2026_EST</span>
          </div>
          <div className="text-[9px] text-white/20 tracking-[0.5em] uppercase font-mono">
            Secure Entry Only
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
    
    </main>
  );
};

export default App;