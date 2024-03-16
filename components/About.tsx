"use client";
import React, { Children, useState, useTransition } from "react";
import computer from "../public/computer.jpg";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  { title: "skills", id: "skills", content: <ul>GOOD</ul> },
  { title: "education", id: "education", content: <ul>Luck</ul> },
  { title: "certifications", id: "certifications", content: <ul>Chuck</ul> },
];

const About = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = ({ id }: any) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section>
      <div className="md:grid md:grid-cols-2 items-center flex justify-center py-4 px-8 sm:py-16 xl:px-16">
        <Image
          src={computer}
          alt="hero image"
          width={450}
          height={450}
          className=" border-2 rounded-lg border-sky-600"
        />
        <div className="">
          <h1 className="text-4xl mb-4 font-semibold">About Me</h1>
          <p className=" w-[80%] text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
            tempora id inventore impedit illum dicta quis nisi incidunt dolore
            quam, labore similique praesentium quidem libero eligendi in nemo.
            Nostrum, accusamus fugiat minus quod, vitae iure quisquam illum
            corporis esse temporibus nihil sequi neque aut tenetur at.
            Necessitatibus quas quaerat atque.
          </p>

          <div className="flex flex-row mt-8">
            <TabButton
              active={tab == "skills"}
              selectTab={() => handleTabChange({ id: "skills" })}
            >
              Skills
            </TabButton>
            <TabButton
              active={tab == "education"}
              selectTab={() => handleTabChange({ id: "education" })}
            >
              Education
            </TabButton>
            <TabButton
              active={tab == "certifications"}
              selectTab={() => handleTabChange({ id: "certifications" })}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
