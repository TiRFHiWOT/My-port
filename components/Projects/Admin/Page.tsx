"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  getProjects,
  createProject,
  modifyProject,
  removeProject,
} from "@/store/slice/projectsAdminSlice";
import ProjectForm from "@/components/Projects/Admin/Form";
import ProjectList from "@/components/Projects/Admin/List";
import Spinner from "@/components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectsAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.projectsAdmin
  );
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    gitUrl: "",
    previewUrl: "",
    images: [],
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (showProjects) {
      dispatch(getProjects());
    }
  }, [dispatch, showProjects]);

  const handleChange = (field: keyof Project, value: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
  };

  const handleImageChange = (images: File[]) => {
    setProject((prevProject) => ({
      ...prevProject,
      images,
    }));
  };

  const handleSubmit = async () => {
    if (!project.title || !project.description) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    try {
      if (isUpdating && currentProjectId) {
        await dispatch(
          modifyProject({ id: currentProjectId, project })
        ).unwrap();
        toast.success("Project updated successfully!");
      } else {
        await dispatch(createProject(project)).unwrap();
        toast.success("Project submitted successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting project: ", error);
      toast.error("Failed to submit project");
    }
  };

  const resetForm = () => {
    setProject({
      title: "",
      description: "",
      gitUrl: "",
      previewUrl: "",
      images: [],
    });
    setShowInputs(false);
    setIsUpdating(false);
    setCurrentProjectId(null);
  };

  const handleEdit = (project: Project) => {
    setProject(project);
    setIsUpdating(true);
    setShowInputs(true);
    setCurrentProjectId(project.id || null);
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeProject(id)).unwrap();
      toast.success("Project removed successfully!");
    } catch (error) {
      console.error("Error removing project: ", error);
      toast.error("Failed to remove project");
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          {!showInputs && (
            <button
              onClick={() => setShowInputs(true)}
              className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
                showInputs ? "bg-blue-600" : ""
              }`}
            >
              Add Project
            </button>
          )}
        </div>
        {showInputs && (
          <ProjectForm
            project={project}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
          />
        )}
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowProjects(!showProjects)}
            className={`py-2 px-4 text-gray-200 border-2 rounded-lg transition ${
              showProjects
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {showProjects ? "Hide Projects" : "Show Projects"}
          </button>
          {showProjects && (
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
      {showProjects && (
        <div className="max-w-4xl mt-5 mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700 transition-opacity duration-300 ease-in-out opacity-100">
          {loading ? (
            <Spinner />
          ) : (
            <ProjectList
              projects={filteredProjects}
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

export default ProjectsAdmin;
