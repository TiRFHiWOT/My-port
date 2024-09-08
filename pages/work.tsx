"use client";
import { motion } from "framer-motion";
import WorkClient from "@/components/Work/Main/Client";
import type { Metadata } from "next";
import savePageVisit from "@/utiles/pageTracker";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Work experience page",
  description: "Work experience of portifolio",
};

const Work = () => {
  useEffect(() => {
    savePageVisit("work");
  }, []);
  return (
    <section id="Work">
      <div className="my-10 py-5 lg:py-12 relative">
        <h1
          className="lg:text-[30rem] md:text-[22rem] hidden md:flex absolute left-0 lg:-bottom-44 md:-bottom-14 
        bottom-0 text-cyan-600 text-opacity-10 font-extrabold tracking-wider"
        >
          exp
        </h1>
        <motion.p
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-center pt-6 pb-2 tracking-wider text-gray-500"
        >
          WHAT I HAVE DONE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl text-white md:text-5xl text-center pb-6 font-bold tracking-wide"
        >
          Work <span className="text-orange-500">Ex</span>perience
        </motion.h1>
        <div className="big-slide pt-10 pb-5 overflow-hidden relative w-full">
          <WorkClient />
        </div>
      </div>
    </section>
  );
};

export default Work;
