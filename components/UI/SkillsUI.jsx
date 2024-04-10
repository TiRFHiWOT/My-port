"use client";
import { useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const SkillUI = () => {
  const skillCollectionRef = collection(db, "Skills");
  const [Skill, setSkill] = useState([]);

  const [newSkill, setNewSkill] = useState("");

  const deleteSkill = async (id) => {
    const skillDoc = doc(db, "Skills", id);
    await deleteDoc(slikkDoc);
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

  const onSubmit = async () => {
    await addDoc(skillCollectionRef, {
      skillName: newSkill,
    });
    getSkill();
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-3 bg-[#34465f] p-3 rounded-sm h-fit">
          <div>
            <input
              type="text"
              id="position"
              required
              className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-sm block w-full p-2.5"
              placeholder="Position"
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {Skill.map((Skill) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mb-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs">
              <div className="rounded-md  ">
                <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                  ID: {Skill.id}
                </h1>

                <div className="my-2">
                  <h1>
                    <span className="text-sky-300">userName:</span>{" "}
                    {Skill.skillName}
                  </h1>
                </div>
              </div>
              <div>
                <button
                  onClick={() => deleteSkill(Skill.id)}
                  className="rounded-sm px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillUI;
