import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, Phone, Check, Sparkles } from 'lucide-react';
import {
  buildWhatsAppLink,
  buildEmailLink,
  buildCallLink,
} from '../data/printingProducts';

export default function ProductDetailModal({ product, onClose }) {
  const [finish, setFinish] = useState(null);
  const [qty, setQty] = useState(null);

  useEffect(() => {
    if (product) {
      setFinish(product.finishes[0]);
      setQty(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop — subtle, don't block 3D view */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 pointer-events-none"
          />

          {/* Slide-over card */}
          <motion.aside
            initial={{ x: '110%' }}
            animate={{ x: 0 }}
            exit={{ x: '110%' }}
            transition={{ type: 'spring', stiffness: 240, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-40 w-full sm:w-[420px] md:w-[440px] flex flex-col"
          >
            <div className="glass h-full flex flex-col rounded-l-2xl border-r-0 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gold2">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gold/20 text-gold2 border border-gold/30">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg leading-tight text-white">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/50 mt-1.5">{product.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full btn-ghost flex items-center justify-center shrink-0"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Drag hint */}
                <div className="flex items-center gap-2 text-[11px] text-gold2/80 bg-gold/5 border border-gold/20 rounded-lg px-3 py-2">
                  <Sparkles size={12} />
                  <span>Drag in the 3D view to inspect 360°</span>
                </div>

                {/* Finish */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2.5">
                    Finish / Material
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFinish(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                          finish === f
                            ? 'bg-gradient-to-r from-gold2 to-gold text-[#1a1400] shadow-gold'
                            : 'btn-ghost text-white/70'
                        }`}
                      >
                        {finish === f && <Check size={12} />}
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size / Qty */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2.5">
                    Size / Quantity
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQty(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                          qty === s
                            ? 'bg-gradient-to-r from-gold2 to-gold text-[#1a1400] shadow-gold'
                            : 'btn-ghost text-white/70'
                        }`}
                      >
                        {qty === s && <Check size={12} />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="glass-gold rounded-xl p-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gold2/70 mb-0.5">
                      Instant Quote
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-bold text-2xl text-gold-gradient">
                        {product.price}
                      </span>
                      <span className="text-xs text-white/50">{product.priceNote}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-white/10 space-y-2.5">
                <a
                  href={buildWhatsAppLink(product, finish, qty)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-gold flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
                >
                  <MessageCircle size={16} />
                  Order via WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={buildEmailLink(product, finish, qty)}
                    className="btn-ghost flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium"
                  >
                    <Mail size={14} className="text-gold2" />
                    Email Quote
                  </a>
                  <a
                    href={buildCallLink()}
                    className="btn-ghost flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium"
                  >
                    <Phone size={14} className="text-emerald-400" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}