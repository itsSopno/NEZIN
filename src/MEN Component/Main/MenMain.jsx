// import CollectionNav from "../Navbar/MenNav";
// import { Outlet } from "react-router-dom";
// const MenMain = () => {
//     return (
//         <>
//      <div className=" min-h-screen pt-40">
//         <img src="https://i.postimg.cc/VkNxk6qG/assassin-s-creed-assassin-s-creed-odyssey-statue-marble-wallpaper-preview.jpg" alt="Men's Banner" className="w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000 absolute top-0 left-0 z-0"/>
//       <header className="px-10 mb-20 text-center">
//         <h1 className="text-white text-7xl font-light tracking-tighter">MEN_FALL_26</h1>
//       </header> 
    
//       <CollectionNav />
//       <Outlet></Outlet>
     
//     </div> 
//         </>
//     )
// }
// export default MenMain;

import CollectionNav from "../Navbar/MenNav";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const MenMain = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Banner Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img 
          src="https://i.postimg.cc/TY8Wwrjy/b2fe53df6568b5c28fcb60f18ba5cae0.jpg" 
          alt="Men's Banner" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] ease-out"
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Header Text */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 text-center"
        >
          <h1 className="text-white text-5xl md:text-8xl font-light tracking-[0.2em] md:tracking-tighter uppercase">
            Men <span className="font-serif italic text-4xl md:text-7xl">Fall_26</span>
          </h1>
          <p className="text-white/60 text-[10px] tracking-[0.5em] mt-4 uppercase">Archive Collection</p>
        </motion.header>
      </div> 

      {/* Navigation & Content Area */}
      <div className="relative z-20 -mt-10">
        <CollectionNav />
        
        {/* <main className="max-w-[1440px] mx-auto px-4 md:px-10 py-20"> */}
          <Outlet />
        {/* </main> */}
      </div>
    </div>
  );
}

export default MenMain;