"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  getWorkExperiences,
  createWorkExperience,
  modifyWorkExperience,
  removeWorkExperience,
  setCurrentWorkExperience,
  setUpdating,
  setCurrentWorkExperienceId,
  resetCurrentWorkExperience,
} from "@/store/slice/workAdminSlice";
import WorkExperienceForm from "@/components/Work/Admin/Form";
import WorkExperienceList from "@/components/Work/Admin/List";
import Spinner from "@/components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface WorkExperience {
  id: string;
  position: string;
  place: string;
  year: string;
  skillsUsed: string;
  description: string;
}

const WorkExperienceAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    workExperiences,
    currentWorkExperience,
    loading,
    isUpdating,
    currentWorkExperienceId,
    error,
  } = useSelector((state: RootState) => state.workExperienceAdmin);

  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showWorkExperience, setShowWorkExperience] = useState<boolean>(false);

  useEffect(() => {
    if (showWorkExperience) {
      dispatch(getWorkExperiences()).finally(() => {});
    }
  }, [dispatch, showWorkExperience]);

  const handleChange = (field: string, value: string) => {
    dispatch(
      setCurrentWorkExperience({ ...currentWorkExperience, [field]: value })
    );
  };

  const handleSubmit = async () => {
    if (!currentWorkExperience.position ||
      !currentWorkExperience.place ||
      !currentWorkExperience.year ||
      !currentWorkExperience.skillsUsed ||
      !currentWorkExperience.description) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    try {
      if (isUpdating) {
        await dispatch(
          modifyWorkExperience({
            id: currentWorkExperienceId!,
            workExperience: currentWorkExperience,
          })
        ).unwrap();
        toast.success("Work Experience updated successfully!");
      } else {
        await dispatch(createWorkExperience(currentWorkExperience)).unwrap();
        toast.success("Work Experience submitted successfully!");
      }
      dispatch(resetCurrentWorkExperience());
      setShowInputs(false);
    } catch (error) {
      console.error("Error submitting work experience: ", error);
      toast.error("Failed to submit work experience");
    }
  };

  const handleEdit = (workExperience: WorkExperience) => {
    dispatch(setCurrentWorkExperience(workExperience));
    dispatch(setUpdating(true));
    setShowInputs(true);
    dispatch(setCurrentWorkExperienceId(workExperience.id));
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeWorkExperience(id)).unwrap();
      toast.success("Work experience removed successfully!");
    } catch (error) {
      console.error("Error removing work experience: ", error);
      toast.error("Failed to remove work experience");
    }
  };

  const filteredWorkExperience = workExperiences.filter((w) =>
    w.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Work Experience</h2>
          {!showInputs && (
            <button
              onClick={() => setShowInputs(true)}
              className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
                showInputs ? "bg-blue-600" : ""
              }`}
            >
              Add Work Experience
            </button>
          )}
        </div>
        {showInputs && (
          <WorkExperienceForm
            workExperience={currentWorkExperience}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
          />
        )}
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowWorkExperience(!showWorkExperience)}
            className={`py-2 px-4 text-gray-200 border-2 rounded-lg transition ${
              showWorkExperience
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {showWorkExperience
              ? "Hide Work Experience"
              : "Show Work Experience"}
          </button>
          {showWorkExperience && (
            <input
              type="text"
              className="py-2 px-4 bg-gray-800 border-2 border-gray-600 shadow-lg rounded-full placeholder-gray-500 text-gray-300 outline-none"
              placeholder="Search items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>
      {showWorkExperience && (
        <div className="max-w-4xl mt-5 mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700 transition-opacity duration-300 ease-in-out opacity-100">
          {loading ? (
            <Spinner />
          ) : (
            <WorkExperienceList
              workExperience={filteredWorkExperience}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WorkExperienceAdmin;
