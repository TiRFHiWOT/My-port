import Output from "./Output";

type Education = {
  id: string;
  name: string;
};

type EducationListProps = {
  educationList: Education[];
  handleEdit: (education: Education) => void;
  handleRemove: (educationId: string) => void;
};

const EducationList: React.FC<EducationListProps> = ({
  educationList,
  handleEdit,
  handleRemove,
}) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-400 mb-4">
      {educationList.length > 0 ? "" : "No Education Available"}
    </h3>

    {educationList.length > 0
      ? educationList.map((education) => (
          <Output
            key={education.id}
            education={education}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ))
      : ""}
  </div>
);

export default EducationList;
