"use client";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Slides from "@/components/slides";

const ProjectCard = ({
  title,
  description,
  previewUrl,
  gitUrl,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group border-2 border-[#33415579] hover:rounded-none text-white transform translate duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-72 group">
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] z-40"
          style={{ background: `url(${imgOne})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[2s] z-30"
          style={{ background: `url(${imgTwo})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[4s] z-20"
          style={{ background: `url(${imgThree})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[6s] z-10"
          style={{ background: `url(${imgFour})`, backgroundSize: "cover" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ background: `url(${imgFive})`, backgroundSize: "cover" }}
        ></div>
        <div className="z-50 absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[180px] h-[75px] bg-[#212529] group-hover:shadow-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex justify-center items-center">
          <Link
            href={gitUrl}
            className="w-14 h-14 mr-12 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <CodeBracketIcon className="w-8 h-8 text-slate-400 group-hover/link:text-white cursor-pointer" />
            <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl">
              Github
            </span>
          </Link>

          <Link
            href={previewUrl}
            className="w-14 h-14 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
          >
            <EyeIcon className="w-8 h-8 text-slate-400 group-hover/link:text-white cursor-pointer" />
            <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl transform transition-all duration-[1s]">
              Vercel
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-[#11161d] px-3 pb-3 pt-2">
        <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
          {title}
        </h1>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
