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
      className="text-gray-300 text-sm md:text-base"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
      consequuntur.
    </motion.p>
  );
};

export default MotionParagraph;
