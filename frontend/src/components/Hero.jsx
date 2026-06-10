import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { Link } from 'react-scroll';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = React.useState(() => {
    const data = random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 });
    // Ensure all values are finite to prevent NaN errors in THREE.js
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">
            Bhargav <span className="text-gradient">Modha</span>
          </h1>
          <h3 className="text-2xl md:text-4xl text-gray-400 font-semibold mb-8">
            MERN Stack Developer | Building Scalable Website
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
            “I build modern and responsive websites using the MERN stack and clean code.”
          </p>

          <div className="flex items-center justify-center">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-8 py-3 bg-primary rounded-full font-bold hover:bg-primary/80 transition-all transform hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center py-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
