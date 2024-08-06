import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MazeAnimation = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Define the path to simulate a maze-like motion
  const path = [
    { x: 0, y: 0 }, // Start
    { x: 50, y: 0 }, // Move right
    { x: 50, y: -50 }, // Move up
    { x: 100, y: -50 }, // Move right
    { x: 100, y: 0 }, // Move down
    { x: 150, y: 0 }, // Move right
    { x: 150, y: 50 }, // Move down
    { x: 200, y: 50 }, // Move right
  ];

  return (
    <ul
      ref={ref}
      className="flex flex-wrap w-[300px] h-[300px] border-2 border-gray-300 p-4"
    >
      {[...Array(8)].map((_, index) => (
        <motion.li
          key={index}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: 0,
            x: 0,
            y: 0,
            borderColor: "#334155",
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          }}
          animate={
            inView
              ? {
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1],
                  rotate: [0, 0, 0], // Keep rotation static for a maze-like motion
                  x: path.map((step) => step.x),
                  y: path.map((step) => step.y),
                  borderColor: [
                    "#334155",
                    "#3B82F6",
                    "#10B981",
                    "#EF4444",
                    "#FBBF24",
                    "#8B5CF6",
                    "#EC4899",
                    "#6B7280",
                  ],
                  boxShadow: [
                    "0px 0px 0px rgba(0, 0, 0, 0)",
                    "0px 0px 10px rgba(59, 130, 246, 0.5)",
                    "0px 0px 15px rgba(16, 185, 129, 0.5)",
                    "0px 0px 20px rgba(239, 68, 68, 0.5)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 6,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="w-8 h-8 rounded-full border-4 flex justify-center items-center"
        >
          {/* Optional content inside each circle */}
        </motion.li>
      ))}
    </ul>
  );
};

export default MazeAnimation;
