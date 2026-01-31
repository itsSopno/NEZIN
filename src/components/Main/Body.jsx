// import React from "react";
// import App from "../../App";
// import Story from "../Story/Story";
// const Bbody = () => {
//     return (
// <>
// <section>
// <App></App>
// </section>
// <section>
//     <Story></Story>
// </section>
 
//     </>
//     )
// }
// export default Bbody;

// BETTER VERSION 

import React, { useEffect } from "react";
import App from "../../App";
import Story from "../Story/Story";
import Lenis from "@studio-freight/lenis";
import StoryMain from "../Main story/StoryMian";
import Privacy from "../Privacy/privacy";

const Bbody = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium "OutQuart" easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Usually disabled for better native mobile feel
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with RequestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
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