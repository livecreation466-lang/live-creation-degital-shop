import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import { CardsZone, SignsZone, MerchZone, PackagingZone } from './ShowroomZones';
import { ZONES, PRODUCTS } from '../data/printingProducts';

// ── ROOM ──────────────────────────────────────────────
function Room() {
  return (
    <group>
      {/* Floor — glossy studio floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#0a0a12"
          metalness={0.75}
          roughness={0.22}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Floor radial glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -2]}>
        <circleGeometry args={[11, 64]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.035} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -9]} receiveShadow>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#08080e" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-9, 3, -3]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#08080e" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Right wall */}
      <mesh position={[9, 3, -3]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#08080e" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Ceiling accent bar */}
      <mesh position={[0, 5.2, -4]}>
        <boxGeometry args={[14, 0.06, 0.4]} />
        <meshBasicMaterial color="#f5d98a" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[10, 0.05, 0.3]} />
        <meshBasicMaterial color="#8ea8ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// ── RESPONSIVE FOV ────────────────────────────────────
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.fov = aspect < 1 ? 62 : aspect < 1.4 ? 52 : 46;
    camera.updateProjectionMatrix();
  }, [size, camera]);
  return null;
}

// ── MAIN SCENE ────────────────────────────────────────
export default function Scene({ activeZone, selectedProduct, onSelectProduct }) {
  const zone = ZONES[activeZone] || ZONES.overview;

  const cameraPos = selectedProduct ? selectedProduct.inspectCam : zone.camera;
  const lookAt = selectedProduct ? selectedProduct.position : zone.lookAt;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: ZONES.overview.camera, fov: 46, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={['#07070c']} />
      <fog attach="fog" args={['#07070c', 14, 34]} />

      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-6, 6, -4]} intensity={0.55} color="#8ea8ff" />
      <pointLight position={[0, 4.5, 6]} intensity={25} color="#ffd9a0" distance={22} decay={2} />
      <pointLight position={[-4, 2.5, -3]} intensity={10} color="#d4af37" distance={12} decay={2} />
      <pointLight position={[4, 2.5, -3]} intensity={10} color="#ff8adc" distance={12} decay={2} />

      <Suspense fallback={null}>
        <Room />
        <CardsZone onSelect={onSelectProduct} selectedId={selectedProduct?.id} />
        <SignsZone onSelect={onSelectProduct} selectedId={selectedProduct?.id} />
        <MerchZone onSelect={onSelectProduct} selectedId={selectedProduct?.id} />
        <PackagingZone onSelect={onSelectProduct} selectedId={selectedProduct?.id} />

        {/* Procedural studio environment (no network HDR) */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 6, -6]} scale={[12, 12, 1]} color="#ffffff" />
          <Lightformer intensity={1.2} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} color="#d4af37" />
          <Lightformer intensity={1.2} position={[6, 2, 0]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} color="#8ea8ff" />
          <Lightformer intensity={3} position={[0, 4, 6]} scale={[10, 10, 1]} color="#ffffff" />
        </Environment>
      </Suspense>

      <ResponsiveCamera />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={1.2}
        maxDistance={22}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2 - 0.03}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
      />

      <CameraRig cameraPos={cameraPos} lookAt={lookAt} />
    </Canvas>
  );
}