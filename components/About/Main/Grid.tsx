"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Grid = () => {
  const colorHexArrays = [
    [
      "#63b3ed",
      "#4299e1",
      "#3182ce",
      "#2b6cb0",
      "#2c5282",
      "#2a4365",
      "#1e3a8a",
      "#1c1c7e",
    ],
    [
      "#68d391",
      "#48bb78",
      "#38a169",
      "#2f855a",
      "#276749",
      "#22543d",
      "#1d4f1f",
      "#184e15",
    ],
    [
      "#fc8181",
      "#f56565",
      "#e53e3e",
      "#c53030",
      "#9b2c2c",
      "#742a2a",
      "#63171b",
      "#5c1015",
    ],
    [
      "#f6e05e",
      "#ecc94b",
      "#d69e2e",
      "#b7791f",
      "#975a16",
      "#744210",
      "#553c0a",
      "#3f2d06",
    ],
    [
      "#fbb6ce",
      "#f687b3",
      "#ed64a6",
      "#d53f8c",
      "#b83280",
      "#97266d",
      "#702459",
      "#552047",
    ],
    [
      "#9f7aea",
      "#805ad5",
      "#6b46c1",
      "#553c9a",
      "#44337a",
      "#322659",
      "#2d224a",
      "#1e1b36",
    ],
    [
      "#fbd38d",
      "#f6ad55",
      "#ed8936",
      "#dd6b20",
      "#c05621",
      "#9c4221",
      "#7b341e",
      "#652b19",
    ],
  ];

  const numCols = 8;
  const numRows = 8;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 -rotate-45 grid grid-cols-8 grid-rows-8 -z-10 opacity-60">
        {Array.from({ length: numCols * numRows }).map((_, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;

          const rowColors = colorHexArrays[row % colorHexArrays.length];

          const gradient = `linear-gradient(120deg, ${rowColors.join(
            ", "
          )}, #ffffff)`;

          const delay = row * 0.15 + col * 0.08;

          return (
            <motion.div
              ref={ref}
              key={`grid-cell-${index}`}
              style={{ backgroundImage: gradient }}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: delay,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
