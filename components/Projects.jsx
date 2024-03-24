"use client";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import { motion } from "framer-motion";

const projectData = [
  {
    id: "1",
    title: "My Project",
    description: "Project-1",
    image: "one.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "2",
    title: "My Project",
    description: "Project-2",
    image: "two.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "3",
    title: "My Project",
    description: "Project-3",
    image: "three.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "4",
    title: "My Project",
    description: "Project-4",
    image: "four.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "5",
    title: "My Project",
    description: "Project-5",
    image: "five.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "6",
    title: "My Project",
    description: "Project-6",
    image: "six.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
];

const Projects = () => {
  return (
    <section id="Projects">
      <div className="md:px-24 px-8 py-6 lg:py-16 my-8 md:my-24 bg-gradient-to-b from-[#1e2842] via-[#12192b] to-[#1e2842] relative">
        <motion.h1
          initial={{ x: "-200px", opacity: 0 }}
          whileInView={{ x: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 500,
          }}
          className="text-3xl text-white md:text-4xl p-6 font-semibold tracking-wide"
        >
          <span className=" border-orange-500 border-b-4">MY</span> PROJECTS
        </motion.h1>
        <p className=" text-xs md:text-sm text-white mb-5 lg:w-[60%] p-6 bg-slate-900 rounded-lg leading-5 lg:leading-6 bg-opacity-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
          sit nobis a rerum minus tempora reiciendis consequuntur molestias
          mollitia delectus inventore quo sapiente nesciunt, quod, praesentium
          odit iusto aliquid soluta ab. Culpa tenetur esse, adipisci possimus
          cupiditate expedita magni quis cum? Quos eaque ducimus earum fuga nisi
          illum tempora.
        </p>
        <div className="grid md:gap-8 gap-4 grid-cols-2 lg:grid-cols-3 py-6">
          {projectData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
