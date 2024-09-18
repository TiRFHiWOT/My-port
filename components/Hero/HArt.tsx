"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Lines from "./Lines";
import Circles from "./Circles";

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
    <motion.div
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0 }}
      className={`relative flex justify-center items-center h-[70vh] lg:h-[100vh] ${
        isMobile ? "rotate-0" : "rotate-0"
      } opacity-80 ${isMobile ? "flex-col" : "hidden lg:flex"}`}
    >
      <Lines />
      <div className="hidden">
        <Circles inView={inView} />
      </div>
      <motion.ul
        initial={{ rotate: 0 }}
        animate={
          inView
            ? {
                rotate: [0, 360],
              }
            : {}
        }
        transition={{
          duration: 56,
          repeat: Infinity,
          delay: 1,
          ease: "linear",
        }}
        className=" relative mr-8 w-96 h-96 grid gap-y-0.5 border-2 border-orange-600 rounded-full z-10 bg-gray-900 justify-center overflow-hidden"
        style={{ boxShadow: "0 0 5px 5px #0f1318" }}
      >
        <motion.li
          initial={{ x: 0 }}
          animate={inView ? { x: [20, -20, 20] } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className=" absolute h-24 w-full overflow-hidden rounded-full border border-[#334155] "
        >
          <ul className="relative flex justify-between h-full">
            {[...Array(14)].map((_, index) => (
              <motion.li
                key={index}
                initial={{ y: 0 }}
                animate={
                  inView
                    ? {
                        y: [100, -100, 100],
                        backgroundColor: [
                          "#334155",
                          "#3B82F6",
                          "#10B981",
                          "#EF4444",
                          "#FBBF24",
                          "#8B5CF6",
                          "#EC4899",
                          "#6B7280",
                          "#4F46E5",
                          "#6D28D9",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 7,
                  delay: index * 0.7,
                  repeat: Infinity,
                }}
                className="w-2 h-20 rounded-full shadow-md"
              ></motion.li>
            ))}
          </ul>
        </motion.li>
        <li className=" absolute top-[50%] -translate-y-[50%] h-44 w-full flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center h-full border border-[#334155] w-80 rounded-3xl p-2">
            <ul className="relative flex justify-center items-center h-full">
              {[...Array(8)].map((_, index) => (
                <motion.li
                  key={index}
                  initial={{ width: 0, height: 0 }}
                  animate={
                    inView
                      ? {
                          width: [-120, 120, -120],
                          height: [120, -120, 120],
                          borderColor: [
                            "#334155",
                            "#3B82F6",
                            "#10B981",
                            "#EF4444",
                            "#FBBF24",
                            "#8B5CF6",
                            "#EC4899",
                            "#6B7280",
                            "#4F46E5",
                            "#6D28D9",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 7,
                    delay: index * 1,
                    repeat: Infinity,
                  }}
                  className="w-10 h-10 rounded-full shadow-lg border-8 flex justify-center items-center"
                ></motion.li>
              ))}
            </ul>
          </div>
        </li>

        <motion.li
          initial={{ x: 0 }}
          animate={inView ? { x: [20, -20, 20] } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className=" absolute bottom-0 h-24 w-full overflow-hidden rounded-full border border-[#334155]"
        >
          <ul className="relative flex justify-between h-full items-end">
            {[...Array(14)].map((_, index) => (
              <motion.li
                key={index}
                initial={{ y: 0 }}
                animate={
                  inView
                    ? {
                        y: [-100, 100, -100],
                        backgroundColor: [
                          "#334155",
                          "#3B82F6",
                          "#10B981",
                          "#EF4444",
                          "#FBBF24",
                          "#8B5CF6",
                          "#EC4899",
                          "#6B7280",
                          "#4F46E5",
                          "#6D28D9",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 7,
                  delay: index * 0.7,
                  repeat: Infinity,
                }}
                className="w-2 h-20 rounded-full shadow-md"
              ></motion.li>
            ))}
          </ul>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default HomeArt;
