import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";

type SkillImageDisplayProps = {
  skillsUsed: string;
  compact?: boolean;
};

const SkillImageDisplay: React.FC<SkillImageDisplayProps> = ({
  skillsUsed,
  compact = false,
}) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [matchingSkillImages, setMatchingSkillImages] = useState<
    { image: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      className={`relative ${compact ? "w-10 h-10" : "w-24 h-24"} group`}
    >
      <Image
        src={image}
        alt={`Skill image ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded"
      />
      <div
        className={`absolute inset-0 flex text-center lowercase items-center justify-center fon bg-black bg-opacity-80 text-white text-xs font-semibold opacity-0 ${
          isHovered ? "hover:opacity-100" : "opacity-0"
        } ${
          compact ? "flex" : "hidden"
        } transition-opacity duration-300 rounded`}
      >
        {name}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div
          className={`w-${compact ? "8" : "16"} h-${
            compact ? "8" : "16"
          } border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
        />
      </div>
    );
  }

  const displayedImages = showAll
    ? matchingSkillImages
    : matchingSkillImages.slice(0, 3);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAll(!showAll);
  };

  return (
    <div
      className={`flex ${
        compact ? "flex-wrap gap-3" : "flex-row space-x-5"
      } p-2 shadow-lg rounded-md mb-4 border bg-[#181f29] border-gray-700 relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayedImages.length ? (
        <>
          {displayedImages.map((skill, index) => renderImage(skill, index))}
          {matchingSkillImages.length > 5 && (
            <div
              onClick={handleIconClick}
              className={`${
                compact ? "w-10 h-10" : "w-24 h-24"
              } flex justify-center items-center cursor-pointer border border-dashed border-gray-500 rounded-lg transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white`}
            >
              <div
                className="flex items-center justify-center w-full h-full bg-gray-700 rounded-full hover:bg-gray-600"
                onMouseEnter={() => setIsHovered(false)}
              >
                {showAll ? (
                  <FiMinus size={compact ? 20 : 30} className="text-white" />
                ) : (
                  <FiPlus size={compact ? 20 : 30} className="text-white" />
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className={`relative ${
            compact ? "w-12 h-12" : "w-24 h-24"
          } flex justify-center items-center border-2 border-gray-400 border-dashed rounded-lg`}
        >
          <span className="text-gray-400 text-xs">
            {compact ? "No Img" : "No Image"}
          </span>
        </div>
      )}
    </div>
  );
};

export default SkillImageDisplay;
