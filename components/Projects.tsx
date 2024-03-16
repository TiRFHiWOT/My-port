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

const Projects = () => {
  return (
    <div className="md:mx-10 my-8 md:my-12">
      <h1 className="text-3xl mb-6 md:text-4xl font-semibold text-center">
        My Projects
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default Projects;
