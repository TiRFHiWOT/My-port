import SkillImageDisplay from "../Main/imageDisplay";

const WorkCard = ({
  position,
  place,
  year,
  skillsUsed,
  pointOne,
  pointTwo,
  pointThree,
}: any) => {
  const wordLimit = (comment: string) => {
    const words = comment.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return comment;
  };

  return (
    <section>
      <div
        className=" relative text-xs md:text-sm bg-slate-900 rounded-lg shadow-lg px-4 pt-3 pb-4 border-b-4 border-[#334155] bg-opacity-80 lg:h-full
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
              <p className=" text-base tracking-widest text-gray-300 py-2 px-4">
                {year}
              </p>
            </div>
            <div className=" absolute top-[65px] right-[17px]">
              <SkillImageDisplay skillsUsed={skillsUsed} compact={true} />
            </div>
          </div>
        </div>
        <div>
          <ul className="list-disc pl-5">
            <li className="text text-slate-300 leading-6 lg:leading-7">
              {wordLimit(pointOne)}
            </li>
            <li className="text text-slate-300 leading-6 lg:leading-7">
              {wordLimit(pointTwo)}
            </li>
            <li className="text text-slate-300 leading-6 lg:leading-7">
              {wordLimit(pointThree)}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkCard;
