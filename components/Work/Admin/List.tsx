import WorkExperience from "./Output";

const WorkExperienceList = ({
  workExperience = [],
  handleEdit,
  handleRemove,
}: any) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-100 mb-4">
      {workExperience.length > 0 ? "" : "No Work Experience Available"}
    </h3>

    {workExperience.length > 0
      ? workExperience.map((work: any) => (
          <WorkExperience
            key={work.id}
            workExperience={work}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ))
      : ""}
  </div>
);

export default WorkExperienceList;
