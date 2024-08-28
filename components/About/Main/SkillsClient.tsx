"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills } from "@/store/slice/skillsSlice";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  image: string;
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

  useEffect(() => {
    dispatch(fetchSkills() as any);
  }, [dispatch]);

  return (
    <div className="text-gray-300">
      {loading ? (
        <div className="flex justify-center items-center h-[15rem]">
          <RotatingLines width="50" />
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-4">No skills available.</div>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {skills.map((item) => (
            <li
              key={item.id}
              className="shadow-lg  text-center hover:shadow-xl py-2 mr-1 px-3 border border-[#334155] bg-gray-800 rounded-xl flex items-center justify-around transition hover:scale-105"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded mr-2"
              />
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsListClient;
