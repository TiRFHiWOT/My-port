import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollection);
        const skillsData = skillsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Skill, "id">),
        }));
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    setInputValue(selectedSkills.join(", "));
  }, [selectedSkills]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSkillSelect = (skill: Skill) => {
    const newSelectedSkills = [...selectedSkills];
    if (!newSelectedSkills.includes(skill.name)) {
      newSelectedSkills.push(skill.name);
    }
    onChange(newSelectedSkills);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange([]);
    setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={inputValue}
        onClick={toggleDropdown}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 cursor-pointer focus:outline-none"
        placeholder="Select skills"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleDropdown}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-gray-900 backdrop-blur-lg bg-opacity-80 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-auto z-10"
        >
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <TailSpin />
            </div>
          ) : (
            <>
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center p-2 hover:bg-gray-800 border-gray-700 hover:border-y cursor-pointer"
                  onClick={() => handleSkillSelect(skill)}
                >
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="rounded mr-2"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}

              <button
                onClick={handleClear}
                className="w-full p-2 text-red-500 hover:bg-gray-800"
              >
                Clear
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsDropdown;
