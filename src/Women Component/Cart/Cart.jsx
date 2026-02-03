import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, User, Mail, Tag, ArrowUpRight, Loader2, Sparkles } from "lucide-react";

const FemalePaymentLedger = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching cart data from API...');
    fetch("https://server-1-1-6g3a.onrender.com/female-payment")
      .then((res) => {
        console.log('API Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Cart data received:', data);
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Archive_Sync_Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-white animate-spin" size={24} strokeWidth={1} />
        <span className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase">Synchronizing_Female_Ledger</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
             <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">Database_Stream // Muse_Edition</span>
          </div>
          <h1 className="text-5xl milky-font md:text-8xl font-light tracking-tighter uppercase leading-none">
            ACQUISITION <br /> <span className="font-serif italic text-white/30 lowercase text-4xl md:text-7xl">female</span>
          </h1>
        </div>
        <div className="text-right border-l border-white/10 pl-8">
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Total_Volume</p>
          <p className="text-3xl font-light tracking-tighter">${payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {payments.map((payment, index) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-[#0a0a0a] border border-white/5 p-6 hover:border-white/20 transition-all duration-500"
          >
            {/* CARD TOP: STATUS & PRODUCT ID */}
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest">Transaction_ID</span>
                <span className="block text-[10px] font-mono text-white/60">{payment._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="bg-white/5 px-2 py-1 flex items-center gap-2 border border-white/5">
                <Sparkles size={10} className="text-white/40" />
                <span className="text-[8px] font-mono text-white/80 uppercase tracking-widest">{payment.gender}</span>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="mb-8">
              <h3 className="text-xl font-medium tracking-tight uppercase group-hover:text-pink-100 transition-colors">
                {payment.productName}
              </h3>
              <p className="text-[9px] font-mono text-white/20 mt-2 uppercase tracking-[0.2em]">
                REF: {payment.productId}
              </p>
            </div>

            {/* TRANSACTION DETAILS */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-white/20" />
                  <span className="text-[10px] text-white/60 font-mono truncate">{payment.userEmail.split('@')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={12} className="text-white/20" />
                  <span className="text-[10px] text-white/60 font-mono uppercase tracking-tighter">{payment.currency}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-mono text-white/20 uppercase">Total_Capture</p>
                <p className="text-2xl font-light tracking-tighter">${payment.amount}</p>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2">
                  <Mail size={12} strokeWidth={1} />
                  <span className="text-[9px] lowercase font-light italic">{payment.userEmail}</span>
               </div>
               <button className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all">
                  <ArrowUpRight size={14} />
               </button>
            </div>

            {/* DECORATIVE CORNER BIT */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 right-0 w-[1px] h-4 bg-white/20" />
                <div className="absolute top-0 right-0 h-[1px] w-4 bg-white/20" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FemalePaymentLedger;