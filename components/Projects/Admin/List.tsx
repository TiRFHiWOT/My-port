import Project from "./Output";

const ProjectList = ({ projects, handleEdit, handleRemove }) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-400 mb-4">
      {projects.length > 0 ? "Submitted Projects" : "No Projects Available"}
    </h3>

    {projects.length > 0
      ? projects.map((proj) => (
          <Project
            key={proj.id}
            proj={proj}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ))
      : ""}
  </div>
);

export default ProjectList;
