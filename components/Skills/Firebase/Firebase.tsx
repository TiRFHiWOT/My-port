import { db, storage } from "../../../app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const skillsCollection = collection(db, "skills");

export const fetchSkills = async () => {
  const skillsSnapshot = await getDocs(skillsCollection);
  return skillsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addSkill = async (item: any) => {
  const docRef = await addDoc(skillsCollection, item);
  return { ...item, id: docRef.id };
};

export const updateSkillItem = async (id: string, item: any) => {
  const skillDoc = doc(db, "skills", id);
  await updateDoc(skillDoc, item);
  return { ...item, id };
};

export const deleteSkill = async (id: string) => {
  const skillDoc = doc(db, "skills", id);
  await deleteDoc(skillDoc);
};

export const uploadImage = async (imageFile: File) => {
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const removeImage = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

export const updateSkillImage = async (itemId, image) => {
  const skillDoc = doc(db, "skills", itemId);
  await updateDoc(skillDoc, { image });
};
