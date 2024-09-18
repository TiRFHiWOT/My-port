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
  images?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  previewUrl,
  gitUrl,
  images = [],
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const validImages = images.filter(Boolean);
    const totalImages = validImages.length;
    let loadedCount = 0;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    validImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, [images]);

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
          {images.map((img, index) => {
            const delay = `${index * 2}s`;
            const zIndex = images.length - index;

            return (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full ${
                  index === images.length - 1
                    ? "opacity-100"
                    : "group-hover:opacity-0"
                } transform transition-all duration-[1000ms]`}
                style={{
                  background: `url(${img})`,
                  backgroundSize: "cover",
                  transitionDelay: delay,
                  zIndex: zIndex,
                }}
              ></div>
            );
          })}

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
          <div className="flex justify-between mb-2 items-center">
            <h1 className="text-lg font-semibold border-l-4 border-orange-600 pl-2">
              {title}
            </h1>
          </div>
          <p
            className={`text-sm text-slate-400 ${
              isExpanded ? "" : "line-clamp-1"
            }`}
          >
            {description}
          </p>
          <div className=" flex justify-between items-center mt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:underline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
            {!gitUrl && !previewUrl && (
              <div
                className={`group-hover:flex text-cyan-400 ${
                  isExpanded ? "flex" : "hidden"
                }`}
              >
                <h1>PRIVATE</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
