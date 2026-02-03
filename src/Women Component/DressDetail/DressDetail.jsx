import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import BuyWomen from "../Payment for women/BuyWomen";

const DressDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Tomar production URL check koro, local thakle localhost:5000
        const res = await axios.get("https://server-1-1-6g3a.onrender.com/women");
        
        let foundProduct = null;

        // Backend theke jodi Array ashe (Multiple collections)
        if (Array.isArray(res.data)) {
          res.data.forEach((collection) => {
            const item = collection.products.find((p) => p.id === id);
            if (item) foundProduct = item;
          });
        } 
        // Backend theke jodi Single Object ashe (Jeta tumi dile)
        else if (res.data && res.data.products) {
          foundProduct = res.data.products.find((p) => p.id === id);
        }

        setProduct(foundProduct);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Prepare product data for payment
  const getPaymentProductData = () => {
    if (!product) return null;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      category: 'women', // Fixed: This is in WOMEN Component
      image: product.image_ref,
      tags: product.tags,
      status: product.status,
    };
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono text-white tracking-[0.5em] animate-pulse">
      SYNCING_SYSTEM_DATA...
    </div>
  );

  if (!product) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-light mb-4 text-white/40 tracking-tighter uppercase">Resource_Not_Found // 404</h2>
      <button onClick={() => navigate(-1)} className="text-[10px] border border-white/20 px-8 py-3 uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
        Return_to_Safe_Zone
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 md:px-20 overflow-hidden">
      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate(-1)}
        className="mb-10 text-[10px] tracking-[0.4em] text-white/30 hover:text-white transition-colors uppercase flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back_to_Archives
      </motion.button>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT: Image Section with Parallax Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[55%] relative group cursor-crosshair"
        >
          <div className="aspect-[4/5] overflow-hidden bg-[#111] border border-white/5">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={product.image_ref} 
              alt={product.name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          {/* Metadata Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            <span className="bg-white text-black text-[9px] font-black px-4 py-1.5 uppercase tracking-widest">
              {product.status.replace('_', ' ')}
            </span>
            {product.stock <= 3 && (
              <span className="bg-red-600 text-white text-[9px] font-black px-4 py-1.5 uppercase tracking-widest animate-pulse">
                SCARCITY_DETECTION: {product.stock} Left
              </span>
            )}
          </div>
        </motion.div>

        {/* RIGHT: Content Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[45%] flex flex-col justify-center"
        >
          <header className="mb-10 border-b border-white/10 pb-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="h-[1px] w-8 bg-white/20"></span>
               <span className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase">
                Series_{product.id.split('-')[1]} // {product.category}
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-[0.85] uppercase">
              {product.name}
            </h1>
            
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg font-light italic">
              {product.description}
            </p>
          </header>

          {/* Pricing & Customization */}
          <div className="mb-12">
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-mono tracking-tighter text-white">${product.price}</span>
              <span className="text-white/10 font-mono text-sm tracking-widest uppercase">VAT_Incl.</span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white/60 text-xs uppercase tracking-wider">Stock Status:</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  product.stock > 10 
                    ? 'bg-green-500/20 text-green-400' 
                    : product.stock > 0 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} Left` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Tags Display */}
            <div className="flex flex-wrap gap-2 mb-10">
              {product.tags?.map((tag) => (
                <span key={tag} className="text-[8px] text-white/50 border border-white/10 px-4 py-2 uppercase tracking-[0.2em] bg-white/[0.02] hover:bg-white/10 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            {product.stock > 0 ? (
              <BuyWomen
                product={getPaymentProductData()}
                className="w-full bg-white text-black py-6 text-[12px] font-black uppercase tracking-[0.5em] hover:bg-transparent hover:text-white border border-white transition-all duration-500 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Initialize_Acquisition
              </BuyWomen>
            ) : (
              <motion.button 
                disabled
                className="w-full bg-white/10 text-white/40 py-6 text-[12px] font-black uppercase tracking-[0.5em] border border-white/10 cursor-not-allowed"
              >
                Resource_Depleted // Out_of_Stock
              </motion.button>
            )}
            
            <div className="flex justify-between items-center text-[8px] text-white/20 tracking-[0.3em] uppercase px-2 font-mono">
              <span>Secure_Payment: Stripe_V3</span>
              <span>Global_Deployment_Ready</span>
            </div>
          </div>

          {/* Technical Specs Accordion */}
          <div className="mt-20 grid grid-cols-2 gap-10 text-[9px] tracking-[0.3em] uppercase text-white/20 font-mono">
              <div className="space-y-3">
                <p className="text-white/60 border-b border-white/10 pb-2">Material_Origin</p>
                <p className="text-white/40 italic">Industrial Grade / {product.category === 'Outerwear' ? 'Weather-Proof' : 'High-Density Knit'}</p>
              </div>
              <div className="space-y-3">
                <p className="text-white/60 border-b border-white/10 pb-2">Silhouette_Spec</p>
                <p className="text-white/40 italic">Engineered_Oversized / V26</p>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DressDetail;