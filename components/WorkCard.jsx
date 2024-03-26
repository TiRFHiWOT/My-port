import React from "react";

const WorkCard = ({ title, place, description }) => {
  return (
    <section>
      <div
        className="text-xs md:text-sm bg-slate-900 rounded-lg shadow-lg px-4 pt-3 pb-4 border-b-4 border-[#334155] bg-opacity-80 lg:h-[20rem] 
      hover:scale-105 hover:border-b-orange-700 w-[15rem] lg:w-[25rem] border mr-10 transform transition-all duration-[0.5s] "
      >
        <div className="pb-5">
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
          <p className="text-sm tracking-[0.15rem] pt-2 text-gray-400 font-semibold">
            {place}
          </p>
        </div>
        <div>
          {" "}
          <ul className="list-disc pl-5">
            <li className="text-xs text-slate-300 leading-6 lg:leading-7">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              architecto quod!
            </li>
            <li className="text-xs text-slate-300 leading-6 lg:leading-7">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              architecto quod!
            </li>
            <li className="text-xs text-slate-300 leading-6 lg:leading-7">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              architecto quod!
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkCard;
