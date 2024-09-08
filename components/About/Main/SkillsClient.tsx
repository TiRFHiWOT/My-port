"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills } from "@/store/slice/skillsSlice";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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

  // Group skills by category
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
          <RotatingLines width="50" />
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-2">No skills available.</div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="border-b border-gray-700">
              <button
                className="w-full text-left py-4 px-4 bg-gray-800 text-gray-200 rounded-t-md hover:bg-gray-700 focus:outline-none  flex items-center justify-between"
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
              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  activeCategory === category ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4 bg-gray-700">
                  {skills.map((item) => (
                    <li
                      key={item.id}
                      className="shadow-lg text-center hover:shadow-xl p-3 border border-[#334155] bg-gray-800 rounded-xl flex flex-col items-center justify-around transition-transform hover:scale-105"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded mb-2"
                      />
                      <div>{item.name}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsListClient;
