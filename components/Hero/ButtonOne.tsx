"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const ButtonOne = ({ href, text }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-white shadow-xl py-3 px-6 rounded-md w-full sm:w-fit bg-blue-700 hover:bg-blue-800 transition-all duration-300 
       mb-2 sm:mx-1 md:mx-2 lg:mx-0"
    >
      <Link href={href} target="_blank">
        {text}
      </Link>
    </motion.div>
  );
};

export default ButtonOne;
