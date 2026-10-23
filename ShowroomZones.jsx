import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import ProductVisual from './ProductVisual';
import { PRODUCTS } from '../data/printingProducts';

// ── PRODUCT SPOT (Clickable wrapper) ─────────────────
function ProductSpot({ product, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    const target = hovered || selected ? 1.1 : 1;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
  });

  return (
    <group position={product.position}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product);
        }}
      >
        <ProductVisual product={product} />
      </group>

      {/* Glow halo base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <ringGeometry args={[0.28, 0.34, 48]} />
        <meshBasicMaterial
          color={product.accent || '#d4af37'}
          transparent
          opacity={hovered || selected ? 0.85 : 0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating name label on hover */}
      {(hovered || selected) && (
        <Text
          position={[0, 0.62, 0]}
          fontSize={0.075}
          color="#f5d98a"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#07070c"
        >
          {product.name.length > 26 ? product.name.slice(0, 24) + '…' : product.name}
        </Text>
      )}
    </group>
  );
}

// ── CARDS ZONE ───────────────────────────────────────
export function CardsZone({ onSelect, selectedId }) {
  const cards = PRODUCTS.filter((p) => p.zone === 'cards');
  return (
    <group>
      {/* Table top */}
      <RoundedBox args={[3.2, 0.08, 1.6]} radius={0.03} position={[-4, 0.95, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#141420" metalness={0.7} roughness={0.18} />
      </RoundedBox>
      {/* Table legs */}
      {[[-5.3, 0.45, -0.6], [-2.7, 0.45, -0.6], [-5.3, 0.45, 0.6], [-2.7, 0.45, 0.6]].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 12]} />
          <meshStandardMaterial color="#1f1f2e" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Under-glow */}
      <mesh position={[-4, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.0, 1.4]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.1} />
      </mesh>

      {/* Floating products */}
      {cards.map((p) => (
        <Float key={p.id} speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
          <ProductSpot product={p} selected={selectedId === p.id} onSelect={onSelect} />
        </Float>
      ))}
    </group>
  );
}

// ── SIGNS ZONE ───────────────────────────────────────
export function SignsZone({ onSelect, selectedId }) {
  const signs = PRODUCTS.filter((p) => p.zone === 'signs');
  return (
    <group>
      {/* Back panel */}
      <RoundedBox args={[4.4, 3.6, 0.12]} radius={0.04} position={[4, 2.0, -1.15]} castShadow>
        <meshStandardMaterial color="#0e0e17" roughness={0.85} metalness={0.15} />
      </RoundedBox>
      {/* Panel edge glow */}
      <mesh position={[4, 2.0, -1.08]}>
        <planeGeometry args={[4.2, 3.4]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.06} />
      </mesh>
      {/* Spot light cones */}
      <mesh position={[3.2, 2.7, -0.98]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshBasicMaterial color="#f5d98a" transparent opacity={0.6} />
      </mesh>
      <mesh position={[4.9, 2.55, -0.98]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshBasicMaterial color="#ff4fc4" transparent opacity={0.6} />
      </mesh>

      {signs.map((p) => (
        <ProductSpot key={p.id} product={p} selected={selectedId === p.id} onSelect={onSelect} />
      ))}
    </group>
  );
}

// ── MERCH ZONE ───────────────────────────────────────
export function MerchZone({ onSelect, selectedId }) {
  const merch = PRODUCTS.filter((p) => p.zone === 'merch');
  return (
    <group>
      {/* Rack posts */}
      {[-5.3, -2.7].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -6]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 3.0, 12]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      {/* Rack bar */}
      <mesh position={[-4, 2.9, -6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 2.7, 12]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Mug shelf */}
      <RoundedBox args={[2.4, 0.07, 0.7]} radius={0.02} position={[-4, 0.95, -6]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a24" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      <mesh position={[-4, 0.92, -6]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 0.6]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.1} />
      </mesh>

      {merch.map((p) => (
        <ProductSpot key={p.id} product={p} selected={selectedId === p.id} onSelect={onSelect} />
      ))}
    </group>
  );
}

// ── PACKAGING ZONE ───────────────────────────────────
export function PackagingZone({ onSelect, selectedId }) {
  const packs = PRODUCTS.filter((p) => p.zone === 'packaging');
  return (
    <group>
      {/* Wooden shelf unit */}
      <RoundedBox args={[2.6, 0.08, 0.85]} radius={0.02} position={[4, 0.95, -6]} castShadow receiveShadow>
        <meshStandardMaterial color="#3b2b20" roughness={0.7} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[2.6, 3.2, 0.08]} radius={0.02} position={[4, 1.6, -6.5]} castShadow>
        <meshStandardMaterial color="#2a1f18" roughness={0.85} metalness={0.05} />
      </RoundedBox>
      {/* Vertical dividers */}
      {[2.9, 5.1].map((x, i) => (
        <RoundedBox key={i} args={[0.06, 1.4, 0.8]} radius={0.01} position={[x, 1.75, -6]} castShadow>
          <meshStandardMaterial color="#3b2b20" roughness={0.7} />
        </RoundedBox>
      ))}
      {/* Shelf glow */}
      <mesh position={[4, 0.99, -6]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 0.7]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.14} />
      </mesh>

      {packs.map((p) => (
        <ProductSpot key={p.id} product={p} selected={selectedId === p.id} onSelect={onSelect} />
      ))}
    </group>
  );
}