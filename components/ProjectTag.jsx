import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white bg-orange-800 border-2 border-[#334155]"
    : "bg-[#1e2842] text-[#ADB7BE] border-2 border-[#334155] hover:text-white";
  return (
    <button
      className={`${buttonStyles} px-6 py-3 w-32 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
