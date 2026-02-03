import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import { saveOrUpdateUser } from '../../utility';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle } = UseAuth(); // Correct usage - call the hook and destructure
  const from = location.state?.from?.pathname || "/";
  
  // Logic for Google Login
  const handleGoogleLogin = async() => {
    try {
      const { user } = await signInWithGoogle();
      // TODO: Uncomment after implementing saveOrUpdateUser function
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col md:flex-row overflow-hidden selection:bg-white selection:text-black">
      
      {/* --- LEFT SIDE: THE VISUAL MOOD --- */}
      <div className="relative w-full md:w-[45%] h-[40vh] md:h-screen overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-10 z-10">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-2"
          >
            Nezin Protocol v.26
          </motion.p>
          <h2 className="text-4xl text-white font-light tracking-tighter leading-none">
            Enter the <br /> System of Style.
          </h2>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE AUTH TERMINAL --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="w-full max-w-sm relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-2xl font-light tracking-tight mb-2">Identify Yourself</h1>
            <p className="text-white/40 text-xs tracking-wide leading-relaxed mb-10">
              Access your personalized archives and secure your position within the Nezin ecosystem.
            </p>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              className="w-full group relative flex items-center justify-center gap-4 py-4 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Continue with Google</span>
            </button>

            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center text-[9px] text-white/20 tracking-[0.2em] uppercase">
                <span>Restricted Access</span>
                <Link to="/" className="hover:text-white transition-colors">Return to Home</Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Footer Label */}
        <div className="absolute bottom-10 flex gap-6 opacity-20 text-[8px] tracking-[0.4em] uppercase text-white font-mono">
          <span>Auth_ID: 992-01</span>
          <span>Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

export default Login;