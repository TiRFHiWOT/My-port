"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Circles from "./Circles";
import Lines from "./Lines";

const HomeArt = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative flex justify-center items-center h-[80vh] lg:h-[100vh] ${
        isMobile ? "flex-col opacity-100" : "hidden lg:flex opacity-90"
      } transition-opacity duration-700`}
    >
      {/* Background Elements */}
      <Lines />

      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 z-10">
        {[...Array(9)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1,
              delay: index * 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-600 rounded-lg shadow-md opacity-5"
          >
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </motion.div>
        ))}
      </div>

      {/* Main Animated Element */}
      <motion.div
        initial={{ y: "50%", opacity: 0, scale: 0.85 }}
        animate={inView ? { y: "0%", opacity: 1, scale: 1 } : {}}
        whileHover={{
          scale: 1.1,
          rotateY: "-10deg",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full z-10 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shadow-2xl"
        style={{ boxShadow: "10px 10px 25px rgba(0, 0, 0, 0.3)" }}
      >
        {/* Portfolio Image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            perspective: "1000px",
          }}
          whileHover={{
            scale: 1.1,
            rotateY: 10,
            rotateX: 5,
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Cool Border Wrapper */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full animate-spin-slow"
            initial={{ borderWidth: "0px" }}
            animate={{ borderWidth: "0px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Inner Image Container */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 2 }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                src="/tselot.jpeg"
                alt="Portfolio Hero"
                layout="fill"
                objectFit="cover"
                className="rounded-full opacity-95 shadow-2xl rotate-12"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeArt;
