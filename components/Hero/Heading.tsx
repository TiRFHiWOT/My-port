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
      className="text-white text-4xl text lg:text-6xl font-black my-4 tracking-wider"
    >
      <span
        className="text-transparent bg-clip-text lg:leading-normal bg-gray-200 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]"
        style={{ textShadow: "100px 100px 15px rgba(0, 0, 0, 0.5)" }}
      >
        {`Hello, I'm`} <br />
      </span>{" "}
      <div className="lg:leading-normal drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
        <TypeAnimation
          sequence={[
            "Tselot.",
            1000,
            "Full-Stack Developer.",
            1000,
            "Mobile App Developer.",
            1000,
            "Game Developer.",
            1000,
            "Data Scientist",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            display: "inline-block",
            color: "white",
            textShadow: "100px 100px 15px rgba(0, 0, 0, 0.5)",
          }}
          repeat={Infinity}
        />
      </div>
    </motion.h1>
  );
};

export default Heading;
