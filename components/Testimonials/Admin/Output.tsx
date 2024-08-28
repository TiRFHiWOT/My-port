import React, { useState } from "react";
import Image from "next/image";
import { FiPlus, FiX } from "react-icons/fi";
import {
  uploadImage,
  removeImage,
  updateTestimonialImage,
} from "../Firebase/Firebase";

const TestimonialsItem = ({ testimonial, handleEdit, handleRemove }: any) => {
  const [profilePicture, setProfilePicture] = useState(
    testimonial.profilePicture || ""
  );
  const [loading, setLoading] = useState(false);

  const handleImageRemove = async () => {
    if (profilePicture) {
      await removeImage(profilePicture);
      setProfilePicture("");
      await updateTestimonialImage(testimonial.id, "");
    }
  };

  const handleImageAdd = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      const uploadedImageUrl = await uploadImage(file);
      setProfilePicture(uploadedImageUrl);
      await updateTestimonialImage(testimonial.id, uploadedImageUrl);
    }
    setLoading(false);
  };

  const handleEditClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleEdit({ ...testimonial, profilePicture });
  };

  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-2xl">
      <div>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <span className="text-green-600">Uploading...</span>
          </div>
        )}
        <div className="flex flex-wrap gap-4 p-2 shadow-lg rounded-md mb-4 border border-gray-700 bg-[#181f29] relative">
          <div className="relative w-24 h-24 group">
            <Image
              src={profilePicture}
              alt={`${testimonial.userName} profile picture`}
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
          <h4 className="text-xl text-gray-100 font-semibold py-1 tracking-wider">
            {testimonial.userName}
          </h4>
          <p className="text-gray-300 ml-4 py-1">{testimonial.position}</p>
          <p className="text-gray-300 ml-4 py-1">{testimonial.comment}</p>
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
          onClick={() => handleRemove(testimonial.id)}
          className="py-2 px-6 text-gray-200 border-2 bg-red-600 border-red-700 rounded-full font-semibold hover:bg-red-700 hover:text-white transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TestimonialsItem;
