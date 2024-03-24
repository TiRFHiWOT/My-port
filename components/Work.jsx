"use client";
import React from "react";
import WorkCard from "@/components/WorkCard";
import { motion } from "framer-motion";

const workData = [
  {
    id: "1",
    title: "React.js",
    place: "Place of Occupation",
    description: "",
  },
  {
    id: "2",
    title: "Next.js",
    place: "Place of Occupation",
    description: "",
  },
  {
    id: "3",
    title: "React.js",
    place: "Place of Occupation",
    description: "",
  },
  {
    id: "4",
    title: "Next.js",
    place: "Place of Occupation",
    description: "",
  },
  {
    id: "5",
    title: "React.js",
    place: "Place of Occupation",
    description: "",
  },
  {
    id: "6",
    title: "Next.js",
    place: "Place of Occupation",
    description: "",
  },
];

const Work = () => {
  const goLeft = () => ({});
  return (
    <section id="Work">
      <div className="my-10 py-5 lg:py-12 relative">
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
          Work Experience
        </motion.h1>
        <div className="big-slide pt-10 pb-5 overflow-hidden relative">
          <div className="grid grid-flow-col work-slide">
            {workData.map((project) => (
              <WorkCard
                key={project.id}
                title={project.title}
                description={project.description}
                place={project.place}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
