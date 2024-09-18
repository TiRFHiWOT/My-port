import React from "react";
import SkillImageDisplay from "../Main/imageDisplay";
import { FaClock } from "react-icons/fa";

type WorkCardProps = {
  position: string;
  place: string;
  year: string;
  skillsUsed: string[];
  description: string;
  onClick: () => void;
};

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const processHTMLContent = (html: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const lists = tempDiv.querySelectorAll("ol, ul");

  lists.forEach((list) => {
    const items = list.querySelectorAll("li");

    items.forEach((item) => {
      const truncatedText = truncateText(item.textContent || "", 15);
      item.innerHTML = truncatedText;
    });

    if (items.length > 3) {
      items.forEach((item, index) => {
        if (index >= 3) {
          item.style.display = "none";
        }
      });
    }

    const isOrdered = list.tagName === "OL";
    const listStyle = isOrdered ? "decimal" : "disc";
    list.style.listStyleType = listStyle;
    list.style.paddingLeft = "1rem";
  });

  return tempDiv.innerHTML;
};

const WorkCard: React.FC<WorkCardProps> = ({
  position,
  place,
  year,
  skillsUsed,
  description,
  onClick,
}) => {
  const contentHTML = processHTMLContent(description);

  return (
    <section>
      <div
        className="relative text-xs md:text-sm bg-slate-900 rounded-lg shadow-lg p-7 border-b-4 border-[#334155] bg-opacity-80 lg:h-full
        hover:scale-105 hover:border-b-green-700 w-[20rem] lg:w-[30rem] border mr-10 transform transition-all duration-[0.5s] group"
      >
        <div>
          <h1 className="text-2xl lg:text-2xl font-extrabold mb-2 uppercase group-hover:text-green-500">
            {position}
          </h1>
          <div className="py-2 flex flex-row justify-between items-center">
            <div className="border border-gray-700 rounded-lg w-fit flex flex-col justify-center items-center">
              <p className="text-xl tracking-[0.15rem] py-1 px-4 text-gray-400 font-semibold bg-slate-800 w-full flex flex-row">
                <span className="text-cyan-500 font-bold">@</span>
                {place}
              </p>
              <p className="text-base tracking-widest text-gray-300 py-2 px-4 ">
                {year}
              </p>
            </div>

            <SkillImageDisplay skillsUsed={skillsUsed} compact={true} />
          </div>
        </div>
        <div
          className="ml-4 py-1 text-slate-300 leading-6 lg:leading-7"
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        />
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
