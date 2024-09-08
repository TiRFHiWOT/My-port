import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";

type Skill = {
  id: string;
  name: string;
  image: string;
  category: string;
};

const SkillsAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, loading, error } = useSelector(
    (state: RootState) => state.skillsAdmin
  );

  const [skill, setSkill] = useState<{
    name: string;
    image: string;
    category: string;
  }>({
    name: "",
    image: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showInputs, setShowInputs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSkillList, setShowSkillList] = useState(false);

  useEffect(() => {
    if (showSkillList) {
      dispatch(fetchSkills()).finally(() => {});
    }
  }, [dispatch, showSkillList]);

  const handleChange = (field: string, value: string) => {
    setSkill((prevSkill) => ({
      ...prevSkill,
      [field]: value,
    }));
  };

  const handleImageChange = (image: File) => {
    setImageFile(image);
  };

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `skills/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    if (!skill.name && !skill.image && !skill.category) {
      toast.error("Please fill in all the fields before submitting.");
      return;
    }

    try {
      let imageUrl = skill.image;

      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile);
      }

      const skillData = {
        name: skill.name,
        image: imageUrl,
        category: skill.category,
      };

      if (isUpdating && currentSkillId) {
        await dispatch(
          updateSkill({ id: currentSkillId, skill: skillData })
        ).unwrap();
        toast.success("Skill updated successfully!");
      } else {
        await dispatch(addSkill(skillData)).unwrap();
        toast.success("Skill submitted successfully!");
      }

      setSkill({ name: "", image: "", category: "" });
      setShowInputs(false);
      setIsUpdating(false);
      setCurrentSkillId(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error submitting skill: ", error);
      toast.error("Failed to submit skill");
    }
  };

  const handleEdit = (item: Skill) => {
    setSkill({ name: item.name, image: item.image, category: item.category });
    setImageFile(null);
    setIsUpdating(true);
    setShowInputs(true);
    setCurrentSkillId(item.id);
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteSkill(id)).unwrap();
      toast.success("Skill removed successfully!");
    } catch (error) {
      console.error("Error removing skill: ", error);
      toast.error("Failed to remove skill");
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
            {loading ? "" : filteredSkills.length ? "" : "No Skills Available"}
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
      <ToastContainer />
    </div>
  );
};

export default SkillsAdmin;
