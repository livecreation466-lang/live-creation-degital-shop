import { motion } from 'framer-motion';
import {
  Home,
  CreditCard,
  Lightbulb,
  Shirt,
  Package,
  Phone,
} from 'lucide-react';

const ITEMS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'cards', label: 'Visiting Cards', icon: CreditCard },
  { id: 'signs', label: 'Signboards', icon: Lightbulb },
  { id: 'merch', label: 'Custom Merch', icon: Shirt },
  { id: 'packaging', label: 'Packaging', icon: Package },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function BottomNav({ active, onChange, onContact }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-fit"
    >
      <div className="glass rounded-full p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            const isContact = item.id === 'contact';
            return (
              <button
                key={item.id}
                onClick={() => (isContact ? onContact() : onChange(item.id))}
                className="relative px-3 sm:px-4 py-2.5 rounded-full flex items-center gap-2 shrink-0 transition-colors"
              >
                {isActive && !isContact && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,217,138,0.9), rgba(212,175,55,0.85))',
                      boxShadow: '0 4px 20px -4px rgba(212,175,55,0.7)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={16}
                  className={`relative z-10 ${isActive && !isContact ? 'text-[#1a1400]' : 'text-white/70'}`}
                />
                <span
                  className={`relative z-10 text-[11px] sm:text-xs font-medium whitespace-nowrap ${
                    isActive && !isContact ? 'text-[#1a1400]' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}