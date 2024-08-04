import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface ProjectCardProps {
  title: string;
  description: string;
  previewUrl?: string;
  gitUrl?: string;
  imgOne: string;
  imgTwo: string;
  imgThree: string;
  imgFour: string;
  imgFive: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = [imgOne, imgTwo, imgThree, imgFour, imgFive];
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [imgOne, imgTwo, imgThree, imgFour, imgFive]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="group border-2 lg:rounded-3xl md:rounded-2xl rounded-xl overflow-hidden border-[#334155] text-white transform translate duration-300"
    >
      {!imagesLoaded ? (
        <div className="flex justify-center items-center h-52 md:h-72 bg-gray-800">
          <ClipLoader size={50} color={"#ffffff"} />
        </div>
      ) : (
        <div className="h-52 md:h-72 relative group">
          <div
            className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] z-40"
            style={{ background: `url(${imgFive})`, backgroundSize: "cover" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[2s] z-30"
            style={{ background: `url(${imgFour})`, backgroundSize: "cover" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[4s] z-20"
            style={{ background: `url(${imgThree})`, backgroundSize: "cover" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 transform transition-all duration-[1s] delay-[6s] z-10"
            style={{ background: `url(${imgTwo})`, backgroundSize: "cover" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{ background: `url(${imgOne})`, backgroundSize: "cover" }}
          ></div>
          {gitUrl && previewUrl && (
            <div className="z-50 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[140px] md:w-[180px] h-[65px] md:h-[75px] bg-[#212529] group-hover:shadow-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex justify-center items-center">
              <Link
                href={gitUrl}
                target="_blank"
                className="w-12 md:w-14 h-12 md:h-14 mr-6 md:mr-12 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
              >
                <CodeBracketIcon className="w-8 h-8 text-slate-400 group-hover/link:text-white cursor-pointer" />
                <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl">
                  Github
                </span>
              </Link>

              <Link
                href={previewUrl}
                target="_blank"
                className="w-12 md:w-14 h-12 md:h-14 rounded-full border-2 relative border-slate-400 hover:border-white hover:text-white flex justify-center items-center group/link"
              >
                <EyeIcon className="w-8 h-8 text-slate-400 group-hover/link:text-white cursor-pointer" />
                <span className="hidden group-hover/link:flex text-gray-400 bg-black py-2 px-4 absolute -top-12 rounded-xl transform transition-all duration-[1s]">
                  Vercel
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
      <div className="bg-gray-900 px-4 pb-3 pt-2 flex flex-row justify-between">
        <div>
          <h1 className="text-lg font-semibold mb-2 border-l-4 border-orange-600 pl-2">
            {title}
          </h1>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        {!gitUrl && !previewUrl && (
          <div className="hidden group-hover:flex text-cyan-400">
            <h1>PRIVATE</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
