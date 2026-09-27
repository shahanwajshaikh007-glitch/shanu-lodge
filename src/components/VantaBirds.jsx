import React, { useEffect, useRef } from 'react';

export default function VantaBirds() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initVanta = async () => {
      try {
        const THREE = await import('three');
        window.THREE = THREE;
        const vantaModule = await import('vanta/dist/vanta.birds.min');
        const BIRDS = vantaModule.default || vantaModule;

        if (isMounted && vantaRef.current && !vantaEffectRef.current) {
          vantaEffectRef.current = BIRDS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x050816,
            color1: 0x3b82f6,
            color2: 0x8b5cf6,
            birdSize: 1.2,
            wingSpan: 30.0,
            speedLimit: 5.0,
            separation: 30.0,
            alignment: 30.0,
            cohesion: 30.0,
            quantity: 4
          });
        }
      } catch (err) {
        console.error('Failed to initialize Vanta BIRDS effect:', err);
      }
    };

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffectRef.current) {
        if (typeof vantaEffectRef.current.destroy === 'function') {
          vantaEffectRef.current.destroy();
        }
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="vanta-birds"
      ref={vantaRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
