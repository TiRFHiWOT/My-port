import Image from "next/image";
import { useState, ChangeEvent } from "react";

type ProjectFormProps = {
  project: any;
  handleChange: (field: string, value: string) => void;
  handleImageChange: (images: File[]) => void;
  handleSubmit: () => void;
  isUpdating: boolean;
  warning: string;
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  handleChange,
  handleImageChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<
    { url: string; width: number; height: number }[]
  >([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    handleImageChange(files);

    const previews = files.map((file) => {
      const url = URL.createObjectURL(file);
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          resolve({ url, width: img.width, height: img.height });
        };
        img.src = url;
      });
    });

    Promise.all(previews).then((loadedPreviews) => {
      setImagePreviews(
        loadedPreviews as { url: string; width: number; height: number }[]
      );
    });
  };

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit(imageFiles);
    setUploading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Project Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Description</label>
        <textarea
          value={project.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">GitHub URL</label>
        <input
          type="text"
          value={project.gitUrl}
          onChange={(e) => handleChange("gitUrl", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Vercel URL</label>
        <input
          type="text"
          value={project.previewUrl}
          onChange={(e) => handleChange("previewUrl", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="flex flex-wrap mb-4">
        {imagePreviews.map((image, index) => (
          <div key={index} className="relative mr-2 mb-2">
            <Image
              src={image.url}
              alt={`Selected ${index}`}
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
        ))}
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
          ? "Update Project"
          : "Submit Project"}
      </button>
    </div>
  );
};

export default ProjectForm;
