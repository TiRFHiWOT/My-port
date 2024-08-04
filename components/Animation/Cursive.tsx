import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CursiveAnimation = () => {
  const { ref, inView } = useInView();

  const letterPaths = {
    C: {
      x: [0, -20, -40, -20, 0],
      y: [0, 30, 0, -30, 0],
    },
    O: {
      x: [0, 20, 40, 20, 0, -20],
      y: [0, 30, 0, -30, 0, 30],
    },
    D: {
      x: [0, 20, 40, 30, 10, 0],
      y: [0, 10, 20, 30, 40, 30],
    },
    E: {
      x: [0, 20, 40, 30, 10, 0],
      y: [0, 0, 0, 20, 40, 20],
    },
  };

  const renderLetterAnimation = (letter, index) => (
    <motion.div
      key={letter}
      initial={{ x: 0, y: 0, scale: 0.8, rotate: 0, opacity: 0 }}
      animate={
        inView
          ? {
              x: letterPaths[letter].x,
              y: letterPaths[letter].y,
              scale: [0.8, 1.2, 1],
              rotate: [0, 15, -15, 0],
              opacity: 1,
              filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
              boxShadow: [
                "0 0 0px rgba(0, 0, 0, 0)",
                "0 0 10px rgba(0, 0, 255, 0.5)",
                "0 0 20px rgba(255, 0, 255, 0.5)",
                "0 0 10px rgba(0, 0, 255, 0.5)",
                "0 0 0px rgba(0, 0, 0, 0)",
              ],
              backgroundColor: [
                "#ff0000",
                "#ff7700",
                "#ffff00",
                "#00ff00",
                "#00ffff",
                "#0000ff",
                "#ff00ff",
              ],
            }
          : {}
      }
      transition={{
        duration: 4,
        delay: index * 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        backgroundColor: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
        },
      }}
      whileHover={{
        scale: 1.3,
        rotate: 360,
        transition: { duration: 0.6 },
      }}
      className="w-10 h-10 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-transform duration-300 ease-in-out"
    ></motion.div>
  );

  return (
    <div
      ref={ref}
      className="flex space-x-12 items-center justify-center h-64 border border-[#334155] rounded-3xl p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black"
    >
      {["C", "O", "D", "E"].map((letter, index) =>
        renderLetterAnimation(letter, index)
      )}
    </div>
  );
};

export default CursiveAnimation;
