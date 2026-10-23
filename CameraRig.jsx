import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({ cameraPos, lookAt }) {
  const { camera, controls } = useThree();
  const arrived = useRef(true);
  const targetPos = useRef(new THREE.Vector3(...cameraPos));
  const targetLook = useRef(new THREE.Vector3(...lookAt));

  useEffect(() => {
    targetPos.current.set(...cameraPos);
    targetLook.current.set(...lookAt);
    arrived.current = false;
    if (controls) controls.enabled = false;
  }, [cameraPos, lookAt, controls]);

  useFrame((_, delta) => {
    if (arrived.current) return;
    const k = 1 - Math.exp(-5 * delta);
    camera.position.lerp(targetPos.current, k);

    if (controls) {
      controls.target.lerp(targetLook.current, k);
      camera.lookAt(controls.target);
    } else {
      camera.lookAt(targetLook.current);
    }

    const dist = camera.position.distanceTo(targetPos.current);
    const tDist = controls ? controls.target.distanceTo(targetLook.current) : 0;

    if (dist < 0.03 && tDist < 0.03) {
      camera.position.copy(targetPos.current);
      if (controls) {
        controls.target.copy(targetLook.current);
        controls.enabled = true;
        controls.update();
      } else {
        camera.lookAt(targetLook.current);
      }
      arrived.current = true;
    }
  });

  return null;
}