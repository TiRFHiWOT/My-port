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

const ExperienceData = () => {
  const experienceCollectionRef = collection(db, "experience");
  const [experience, setExperience] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPlace, setUpdatedPlace] = useState("");
  const [updatedPointOne, setUpdatedPointOne] = useState("");
  const [updatedPointTwo, setUpdatedPointTwo] = useState("");
  const [updatedPointThree, setUpdatedPointThree] = useState("");
  const [updatedYear, setUpdatedYear] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getExperience = async () => {
    try {
      const data = await getDocs(experienceCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExperience(filteredData);
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExperience();
  }, []);

  const deleteExperience = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await deleteDoc(experienceDoc);
    setIsDeleted(true);
    setDeleteId(null);
    setTimeout(() => setIsDeleted(false), 3000);
    getExperience();
  };

  const updateName = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { name: updatedName });
    getExperience();
  };

  const updatePlace = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { place: updatedPlace });
    getExperience();
  };

  const updateYear = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { year: updatedYear });
    getExperience();
  };

  const updatePointOne = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointOne: updatedPointOne });
    getExperience();
  };

  const updatePointTwo = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointTwo: updatedPointTwo });
    getExperience();
  };

  const updatePointThree = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointThree: updatedPointThree });
    getExperience();
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteExperience(deleteId);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
  };

  return (
    <section>
      <div>
        {isLoading && <div></div>}
        {!isLoading && experience.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No experiences available.
          </div>
        )}
        <div>
          {experience.map((experience) => (
            <div
              key={experience.id}
              className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
              backdrop-blur-lg border-[#334155] text-xs"
            >
              <div className="grid gap-y-1.5 w-full">
                <div
                  className="flex flex-row justify-between px-4 items-center 
                rounded-sm bg-[#334155]"
                >
                  <h1 className="my-1 pb-1 text-lg text-sky-300 ">
                    ID: {experience.id}
                  </h1>
                  <button
                    onClick={() => setDeleteId(experience.id)}
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
                    <span className="text-sky-300">name:</span>{" "}
                    {experience.name}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.name}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updateName(experience.id)}
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
                    <span className="text-sky-300">place:</span>{" "}
                    {experience.place}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.place}
                      onChange={(e) => setUpdatedPlace(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updatePlace(experience.id)}
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
                    <span className="text-sky-300">year:</span>{" "}
                    {experience.year}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.year}
                      onChange={(e) => setUpdatedYear(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updateYear(experience.id)}
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
                    <span className="text-sky-300">pointOne:</span>{" "}
                    {experience.pointOne}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.pointOne}
                      onChange={(e) => setUpdatedPointOne(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updatePointOne(experience.id)}
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
                    <span className="text-sky-300">pointTwo:</span>{" "}
                    {experience.pointTwo}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.pointTwo}
                      onChange={(e) => setUpdatedPointTwo(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updatePointTwo(experience.id)}
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
                    <span className="text-sky-300">pointThree:</span>{" "}
                    {experience.pointThree}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={experience.pointThree}
                      onChange={(e) => setUpdatedPointThree(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updatePointThree(experience.id)}
                      className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          Experience deleted successfully!
        </div>
      )}
    </section>
  );
};

export default ExperienceData;
