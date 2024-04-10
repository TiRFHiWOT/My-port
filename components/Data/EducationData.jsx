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

const EducationData = () => {
  const educationCollectionRef = collection(db, "education");
  const certificationCollectionRef = collection(db, "certification");

  const [education, setEducation] = useState([]);
  const [certification, setCertification] = useState([]);

  const [updatedEducation, setUpdatedEducation] = useState("");
  const [updatedCertification, setUpdatedCertification] = useState("");

  const deleteEducation = async (id) => {
    const educationDoc = doc(db, "education", id);
    await deleteDoc(educationDoc);
  };

  const deleteCertification = async (id) => {
    const certificationDoc = doc(db, "certification", id);
    await deleteDoc(certificationDoc);
  };

  const updateEducation = async (id) => {
    const educationDoc = doc(db, "education", id);
    await updateDoc(educationDoc, { education: updatedEducation });
  };

  const updateCertification = async (id) => {
    const certificationDoc = doc(db, "certification", id);
    await updateDoc(certificationDoc, { certification: updatedCertification });
  };

  const getEducation = async () => {
    const data = await getDocs(educationCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEducation(filteredData);
  };

  useEffect(() => {
    getEducation();
  }, []);

  getEducation();

  const getCertification = async () => {
    const data = await getDocs(certificationCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCertification(filteredData);
  };

  useEffect(() => {
    getCertification();
  }, []);

  getCertification();

  return (
    <section>
      <div className="flex flex-col ">
        <div className="flex flex-row gap-2">
          <div>
            {education.map((item) => (
              <div
                key={item.id}
                className="mb-2 p-3 flex flex-col bg-[#33415580] text-xs"
              >
                <div className="flex flex-row justify-between space-x-2 my-1">
                  <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                    ID: {item.id}
                  </h1>
                  <button
                    onClick={() => deleteEducation(item.id)}
                    className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                <div className="my-2">
                  <div className="my-1 flex flex-col justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">education:</span>{" "}
                      {item.education}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New User Name"
                        onChange={(e) => setUpdatedEducation(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateEducation(item.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {certification.map((item) => (
              <div
                key={item.id}
                className="mb-2 p-3 flex flex-col justify-between bg-[#33415580] text-xs"
              >
                <div className="flex flex-row justify-between space-x-2 my-1">
                  <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                    ID: {item.id}
                  </h1>
                  <button
                    onClick={() => deleteCertification(item.id)}
                    className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                <div className="my-2">
                  <div className="my-1 flex flex-col justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">certification:</span>{" "}
                      {item.certification}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New User Name"
                        onChange={(e) =>
                          setUpdatedCertification(e.target.value)
                        }
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateCertification(item.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
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
      </div>
    </section>
  );
};

export default EducationData;
