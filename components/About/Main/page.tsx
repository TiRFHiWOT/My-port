"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ClientTabs from "@/components/About/Main/ClientTabs";
import Heading from "@/components/About/Main/Heading";
import Paragraph from "@/components/About/Main/Paragraph";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="About">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, type: "spring" }}
        className="glass py-12 px-10 lg:px-12 my-16 rounded-e-2xl md:px-8 relative container border-y border-r border-[#334155] overflow-hidden"
      >
        <div className="flex flex-col md:mx-12 lg:mx-0 lg:flex-row items-center">
          <div className="flex flex-row my-10 lg:mx-10">
            <Heading />
            <Paragraph />
          </div>
          <ClientTabs />
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1, type: "spring" }}
          className="h-[100px] w-[100px] rounded-full bg-cyan-700 absolute top-[-2.5rem] right-[-2.5rem] -z-10 bg-opacity-50"
        ></motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.25, type: "spring" }}
          className="h-[50px] w-[50px] rounded-full bg-cyan-700 absolute top-[2rem] right-[33rem] -z-10 bg-opacity-50"
        ></motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
          className="h-[50px] w-[50px] rounded-full bg-cyan-700 absolute bottom-[6rem] left-[25rem] -z-10 bg-opacity-50"
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default About;
