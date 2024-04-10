"use client";
import { useState, useTransition, useEffect } from "react";
import { db } from "@/app/firebase";
import { getDocs, collection } from "firebase/firestore";
import ProjectCard from "./ProjectCard";
import PrivateCard from "./PrivateCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";

const Projects = () => {
  const [tag, setTag] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  const handleTagChange = (newTag) => {
    startTransition(() => {
      setTag(newTag);
    });
  };

  const projectsCollectionRef = collection(db, "publicProjects");
  const privateCollectionRef = collection(db, "privateProjects");
  const [privateProjects, setPrivateProjects] = useState([]);

  const [publicProjects, setPublicProjects] = useState([]);

  useEffect(() => {
    const getPublic = async () => {
      const data = await getDocs(projectsCollectionRef);
      const publicData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPublicProjects(publicData);
    };
    getPublic();
  }, []);

  useEffect(() => {
    const getPrivate = async () => {
      const data = await getDocs(privateCollectionRef);
      const privateData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPrivateProjects(privateData);
    };
    getPrivate();
  }, []);

  return (
    <section id="Projects">
      <div className="md:px-24 px-8 py-6 lg:py-16 my-8 md:my-24 relative">
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
          {publicProjects.map((project, index) => (
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
          ))}
          {privateProjects.map((project, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
