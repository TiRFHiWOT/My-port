import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Bottom = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 770);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <>
      <motion.div
        initial={{ y: "-100px" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`absolute inset-0 bg-gray-900 -z-20  ${
          isLargeScreen ? "clip-path-two" : "bg-opacity-95"
        }`}
      >
        <div className="absolute -top-2 -left-7 shining-circle -z-10 opacity-50 hidden"></div>
      </motion.div>
      <motion.div
        initial={{ y: "200px" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`absolute inset-0 bg-opacity-90 bg-sky-900 -z-30 clip-path-one ${
          !isLargeScreen ? "hidden" : "flex"
        }`}
      ></motion.div>
      <motion.div
        initial={{ y: "100px" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`absolute inset-0 bg-opacity-90 bg-pink-900 clip-path-three ${
          !isLargeScreen ? "hidden" : "flex"
        }`}
      ></motion.div>
    </>
  );
};

export default Bottom;
