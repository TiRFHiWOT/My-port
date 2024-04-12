"use client";
import Image from "next/image";
import About from "@/components/admin/About";
import admin from "@/public/admin.png";
import back from "@/public/back.png";
import Experience from "@/components/admin/Experience";
import Projects from "@/components/admin/Projects";
import Testimonial from "@/components/admin/Testimonial";
import { useState } from "react";
import useAuthMiddleware from "@/lib/middleWare";
const Dashboard = () => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("about");

  const { loading, logout } = useAuthMiddleware();
  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className="grid grid-cols-8 gap-2 p-2 m-2 rounded-es-full bg-[#374353] relative">
        <div
          className="flex rounded-sm flex-col h-fit justify-center space-y-2 border p-2 bg-[#334155cb] border-[#3e4e63] col-span-2"
          role="tablist"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentSelectedTab(item.id);
              }}
              className="p-4 font-bold text-xl text-white border-2 border-[#4a5e79] rounded-s-full hover:scale-105 hover:shadow-lg z-20 hover:bg-[#1c232c36]"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-span-6 flex flex-row gap-2 z-10">
          <div className="w-[90%]">
            {menuItems.map(
              (item) => item.id === currentSelectedTab && item.component
            )}
          </div>

          <div className="w-[10%] ">
            <button
              onClick={logout}
              className="rounded-lg text-sm text-slate-300 bg-[#11203596] hover:text-sky-500 px-4 py-2 border-2 border-[#6e7c9196] shadow-xl font-bold block"
            >
              Log Out
            </button>
          </div>
        </div>
        <Image
          src={admin}
          alt="admin"
          className="opacity-10 absolute left-0 top-2"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Dashboard;
