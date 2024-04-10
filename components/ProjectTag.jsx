const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white bg-orange-800 border-2 border-[#334155]"
    : "bg-[#1e2842] text-[#ADB7BE] border-2 border-[#334155] hover:text-white";
  return (
    <button
      className={`${buttonStyles} px-4 py-2 w-28 ml-1 rounded-md text-lg cursor-pointer transform transition-all duration-[0.6s]`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
