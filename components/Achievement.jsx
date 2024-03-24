import React from "react";

const achievementList = [
  {
    metric: "Projects",
    Value: "100+",
  },
  {
    metric: "Clients",
    Value: "50+",
  },
  {
    metric: "Years",
    Value: "5+",
  },
];

const Achievement = () => {
  return (
    <div className="py-6 lg:mb-6 sm:py-8  lg:px-16">
      <div className=" border-y border-[#334155] py-8 px-16 flex flex-row items-center justify-between">
        {achievementList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center px-4"
            >
              <h1 className=" text-white text-2xl lg:text-4xl font-bold">
                {achievement.Value}
              </h1>
              <p className=" text-slate-500 text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;
