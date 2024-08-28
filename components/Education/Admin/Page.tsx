import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducations,
  addEducationItem,
  updateEducation,
  removeEducation,
} from "@/store/slice/educationAdminSlice";
import EducationForm from "./Form";
import EducationItem from "./Output";
import Spinner from "@/components/Spinner/Spinner";
import { RootState } from "@/store/store";
import { AppDispatch } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Education = {
  id?: string;
  name: string;
  institution: string;
  year: string;
};

const EducationAdmin: React.FC = () => {
  const [education, setEducation] = useState<Education>({
    name: "",
    institution: "",
    year: "",
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEducationId, setCurrentEducationId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showEducationList, setShowEducationList] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const educations = useSelector(
    (state: RootState) => state.educationAdmin.educations
  );
  const loading = useSelector(
    (state: RootState) => state.educationAdmin.loading
  );
  const error = useSelector((state: RootState) => state.educationAdmin.error);

  useEffect(() => {
    dispatch(fetchEducations());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!education.name || !education.institution || !education.year) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    try {
      if (isUpdating) {
        dispatch(updateEducation({ id: currentEducationId!, education }));
        toast.success("Education updated successfully!");
      } else {
        dispatch(addEducationItem(education));
        toast.success("Education submitted successfully!");
      }
      setEducation({ name: "", institution: "", year: "" });
      setShowInputs(false);
      setIsUpdating(false);
      setCurrentEducationId(null);
    } catch (error) {
      console.error("Error submitting education: ", error);
      toast.error("Failed to submit education");
    }
  };

  const handleEdit = (item: Education) => {
    setEducation({
      name: item.name,
      institution: item.institution,
      year: item.year,
    });
    setIsUpdating(true);
    setShowInputs(true);
    setCurrentEducationId(item.id!);
  };

  const handleRemove = async (id: string) => {
    try {
      dispatch(removeEducation(id));
      toast.success("Education removed successfully!");
    } catch (error) {
      console.error("Error removing education: ", error);
      toast.error("Failed to remove education");
    }
  };

  const filteredEducations = educations.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Educations</h2>
          {!showInputs && (
            <button
              onClick={() => setShowInputs(true)}
              className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
                showInputs ? "bg-blue-600" : ""
              }`}
            >
              Add Education
            </button>
          )}
        </div>
        {showInputs && (
          <EducationForm
            education={education}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
          />
        )}
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowEducationList(!showEducationList)}
            className={`py-2 px-4 text-gray-200 border-2 rounded-lg transition ${
              showEducationList
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {showEducationList ? "Hide Educations" : "Show Educations"}
          </button>
          {showEducationList && (
            <input
              type="text"
              className="py-2 px-4 bg-gray-800 border-2 border-gray-600 shadow-lg rounded-full placeholder-gray-500 text-gray-300 outline-none"
              placeholder="Search educations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {showEducationList && (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700 mt-5">
          <h3 className="text-xl font-bold text-gray-400 mb-4">
            {loading
              ? ""
              : filteredEducations.length > 0
              ? ""
              : "No Education Available"}
          </h3>
          {loading ? (
            <Spinner />
          ) : (
            filteredEducations.map((item) => (
              <EducationItem
                key={item.id}
                education={item}
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

export default EducationAdmin;
