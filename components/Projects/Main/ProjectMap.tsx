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
        key={project.id}
        title={project.title}
        description={project.description}
        gitUrl={project.gitUrl}
        previewUrl={project.previewUrl}
        images={project.images || []}
      />
    </motion.div>
  );
};

export default ProjectMap;
