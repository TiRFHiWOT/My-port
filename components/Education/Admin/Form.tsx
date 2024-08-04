"use client";
import React, { ChangeEvent } from "react";

type EducationFormProps = {
  education: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isUpdating: boolean;
  warning: string;
};

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  handleChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Education</label>
        <input
          type="text"
          name="name"
          value={education.name}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Institution</label>
        <input
          type="text"
          name="institution"
          value={education.institution}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Year</label>
        <input
          type="text"
          name="year"
          value={education.year}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      {warning && <p className="text-red-600 mb-4">{warning}</p>}
      <button
        onClick={handleSubmit}
        className="py-2 px-4 border-2 border-gray-700 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {isUpdating ? "Update Education" : "Submit Education"}
      </button>
    </div>
  );
};

export default EducationForm;
