import { db } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const educationCollection = collection(db, "education");

export const fetchEducation = async () => {
  const educationSnapshot = await getDocs(educationCollection);
  return educationSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addEducation = async (item: any) => {
  const docRef = await addDoc(educationCollection, item);
  return { ...item, id: docRef.id };
};

export const updateEducationItem = async (id: string, item: any) => {
  const educationDoc = doc(db, "education", id);
  await updateDoc(educationDoc, item);
  return { ...item, id };
};

export const deleteEducation = async (id: string) => {
  const educationDoc = doc(db, "education", id);
  await deleteDoc(educationDoc);
};
