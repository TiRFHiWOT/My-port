import Output from "./Output";

type Skill = {
  id: string;
  name: string;
};

type SkillsListProps = {
  skillsList: Skill[];
  handleEdit: (skill: Skill) => void;
  handleRemove: (skillId: string) => void;
};

const SkillsList: React.FC<SkillsListProps> = ({
  skillsList,
  handleEdit,
  handleRemove,
}) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-400 mb-4">
      {skillsList.length > 0 ? "Submitted skills" : "No Skills Available"}
    </h3>

    {skillsList.length > 0
      ? skillsList.map((skill) => (
          <Output
            key={skill.id}
            skill={skill}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ))
      : ""}
  </div>
);

export default SkillsList;
