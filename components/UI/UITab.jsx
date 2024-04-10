import { useTransition, useState } from "react";

const UITab = ({ name, onClick, isSelected }) => {
  const [tab, setTab] = useState("Skills");

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  const buttonStyles = isSelected
    ? "text-white border-sky-400 shadow-xl"
    : "text-[#ADB7BE] border-transparent";
  return (
    <button
      className={`${buttonStyles} px-4 tracking-wide border-b-2 rounded-sm py-2 text-xl cursor-pointer transform transition-all duration-[0.6s]`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default UITab;
