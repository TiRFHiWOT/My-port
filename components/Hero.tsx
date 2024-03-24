"use client";
import Link from "next/link";
import Image from "next/image";
import code from "../public/code_occupation.png";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import transparent from "../public/circuit_board.png";

const Hero = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-2 mt-20 mb-3 py-4 lg:p-10 justify-center relative min-h-[70vh] items-center">
        <Image
          src={transparent}
          alt="hero image"
          width={1200}
          height={1200}
          className="absolute -top-10 left-0 opacity-10 -z-10"
        />

        <div className="lg:text-start mx-auto text-center px-6 lg:ml-12">
          <motion.h1
            initial={{ y: "400px", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-white text-4xl lg:text-6xl lg:leading-normal font-extrabold my-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600">
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
          <motion.p
            initial={{ y: "400px", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
            consequuntur.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start py-5 ">
            <motion.button
              initial={{ y: "400px", opacity: 0 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white hover:shadow-xl py-3 px-6 rounded-full w-full sm:w-fit bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 mb-2 sm:mx-1 md:mx-2 lg:mx-0"
            >
              Get In Touch
            </motion.button>
            <motion.button
              initial={{ y: "400px", opacity: 0 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-1 px-1 rounded-full w-full text-white sm:w-fit bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 mb-2 sm:mx-1 md:mx-2 lg:mx-3"
            >
              <span className="block bg-[#1e2842] hover:bg-slate-900 rounded-full px-5 py-2">
                Download CV
              </span>
            </motion.button>
          </div>
        </div>
        <div className="mx-auto my-5 lg:my-0">
          <motion.div
            initial={{ x: "50px", y: "50px", opacity: 0 }}
            animate={{ x: "0", y: "0", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-full  p-7 mb-2 bg-[#121212] bg-opacity-50"
            style={{ boxShadow: "0 0 10px 5px #121212" }}
          >
            <Image src={code} alt="hero image" width={250} height={250} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
