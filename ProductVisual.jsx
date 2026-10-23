import { useMemo } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// ── T-SHIRT EXTRUDED SHAPE ────────────────────────────
const tshirtGeo = (() => {
  const s = new THREE.Shape();
  s.moveTo(-0.17, 0.3);
  s.lineTo(-0.43, 0.22);
  s.lineTo(-0.5, 0.0);
  s.lineTo(-0.3, -0.05);
  s.lineTo(-0.26, -0.36);
  s.lineTo(0.26, -0.36);
  s.lineTo(0.3, -0.05);
  s.lineTo(0.5, 0.0);
  s.lineTo(0.43, 0.22);
  s.lineTo(0.17, 0.3);
  s.quadraticCurveTo(0, 0.22, -0.17, 0.3);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.06,
    bevelEnabled: true,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    bevelSegments: 2,
    curveSegments: 14,
  });
  g.center();
  return g;
})();

// ── CARDS ─────────────────────────────────────────────
function CardVisual({ baseColor = '#101018', accent = '#d4af37' }) {
  return (
    <group>
      <RoundedBox args={[0.56, 0.35, 0.022]} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.35} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, -0.09, 0.012]}>
        <planeGeometry args={[0.4, 0.018]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[-0.18, 0.09, 0.012]}>
        <circleGeometry args={[0.032, 24]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.18} />
      </mesh>
      <mesh position={[0.06, 0.09, 0.012]}>
        <planeGeometry args={[0.14, 0.012]} />
        <meshStandardMaterial color={accent} metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── ENVELOPE ─────────────────────────────────────────
function EnvelopeVisual({ baseColor = '#f2efe6', accent = '#c9a227' }) {
  return (
    <group>
      <RoundedBox args={[0.62, 0.44, 0.03]} radius={0.006} smoothness={3} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.75} />
      </RoundedBox>
      <mesh position={[0, 0.17, 0.018]}>
        <planeGeometry args={[0.6, 0.1]} />
        <meshStandardMaterial color={baseColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.16, 0.021]}>
        <circleGeometry args={[0.035, 24]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ── ACRYLIC SIGN ─────────────────────────────────────
function AcrylicSign() {
  return (
    <group>
      <RoundedBox args={[1.7, 0.78, 0.08]} radius={0.02} smoothness={4} castShadow>
        <meshPhysicalMaterial color="#0b0b14" roughness={0.12} metalness={0.35} clearcoat={1} />
      </RoundedBox>
      <Text position={[0, 0, 0.046]} fontSize={0.155} letterSpacing={0.05}>
        LIVE CREATION
        <meshStandardMaterial color="#f5d98a" emissive="#f5d98a" emissiveIntensity={2.6} toneMapped={false} />
      </Text>
      <mesh position={[0, 0, -0.055]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

// ── NEON SIGN ────────────────────────────────────────
function NeonSign() {
  return (
    <group>
      <RoundedBox args={[1.15, 0.58, 0.06]} radius={0.02} smoothness={4}>
        <meshPhysicalMaterial color="#0a0a12" roughness={0.18} metalness={0.2} clearcoat={1} />
      </RoundedBox>
      <Text position={[0, 0, 0.04]} fontSize={0.22} letterSpacing={0.05}>
        OPEN
        <meshStandardMaterial color="#ff7ad9" emissive="#ff4fc4" emissiveIntensity={3.2} toneMapped={false} />
      </Text>
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[1.4, 0.75]} />
        <meshBasicMaterial color="#ff4fc4" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

// ── STANDEE ──────────────────────────────────────────
function StandeeVisual({ accent = '#d4af37' }) {
  return (
    <group>
      <RoundedBox args={[0.8, 1.5, 0.03]} radius={0.008} smoothness={3} castShadow>
        <meshStandardMaterial color="#101018" roughness={0.55} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0.28, 0.018]}>
        <planeGeometry args={[0.66, 0.72]} />
        <meshStandardMaterial color="#1c2340" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.36, 0.018]}>
        <planeGeometry args={[0.66, 0.16]} />
        <meshStandardMaterial color={accent} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.78, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 24]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ── TSHIRT ───────────────────────────────────────────
function TshirtVisual({ baseColor = '#111827', accent = '#d4af37' }) {
  return (
    <group>
      <mesh geometry={tshirtGeo} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.9} metalness={0} />
      </mesh>
      <Text position={[0, 0.04, 0.04]} fontSize={0.1}>
        LC
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={0.6} roughness={0.35} />
      </Text>
    </group>
  );
}

// ── HOODIE ───────────────────────────────────────────
function HoodieVisual({ baseColor = '#1f2937', accent = '#e7c86a' }) {
  return (
    <group>
      <mesh geometry={tshirtGeo} scale={[1.03, 1.08, 1.2]} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.31, -0.07]} rotation={[0.25, 0, 0]}>
        <sphereGeometry args={[0.17, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial color={baseColor} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.16, 0.045]}>
        <planeGeometry args={[0.24, 0.14]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>
      <mesh position={[-0.06, 0.12, 0.05]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 6]} />
        <meshStandardMaterial color={accent} roughness={0.6} />
      </mesh>
      <mesh position={[0.06, 0.12, 0.05]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 6]} />
        <meshStandardMaterial color={accent} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── MUG ──────────────────────────────────────────────
function MugVisual({ accent = '#d4af37' }) {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.13, 0.24, 32, 1, true]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.35} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <circleGeometry args={[0.13, 32]} />
        <meshStandardMaterial color="#e5e5e7" roughness={0.5} />
      </mesh>
      <mesh position={[0.155, 0, 0]}>
        <torusGeometry args={[0.075, 0.018, 12, 32]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.015, 0.132]}>
        <planeGeometry args={[0.15, 0.09]} />
        <meshStandardMaterial color={accent} metalness={0.65} roughness={0.32} />
      </mesh>
    </group>
  );
}

// ── GIFT BOX ─────────────────────────────────────────
function GiftBoxVisual({ baseColor = '#111118', accent = '#d4af37' }) {
  return (
    <group>
      <RoundedBox args={[0.5, 0.36, 0.5]} radius={0.018} smoothness={4} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.32} metalness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.54, 0.09, 0.54]} radius={0.014} smoothness={4} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#15151d" roughness={0.28} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.255, 0]}>
        <boxGeometry args={[0.09, 0.018, 0.56]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.255, 0]}>
        <boxGeometry args={[0.56, 0.018, 0.09]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.016, 10, 24]} />
        <meshStandardMaterial color="#e8c766" metalness={1} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.04, 0.252]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshStandardMaterial color={accent} metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── PAPER BAG ────────────────────────────────────────
function PaperBagVisual({ baseColor = '#1a1a24', accent = '#c9a227' }) {
  return (
    <group>
      <RoundedBox args={[0.42, 0.52, 0.24]} radius={0.008} smoothness={3} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.85} />
      </RoundedBox>
      <mesh position={[0, 0.06, 0.122]}>
        <planeGeometry args={[0.26, 0.18]} />
        <meshStandardMaterial color={accent} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[-0.1, 0.28, 0]}>
        <torusGeometry args={[0.055, 0.007, 8, 20, Math.PI]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 0.28, 0]}>
        <torusGeometry args={[0.055, 0.007, 8, 20, Math.PI]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ── LABEL ────────────────────────────────────────────
function LabelVisual({ accent = '#d4af37' }) {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.42, 32]} />
        <meshStandardMaterial color="#e8e8ea" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.175, 0.175, 0.2, 32, 1, true]} />
        <meshStandardMaterial color={accent} metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.06, 24]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── DISPATCHER ───────────────────────────────────────
export default function ProductVisual({ product }) {
  const props = { baseColor: product.baseColor, accent: product.accent };
  const map = useMemo(
    () => ({
      card: <CardVisual {...props} />,
      envelope: <EnvelopeVisual {...props} />,
      'acrylic-sign': <AcrylicSign />,
      'neon-sign': <NeonSign />,
      standee: <StandeeVisual {...props} />,
      tshirt: <TshirtVisual {...props} />,
      hoodie: <HoodieVisual {...props} />,
      mug: <MugVisual {...props} />,
      giftbox: <GiftBoxVisual {...props} />,
      paperbag: <PaperBagVisual {...props} />,
      label: <LabelVisual {...props} />,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.model]
  );
  return map[product.model] || null;
}