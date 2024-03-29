"use client";
import React, { useState, useTransition } from "react";
import ProjectCard from "./ProjectCard";
import PrivateCard from "./PrivateCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";

const privateData = [
  {
    id: "1",
    title: "My Project",
    description: "Project-1",
    image: {
      imgOne: "one.png",
      imgTwo: "two.png",
      imgThree: "three.png",
      imgFour: "four.png",
      imgFive: "five.png",
    },
    tag: ["ALL", "PRIVATE"],
  },
  {
    id: "2",
    title: "My Project",
    description: "Project-2",
    image: {
      imgOne: "one.png",
      imgTwo: "two.png",
      imgThree: "three.png",
      imgFour: "four.png",
      imgFive: "five.png",
    },
    tag: ["ALL", "PRIVATE"],
  },
];

const projectData = [
  {
    id: "1",
    title: "My Project",
    description: "Project-1",
    image: {
      imgOne: "one.png",
      imgTwo: "two.png",
      imgThree: "three.png",
      imgFour: "four.png",
      imgFive: "five.png",
    },
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
    tag: ["ALL", "PUBLIC"],
  },
  {
    id: "2",
    title: "My Project",
    description: "Project-2",
    image: {
      imgOne: "two.png",
      imgTwo: "three.png",
      imgThree: "four.png",
      imgFour: "five.png",
      imgFive: "one.png",
    },
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
    tag: ["ALL", "PUBLIC"],
  },
  {
    id: "3",
    title: "My Project",
    description: "Project-3",
    image: {
      imgOne: "one.png",
      imgTwo: "two.png",
      imgThree: "three.png",
      imgFour: "four.png",
      imgFive: "five.png",
    },
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
    tag: ["ALL", "PUBLIC"],
  },
  {
    id: "4",
    title: "My Project",
    description: "Project-4",
    image: {
      imgOne: "one.png",
      imgTwo: "two.png",
      imgThree: "three.png",
      imgFour: "four.png",
      imgFive: "five.png",
    },
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
    tag: ["ALL", "PUBLIC"],
  },
];

const Projects = () => {
  const [tag, setTag] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  const handleTagChange = (newTag) => {
    startTransition(() => {
      setTag(newTag);
    });
  };

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag)
  );

  const filteredPrivate = privateData.filter((project) =>
    project.tag.includes(tag)
  );

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
          <span className="border-orange-500 border-b-4">MY</span> PROJECTS
        </motion.h1>
        <div className="grid grid-flow-row lg:gap-8 lg:grid-flow-col">
          <p className="text-xs md:text-sm text-white mb-5 p-6 bg-slate-900 rounded-lg leading-5 lg:leading-6 bg-opacity-50 border border-[#334155]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            sit nobis a rerum minus tempora reiciendis consequuntur molestias
            mollitia delectus inventore quo sapiente nesciunt, quod, praesentium
            odit iusto aliquid soluta ab. Culpa tenetur esse, adipisci possimus
            cupiditate expedita magni quis cum? Quos eaque ducimus earum fuga
            nisi illum tempora.
          </p>
          <div className="text-white flex flex-row justify-center lg:justify-end  self-end mb-5">
            <ProjectTag
              onClick={handleTagChange}
              name="ALL"
              isSelected={tag === "ALL"}
            />
            <ProjectTag
              onClick={handleTagChange}
              name="PUBLIC"
              isSelected={tag === "PUBLIC"}
            />
            <ProjectTag
              onClick={handleTagChange}
              name="PRIVATE"
              isSelected={tag === "PRIVATE"}
            />
          </div>
        </div>
        <div className="grid md:gap-8 gap-4 grid-cols-2 lg:grid-cols-3 py-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgOne={project.image.imgOne}
              imgTwo={project.image.imgTwo}
              imgThree={project.image.imgThree}
              imgFour={project.image.imgFour}
              imgFive={project.image.imgFive}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          ))}
          {filteredPrivate.map((project, index) => (
            <PrivateCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgOne={project.image.imgOne}
              imgTwo={project.image.imgTwo}
              imgThree={project.image.imgThree}
              imgFour={project.image.imgFour}
              imgFive={project.image.imgFive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
