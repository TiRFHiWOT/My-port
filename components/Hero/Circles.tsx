import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const generateRandomPosition = (maxWidth, maxHeight, size) => {
  return {
    top: Math.random() * (maxHeight - size),
    left: Math.random() * (maxWidth - size),
  };
};

const checkOverlap = (newPos, positions, size) => {
  return positions.some((pos) => {
    const distance = Math.sqrt(
      Math.pow(newPos.top - pos.top, 2) + Math.pow(newPos.left - pos.left, 2)
    );
    return distance < size; // Adjust size to control overlap threshold
  });
};

const generateUniquePositions = (numCircles, width, height) => {
  const positions = [];
  const maxAttempts = 1000; // To avoid infinite loops
  let attempts = 0;

  while (positions.length < numCircles && attempts < maxAttempts) {
    const size = 20 + Math.random() * 40;
    const newPos = generateRandomPosition(width, height, size);

    if (!checkOverlap(newPos, positions, size)) {
      positions.push({ ...newPos, size });
    }

    attempts++;
  }

  return positions;
};

const Circles = ({ inView }) => {
  const [positions, setPositions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      setPositions(generateUniquePositions(20, width, height));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex justify-center items-center text-gray-900"
      ref={containerRef}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={inView ? { x: ["-10px, 0, 10px"] } : {}}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="relative w-full h-full flex justify-center items-center "
      >
        {positions.map((position, index) => {
          const { size, top, left } = position;
          const borderWidth = 1 + Math.random() * 4;
          const opacity = 0.2 + Math.random() * 0.5;
          const shadowSize = 5 + Math.random() * 8;
          const shadowLeng = 10 + Math.random() * 70;

          return (
            <motion.div
              key={`maze-circle-${index}`}
              className="absolute rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: `${borderWidth}px`,
                borderColor: `#eab308;, ${opacity})`,
                borderStyle: "solid",
                opacity: opacity,
                borderRadius: "50%",
                boxSizing: "border-box",
                top: `${top}px`,
                left: `${left}px`,
                transform: `translate(-50%, -50%)`,
                background: `radial-gradient(circle, #111827 0%, #2563eb 30%, #111827 60%, #06b6d4 90%)`,
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Circles;
