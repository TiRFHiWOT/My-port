"use client";

import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ButtonOne from "./ButtonOne";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SocialMediaButton from "./SocialMedia";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
      whileHover={{
        x: [0, 10, -10, 10, 0],
        transition: { duration: 0.6 },
      }}
    >
      <div
        className="relative mt-5 lg:mt-0 z-10 lg:text-start mx-5 text-center px-6 lg:ml-12 border-2 border-cyan-800 
      rounded-3xl glass "
      >
        <Heading />
        <Paragraph />
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start py-5">
          <ButtonOne href={"/contact"} text="Download CV" />
          <div className="flex items-center justify-center mt-4 lg:mt-0 ml-3">
            <SocialMediaButton
              href="https://twitter.com/yourusername"
              icon={faTwitter}
              label="Twitter"
            />
            <SocialMediaButton
              href="https://linkedin.com/in/yourusername"
              icon={faLinkedin}
              label="LinkedIn"
            />
            <SocialMediaButton
              href="https://github.com/yourusername"
              icon={faGithub}
              label="GitHub"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Text;
