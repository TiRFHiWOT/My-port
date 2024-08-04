type EducationItemProps = {
  education: any;
  handleEdit: (education: any) => void;
  handleRemove: (id: string) => void;
};

const EducationItem: React.FC<EducationItemProps> = ({
  education,
  handleEdit,
  handleRemove,
}) => {
  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit({ ...education });
  };

  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-lg">
      <div>
        <div className="rounded-md py-2 px-3 shadow-lg border bg-[#181f29] border-gray-700 mb-4">
          <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider">
            {education.name}
          </h4>
          <p className="text-gray-300 ml-4 py-1">{education.institution}</p>
          <p className="text-gray-300 ml-4 py-1">{education.year}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-2">
        <button
          onClick={handleEditClick}
          className="py-2 px-6 text-gray-200 border-2 bg-yellow-600 border-yellow-700 font-semibold rounded-full hover:bg-yellow-700 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleRemove(education.id)}
          className="py-2 px-6 text-gray-200 border-2 bg-red-600 border-red-700 font-semibold rounded-full hover:bg-red-700 hover:text-white transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EducationItem;
