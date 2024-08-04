"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const ProjectMap = ({ project, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <ProjectCard
        title={project.title}
        description={project.description}
        gitUrl={project.gitUrl}
        previewUrl={project.previewUrl}
        imgOne={project.images[0]}
        imgTwo={project.images[1]}
        imgThree={project.images[2]}
        imgFour={project.images[3]}
        imgFive={project.images[4]}
      />
    </motion.div>
  );
};

export default ProjectMap;
