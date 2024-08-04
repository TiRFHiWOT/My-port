const TestimonialCard = ({ comment, userName, position, imgUrl }: any) => {
  const wordLimit = (comment: any) => {
    const words = comment.split(" ");
    if (words.length > 11) {
      return words.slice(0, 11).join(" ") + "...";
    }
    return comment;
  };

  return (
    <section>
      <div
        className="flex flex-col p-5 lg:p-10 bg-slate-850 border hover:shadow-xl border-gray-700 rounded-lg hover:-translate-y-4 
      transform transition-all duration-[0.5s] group bg-slate-900"
      >
        <h1 className="text-7xl">{`"`}</h1>
        <div className="text-sm mb-10 text-gray-400 tracking-wider font-semibold h-[85px]">
          {wordLimit(comment)}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className=" font-bold">@{userName}</h1>
            <p className="text-xs text-gray-400 mt-2 font-semibold">
              {position}
            </p>
          </div>
          {imgUrl && (
            <div
              className="rounded-full w-[50px] h-[50px] transform transition-all duration-[0.5s]"
              style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
