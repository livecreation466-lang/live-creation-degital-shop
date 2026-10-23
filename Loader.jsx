import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const elapsed = (performance.now() - start) / 2200;
      const p = Math.min(100, elapsed * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setHidden(true), 500);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center flex-col gap-8 px-6"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold2 to-gold flex items-center justify-center shadow-gold"
            >
              <Sparkles size={28} className="text-[#1a1400]" />
            </motion.div>
            <div className="text-center">
              <h2 className="font-display font-bold text-xl tracking-tight text-gold-gradient">
                Live Creation
              </h2>
              <p className="text-white/50 text-xs mt-1">
                Premium Digital Printing & Branding
              </p>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between text-[11px] text-white/60 mb-2">
              <span>Loading Live Creation 3D Studio...</span>
              <span className="font-mono text-gold2">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold2 via-gold to-[#b8860b] shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}