import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, Sparkles } from 'lucide-react';
import { BUSINESS } from '../data/printingProducts';

export default function Header({ onContact }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
      className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-5 pt-3"
    >
      <div className="glass rounded-2xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold2 to-gold flex items-center justify-center shrink-0 shadow-gold">
            <Sparkles size={18} className="text-[#1a1400]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-sm sm:text-base tracking-tight text-white leading-none">
                Live Creation
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full glass-gold text-gold2 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-gold2 animate-pulse" />
                Virtual 3D Studio
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-white/50 truncate mt-0.5">
              {BUSINESS.tagline}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Live Creation, I want to know more about your printing services.')}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex btn-ghost items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
          >
            <MessageCircle size={14} className="text-emerald-400" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="btn-ghost flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
          >
            <Phone size={14} className="text-gold2" />
            <span className="hidden md:inline">{BUSINESS.phoneDisplay}</span>
          </a>
          <button
            onClick={onContact}
            className="btn-gold flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <Mail size={14} />
            <span className="hidden sm:inline">Contact Us</span>
            <span className="sm:hidden">Contact</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}