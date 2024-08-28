import Project from "./Output";

const ProjectList = ({ projects, handleEdit, handleRemove }: any) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-100 mb-4">
      {projects.length > 0 ? "" : "No Projects Available"}
    </h3>

    {projects.length > 0
      ? projects.map((proj: any) => (
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
