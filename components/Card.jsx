"use client";
import Slides from "@/components/slides";
import { motion } from "framer-motion";
import one from "../public/one.png";
import two from "../public/two.png";
import three from "../public/three.png";
import four from "../public/four.png";
import five from "../public/five.png";

const CardOne = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group border-2 border-[#33415579] hover:rounded-none text-white transform translate duration-300 bg-slate-500 p-10 flex justify-center mt-10"
    >
      <div className="flex justify-center items-center mt-10">
        <Slides />
      </div>
    </motion.div>
  );
};

export default CardOne;
