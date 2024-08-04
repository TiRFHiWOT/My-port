import React from "react";
import { motion } from "framer-motion";

const ParticleEffect = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className=" absolute">
      <div className="flex justify-center items-center w-64 h-64 relative overflow-hidden">
        {particles.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, Math.random() * 200 - 100, Math.random() * 400 - 200],
              y: [0, Math.random() * 200 - 100, Math.random() * 400 - 200],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 absolute"
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleEffect;
