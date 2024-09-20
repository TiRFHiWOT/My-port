"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ClientTabs from "@/components/About/Main/ClientTabs";
import Heading from "@/components/About/Main/Heading";
import Paragraph from "@/components/About/Main/Paragraph";
import ProfileImg from "./ProfileImg";
import Grid from "./Grid";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import ParticleEffect from "@/components/Animation/Particle";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { about, loading, error } = useSelector(
    (state: RootState) => state.about
  );

  return (
    <section
      id="About"
      className="relative flex flex-col justify-center items-center overflow-hidden min-h-[100vh]"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <RotatingLines width="50" />
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, type: "spring" }}
            className="glass py-12 px-10 lg:px-12 my-16 rounded-2xl md:px-8 relative container border border-[#334155] overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gray-950 bg-opacity-50" />
            <div className="flex flex-col md:mx-12 lg:mx-0 lg:flex-row items-center z-10">
              <div className="flex flex-col md:flex-row md:my-10">
                <Heading />
                <Paragraph />
              </div>
              <div>
                <ProfileImg />
              </div>
            </div>
            <div className="flex flex-row">
              <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1, type: "spring" }}
                className="h-[100px] w-[100px] rounded-full bg-blue-600 absolute top-[-2.5rem] right-[-2.5rem] -z-10 bg-opacity-50"
              ></motion.div>
              <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.25, type: "spring" }}
                className="h-[50px] w-[50px] rounded-full bg-blue-600 absolute top-[2rem] right-[33rem] -z-10 bg-opacity-50"
              ></motion.div>
              <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
                className="h-[50px] w-[50px] rounded-full bg-blue-600 absolute bottom-[6rem] left-[25rem] -z-10 bg-opacity-50"
              ></motion.div>
            </div>
          </motion.div>

          <div
            className="relative flex justify-center items-center w-[110%] h-full px-10 py-2 border border-gray-700 overflow-hidden"
            style={{ boxShadow: "inset 0px 0px 5px black" }}
          >
            <div className=" absolute inset-0 -z-50 opacity-30">
              <Image
                alt=""
                src="/pngegg (2).png"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className=" absolute -left-[43rem] w-full h-full"></div>
            <div className="z-50">
              <ClientTabs />
            </div>
            <div>
              <motion.div
                initial={{ y: "200px" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-opacity-80 bg-sky-900 z-0 clip-path-about"
              ></motion.div>
              <motion.div
                initial={{ x: "200px" }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-opacity-80 bg-amber-900 shadow-xl z-0 clip-path-about-two"
              ></motion.div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default About;
