import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperience } from "@/store/slice/workSlice";
import WorkCard from "./WorkCard";
import { RotatingLines } from "react-loader-spinner";
import { convertFromRaw, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import SkillImageDisplay from "./imageDisplay";

const ClientWorkExperience = () => {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.workExperience.experience);
  const status = useSelector((state) => state.workExperience.status);
  const error = useSelector((state) => state.workExperience.error);

  const [selectedExperience, setSelectedExperience] = useState<any | null>(
    null
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExperience() as any);
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <RotatingLines width="50" />
      </div>
    );
  }

  if (experience.length === 0) {
    return <div className="text-center py-4">No experience available.</div>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  const handleOverlayClose = () => {
    setSelectedExperience(null);
  };

  const convertDescriptionToHTML = (description: string) => {
    let contentState = ContentState.createFromText("");
    if (description) {
      try {
        contentState = convertFromRaw(JSON.parse(description));
      } catch (error) {
        console.error("Error converting raw content:", error);
      }
    }
    return convertToHTML({
      blockToHTML: (block) => {
        if (block.type === "unordered-list-item") {
          return <li />;
        }
        if (block.type === "ordered-list-item") {
          return <li />;
        }
        return null;
      },
    })(contentState);
  };

  return (
    <div className="relative">
      {/* Work Cards */}
      <div className="work-slide flex w-fit">
        {experience.map((item) => (
          <WorkCard
            key={item.id}
            position={item.position}
            place={item.place}
            year={item.year}
            skillsUsed={item.skillsUsed}
            description={item.description}
            onClick={() => setSelectedExperience(item)}
          />
        ))}
        {experience.map((item) => (
          <WorkCard
            key={item.id}
            position={item.position}
            place={item.place}
            year={item.year}
            skillsUsed={item.skillsUsed}
            description={item.description}
            onClick={() => setSelectedExperience(item)}
          />
        ))}
      </div>

      {/* Overlay */}
      {selectedExperience && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleOverlayClose}
        >
          <div
            className="bg-white p-8 lg:p-12 rounded-lg shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={handleOverlayClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 uppercase text-gray-800 tracking-tight">
              {selectedExperience.position}
            </h2>
            <div className="py-6 flex flex-col justify-between lg:flex-row gap-6 lg:gap-8 items-start lg:items-center border-y border-gray-300">
              <div className="lg:flex lg:gap-6 flex flex-col">
                <p className="text-2xl font-semibold text-gray-900 bg-gray-200 px-4 py-2 rounded-full w-fit">
                  {selectedExperience.place}
                </p>
                <p className="text-xl text-gray-600 px-4 py-2 bg-gray-100 rounded-full">
                  {selectedExperience.year}
                </p>
              </div>
              <SkillImageDisplay
                skillsUsed={selectedExperience.skillsUsed}
                compact={false}
                isOverlay={true}
              />
            </div>
            <div
              className="text-gray-800 leading-7 lg:leading-8 mt-6 space-y-4"
              dangerouslySetInnerHTML={{
                __html: convertDescriptionToHTML(
                  selectedExperience.description
                ),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientWorkExperience;
