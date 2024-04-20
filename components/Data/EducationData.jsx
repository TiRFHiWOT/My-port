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
  const [deleteId, setDeleteId] = useState(null);
  const [deleteIdCer, setDeleteIdCer] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeletedCer, setIsDeletedCer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getEducation = async () => {
    try {
      const data = await getDocs(educationCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEducation(filteredData);
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEducation();
  }, []);

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

  const deleteEducation = async (id) => {
    const educationDoc = doc(db, "education", id);
    await deleteDoc(educationDoc);
    setIsDeleted(true);
    setDeleteId(null);
    setTimeout(() => setIsDeleted(false), 3000);
    getEducation();
  };

  const deleteCertification = async (id) => {
    const certificationDoc = doc(db, "certification", id);
    await deleteDoc(certificationDoc);
    setIsDeletedCer(true);
    setDeleteIdCer(null);
    setTimeout(() => setIsDeletedCer(false), 3000);
    getCertification();
  };

  const updateEducation = async (id) => {
    const educationDoc = doc(db, "education", id);
    await updateDoc(educationDoc, { education: updatedEducation });
    getEducation();
  };

  const updateCertification = async (id) => {
    const certificationDoc = doc(db, "certification", id);
    await updateDoc(certificationDoc, { certification: updatedCertification });
    getCertification();
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteEducation(deleteId);
    }
    if (deleteIdCer) {
      deleteCertification(deleteIdCer);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
    setDeleteIdCer(null);
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        <div>
          {isLoading && <div></div>}
          {!isLoading && education.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No educations available.
            </div>
          )}
          {education.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
                backdrop-blur-lg border-[#334155] text-xs"
            >
              <div className="grid gap-y-1 w-full">
                <div
                  className="flex flex-row justify-between px-2 items-center 
                rounded-sm bg-[#334155]"
                >
                  <h1 className="my-1 pb-1 text-lg text-sky-300">
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
                  className="flex flex-row justify-between items-center px-2
                 rounded-sm bg-[#334155]"
                >
                  <h1>
                    <span className="text-sky-300">education:</span>{" "}
                    {item.education}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={item.education}
                      onChange={(e) => setUpdatedEducation(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updateEducation(item.id)}
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
        <div>
          {isLoading && <div></div>}
          {!isLoading && certification.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No certifications available.
            </div>
          )}
          {certification.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
                backdrop-blur-lg border-[#334155] text-xs"
            >
              <div className="grid gap-y-1 w-full">
                <div
                  className="flex flex-row justify-between px-2 items-center 
                rounded-sm bg-[#334155]"
                >
                  <h1 className="my-1 pb-1 text-lg text-sky-300">
                    ID: {item.id}
                  </h1>
                  <button
                    onClick={() => setDeleteIdCer(item.id)}
                    className="rounded-full border-2 border-[#5b6b83] text-white
                      bg-red-500 hover:bg-red-600 py-2 px-4 my-1"
                  >
                    Delete
                  </button>
                </div>

                <div
                  className="flex flex-row justify-between items-center px-2
                 rounded-sm bg-[#334155]"
                >
                  <h1>
                    <span className="text-sky-300">certification:</span>{" "}
                    {item.certification}
                  </h1>
                  <div className="flex flex-row my-1 gap-2">
                    <input
                      type="text"
                      placeholder={item.certification}
                      onChange={(e) => setUpdatedCertification(e.target.value)}
                      className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => updateCertification(item.id)}
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
      {deleteIdCer && (
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
          Education deleted successfully!
        </div>
      )}
      {isDeletedCer && (
        <div className="bg-green-500 text-white p-2 absolute top-0 right-0 m-2 rounded-md">
          Certification deleted successfully!
        </div>
      )}
    </section>
  );
};

export default EducationData;
