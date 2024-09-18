"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills } from "@/store/slice/skillsSlice";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  image: string;
  category: string;
}

interface SkillsState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  skills: SkillsState;
}

const SkillsListClient = () => {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state: RootState) => state.skills);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSkills() as any);
  }, [dispatch]);

  const groupSkillsByCategory = (skills: Skill[]) => {
    return skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  };

  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <div className="text-gray-300">
      {loading ? (
        <div className="flex justify-center items-center h-[22rem]">
          <RotatingLines width="60" strokeColor="#60a5fa" />
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-2">No skills available.</div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="border-b border-gray-700"
            >
              <button
                className="w-full text-left py-4 px-4 bg-gray-800 text-gray-200 rounded-t-md hover:bg-gray-700 focus:outline-none flex items-center justify-between"
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category ? null : category
                  )
                }
                aria-expanded={activeCategory === category}
              >
                {category}
                {activeCategory === category ? (
                  <FiChevronUp className="text-gray-400" />
                ) : (
                  <FiChevronDown className="text-gray-400" />
                )}
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: activeCategory === category ? "auto" : 0,
                  opacity: activeCategory === category ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`overflow-hidden`}
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-700">
                  {skills.map((item) => (
                    <motion.li
                      key={item.id}
                      className="shadow-lg text-center hover:shadow-xl p-3 border border-[#334155] bg-gray-800 rounded-xl flex flex-col items-center justify-around transition-transform hover:scale-105"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 120,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded mb-2"
                      />
                      <div className="text-white capitalize">{item.name}</div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsListClient;
