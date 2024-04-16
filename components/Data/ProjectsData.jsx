"use client";
import { useState, useEffect } from "react";
import {
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const ProjectsData = () => {
  const projectsCollectionRef = collection(db, "projects");
  const [Projects, setProjects] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPreviewUrl, setUpdatedPreviewUrl] = useState("");
  const [updatedGitUrl, setUpdatedGitUrl] = useState("");
  const [updatedTags, setUpdatedTags] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const getProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProjects(filteredData);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteProject = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await deleteDoc(projectsDoc);
    setIsDeleted(true);
    setDeleteId(null);
    setTimeout(() => setIsDeleted(false), 3000);
    getProjects();
  };

  const updateTitle = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await updateDoc(projectsDoc, { title: updatedTitle });
    getProjects();
  };

  const updateDescription = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await updateDoc(projectsDoc, { description: updatedDescription });
    getProjects();
  };

  const updatePreviewUrl = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await updateDoc(projectsDoc, { previewUrl: updatedPreviewUrl });
    getProjects();
  };

  const updateGitUrl = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await updateDoc(projectsDoc, { gitUrl: updatedGitUrl });
    getProjects();
  };

  const updateTag = async (id, newTag) => {
    const projectsDoc = doc(db, "projects", id);
    await updateDoc(projectsDoc, { tag: newTag });
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
  };
  return (
    <section>
      <div>
        {Projects.map((project) => (
          <div
            key={project.id}
            className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
              backdrop-blur-lg border-[#334155] text-xs"
          >
            <div className="grid gap-y-1.5 w-full">
              <div
                className="flex flex-row justify-between px-4 items-center
                 rounded-sm bg-[#334155]"
              >
                <h1 className="my-1 pb-1 text-lg text-sky-300">
                  ID: {project.id}
                </h1>
                <button
                  onClick={() => setDeleteId(project.id)}
                  className="rounded-full border-2 border-[#5b6b83] text-white
                    bg-red-500 hover:bg-red-600 py-2 px-4 my-1"
                >
                  Delete
                </button>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">title:</span> {project.title}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={project.title}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500
                        text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updateTitle(project.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">description:</span>{" "}
                  {project.description}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={project.description}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500
                        text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updateDescription(project.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">previewUrl:</span>{" "}
                  {project.previewUrl}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={project.previewUrl}
                    onChange={(e) => setUpdatedPreviewUrl(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500
                        text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updatePreviewUrl(project.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">gitUrl:</span> {project.gitUrl}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={project.gitUrl}
                    onChange={(e) => setUpdatedGitUrl(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500
                        text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updateGitUrl(project.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">tag:</span>
                  {String(project.tag)}
                </h1>
                <div className="flex flex-row my-1 gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={updatedTags[project.id] || project.tag}
                    onChange={(e) => {
                      const newTag = e.target.checked;
                      setUpdatedTags((prevState) => ({
                        ...prevState,
                        [project.id]: newTag,
                      }));
                    }}
                    className="rounded border border-gray-400 h-4 w-4 text-blue-500 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => {
                      if (updatedTags[project.id] !== undefined) {
                        updateTag(project.id, updatedTags[project.id]);
                        getProjects();
                      }
                    }}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between py-2 px-4 rounded-sm 
              bg-[#334155]"
              >
                <span className="text-sky-300">Images:</span> {project.images}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#334155] border border-gray-600 p-6 rounded shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-white">
              Are you sure you want to delete?
            </h2>
            <p className="text-gray-400 flex justify-end">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mr-4"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-500 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <div className="bg-green-500 text-white p-2 absolute top-0 right-0 m-2 rounded-md">
          Project deleted successfully!
        </div>
      )}
    </section>
  );
};

export default ProjectsData;
