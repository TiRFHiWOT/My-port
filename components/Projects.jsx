"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { getDocs, collection, query, limit } from "firebase/firestore";
import ProjectCard from "./ProjectCard";
import PrivateCard from "./PrivateCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";

const Projects = () => {
  const [tag, setTag] = useState("ALL");

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const projectsCollectionRef = collection(db, "projects");
  const [allProjects, setAllProjects] = useState([]);

  const ProjectsData = allProjects.tag === true ? PrivateCard : ProjectCard;

  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(query(projectsCollectionRef, limit(6)));
      const publicData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllProjects(publicData);
    };
    getProjects();
  }, []);

  return (
    <section id="Projects">
      <div className="md:px-24 px-8 py-6 lg:py-16 my-8 md:my-16 relative">
        <div className="flex justify-center">
          <motion.h1
            initial={{ x: "-200px", opacity: 0 }}
            whileInView={{ x: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 500,
            }}
            className="text-3xl text-white md:text-4xl py-6 px-12 w-fit mb-6 font-semibold tracking-wide bg-gray-900 rounded-full "
          >
            <span className="border-orange-500 border-b-4">MY</span> PR
            <motion.span
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-cyan-600 rounded-full cursor-pointer inline-block"
            >
              O
            </motion.span>
            JECTS
          </motion.h1>
        </div>

        <div className="flex justify-center">
          <div className="text-white mb-5 border-2 border-[#334155] rounded-full overflow-hidden">
            <ProjectTag
              options={["ALL", "PUBLIC", "PRIVATE"]}
              onSelect={handleTagChange}
            />
          </div>
        </div>

        <div className="grid md:gap-6 gap-4 grid-cols-2 lg:grid-cols-3 py-6 relative">
          {allProjects.map((project, index) =>
            tag === "ALL" ||
            (tag === "PUBLIC" && !project.tag) ||
            (tag === "PRIVATE" && project.tag) ? (
              project.tag ? (
                <PrivateCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imgOne={project.images[0]}
                  imgTwo={project.images[1]}
                  imgThree={project.images[2]}
                  imgFour={project.images[3]}
                  imgFive={project.images[4]}
                />
              ) : (
                <ProjectCard
                  key={project.id}
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
              )
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
