import React from "react";
import { motion } from "framer-motion";

const TextAnimation = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-black">
      <motion.h1
        className="text-4xl font-bold text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
          color: ["#FF0000", "#00FF00", "#0000FF"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Animate Me
      </motion.h1>
    </div>
  );
};

export default TextAnimation;
