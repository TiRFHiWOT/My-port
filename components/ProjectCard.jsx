import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, previewUrl, gitUrl }) => {
  return (
    <div className="group transform translate duration-300 hover:scale-105 hover:shadow-xl">
      <div
        className="h-48 md:h-64 rounded-t-xl"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#212529fb] 
        opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex justify-center items-center"
        >
          <Link
            href={gitUrl}
            className="w-14 h-14 mr-6 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <CodeBracketIcon className="w-10 h-10 text-slate-400 group-hover/link:text-white cursor-pointer" />
          </Link>
          <Link
            href={previewUrl}
            className="w-14 h-14 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <EyeIcon className="w-10 h-10 text-slate-400 group-hover/link:text-white cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="rounded-b-xl bg-[#181c206b] px-3 pb-3 pt-2">
        <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
          {title}
        </h1>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
