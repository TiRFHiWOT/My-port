"use client";
import About from "@/components/admin/About";
import Experience from "@/components/admin/Experience";
import Projects from "@/components/admin/Projects";
import Testimonial from "@/components/admin/Testimonial";
import { useState } from "react";

const Dashboard = () => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("about");

  const menuItems = [
    {
      id: "about",
      label: "About",
      component: <About />,
    },
    {
      id: "experience",
      label: "Experience",
      component: <Experience />,
    },
    {
      id: "projects",
      label: "Projects",
      component: <Projects />,
    },
    {
      id: "testimonial",
      label: "Testimonial",
      component: <Testimonial />,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-5 gap-2 p-2 m-2 rounded-sm bg-[#374353] min-h-[280px]">
        <div
          className="flex flex-col h-fit justify-center space-y-2 border p-2 bg-[#334155cb] border-[#3e4e63] col-span-1"
          role="tablist"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentSelectedTab(item.id);
              }}
              className="p-4 font-bold text-xl text-white border-2 border-[#4a5e79] rounded-s-full hover:scale-105 hover:shadow-lg"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-span-4 flex items-center">
          <div className="w-full">
            {menuItems.map(
              (item) => item.id === currentSelectedTab && item.component
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
