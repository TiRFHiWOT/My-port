import SkillImageDisplay from "../Main/imageDisplay";

type WorkExperienceProps = {
  workExperience: any;
  handleEdit: (workExperience: any) => void;
  handleRemove: (id: string) => void;
};

const WorkExperienceOutput: React.FC<WorkExperienceProps> = ({
  workExperience,
  handleEdit,
  handleRemove,
}) => {
  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit(workExperience);
  };

  if (!workExperience) {
    return null;
  }

  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-lg">
      <SkillImageDisplay skillsUsed={workExperience.skillsUsed} />
      <div className="rounded-md py-2 px-3 shadow-lg border bg-[#181f29] border-gray-700 mb-4">
        <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider">
          {workExperience.position}
        </h4>
        <p className="text-gray-300 ml-4 py-1">{workExperience.place}</p>
        <p className="text-gray-300 ml-4 py-1">{workExperience.year}</p>
        <p className="text-gray-300 ml-4 py-1">{workExperience.skillsUsed}</p>
        <p className="text-gray-400 ml-4 py-1">{workExperience.pointOne}</p>
        <p className="text-gray-400 ml-4 py-1">{workExperience.pointTwo}</p>
        <p className="text-gray-400 ml-4 py-1">{workExperience.pointThree}</p>
      </div>
      <div className="flex justify-end space-x-4 mt-2">
        <button
          onClick={handleEditClick}
          className="py-2 px-6 text-gray-200 border-2 bg-yellow-600 border-yellow-700 rounded-full font-semibold hover:bg-yellow-700 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleRemove(workExperience.id)}
          className="py-2 px-6 text-gray-200 border-2 bg-red-600 border-red-700 rounded-full font-semibold hover:bg-red-700 hover:text-white transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceOutput;
