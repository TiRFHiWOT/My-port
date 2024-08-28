import React, { useState, ChangeEvent } from "react";

type WorkExperienceFormProps = {
  workExperience: any;
  handleChange: (field: string, value: string) => void;
  handleSubmit: () => void;
  isUpdating: boolean;
  warning: string;
};

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  handleChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit();
    setUploading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Position</label>
        <input
          type="text"
          value={workExperience.position}
          onChange={(e) => handleChange("position", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Place</label>
        <input
          type="text"
          value={workExperience.place}
          onChange={(e) => handleChange("place", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Year</label>
        <input
          type="text"
          value={workExperience.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Skills Used</label>
        <input
          type="text"
          value={workExperience.skillsUsed}
          onChange={(e) => handleChange("skillsUsed", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Point One</label>
        <input
          type="text"
          value={workExperience.pointOne}
          onChange={(e) => handleChange("pointOne", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Point Two</label>
        <input
          type="text"
          value={workExperience.pointTwo}
          onChange={(e) => handleChange("pointTwo", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Point Three</label>
        <input
          type="text"
          value={workExperience.pointThree}
          onChange={(e) => handleChange("pointThree", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      {warning && <p className="text-red-500">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className="py-2 px-4 border-2 border-gray-700 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update Experience"
          : "Submit Experience"}
      </button>
    </div>
  );
};

export default WorkExperienceForm;
