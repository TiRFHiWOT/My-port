"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Heading = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
      className="flex flex-col justify-between items-center border-r-4 border-orange-600 px-2"
    >
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
        A
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
        B
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
        O
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
        U
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
        T
      </h1>
      <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
        M
      </h1>
      <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
        E
      </h1>
    </motion.div>
  );
};

export default Heading;
