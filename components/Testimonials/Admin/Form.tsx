"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Testimonial {
  userName: string;
  position: string;
  comment: string;
}

interface TestimonialFormProps {
  testimonial: Testimonial;
  handleChange: (field: keyof Testimonial, value: string) => void;
  handleImageChange: (file: File | null) => void;
  handleSubmit: (file: File | null) => Promise<void>;
  isUpdating: boolean;
  warning?: string;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  testimonial,
  handleChange,
  handleImageChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    handleImageChange(file);
  };

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit(imageFile);
    setUploading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">User Name</label>
        <input
          type="text"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          value={testimonial.userName}
          onChange={(e) => handleChange("userName", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Position</label>
        <input
          type="text"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          value={testimonial.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Comment</label>
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          value={testimonial.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Profile Picture</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          accept="image/*"
        />
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={150}
              height={150}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      {warning && <p className="text-red-600 mb-4">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className="py-2 px-4 border-2 border-gray-700 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update Testimonial"
          : "Submit Testimonial"}
      </button>
    </div>
  );
};

export default TestimonialForm;
