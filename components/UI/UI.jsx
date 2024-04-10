"use client";
import TestimonialUI from "./TestimonialUI";
import Login from "./Login";
import LogUp from "./LogUp";
import SkillsUI from "./SkillsUI";
import FileUpload from "./FileUpload";
import UITabList from "./UITabList";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/firebase";

const UI = () => {
  return (
    <section>
      <div className="grid grid-cols-12 grid-flow-row mx-5 mt-24 p-2 bg-[#374353] gap-2">
        <div className="col-span-2 flex flex-col space-y-5 rounded-sm bg-[#334155]">
          <UITabList />
          <FileUpload />
        </div>
        <div className=" col-span-10 bg-[#222a35] p-2 flex flex-col space-y-2 rounded-sm">
          <SkillsUI />
          <TestimonialUI />
        </div>
      </div>
    </section>
  );
};

export default UI;
