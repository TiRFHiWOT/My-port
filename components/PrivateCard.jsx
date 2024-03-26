"use client";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const PrivateCard = ({ imgUrl, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group border-2 border-[#33415579] hover:rounded-none text-white transform translate duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div
        className="h-56"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      ></div>
      <div className="bg-[#11161d81] px-3 pb-3 pt-2 group-hover:rounded-none">
        <h1 className="text-lg font-semibold mb-2 border-l-4 border-yellow-300 pl-2">
          {title}
        </h1>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default PrivateCard;
