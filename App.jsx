import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene from './components/Scene';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProductDetailModal from './components/ProductDetailModal';
import ContactModal from './components/ContactModal';
import Loader from './components/Loader';

export default function App() {
  const [activeZone, setActiveZone] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  const handleZoneChange = (zoneId) => {
    setSelectedProduct(null);
    setActiveZone(zoneId);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ink text-white font-body">
      <Loader />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene
          activeZone={activeZone}
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
        />
      </div>

      {/* UI Layer */}
      <Header onContact={() => setContactOpen(true)} />

      <AnimatePresence>
        {!selectedProduct && (
          <BottomNav
            key="bottomnav"
            active={activeZone}
            onChange={handleZoneChange}
            onContact={() => setContactOpen(true)}
          />
        )}
      </AnimatePresence>

      <ProductDetailModal product={selectedProduct} onClose={handleCloseProduct} />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Bottom hint */}
      {!selectedProduct && activeZone === 'overview' && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="glass rounded-full px-4 py-1.5 text-[11px] text-white/60 whitespace-nowrap">
            ✨ Drag to look around · Click any product to inspect 360°
          </div>
        </div>
      )}
    </div>
  );
}