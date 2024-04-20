import { useState } from "react";

const ProjectTag = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleSelect = (option, index) => {
    setSelectedOption(option);
    onSelect(option);
    setSliderPosition(index);
  };

  return (
    <div className="relative">
      <div className="flex">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleSelect(option, index)}
            className={`${
              selectedOption === option
                ? "text-white"
                : "bg-[#1e2842] text-[#ADB7BE] hover:text-white"
            } px-4 py-2 w-28 text-lg cursor-pointer transition-all duration-300`}
            style={{
              zIndex: selectedOption === option ? 1 : 0,
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={`absolute h-2 bg-yellow-600 transition-all duration-300 ${
          selectedOption === "ALL"
            ? "rounded-l-full"
            : selectedOption === "PRIVATE"
            ? "rounded-r-full"
            : ""
        }`}
        style={{
          left: `${(100 / options.length) * sliderPosition}%`,
          bottom: "0",
          height: "100%",
          width: `calc(100% / ${options.length})`,
          transition: "left 0.5s ease, right 0.5s ease, width 0.5s ease",
        }}
      />
    </div>
  );
};

export default ProjectTag;
