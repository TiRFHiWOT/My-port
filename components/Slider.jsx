"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const projectData = [
  {
    id: "1",
    title: "My Project",
    description: "Project-1",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-2",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-3",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-4",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-5",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-6",
    image: "make_a_red.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
];

const Slider = () => {
  const [width, setWidth] = useState(0);
  const slider = useRef();
  useEffect(() => {
    setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  }, []);
  return (
    <div className="mx-[20%]">
      <motion.div
        ref={slider}
        whileTap={{ cursor: "grabbing" }}
        className="slider overflow-hidden bg-slate-400 cursor-grab"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-slider flex flex-row bg-slate-700"
        >
          {projectData.map((project) => {
            return (
              <motion.ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slider;
