"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionParagraph = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.p
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-gray-200 text-sm md:text-base ml-2 drop-shadow-[0_0.6px_0.6px_rgba(0,0,0,0.8)] tracking-wider"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
      consequuntur.
    </motion.p>
  );
};

export default MotionParagraph;
