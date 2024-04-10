import React from "react";
import Image from "next/image";

const SkillsCard = ({ skillName, imgUrl }) => {
  return (
    <div className="flex flex-row shadow-lg hover:scale-110 hover:shadow-xl items-center justify-around p-2 border border-[#334155]">
      <Image src={imgUrl} alt="skill" width={40} height={40} />
      <h1>{skillName}</h1>
    </div>
  );
};

export default SkillsCard;
