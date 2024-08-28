"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

const Heading = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.h1
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0 }}
      className="text-white text-4xl lg:text-6xl lg:leading-normal font-extrabold my-4"
    >
      <span className="text-transparent bg-clip-text bg-orange-700">
        {`Hello, I'm`} <br />
      </span>{" "}
      <TypeAnimation
        sequence={[
          "Tselot.",
          1000,
          "Web Developer.",
          1000,
          "Mobile Developer.",
          1000,
          "UI/UX Designer.",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ display: "inline-block", color: "white" }}
        repeat={Infinity}
      />
    </motion.h1>
  );
};

export default Heading;
