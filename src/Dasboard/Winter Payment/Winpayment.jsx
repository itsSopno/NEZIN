import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Hash, Calendar, MapPin, Package, CheckCircle2 } from "lucide-react";

const PaymentCollection = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://server-1-1-6g3a.onrender.com/CusData")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter out any invalid payment records
        const validPayments = Array.isArray(data) ? data.filter(pay => pay && pay._id) : [];
        setPayments(validPayments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Archive_Fetch_Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="text-white font-mono text-xs tracking-[0.5em] animate-pulse">
          INITIALIZING_DATA_STREAM...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <span className="text-red-500 font-mono text-xs tracking-[0.5em] mb-4 block">
            CONNECTION_ERROR
          </span>
          <p className="text-white/40 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-white/10 text-white text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 md:px-20">
      {/* HEADER */}
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-4">
          Acquisition <span className="italic font-serif text-white/30">Logs</span>
        </h1>
        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-widest">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span>DATABASE_LIVE // {payments.length} ENTRIES FOUND</span>
        </div>
      </div>

      {/* COLLECTION GRID */}
      {payments.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <span className="text-white/20 font-mono text-xs tracking-[0.5em] mb-4 block">
              NO_RECORDS_FOUND
            </span>
            <p className="text-white/40 text-sm">No payment data available</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {payments.map((pay) => (
            <motion.div
              key={pay._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border border-white/10 bg-[#0a0a0a] p-6 relative overflow-hidden group hover:border-white/30 transition-colors"
            >
            {/* BACKGROUND ID WATERMARK */}
            <span className="absolute -right-4 -bottom-4 text-[8vw] font-black text-white/[0.02] select-none pointer-events-none">
              {pay.productId ? pay.productId.split('-').pop() : 'N/A'}
            </span>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              {/* PRODUCT IMAGE */}
              <div className="w-full md:w-32 h-40 bg-[#111] border border-white/5 overflow-hidden">
                <img
                  src={pay.productImage || '/placeholder-image.jpg'}
                  alt={pay.productName || 'Product'}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTExIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDQ0IiBmb250LXNpemU9IjEyIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>

              {/* DATA CONTENT */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight uppercase leading-none">
                      {pay.productName || 'Unknown Product'}
                    </h3>
                    <p className="text-[9px] font-mono text-white/30 mt-1 uppercase tracking-widest">
                      PID: {pay.productId || 'N/A'} // {pay.productCategory || 'Unknown'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-light tracking-tighter">${pay.totalAmount || '0.00'}</span>
                    <div className="flex items-center justify-end gap-1 mt-1 text-green-500">
                      <CheckCircle2 size={10} />
                      <span className="text-[8px] font-mono uppercase tracking-widest">Captured</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-tighter">
                      <Hash size={12} /> TX_ID: {pay.transactionId ? pay.transactionId.slice(0, 15) + '...' : 'N/A'}
                    </p>
                    <p className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-tighter">
                      <Calendar size={12} /> {pay.purchaseDate ? new Date(pay.purchaseDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-tighter">
                      <CreditCard size={12} /> {pay.paymentMethod || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-tighter">
                      <Package size={12} /> Qty: {pay.quantity || 0}
                    </p>
                  </div>
                </div>

                {/* SHIPPING HUD */}
                <div className="bg-white/[0.03] p-3 border-l-2 border-white/10 mt-4">
                   <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-white/20 mt-1" />
                      <div>
                        <p className="text-[10px] font-bold text-white/80 uppercase">
                          {pay.shippingAddress?.fullName || 'N/A'}
                        </p>
                        <p className="text-[9px] text-white/40 leading-relaxed max-w-xs uppercase">
                          {pay.shippingAddress ? 
                            `${pay.shippingAddress.address || ''}, ${pay.shippingAddress.city || ''}, ${pay.shippingAddress.country || ''}` : 
                            'Address not available'
                          }
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* HOVER ACCENT */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
};

export default PaymentCollection;