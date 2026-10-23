import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Phone, Mail, MapPin, Send, Upload, Sparkles } from 'lucide-react';
import { BUSINESS } from '../data/printingProducts';

const SERVICES = [
  'Visiting Cards',
  'Signboards & Flex',
  'Custom Merch',
  'Packaging',
  'Other',
];

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', service: SERVICES[0], message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const text = `Hi Live Creation!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0A${form.message ? `Message: ${form.message}%0A` : ''}%0AI'd like a quote.`;
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-5 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-gold2" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gold2">
                      Quick Inquiry
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-white">{BUSINESS.name}</h2>
                  <p className="text-xs text-white/50 mt-1">{BUSINESS.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full btn-ghost flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Contact quick actions */}
            <div className="p-5 grid grid-cols-3 gap-2 border-b border-white/10">
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded-xl p-3 flex flex-col items-center gap-1.5"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span className="text-[10px] font-medium">WhatsApp</span>
              </a>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="btn-ghost rounded-xl p-3 flex flex-col items-center gap-1.5"
              >
                <Phone size={18} className="text-gold2" />
                <span className="text-[10px] font-medium">Call</span>
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="btn-ghost rounded-xl p-3 flex flex-col items-center gap-1.5"
              >
                <Mail size={18} className="text-sky-400" />
                <span className="text-[10px] font-medium">Email</span>
              </a>
            </div>

            {/* Details */}
            <div className="px-5 py-4 space-y-2.5 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-xs">
                <Phone size={13} className="text-gold2 shrink-0" />
                <span className="text-white/80">{BUSINESS.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Mail size={13} className="text-gold2 shrink-0" />
                <span className="text-white/80 break-all">{BUSINESS.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <MapPin size={13} className="text-gold2 shrink-0" />
                <span className="text-white/80">Digital Printing Studio · India</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold2/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold2/50"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                  Service Needed
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                        form.service === s
                          ? 'bg-gradient-to-r from-gold2 to-gold text-[#1a1400]'
                          : 'btn-ghost text-white/70'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold2/50 resize-none"
                  placeholder="Quantity, size, deadline..."
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-white/40 bg-white/5 border border-dashed border-white/10 rounded-lg px-3 py-2">
                <Upload size={12} />
                <span>Share your artwork / mockup via WhatsApp after submitting</span>
              </div>

              <button
                type="submit"
                className="w-full btn-gold flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm mt-1"
              >
                {sent ? (
                  <>
                    <Sparkles size={16} />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}