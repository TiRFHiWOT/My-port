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
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSkill = async () => {
    try {
      const data = await getDocs(skillCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkill(filteredData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  const deleteSkill = async (id) => {
    const skillDoc = doc(db, "skill", id);
    await deleteDoc(skillDoc);
    setIsDeleted(true);
    setDeleteId(null);
    setTimeout(() => setIsDeleted(false), 3000);
    getSkill();
  };

  const updateSkillName = async (id) => {
    const skillDoc = doc(db, "skill", id);
    await updateDoc(skillDoc, { skill: updatedSkill });
    getSkill();
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteSkill(deleteId);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
  };

  return (
    <section>
      <div>
        {isLoading && <div></div>}
        {!isLoading && skill.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No skills available.
          </div>
        )}
        <div>
          {skill.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
              backdrop-blur-lg border-[#334155] text-xs"
            >
              <div className="grid gap-y-1.5 w-full">
                <div
                  className="flex flex-row justify-between px-4 items-center 
                rounded-sm bg-[#334155]"
                >
                  <h1 className="my-1 pb-1 text-lg text-sky-300 ">
                    ID: {item.id}
                  </h1>
                  <button
                    onClick={() => setDeleteId(item.id)}
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
                    <span className="text-sky-300">skill:</span> {item.skill}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={item.skill}
                      onChange={(e) => setUpdatedSkill(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updateSkillName(item.id)}
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
                  <span className="text-sky-300">Image:</span> {item.image}
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
          Skill deleted successfully!
        </div>
      )}
    </section>
  );
};

export default SkillData;
