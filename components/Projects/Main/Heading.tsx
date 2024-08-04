"use client";
import { motion } from "framer-motion";

const AnimatedHeading = () => (
  <div className="flex justify-center">
    <motion.h1
      initial={{ x: "-200px", opacity: 0 }}
      whileInView={{ x: "0", opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 500,
      }}
      className="text-3xl text-white md:text-4xl py-6 px-12 w-fit mb-6 font-semibold tracking-wide bg-gray-900 rounded-full "
    >
      <span className="border-orange-500 border-b-4">MY</span> PR
      <motion.span
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="bg-cyan-600 rounded-full cursor-pointer inline-block"
      >
        O
      </motion.span>
      JECTS
    </motion.h1>
  </div>
);

export default AnimatedHeading;
