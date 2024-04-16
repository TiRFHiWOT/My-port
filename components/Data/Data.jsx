"use client";
import { useState, useEffect } from "react";
import SkillData from "@/components/Data/SkillData";
import EducationData from "@/components/Data/EducationData";
import ProjectsData from "@/components/Data/ProjectsData";
import ExperienceData from "@/components/Data/ExperienceData";
import TestimonialData from "@/components/Data/TestimonialData";
import useAuthMiddleware from "@/lib/middleWare";

const CollectionData = () => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("skillData");
  const [loadingComponents, setLoadingComponents] = useState(true);

  const { loading, logout } = useAuthMiddleware();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingComponents(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const Spinner = () => (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );

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
      component: <ProjectsData />,
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
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-extrabold tracking-wider">
            Data Collection
          </h1>
          <div className="w-[10%] ">
            <button
              onClick={logout}
              className="rounded-lg text-sm text-white bg-[#435670] hover:text-sky-500 hover:border-sky-500 px-4 py-2 border-2 border-[#4d5c70] backdrop-blur shadow-xl"
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="flex flex-row p-2 m-2 space-x-2 rounded-sm">
          {loadingComponents && <Spinner />}
          <div
            className="flex flex-col space-y-2 border p-2 bg-[#334155cb] border-[#3e4e63] justify-between "
            role="tablist"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentSelectedTab(item.id);
                }}
                className={`p-4 font-bold text-xl text-white w-full border-2 rounded-ss-3xl rounded-md shadow-2xl border-[#566b8a] hover:bg-[#324866] ${
                  currentSelectedTab === item.id ? "bg-[#324866]" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex w-full h-[80vh] overflow-y-auto skills-bar">
            <div className="w-full">
              {loadingComponents ? (
                <div>Loading contents...</div>
              ) : (
                menuItems.map(
                  (item) => item.id === currentSelectedTab && item.component
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionData;
