"use client";
import { useTransition, useState } from "react";
import UITab from "./UITab";

const UITabList = () => {
  const [tab, setTab] = useState("Skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };
  return (
    <section>
      <div className="text-center w-fit bg-[#334155cb] border border-[#3e4e63] rounded-md shadow-xl">
        <UITab
          isSelected={tab === "Skills"}
          name="Skills"
          onClick={handleTabChange}
        />
        <UITab
          isSelected={tab === "Experience"}
          name="Experience"
          onClick={handleTabChange}
        />
        <UITab
          isSelected={tab === "Projects"}
          name="Projects"
          onClick={handleTabChange}
        />
        <UITab
          isSelected={tab === "Testimonial"}
          name="Testimonial"
          onClick={handleTabChange}
        />
      </div>
    </section>
  );
};

export default UITabList;
