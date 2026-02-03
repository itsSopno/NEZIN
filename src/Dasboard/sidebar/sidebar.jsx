import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
     CreditCard,
  Users, 
  ShoppingBag, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Zap
} from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
        name :"ADD WINTER COLLECTION" , path :"winter-entry",
    },
    {
name :"ADD WOMEN COLLECTION",path :"women-entry"
    },
    { name: "Total Payment", path: "winter-payment", icon: <CreditCard size={20} />, id: "01" },
    { name: "Muses", path: "/admin/customers", icon: <Users size={20} />, id: "03" },
    { name: "Acquisitions", path: "/admin/orders", icon: <ShoppingBag size={20} />, id: "04" },
    { name: "System_Config", path: "/admin/settings", icon: <Settings size={20} />, id: "05" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-4 justify-between">
      <div>
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
            <Zap size={18} className="text-black" />
          </div>
          {(isOpen || isMobileOpen) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-white font-black tracking-tighter text-xl">NEZIN</span>
              <span className="block text-[8px] text-white/40 tracking-[0.3em] -mt-1 uppercase font-mono">Control_Panel</span>
            </motion.div>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path} onClick={() => setIsMobileOpen(false)}>
                <motion.div
                  className={`flex items-center gap-4 px-3 py-3 rounded-sm transition-all relative group ${
                    isActive ? "text-white bg-white/5" : "text-white/40 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute left-0 w-[2px] h-3/5 bg-white" 
                    />
                  )}
                  <span className={isActive ? "text-white" : "group-hover:text-white"}>
                    {item.icon}
                  </span>
                  {(isOpen || isMobileOpen) && (
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                      {item.name}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER AREA */}
      <div className="space-y-4">
        <Link to="/." className="flex items-center gap-4 px-3 py-3 w-full text-white/40 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          {(isOpen || isMobileOpen) && (
            <span className="text-[10px] uppercase tracking-[0.2em]">Disconnect</span>
          )}
        </Link>
        {(isOpen || isMobileOpen) && (
          <div className="px-3">
            <div className="h-[1px] bg-white/5 w-full mb-4" />
            <p className="text-[7px] font-mono text-white/10 uppercase tracking-[0.4em]">
              Node_ID: 26-ARC-X
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER */}
      <div className="md:hidden fixed top-6 right-6 z-[200]">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-10 h-10 bg-white flex items-center justify-center text-black rounded-sm shadow-xl"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: isOpen ? 260 : 80 }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 z-[100] overflow-hidden"
      >
        {/* Toggle Collapse Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-8 right-2 p-1 text-white/20 hover:text-white transition-colors"
        >
          <Zap size={12} className={isOpen ? "" : "rotate-180"} />
        </button>
        <SidebarContent />
      </motion.aside>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[150] md:hidden w-4/5 border-r border-white/10"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE BLUR BACKDROP */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;