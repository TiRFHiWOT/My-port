"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TestimonialCard = ({ comment, userName, postion, imgUrl }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col p-5 lg:p-10 bg-slate-850 border hover:shadow-xl border-[#334155] rounded-lg hover:scale-105 transform transition duration-[0.5s]">
        <h1 className="text-7xl">{`"`}</h1>
        <p className="text-sm mb-10 text-gray-400">{comment}</p>
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col">
            <h1>{userName}</h1>
            <p className="text-xs text-gray-400 mt-2">{postion}</p>
          </div>
          <Image
            src={imgUrl}
            alt="face"
            width={40}
            height={40}
            className="border rounded-full border-[#334155]"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialCard;
