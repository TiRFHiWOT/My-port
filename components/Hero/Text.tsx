"use client";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ButtonOne from "./ButtonOne";
import ButtonTwo from "./BottonTwo";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Text = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <div className="relative mt-5 lg:mt-0 z-10 lg:text-start mx-5 text-center px-6 lg:ml-12 border-2 border-[#334155] rounded-3xl glass">
        <Heading />
        <Paragraph />
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start py-5">
          <ButtonOne href={"/"} text="Get In Touch" />
          <ButtonTwo href={"/"} text="Download CV" />
        </div>
      </div>
    </motion.div>
  );
};

export default Text;
