import React from "react";
import { convertFromRaw, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import SkillImageDisplay from "../Main/imageDisplay";
import parse from "html-react-parser";

type WorkCardProps = {
  position: string;
  place: string;
  year: string;
  skillsUsed: string[];
  description: string;
  onClick: () => void;
};

// Helper function to truncate text to a specified number of words
const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const WorkCard: React.FC<WorkCardProps> = ({
  position,
  place,
  year,
  skillsUsed,
  description,
  onClick,
}) => {
  // Convert raw description to ContentState
  let contentState = ContentState.createFromText("");
  if (description) {
    try {
      contentState = convertFromRaw(JSON.parse(description));
    } catch (error) {
      console.error("Error converting raw content:", error);
    }
  }

  // Convert ContentState to HTML
  const contentHTML = convertToHTML({
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

  return (
    <section>
      <div
        className="relative text-xs md:text-sm bg-slate-900 rounded-lg shadow-lg px-4 pt-3 pb-4 border-b-4 border-[#334155] bg-opacity-80 lg:h-full
        hover:scale-105 hover:border-b-green-700 w-[20rem] lg:w-[25rem] border mr-10 transform transition-all duration-[0.5s] group"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 uppercase group-hover:text-green-500">
            {position}
          </h1>
          <div className="py-2 flex justify-between">
            <div className="min-w-fit">
              <p className="text-xl tracking-[0.15rem] py-1 px-4 mt-1 text-gray-400 font-semibold bg-slate-800 rounded-full w-fit">
                {place}
              </p>
              <p className="text-base tracking-widest text-gray-300 py-2 px-4">
                {year}
              </p>
            </div>
            <div className="absolute top-[65px] right-[17px]">
              <SkillImageDisplay skillsUsed={skillsUsed} compact={true} />
            </div>
          </div>
        </div>
        <div>
          <div className="ml-4 py-1 text-slate-300 leading-6 lg:leading-7">
            {parse(contentHTML, {
              replace: (domNode) => {
                if (domNode.type === "tag" && domNode.name === "li") {
                  const text = domNode.children
                    .map((child) => child.data || "")
                    .join("");
                  const truncatedText = truncateText(text, 11);
                  return <li className="list-disc ">{truncatedText}</li>;
                }
              },
            })}
          </div>
        </div>
        <button
          onClick={onClick}
          className="absolute bottom-4 right-4 text-sm text-white bg-green-600 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          More
        </button>
      </div>
    </section>
  );
};

export default WorkCard;
