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

const SkillData = () => {
  const skillCollectionRef = collection(db, "skill");

  const [skill, setSkill] = useState([]);

  const [updatedSkill, setUpdatedSkill] = useState("");

  const deleteSkill = async (id) => {
    const skillDoc = doc(db, "skill", id);
    await deleteDoc(skillDoc);
  };

  const updateSkillName = async (id) => {
    const skillDoc = doc(db, "skill", id);
    await updateDoc(skillDoc, { skillName: updatedSkill });
  };

  const getSkill = async () => {
    const data = await getDocs(skillCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setSkill(filteredData);
  };

  useEffect(() => {
    getSkill();
  }, []);

  getSkill();

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="">
          {skill.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs"
            >
              <div>
                <div className="flex flex-row justify-between space-x-2 my-1">
                  <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                    ID: {item.id}
                  </h1>
                  <button
                    onClick={() => deleteSkill(item.id)}
                    className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="my-2">
                  <div className="my-1 flex flex-col justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">skillName:</span>{" "}
                      {item.skill}
                    </h1>
                    <div className="flex flex-row my-2 gap-2">
                      <input
                        type="text"
                        placeholder="New Skill Name"
                        onChange={(e) => setUpdatedSkill(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateSkillName(item.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="my-1 flex flex-row justify-between space-x-2 w-[80%]">
                    <span className="text-sky-300">Image:</span> {item.image}
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

export default SkillData;
