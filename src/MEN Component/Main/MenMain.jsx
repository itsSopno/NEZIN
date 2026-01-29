import CollectionNav from "../Navbar/MenNav";
import { Outlet } from "react-router-dom";
const MenMain = () => {
    return (
        <>
     <div className=" min-h-screen pt-40">
        <img src="https://i.postimg.cc/VkNxk6qG/assassin-s-creed-assassin-s-creed-odyssey-statue-marble-wallpaper-preview.jpg" alt="Men's Banner" className="w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000 absolute top-0 left-0 z-0"/>
      <header className="px-10 mb-20 text-center">
        <h1 className="text-white text-7xl font-light tracking-tighter">MEN_FALL_26</h1>
      </header> 
    
      <CollectionNav />
      <Outlet></Outlet>
     
    </div> 
        </>
    )
}
export default MenMain;