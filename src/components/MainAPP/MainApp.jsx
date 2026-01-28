import Bbody from "../Main/Body";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../Loader/Loading";
const MainApp = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <Bbody />
        </motion.div>
      )}
    </>
  );
};
export default MainApp;