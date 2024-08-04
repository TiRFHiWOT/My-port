"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const ButtonTwo = ({ href, text }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-1 px-1 rounded-full w-full text-white sm:w-fit bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 mb-2 sm:mx-1 md:mx-2 lg:mx-3"
    >
      <Link href={href} target="_blank">
        <span className="block bg-[#1e2842] hover:bg-slate-900 rounded-full px-5 py-2">
          {text}
        </span>
      </Link>
    </motion.div>
  );
};

export default ButtonTwo;
