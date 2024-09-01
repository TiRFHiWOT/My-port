// SkillsDropdown.tsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Image from "next/image";

type Skill = {
  id: string;
  name: string;
  image: string;
};

type SkillsDropdownProps = {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
};

const SkillsDropdown: React.FC<SkillsDropdownProps> = ({
  selectedSkills,
  onChange,
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollection);
        const skillsData = skillsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Skill[];
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    onChange(selectedOptions);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <select
        multiple
        value={selectedSkills}
        onChange={handleSkillChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600 appearance-none"
      >
        {skills.map((skill) => (
          <option
            key={skill.id}
            value={skill.name}
            className="flex items-center"
          >
            <div className="flex items-center">
              <Image
                src={skill.image}
                alt={skill.name}
                width={24}
                height={24}
                className="rounded mr-2"
              />
              <span>{skill.name}</span>
            </div>
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SkillsDropdown;
