import Image from "next/image";
import { useState } from "react";
import {
  uploadImage,
  removeImage,
  updateProjectImages,
} from "../Firebase/Firebase";
import { FiPlus, FiX } from "react-icons/fi";

const ProjectsItem = ({ proj, handleEdit, handleRemove }: any) => {
  const [imageUrls, setImageUrls] = useState(proj.images || []);
  const [loading, setLoading] = useState(false);

  const defaultImage = "/neon.jpg";

  const Images = imageUrls.length > 0 ? imageUrls : [defaultImage];

  const handleImageRemove = async (index: number) => {
    const urlToRemove = imageUrls[index];
    await removeImage(urlToRemove);

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);

    await updateProjectImages(proj.id, newImageUrls);
  };

  const handleImageAdd = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);
    const newImageUrls = await Promise.all(
      files.map((file) => uploadImage(file))
    );

    const updatedImageUrls = [...imageUrls, ...newImageUrls];
    setImageUrls(updatedImageUrls);

    await updateProjectImages(proj.id, updatedImageUrls);
    setLoading(false);
  };

  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit({ ...proj, images: imageUrls });
  };

  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-2xl">
      <div>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <span className="text-green-600">Uploading...</span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 p-2 shadow-lg rounded-md mb-4 border bg-[#181f29] border-gray-700 relative">
          {Images.map((url, index) => (
            <div key={index} className="relative w-24 h-24 group">
              <Image
                src={url}
                alt={`${proj.title} project image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {url !== defaultImage && (
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 m-1 text-red-600 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}
          <div className="relative w-24 h-24 flex justify-center items-center border-2 border-gray-400 border-dashed rounded-lg">
            <input
              type="file"
              multiple
              onChange={handleImageAdd}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FiPlus className="text-gray-400" />
          </div>
        </div>
        <div className="rounded-md py-2 px-3 shadow-lg border border-gray-700 bg-[#181f29] mb-4">
          <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider">
            {proj.title}
          </h4>
          <p className="text-gray-300 ml-4 py-1">{proj.description}</p>
          {proj.previewUrl && (
            <p className="text-blue-400 ml-4 py-1">
              <a
                href={proj.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {proj.previewUrl}
              </a>
            </p>
          )}
          {proj.gitUrl && (
            <p className="text-blue-400 ml-4 py-1">
              <a href={proj.gitUrl} target="_blank" rel="noopener noreferrer">
                {proj.gitUrl}
              </a>
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-2">
        <button
          onClick={handleEditClick}
          className="py-2 px-6 text-gray-200 border-2 bg-yellow-600 border-yellow-700 rounded-full font-semibold hover:bg-yellow-700 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleRemove(proj.id)}
          className="py-2 px-6 text-gray-200 border-2 bg-red-600 border-red-700 rounded-full font-semibold hover:bg-red-700 hover:text-white transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProjectsItem;
