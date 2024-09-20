import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Image from "next/image";

type SkillImageDisplayProps = {
  skillsUsed: string;
  compact?: boolean;
  mid?: boolean;
  isOverlay?: boolean;
};

const SkillImageDisplay: React.FC<SkillImageDisplayProps> = ({
  skillsUsed,
  compact = false,
  mid = false,
  isOverlay = false,
}) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [matchingSkillImages, setMatchingSkillImages] = useState<
    { image: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const skillsCollection = collection(db, "skills");
      const skillsSnapshot = await getDocs(skillsCollection);
      const skillsData = skillsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData);

      const skillNames = skillsUsed
        .split(",")
        .map((skill) => skill.trim().toLowerCase());

      const images = skillNames
        .map((skillName) => {
          const matchingSkill = skillsData.find(
            (skill) => skill.name.toLowerCase() === skillName
          );
          return matchingSkill
            ? { image: matchingSkill.image, name: matchingSkill.name }
            : null;
        })
        .filter((skill) => skill !== null);

      setMatchingSkillImages(images as { image: string; name: string }[]);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skillsUsed) {
      fetchSkills();
    }
  }, [skillsUsed]);

  const renderImage = (
    { image, name }: { image: string; name: string },
    index: number
  ) => (
    <div
      key={index}
      className={`relative ${
        compact ? "w-10 h-10" : mid ? "w-14 h-14" : "w-20 h-20"
      } group`}
    >
      <Image
        src={image}
        alt={`Skill image ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded"
      />
      <div
        className={`absolute inset-0 lowercase flex items-center justify-center bg-red-600 text-white text-xs 
          font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 rounded text-center ${
            compact ? "text-xs" : "text-sm"
          }`}
      >
        {name}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 w-full">
        <div
          className={`w-${compact ? "8" : "16"} h-${
            compact ? "8" : "16"
          } border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
        />
      </div>
    );
  }

  const displayedImages = isOverlay
    ? matchingSkillImages
    : matchingSkillImages.slice(0, 3);

  {
  }

  return (
    <div
      className={`flex flex-wrap gap-2 ${
        compact ? "w-fit" : mid ? "w-fit" : "w-full mb-4"
      }
       p-2 shadow-lg rounded-md border bg-[#181f29] border-gray-700`}
    >
      {matchingSkillImages.length ? (
        <>{displayedImages.map((skill, index) => renderImage(skill, index))}</>
      ) : (
        <div
          className={`relative ${
            compact ? "w-10 h-10" : mid ? "w-14 h-14" : "w-20 h-20"
          } flex justify-center items-center border-2 border-gray-400 border-dashed rounded-lg`}
        >
          <span className="text-gray-400 text-xs text-center">No skills</span>
        </div>
      )}
    </div>
  );
};

export default SkillImageDisplay;
