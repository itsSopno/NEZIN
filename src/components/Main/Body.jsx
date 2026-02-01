
// BETTER VERSION 

import React, { useEffect } from "react";
import App from "../../App";
import Story from "../Story/Story";
import Lenis from "@studio-freight/lenis";
const Bbody = () => {
 useEffect(() => {
  if (typeof window === 'undefined') return;

  const isMobile =
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 768;

  const lenis = new Lenis({
    duration: isMobile ? 0.9 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: true, // ENABLED for both
    mouseMultiplier: 1,
    touchMultiplier: isMobile ? 1.2 : 1,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);
return (
    <div className="bg-[#050505]"> 
      <section>
        <App />
      </section>
      
      <section className="relative z-20">
        <Story />
      </section>
    {/* <section>
        <Privacy></Privacy>
    </section> */}
    </div>
  );
};

export default Bbody;