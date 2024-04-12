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
  const [isOpen, setIsOpen] = useState(false);
  const [skillIdToDelete, setSkillIdToDelete] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteSkill = async (id) => {
    const skillDoc = doc(db, "skill", id);
    await deleteDoc(skillDoc);
    setIsDeleted(true);
    setTimeout(() => {
      setIsDeleted(false);
    }, 3000);
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

  const handleDeleteClick = (id) => {
    setSkillIdToDelete(id);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsDeleted(false);
  };

  const handleConfirmDelete = () => {
    deleteSkill(skillIdToDelete);
    setIsOpen(false);
  };

  return (
    <section>
      <div className="">
        <div className="">
          {skill.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-3 rounded-lg flex flex-row justify-between border backdrop-blur-lg border-[#334155] text-xs"
            >
              <div>
                <div className="flex flex-row justify-between px-2 items-center rounded-sm bg-[#334155] mb-1">
                  <h1 className="my-1 pb-1 text-sky-300 ">ID: {item.id}</h1>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="rounded-full border-2 border-[#5b6b83] text-white bg-red-700 hover:bg-red-900 py-1 px-4 my-1"
                  >
                    Delete
                  </button>
                </div>

                <div className="">
                  <div className="flex flex-row justify-between items-center px-2 rounded-sm bg-[#334155]">
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
                  <h1 className="my-1 flex flex-row justify-between space-x-2 p-2 rounded-sm bg-[#334155]">
                    <span className="text-sky-300">Image:</span> {item.image}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
              <h2 className="text-lg font-bold text-gray-900">
                Are you sure you want to delete?
              </h2>
              <p className="text-gray-600">This action cannot be undone.</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mr-2"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeleted && (
          <div className="bg-green-500 text-white p-2 absolute top-0 right-0 m-2 rounded-md">
            Skill deleted successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillData;
