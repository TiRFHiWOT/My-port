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
      className="flex flex-row md:flex-col justify-between items-center border-b-4 md:border-b-transparent md:border-b-8 md:border-r-4
       border-orange-600 py-2 md:py-0 md:px-2 ms-4 me-5 md:mx-0 mb-4 z-30"
    >
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        A
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        B
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        O
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        U
      </h1>
      <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        T
      </h1>
      <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        M
      </h1>
      <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        E
      </h1>
    </motion.div>
  );
};

export default Heading;
