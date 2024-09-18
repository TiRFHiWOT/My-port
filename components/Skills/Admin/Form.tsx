"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

type SkillsFormProps = {
  skill: {
    name: string;
    image: string;
    category: string;
  };
  handleChange: (field: string, value: string | File) => void;
  handleImageChange: (image: File) => void;
  handleSubmit: (image: File | null) => void;
  isUpdating: boolean;
  warning: string;
};

const SkillsForm: React.FC<SkillsFormProps> = ({
  skill,
  handleChange,
  handleImageChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      handleImageChange(file);

      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        setImagePreview({ url, width: img.width, height: img.height });
      };
      img.src = url;
    }
  };

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit(imageFile);
    setUploading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Skill Name</label>
        <input
          type="text"
          value={skill.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Category</label>
        <select
          value={skill.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        >
          <option value="">Select Category</option>
          <option value="Language">Language</option>
          <option value="Front-End Framework">Front-End Framework</option>
          <option value="Back-End Framework">Back-End Framework</option>
          <option value="Database">Database</option>
          <option value="Cloud">Cloud Service</option>
          <option value="Testing Framework">Testing Framework</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div className="mb-4">
          <Image
            src={imagePreview.url}
            alt="Selected"
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      {warning && <p className="text-red-500 mb-4">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className="py-2 px-4 border border-gray-700 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update Skill"
          : "Submit Skill"}
      </button>
    </div>
  );
};

export default SkillsForm;
