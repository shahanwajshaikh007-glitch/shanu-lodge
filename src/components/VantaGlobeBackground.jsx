import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

export default function VantaGlobeBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = null;
    if (vantaRef.current) {
      try {
        effect = GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6,
          color2: 0x8b5cf6,
          backgroundColor: 0x050816,
          size: 1.2
        });
      } catch (error) {
        console.error('Error initializing Vanta Globe:', error);
      }
    }

    return () => {
      if (effect && typeof effect.destroy === 'function') {
        effect.destroy();
      }
    };
  }, []);

  return (
    <div
      id="vanta-globe"
      ref={vantaRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      style={{ backgroundColor: '#050816' }}
    />
  );
}
