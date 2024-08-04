"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SubmitButton = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.button
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.2,
        type: "spring",
        stiffness: 700,
      }}
      viewport={{ once: true }}
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
    >
      Send Message
    </motion.button>
  );
};

export default SubmitButton;
