import { motion } from "framer-motion";
import Image from "next/image";
import Slides from "@/components/slides";
import one from "../public/one.png";
import two from "../public/two.png";
import three from "../public/three.png";
import four from "../public/four.png";
import five from "../public/five.png";

const SlideData = [];

const PrivateCard = ({
  title,
  description,
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
      className="group border-2 border-[#33415579] text-white transform translate duration-300 hover:scale-105 hover:shadow-xl"
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
      </div>
      <div className="bg-[#11161d] px-3 pb-3 pt-2 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
            {title}
          </h1>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <div className="hidden group-hover:flex text-cyan-400">
          <h1>PRIVATE</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivateCard;
