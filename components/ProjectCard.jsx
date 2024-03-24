"use client";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProjectCard = ({ imgUrl, title, description, previewUrl, gitUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group border-2 border-[#33415579] hover:rounded-none text-white transform translate duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div
        className="h-32"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#212529fb] group-hover:shadow-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex justify-center items-center">
          <Link
            href={gitUrl}
            className="w-14 h-14 mr-6 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <CodeBracketIcon className="w-10 h-10 text-slate-400 group-hover/link:text-white cursor-pointer" />
            <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl">
              Github
            </span>
          </Link>

          <Link
            href={previewUrl}
            className="w-14 h-14 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <EyeIcon className="w-10 h-10 text-slate-400 group-hover/link:text-white cursor-pointer" />
            <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl transform transition-all duration-[1s]">
              Vercel
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-[#11161d81] px-3 pb-3 pt-2 group-hover:rounded-none">
        <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
          {title}
        </h1>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
