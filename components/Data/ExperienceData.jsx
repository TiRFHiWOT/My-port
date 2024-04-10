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

  const deleteExperience = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await deleteDoc(experienceDoc);
  };

  const updateName = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { name: updatedName });
  };

  const updatePlace = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { place: updatedPlace });
  };

  const updateYear = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { year: updatedYear });
  };

  const updatePointOne = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointOne: updatedPointOne });
  };

  const updatePointTwo = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointTwo: updatedPointTwo });
  };

  const updatePointThree = async (id) => {
    const experienceDoc = doc(db, "experience", id);
    await updateDoc(experienceDoc, { pointThree: updatedPointThree });
  };

  const getExperience = async () => {
    const data = await getDocs(experienceCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setExperience(filteredData);
  };

  useEffect(() => {
    getExperience();
  }, []);

  getExperience();
  return (
    <section>
      <div>
        <div>
          {experience.map((experience) => (
            <div
              key={experience.id}
              className="mb-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs"
            >
              <div>
                <div className="flex flex-row justify-between space-x-2 my-1">
                  <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                    ID: {experience.id}
                  </h1>
                  <button
                    onClick={() => deleteExperience(experience.id)}
                    className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="my-2">
                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">name:</span>{" "}
                      {experience.name}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Name"
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateName(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">place:</span>{" "}
                      {experience.place}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Position"
                        onChange={(e) => setUpdatedPlace(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updatePlace(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">year:</span>{" "}
                      {experience.year}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Comment"
                        onChange={(e) => setUpdatedYear(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateYear(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">pointOne:</span>{" "}
                      {experience.pointOne}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Comment"
                        onChange={(e) => setUpdatedPointOne(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updatePointOne(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">pointTwo:</span>{" "}
                      {experience.pointTwo}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Comment"
                        onChange={(e) => setUpdatedPointTwo(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updatePointTwo(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">pointThree:</span>{" "}
                      {experience.pointThree}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Comment"
                        onChange={(e) => setUpdatedPointThree(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updatePointThree(experience.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceData;
