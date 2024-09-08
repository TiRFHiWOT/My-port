import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperience } from "@/store/slice/workSlice";
import WorkCard from "./WorkCard";
import { RotatingLines } from "react-loader-spinner";
import { convertFromRaw, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import SkillImageDisplay from "./imageDisplay";

const processHTMLContent = (html: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const lists = tempDiv.querySelectorAll("ol, ul");

  lists.forEach((list) => {
    const isOrdered = list.tagName === "OL";
    const listStyle = isOrdered ? "decimal" : "disc";
    list.style.listStyleType = listStyle;
    list.style.paddingLeft = "1rem";
  });

  return tempDiv.innerHTML;
};

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

  const contentHTML = selectedExperience
    ? processHTMLContent(selectedExperience.description)
    : "";

  return (
    <div className="relative">
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
            className="bg-slate-800 p-8 lg:p-12 rounded-lg shadow-2xl w-full max-w-5xl relative max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
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

            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 uppercase text-green-600 tracking-tight">
              {selectedExperience.position}
            </h2>
            <div className="py-6 flex flex-col justify-between lg:flex-row gap-6 lg:gap-8 items-start lg:items-center border-y border-gray-700">
              <div className="lg:flex lg:gap-6 flex flex-col">
                <p className="text-2xl font-semibold text-gray-400 bg-gray-900 px-5 py-2 rounded-full w-fit">
                  {selectedExperience.place}
                </p>
                <p className="text-xl text-gray-400 px-4 py-2 border border-gray-700 rounded-full w-fit inline-block">
                  {selectedExperience.year}
                </p>
              </div>
              <SkillImageDisplay
                skillsUsed={selectedExperience.skillsUsed}
                compact={false}
                mid={true}
                isOverlay={true}
              />
            </div>
            <div
              className="text-gray-800 leading-7 lg:leading-8 mt-6 space-y-4 custom-list"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientWorkExperience;
