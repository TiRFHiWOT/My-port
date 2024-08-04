import React from "react";
import { motion } from "framer-motion";

const WaveMotion = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-gradient-to-r from-blue-600 to-blue-900 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 15, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.2,
          }}
          className="w-6 h-6 bg-white rounded-full mx-2 shadow-lg"
        />
      ))}
    </div>
  );
};

export default WaveMotion;
