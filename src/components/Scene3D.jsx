import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleSwarm() {
  const ref = useRef();
  
  // Create a much larger sphere for the space effect
  const sphere = useMemo(() => random.inSphere(new Float32Array(10000), { radius: 10 }), []);

  useFrame((state, delta) => {
    // Slow, majestic rotation
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 40;
    
    // Slight breathing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
            transparent 
            color="#00E5FF" 
            size={0.015} 
            sizeAttenuation={true} 
            depthWrite={false} 
            opacity={0.6}
            blending={2} // Additive blending for glow
        />
      </Points>
    </group>
  );
}

export const Scene3D = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#020202]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {/* Subtle ambient light */}
                <ambientLight intensity={0.5} />
                <ParticleSwarm />
            </Canvas>
            {/* Overlay gradient to blend it softly */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202] mix-blend-multiply" />
        </div>
    );
};
