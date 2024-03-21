import ProjectCard from "./ProjectCard";
import Image from "next/image";

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
    id: "1",
    title: "My Project",
    description: "Project-2",
    image: "two.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-3",
    image: "three.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-4",
    image: "four.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-5",
    image: "five.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
  {
    id: "1",
    title: "My Project",
    description: "Project-6",
    image: "six.png",
    gitUrl: "https://github.com/",
    previewUrl: "https://vercel.com/",
  },
];

const Projects = () => {
  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <section id="Projects">
      <div className="md:px-24 my-8 md:my-24 bg-gradient-to-b from-[#1e2842] via-[#12192b] to-[#1e2842] relative">
        <h1 className="text-3xl text-white md:text-4xl p-6 font-semibold tracking-wide">
          <span className=" border-orange-500 border-b-4">MY</span> PROJECTS
        </h1>
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 py-6">
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
