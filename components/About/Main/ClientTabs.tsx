"use client";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TabButton from "./TabButton";
import EducationTab from "@/components/About/Main/EducationTab";
import SkillsTab from "@/components/About/Main/SkillsTab";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "@/store/slice/aboutTabSlice";

interface TabData {
  title: string;
  id: string;
  content: JSX.Element;
}

const ClientTabs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const dispatch = useDispatch();
  const selectedTab = useSelector(
    (state: { tab: { selectedTab: string } }) => state.tab.selectedTab
  );

  const TAB_DATA: TabData[] = [
    {
      title: "Skills",
      id: "skills",
      content: <SkillsTab />,
    },
    {
      title: "Education",
      id: "education",
      content: <EducationTab />,
    },
  ];

  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      dispatch(setTab(id));
    });
  };

  const selectedTabData = TAB_DATA.find((t) => t.id === selectedTab);

  return (
    <div className="flex justify-around items-center ">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
        className="flex flex-col p-2 bg-slate-700 shadow-xl rounded-lg relative w-[30rem] md:w-[35rem] lg:w-[40rem] h-[30rem]"
      >
        <div className="flex flex-row justify-around bg-slate-800 pt-3 rounded-md">
          <TabButton
            selectTab={() => handleTabChange("skills")}
            active={selectedTab === "skills"}
          >
            TOP SKILLS
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("education")}
            active={selectedTab === "education"}
          >
            EDUCATION
          </TabButton>
        </div>
        <div className="skills-bar mt-2 rounded-md bg-slate-800 h-full overflow-y-auto overflow-x-hidden w-full">
          {selectedTabData ? selectedTabData.content : ""}
        </div>
      </motion.div>
      <div className="absolute right-[6%] top-[50%] translate-y-[-50%] flex justify-center items-center"></div>
    </div>
  );
};

export default ClientTabs;
