import React, { useState } from "react";
import { motion } from "framer-motion";

const RotatingCube = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const colors = [
    "bg-gradient-to-r from-red-400 to-yellow-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-blue-400 to-teal-500",
    "bg-gradient-to-r from-indigo-400 to-purple-500",
  ];

  const handleMouseMove = (event) => {
    setMouseX((event.clientX / window.innerWidth) * 2 - 1);
    setMouseY((event.clientY / window.innerHeight) * 2 - 1);
  };

  const renderCubes = () =>
    colors.map((color, index) => (
      <motion.div
        key={index}
        className={`w-16 h-16 ${color} rounded-lg shadow-xl`}
        initial={{ rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 0 }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 360],
          opacity: 1,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.5,
        }}
        whileHover={{
          scale: 1.3,
          boxShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
        }}
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
          transform: `rotateY(${mouseX * 15}deg) rotateX(${mouseY * 15}deg)`,
        }}
      />
    ));

  return (
    <div
      className="flex justify-center items-center h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="flex space-x-8">{renderCubes()}</div>
    </div>
  );
};

export default RotatingCube;
