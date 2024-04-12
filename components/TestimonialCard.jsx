"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { motion } from "framer-motion";
import { listAll, getDownloadURL, ref } from "firebase/storage";

const TestimonialCard = ({ comment, userName, position, imgUrl }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col p-5 lg:p-10 bg-slate-850 border hover:shadow-xl border-[#334155] rounded-lg hover:scale-105 transform transition-all duration-[0.5s] group">
        <h1 className="text-7xl">{`"`}</h1>
        <div className="text-sm mb-10 text-gray-400 tracking-wider font-semibold">
          {comment}
        </div>
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col">
            <h1 className=" font-bold">@{userName}</h1>
            <p className="text-xs text-gray-400 mt-2 font-semibold">
              {position}
            </p>
          </div>
          <div
            className="rounded-full group-hover:border-b-2 border-gray-700 w-[50px] h-[50px] transform transition-all duration-[0.5s]"
            style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
          ></div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialCard;
