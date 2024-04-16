"use client";
import Image from "next/image";
import About from "@/components/admin/About";
import admin from "@/public/admin.png";
import Experience from "@/components/admin/Experience";
import Projects from "@/components/admin/Projects";
import Testimonial from "@/components/admin/Testimonial";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthMiddleware from "@/lib/middleWare";

const Dashboard = () => {
  const router = useRouter();
  const [currentSelectedTab, setCurrentSelectedTab] = useState("about");
  const { loading, logout } = useAuthMiddleware();

  if (loading) {
    return <div>Loading...</div>;
  }

  const goToData = () => {
    router.push("/data");
  };

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
      <div className="grid grid-cols-8 gap-2 p-2 m-2 rounded-b-full bg-[#374353] relative">
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
              className={` p-4 font-bold text-xl text-white border-2 border-[#4a5e79] rounded-s-full backdrop-blur-md
               hover:shadow-lg z-10 transform transition-all duration-500 ${
                 currentSelectedTab === item.id
                   ? "bg-[#080a0c7a] scale-105"
                   : ""
               }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-span-6 flex flex-row gap-2 z-10">
          <div className="w-full">
            {menuItems.map(
              (item) => item.id === currentSelectedTab && item.component
            )}
          </div>

          <div className=" flex flex-col">
            <button
              onClick={logout}
              className="w-[90px] rounded-lg text-sm text-white bg-[#11203596] hover:text-sky-300 hover:border-sky-500 px-4 py-2 border-2 border-slate-300 shadow-xl"
            >
              Log Out
            </button>
            <button
              onClick={goToData}
              className="py-1 mt-1 text-xs text-sky-300 hover:text-orange-400"
            >
              Go To Data
            </button>
          </div>
        </div>
        <Image
          src={admin}
          alt="admin"
          className="opacity-10 absolute -left-2 top-2 pointer-events-none"
          width={500}
          height={500}
        />
        <div className=" absolute opacity-10 right-10 top-[25rem] w-40 h-40 rounded-full bg-red-700"></div>
        <div className=" absolute opacity-15 right-2 top-[19rem] w-20 h-20 rounded-full bg-red-700"></div>
        <div className=" absolute opacity-20 right-1 top-[15rem] w-10 h-10 rounded-full bg-red-700"></div>
      </div>
    </section>
  );
};

export default Dashboard;
