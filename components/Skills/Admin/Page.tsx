"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "@/store/slice/skillsAdminSlice";
import SkillsForm from "@/components/Skills/Admin/Form";
import SkillItem from "@/components/Skills/Admin/Output";
import Spinner from "@/components/Spinner/Spinner";

type Skill = {
  id: string;
  name: string;
  image: string;
};

const SkillsAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, loading, error } = useSelector(
    (state: RootState) => state.skillsAdmin
  );

  const [skill, setSkill] = useState<{ name: string; image: string }>({
    name: "",
    image: "",
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [warning, setWarning] = useState("");
  const [showSkillList, setShowSkillList] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (showSkillList) {
      setIsFetching(true);
      dispatch(fetchSkills()).finally(() => {
        setIsFetching(false);
      });
    }
  }, [dispatch, showSkillList]);

  const handleChange = (field: string, value: string) => {
    setSkill((prevSkill) => ({
      ...prevSkill,
      [field]: value,
    }));
  };

  const handleImageChange = (image: File) => {
    setSkill((prevSkill) => ({
      ...prevSkill,
      image: URL.createObjectURL(image),
    }));
  };

  const handleSubmit = async (imageFile: File) => {
    if (!skill.name || !imageFile) {
      setWarning("Please fill in all fields before submitting.");
      return;
    }
    setWarning("");
    try {
      const skillData = { name: skill.name, image: skill.image };

      if (isUpdating && currentSkillId) {
        await dispatch(
          updateSkill({ id: currentSkillId, skill: skillData })
        ).unwrap();
        alert("Skill updated successfully!");
      } else {
        await dispatch(addSkill(skillData)).unwrap();
        alert("Skill submitted successfully!");
      }
      setSkill({ name: "", image: "" });
      setShowInputs(false);
      setIsUpdating(false);
      setCurrentSkillId(null);
    } catch (error) {
      console.error("Error submitting skill: ", error);
      alert("Failed to submit skill");
    }
  };

  const handleEdit = (item: Skill) => {
    setSkill({ name: item.name, image: item.image });
    setIsUpdating(true);
    setShowInputs(true);
    setCurrentSkillId(item.id);
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteSkill(id)).unwrap();
      alert("Skill removed successfully!");
    } catch (error) {
      console.error("Error removing skill: ", error);
      alert("Failed to remove skill");
    }
  };

  const filteredSkills = skills.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Skills</h2>
          {!showInputs && (
            <button
              onClick={() => setShowInputs(true)}
              className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
                showInputs ? "bg-blue-600" : ""
              }`}
            >
              Add Skill
            </button>
          )}
        </div>
        {showInputs && (
          <SkillsForm
            skill={skill}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
            warning={warning}
          />
        )}
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowSkillList(!showSkillList)}
            className={`py-2 px-4 text-gray-200 border-2 rounded-lg transition ${
              showSkillList
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {showSkillList ? "Hide Skills" : "Show Skills"}
          </button>
          {showSkillList && (
            <input
              type="text"
              className="py-2 px-4 bg-gray-800 border-2 border-gray-600 shadow-lg rounded-full placeholder-gray-500 text-gray-300"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {showSkillList && (
        <div className="max-w-4xl mx-auto p-6 mt-4 rounded-lg shadow-lg border-2 border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            {loading
              ? ""
              : filteredSkills.length
              ? "Skills"
              : "No Skills Available"}
          </h3>
          {loading ? (
            <Spinner />
          ) : (
            filteredSkills.map((item) => (
              <SkillItem
                key={item.id}
                skill={item}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsAdmin;
