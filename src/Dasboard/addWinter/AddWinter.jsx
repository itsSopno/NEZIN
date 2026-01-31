import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, Loader2, Plus, X } from 'lucide-react';

const IMGBB_KEY = "d64f020a27541273ea71aaa79e3728db";

const ProductUploadForm = ({ collectionId }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    id: "NZ-W26-",
    name: "",
    category: "Outerwear",
    price: "",
    stock: "",
    status: "AVAILABLE",
    description: "",
    tags: "",
    image_ref: ""
  });

  // 1. Handle Image Upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setFormData({ ...formData, image_ref: result.data.url });
      setIsUploading(false);
    } catch (err) {
      console.error("Upload_Failed:", err);
      setIsUploading(false);
    }
  };

  // 2. Submit Final Data to Your Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_ref) return alert("Please upload an image first.");

    const finalPayload = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()),
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    try {
      const response = await fetch(`https://server-1-1-6g3a.onrender.com/men/697bfc3dc55c5d73850f2bb4/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (response.ok) {
        alert("TRANSMISSION_SUCCESS: Archive Updated.");
        setFormData({ id: "NZ-W26-", name: "", category: "Outerwear", price: "", stock: "", status: "AVAILABLE", description: "", tags: "", image_ref: "" });
        setPreview(null);
      }
    } catch (err) {
      console.error("System_Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-12 text-white font-sans">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Image Upload Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[3/4] bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center overflow-hidden group">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-white mb-2" size={32} />
                    <span className="text-[10px] font-mono tracking-[0.3em]">UPLOADING_TO_IMGBB</span>
                  </div>
                )}
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center group">
                <UploadCloud size={48} strokeWidth={1} className="text-white/20 group-hover:text-white transition-colors" />
                <span className="mt-4 text-[10px] font-mono tracking-[0.4em] text-white/40">ATTACH_VISUAL_ASSET</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            )}
          </div>
          <div className="p-4 border border-white/5 bg-[#0a0a0a]">
             <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Asset_Status</p>
             <p className={`text-[10px] font-mono mt-1 ${formData.image_ref ? 'text-green-500' : 'text-red-500'}`}>
               {formData.image_ref ? `LINKED: ${formData.image_ref.slice(0, 30)}...` : 'WAITING_FOR_DATA_INPUT'}
             </p>
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-xl md:text-4xl crenzo-font font-light tracking-tighter uppercase">Entry_Terminal</h2>
            <p className="text-[10px] font-mono text-white/30 tracking-[0.5em] mt-2">COLLECTION_ID: {collectionId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Reference_ID</label>
              <input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none focus:border-white transition-all font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Product_Name</label>
              <input placeholder="Ex: Tactical Sherpa" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none focus:border-white transition-all uppercase" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Category</label>
              <select onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none cursor-pointer uppercase">
                <option value="Outerwear">Outerwear</option>
                <option value="Trousers">Trousers</option>
                <option value="Aesthetic">Aesthetic</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Price ($)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Stock</label>
              <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none font-mono" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Technical_Description</label>
            <textarea rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-xs outline-none focus:border-white transition-all leading-relaxed" />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Search_Tags (Comma Separated)</label>
            <input placeholder="Minimal, Streetwear, Limited" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none font-mono" />
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            disabled={isUploading}
            className="w-full py-5 border border-white text-[10px] font-bold uppercase tracking-[1em] transition-all disabled:opacity-50"
          >
            {isUploading ? "PROCESS_BUSY..." : "SYNCHRONIZE_ARCHIVE"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProductUploadForm;