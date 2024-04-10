"use client";
import { useState } from "react";
import SkillData from "@/components/Data/SkillData";
import EducationData from "@/components/Data/EducationData";
import TestimonialData from "@/components/Data/TestimonialData";
import ExperienceData from "@/components/Data/ExperienceData";

const CollectionData = () => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("aboutData");

  const menuItems = [
    {
      id: "skillData",
      label: "Skill Data",
      component: <SkillData />,
    },
    {
      id: "educationData",
      label: "Education Data",
      component: <EducationData />,
    },
    {
      id: "exprienceData",
      label: "Exprience Data",
      component: <ExperienceData />,
    },
    {
      id: "projectsData",
      label: "Projects Data",
      component: <TestimonialData />,
    },
    {
      id: "testimonialData",
      label: "Testimonial Data",
      component: <TestimonialData />,
    },
  ];

  return (
    <section>
      <div className="m-5">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wider">
            Data Collection
          </h1>
        </div>
        <div className="flex flex-row p-2 m-2 space-x-2 rounded-sm">
          <div
            className="flex flex-col space-y-2 border p-2 bg-[#334155cb] border-[#3e4e63]"
            role="tablist"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentSelectedTab(item.id);
                }}
                className="p-4 font-bold text-xl text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex h-[80vh] overflow-y-auto skills-bar">
            <div className="w-full">
              {menuItems.map(
                (item) => item.id === currentSelectedTab && item.component
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionData;
