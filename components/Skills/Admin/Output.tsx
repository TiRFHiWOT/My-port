import Image from "next/image";
import { useState } from "react";
import {
  uploadImage,
  removeImage,
  updateSkillImages,
} from "../Firebase/Firebase";
import { FiPlus, FiX } from "react-icons/fi";

type SkillItemProps = {
  skill: any;
  handleEdit: (skill: any) => void;
  handleRemove: (id: string) => void;
};

const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  handleEdit,
  handleRemove,
}) => {
  const [imageUrls, setImageUrls] = useState(skill.image ? [skill.image] : []);
  const [loading, setLoading] = useState(false);

  const handleImageRemove = async (index: number) => {
    const urlToRemove = imageUrls[index];
    await removeImage(urlToRemove);

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);

    await updateSkillImages(skill.id, newImageUrls);
  };

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = Array.from(e.target.files || []);
    const newImageUrls = await Promise.all(
      files.map((file) => uploadImage(file))
    );

    const updatedImageUrls = [...imageUrls, ...newImageUrls];
    setImageUrls(updatedImageUrls);

    await updateSkillImages(skill.id, updatedImageUrls);
    setLoading(false);
  };

  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit({ ...skill, image: imageUrls[0] });
  };

  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-lg">
      <div>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <span className="text-green-600">Uploading...</span>
          </div>
        )}
        <div className="flex flex-row space-x-5 p-2 shadow-lg rounded-md mb-4 border bg-[#181f29] border-gray-700 relative">
          {imageUrls.map((url: string, index: number) => (
            <div key={index} className="relative w-24 h-24 group">
              <Image
                src={url}
                alt={`${skill.name} skill image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 m-1 text-red-600 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiX />
              </button>
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
        <div className="rounded-md py-2 px-3 shadow-lg border bg-[#181f29] border-gray-700 mb-4">
          <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider">
            {skill.name}
          </h4>
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
          onClick={() => handleRemove(skill.id)}
          className="py-2 px-6 text-gray-200 border-2 bg-red-600 border-red-700 rounded-full font-semibold hover:bg-red-700 hover:text-white transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default SkillItem;
