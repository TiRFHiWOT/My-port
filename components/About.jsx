"use client";
import TabButton from "./TabButton";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import html from "../public/html.png";
import css from "../public/css.png";
import js from "../public/js.png";
import nodejs from "../public/node_js.png";
import reactjs from "../public/react_js.png";
import nextjs from "../public/next_js.png";
import { motion, MotionConfig } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2">
          <Image src={html} alt="" width={40} height={40} />
          <h1>HTML</h1>
        </div>
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2">
          <Image src={css} alt="" width={40} height={40} />
          <h1>CSS</h1>
        </div>
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2">
          <Image src={js} alt="" width={40} height={40} />
          <h1>JS</h1>
        </div>
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2">
          <Image src={nodejs} alt="" width={40} height={40} />
          <h1>NODEjs</h1>
        </div>
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2 ">
          <Image src={reactjs} alt="" width={40} height={40} />
          <h1>REACTjs</h1>
        </div>
        <div className="flex flex-row shadow-lg hover:scale-105 hover:shadow-xl items-center justify-around p-2">
          <Image src={nextjs} alt="" width={40} height={40} />
          <h1>NEXTjs</h1>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="grid grid-cols-1">
        <li className="shadow-lg p-2">Fullstack Academy of Code</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="grid grid-cols-1">
        <li className="shadow-lg p-2">ALL OF THEM!</li>
      </ul>
    ),
  },
];

const About = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="About">
      <MotionConfig transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}>
        <div className="glass py-12 px-10 lg:px-16 my-16 rounded-e-2xl md:px-8 relative container border-y border-r border-[#334155] overflow-hidden">
          <div className="flex flex-col md:mx-12 lg:mx-0 lg:flex-row items-center">
            <div className=" flex flex-row my-10 lg:mx-10">
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between items-center border-r-4  border-orange-600 px-2"
              >
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  A
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  B
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  O
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  U
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  T
                </h1>
                <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
                  M
                </h1>
                <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
                  E
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mx-4"
              >
                <p className=" text-xs md:text-sm text-white mb-5 lg:w-[80%] leading-5 lg:leading-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
                  tempora id inventore impedit illum dicta quis nisi incidunt
                  dolore quam, labore similique praesentium quidem libero
                  eligendi in nemo. Nostrum, accusamus fugiat minus quod, vitae
                  iure quisquam illum corporis esse temporibus nihil sequi neque
                  aut tenetur at. Necessitatibus quas quaerat atque.
                </p>
                <p className=" text-xs md:text-sm text-white mb-5 lg:w-[80%] leading-5 lg:leading-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
                  tempora id inventore impedit illum dicta quis nisi incidunt
                  dolore quam, labore similique praesentium quidem libero
                  eligendi in nemo. Nostrum, accusamus fugiat minus quod, vitae
                  iure quisquam illum corporis esse temporibus nihil sequi neque
                  aut tenetur at.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col p-2 bg-slate-700 shadow-xl rounded-lg relative min-h-[290px]"
            >
              <div className="flex flex-row justify-center bg-slate-800 pt-3">
                <TabButton
                  selectTab={() => handleTabChange("skills")}
                  active={tab === "skills"}
                >
                  {" "}
                  SKILL{" "}
                </TabButton>
                <TabButton
                  selectTab={() => handleTabChange("education")}
                  active={tab === "education"}
                >
                  {" "}
                  EDUCATION{" "}
                </TabButton>
                <TabButton
                  selectTab={() => handleTabChange("certifications")}
                  active={tab === "certifications"}
                >
                  {" "}
                  CERTIFICATION{" "}
                </TabButton>
              </div>
              <div className="mt-3 bg-slate-800">
                {TAB_DATA.find((t) => t.id === tab).content}
              </div>
            </motion.div>
          </div>
          <div className=" h-[100px] w-[100px] rounded-full bg-slate-700 absolute shadow-lg top-[-3rem] right-[-2rem] -z-10 opacity-50"></div>
          <div className=" h-[50px] w-[50px] rounded-full bg-slate-700 absolute shadow-lg top-[4rem] right-[30rem] -z-10 opacity-50"></div>
        </div>
      </MotionConfig>
    </section>
  );
};

export default About;
