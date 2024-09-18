import Image from "next/image";
import { useState } from "react";
import {
  uploadImage,
  removeImage,
  updateSkillImage,
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
  const [imageUrl, setImageUrl] = useState(skill.image || "");
  const [loading, setLoading] = useState(false);

  const handleImageRemove = async () => {
    if (imageUrl) {
      await removeImage(imageUrl);
      setImageUrl("");
      await updateSkillImage(skill.id, "");
    }
  };

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const newImageUrl = await uploadImage(files[0]);
      setImageUrl(newImageUrl);
      await updateSkillImage(skill.id, newImageUrl);
    }
    setLoading(false);
  };

  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit({ ...skill, image: imageUrl });
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
          {imageUrl && (
            <div className="relative w-24 h-24 group">
              <Image
                src={imageUrl}
                alt={`${skill.name} skill image`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <button
                onClick={handleImageRemove}
                className="absolute top-0 right-0 m-1 text-red-600 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiX />
              </button>
            </div>
          )}
          <div className="relative w-24 h-24 flex justify-center items-center border-2 border-gray-400 border-dashed rounded-lg">
            <input
              type="file"
              onChange={handleImageAdd}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FiPlus className="text-gray-400" />
          </div>
        </div>
        <div className="rounded-md py-2 px-3 shadow-lg border bg-[#181f29] border-gray-700 mb-4">
          <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider uppercase">
            {skill.name}
          </h4>
          <p className="text-sm text-gray-400 mt-2">{skill.category}</p>{" "}
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
