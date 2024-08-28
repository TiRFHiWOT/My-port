import { db } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const workExperiencesCollection = collection(db, "experience");

export const fetchWorkExperience = async () => {
  const workExperiencesSnapshot = await getDocs(workExperiencesCollection);
  return workExperiencesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addWorkExperience = async (workExperience) => {
  const docRef = await addDoc(workExperiencesCollection, workExperience);
  return { ...workExperience, id: docRef.id };
};

export const updateWorkExperience = async (id, workExperience) => {
  const workExperienceDoc = doc(db, "experience", id);
  await updateDoc(workExperienceDoc, workExperience);
  return { ...workExperience, id };
};

export const deleteWorkExperience = async (id) => {
  const workExperienceDoc = doc(db, "experience", id);
  await deleteDoc(workExperienceDoc);
};
