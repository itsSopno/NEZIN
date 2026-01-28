// import React, { useRef, useEffect, useState } from 'react'
// import MaskBox from './components/MaskBox'
// const App = () => {
//   const imageRef = useRef(null)
//   const [imageLoaded, setImageLoaded] = useState(false)

//   const maskConfigs = [
//     { width: '60vw', height: '35vw', top: '10vh', left: '10vw' },
//     { width: '17vw', height: '9vw', top: '5vh', left: '5vw' },
//     { width: '35vw', height: '19vw', top: '5vh', right: '5vw' },
//     { width: '38vw', height: '22vw', top: '50vh', left: '5vw' }
//   ]

//   useEffect(() => {
//     const image = imageRef.current
//     if (image) {
//       const handleLoad = () => {
//         setImageLoaded(true)
//       }
      
//       image.addEventListener('load', handleLoad)
      
//       return () => {
//         image.removeEventListener('load', handleLoad)
//       }
//     }
//   }, [])

//   return (
//     <div className="hero h-screen w-full bg-black">
//       <img 
//         ref={imageRef}
//         src="https://i.postimg.cc/MKjZDWrf/file-00000000fdc87206927f8b9b5ac66e3f.png"
//         alt="Background"
//         className="hidden"
//         crossOrigin="anonymous"
//       />

//       {imageLoaded && maskConfigs.map((config, index) => (
//         <MaskBox 
//           key={index}
//           image={imageRef.current}
//           initialStyle={config}
//         />
//       ))}
//     </div>
//   )
// }

// export default App

import React, { useRef, useEffect, useState } from 'react';
import MaskBox from './components/MaskBox';

const App = () => {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // High-end cinematic layout
const maskConfigs = [
  // 1. The Focal Point (Large Hero)
  { width: '40vw', height: '22vw', top: '15vh', left: '10vw', label: "SYSTEM_CORE_ALPHA" },

  // 2. Vertical Scanner (Tall & Slim)
  { width: '12vw', height: '30vw', top: '10vh', left: '55vw', label: "BIO_METRIC_SCAN" },

  // 3. Top Right Widget (Small Square)
  { width: '18vw', height: '10vw', top: '10vh', left: '72vw', label: "AUX_PWR_02" },

  // 4. Bottom Left Support (Wide)
  { width: '28vw', height: '16vw', top: '65vh', left: '5vw', label: "NAV_TELEMETRY" },

  // 5. Center-Right Secondary (Medium)
  { width: '22vw', height: '14vw', top: '45vh', left: '68vw', label: "DATA_ENCRYPT" },

  // 6. The "Hidden" Data Strip (Tiny/Long)
  { width: '35vw', height: '6vw', top: '55vh', left: '32vw', label: "LOG_STREAM_VIRTUAL" },

  // 7. Bottom Right Detail
  { width: '15vw', height: '15vw', top: '70vh', left: '75vw', label: "SATELLITE_LINK" }
];
  return (
    <div className="relative h-screen w-full bg-[#020617] overflow-hidden cursor-crosshair">
      {/* Hidden Source Image */}
      <img 
        ref={imageRef}
        src="https://i.postimg.cc/MKjZDWrf/file-00000000fdc87206927f8b9b5ac66e3f.png"
        alt="Source"
        className="hidden"
        onLoad={() => setImageLoaded(true)}
        crossOrigin="anonymous"
      />

      {/* Atmospheric Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {imageLoaded && maskConfigs.map((config, index) => (
        <MaskBox 
          key={index}
          image={imageRef.current}
          config={config}
        />
      ))}

      {/* Fixed UI Overlay */}
      <div className="absolute bottom-8 left-8 text-[#38bdf8] font-mono text-[10px] tracking-[4px] uppercase opacity-50">
        Status: Systems Nominal // Portals Active
      </div>
    </div>
  );
};

export default App;